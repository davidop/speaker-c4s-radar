import calls from './data/calls.json';
import './styles.css';

const proposals = [
  { id: 'p-001', title: 'Copilot como copiloto real de comunidades', tags: ['GitHub Copilot', 'DevEx'], level: 'Intermedio' },
  { id: 'p-002', title: 'De prompt a producto con AI y cloud native', tags: ['AI', 'Copilot', 'Azure'], level: 'Intro' },
  { id: 'p-003', title: 'Automatiza tu comunidad con GitHub Actions', tags: ['Open Source', 'Actions'], level: 'Intermedio' }
];

const DEMO_DATE = null;
// Example for live demos:
// const DEMO_DATE = '2026-05-03T00:00:00';
const today = DEMO_DATE ? new Date(DEMO_DATE) : new Date();
today.setHours(0, 0, 0, 0);

const stateOrder = ['Idea', 'Draft', 'Ready', 'Submitted', 'Accepted', 'Rejected'];

let selectedCommunity = 'Todas';
let selectedStatus = 'Todos';

function daysLeft(deadline) {
  const diff = new Date(`${deadline}T00:00:00`) - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function urgency(call) {
  const days = daysLeft(call.deadline);
  if (days <= 7) return 'critical';
  if (days <= 14) return 'soon';
  return 'safe';
}

function risk(call) {
  return daysLeft(call.deadline) <= 7 && !call.proposalId ? 'Riesgo alto' : 'Controlado';
}

function nextAction(call) {
  const days = daysLeft(call.deadline);
  if (!call.proposalId && days <= 7) {
    return 'Crear propuesta hoy';
  }
  if (!call.proposalId) {
    return 'Definir idea de charla';
  }
  if (call.status === 'Draft') {
    return 'Revisar abstract';
  }
  if (call.status === 'Ready') {
    return 'Enviar candidatura';
  }
  if (call.status === 'Submitted') {
    return 'Hacer seguimiento';
  }
  if (call.status === 'Accepted') {
    return 'Preparar sesión';
  }
  if (call.status === 'Rejected') {
    return 'Guardar aprendizajes';
  }
  return 'Revisar oportunidad';
}

function proposalTitle(id) {
  return proposals.find(p => p.id === id)?.title ?? 'Sin propuesta asociada';
}

function filteredCalls() {
  return calls.filter(call => {
    const matchesCommunity = selectedCommunity === 'Todas' || call.community === selectedCommunity;
    const matchesStatus = selectedStatus === 'Todos' || call.status === selectedStatus;
    return matchesCommunity && matchesStatus;
  });
}

function render() {
  const active = calls.filter(c => !['Accepted', 'Rejected'].includes(c.status));
  const nextDeadlines = calls.filter(c => daysLeft(c.deadline) <= 14).length;
  const submitted = calls.filter(c => c.status === 'Submitted').length;
  const withoutProposal = calls.filter(c => !c.proposalId).length;

  const visibleCalls = filteredCalls();
  const communities = ['Todas', ...new Set(calls.map(c => c.community))];
  const statuses = ['Todos', ...stateOrder];

  document.querySelector('#app').innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Call for Speakers Z</p>
        <h1>Speaker C4S Radar</h1>
        <p class="subtitle">Detecta oportunidades, controla deadlines y convierte ideas en candidaturas.</p>
      </div>
      <button onclick="window.exportMarkdown()">Exportar plan</button>
    </section>

    <section class="kpis">
      ${kpi('C4S activos', active.length)}
      ${kpi('Deadlines próximos', nextDeadlines)}
      ${kpi('Enviadas', submitted)}
      ${kpi('Sin propuesta', withoutProposal)}
    </section>

    <section class="layout">
      <div>
        <h2>Radar de oportunidades</h2>
        ${filters(communities, statuses)}
        <div class="cards">${visibleCalls.map(card).join('')}</div>
      </div>
      <aside>
        <h2>Pipeline</h2>
        ${stateOrder.map(column).join('')}
      </aside>
    </section>
  `;
}

function kpi(label, value) {
  return `<article class="kpi"><span>${label}</span><strong>${value}</strong></article>`;
}

function filters(communities, statuses) {
  return `
    <section class="filters" aria-label="Filtros del radar">
      <label>
        Comunidad
        <select onchange="window.setCommunityFilter(this.value)">
          ${communities.map(community => `
            <option value="${community}" ${community === selectedCommunity ? 'selected' : ''}>
              ${community}
            </option>
          `).join('')}
        </select>
      </label>
      <label>
        Estado
        <select onchange="window.setStatusFilter(this.value)">
          ${statuses.map(status => `
            <option value="${status}" ${status === selectedStatus ? 'selected' : ''}>
              ${status}
            </option>
          `).join('')}
        </select>
      </label>
    </section>
  `;
}

function card(call) {
  const days = daysLeft(call.deadline);
  return `
    <article class="card ${urgency(call)}">
      <div class="card-title">
        <h3>${call.name}</h3>
        <span>${days} días</span>
      </div>
      <p>${call.community} · ${call.city} · ${call.format}</p>
      <p class="proposal">${proposalTitle(call.proposalId)}</p>
      <p class="audience">👥 Audiencia: ${call.audience ?? 'Comunidad técnica'}</p>
      ${call.source ? `<a class="source-link" href="${call.source}" target="_blank" rel="noreferrer">Ver C4S original →</a>` : ''}
      <div class="tags">${call.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <p class="next-action">✨ Siguiente acción: ${nextAction(call)}</p>
      <footer><b>${call.status}</b><em>${risk(call)}</em></footer>
    </article>`;
}

function column(status) {
  const items = calls.filter(c => c.status === status);
  return `<div class="lane"><strong>${status}</strong><span>${items.map(i => i.name).join('<br>') || '—'}</span></div>`;
}

window.setCommunityFilter = function setCommunityFilter(value) {
  selectedCommunity = value;
  render();
};
window.setStatusFilter = function setStatusFilter(value) {
  selectedStatus = value;
  render();
};

window.exportMarkdown = function exportMarkdown() {
  const markdown = [
    '# Speaker C4S Radar · Plan de acción',
    '',
    `Generado el ${today.toLocaleDateString('es-ES')}`,
    '',
    ...calls.map(c => {
      return [
        `## ${c.name}`,
        `- Comunidad: ${c.community}`,
        `- Formato: ${c.format} · ${c.city}`,
        `- Deadline: ${c.deadline} (${daysLeft(c.deadline)} días)`,
        `- Estado: ${c.status}`,
        `- Riesgo: ${risk(c)}`,
        `- Propuesta: ${proposalTitle(c.proposalId)}`,
        `- Siguiente acción: ${nextAction(c)}`
      ].join('\n');
    })
  ].join('\n\n');
  navigator.clipboard?.writeText(markdown);
  alert('Plan copiado al portapapeles:\n\n' + markdown);
};

render();
