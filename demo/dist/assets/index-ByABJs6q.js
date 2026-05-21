(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`cfs-001`,name:`OpenClawNet - Automation + Azure + Foundry`,community:`Microsoft Reactor London (Meetup)`,deadline:`2026-05-27`,city:`Online`,format:`Remote`,tags:[`Azure`,`AI Foundry`,`GitHub Copilot`],status:`Ready`,proposalId:null,audience:`Comunidad Microsoft Reactor. [ADVERTENCIA] Meetup muestra fecha de evento, no deadline de CFP.`,source:`https://www.meetup.com/microsoft-reactor-london/events/313946133/`},{id:`cfs-002`,name:`GitHub Copilot - Understanding Budgets [AMER/EMEA]`,community:`Microsoft Reactor London (Meetup)`,deadline:`2026-05-27`,city:`Online`,format:`Remote`,tags:[`GitHub Copilot`,`FinOps`],status:`Ready`,proposalId:null,audience:`Administradores de GitHub Copilot y leads de desarrollo. [ADVERTENCIA] Meetup muestra fecha de evento, no deadline de CFP.`,source:`https://www.meetup.com/microsoft-reactor-london/events/314852066/`},{id:`cfs-003`,name:`Planning in Microsoft Fabric: From Semantic Models to Integrated Planning`,community:`Microsoft Reactor London (Meetup)`,deadline:`2026-05-28`,city:`Online`,format:`Remote`,tags:[`Microsoft Fabric`,`Power BI`,`Data`],status:`Ready`,proposalId:null,audience:`Profesionales de datos, analistas y negocio. [ADVERTENCIA] Meetup muestra fecha de evento, no deadline de CFP.`,source:`https://www.meetup.com/microsoft-reactor-london/events/314046552/`},{id:`cfs-004`,name:`.NET Day on Agentic Modernization`,community:`Microsoft Reactor London (Meetup)`,deadline:`2026-06-16`,city:`Online`,format:`Remote`,tags:[`.NET`,`Azure`,`Agentic AI`],status:`Ready`,proposalId:null,audience:`Equipos .NET y cloud. [ADVERTENCIA] Meetup muestra fecha de evento, no deadline de CFP.`,source:`https://www.meetup.com/microsoft-reactor-london/events/314880226/`},{id:`cfs-005`,name:`Global Azure & AI Community Day`,community:`Microsoft Azure Community (Sessionize)`,deadline:`2025-10-05`,city:`Dublin, Ireland`,format:`In person`,tags:[`Azure`,`AI`,`Call for Speakers`],status:`Submitted`,proposalId:null,audience:`Comunidad Azure y AI. [ADVERTENCIA] Sessionize marca fecha del evento como 'to be defined'.`,source:`https://sessionize.com/azure-ai-community-day/`},{id:`cfs-006`,name:`2025 Tampa Fabric User Group`,community:`Tampa Fabric User Group (Sessionize)`,deadline:`2025-12-16`,city:`Tampa, Florida, United States`,format:`In person`,tags:[`Microsoft Fabric`,`Data Platform`,`Call for Speakers`],status:`Submitted`,proposalId:null,audience:`Profesionales de datos y SQL/Fabric. [ADVERTENCIA] Sessionize marca fecha del evento como 'to be defined'.`,source:`https://sessionize.com/2025-tampa-fabric-user-group-call-for-sp/`},{id:`cfs-007`,name:`AI and Copilot Innovations Summit, India, Gurugram`,community:`Microsoft + Community + Partners (Sessionize)`,deadline:`2024-08-20`,city:`Gurugram, India`,format:`In person`,tags:[`AI`,`Copilot`,`Call for Sessions`],status:`Submitted`,proposalId:null,audience:`Usuarios, liderazgo Microsoft, MVPs y partners.`,source:`https://sessionize.com/ai-and-copilot-innovations-summit-indi/`},{id:`cfs-008`,name:`2019 Global Microsoft 365 Developer Bootcamp in Hamburg`,community:`Global Microsoft 365 Developer Bootcamp (Sessionize)`,deadline:`2019-08-31`,city:`Hamburg, Germany`,format:`In person`,tags:[`Microsoft 365`,`Microsoft Graph`,`Call for Speakers`],status:`Submitted`,proposalId:null,audience:`Desarrolladores Microsoft 365, MVPs y community leaders.`,source:`https://sessionize.com/2019-global-microsoft-365-dev-bootcamp-hamburg/`}],t=[{id:`p-001`,title:`Copilot como copiloto real de comunidades`,tags:[`GitHub Copilot`,`DevEx`],level:`Intermedio`},{id:`p-002`,title:`De prompt a producto con AI y cloud native`,tags:[`AI`,`Copilot`,`Azure`],level:`Intro`},{id:`p-003`,title:`Automatiza tu comunidad con GitHub Actions`,tags:[`Open Source`,`Actions`],level:`Intermedio`}],n=new Date;n.setHours(0,0,0,0);var r=[`Idea`,`Draft`,`Ready`,`Submitted`,`Accepted`,`Rejected`],i=[`Remote`,`Hybrid`,`In person`],a=`Todas`,o=`Todos`,s=[...e];function c(e){let t=new Date(`${e}T00:00:00`)-n;return Math.ceil(t/(1e3*60*60*24))}function l(e){let t=c(e.deadline);return t<=7?`critical`:t<=14?`soon`:`safe`}function u(e){return c(e.deadline)<=7&&!e.proposalId?`Riesgo alto`:`Controlado`}function d(e){let t=c(e.deadline);return!e.proposalId&&t<=7?`Crear propuesta hoy`:e.proposalId?e.status===`Draft`?`Revisar abstract`:e.status===`Ready`?`Enviar candidatura`:e.status===`Submitted`?`Hacer seguimiento`:e.status===`Accepted`?`Preparar sesión`:e.status===`Rejected`?`Guardar aprendizajes`:`Revisar oportunidad`:`Definir idea de charla`}function f(e){return t.find(t=>t.id===e)?.title??`Sin propuesta asociada`}function p(){return s.filter(e=>{let t=a===`Todas`||e.community===a,n=o===`Todos`||e.status===o;return t&&n})}function m(){let e=s.filter(e=>![`Accepted`,`Rejected`].includes(e.status)),t=s.filter(e=>c(e.deadline)<=14).length,n=s.filter(e=>e.status===`Submitted`).length,a=s.filter(e=>!e.proposalId).length,o=p(),l=[`Todas`,...new Set(s.map(e=>e.community))],u=[`Todos`,...r];document.querySelector(`#app`).innerHTML=`
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

`+e)},window.addCall=async function(e){e.preventDefault();let t=new FormData(e.target),n={name:String(t.get(`name`)||``).trim(),community:String(t.get(`community`)||``).trim(),deadline:String(t.get(`deadline`)||``).trim(),city:String(t.get(`city`)||``).trim(),format:String(t.get(`format`)||``).trim(),status:String(t.get(`status`)||``).trim(),tags:String(t.get(`tags`)||``).split(`,`).map(e=>e.trim()).filter(Boolean),audience:String(t.get(`audience`)||``).trim(),source:String(t.get(`source`)||``).trim()};try{let t=await fetch(`/api/calls`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!t.ok)throw Error(`No se pudo guardar.`);let r=await t.json();s=[...s,r],e.target.reset(),m(),alert(`Evento añadido: ${r.name}`)}catch{alert(`No se pudo guardar el evento. Verifica que npm run dev esté activo.`)}},m();