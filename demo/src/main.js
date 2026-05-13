import calls from './data/calls.json';
import './styles.css';

const proposals = [
  { id: 'p-001', title: 'Copilot como copiloto real de comunidades', tags: ['GitHub Copilot', 'DevEx'], level: 'Intermedio' },
  { id: 'p-002', title: 'De prompt a producto con AI y cloud native', tags: ['AI', 'Copilot', 'Azure'], level: 'Intro' },
  { id: 'p-003', title: 'Automatiza tu comunidad con GitHub Actions', tags: ['Open Source', 'Actions'], level: 'Intermedio' }
];

const today = new Date('2026-05-03T00:00:00');
const stateOrder = ['Idea', 'Draft', 'Ready', 'Submitted', 'Accepted', 'Rejected'];

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

function proposalTitle(id) {
  return proposals.find(p => p.id === id)?.title ?? 'Sin propuesta asociada';
}

function render() {
  const active = calls.filter(c => !['Accepted', 'Rejected'].includes(c.status));
  const nextDeadlines = calls.filter(c => daysLeft(c.deadline) <= 14).length;
  const submitted = calls.filter(c => c.status === 'Submitted').length;
  const withoutProposal = calls.filter(c => !c.proposalId).length;

  document.querySelector('#app').innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Call for Speakers Z</p>
        <h1>C4S Scout</h1>
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
        <div class="cards">${calls.map(card).join('')}</div>
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
      <div class="tags">${call.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <footer><b>${call.status}</b><em>${risk(call)}</em></footer>
    </article>`;
}

function column(status) {
  const items = calls.filter(c => c.status === status);
  return `<div class="lane"><strong>${status}</strong><span>${items.map(i => i.name).join('<br>') || '—'}</span></div>`;
}

window.exportMarkdown = function exportMarkdown() {
  const markdown = calls.map(c => `- **${c.name}**: ${daysLeft(c.deadline)} días · ${risk(c)} · siguiente acción: ${c.proposalId ? 'revisar abstract' : 'crear propuesta'}`).join('\n');
  navigator.clipboard?.writeText(markdown);
  alert('Plan copiado al portapapeles:\n\n' + markdown);
};

render();
