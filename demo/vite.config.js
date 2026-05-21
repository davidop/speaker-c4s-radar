import { defineConfig } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';

function addCallApiPlugin() {
  return {
    name: 'add-call-api',
    configureServer(server) {
      server.middlewares.use('/api/calls', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}');
            const requiredFields = ['name', 'community', 'deadline', 'city', 'format', 'status'];
            const missing = requiredFields.find(field => !payload[field]);

            if (missing) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: `Missing field: ${missing}` }));
              return;
            }

            const filePath = path.resolve(process.cwd(), 'src/data/calls.json');
            const current = JSON.parse(await fs.readFile(filePath, 'utf8'));

            const maxId = current.reduce((acc, item) => {
              const parsed = Number(item.id?.replace('cfs-', ''));
              return Number.isFinite(parsed) ? Math.max(acc, parsed) : acc;
            }, 0);

            const newId = `cfs-${String(maxId + 1).padStart(3, '0')}`;
            const newCall = {
              id: newId,
              name: payload.name,
              community: payload.community,
              deadline: payload.deadline,
              city: payload.city,
              format: payload.format,
              tags: Array.isArray(payload.tags) ? payload.tags : [],
              status: payload.status,
              proposalId: payload.proposalId || null,
              audience: payload.audience || 'Comunidad técnica',
              source: payload.source || ''
            };

            const updated = [...current, newCall];
            await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newCall));
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

export default defineConfig({
  // Cuando se despliega en GitHub Pages, la app vive bajo /speaker-c4s-radar/
  // En local (npm run dev) la base es '/' para que todo funcione sin cambios.
  base: process.env.GITHUB_ACTIONS ? '/speaker-c4s-radar/' : '/',
  plugins: [addCallApiPlugin()]
});
