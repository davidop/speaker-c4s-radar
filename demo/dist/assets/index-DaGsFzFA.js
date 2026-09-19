(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`cfs-001`,name:`Power Platform World Tour 2026 — Buenos Aires`,community:`Microsoft Power Community (Sessionize)`,deadline:`2026-05-10`,city:`Buenos Aires, Argentina`,format:`Hybrid`,tags:[`Power Platform`,`Power Automate`,`Copilot Studio`,`Low Code`],status:`Rejected`,proposalId:`p-001`,audience:`Power Users, citizen developers y equipos de negocio.`,source:`https://sessionize.com/power-platform-world-tour/`,deadlineConfidence:`estimated`},{id:`cfs-002`,name:`Azure AI Foundry: Construyendo agentes con MCP`,community:`Microsoft Reactor Madrid`,deadline:`2026-06-03`,city:`Madrid, España`,format:`Hybrid`,tags:[`Azure`,`AI Foundry`,`MCP`,`Agentes`],status:`Ready`,proposalId:null,audience:`Desarrolladores y arquitectos cloud interesados en IA generativa.`,source:`https://developer.microsoft.com/en-us/reactor/`,deadlineConfidence:`exact`},{id:`cfs-003`,name:`GitHub Universe 2026 — Call for Speakers`,community:`GitHub (Sessionize)`,deadline:`2026-06-15`,city:`San Francisco, CA`,format:`In person`,tags:[`GitHub Copilot`,`Open Source`,`DevEx`,`AI`],status:`Draft`,proposalId:`p-001`,audience:`Developers, maintainers y contributors de open source a nivel mundial.`,source:`https://sessionize.com/github-universe-2026/`,deadlineConfidence:`estimated`},{id:`cfs-004`,name:`DotNetConf LATAM 2026`,community:`DotNet Foundation (Sessionize)`,deadline:`2026-07-01`,city:`Online — LATAM`,format:`Remote`,tags:[`.NET`,`C#`,`Blazor`,`ASP.NET`],status:`Idea`,proposalId:null,audience:`Desarrolladores .NET de toda Latinoamérica.`,source:`https://sessionize.com/dotnetconf-latam/`,deadlineConfidence:`estimated`},{id:`cfs-005`,name:`DevOps Days España 2026`,community:`DevOps Days España (Sessionize)`,deadline:`2026-07-20`,city:`Barcelona, España`,format:`In person`,tags:[`DevOps`,`GitHub Actions`,`Platform Engineering`,`Cloud Native`],status:`Ready`,proposalId:null,audience:`Ingenieros DevOps, SREs y equipos de plataforma.`,source:`https://sessionize.com/devopsdays-spain-2026/`,deadlineConfidence:`estimated`},{id:`cfs-006`,name:`Global Azure AI Community Day`,community:`Microsoft Azure Community (Sessionize)`,deadline:`2026-08-01`,city:`Dublin, Ireland`,format:`In person`,tags:[`Azure`,`AI`,`Copilot Studio`,`Call for Speakers`],status:`Submitted`,proposalId:`p-002`,audience:`Comunidad Azure, MVPs y partners.`,source:`https://sessionize.com/azure-ai-community-day/`,deadlineConfidence:`estimated`},{id:`cfs-007`,name:`GitHub Constellation Madrid 2026`,community:`GitHub Community (Meetup)`,deadline:`2026-08-15`,city:`Madrid, España`,format:`In person`,tags:[`GitHub`,`Open Source`,`Innersource`,`GitHub Actions`],status:`Accepted`,proposalId:`p-003`,audience:`Comunidad developer de Madrid: contributors, maintainers y tech leads.`,source:`https://github.com/community`,deadlineConfidence:`exact`},{id:`cfs-008`,name:`Microsoft Fabric Analytics Summit 2026`,community:`Microsoft Fabric Community (Sessionize)`,deadline:`2026-09-05`,city:`Online`,format:`Remote`,tags:[`Microsoft Fabric`,`Power BI`,`Data Engineering`,`Lakehouse`],status:`Ready`,proposalId:null,audience:`Profesionales de datos, analistas de negocio y data engineers.`,source:`https://sessionize.com/microsoft-fabric-analytics-summit/`,deadlineConfidence:`estimated`}],t=[{id:`p-001`,title:`Copilot como copiloto real de comunidades`,tags:[`GitHub Copilot`,`DevEx`],level:`Intermedio`},{id:`p-002`,title:`De prompt a producto con AI y cloud native`,tags:[`AI`,`Copilot`,`Azure`],level:`Intro`},{id:`p-003`,title:`Automatiza tu comunidad con GitHub Actions`,tags:[`Open Source`,`Actions`],level:`Intermedio`}];function n(e,t){let n=new Date(t);n.setHours(0,0,0,0);let r=new Date(`${e}T00:00:00`)-n;return Math.ceil(r/(1e3*60*60*24))}function r(e){return e<=7?`critical`:e<=14?`soon`:`safe`}function i(e,t){return n(e.deadline,t)<=7&&!e.proposalId?`Riesgo alto`:`Controlado`}function a(e,t){let r=n(e.deadline,t);return!e.proposalId&&r<=7?`Crear propuesta hoy`:e.proposalId?e.status===`Draft`?`Revisar abstract`:e.status===`Ready`?`Enviar candidatura`:e.status===`Submitted`?`Hacer seguimiento`:e.status===`Accepted`?`Preparar sesión`:e.status===`Rejected`?`Guardar aprendizajes`:`Revisar oportunidad`:`Definir idea de charla`}async function o(e){let t=await fetch(`/api/calls`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`No se pudo guardar.`);return t.json()}async function s(e,t){let n=await fetch(`/api/calls/${encodeURIComponent(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`No se pudo actualizar.`);return n.json()}async function c(e){let t=await fetch(`/api/calls/${encodeURIComponent(e)}`,{method:`DELETE`});if(!t.ok)throw Error(`No se pudo borrar.`);return t.json()}async function l(e,t){let n=await fetch(`/api/proposals/${encodeURIComponent(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`No se pudo actualizar propuesta`);return n.json()}async function u(e){let t=await fetch(`/api/proposals/${encodeURIComponent(e)}`,{method:`DELETE`});if(!t.ok)throw Error(`No se pudo borrar propuesta`);return t.json()}var d=new Date;d.setHours(0,0,0,0);var f=[`Idea`,`Draft`,`Ready`,`Submitted`,`Accepted`,`Rejected`],p=[`Remote`,`Hybrid`,`In person`],m=`Todas`,h=`Todos`,g=``,_=``,v=null,y=[...e],b=[...t],x=null,S=!1,C=null,w=`c4s-notified-deadlines`,T=`c4s-call-notes`,E=(()=>{try{return JSON.parse(localStorage.getItem(T)||`{}`)}catch{return{}}})();function D(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`"`,`&quot;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`)}function O(e){return n(e,d)}function k(e){return r(O(e.deadline))}function A(e){return i(e,d)}function j(e){return a(e,d)}function M(e){return b.find(t=>t.id===e)?.title??`Sin propuesta asociada`}function N(e){return e===`estimated`?`Estimado`:e===`proxy`?`Proxy evento`:`Exacto`}function P(e){return`<option value="">Sin propuesta</option>`+b.map(t=>{let n=t.id===e?`selected`:``;return`<option value="${t.id}" ${n}>${t.title}</option>`}).join(``)}function F(){return`Notification`in window?Notification.permission===`granted`?`Activadas`:Notification.permission===`denied`?`Bloqueadas`:`Pendientes`:`No soportado`}function I(){try{return JSON.parse(localStorage.getItem(w)||`[]`)}catch{return[]}}function L(e){localStorage.setItem(w,JSON.stringify(e))}function R(){return y.filter(e=>{let t=O(e.deadline);return t>=0&&t<=7&&![`Accepted`,`Rejected`].includes(e.status)})}function z(e){return e?e.length>120?`${e.slice(0,120)}...`:e:``}function B(){localStorage.setItem(T,JSON.stringify(E))}async function V(){if(!C||!(`Notification`in window)||Notification.permission!==`granted`)return;let e=new Set(I()),t=R().filter(t=>!e.has(`${t.id}:${t.deadline}`));t.length!==0&&(C.active?.postMessage({type:`notify-deadlines`,payload:t.map(e=>({id:e.id,name:e.name,deadline:e.deadline,daysLeft:O(e.deadline),nextAction:j(e)}))}),t.forEach(t=>e.add(`${t.id}:${t.deadline}`)),L([...e]))}function H(){return`
    <section class="proposals-panel" aria-label="Gestionar propuestas">
      <div class="proposals-header">
        <h2>Propuestas</h2>
        <button type="button" class="btn-secondary" onclick="window.createProposal()">Nueva propuesta</button>
      </div>
      <div class="proposal-list">
        ${b.map(e=>`
          <article class="proposal-item">
            <div>
              <strong>${e.title}</strong>
              <p>${e.level} · ${e.tags.join(`, `)||`Sin tags`}</p>
            </div>
            <div class="proposal-actions">
              <button type="button" class="btn-secondary" onclick="window.editProposal('${e.id}')">Editar</button>
              <button type="button" class="danger" onclick="window.deleteProposal('${e.id}')">Borrar</button>
            </div>
          </article>
        `).join(``)||`<p class="proposal-empty">No hay propuestas aún.</p>`}
      </div>
    </section>
  `}function U(){return y.filter(e=>{let t=m===`Todas`||e.community===m,n=h===`Todos`||e.status===h,r=!g||e.tags.includes(g),i=[e.name,e.community,e.audience||``,...e.tags||[]].join(` `).toLowerCase(),a=!_||i.includes(_.toLowerCase());return t&&n&&r&&a})}function W(){let e=y.filter(e=>![`Accepted`,`Rejected`].includes(e.status)),t=y.filter(e=>O(e.deadline)<=14).length,n=y.filter(e=>e.status===`Submitted`).length,r=y.filter(e=>!e.proposalId).length,i=x?y.find(e=>e.id===x):null,a=U(),o=[`Todas`,...new Set(y.map(e=>e.community))],s=[`Todos`,...f],c=g?`<button type="button" class="tag-chip" onclick="window.clearTagFilter()">Tag activo: ${g} ×</button>`:``;document.querySelector(`#app`).innerHTML=`
    <section class="hero">
      <div>
        <p class="eyebrow">Call for Speakers</p>
        <h1>Speaker C4S Radar</h1>
        <p class="subtitle">Detecta oportunidades, controla deadlines y convierte ideas en candidaturas.</p>
      </div>
      <button onclick="window.exportMarkdown()">Exportar plan</button>
    </section>

    <section class="composer ${i?`is-editing`:``}" aria-label="Añadir evento">
      <div class="composer-header">
        <h2>${i?`Editar evento`:`Añadir evento`}</h2>
        ${i?``:`<button type="button" class="btn-secondary" onclick="window.toggleComposer()">${S?`Ocultar formulario`:`Mostrar formulario`}</button>`}
      </div>
      ${i||S?`<form class="event-form" onsubmit="window.addCall(event)">
        <input name="name" required placeholder="Nombre del evento" value="${D(i?.name)}" />
        <input name="community" required placeholder="Comunidad" value="${D(i?.community)}" />
        <input name="deadline" required type="date" value="${D(i?.deadline)}" />
        <input name="city" required placeholder="Ciudad u Online" value="${D(i?.city)}" />
        <select name="format" required>
          ${p.map(e=>`<option value="${e}" ${e===i?.format?`selected`:``}>${e}</option>`).join(``)}
        </select>
        <select name="status" required>
          ${f.map(e=>`<option value="${e}" ${e===i?.status?`selected`:``}>${e}</option>`).join(``)}
        </select>
        <input name="tags" placeholder="Tags separadas por coma" value="${D(i?.tags?.join(`, `)||``)}" />
        <select name="proposalId">
          ${P(i?.proposalId||``)}
        </select>
        <input name="audience" placeholder="Audiencia" value="${D(i?.audience||``)}" />
        <input name="source" placeholder="URL del C4S" value="${D(i?.source||``)}" />
        <button type="submit">${i?`Guardar cambios`:`Guardar evento`}</button>
        ${i?`<button type="button" class="btn-secondary" onclick="window.cancelEditCall()">Cancelar edición</button>`:``}
      </form>
      <p class="form-hint">Se guarda directamente en src/data/calls.json mientras corre npm run dev.</p>`:`<p class="form-hint">Formulario oculto para mantener foco en el radar. Pulsa "Mostrar formulario" para añadir evento.</p>`}
    </section>

    ${H()}

    <section class="notify-panel" aria-label="Notificaciones">
      <div>
        <h2>Notificaciones</h2>
        <p>Estado: <strong>${F()}</strong></p>
      </div>
      <div class="notify-actions">
        <button type="button" class="btn-secondary" onclick="window.enableNotifications()">Activar notificaciones</button>
        <button type="button" class="btn-secondary" onclick="window.testDeadlineNotifications()">Probar ahora</button>
      </div>
    </section>

    <section class="kpis">
      ${G(`C4S activos`,e.length)}
      ${G(`Deadlines próximos`,t)}
      ${G(`Enviadas`,n)}
      ${G(`Sin propuesta`,r)}
    </section>

    <section class="layout">
      <div>
        <h2>Radar de oportunidades</h2>
        <p class="results-count">Mostrando ${a.length} de ${y.length} oportunidades</p>
        ${K(o,s)}
        ${c}
        <div class="cards">${a.map(q).join(``)}</div>
      </div>
      <aside>
        <h2>Pipeline</h2>
        ${f.map(J).join(``)}
      </aside>
    </section>
  `}function G(e,t){return`<article class="kpi"><span>${e}</span><strong>${t}</strong></article>`}function K(e,t){return`
    <section class="filters" aria-label="Filtros del radar">
      <label>
        Buscar
        <input
          type="search"
          placeholder="Evento, comunidad, tag o audiencia"
          value="${D(_)}"
          oninput="window.setSearchQuery(this.value)"
        />
      </label>
      <label>
        Comunidad
        <select onchange="window.setCommunityFilter(this.value)">
          ${e.map(e=>`
            <option value="${e}" ${e===m?`selected`:``}>
              ${e}
            </option>
          `).join(``)}
        </select>
      </label>
      <label>
        Estado
        <select onchange="window.setStatusFilter(this.value)">
          ${t.map(e=>`
            <option value="${e}" ${e===h?`selected`:``}>
              ${e}
            </option>
          `).join(``)}
        </select>
      </label>
    </section>
  `}function q(e){let t=O(e.deadline),n=e.deadlineConfidence&&e.deadlineConfidence!==`exact`;return`
    <article class="card ${k(e)} ${n?`uncertain`:``}">
      <div class="card-title">
        <h3>${e.name}</h3>
        <span>${t} días</span>
      </div>
      <p>${e.community} · ${e.city} · ${e.format}</p>
      <p class="confidence">🗓️ Confianza deadline: ${N(e.deadlineConfidence||`exact`)}</p>
      <p class="proposal">${M(e.proposalId)}</p>
      <p class="audience">👥 Audiencia: ${e.audience??`Comunidad técnica`}</p>
      ${e.source?`<a class="source-link" href="${e.source}" target="_blank" rel="noreferrer">Ver C4S original →</a>`:``}
      <div class="tags">${e.tags.map(e=>`<button type="button" class="tag-btn ${e===g?`active`:``}" onclick="window.setTagFilter(decodeURIComponent('${encodeURIComponent(e)}'))">${e}</button>`).join(``)}</div>
      <p class="next-action">✨ Siguiente acción: ${j(e)}</p>
      <div class="card-notes">
        <label for="note-${e.id}">Aprendizajes / notas</label>
        <textarea id="note-${e.id}" placeholder="Qué aprendiste o qué mejorarías para este evento" onchange="window.updateCallNote('${e.id}', this.value)">${D(E[e.id]||``)}</textarea>
        ${E[e.id]?`<p class="note-preview">${D(z(E[e.id]))}</p>`:``}
      </div>
      <div class="card-actions">
        <label>
          Estado
          <select onchange="window.updateCallStatus('${e.id}', this.value)">
            ${f.map(t=>`<option value="${t}" ${t===e.status?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </label>
        <button type="button" class="btn-secondary" onclick="window.startEditCall('${e.id}')">Editar</button>
        <button type="button" class="danger" onclick="window.deleteCall('${e.id}')">Borrar</button>
      </div>
      <footer><b>${e.status}</b><em>${A(e)}</em></footer>
    </article>`}function J(e){let t=y.filter(t=>t.status===e);return`<div class="lane"><strong>${e} (${t.length})</strong><span>${t.map(e=>e.name).join(`<br>`)||`—`}</span></div>`}window.setCommunityFilter=function(e){m=e,W()},window.setStatusFilter=function(e){h=e,W()},window.setSearchQuery=function(e){let t=String(e||``);v&&window.clearTimeout(v),v=window.setTimeout(()=>{_=t.trim(),W()},200)},window.setTagFilter=function(e){g=e,W()},window.clearTagFilter=function(){g=``,W()},window.enableNotifications=async function(){if(!(`Notification`in window)){alert(`Este navegador no soporta notificaciones.`);return}if(Notification.permission===`granted`){alert(`Las notificaciones ya están activadas.`),await V(),W();return}await Notification.requestPermission()===`granted`?(await V(),alert(`Notificaciones activadas.`)):alert(`No se activaron las notificaciones.`),W()},window.testDeadlineNotifications=async function(){await V(),alert(`Se enviaron notificaciones para deadlines críticos pendientes.`)},window.updateCallNote=function(e,t){let n=String(t||``).trim();n?E[e]=n:delete E[e],B(),W()},window.startEditCall=function(e){x=e,S=!0,W(),document.querySelector(`.composer`)?.scrollIntoView({behavior:`smooth`,block:`start`})},window.cancelEditCall=function(){x=null,W()},window.toggleComposer=function(){S=!S,W()},window.updateCallStatus=async function(e,t){try{let n=await s(e,{status:t});y=y.map(t=>t.id===e?n:t),W()}catch{alert(`No se pudo actualizar el estado. Usa npm run dev para persistir cambios.`),W()}},window.deleteCall=async function(e){if(window.confirm(`¿Seguro que quieres borrar este evento?`))try{await c(e),y=y.filter(t=>t.id!==e),W(),alert(`Evento borrado.`)}catch{alert(`No se pudo borrar el evento. Usa npm run dev para persistir cambios.`)}},window.createProposal=async function e(){let t=window.prompt(`Título de la propuesta:`);if(!t)return;let n=window.prompt(`Tags (separadas por coma):`,``),r=window.prompt(`Nivel (Intro, Intermedio, Avanzado):`,`Intermedio`)||`Intermedio`,i={title:t.trim(),tags:String(n||``).split(`,`).map(e=>e.trim()).filter(Boolean),level:r.trim()};try{let t=await e(i);b=[...b,t],W(),alert(`Propuesta creada: ${t.title}`)}catch{alert(`No se pudo crear la propuesta. Verifica que npm run dev esté activo.`)}},window.editProposal=async function(e){let t=b.find(t=>t.id===e);if(!t)return;let n=window.prompt(`Editar título:`,t.title);if(!n)return;let r=window.prompt(`Editar tags (coma):`,t.tags.join(`, `)),i=window.prompt(`Editar nivel:`,t.level)||t.level,a={title:n.trim(),tags:String(r||``).split(`,`).map(e=>e.trim()).filter(Boolean),level:i.trim()};try{let t=await l(e,a);b=b.map(n=>n.id===e?t:n),W(),alert(`Propuesta actualizada: ${t.title}`)}catch{alert(`No se pudo actualizar la propuesta. Verifica que npm run dev esté activo.`)}},window.deleteProposal=async function(e){if(y.some(t=>t.proposalId===e)){alert(`No se puede borrar: la propuesta está vinculada a uno o más eventos.`);return}if(window.confirm(`¿Seguro que quieres borrar esta propuesta?`))try{await u(e),b=b.filter(t=>t.id!==e),W(),alert(`Propuesta borrada.`)}catch{alert(`No se pudo borrar la propuesta. Verifica que npm run dev esté activo.`)}},window.exportMarkdown=function(){let e=[`# Speaker C4S Radar · Plan de acción`,``,`Generado el ${d.toLocaleDateString(`es-ES`)}`,``,...y.map(e=>[`## ${e.name}`,`- Comunidad: ${e.community}`,`- Formato: ${e.format} · ${e.city}`,`- Deadline: ${e.deadline} (${O(e.deadline)} días)`,`- Confianza deadline: ${N(e.deadlineConfidence||`exact`)}`,`- Estado: ${e.status}`,`- Riesgo: ${A(e)}`,`- Propuesta: ${M(e.proposalId)}`,`- Siguiente acción: ${j(e)}`,`- Nota: ${E[e.id]||`—`}`].join(`
`))].join(`

`);navigator.clipboard?.writeText(e),alert(`Plan copiado al portapapeles:

`+e)},window.addCall=async function(e){e.preventDefault();let t=new FormData(e.target),n=!!x,r={name:String(t.get(`name`)||``).trim(),community:String(t.get(`community`)||``).trim(),deadline:String(t.get(`deadline`)||``).trim(),city:String(t.get(`city`)||``).trim(),format:String(t.get(`format`)||``).trim(),status:String(t.get(`status`)||``).trim(),tags:String(t.get(`tags`)||``).split(`,`).map(e=>e.trim()).filter(Boolean),proposalId:String(t.get(`proposalId`)||``).trim()||null,audience:String(t.get(`audience`)||``).trim(),source:String(t.get(`source`)||``).trim()};try{let t=n?await s(x,r):await o(r);y=n?y.map(e=>e.id===x?t:e):[...y,t],x=null,S=!1,e.target.reset(),W(),alert(n?`Evento actualizado: ${t.name}`:`Evento añadido: ${t.name}`)}catch{alert(`No se pudo guardar el evento. Verifica que npm run dev esté activo.`)}},W(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).then(e=>{C=e,V()}).catch(e=>{console.warn(`SW registration failed:`,e)})});