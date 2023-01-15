/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'img.kiomoi.com']
  },
  async rewrites() {
    return [
      {
        source: '/holidays/:package-tour-packages/:id/',
        destination: '/holidays/state-package'
      },
      {
        source: '/holidays/:city-tour-packages/',
        destination: '/holidays/city-package'
      },
      {
        source: '/travel-guide/india/city-:city/:id/',
        destination: '/travel-guide/india/detail'
      },
      {
        source: '/travel-guide/:country/:id/',
        destination: '/travel-guide/country'
      },      
      {
        source: '/travel-guide/india/state-:city/:id/',
        destination: '/travel-guide/india/detail'
      },
      {
        source: '/holidays/theme-:theme/',
        destination: '/holidays/theme'
      },      
      
      {
        source: '/travel-guide/india/attraction-:place/:id/',
        destination: '/travel-guide/india/attractions'
      },
      {
        source: '/travel-articles/:slug/:id/',
        destination: '/travel-articles/detail'
      },

      {
        source: '/qna/:city-:id/',
        destination: '/qna'
      },
      {
        source: '/hotel-:name-in-:city-:id/',
        destination: '/hotels/details'
      },
      {
        source: '/hotels/hotel-in-:city-:id/',
        destination: '/hotels/list'
      },
      {
        source :'/mkt/india-holidays/south-india-tour-packages/',
        destination : '/mkt/india-holidays/south-india-tour-packages/index.html'
      }
      
    ]
  }
}

module.exports = nextConfig
