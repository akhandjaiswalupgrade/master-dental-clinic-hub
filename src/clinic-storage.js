import fs from 'node:fs/promises';
import path from 'node:path';

const clinicsFile = path.join(process.cwd(), 'data', 'clinics.json');

export async function readClinics() {
  try {
    const file = await fs.readFile(clinicsFile, 'utf8');
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeClinics(clinics) {
  const safeClinics = Array.isArray(clinics) ? clinics : [];
  await fs.mkdir(path.dirname(clinicsFile), { recursive: true });
  await fs.writeFile(clinicsFile, JSON.stringify(safeClinics, null, 2), 'utf8');
  return safeClinics;
}

export async function findClinicBySlug(slug) {
  const clinics = await readClinics();
  return clinics.find((clinic) => clinic.slug === slug) || null;
}

export function getSiteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function toAbsoluteUrl(value, siteOrigin = getSiteOrigin()) {
  if (!value) return '';

  try {
    return new URL(value, siteOrigin).toString();
  } catch {
    return value;
  }
}

export function buildClinicMetadata(clinic, requestPath = '/', siteOrigin = getSiteOrigin()) {
  const defaultTitle = 'Dental Clinic | Modern Dental Care';
  const defaultDescription =
    'Dental Clinic is a modern dental care website for smile design, implants, preventive care, family dentistry, and premium patient experience.';
  const defaultImage = '/assets/images/hero_premium.png';

  if (!clinic) {
    const url = new URL(requestPath, siteOrigin).toString();
    return {
      title: defaultTitle,
      description: defaultDescription,
      url,
      image: toAbsoluteUrl(defaultImage, siteOrigin)
    };
  }

  const title = [clinic.name, clinic.tagline || clinic.subBrand || 'Dental Clinic'].filter(Boolean).join(' | ');
  const description =
    clinic.heroDescription ||
    `${clinic.name} offers smile design, implants, preventive dentistry, family dental care, and patient-first consultations.`;

  return {
    title,
    description,
    url: new URL(requestPath, siteOrigin).toString(),
    image: toAbsoluteUrl(clinic.heroImage || clinic.clinicImage || defaultImage, siteOrigin)
  };
}
