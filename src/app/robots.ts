import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/family/',
        '/emotions/',
        '/calendar/',
        '/music/',
        '/acc/',
        '/aac/',
        '/games/',
        '/imitation/',
        '/speech-therapy/',
        '/duyusal-oda/',
        '/sentence-sounds/',
        '/education-reminder/',
        '/api/',
      ],
    },
    sitemap: 'https://www.otizeka.com/sitemap.xml',
  };
}
