import App from '../../../src/App.jsx';
import { buildClinicMetadata, findClinicBySlug } from '../../../src/clinic-storage.js';
import { getRequestOrigin, toNextMetadata } from '../../site-metadata.js';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const clinic = await findClinicBySlug(slug);
  const origin = await getRequestOrigin();
  const meta = buildClinicMetadata(clinic, `/clinic/${slug}`, origin);

  return toNextMetadata(meta);
}

export default async function ClinicPage({ params }) {
  const { slug } = await params;
  const clinic = await findClinicBySlug(slug);
  return <App initialClinics={clinic ? [clinic] : []} routePath={`/clinic/${slug}`} />;
}
