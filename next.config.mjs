/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  assetPrefix: "https://devassets.kiomoi.com",
  images: {
    domains: [
      "res.cloudinary.com",
      "img.kiomoi.com",
      "res.cloudi",
      "testkiomoi.vercel.app",
      "assets.kiomoi.com",
      "devassets.kiomoi.com",
      "kiomoi.com",
      "kiomoi.vercel.app",
      "localhost"
    ],
  },
  
  async redirects() {
    return [
      {
        source: "/holiday-:slug-tour-package-:id",
        destination: "/holidays/:slug-tour-package-:id",
        permanent: true,
      },
      {
        source: "/travelguide",
        destination: "/travel-guide",
        permanent: true
      },
      {
        source: "/travel_guide",
        destination: "/travel-guide",
        permanent: true
      },
      {
        source: "/holidays/:slug-tour-package-:id",
        destination : "/holidays/:slug-0:id",
        permanent: true
      }
      // {
      //   source: '/_error',
      //   destination: '/',
      //   permanent:true
      // }
      // {
      //   source: "/:slug",
      //   destination:"/",
      //   permanent:true
      // }
      // {
      //   source: '/holidays-international/:package-tour-packages-:id',
      //   destination: "/holidays/:package-tour-packages-:id:pre(3)",
      //   permanent: true,
      // }
    ];
  },

  async rewrites() {
    return [
      // {
      //   source: '/holidays/international-:package-tour-packages/:id',
      //   destination: '/holidays/international-package'
      // },
      {
        // source:'/holiday-:slug-tour-package-:id',
        source: "/holidays/:slug-tour-package-:id",
        destination: "/holidays/detail",
      },
      {
        source: "/holidays/:slug-:pre([0]{1}):id(\\d+)",
        destination: "/holidays/detail"
      },

      // {
      //   source: '/holidays-international/:package-tour-packages-:id',
      //   destination: '/holidays/international-package'
      // },
      {
        source: "/holidays/:package-tour-packages-:id:pre([3]{1})",
        destination: "/holidays/international-package",
      },
      {
        source: "/holidays/:slug-state-tour-packages-:id",
        destination: "/410",
      },
      {
        source: "/states",
        destination: "/travel-guide/IndexPage"
      },
      {
        source: "/places",
        destination: "/travel-guide/IndexPage"
      },
      {
        source: "/countries",
        destination: "/travel-guide/IndexPage"
      },                  
      {
        source: "/holidays/:theme-tour-packages-in-:package-:id(\\d+):pre([2]{1})",
        destination: "/holidays/city-theme",
      },
      {
        source: "/holidays/:theme-tour-packages-in-:package-:id(\\d+):pre([1]{1})",
        destination: "/holidays/city-theme",
      },
      {
        source: "/holidays/:package-tour-packages-:id:pre([2]{1})",
        destination: "/holidays/state-package",
      },

      {
        source: "/holidays/:city-tour-packages-:id:pre([1]{1})",
        destination: "/holidays/city-package",
      },
      {
        source: "/travel-guide/india/city-:city/:id",
        destination: "/410",
      },
      {
        source: "/travel-guide/india/:id",
        destination: "/410",
      },
      {
        source: "/holidays/:slug/:id",
        destination: "/410",
      },
      {
        source: "/places/:city-:id(\\d+)",
        destination: "/travel-guide/india/detail",
      },      
      // {
      //   source: "/travel-guide/cities/:city-:id(\\d+)",
      //   destination: "/travel-guide/india/detail",
      // },
      {
        source: "/countries/:country-:id(\\d+)",
        destination: "/travel-guide/country",
      },
      
      // {
      //   source: "/travel-guide/countries/:country-:id(\\d+)",
      //   destination: "/travel-guide/country",
      // },
      {
        source: "/travel-guide/india/state-:city/:id",
        destination: "/410",
      },
      {
        source: "/states/:city-:id(\\d+)",
        destination: "/travel-guide/india/detail",
      },

      {
        source: "/states/:city/top-places-to-visit-:id(\\d+)",
        destination: "/travel-guide/places",
      },
      {
        source: "/countries/:city/top-destinations-to-visit-:id(\\d+)",
        destination: "/travel-guide/places",
      },      
      {
        source: "/cities/:city/top-sightseeing-places-and-attractions-to-visit-:id(\\d+)",
        destination: "/travel-guide/places",
      },      
      // top-attractions-to-visit
      // {
      //   source: "/travel-guide/states/:city-:id(\\d+)",
      //   destination: "/travel-guide/india/detail",
      // },
      // {
      //   source: '/holidays/theme-:theme',
      //   destination: '/holidays/theme'
      // },
      {
        source: "/holidays/:theme-tour-packages",
        destination: "/holidays/theme",
      },

      {
        // source: "/travel-guide/india/attraction-:place/:id",
        source : "/attractions/:place-in-:city-:id(\\d+)",
        destination: "/travel-guide/india/attractions",
      },
      {
        source: "/travel-articles/:slug-:id(\\d+)",
        destination: "/travel-articles/detail",
      },

      {
        source: "/qna/:city-:id",
        destination: "/qna",
      },
      {
        source: "/hotel-:name-in-:city-:id",
        destination: "/hotels/details",
      },
      {
        source: "/hotels/hotel-in-:city-:id",
        destination: "/hotels/list",
      },
      {
        source: "/mkt/india-holidays/south-india-tour-packages",
        destination: "/mkt/india-holidays/south-india-tour-packages/index.html",
      },

      {
        source:'/holidays-international/:package-tour-packages-:id',
        destination:'/410'
      },
      {
        source: "/holidays/:slug",
        destination: "/410",
      },
      {
        source:'/holidays/\[name\]-tour-package-\[id\]',
        destination:'/410'
      },
      {
        source: "/holidays/detail",
        destination: "/410",
      },      
      {
        source: "/idl:slug",
        destination: "/410",
      },
      {
        source: "/:city-qna-:slug",
        destination: "/410",
      },
      {
        source: "/book-online-:slug",
        destination: "/410",
      },
      {
        source: "/book-online-:slug/:cat/:name.htm",
        destination: "/410",
      },
      {
        source: "/holidays-india/:slug/:id",
        destination: "/410",
      },
      {
        source: "/travel-guide/:city/:slug.htm",
        destination: "/410",
      },
      {
        source: "/travel-guide/:slug*",
        destination: "/410",
      },
      {
        source: "/travel-articles/:slug/:slug1",
        destination: "/410",
      },
      {
        source: "/travel-articles-:s.htm",
        destination: "/410",
      },      
      {
        source: "/tour-packages-:country/:slug.htm",
        destination: "/410",
      },
      {
        source: "/tours-in-:city.htm",
        destination: "/410",
      },
      {
        source: "/ask_:slug",
        destination: "/410",
      },
      {
        source: "/travel/:cat/:slug.htm",
        destination: "/410",
      },
      {
        source: "/tour-:slug.htm",
        destination: "/410",
      },
      {
        source: "/travel-articles/:id",
        destination: "/410",
      },
      {
        source: "/destination_:city.htm",
        destination: "/410",
      },
      {
        source: "/review_:slug.htm",
        destination: "/410",
      },
      {
        source: "/hotel_:slug.htm",
        destination: "/410",
      },
      {
        source: "/city-travel-guide-:slug/:id",
        destination: "/410",
      },
      {
        source: "/travel-guide-:slug",
        destination: "/410",
      },
      {
        source: "/explore-:slug-travel-guide.htm",
        destination: "/410",
      },
      {
        source: "/state-:slug.htm",
        destination: "/410",
      },
      {
        source: "/tours-category-:slug.htm",
        destination: "/410",
      },
      {
        source: "/travel-guide-:slug/:id",
        destination: "/410",
      },
      {
        source: "/visit-:slug.htm",
        destination: "/410",
      },
      {
        source: "/city-travel-guide-:slug/:id",
        destination: "/410",
      },
      {
        source: "/destination_:slug.htm/",
        destination: "/410",
      },
      {
        source: "/besthoteldeals-:slug.htm",
        destination: "/410",
      },

      {
        source: "/tours-category-:slug/:nm.htm",
        destination: "/410",
      },
      {
        source: "/travel-guide-india-:slug/:id",
        destination: "/410",
      },
      {
        source: "/holidays/:city-tour-packages/",
        destination: "/410",
      },
      {
        source: "/:slug.htm",
        destination: "/410"
      },
      {
        source: "/:slug1/:slug2s.htm",
        destination: "/410"
      },
      {
        source: "/:sl1/:sl2/:sl3.html",
        destination: "/410"
      },
      {
        source: "/early-sunrise-early-sunset/:slug",
        destination: "/410"
      },
      {
        source: "/early-sunrise-early-sunset",
        destination: "/410"
      },
      {
        source: "/travel-stories-:slug/:sl",
        destination: "/410"
      },
      {
        source: "/hotels/hotel-in--:id",
        destination: "/410"
      },
      {
        source: "/north-sikkim-tour-itinerary-sightseeing-detail-537",
        destination: "/410"
      }
      // {
      //   source :'/travel-guide-india-:slug/:id',
      //   destination : '/410'
      // },
      // https://www.kiomoi.com/city-travel-guide-pelling-india/109

      // destination_karde.htm
    ];
  },  
};

export default nextConfig;

