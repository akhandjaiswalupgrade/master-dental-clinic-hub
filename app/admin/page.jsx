import App from '../../src/App.jsx';
import { readClinics } from '../../src/clinic-storage.js';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Master Dental Admin | Clinic Website Manager',
  description: 'Manage multiple dental clinic websites, themes, links, and CSV imports.'
};

export default async function AdminPage() {
  const clinics = await readClinics();
  return <App initialClinics={clinics} routePath="/admin" />;
}
