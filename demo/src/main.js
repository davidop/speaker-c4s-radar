import calls from './data/calls.json';
import proposalSeed from './data/proposals.json';
import './styles.css';

const DEMO_DATE = null;
// Example for live demos:
// const DEMO_DATE = '2026-05-03T00:00:00';
const today = DEMO_DATE ? new Date(DEMO_DATE) : new Date();
today.setHours(0, 0, 0, 0);

const stateOrder = ['Idea', 'Draft', 'Ready', 'Submitted', 'Accepted', 'Rejected'];
const formatOptions = ['Remote', 'Hybrid', 'In person'];

let selectedCommunity = 'Todas';
let selectedStatus = 'Todos';
let selectedTag = '';
let searchQuery = '';
let searchDebounceId = null;
let callsData = [...calls];
let proposalsData = [...proposalSeed];
let editingCallId = null;
let swRegistration = null;
const NOTIFIED_DEADLINES_KEY = 'c4s-notified-deadlines';
const CALL_NOTES_KEY = 'c4s-call-notes';
let callNotes = (() => {
  try {
    return JSON.parse(localStorage.getItem(CALL_NOTES_KEY) || '{}');
  } catch {
    return {};
  }
})();

function escapeAttr(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

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
  return proposalsData.find((p) => p.id === id)?.title ?? 'Sin propuesta asociada';
}

function proposalOptions(selectedId) {
  const initial = '<option value="">Sin propuesta</option>';
  const options = proposalsData.map((proposal) => {
    const selected = proposal.id === selectedId ? 'selected' : '';
    return `<option value="${proposal.id}" ${selected}>${proposal.title}</option>`;
  }).join('');
  return initial + options;
}

function getNotificationStatusLabel() {
  if (!('Notification' in window)) return 'No soportado';
  if (Notification.permission === 'granted') return 'Activadas';
  if (Notification.permission === 'denied') return 'Bloqueadas';
  return 'Pendientes';
}

function getNotifiedDeadlines() {
  try {
    return JSON.parse(localStorage.getItem(NOTIFIED_DEADLINES_KEY) || '[]');
  } catch {
    return [];
  }
}

function setNotifiedDeadlines(items) {
  localStorage.setItem(NOTIFIED_DEADLINES_KEY, JSON.stringify(items));
}

function criticalCalls() {
  return callsData.filter((call) => {
    const days = daysLeft(call.deadline);
    return days >= 0 && days <= 7 && !['Accepted', 'Rejected'].includes(call.status);
  });
}

function notePreview(note) {
  if (!note) return '';
  return note.length > 120 ? `${note.slice(0, 120)}...` : note;
}

function saveCallNotes() {
  localStorage.setItem(CALL_NOTES_KEY, JSON.stringify(callNotes));
}

async function notifyCriticalDeadlines() {
  if (!swRegistration || !('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notified = new Set(getNotifiedDeadlines());
  const pending = criticalCalls().filter((call) => !notified.has(`${call.id}:${call.deadline}`));

  if (pending.length === 0) return;

  swRegistration.active?.postMessage({
    type: 'notify-deadlines',
    payload: pending.map((call) => ({
      id: call.id,
      name: call.name,
      deadline: call.deadline,
      daysLeft: daysLeft(call.deadline),
      nextAction: nextAction(call)
    }))
  });

  pending.forEach((call) => notified.add(`${call.id}:${call.deadline}`));
  setNotifiedDeadlines([...notified]);
}

function proposalsPanel() {
  return `
    <section class="proposals-panel" aria-label="Gestionar propuestas">
      <div class="proposals-header">
        <h2>Propuestas</h2>
        <button type="button" class="btn-secondary" onclick="window.createProposal()">Nueva propuesta</button>
      </div>
      <div class="proposal-list">
        ${proposalsData.map((proposal) => `
          <article class="proposal-item">
            <div>
              <strong>${proposal.title}</strong>
              <p>${proposal.level} · ${proposal.tags.join(', ') || 'Sin tags'}</p>
            </div>
            <div class="proposal-actions">
              <button type="button" class="btn-secondary" onclick="window.editProposal('${proposal.id}')">Editar</button>
              <button type="button" class="danger" onclick="window.deleteProposal('${proposal.id}')">Borrar</button>
            </div>
          </article>
        `).join('') || '<p class="proposal-empty">No hay propuestas aún.</p>'}
      </div>
    </section>
  `;
}

function filteredCalls() {
  return callsData.filter(call => {
    const matchesCommunity = selectedCommunity === 'Todas' || call.community === selectedCommunity;
    const matchesStatus = selectedStatus === 'Todos' || call.status === selectedStatus;
    const matchesTag = !selectedTag || call.tags.includes(selectedTag);
    const fullText = [call.name, call.community, call.audience || '', ...(call.tags || [])].join(' ').toLowerCase();
    const matchesSearch = !searchQuery || fullText.includes(searchQuery.toLowerCase());
    return matchesCommunity && matchesStatus && matchesTag && matchesSearch;
  });
}

function render() {
  const active = callsData.filter(c => !['Accepted', 'Rejected'].includes(c.status));
  const nextDeadlines = callsData.filter(c => daysLeft(c.deadline) <= 14).length;
  const submitted = callsData.filter(c => c.status === 'Submitted').length;
  const withoutProposal = callsData.filter(c => !c.proposalId).length;
  const editingCall = editingCallId ? callsData.find((c) => c.id === editingCallId) : null;

  const visibleCalls = filteredCalls();
  const communities = ['Todas', ...new Set(callsData.map(c => c.community))];
  const statuses = ['Todos', ...stateOrder];
  const tagChip = selectedTag
    ? `<button type="button" class="tag-chip" onclick="window.clearTagFilter()">Tag activo: ${selectedTag} ×</button>`
    : '';

  document.querySelector('#app').innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Call for Speakers Z</p>
        <h1>Speaker C4S Radar</h1>
        <p class="subtitle">Detecta oportunidades, controla deadlines y convierte ideas en candidaturas.</p>
      </div>
      <button onclick="window.exportMarkdown()">Exportar plan</button>
    </section>

    <section class="composer ${editingCall ? 'is-editing' : ''}" aria-label="Añadir evento">
      <h2>${editingCall ? 'Editar evento' : 'Añadir evento'}</h2>
      <form class="event-form" onsubmit="window.addCall(event)">
        <input name="name" required placeholder="Nombre del evento" value="${escapeAttr(editingCall?.name)}" />
        <input name="community" required placeholder="Comunidad" value="${escapeAttr(editingCall?.community)}" />
        <input name="deadline" required type="date" value="${escapeAttr(editingCall?.deadline)}" />
        <input name="city" required placeholder="Ciudad u Online" value="${escapeAttr(editingCall?.city)}" />
        <select name="format" required>
          ${formatOptions.map(format => `<option value="${format}" ${format === editingCall?.format ? 'selected' : ''}>${format}</option>`).join('')}
        </select>
        <select name="status" required>
          ${stateOrder.map(status => `<option value="${status}" ${status === editingCall?.status ? 'selected' : ''}>${status}</option>`).join('')}
        </select>
        <input name="tags" placeholder="Tags separadas por coma" value="${escapeAttr(editingCall?.tags?.join(', ') || '')}" />
        <select name="proposalId">
          ${proposalOptions(editingCall?.proposalId || '')}
        </select>
        <input name="audience" placeholder="Audiencia" value="${escapeAttr(editingCall?.audience || '')}" />
        <input name="source" placeholder="URL del C4S" value="${escapeAttr(editingCall?.source || '')}" />
        <button type="submit">${editingCall ? 'Guardar cambios' : 'Guardar evento'}</button>
        ${editingCall ? '<button type="button" class="btn-secondary" onclick="window.cancelEditCall()">Cancelar edición</button>' : ''}
      </form>
      <p class="form-hint">Se guarda directamente en src/data/calls.json mientras corre npm run dev.</p>
    </section>

    ${proposalsPanel()}

    <section class="notify-panel" aria-label="Notificaciones">
      <div>
        <h2>Notificaciones</h2>
        <p>Estado: <strong>${getNotificationStatusLabel()}</strong></p>
      </div>
      <div class="notify-actions">
        <button type="button" class="btn-secondary" onclick="window.enableNotifications()">Activar notificaciones</button>
        <button type="button" class="btn-secondary" onclick="window.testDeadlineNotifications()">Probar ahora</button>
      </div>
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
        <p class="results-count">Mostrando ${visibleCalls.length} de ${callsData.length} oportunidades</p>
        ${filters(communities, statuses)}
        ${tagChip}
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
        Buscar
        <input
          type="search"
          placeholder="Evento, comunidad, tag o audiencia"
          value="${escapeAttr(searchQuery)}"
          oninput="window.setSearchQuery(this.value)"
        />
      </label>
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
      <div class="tags">${call.tags.map(t => `<button type="button" class="tag-btn ${t === selectedTag ? 'active' : ''}" onclick="window.setTagFilter(decodeURIComponent('${encodeURIComponent(t)}'))">${t}</button>`).join('')}</div>
      <p class="next-action">✨ Siguiente acción: ${nextAction(call)}</p>
      <div class="card-notes">
        <label for="note-${call.id}">Aprendizajes / notas</label>
        <textarea id="note-${call.id}" placeholder="Qué aprendiste o qué mejorarías para este evento" onchange="window.updateCallNote('${call.id}', this.value)">${escapeAttr(callNotes[call.id] || '')}</textarea>
        ${callNotes[call.id] ? `<p class="note-preview">${escapeAttr(notePreview(callNotes[call.id]))}</p>` : ''}
      </div>
      <div class="card-actions">
        <label>
          Estado
          <select onchange="window.updateCallStatus('${call.id}', this.value)">
            ${stateOrder.map(status => `<option value="${status}" ${status === call.status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </label>
        <button type="button" class="btn-secondary" onclick="window.startEditCall('${call.id}')">Editar</button>
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

window.setSearchQuery = function setSearchQuery(value) {
  const nextValue = String(value || '');
  if (searchDebounceId) {
    window.clearTimeout(searchDebounceId);
  }
  searchDebounceId = window.setTimeout(() => {
    searchQuery = nextValue.trim();
    render();
  }, 200);
};

window.setTagFilter = function setTagFilter(value) {
  selectedTag = value;
  render();
};

window.clearTagFilter = function clearTagFilter() {
  selectedTag = '';
  render();
};

window.enableNotifications = async function enableNotifications() {
  if (!('Notification' in window)) {
    alert('Este navegador no soporta notificaciones.');
    return;
  }

  if (Notification.permission === 'granted') {
    alert('Las notificaciones ya están activadas.');
    await notifyCriticalDeadlines();
    render();
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    await notifyCriticalDeadlines();
    alert('Notificaciones activadas.');
  } else {
    alert('No se activaron las notificaciones.');
  }
  render();
};

window.testDeadlineNotifications = async function testDeadlineNotifications() {
  await notifyCriticalDeadlines();
  alert('Se enviaron notificaciones para deadlines críticos pendientes.');
};

window.updateCallNote = function updateCallNote(id, value) {
  const note = String(value || '').trim();
  if (note) {
    callNotes[id] = note;
  } else {
    delete callNotes[id];
  }
  saveCallNotes();
  render();
};

window.startEditCall = function startEditCall(id) {
  editingCallId = id;
  render();
  document.querySelector('.composer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.cancelEditCall = function cancelEditCall() {
  editingCallId = null;
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

window.createProposal = async function createProposal() {
  const title = window.prompt('Título de la propuesta:');
  if (!title) return;

  const tagsInput = window.prompt('Tags (separadas por coma):', '');
  const level = window.prompt('Nivel (Intro, Intermedio, Avanzado):', 'Intermedio') || 'Intermedio';

  const payload = {
    title: title.trim(),
    tags: String(tagsInput || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    level: level.trim()
  };

  try {
    const response = await fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('No se pudo crear propuesta');
    }

    const saved = await response.json();
    proposalsData = [...proposalsData, saved];
    render();
    alert(`Propuesta creada: ${saved.title}`);
  } catch {
    alert('No se pudo crear la propuesta. Verifica que npm run dev esté activo.');
  }
};

window.editProposal = async function editProposal(id) {
  const proposal = proposalsData.find((item) => item.id === id);
  if (!proposal) return;

  const title = window.prompt('Editar título:', proposal.title);
  if (!title) return;
  const tagsInput = window.prompt('Editar tags (coma):', proposal.tags.join(', '));
  const level = window.prompt('Editar nivel:', proposal.level) || proposal.level;

  const payload = {
    title: title.trim(),
    tags: String(tagsInput || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    level: level.trim()
  };

  try {
    const response = await fetch(`/api/proposals/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar propuesta');
    }

    const saved = await response.json();
    proposalsData = proposalsData.map((item) => (item.id === id ? saved : item));
    render();
    alert(`Propuesta actualizada: ${saved.title}`);
  } catch {
    alert('No se pudo actualizar la propuesta. Verifica que npm run dev esté activo.');
  }
};

window.deleteProposal = async function deleteProposal(id) {
  const linked = callsData.some((call) => call.proposalId === id);
  if (linked) {
    alert('No se puede borrar: la propuesta está vinculada a uno o más eventos.');
    return;
  }

  const confirmed = window.confirm('¿Seguro que quieres borrar esta propuesta?');
  if (!confirmed) return;

  try {
    const response = await fetch(`/api/proposals/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('No se pudo borrar propuesta');
    }

    proposalsData = proposalsData.filter((item) => item.id !== id);
    render();
    alert('Propuesta borrada.');
  } catch {
    alert('No se pudo borrar la propuesta. Verifica que npm run dev esté activo.');
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
        `- Siguiente acción: ${nextAction(c)}`,
        `- Nota: ${callNotes[c.id] || '—'}`
      ].join('\n');
    })
  ].join('\n\n');
  navigator.clipboard?.writeText(markdown);
  alert('Plan copiado al portapapeles:\n\n' + markdown);
};

window.addCall = async function addCall(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const isEditing = Boolean(editingCallId);
  const endpoint = isEditing ? `/api/calls/${encodeURIComponent(editingCallId)}` : '/api/calls';
  const method = isEditing ? 'PATCH' : 'POST';
  const payload = {
    name: String(formData.get('name') || '').trim(),
    community: String(formData.get('community') || '').trim(),
    deadline: String(formData.get('deadline') || '').trim(),
    city: String(formData.get('city') || '').trim(),
    format: String(formData.get('format') || '').trim(),
    status: String(formData.get('status') || '').trim(),
    tags: String(formData.get('tags') || '').split(',').map(tag => tag.trim()).filter(Boolean),
    proposalId: String(formData.get('proposalId') || '').trim() || null,
    audience: String(formData.get('audience') || '').trim(),
    source: String(formData.get('source') || '').trim()
  };

  try {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('No se pudo guardar.');
    }

    const savedCall = await response.json();
    callsData = isEditing
      ? callsData.map((call) => (call.id === editingCallId ? savedCall : call))
      : [...callsData, savedCall];
    editingCallId = null;
    event.target.reset();
    render();
    alert(isEditing ? `Evento actualizado: ${savedCall.name}` : `Evento añadido: ${savedCall.name}`);
  } catch {
    alert('No se pudo guardar el evento. Verifica que npm run dev esté activo.');
  }
};

render();

// Registro PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        swRegistration = registration;
        notifyCriticalDeadlines();
      })
      .catch((err) => {
        console.warn('SW registration failed:', err);
      });
  });
}
