import fs from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const clinicsFile = path.resolve(process.cwd(), 'data', 'clinics.json');

async function readClinicStore() {
  try {
    const file = await fs.readFile(clinicsFile, 'utf8');
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeClinicStore(clinics) {
  await fs.mkdir(path.dirname(clinicsFile), { recursive: true });
  await fs.writeFile(clinicsFile, JSON.stringify(clinics, null, 2), 'utf8');
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function clinicsApiPlugin() {
  const route = '/api/clinics';

  async function handle(req, res, next) {
    if (!req.url?.startsWith(route)) {
      next();
      return;
    }

    try {
      if (req.method === 'GET') {
        const clinics = await readClinicStore();
        sendJson(res, 200, { clinics });
        return;
      }

      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}');
            const clinics = Array.isArray(payload?.clinics) ? payload.clinics : [];
            await writeClinicStore(clinics);
            sendJson(res, 200, { ok: true, count: clinics.length });
          } catch (error) {
            sendJson(res, 400, { ok: false, error: error.message || 'Invalid JSON payload' });
          }
        });
        return;
      }

      sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    } catch (error) {
      sendJson(res, 500, { ok: false, error: error.message || 'Unexpected server error' });
    }
  }

  return {
    name: 'clinics-api',
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    }
  };
}

export default defineConfig({
  plugins: [react(), clinicsApiPlugin()]
});
