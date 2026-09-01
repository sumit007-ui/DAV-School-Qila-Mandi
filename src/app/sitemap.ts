import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/academics',
    '/campus',
    '/student-life',
    '/achievements',
    '/admissions',
    '/news',
    '/gallery',
    '/contact',
    '/mandatory-disclosure',
    '/privacy',
    '/terms',
  ];

  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/admissions' || route === '/news' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/admissions' ? 0.9 : 0.8,
  }));
}
