# Requirements: Speaker C4S Radar

**Defined:** 2026-05-21
**Core Value:** Help community speakers avoid missing opportunities by making deadlines, proposal readiness, and next actions immediately visible.

## v1 Requirements

### Baseline Experience

- [ ] **BASE-01**: User can view the current radar dashboard with KPI cards, opportunity cards, and pipeline lanes without functional regressions.
- [ ] **BASE-02**: User can filter opportunities by community and status and get consistent card and pipeline results.
- [ ] **BASE-03**: User can export a readable Markdown action plan that includes deadline, status, risk, and next action per opportunity.

### Data Quality

- [ ] **DATA-01**: Maintainer can flag or curate stale C4S records so urgency indicators remain trustworthy for demos.
- [ ] **DATA-02**: User can distinguish CFP deadline confidence (exact vs estimated/event-date proxy) from the dataset metadata.

### Reliability and Quality

- [ ] **QUAL-01**: Maintainer can run automated unit tests for deadline/risk/next-action logic before merging changes.
- [ ] **QUAL-02**: CI validates build plus test suite on pull requests affecting `demo/`.
- [ ] **QUAL-03**: Maintainer can validate `POST /api/calls` field validation and ID creation through automated checks.

### Maintainability

- [ ] **MAIN-01**: Maintainer can evolve app logic in smaller modules instead of one monolithic file, with no user-facing behavior regression.
- [ ] **MAIN-02**: User sees graceful behavior for add-event actions in static deployments where `/api/calls` is unavailable.

### Workflow Governance

- [ ] **FLOW-01**: Maintainer can execute development through GSD phase artifacts (PROJECT, REQUIREMENTS, ROADMAP, PLAN, VERIFICATION) from this repo.
- [ ] **FLOW-02**: PR descriptions can include user stories, risks/dependencies, and release criteria from project artifacts.

## v2 Requirements

### Extended Product Scope

- **PROD-01**: User can persist and edit opportunities in production via a real backend datastore.
- **PROD-02**: User can manage personal proposals and reminders across sessions/accounts.
- **PROD-03**: User can receive deadline notifications through email or chat integrations.

### Interaction and Editing (Roadmap Extension)

- [ ] **INT-01**: User can update a call status directly from each card and see KPI/pipeline updates immediately.
- [ ] **INT-02**: User can edit an existing call from the UI using a pre-filled form and persist changes in dev mode.
- [ ] **INT-03**: User can delete an existing call with confirmation and reflected UI updates.

### Proposal Management (Roadmap Extension)

- [ ] **PROP-01**: User can create, edit, and delete proposals from the UI in dev mode.
- [ ] **PROP-02**: User can link/unlink a proposal to a call using a dynamic selector in the call form.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full frontend framework migration | Violates demo constraint and increases complexity without immediate value |
| Complete backend platform build in current milestone | Larger product pivot; not required for incremental roadmap |
| Mobile native apps | Web-first focus for current community demo workflow |
| Enterprise auth and RBAC suite | Not needed for current single-demo/team usage scope |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BASE-01 | Phase 1 | Pending |
| BASE-02 | Phase 1 | Pending |
| BASE-03 | Phase 1 | Pending |
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| QUAL-01 | Phase 2 | Pending |
| QUAL-02 | Phase 2 | Pending |
| QUAL-03 | Phase 2 | Pending |
| MAIN-01 | Phase 3 | Pending |
| MAIN-02 | Phase 3 | Pending |
| FLOW-01 | Phase 4 | Pending |
| FLOW-02 | Phase 4 | Pending |
| INT-01 | Phase 6 | Pending |
| INT-02 | Phase 6 | Pending |
| INT-03 | Phase 6 | Pending |
| PROP-01 | Phase 7 | Pending |
| PROP-02 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 12 total
- v2 extension requirements: 5 total (INT-01..03, PROP-01..02)
- Mapped to phases: 17
- Unmapped: 0

---
*Requirements defined: 2026-05-21*
*Last updated: 2026-05-21 after initial definition*
