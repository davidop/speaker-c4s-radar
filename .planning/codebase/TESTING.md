# Testing Patterns

**Analysis Date:** 2026-05-21

## Test Framework

**Runner:**
- None configured in `demo/package.json`
- No `jest`, `vitest`, or equivalent setup files found

**Assertion Library:**
- None in repository code

**Run Commands:**
```bash
npm run dev            # Manual development verification in demo app
npm run build          # Build validation for frontend bundle
npm run preview        # Preview built output locally
```

## Test File Organization

**Location:**
- No `tests/` directory and no `*.test.*` files in current workspace

**Naming:**
- Not established yet for automated tests

**Structure:**
```
demo/
  src/
    main.js
    styles.css
    data/calls.json
  vite.config.js
```

## Test Structure

**Suite Organization:**
- Not applicable yet (no test suites)

**Patterns:**
- Current quality checks are manual demo scenarios described in `session/demo-runbook.md`
- CI verifies build/deploy path via `.github/workflows/pages.yml`

## Mocking

**Framework:**
- None

**Patterns:**
- No mocking strategy currently defined

**What to Mock (recommended baseline when tests are added):**
- `fetch('/api/calls')` interactions in `window.addCall`
- Date-sensitive logic in `daysLeft`, `urgency`, `risk`
- Browser APIs like `navigator.clipboard` and `alert`

**What NOT to Mock (recommended):**
- Pure mapping helpers (`nextAction`, `proposalTitle`, `filteredCalls`)

## Fixtures and Factories

**Test Data:**
- Current fixture source is `demo/src/data/calls.json`
- Future tests can derive small fixture subsets from this file

**Location:**
- No dedicated fixtures directory exists yet

## Coverage

**Requirements:**
- No coverage target configured

**Configuration:**
- No coverage tool configured

**View Coverage:**
- Not available until test runner is introduced

## Test Types

**Unit Tests:**
- Missing for core helper logic in `demo/src/main.js`

**Integration Tests:**
- Missing for Vite middleware write flow in `demo/vite.config.js`

**E2E Tests:**
- Missing for complete UI flow (filters, add event, export markdown)

## Common Patterns

**Current Validation Pattern:**
- Build pipeline (`npm run build`) is the only automated gate in CI
- Presenter runbook serves as manual acceptance checklist

**Suggested First Additions:**
- Unit tests for pure functions in `demo/src/main.js`
- Integration test for `POST /api/calls` behavior and required field handling

---

*Testing analysis: 2026-05-21*
*Update when test patterns change*
