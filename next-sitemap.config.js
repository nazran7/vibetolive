/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://www.vibetolive.dev', // ✅ fixed domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ],
  },
}
