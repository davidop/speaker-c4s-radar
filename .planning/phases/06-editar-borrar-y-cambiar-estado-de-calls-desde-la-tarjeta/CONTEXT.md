# Phase 6 Context — Editar, borrar y cambiar estado de calls desde la tarjeta

## Goal
Como speaker, quiero cambiar estado, editar y borrar oportunidades directamente desde cada tarjeta, sin tocar archivos JSON manualmente.

## Current Baseline
- Frontend: `demo/src/main.js` renderiza tarjetas y formulario de alta.
- API local: `demo/vite.config.js` soporta solo `POST /api/calls`.
- Persistencia: `demo/src/data/calls.json` (modo local con `npm run dev`).
- En deploy estático (GitHub Pages), no hay escritura disponible.

## Decisions
- Mantener Vanilla JS y Vite middleware local (sin backend nuevo).
- Añadir endpoints `PATCH /api/calls/:id` y `DELETE /api/calls/:id` en dev server.
- En UI, usar acciones inline por tarjeta:
  - selector de estado
  - botón Editar
  - botón Borrar
- Si API no está disponible, mostrar feedback claro sin romper UI.

## Scope
### In
- Cambio de estado persistido.
- Edición de oportunidad existente con formulario pre-rellenado.
- Borrado con confirmación.
- Refresco de KPIs/pipeline tras cambios.

### Out
- Autenticación/autorización.
- Historial de auditoría.
- Multiusuario o backend productivo.

## Requirements
- INT-01: Cambiar estado desde tarjeta y persistirlo.
- INT-02: Editar oportunidad existente desde UI.
- INT-03: Borrar oportunidad con confirmación y refresco de vista.

## Risks
- Divergencia entre modo dev (escritura) y modo estático (solo lectura).
- Regresión en render por seguir con un único archivo `main.js`.

## Verification Focus
- Operaciones CRUD parciales funcionan en `npm run dev`.
- En modo estático, fallos de API muestran mensaje controlado.
- Sin regresiones en filtros, export y render principal.
