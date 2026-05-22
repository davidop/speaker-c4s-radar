(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`cfs-001`,name:`Azure AI Foundry: Construyendo agentes con MCP`,community:`Microsoft Reactor Madrid`,deadline:`2026-06-03`,city:`Madrid, España`,format:`Hybrid`,tags:[`Azure`,`AI Foundry`,`MCP`,`Agentes`],status:`Ready`,proposalId:null,audience:`Desarrolladores y arquitectos cloud interesados en IA generativa.`,source:`https://developer.microsoft.com/en-us/reactor/`},{id:`cfs-002`,name:`GitHub Universe 2026 — Call for Speakers`,community:`GitHub (Sessionize)`,deadline:`2026-06-15`,city:`San Francisco, CA`,format:`In person`,tags:[`GitHub Copilot`,`Open Source`,`DevEx`,`AI`],status:`Draft`,proposalId:`p-001`,audience:`Developers, maintainers y contributors de open source a nivel mundial.`,source:`https://sessionize.com/github-universe-2026/`},{id:`cfs-003`,name:`DotNetConf LATAM 2026`,community:`DotNet Foundation (Sessionize)`,deadline:`2026-07-01`,city:`Online — LATAM`,format:`Remote`,tags:[`.NET`,`C#`,`Blazor`,`ASP.NET`],status:`Idea`,proposalId:null,audience:`Desarrolladores .NET de toda Latinoamérica.`,source:`https://sessionize.com/dotnetconf-latam/`},{id:`cfs-004`,name:`DevOps Days España 2026`,community:`DevOps Days España (Sessionize)`,deadline:`2026-07-20`,city:`Barcelona, España`,format:`In person`,tags:[`DevOps`,`GitHub Actions`,`Platform Engineering`,`Cloud Native`],status:`Ready`,proposalId:null,audience:`Ingenieros DevOps, SREs y equipos de plataforma.`,source:`https://sessionize.com/devopsdays-spain-2026/`},{id:`cfs-005`,name:`Global Azure AI Community Day`,community:`Microsoft Azure Community (Sessionize)`,deadline:`2026-08-01`,city:`Dublin, Ireland`,format:`In person`,tags:[`Azure`,`AI`,`Copilot Studio`,`Call for Speakers`],status:`Submitted`,proposalId:`p-002`,audience:`Comunidad Azure, MVPs y partners.`,source:`https://sessionize.com/azure-ai-community-day/`},{id:`cfs-006`,name:`GitHub Constellation Madrid 2026`,community:`GitHub Community (Meetup)`,deadline:`2026-08-15`,city:`Madrid, España`,format:`In person`,tags:[`GitHub`,`Open Source`,`Innersource`,`GitHub Actions`],status:`Accepted`,proposalId:`p-003`,audience:`Comunidad developer de Madrid: contributors, maintainers y tech leads.`,source:`https://github.com/community`},{id:`cfs-007`,name:`Power Platform World Tour 2026 — Buenos Aires`,community:`Microsoft Power Community (Sessionize)`,deadline:`2026-05-10`,city:`Buenos Aires, Argentina`,format:`Hybrid`,tags:[`Power Platform`,`Power Automate`,`Copilot Studio`,`Low Code`],status:`Rejected`,proposalId:`p-001`,audience:`Power Users, citizen developers y equipos de negocio.`,source:`https://sessionize.com/power-platform-world-tour/`},{id:`cfs-008`,name:`Microsoft Fabric Analytics Summit 2026`,community:`Microsoft Fabric Community (Sessionize)`,deadline:`2026-09-05`,city:`Online`,format:`Remote`,tags:[`Microsoft Fabric`,`Power BI`,`Data Engineering`,`Lakehouse`],status:`Ready`,proposalId:null,audience:`Profesionales de datos, analistas de negocio y data engineers.`,source:`https://sessionize.com/microsoft-fabric-analytics-summit/`}],t=[{id:`p-001`,title:`Copilot como copiloto real de comunidades`,tags:[`GitHub Copilot`,`DevEx`],level:`Intermedio`},{id:`p-002`,title:`De prompt a producto con AI y cloud native`,tags:[`AI`,`Copilot`,`Azure`],level:`Intro`},{id:`p-003`,title:`Automatiza tu comunidad con GitHub Actions`,tags:[`Open Source`,`Actions`],level:`Intermedio`}],n=new Date;n.setHours(0,0,0,0);var r=[`Idea`,`Draft`,`Ready`,`Submitted`,`Accepted`,`Rejected`],i=[`Remote`,`Hybrid`,`In person`],a=`Todas`,o=`Todos`,s=[...e];function c(e){let t=new Date(`${e}T00:00:00`)-n;return Math.ceil(t/(1e3*60*60*24))}function l(e){let t=c(e.deadline);return t<=7?`critical`:t<=14?`soon`:`safe`}function u(e){return c(e.deadline)<=7&&!e.proposalId?`Riesgo alto`:`Controlado`}function d(e){let t=c(e.deadline);return!e.proposalId&&t<=7?`Crear propuesta hoy`:e.proposalId?e.status===`Draft`?`Revisar abstract`:e.status===`Ready`?`Enviar candidatura`:e.status===`Submitted`?`Hacer seguimiento`:e.status===`Accepted`?`Preparar sesión`:e.status===`Rejected`?`Guardar aprendizajes`:`Revisar oportunidad`:`Definir idea de charla`}function f(e){return t.find(t=>t.id===e)?.title??`Sin propuesta asociada`}function p(){return s.filter(e=>{let t=a===`Todas`||e.community===a,n=o===`Todos`||e.status===o;return t&&n})}function m(){let e=s.filter(e=>![`Accepted`,`Rejected`].includes(e.status)),t=s.filter(e=>c(e.deadline)<=14).length,n=s.filter(e=>e.status===`Submitted`).length,a=s.filter(e=>!e.proposalId).length,o=p(),l=[`Todas`,...new Set(s.map(e=>e.community))],u=[`Todos`,...r];document.querySelector(`#app`).innerHTML=`
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
          ${i.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
        <select name="status" required>
          ${r.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
        <input name="tags" placeholder="Tags separadas por coma" />
        <input name="audience" placeholder="Audiencia" />
        <input name="source" placeholder="URL del C4S" />
        <button type="submit">Guardar evento</button>
      </form>
      <p class="form-hint">Se guarda directamente en src/data/calls.json mientras corre npm run dev.</p>
    </section>

    <section class="kpis">
      ${h(`C4S activos`,e.length)}
      ${h(`Deadlines próximos`,t)}
      ${h(`Enviadas`,n)}
      ${h(`Sin propuesta`,a)}
    </section>

    <section class="layout">
      <div>
        <h2>Radar de oportunidades</h2>
        ${g(l,u)}
        <div class="cards">${o.map(_).join(``)}</div>
      </div>
      <aside>
        <h2>Pipeline</h2>
        ${r.map(v).join(``)}
      </aside>
    </section>
  `}function h(e,t){return`<article class="kpi"><span>${e}</span><strong>${t}</strong></article>`}function g(e,t){return`
    <section class="filters" aria-label="Filtros del radar">
      <label>
        Comunidad
        <select onchange="window.setCommunityFilter(this.value)">
          ${e.map(e=>`
            <option value="${e}" ${e===a?`selected`:``}>
              ${e}
            </option>
          `).join(``)}
        </select>
      </label>
      <label>
        Estado
        <select onchange="window.setStatusFilter(this.value)">
          ${t.map(e=>`
            <option value="${e}" ${e===o?`selected`:``}>
              ${e}
            </option>
          `).join(``)}
        </select>
      </label>
    </section>
  `}function _(e){let t=c(e.deadline);return`
    <article class="card ${l(e)}">
      <div class="card-title">
        <h3>${e.name}</h3>
        <span>${t} días</span>
      </div>
      <p>${e.community} · ${e.city} · ${e.format}</p>
      <p class="proposal">${f(e.proposalId)}</p>
      <p class="audience">👥 Audiencia: ${e.audience??`Comunidad técnica`}</p>
      ${e.source?`<a class="source-link" href="${e.source}" target="_blank" rel="noreferrer">Ver C4S original →</a>`:``}
      <div class="tags">${e.tags.map(e=>`<span>${e}</span>`).join(``)}</div>
      <p class="next-action">✨ Siguiente acción: ${d(e)}</p>
      <footer><b>${e.status}</b><em>${u(e)}</em></footer>
    </article>`}function v(e){return`<div class="lane"><strong>${e}</strong><span>${s.filter(t=>t.status===e).map(e=>e.name).join(`<br>`)||`—`}</span></div>`}window.setCommunityFilter=function(e){a=e,m()},window.setStatusFilter=function(e){o=e,m()},window.exportMarkdown=function(){let e=[`# Speaker C4S Radar · Plan de acción`,``,`Generado el ${n.toLocaleDateString(`es-ES`)}`,``,...s.map(e=>[`## ${e.name}`,`- Comunidad: ${e.community}`,`- Formato: ${e.format} · ${e.city}`,`- Deadline: ${e.deadline} (${c(e.deadline)} días)`,`- Estado: ${e.status}`,`- Riesgo: ${u(e)}`,`- Propuesta: ${f(e.proposalId)}`,`- Siguiente acción: ${d(e)}`].join(`
`))].join(`

`);navigator.clipboard?.writeText(e),alert(`Plan copiado al portapapeles:

`+e)},window.addCall=async function(e){e.preventDefault();let t=new FormData(e.target),n={name:String(t.get(`name`)||``).trim(),community:String(t.get(`community`)||``).trim(),deadline:String(t.get(`deadline`)||``).trim(),city:String(t.get(`city`)||``).trim(),format:String(t.get(`format`)||``).trim(),status:String(t.get(`status`)||``).trim(),tags:String(t.get(`tags`)||``).split(`,`).map(e=>e.trim()).filter(Boolean),audience:String(t.get(`audience`)||``).trim(),source:String(t.get(`source`)||``).trim()};try{let t=await fetch(`/api/calls`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!t.ok)throw Error(`No se pudo guardar.`);let r=await t.json();s=[...s,r],e.target.reset(),m(),alert(`Evento añadido: ${r.name}`)}catch{alert(`No se pudo guardar el evento. Verifica que npm run dev esté activo.`)}},m(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(e=>{console.warn(`SW registration failed:`,e)})});