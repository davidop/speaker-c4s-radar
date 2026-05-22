# Phase 8 Context — Búsqueda de texto y filtro por tag

## Goal
Permitir encontrar oportunidades más rápido con búsqueda textual y filtrado por tags clicables.

## Baseline
- Filtros actuales: comunidad + estado.
- Tags visibles en tarjetas, pero no interactivos.
- No hay búsqueda por texto.

## Decisions
- Añadir `searchQuery` y `selectedTag` al estado frontend.
- Filtrado combinado: comunidad + estado + texto + tag.
- Search input con debounce de 200ms.
- Tags clicables en tarjetas y chip de filtro activo.

## Requirements
- SRCH-01: búsqueda por texto en nombre/comunidad/tags.
- SRCH-02: filtro por tag clickable combinable con otros filtros.
