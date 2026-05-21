# Codebase Structure

**Analysis Date:** 2026-05-21

## Directory Layout

```
speaker-c4s-radar/
|-- .github/                 # Workflows, skills, agent contracts, Copilot instructions
|   |-- workflows/           # CI/CD automation (Pages deployment)
|   `-- skills/              # GSD skill definitions
|-- demo/                    # Vite app used in the live session
|   |-- src/                 # App source files
|   |   |-- data/            # Seed JSON data
|   |   |-- main.js          # Main application logic and UI rendering
|   |   `-- styles.css       # UI styling
|   |-- index.html           # HTML shell for SPA
|   |-- package.json         # Scripts and dependencies
|   `-- vite.config.js       # Vite config and local API middleware
|-- session/                 # Agenda and demo runbook docs
|-- slides/                  # Slide assets/source for session
|-- README.md                # Project overview and quickstart
`-- CONTRIBUTING.md          # Contribution workflow and acceptance criteria
```

## Directory Purposes

**.github/**
- Purpose: repository automation and AI workflow metadata
- Contains: Actions workflows, GSD skills, agent files, instructions
- Key files: `.github/workflows/pages.yml`, `.github/copilot-instructions.md`
- Subdirectories: `.github/skills/`, `.github/agents/`, `.github/get-shit-done/`

**demo/**
- Purpose: runnable product demo
- Contains: Vite config, app source, static entrypoint
- Key files: `demo/src/main.js`, `demo/src/styles.css`, `demo/src/data/calls.json`
- Subdirectories: `demo/src/`, `demo/src/data/`

**session/**
- Purpose: presenter guidance for the 45-minute technical demo
- Contains: markdown guides
- Key files: `session/agenda.md`, `session/demo-runbook.md`
- Subdirectories: none

## Key File Locations

**Entry Points:**
- `demo/index.html`: browser entry HTML
- `demo/src/main.js`: JavaScript module entry and app bootstrap

**Configuration:**
- `demo/package.json`: scripts/dependency manifest
- `demo/vite.config.js`: base path and middleware config
- `.github/workflows/pages.yml`: CI build/deploy configuration

**Core Logic:**
- `demo/src/main.js`: KPI logic, filtering, risk/urgency calculation, form submit behavior
- `demo/src/data/calls.json`: source dataset used by UI

**Testing:**
- No test directory or test files currently present

**Documentation:**
- `README.md`: product and setup docs
- `CONTRIBUTING.md`: contribution expectations
- `session/*.md`: runbook and talk agenda

## Naming Conventions

**Files:**
- Lowercase/kebab for top-level docs and config (`README.md` is conventional uppercase)
- Frontend files in lowercase (`main.js`, `styles.css`, `calls.json`)

**Directories:**
- Lowercase names (`demo`, `session`, `slides`)
- Nested organization by concern (`src/data`)

**Special Patterns:**
- Workflow files in `.github/workflows/*.yml`
- GSD skill specs in `.github/skills/*/SKILL.md`

## Where to Add New Code

**New Feature (Demo App):**
- Primary code: `demo/src/main.js`
- Styles: `demo/src/styles.css`
- Seed/update data shape: `demo/src/data/calls.json`

**New API-like local behavior:**
- Middleware endpoint: `demo/vite.config.js`
- Client caller: `demo/src/main.js`

**New automation/docs:**
- CI workflow: `.github/workflows/`
- Speaker/demo documentation: `session/` or `README.md`

## Special Directories

**.planning/**
- Purpose: generated planning and codebase intelligence artifacts
- Source: created by GSD workflows (not part of original source implementation)
- Committed: yes when intentionally updated as project intelligence

---

*Structure analysis: 2026-05-21*
*Update when directory structure changes*
