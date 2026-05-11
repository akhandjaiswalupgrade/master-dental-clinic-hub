import App from '../src/App.jsx';
import { buildClinicMetadata } from '../src/clinic-storage.js';
import { getRequestOrigin, toNextMetadata } from './site-metadata.js';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const origin = await getRequestOrigin();
  return toNextMetadata(buildClinicMetadata(null, '/', origin));
}

export default function HomePage() {
  return <App initialClinics={[]} routePath="/" />;
}
