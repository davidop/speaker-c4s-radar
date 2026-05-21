<!-- GSD:project-start source:PROJECT.md -->
## Project

Project not yet initialized. Run /gsd-new-project to set up.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (ES modules) - app logic in `demo/src/main.js` and Vite server plugin in `demo/vite.config.js`
- CSS - UI styling in `demo/src/styles.css`
- HTML - shell document in `demo/index.html`
- JSON - seeded call-for-speakers data in `demo/src/data/calls.json`
- Markdown - docs and runbooks in `README.md`, `CONTRIBUTING.md`, and `session/*.md`
## Runtime
- Node.js 22 in CI (configured in `.github/workflows/pages.yml`)
- Browser runtime for the Vite-served SPA
- npm (lockfile present at `demo/package-lock.json`)
- Project manifest in `demo/package.json`
## Frameworks
- Vite (latest) - dev server and bundling for the demo app
- Vanilla JavaScript - no UI framework, direct DOM rendering
- No automated test framework currently configured
- Vite build and preview via scripts in `demo/package.json`
- GitHub Actions workflow in `.github/workflows/pages.yml`
## Key Dependencies
- `vite` (latest) - app build pipeline and dev server
- `@vitejs/plugin-basic-ssl` (latest) - available for local HTTPS workflow
- Node built-ins `fs/promises` and `path` used by the custom API middleware in `demo/vite.config.js`
- GitHub Actions official actions (`actions/checkout`, `actions/setup-node`, `actions/deploy-pages`) for deployment
## Configuration
- Vite base path is dynamic in `demo/vite.config.js` (`/` locally, `/speaker-c4s-radar/` on GitHub Actions)
- No `.env` contract defined in repository root
- Build command: `npm run build` from `demo/`
- Vite config and middleware in `demo/vite.config.js`
## Platform Requirements
- Any OS with Node.js and npm
- Run from `demo/` using `npm install` and `npm run dev`
- Static deployment target: GitHub Pages artifact from `demo/dist`
- Build/deploy automation: `.github/workflows/pages.yml`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Lowercase filenames in app source (`demo/src/main.js`, `demo/src/styles.css`)
- Data files in lowercase JSON (`demo/src/data/calls.json`)
- Markdown docs use descriptive kebab or conventional uppercase names (`README.md`, `CONTRIBUTING.md`)
- `camelCase` function names (`daysLeft`, `nextAction`, `filteredCalls`)
- Event-style handlers exposed on `window` (`setCommunityFilter`, `setStatusFilter`, `addCall`)
- `camelCase` for mutable state (`selectedCommunity`, `callsData`)
- Upper snake for constants (`DEMO_DATE`)
- No TypeScript types in current codebase
## Code Style
- Semicolons are consistently used in `demo/src/main.js` and `demo/vite.config.js`
- Single quotes are preferred for strings
- 2-space indentation in JavaScript files
- CSS uses compact single-line rule style in several blocks
- No lint config file or lint script currently present
## Import Organization
- Small import lists with no blank-group segmentation in current files
- None; relative imports only
## Error Handling
- Guard clauses and explicit HTTP responses in middleware (`demo/vite.config.js`)
- User-facing `try/catch` with alert-based fallback in `window.addCall`
- Best-effort UI actions (`navigator.clipboard?.writeText`) without hard failure
- Plain `Error` usage (`throw new Error('No se pudo guardar.')`)
- JSON error payloads for API-like responses
## Logging
- No dedicated logger package
- User feedback via `alert()` in the browser
- Server-side errors converted into status code and JSON
## Comments
- Sparse, purpose-focused comments only (example in `demo/vite.config.js` explaining GitHub Pages base path)
- Prefer self-explanatory function names over dense comments
- Not currently used
- No TODO convention observed in analyzed files
## Function Design
- Mix of small helpers and a larger `render()` orchestrator in `demo/src/main.js`
- Simple primitive/object parameters, often one argument
- Form handling reads from `FormData` and normalizes inline
- Helper functions return strings/fragments for templating
- Guards return early for invalid input or non-POST methods
## Module Design
- Frontend entry module uses side effects and `window` assignments rather than explicit exports
- Vite config uses default export from `defineConfig(...)`
- None
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Client-rendered UI from one entrypoint (`demo/src/main.js`)
- State held in memory (`callsData`, selected filters)
- Data seed from static JSON with optional local writes through Vite middleware
- No backend service in production deployment
## Layers
- Purpose: render UI and handle user interactions
- Contains: template-building functions (`render`, `card`, `column`, `filters`)
- Depends on: state helpers and date/urgency computations
- Used by: browser runtime from `demo/index.html`
- Purpose: derive risk, urgency, next actions, and filtering behavior
- Contains: `daysLeft`, `urgency`, `risk`, `nextAction`, `filteredCalls`
- Depends on: current date and call record shape
- Used by: presentation functions
- Purpose: append new events into JSON source during local runs
- Contains: Vite middleware `POST /api/calls` in `demo/vite.config.js`
- Depends on: Node `fs/promises` and `path`
- Used by: `window.addCall` fetch call in `demo/src/main.js`
## Data Flow
- In-memory state in module-scoped variables
- Persistent source only when middleware writes JSON during `npm run dev`
## Key Abstractions
- Purpose: represent a C4S opportunity
- Examples: entries in `demo/src/data/calls.json`
- Pattern: plain object with fields (`id`, `deadline`, `status`, `tags`, etc.)
- Purpose: convert state to HTML fragments
- Examples: `kpi`, `card`, `column`, `filters`
- Pattern: string-template composition
## Entry Points
- Location: `demo/src/main.js`
- Triggers: browser loading module script from `demo/index.html`
- Responsibilities: initialize data, define UI handlers, render app
- Location: `demo/vite.config.js`
- Triggers: HTTP request to `/api/calls` while Vite dev server is running
- Responsibilities: validate payload, compute ID, write JSON, return created call
## Error Handling
- UI catches add-event failures and shows user-friendly `alert`
- Middleware returns HTTP status codes (`400`, `405`, `500`) with JSON error objects
- Try/catch around async file I/O in middleware
- Guard clauses for missing fields and unsupported methods
## Cross-Cutting Concerns
- Minimal explicit logging; relies on browser alerts and server responses
- Required fields checked in middleware before writing data
- Form uses native required fields in `render()` template
- None
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
