# Phase 7 Context — Gestión de propuestas desde la UI

## Goal
Permitir crear, editar y borrar propuestas desde la aplicación, y vincularlas a los calls sin editar código.

## Baseline
- `proposals` está hardcoded en `demo/src/main.js`.
- Los calls ya soportan `proposalId` y muestran el título de propuesta.
- No existe endpoint ni archivo dedicado para propuestas.

## Decisions
- Extraer propuestas a `src/data/proposals.json`.
- Añadir middleware local para `GET/POST/PATCH/DELETE /api/proposals`.
- Mantener flujo demo-first en Vanilla JS sin framework.
- Integrar gestión de propuestas en UI sin romper formulario de calls.

## In Scope
- Archivo `proposals.json` inicial.
- API local CRUD propuestas.
- UI para crear/editar/borrar propuestas.
- Selector de propuesta en formulario de call, alimentado por estado real.

## Out of Scope
- Backend productivo o autenticación.
- Versionado/historial de propuestas.

## Requirements
- PROP-01: Propuestas gestionables desde UI y persistidas en dev mode.
- PROP-02: Vinculación de propuesta en calls usando selector dinámico.
