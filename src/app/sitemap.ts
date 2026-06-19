import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.otizeka.com';
  
  const routes = [
    '',
    '/info',
    '/osb',
    '/education',
    '/osb-research',
    '/stories',
    '/gizlilik',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
