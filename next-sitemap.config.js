/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://myfinancebeacon.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  exclude: ['/privacy-policy', '/terms'],
  transform: async (config, path) => {
    const isBlogPost = path.startsWith('/blog')
    return {
      loc: path,
      changefreq: isBlogPost ? 'monthly' : config.changefreq,
      priority: isBlogPost ? 0.6 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
