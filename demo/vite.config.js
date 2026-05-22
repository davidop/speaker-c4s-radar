import { defineConfig } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { validateCreatePayload, buildNewCall, VALID_STATUSES } from './src/server/calls-api-logic.js';

const UPDATABLE_FIELDS = ['name', 'community', 'deadline', 'deadlineConfidence', 'city', 'format', 'tags', 'status', 'proposalId', 'audience', 'source'];
const UPDATABLE_PROPOSAL_FIELDS = ['title', 'tags', 'level'];

function addCallApiPlugin() {
  return {
    name: 'add-call-api',
    configureServer(server) {
      server.middlewares.use('/api/calls', async (req, res) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const method = req.method || 'GET';
            const relativePath = (req.url || '/').split('?')[0];
            const id = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
            const payload = body ? JSON.parse(body) : {};
            const filePath = path.resolve(process.cwd(), 'src/data/calls.json');
            const current = JSON.parse(await fs.readFile(filePath, 'utf8'));

            if (method === 'POST') {
              const validationError = validateCreatePayload(payload);
              if (validationError) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: validationError }));
                return;
              }

              const newCall = buildNewCall(payload, current);

              const updated = [...current, newCall];
              await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(newCall));
              return;
            }

            if (method === 'PATCH') {
              if (!id) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing call id in URL' }));
                return;
              }

              const idx = current.findIndex((item) => item.id === id);
              if (idx === -1) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Call not found' }));
                return;
              }

              const keys = Object.keys(payload || {});
              if (keys.length === 0) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Empty payload' }));
                return;
              }

              const hasInvalidKey = keys.some((key) => !UPDATABLE_FIELDS.includes(key));
              if (hasInvalidKey) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Payload has unsupported fields' }));
                return;
              }

              if (payload.status && !VALID_STATUSES.includes(payload.status)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid status value' }));
              return;
            }

              const merged = {
                ...current[idx],
                ...payload,
                tags: Array.isArray(payload.tags) ? payload.tags : current[idx].tags
              };

              const updated = [...current];
              updated[idx] = merged;
              await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(merged));
              return;
            }

            if (method === 'DELETE') {
              if (!id) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing call id in URL' }));
                return;
              }

              const exists = current.some((item) => item.id === id);
              if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Call not found' }));
                return;
              }

              const updated = current.filter((item) => item.id !== id);
              await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ deleted: true, id }));
              return;
            }

            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Method not allowed' }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'No se pudo guardar el evento.' }));
          }
        });
      });
    }
  };
}

function addProposalApiPlugin() {
  return {
    name: 'proposal-api',
    configureServer(server) {
      server.middlewares.use('/api/proposals', async (req, res) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const method = req.method || 'GET';
            const relativePath = (req.url || '/').split('?')[0];
            const id = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
            const payload = body ? JSON.parse(body) : {};
            const filePath = path.resolve(process.cwd(), 'src/data/proposals.json');
            const current = JSON.parse(await fs.readFile(filePath, 'utf8'));

            if (method === 'GET') {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(current));
              return;
            }

            if (method === 'POST') {
              const title = String(payload.title || '').trim();
              if (!title) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing field: title' }));
                return;
              }

              const maxId = current.reduce((acc, item) => {
                const parsed = Number(item.id?.replace('p-', ''));
                return Number.isFinite(parsed) ? Math.max(acc, parsed) : acc;
              }, 0);

              const newId = `p-${String(maxId + 1).padStart(3, '0')}`;
              const newProposal = {
                id: newId,
                title,
                tags: Array.isArray(payload.tags) ? payload.tags : [],
                level: String(payload.level || 'Intermedio').trim() || 'Intermedio'
              };

              const updated = [...current, newProposal];
              await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(newProposal));
              return;
            }

            if (method === 'PATCH') {
              if (!id) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing proposal id in URL' }));
                return;
              }

              const idx = current.findIndex((item) => item.id === id);
              if (idx === -1) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Proposal not found' }));
                return;
              }

              const keys = Object.keys(payload || {});
              if (keys.length === 0) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Empty payload' }));
                return;
              }

              const hasInvalidKey = keys.some((key) => !UPDATABLE_PROPOSAL_FIELDS.includes(key));
              if (hasInvalidKey) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Payload has unsupported fields' }));
                return;
              }

              if (payload.title !== undefined && !String(payload.title || '').trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing field: title' }));
                return;
              }

              const merged = {
                ...current[idx],
                ...payload,
                title: payload.title !== undefined ? String(payload.title).trim() : current[idx].title,
                tags: Array.isArray(payload.tags) ? payload.tags : current[idx].tags,
                level: payload.level !== undefined ? String(payload.level).trim() : current[idx].level
              };

              const updated = [...current];
              updated[idx] = merged;
              await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(merged));
              return;
            }

            if (method === 'DELETE') {
              if (!id) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing proposal id in URL' }));
                return;
              }

              const exists = current.some((item) => item.id === id);
              if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Proposal not found' }));
                return;
              }

              const updated = current.filter((item) => item.id !== id);
              await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ deleted: true, id }));
              return;
            }

            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Method not allowed' }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'No se pudo guardar la propuesta.' }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  // Cuando se despliega en GitHub Pages, la app vive bajo /speaker-c4s-radar/
  // En local (npm run dev) la base es '/' para que todo funcione sin cambios.
  base: process.env.GITHUB_ACTIONS ? '/speaker-c4s-radar/' : '/',
  plugins: [addCallApiPlugin(), addProposalApiPlugin()]
});
