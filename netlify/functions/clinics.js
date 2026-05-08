import { getStore } from '@netlify/blobs';

const store = getStore({ name: 'master-dental-clinics', consistency: 'strong' });
const key = 'records';

function json(data, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { ...init, headers });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'GET, POST, OPTIONS'
      }
    });
  }

  if (req.method === 'GET') {
    const result = await store.get(key, { type: 'json', consistency: 'strong' });
    return json({ clinics: result || null });
  }

  if (req.method === 'POST') {
    try {
      const payload = await req.json();
      const clinics = Array.isArray(payload?.clinics) ? payload.clinics : [];
      await store.setJSON(key, clinics);
      return json({ ok: true, count: clinics.length });
    } catch (error) {
      return json({ ok: false, error: error.message || 'Invalid JSON payload' }, { status: 400 });
    }
  }

  return json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}

export const config = {
  path: '/api/clinics'
};
