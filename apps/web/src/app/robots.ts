import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/secret/',
      },
      {
        userAgent: 'roboto',
        allow: '/',
        disallow: '/hidden/',
      },
    ],
    sitemap: 'https://icue-streaming.com/sitemap.xml',
    host: 'https://icue-streaming.com',
  };
}
