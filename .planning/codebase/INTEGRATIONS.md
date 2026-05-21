# External Integrations

**Analysis Date:** 2026-05-21

## APIs & External Services

**External Content Sources:**
- Meetup and Sessionize URLs are stored as reference links in `demo/src/data/calls.json`
  - Integration method: user-facing links only (`source` field), no API consumption
  - Auth: none in this codebase
  - Rate limits: not applicable (no runtime API calls)

**Browser APIs:**
- Clipboard API used in `window.exportMarkdown` (`demo/src/main.js`)
  - Auth: browser permissions/user gesture
  - Behavior: best effort copy, then alert with generated markdown

## Data Storage

**Databases:**
- None

**File Storage:**
- Local JSON file `demo/src/data/calls.json` acts as demo datastore
  - Write path: custom dev middleware in `demo/vite.config.js` (`POST /api/calls`)
  - Persistence scope: local repo file update during development

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- None (no user accounts)

**OAuth Integrations:**
- None

## Monitoring & Observability

**Error Tracking:**
- None

**Analytics:**
- None

**Logs:**
- Vite/server process logs only
- GitHub Actions logs for build/deploy in `.github/workflows/pages.yml`

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
  - Deployment: push to `main` touching `demo/**` or manual dispatch
  - Artifact path: `demo/dist`

**CI Pipeline:**
- GitHub Actions workflow `.github/workflows/pages.yml`
  - Build job runs `npm ci` and `npm run build` in `demo/`
  - Deploy job uses `actions/deploy-pages@v4`

## Environment Configuration

**Development:**
- Required env vars: none documented
- Secrets location: GitHub repository settings for Pages/OIDC managed by Actions permissions
- Mock/stub services: not needed

**Staging:**
- No separate staging environment defined

**Production:**
- Deployed static assets on GitHub Pages
- Runtime integrations are limited to browser APIs and external links

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None (no webhook emitters)

---

*Integration audit: 2026-05-21*
*Update when adding/removing external services*
