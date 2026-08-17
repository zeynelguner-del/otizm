import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/family/',
          '/calendar/',
          '/api/',
        ],
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/family/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.otizeka.com/sitemap.xml',
  };
}
