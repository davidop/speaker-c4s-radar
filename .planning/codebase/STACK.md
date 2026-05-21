# Technology Stack

**Analysis Date:** 2026-05-21

## Languages

**Primary:**
- JavaScript (ES modules) - app logic in `demo/src/main.js` and Vite server plugin in `demo/vite.config.js`
- CSS - UI styling in `demo/src/styles.css`
- HTML - shell document in `demo/index.html`

**Secondary:**
- JSON - seeded call-for-speakers data in `demo/src/data/calls.json`
- Markdown - docs and runbooks in `README.md`, `CONTRIBUTING.md`, and `session/*.md`

## Runtime

**Environment:**
- Node.js 22 in CI (configured in `.github/workflows/pages.yml`)
- Browser runtime for the Vite-served SPA

**Package Manager:**
- npm (lockfile present at `demo/package-lock.json`)
- Project manifest in `demo/package.json`

## Frameworks

**Core:**
- Vite (latest) - dev server and bundling for the demo app
- Vanilla JavaScript - no UI framework, direct DOM rendering

**Testing:**
- No automated test framework currently configured

**Build/Dev:**
- Vite build and preview via scripts in `demo/package.json`
- GitHub Actions workflow in `.github/workflows/pages.yml`

## Key Dependencies

**Critical:**
- `vite` (latest) - app build pipeline and dev server
- `@vitejs/plugin-basic-ssl` (latest) - available for local HTTPS workflow

**Infrastructure:**
- Node built-ins `fs/promises` and `path` used by the custom API middleware in `demo/vite.config.js`
- GitHub Actions official actions (`actions/checkout`, `actions/setup-node`, `actions/deploy-pages`) for deployment

## Configuration

**Environment:**
- Vite base path is dynamic in `demo/vite.config.js` (`/` locally, `/speaker-c4s-radar/` on GitHub Actions)
- No `.env` contract defined in repository root

**Build:**
- Build command: `npm run build` from `demo/`
- Vite config and middleware in `demo/vite.config.js`

## Platform Requirements

**Development:**
- Any OS with Node.js and npm
- Run from `demo/` using `npm install` and `npm run dev`

**Production:**
- Static deployment target: GitHub Pages artifact from `demo/dist`
- Build/deploy automation: `.github/workflows/pages.yml`

---

*Stack analysis: 2026-05-21*
*Update after major dependency changes*
