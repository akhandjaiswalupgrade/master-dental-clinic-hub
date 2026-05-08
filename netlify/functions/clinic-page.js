import { getStore } from '@netlify/blobs';

const store = getStore({ name: 'master-dental-clinics', consistency: 'strong' });
const storeKey = 'records';
const defaultMeta = {
  title: 'Dental Clinic | Modern Dental Care',
  description:
    'Dental Clinic is a modern dental care website for smile design, implants, preventive care, family dentistry, and premium patient experience.',
  image: '/assets/images/hero_premium.png'
};

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toAbsoluteUrl(requestUrl, value) {
  try {
    return new URL(value, requestUrl).toString();
  } catch {
    return value;
  }
}

function buildMeta(clinic, requestUrl, slug) {
  if (!clinic || !slug) {
    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      image: toAbsoluteUrl(requestUrl, defaultMeta.image),
      url: new URL(requestUrl).origin
    };
  }

  return {
    title: [clinic.name, clinic.tagline || clinic.subBrand || 'Dental Clinic'].filter(Boolean).join(' | '),
    description:
      clinic.heroDescription ||
      `${clinic.name} offers smile design, implants, preventive dentistry, family dental care, and patient-first consultations.`,
    image: toAbsoluteUrl(requestUrl, clinic.heroImage || clinic.clinicImage || defaultMeta.image),
    url: requestUrl
  };
}

function injectMeta(html, meta) {
  return html
    .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${escapeHtml(meta.description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`)
    .replace(
      /<meta property="og:description" content=".*?" \/>/i,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
    )
    .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${escapeHtml(meta.url)}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${escapeHtml(meta.image)}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`)
    .replace(
      /<meta name="twitter:description" content=".*?" \/>/i,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
    )
    .replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${escapeHtml(meta.image)}" />`);
}

export default async function handler(request, context) {
  const slug = context.params.slug;
  const clinics = (await store.get(storeKey, { type: 'json', consistency: 'strong' })) || [];
  const clinic = Array.isArray(clinics) ? clinics.find((item) => item.slug === slug) : null;
  const indexResponse = await fetch(new URL('/index.html', request.url));
  const html = await indexResponse.text();
  const nextHtml = injectMeta(html, buildMeta(clinic, request.url, slug));

  return new Response(nextHtml, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

export const config = {
  path: '/clinic/:slug'
};
