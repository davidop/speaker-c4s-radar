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

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Baseline and Data Confidence | 0/2 | Not started | - |
| 2. Automated Quality Gates | 0/2 | Not started | - |
| 3. Safe Modular Refactor | 0/2 | Not started | - |
| 4. GSD Delivery Loop | 0/2 | Not started | - |
