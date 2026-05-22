const VALID_STATUSES = ['Idea', 'Draft', 'Ready', 'Submitted', 'Accepted', 'Rejected'];

export function validateCreatePayload(payload) {
  const requiredFields = ['name', 'community', 'deadline', 'city', 'format', 'status'];
  const missing = requiredFields.find((field) => !payload[field]);
  if (missing) {
    return `Missing field: ${missing}`;
  }
  if (!VALID_STATUSES.includes(payload.status)) {
    return 'Invalid status value';
  }
  return null;
}

export function nextCallId(current) {
  const maxId = current.reduce((acc, item) => {
    const parsed = Number(item.id?.replace('cfs-', ''));
    return Number.isFinite(parsed) ? Math.max(acc, parsed) : acc;
  }, 0);
  return `cfs-${String(maxId + 1).padStart(3, '0')}`;
}

export function buildNewCall(payload, current) {
  return {
    id: nextCallId(current),
    name: payload.name,
    community: payload.community,
    deadline: payload.deadline,
    city: payload.city,
    format: payload.format,
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    status: payload.status,
    proposalId: payload.proposalId || null,
    audience: payload.audience || 'Comunidad técnica',
    source: payload.source || ''
  };
}

export { VALID_STATUSES };
