import { headers } from 'next/headers';

import { getSiteOrigin } from '../src/clinic-storage.js';

export async function getRequestOrigin() {
  const headerList = await headers();
  const forwardedHost = headerList.get('x-forwarded-host');
  const host = forwardedHost || headerList.get('host');

  if (!host) return getSiteOrigin();

  const forwardedProto = headerList.get('x-forwarded-proto');
  const protocol = forwardedProto || (host.includes('localhost') || host.startsWith('127.') ? 'http' : 'https');
  return `${protocol}://${host}`;
}

export function toNextMetadata(meta) {
  const metadataBase = new URL(meta.url);
  metadataBase.pathname = '/';
  metadataBase.search = '';
  metadataBase.hash = '';

  return {
    metadataBase,
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: 'website',
      title: meta.title,
      description: meta.description,
      url: meta.url,
      images: [{ url: meta.image }]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image]
    }
  };
}
