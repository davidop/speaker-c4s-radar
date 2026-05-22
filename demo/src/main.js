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
const formatOptions = ['Remote', 'Hybrid', 'In person'];

let selectedCommunity = 'Todas';
let selectedStatus = 'Todos';
let callsData = [...calls];

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
  return callsData.filter(call => {
    const matchesCommunity = selectedCommunity === 'Todas' || call.community === selectedCommunity;
    const matchesStatus = selectedStatus === 'Todos' || call.status === selectedStatus;
    return matchesCommunity && matchesStatus;
  });
}

function render() {
  const active = callsData.filter(c => !['Accepted', 'Rejected'].includes(c.status));
  const nextDeadlines = callsData.filter(c => daysLeft(c.deadline) <= 14).length;
  const submitted = callsData.filter(c => c.status === 'Submitted').length;
  const withoutProposal = callsData.filter(c => !c.proposalId).length;

  const visibleCalls = filteredCalls();
  const communities = ['Todas', ...new Set(callsData.map(c => c.community))];
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

    <section class="composer" aria-label="Añadir evento">
      <h2>Añadir evento</h2>
      <form class="event-form" onsubmit="window.addCall(event)">
        <input name="name" required placeholder="Nombre del evento" />
        <input name="community" required placeholder="Comunidad" />
        <input name="deadline" required type="date" />
        <input name="city" required placeholder="Ciudad u Online" />
        <select name="format" required>
          ${formatOptions.map(format => `<option value="${format}">${format}</option>`).join('')}
        </select>
        <select name="status" required>
          ${stateOrder.map(status => `<option value="${status}">${status}</option>`).join('')}
        </select>
        <input name="tags" placeholder="Tags separadas por coma" />
        <input name="audience" placeholder="Audiencia" />
        <input name="source" placeholder="URL del C4S" />
        <button type="submit">Guardar evento</button>
      </form>
      <p class="form-hint">Se guarda directamente en src/data/calls.json mientras corre npm run dev.</p>
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
      <div class="card-actions">
        <label>
          Estado
          <select onchange="window.updateCallStatus('${call.id}', this.value)">
            ${stateOrder.map(status => `<option value="${status}" ${status === call.status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </label>
        <button type="button" class="danger" onclick="window.deleteCall('${call.id}')">Borrar</button>
      </div>
      <footer><b>${call.status}</b><em>${risk(call)}</em></footer>
    </article>`;
}

function column(status) {
  const items = callsData.filter(c => c.status === status);
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

window.updateCallStatus = async function updateCallStatus(id, status) {
  try {
    const response = await fetch(`/api/calls/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar estado');
    }

    const updated = await response.json();
    callsData = callsData.map((call) => (call.id === id ? updated : call));
    render();
  } catch {
    alert('No se pudo actualizar el estado. Usa npm run dev para persistir cambios.');
    render();
  }
};

window.deleteCall = async function deleteCall(id) {
  const confirmed = window.confirm('¿Seguro que quieres borrar este evento?');
  if (!confirmed) return;

  try {
    const response = await fetch(`/api/calls/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('No se pudo borrar evento');
    }

    callsData = callsData.filter((call) => call.id !== id);
    render();
    alert('Evento borrado.');
  } catch {
    alert('No se pudo borrar el evento. Usa npm run dev para persistir cambios.');
  }
};

window.exportMarkdown = function exportMarkdown() {
  const markdown = [
    '# Speaker C4S Radar · Plan de acción',
    '',
    `Generado el ${today.toLocaleDateString('es-ES')}`,
    '',
    ...callsData.map(c => {
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

window.addCall = async function addCall(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = {
    name: String(formData.get('name') || '').trim(),
    community: String(formData.get('community') || '').trim(),
    deadline: String(formData.get('deadline') || '').trim(),
    city: String(formData.get('city') || '').trim(),
    format: String(formData.get('format') || '').trim(),
    status: String(formData.get('status') || '').trim(),
    tags: String(formData.get('tags') || '').split(',').map(tag => tag.trim()).filter(Boolean),
    audience: String(formData.get('audience') || '').trim(),
    source: String(formData.get('source') || '').trim()
  };

  try {
    const response = await fetch('/api/calls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('No se pudo guardar.');
    }

    const savedCall = await response.json();
    callsData = [...callsData, savedCall];
    event.target.reset();
    render();
    alert(`Evento añadido: ${savedCall.name}`);
  } catch {
    alert('No se pudo guardar el evento. Verifica que npm run dev esté activo.');
  }
};

render();

// Registro PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('SW registration failed:', err);
    });
  });
}
