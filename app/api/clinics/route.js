import { NextResponse } from 'next/server';

import { readClinics, writeClinics } from '../../../src/clinic-storage.js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const clinics = await readClinics();
  return NextResponse.json({ clinics });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const clinics = Array.isArray(payload?.clinics) ? payload.clinics : [];
    const savedClinics = await writeClinics(clinics);
    return NextResponse.json({ ok: true, count: savedClinics.length });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message || 'Invalid JSON payload' }, { status: 400 });
  }
}
