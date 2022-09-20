/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'img.kiomoi.com']
  },
  async rewrites() {
    return [
      {
        source: '/holidays/:package-tour-packages/:id',
        destination: '/holidays/state-package'
      },
      {
        source: '/holidays/:city-tour-packages',
        destination: '/holidays/city-package'
      },
      {
        source: '/travel-guide/india/city-:city/:id',
        destination: '/travel-guide/india/detail'
      },
      {
        source: '/travel-guide/india/state-:city/:id',
        destination: '/travel-guide/india/detail'
      },      
      {
        source: '/travel-guide/india/attraction-:place/:id',
        destination: '/travel-guide/india/attractions'
      },
      {
        source: '/travel-articles/:slug/:id',
        destination: '/travel-articles/detail'
      },

      {
        source: '/qna/:city-:id',
        destination: '/qna'
      }
    ]
  }
}

module.exports = nextConfig
