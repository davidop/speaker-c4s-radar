# Speaker C4S Radar

## What This Is

Speaker C4S Radar is a demo-first web app for speakers and technical communities to track Call for Speakers opportunities, deadlines, proposal status, and next actions. It currently runs as a Vite + Vanilla JS frontend with static deployment on GitHub Pages and local JSON-backed authoring during development. This project initialization adopts GSD to manage future incremental improvements without rewriting the existing product.

## Core Value

Help community speakers avoid missing opportunities by making deadlines, proposal readiness, and next actions immediately visible.

## Requirements

### Validated

- ✓ Dashboard shows C4S cards with urgency, status, and next action — existing behavior in `demo/src/main.js`
- ✓ Users can filter opportunities by community and status — existing behavior in `demo/src/main.js`
- ✓ Users can export an action plan as Markdown — existing behavior in `demo/src/main.js`
- ✓ Maintainers can add events locally through `POST /api/calls` while running dev server — existing behavior in `demo/vite.config.js`
- ✓ GitHub Pages build/deploy flow is automated — existing behavior in `.github/workflows/pages.yml`

### Active

- [ ] Stabilize data quality and deadline semantics while preserving current UX behavior
- [ ] Add automated quality gates (tests + CI checks) for key business logic
- [ ] Reduce fragility in the frontend architecture without introducing a framework rewrite
- [ ] Adopt GSD planning/execution flow for future phases, verification, and PR-ready summaries

### Out of Scope

- Full rewrite to React/Vue/Angular — preserve Vanilla JS demo readability
- Migrating to a production multi-tenant backend in this milestone — focus on incremental hardening
- Rebranding away from current community-first positioning — keep existing product narrative

## Context

The repository already contains a functional brownfield implementation (`demo/`) plus session materials (`session/`, `slides/`). Codebase mapping completed on 2026-05-21 in `.planning/codebase/` identified key strengths (clear demo value, simple stack) and concerns (single large `main.js`, unpinned dependencies, no automated tests, local-only write API). Future work should be phase-based and incremental: preserve current behavior by default, then improve reliability, maintainability, and delivery workflow using GSD artifacts.

## Constraints

- **Tech stack**: Keep Vite + Vanilla JS + CSS + HTML — required for live demo clarity and low complexity
- **Behavioral continuity**: Existing user-visible behavior is baseline contract unless a future phase explicitly changes it
- **Delivery model**: Static GitHub Pages deploy must keep working from `demo/dist`
- **Scope control**: Roadmap must prioritize incremental evolution over architectural rewrites

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat current implementation as production baseline for planning | Brownfield app is already useful and demo-ready | ✓ Good |
| Use coarse, MVP-style roadmap phases | Faster delivery and clearer story per phase | — Pending |
| Keep planning docs committed to git | Enables traceability and PR-ready collaboration | ✓ Good |
| Enable research/plan-check/verifier workflow gates | Increases quality and reduces regressions | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-21 after initialization*
