/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://myfinancebeacon.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: ['/privacy-policy', '/terms'],
}
