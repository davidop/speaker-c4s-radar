# Phase 12 Context — Automatizar discovery de C4S

## Goal
Automatizar la deteccion de oportunidades C4S para mantener el radar actualizado con revision humana via Pull Request.

## Scope
- Crear script de discovery configurable por fuentes JSON.
- Normalizar, deduplicar y filtrar oportunidades por deadline vigente.
- Generar reportes de ejecucion para revisiones rapidas.
- Ejecutar discovery desde GitHub Actions con schedule/manual trigger.
- Abrir PR automatica con cambios detectados y resumen.

## Requirements
- AUTO-01: Workflow programado/manual que descubre y normaliza C4S a `calls.json`.
- AUTO-02: PR automatica con resumen generado y cambios propuestos.
