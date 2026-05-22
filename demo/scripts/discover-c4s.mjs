import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const callsPath = path.join(root, 'src/data/calls.json');
const sourcesPath = path.join(root, 'scripts/c4s-sources.json');
const reportPath = path.join(root, 'scripts/discovery-report.json');
const summaryPath = path.join(root, 'scripts/discovery-summary.md');

const stateOrder = ['Idea', 'Draft', 'Ready', 'Submitted', 'Accepted', 'Rejected'];
const formatOptions = ['Remote', 'Hybrid', 'In person'];

function normalizeDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

function slugKey(name, community) {
  return `${(name || '').toLowerCase().trim()}::${(community || '').toLowerCase().trim()}`;
}

function sanitizeCall(raw, defaults = {}) {
  const name = String(raw.name || raw.title || '').trim();
  const deadline = normalizeDate(raw.deadline || raw.cfpDeadline || raw.closesAt || raw.date);
  const source = String(raw.source || raw.url || '').trim();
  if (!name || !deadline || !source) return null;

  const status = stateOrder.includes(raw.status) ? raw.status : 'Idea';
  const format = formatOptions.includes(raw.format) ? raw.format : (defaults.format || 'Remote');

  return {
    id: null,
    name,
    community: String(raw.community || defaults.community || 'Comunidad técnica').trim(),
    deadline,
    deadlineConfidence: String(raw.deadlineConfidence || defaults.deadlineConfidence || 'estimated').trim(),
    city: String(raw.city || defaults.city || 'Online').trim(),
    format,
    tags: asArray(raw.tags).length > 0 ? asArray(raw.tags) : asArray(defaults.tags),
    status,
    proposalId: raw.proposalId || null,
    audience: String(raw.audience || defaults.audience || 'Comunidad técnica').trim(),
    source
  };
}

function isFutureOrToday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(`${dateStr}T00:00:00`);
  return d.getTime() >= today.getTime();
}

async function loadJson(filePath, fallback = null) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function fetchSource(source) {
  const res = await fetch(source.url, {
    headers: {
      'User-Agent': 'speaker-c4s-radar-discovery-bot'
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${source.url}`);
  }

  const body = await res.json();
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.items)) return body.items;
  if (Array.isArray(body.data)) return body.data;
  return [];
}

function applyIds(calls) {
  return calls.map((item, idx) => ({
    ...item,
    id: `cfs-${String(idx + 1).padStart(3, '0')}`
  }));
}

async function main() {
  const existing = await loadJson(callsPath, []);
  const configured = await loadJson(sourcesPath, []);
  const extraRaw = process.env.C4S_EXTRA_SOURCES_JSON || '[]';
  let extra = [];
  try {
    extra = JSON.parse(extraRaw);
  } catch {
    extra = [];
  }

  const sources = [...configured, ...extra].filter((s) => s && s.url && s.type === 'json-array');

  const currentBySource = new Map(existing.map((item) => [String(item.source || '').trim(), item]));
  const currentBySlug = new Map(existing.map((item) => [slugKey(item.name, item.community), item]));

  const stats = {
    scannedSources: sources.length,
    fetchedItems: 0,
    acceptedItems: 0,
    skippedPastDeadline: 0,
    skippedInvalid: 0,
    dedupedExisting: 0,
    failedSources: []
  };

  const additions = [];

  for (const source of sources) {
    try {
      const rawItems = await fetchSource(source);
      stats.fetchedItems += rawItems.length;

      for (const raw of rawItems) {
        const normalized = sanitizeCall(raw, source.defaults || {});
        if (!normalized) {
          stats.skippedInvalid += 1;
          continue;
        }

        if (!isFutureOrToday(normalized.deadline)) {
          stats.skippedPastDeadline += 1;
          continue;
        }

        const bySource = currentBySource.has(normalized.source);
        const bySlug = currentBySlug.has(slugKey(normalized.name, normalized.community));
        if (bySource || bySlug) {
          stats.dedupedExisting += 1;
          continue;
        }

        additions.push(normalized);
        currentBySource.set(normalized.source, normalized);
        currentBySlug.set(slugKey(normalized.name, normalized.community), normalized);
        stats.acceptedItems += 1;
      }
    } catch (error) {
      stats.failedSources.push({ id: source.id || source.url, error: String(error.message || error) });
    }
  }

  const merged = [...existing, ...additions].sort((a, b) => a.deadline.localeCompare(b.deadline));
  const withIds = applyIds(merged);

  await fs.writeFile(callsPath, `${JSON.stringify(withIds, null, 2)}\n`, 'utf8');

  const report = {
    timestamp: new Date().toISOString(),
    stats,
    additions: additions.map((item) => ({
      name: item.name,
      community: item.community,
      deadline: item.deadline,
      source: item.source,
      confidence: item.deadlineConfidence
    }))
  };

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  const summaryLines = [
    '# C4S Discovery Summary',
    '',
    `- Sources scanned: ${stats.scannedSources}`,
    `- Raw items fetched: ${stats.fetchedItems}`,
    `- New opportunities added: ${stats.acceptedItems}`,
    `- Skipped (past deadline): ${stats.skippedPastDeadline}`,
    `- Skipped (invalid): ${stats.skippedInvalid}`,
    `- Deduped: ${stats.dedupedExisting}`,
    ''
  ];

  if (stats.failedSources.length > 0) {
    summaryLines.push('## Source errors', '');
    for (const failed of stats.failedSources) {
      summaryLines.push(`- ${failed.id}: ${failed.error}`);
    }
    summaryLines.push('');
  }

  if (additions.length > 0) {
    summaryLines.push('## Added items', '');
    for (const item of additions) {
      summaryLines.push(`- ${item.name} | ${item.community} | ${item.deadline} | ${item.source}`);
    }
  } else {
    summaryLines.push('## Added items', '', '- No new opportunities found in this run.');
  }

  await fs.writeFile(summaryPath, `${summaryLines.join('\n')}\n`, 'utf8');

  console.log(`Discovery complete. Added ${stats.acceptedItems} items.`);
}

main().catch((error) => {
  console.error('Discovery failed:', error);
  process.exitCode = 1;
});
