/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: true,
  reactStrictMode: true,
  // assetPrefix : 'https://assets.kiomoi.com',
  // assetsPrefix:window.location.origin.toString() === "http://localhost:3000"||"https://kiomoitest.kiomoi.com" ?"https://devassets.kiomoi.com":"https://assets.kiomoi.com",
  images: {
    domains: ['res.cloudinary.com', 'img.kiomoi.com']
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.res.cloudinary.com',
    //   },
    // ],
  },
//   Kiomoi.com/countries/india
// Kiomoi.com/states/sikkim
// Kiomoi.com/cities/gangtok
  async rewrites() {
    return [
      // {
      //   source: '/holidays/international-:package-tour-packages/:id',
      //   destination: '/holidays/international-package'
      // }, 
      {
        source:'/holiday-:slug-tour-package-:id',
        destination:'/holidays/detail'
      },
      
      {
        source: '/holidays-international/:package-tour-packages/:id',
        destination: '/holidays/international-package'
      },       
      {
        source: '/holidays/:package-tour-packages-:id:pre([2]{1})',
        destination: '/holidays/state-package'
      },     
      {
        source: '/holidays/:city-tour-packages-:id:pre([1]{1})',
        destination: '/holidays/city-package'
      },
      {
        source: '/travel-guide/india/city-:city/:id',
        destination: '/410'
      },
      {
        source: '/travel-guide/india/:id',
        destination: '/410'
      },
      {
        source: '/holidays/:slug/:id',
        destination: '/410'
      },      
      {
        source: '/travel-guide/cities/:city-:id(\\d+)',
        destination: '/travel-guide/india/detail'
      },      
      {
        source: '/travel-guide/countries/:country-:id(\\d+)',
        destination: '/travel-guide/country'
      },      
      {
        source: '/travel-guide/india/state-:city/:id',
        destination: '/410'
      },
      {
        source: '/travel-guide/states/:city-:id(\\d+)',
        destination: '/travel-guide/india/detail'
      },      
      {
        source: '/holidays/theme-:theme',
        destination: '/holidays/theme'
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
      },
      {
        source: '/hotel-:name-in-:city-:id',
        destination: '/hotels/details'
      },
      {
        source: '/hotels/hotel-in-:city-:id',
        destination: '/hotels/list'
      },
      {
        source :'/mkt/india-holidays/south-india-tour-packages',
        destination : '/mkt/india-holidays/south-india-tour-packages/index.html'
      },
      {
        source :'/idl:slug',
        destination : '/410'
      },
      {
        source :'/:city-qna-:slug',
        destination : '/410'
      },
      {
        source :'/book-online-:slug',
        destination : '/410'
      },
      {
        source :'/book-online-:slug/:cat/:name.htm',
        destination : '/410'
      },
      {
        source :'/holidays-india/:slug/:id',
        destination : '/410'
      },
      {
        source :'/travel-guide/:city/:slug.htm',
        destination : '/410'
      },
      {
        source :'/tour-packages-:country/:slug.htm',
        destination : '/410'
      },
      {
        source :'/tours-in-:city.htm',
        destination : '/410'
      },
      {
        source :'/ask_:slug',
        destination : '/410'
      },
      {
        source :'/travel/:cat/:slug.htm',
        destination : '/410'
      },
      {
        source :'/tour-:slug.htm',
        destination : '/410'
      },
      {
        source :'/travel-articles/:id',
        destination : '/410'
      },
      {
        source :'/destination_:city.htm',
        destination : '/410'
      },
      {
        source :'/review_:slug.htm',
        destination : '/410'
      },
      {
        source :'/hotel_:slug.htm',
        destination : '/410'
      },
      {
        source :'/city-travel-guide-:slug/:id',
        destination : '/410'
      },
      {
        source :'/travel-guide-:slug',
        destination : '/410'
      },
      {
        source :'/explore-:slug-travel-guide.htm',
        destination : '/410'
      },
      {
        source :'/state-:slug.htm',
        destination : '/410'
      },
      {
        source :'/tours-category-:slug.htm',
        destination : '/410'
      },
      {
        source :'/travel-guide-:slug/:id',
        destination : '/410'
      },
      {
        source :'/visit-:slug.htm',
        destination : '/410'
      },
      {
        source :'/city-travel-guide-:slug/:id',
        destination : '/410'
      },
      {
        source :'/destination_:slug.htm/',
        destination : '/410'
      },
      {
        source :'/besthoteldeals-:slug.htm',
        destination : '/410'
      },

      {
        source :'/tours-category-:slug/:nm.htm',
        destination : '/410'
      },
      {
        source :'/travel-guide-india-:slug/:id',
        destination : '/410'
      },
      {
        source : '/holidays/:city-tour-packages/',
        destination : '/410'
      }
      // {
      //   source :'/travel-guide-india-:slug/:id',
      //   destination : '/410'
      // },      
      // https://www.kiomoi.com/city-travel-guide-pelling-india/109

      // destination_karde.htm
    ]
  },
  
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: 'preact/compat',
  //       'react-dom/test-utils': 'preact/test-utils',
  //       'react-dom': 'preact/compat',
  //     })
  //   }
  //   return config
  // },
  // async redirects(){
  //   return [
  //     {
  //       source: 'idl_*',
  //       // destination:'',
  //       statusCode:410
  //     }
  //   ]
  // }
}

module.exports = nextConfig
// 😘