/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.trenchsecurity.ai',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Generates a single, direct sitemap.xml instead of a sitemap index + sitemap-0.xml
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
  },
}