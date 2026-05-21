# Codebase Concerns

**Analysis Date:** 2026-05-21

## Tech Debt

**Large single-module frontend logic (`demo/src/main.js`):**
- Issue: Rendering, domain logic, state management, and side effects live in one file
- Why: Demo-first speed and readability for live coding
- Impact: Higher change risk and harder targeted testing as features grow
- Fix approach: Extract small modules (`logic`, `render`, `actions`) while preserving vanilla JS simplicity

**File-backed write API coupled to dev server (`demo/vite.config.js`):**
- Issue: `POST /api/calls` directly mutates source JSON in working tree
- Why: Fast local authoring workflow for sessions
- Impact: Behavior differs between local dev and static production deployment
- Fix approach: Add explicit "demo-local only" guardrails and optional backend adapter for real use

## Known Bugs

**Historical deadlines in seed data can skew urgency metrics:**
- Symptoms: Cards may show very high overdue day counts
- Trigger: Entries in `demo/src/data/calls.json` with past deadlines
- Workaround: Curate dataset before demos
- Root cause: Mixed real-world examples from different years in one fixture file

**Form submission requires active dev server API:**
- Symptoms: Add event action fails with alert when app is opened as static output
- Trigger: Running build/preview without writable `/api/calls` endpoint
- Workaround: Use `npm run dev` for live-add scenario or edit JSON manually
- Root cause: Local-only middleware architecture

## Security Considerations

**No validation on outbound links (`source`):**
- Risk: Potential unsafe URL insertion into rendered anchors
- Current mitigation: Browser default link handling with `rel="noreferrer"`
- Recommendations: Validate `http/https` scheme before persisting/rendering

**No auth for local write endpoint:**
- Risk: Any local caller can post to `/api/calls` while dev server is running
- Current mitigation: Endpoint exists only in local development context
- Recommendations: Limit to localhost and optionally require a simple token in dev mode

## Performance Bottlenecks

**Full re-render on every state change:**
- Problem: `render()` rebuilds entire app HTML each interaction
- Measurement: Acceptable now (small dataset), may degrade with large C4S lists
- Cause: Simplicity-first string template rendering approach
- Improvement path: Incremental updates for cards/pipeline sections or lightweight componentization

**Repeated date parsing per card:**
- Problem: `daysLeft` recomputes `Date` objects frequently
- Measurement: Low impact at current scale
- Cause: no memoization/precomputation step
- Improvement path: Precompute normalized deadlines when loading `callsData`

## Fragile Areas

**Global `window` handlers and inline HTML event attributes:**
- Why fragile: Tight coupling between generated markup and global function names
- Common failures: Renaming handlers silently breaks UI interactions
- Safe modification: Keep handler names stable or move to delegated event listeners
- Test coverage: None automated

**ID generation based on current JSON content (`cfs-###`):**
- Why fragile: Assumes strict ID format and single-writer flow
- Common failures: malformed IDs or concurrent writes can produce collisions
- Safe modification: Use UUID or robust monotonic ID strategy
- Test coverage: None automated

## Scaling Limits

**Dataset and rendering model:**
- Current capacity: suited for demo-scale lists
- Limit: large datasets will increase render cost and reduce responsiveness
- Symptoms at limit: laggy filters and pipeline updates
- Scaling path: pagination/virtualization and derived state caching

## Dependencies at Risk

**Unpinned `latest` dependency versions in `demo/package.json`:**
- Risk: unexpected breaking changes in Vite/plugin updates
- Impact: demo instability and CI breakage
- Migration plan: pin semver ranges and update intentionally

## Missing Critical Features

**No persistent backend for production edits:**
- Problem: Static deployment cannot persist new events
- Current workaround: commit JSON updates in repo
- Blocks: collaborative real-time usage
- Implementation complexity: medium (API + persistence + basic auth)

## Test Coverage Gaps

**Core business helpers untested:**
- What's not tested: `urgency`, `risk`, `nextAction`, filtering logic
- Risk: regressions in deadline and recommendation behavior
- Priority: High
- Difficulty to test: Low (pure functions)

**Write middleware path untested:**
- What's not tested: validation and file write failure handling in `demo/vite.config.js`
- Risk: silent data-write failures during demos
- Priority: Medium
- Difficulty to test: Medium (requires middleware test harness)

---

*Concerns audit: 2026-05-21*
*Update as issues are fixed or new ones discovered*
