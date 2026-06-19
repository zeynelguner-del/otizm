import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OtiZeka',
    short_name: 'OtiZeka',
    description: 'Otizm Destek ve Özel Eğitim Çocuk Gelişim Platformu',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#0d9488',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/otizeka-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
