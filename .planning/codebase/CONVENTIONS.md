# Coding Conventions

**Analysis Date:** 2026-05-21

## Naming Patterns

**Files:**
- Lowercase filenames in app source (`demo/src/main.js`, `demo/src/styles.css`)
- Data files in lowercase JSON (`demo/src/data/calls.json`)
- Markdown docs use descriptive kebab or conventional uppercase names (`README.md`, `CONTRIBUTING.md`)

**Functions:**
- `camelCase` function names (`daysLeft`, `nextAction`, `filteredCalls`)
- Event-style handlers exposed on `window` (`setCommunityFilter`, `setStatusFilter`, `addCall`)

**Variables:**
- `camelCase` for mutable state (`selectedCommunity`, `callsData`)
- Upper snake for constants (`DEMO_DATE`)

**Types:**
- No TypeScript types in current codebase

## Code Style

**Formatting:**
- Semicolons are consistently used in `demo/src/main.js` and `demo/vite.config.js`
- Single quotes are preferred for strings
- 2-space indentation in JavaScript files
- CSS uses compact single-line rule style in several blocks

**Linting:**
- No lint config file or lint script currently present

## Import Organization

**Order:**
1. Local data/modules first (`./data/calls.json`, `./styles.css`)
2. In config files, external package imports before Node built-ins (see `demo/vite.config.js`)

**Grouping:**
- Small import lists with no blank-group segmentation in current files

**Path Aliases:**
- None; relative imports only

## Error Handling

**Patterns:**
- Guard clauses and explicit HTTP responses in middleware (`demo/vite.config.js`)
- User-facing `try/catch` with alert-based fallback in `window.addCall`
- Best-effort UI actions (`navigator.clipboard?.writeText`) without hard failure

**Error Types:**
- Plain `Error` usage (`throw new Error('No se pudo guardar.')`)
- JSON error payloads for API-like responses

## Logging

**Framework:**
- No dedicated logger package

**Patterns:**
- User feedback via `alert()` in the browser
- Server-side errors converted into status code and JSON

## Comments

**When to Comment:**
- Sparse, purpose-focused comments only (example in `demo/vite.config.js` explaining GitHub Pages base path)
- Prefer self-explanatory function names over dense comments

**JSDoc/TSDoc:**
- Not currently used

**TODO Comments:**
- No TODO convention observed in analyzed files

## Function Design

**Size:**
- Mix of small helpers and a larger `render()` orchestrator in `demo/src/main.js`

**Parameters:**
- Simple primitive/object parameters, often one argument
- Form handling reads from `FormData` and normalizes inline

**Return Values:**
- Helper functions return strings/fragments for templating
- Guards return early for invalid input or non-POST methods

## Module Design

**Exports:**
- Frontend entry module uses side effects and `window` assignments rather than explicit exports
- Vite config uses default export from `defineConfig(...)`

**Barrel Files:**
- None

---

*Convention analysis: 2026-05-21*
*Update when patterns change*
