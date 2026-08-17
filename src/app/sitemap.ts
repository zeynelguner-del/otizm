import { MetadataRoute } from 'next';
import { GUIDE_ARTICLES } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.otizeka.com';
  
  const staticRoutes = [
    '',
    '/rehber',
    '/hakkimizda',
    '/iletisim',
    '/gizlilik',
    '/kullanim-kosullari',
    '/info',
    '/osb',
    '/education',
    '/osb-research',
    '/stories',
  ];

  const guideRoutes = GUIDE_ARTICLES.map((article) => `/rehber/${article.slug}`);

  const allRoutes = [...staticRoutes, ...guideRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/rehber' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/rehber') ? 0.9 : 0.8,
  }));
}
