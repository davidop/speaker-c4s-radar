# Phase 5 Context — Responsive, PWA y Auditoría UX para Comunidad Tech

## Source
Discuss-phase Q&A — 2026-05-22

## Phase Goal
Como speaker y contribuidor técnico de la comunidad Microsoft, GitHub o Sessionize, quiero usar el radar desde mi móvil y ver una interfaz que entiende mi contexto, para gestionar mis CFPs en cualquier momento y lugar.

## Decisions Captured

| Decision | Value | Rationale |
|----------|-------|-----------|
| PWA scope | Full: manifest + service worker + offline cache | El usuario quiere instalación real y acceso sin conexión |
| Dataset | Mejorar dataset de ejemplo para parecer más realista | No añadir eventos en tiempo real; hacer los datos existentes más creíbles para perfiles Microsoft/GitHub/Sessionize |
| Mobile breakpoint objetivo | iPhone SE / 375px | El más pequeño de iPhone; cubrir esto garantiza todo lo mayor |
| Orden de implementación | Ahora (sin esperar Phases 1-4) | Es la prioridad del demo |

## Scope

### IN SCOPE
- CSS responsive: media queries, stacking de columnas, touch targets de 44px mínimo
- PWA completa: `manifest.json`, `sw.js` (cache-first), registro en `main.js`, meta tags en `index.html`
- Iconos PWA: SVG/PNG 192px y 512px
- Auditoría UX para perfiles Microsoft, GitHub, Sessionize: etiquetas, comunidades, fuentes del dataset
- Mejora de `calls.json`: eventos, comunidades y tags más representativos del ecosistema

### OUT OF SCOPE
- Backend real o sincronización de datos en vivo
- Autenticación o cuentas de usuario
- Cambio de framework o arquitectura

## Requirements Addressed
- UX-01: Layout responsive desde 375px
- UX-02: Touch targets y legibilidad en móvil
- UX-03: Dataset refleja perfiles Microsoft/GitHub/Sessionize
- PWA-01: App instalable con offline mode

## Plans
- 05-01: Auditoría UX, responsive layout y mejora de dataset
- 05-02: PWA implementation (manifest + service worker + iconos)
