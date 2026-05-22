# Roadmap: Speaker C4S Radar

## Overview

This roadmap evolves the existing brownfield demo in incremental, low-risk phases. Each phase preserves current behavior as the baseline and adds reliability, maintainability, and delivery governance so future feature work can move faster with GSD.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Baseline and Data Confidence** - Lock current UX contract and improve dataset trust signals.
- [ ] **Phase 2: Automated Quality Gates** - Add testing and CI safeguards around business-critical behavior.
- [ ] **Phase 3: Safe Modular Refactor** - Break up monolithic app logic while preserving user-visible behavior.
- [ ] **Phase 4: GSD Delivery Loop** - Operationalize planning, verification, and PR summary workflow.
- [ ] **Phase 5: Responsive, PWA y Auditoria UX para Comunidad Tech** - Hacer la app instalable en movil y optimizar la experiencia para perfiles Microsoft, GitHub y Sessionize.
- [ ] **Phase 12: Automatizar discovery de C4S con GitHub Actions** - Automatizar ingestion de oportunidades C4S con PRs revisables.
- [ ] **Phase 13: GitHub Referente: Descubribilidad, Calidad y Comunidad** - Convertir el repositorio en una referencia publica mantenible y facil de adoptar.

## Phase Details

### Phase 1: Baseline and Data Confidence
**Goal**: As a speaker using the existing radar, I can trust opportunity data and urgency context without losing current dashboard behavior.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: [BASE-01, BASE-02, BASE-03, DATA-01, DATA-02]
**Success Criteria** (what must be TRUE):
  1. Current dashboard, filters, and export behavior remain intact and demonstrable.
  2. Dataset includes clear metadata for deadline confidence/quality.
  3. Stale or uncertain opportunities are visibly identifiable for maintainers and demo users.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Define baseline behavior contract and add data-quality metadata schema.
- [ ] 01-02: Apply curation updates and surface confidence indicators in existing UI flow.

### Phase 2: Automated Quality Gates
**Goal**: As a maintainer, I can validate core logic and write-path behavior automatically before merge.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: [QUAL-01, QUAL-02, QUAL-03]
**Success Criteria** (what must be TRUE):
  1. Unit tests cover urgency/risk/next-action logic with deterministic fixtures.
  2. Add-call middleware behavior (validation + ID generation) is covered by automated checks.
  3. CI runs build + tests and fails on regressions.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Introduce minimal JS test harness and test core helper logic.
- [ ] 02-02: Add middleware tests and wire tests into GitHub Actions workflow.

### Phase 3: Safe Modular Refactor
**Goal**: As a maintainer, I can modify radar features in smaller modules without changing user-facing behavior.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: [MAIN-01, MAIN-02]
**Success Criteria** (what must be TRUE):
  1. `demo/src/main.js` responsibilities are split into coherent modules with equivalent output behavior.
  2. Static deployment shows graceful handling for add-event operations when write API is unavailable.
  3. Existing UX styling and flow stay consistent with current demo expectations.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Extract state, domain helpers, and render concerns into focused modules.
- [ ] 03-02: Implement static-safe add-event fallback UX and verify no baseline regressions.

### Phase 4: GSD Delivery Loop
**Goal**: As a project maintainer, I can run repeatable phase planning, execution, verification, and PR summaries directly from repository artifacts.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: [FLOW-01, FLOW-02]
**Success Criteria** (what must be TRUE):
  1. Project artifacts stay synchronized through phase transitions and verification updates.
  2. Team can run `/gsd-discuss-phase`, `/gsd-plan-phase`, `/gsd-execute-phase`, and `/gsd-verify-work` against this roadmap.
  3. PR output includes configured sections for stories, risks, and release criteria.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Validate end-to-end GSD phase lifecycle on Phase 1-3 execution outputs.
- [ ] 04-02: Refine artifact conventions and PR-body usage guidance for maintainers.

### Phase 5: Responsive, PWA y Auditoria UX para Comunidad Tech
**Goal**: Como speaker y contribuidor tecnico de la comunidad Microsoft, GitHub o Sessionize, quiero usar el radar desde mi movil y ver una interfaz que entiende mi contexto (eventos Microsoft, repos GitHub, sesiones Sessionize), para gestionar mis CFPs en cualquier momento y lugar.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: [UX-01, UX-02, UX-03, PWA-01]
**Success Criteria** (what must be TRUE):
  1. La app es instalable como PWA en iOS y Android con icono y splash screen.
  2. El layout es usable y legible en pantallas de 375px en adelante sin scroll horizontal.
  3. Las comunidades, etiquetas y fuentes del dataset reflejan eventos reales de Microsoft, GitHub y Sessionize.
  4. La auditoria UX identifica y resuelve al menos 3 puntos de friccion para estos perfiles de usuario.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Auditoria UX y responsive - revisar contraste, layout movil, y adaptar datos al perfil de usuario.
- [ ] 05-02: Implementar PWA (manifest, service worker, iconos) y validar instalacion en movil.

### Phase 6: Editar, borrar y cambiar estado de calls desde la tarjeta
**Goal**: Como speaker, quiero poder cambiar el estado de un call directamente desde su tarjeta, editar sus campos si hay un error, y borrarlo si ya no es relevante, sin tener que editar JSON manualmente.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: [INT-01, INT-02, INT-03]
**Success Criteria** (what must be TRUE):
  1. Cada tarjeta tiene un selector de estado inline que persiste el cambio via API.
  2. Un boton "Editar" abre un formulario con los datos actuales pre-rellenados.
  3. Un boton "Borrar" muestra confirmacion y elimina el registro del JSON.
**Plans**: 2 plans

Plans:
- [ ] 06-01: Anadir selector de estado inline y boton de borrado a cada tarjeta.
- [ ] 06-02: Anadir flujo de edicion con formulario pre-rellenado y guardar via API.

### Phase 7: Gestion de propuestas desde la UI
**Goal**: Como speaker, quiero crear, editar y vincular mis propuestas de charla desde la propia app, sin tocar el codigo fuente, para mantener la relacion entre mis charlas y los eventos donde las presento.
**Mode:** mvp
**Depends on**: Phase 6
**Requirements**: [PROP-01, PROP-02]
**Success Criteria** (what must be TRUE):
  1. Las propuestas se gestionan en `proposals.json` (separado de `calls.json`), editable desde la UI.
  2. Al crear o editar un call, el selector de propuesta lista las propuestas existentes y permite crear una nueva inline.
  3. El titulo de la propuesta vinculada se muestra correctamente en la tarjeta.
**Plans**: 2 plans

Plans:
- [ ] 07-01: Extraer proposals[] a proposals.json y anadir API de lectura/escritura de propuestas.
- [ ] 07-02: Anadir UI de gestion de propuestas (crear, editar, borrar) y selector inline en formulario de call.

### Phase 8: Busqueda de texto y filtro por tag
**Goal**: Como speaker con muchas oportunidades en el radar, quiero buscar por nombre de evento o comunidad en tiempo real, y hacer clic en cualquier tag de una tarjeta para filtrar instantaneamente por ese tema.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: [SRCH-01, SRCH-02]
**Success Criteria** (what must be TRUE):
  1. Un campo de busqueda filtra las tarjetas visibles en tiempo real (debounce 200ms).
  2. Hacer clic en un tag en cualquier tarjeta activa el filtro por ese tag.
  3. Los filtros de comunidad, estado, tag y texto son combinables y no se excluyen.
**Plans**: 2 plans

Plans:
- [ ] 08-01: Anadir input de busqueda de texto con debounce y logica de filtro en filteredCalls().
- [ ] 08-02: Hacer los tags clickables y anadir estado de filtro activo de tag con chip visual.

### Phase 9: Notificaciones de deadline PWA Push
**Goal**: Como speaker que instala el radar como PWA, quiero recibir notificaciones push cuando un deadline esta a 7 dias o menos, para no tener que abrir la app activamente para revisar urgencias.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: [NOTIF-01, NOTIF-02]
**Success Criteria** (what must be TRUE):
  1. Al instalar la PWA, el usuario puede aceptar permisos de notificacion.
  2. El service worker programa una notificacion para cada call con deadline critico (<=7 dias).
  3. Las notificaciones se muestran con el nombre del evento y la accion recomendada.
**Plans**: 2 plans

Plans:
- [ ] 09-01: Implementar solicitud de permisos de notificacion y logica de schedule en el SW.
- [ ] 09-02: Anadir UI de opt-in/opt-out de notificaciones y verificar en mobile Chrome.

### Phase 10: Notas y aprendizajes por card
**Goal**: Como speaker que recibe un rechazo o cierra un evento, quiero poder escribir una nota personal en esa tarjeta (que aprendi, que mejoraria) para construir una base de conocimiento de mi trayectoria.
**Mode:** mvp
**Depends on**: Phase 6
**Requirements**: [NOTE-01]
**Success Criteria** (what must be TRUE):
  1. Cada card tiene un campo de notas desplegable (textarea) persistido en localStorage.
  2. Las notas se muestran como resumen (primeras 2 lineas) cuando estan escritas.
  3. Las notas se incluyen en el export Markdown.
**Plans**: 1 plan

Plans:
- [ ] 10-01: Anadir notas por card con persistencia localStorage y exportacion en Markdown.

### Phase 11: Quick wins de UX - eyebrow, form colapsable, conteos en pipeline
**Goal**: Como usuario del radar, quiero que la interfaz este pulida en los detalles: texto del hero correcto, formulario que no ocupe toda la pantalla por defecto, y un recuento claro en cada lane del kanban.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: [UX-04, UX-05, UX-06]
**Success Criteria** (what must be TRUE):
  1. El eyebrow del hero muestra "Call for Speakers" sin el placeholder "Z".
  2. El formulario "Anadir evento" esta colapsado por defecto y se expande con un boton.
  3. Cada lane del pipeline muestra el recuento de cards entre parentesis junto al nombre del estado.
**Plans**: 1 plan

Plans:
- [ ] 11-01: Corregir eyebrow, hacer form colapsable con toggle, anadir conteos a lanes del kanban.

### Phase 12: Automatizar discovery de C4S con GitHub Actions
**Goal**: Como maintainer del radar, quiero ejecutar un workflow diario que descubra oportunidades C4S, las normalice al esquema del proyecto y abra un PR automatico con resumen de cambios para revision humana.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: [AUTO-01, AUTO-02]
**Success Criteria** (what must be TRUE):
  1. Existe workflow programado/manual para discovery en `.github/workflows/c4s-discovery.yml`.
  2. El script normaliza, deduplica y filtra oportunidades con deadlines vigentes.
  3. Si hay cambios, se abre PR automatico con resumen generado por el run.
**Plans**: 2 plans

Plans:
- [ ] 12-01: Crear script de discovery configurable por fuentes JSON y reporte de ejecucion.
- [ ] 12-02: Integrar workflow de GitHub Actions con PR automatico y quality gates.

### Phase 13: GitHub Referente: Descubribilidad, Calidad y Comunidad
**Goal**: Como mantenedor del proyecto, quiero que el repositorio sea facil de descubrir, confiable para contribuciones y activo para la comunidad, para convertirlo en una referencia real de demo tecnico en GitHub.
**Mode:** mvp
**Depends on**: Phase 4, Phase 12
**Requirements**: [QUAL-02, FLOW-02, AUTO-02]
**Success Criteria** (what must be TRUE):
  1. README y metadatos del repositorio muestran demo publica, propuesta de valor y guia de arranque en menos de 60 segundos.
  2. Pull requests ejecutan validaciones automaticas de calidad (build + checks disponibles) y bloquean merges con regresiones.
  3. Dependabot mantiene dependencias del demo y workflows con actualizaciones periodicas visibles.
  4. Mantenedores disponen de un flujo de comunidad minimo (labels, good first issues, triage y plantilla PR/issue).
**Plans**: 3 plans

Plans:
- [ ] 13-01: Optimizar README, About y topics para descubribilidad y onboarding inmediato.
- [ ] 13-02: Anadir workflow de verificacion para PR y configurar automatizacion de actualizaciones con Dependabot.
- [ ] 13-03: Formalizar operacion de comunidad (labels base, good first issues y cadencia de triage).

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Baseline and Data Confidence | 0/2 | Not started | - |
| 2. Automated Quality Gates | 0/2 | Not started | - |
| 3. Safe Modular Refactor | 0/2 | Not started | - |
| 4. GSD Delivery Loop | 0/2 | Not started | - |
| 5. Responsive, PWA y Auditoria UX para Comunidad Tech | 0/2 | Not started | - |
| 6. Editar/borrar calls + cambiar estado | 0/2 | Not started | - |
| 7. Gestion de propuestas desde la UI | 0/2 | Not started | - |
| 8. Busqueda de texto y filtro por tag | 0/2 | Not started | - |
| 9. Notificaciones de deadline PWA Push | 0/2 | Not started | - |
| 10. Notas y aprendizajes por card | 0/1 | Not started | - |
| 11. Quick wins de UX | 0/1 | Not started | - |
| 12. Automated C4S discovery | 0/2 | Not started | - |
| 13. GitHub Referente: Descubribilidad, Calidad y Comunidad | 0/3 | Not started | - |
