import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/update/',
    },
    sitemap: 'https://vivone.dev/sitemap.xml',
  };
}