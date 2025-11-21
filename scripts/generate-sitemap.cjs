const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')
const path = require('path')

const sitemap = new SitemapStream({ hostname: 'https://bridge-nyc.netlify.app' })

// FIX: write directly into the same folder where the script lives
const writeStream = createWriteStream(path.resolve(__dirname, 'sitemap.xml'))
sitemap.pipe(writeStream)

// Add your app routes here
sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 })
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 })
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 })
sitemap.write({ url: '/dummy-route', changefreq: 'yearly', priority: 0.1 })

sitemap.end()

streamToPromise(sitemap).then(() => {
  console.log('✅ Sitemap generated at public/sitemap.xml')
})
