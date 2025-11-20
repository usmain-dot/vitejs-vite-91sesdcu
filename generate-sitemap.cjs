const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')

const sitemap = new SitemapStream({ hostname: 'https://bridge-nyc.netlify.app' })
const writeStream = createWriteStream('./dist/sitemap.xml')
sitemap.pipe(writeStream)

// Add your app routes here
sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 })
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 })
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 })
// Add more routes as needed

sitemap.end()

streamToPromise(sitemap).then(() => {
  console.log('✅ Sitemap generated at dist/sitemap.xml')
})
