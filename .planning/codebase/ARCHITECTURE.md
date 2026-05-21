# Architecture

**Analysis Date:** 2026-05-21

## Pattern Overview

**Overall:** Single-page frontend demo with local-file-backed dev middleware

**Key Characteristics:**
- Client-rendered UI from one entrypoint (`demo/src/main.js`)
- State held in memory (`callsData`, selected filters)
- Data seed from static JSON with optional local writes through Vite middleware
- No backend service in production deployment

## Layers

**Presentation Layer:**
- Purpose: render UI and handle user interactions
- Contains: template-building functions (`render`, `card`, `column`, `filters`)
- Depends on: state helpers and date/urgency computations
- Used by: browser runtime from `demo/index.html`

**Domain Logic Layer:**
- Purpose: derive risk, urgency, next actions, and filtering behavior
- Contains: `daysLeft`, `urgency`, `risk`, `nextAction`, `filteredCalls`
- Depends on: current date and call record shape
- Used by: presentation functions

**Data Access Layer (Dev-only):**
- Purpose: append new events into JSON source during local runs
- Contains: Vite middleware `POST /api/calls` in `demo/vite.config.js`
- Depends on: Node `fs/promises` and `path`
- Used by: `window.addCall` fetch call in `demo/src/main.js`

## Data Flow

**Page Load and Render:**
1. Browser loads `demo/index.html`
2. Vite imports `demo/src/main.js` and `demo/src/data/calls.json`
3. Initial state is prepared (`callsData`, filters)
4. `render()` builds full markup into `#app`
5. User interaction updates state and triggers `render()` again

**Add Event Flow (Dev server):**
1. User submits form in rendered UI
2. `window.addCall` serializes form values
3. Fetch `POST /api/calls` is sent
4. Vite middleware validates payload and writes `demo/src/data/calls.json`
5. Saved call is returned and appended to in-memory state

**State Management:**
- In-memory state in module-scoped variables
- Persistent source only when middleware writes JSON during `npm run dev`

## Key Abstractions

**Call Record:**
- Purpose: represent a C4S opportunity
- Examples: entries in `demo/src/data/calls.json`
- Pattern: plain object with fields (`id`, `deadline`, `status`, `tags`, etc.)

**Render Helpers:**
- Purpose: convert state to HTML fragments
- Examples: `kpi`, `card`, `column`, `filters`
- Pattern: string-template composition

## Entry Points

**Frontend Entry:**
- Location: `demo/src/main.js`
- Triggers: browser loading module script from `demo/index.html`
- Responsibilities: initialize data, define UI handlers, render app

**Dev API Entry:**
- Location: `demo/vite.config.js`
- Triggers: HTTP request to `/api/calls` while Vite dev server is running
- Responsibilities: validate payload, compute ID, write JSON, return created call

## Error Handling

**Strategy:**
- UI catches add-event failures and shows user-friendly `alert`
- Middleware returns HTTP status codes (`400`, `405`, `500`) with JSON error objects

**Patterns:**
- Try/catch around async file I/O in middleware
- Guard clauses for missing fields and unsupported methods

## Cross-Cutting Concerns

**Logging:**
- Minimal explicit logging; relies on browser alerts and server responses

**Validation:**
- Required fields checked in middleware before writing data
- Form uses native required fields in `render()` template

**Authentication:**
- None

---

*Architecture analysis: 2026-05-21*
*Update when major patterns change*
