import '../src/styles.css';

import { buildClinicMetadata, getSiteOrigin } from '../src/clinic-storage.js';
import { toNextMetadata } from './site-metadata.js';

const meta = buildClinicMetadata(null, '/');

export const metadata = toNextMetadata({ ...meta, url: getSiteOrigin() });

export const viewport = {
  themeColor: '#033f47'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
