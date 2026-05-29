/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.trenchsecurity.ai',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.trenchsecurity.ai/sitemap.xml',
    ],
  },
}