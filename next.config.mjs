/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  assetPrefix: "https://assets.kiomoi.com",
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
        source: "/holidays/-tour-packages",
        destination: "/holidays",
        permanent: true
      },
      {
        source: "/holidays/tour-packages",
        destination: "/holidays",
        permanent: true
      },      

      {
        source : "/holidays/:slug/:id",
        destination: "/holidays",
        permanent: true
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
      {source: "/holidays/tsomoriri-tour-packages-1124", "destination": "/holidays/tsomoriri-tour-packages-11241", "permanent": true}, 
      {source: "/holidays/zuluk-tour-packages-1285", "destination": "/holidays/zuluk-tour-packages-12851", "permanent": true}, 
      {source: "/holidays/darjeeling-tour-packages-187", "destination": "/holidays/darjeeling-tour-packages-1871", "permanent": true}, 
      {source: "/holidays/rameshwaram-tour-packages-668", "destination": "/holidays/rameshwaram-tour-packages-6681", "permanent": true}, 
      {source: "/holidays/itanagar-tour-packages-319", "destination": "/holidays/itanagar-tour-packages-3191", "permanent": true}, 
      {source: "/holidays/manali-tour-packages-500", "destination": "/holidays/manali-tour-packages-5001", "permanent": true}, 
      {source: "/holidays/jabalpur-tour-packages-320", "destination": "/holidays/jabalpur-tour-packages-3201", "permanent": true}, 
      {source: "/holidays/amarkantak-tour-packages-20", "destination": "/holidays/amarkantak-tour-packages-201", "permanent": true},
      
      {source: "/holidays/ahmedabad-tour-packages-887", "destination": "/holidays/ahmedabad-tour-packages-8871", "permanent": true}, {source: "/holidays/simlipal-tour-packages-908", "destination": "/holidays/simlipal-tour-packages-9081", "permanent": true}, {source: "/holidays/mandu-tour-packages-506", "destination": "/holidays/mandu-tour-packages-5061", "permanent": true}, {source: "/holidays/udaipur-tour-packages-826", "destination": "/holidays/udaipur-tour-packages-8261", "permanent": true}, {source: "/holidays/tiruchirappalli-tour-packages-814", "destination": "/holidays/tiruchirappalli-tour-packages-8141", "permanent": true}, {source: "/holidays/kota-tour-packages-446", "destination": "/holidays/kota-tour-packages-4461", "permanent": true}, {source: "/holidays/kerala-tour-packages/19", "destination": "/holidays/kerala-tour-packages-192", "permanent": true}, {source: "/holidays/pench-tour-packages-627", "destination": "/holidays/pench-tour-packages-6271", "permanent": true}, {source: "/holidays/varkala-tour-packages-850", "destination": "/holidays/varkala-tour-packages-8501", "permanent": true}, {source: "/holidays/sivasagar-tour-packages-1126", "destination": "/holidays/sivasagar-tour-packages-11261", "permanent": true}, {source: "/holidays/rishikesh-tour-packages-689", "destination": "/holidays/rishikesh-tour-packages-6891", "permanent": true}, {source: "/holidays/yercaud-tour-packages-877", "destination": "/holidays/yercaud-tour-packages-8771", "permanent": true}, {source: "/holidays/kukke-subrahmanya-tour-packages-456", "destination": "/holidays/kukke-subrahmanya-tour-packages-4561", "permanent": true}, {source: "/holidays/nathang-valley-tour-packages-1300", "destination": "/holidays/nathang-valley-tour-packages-13001", "permanent": true}, {source: "/holidays/chandra-taal-tour-packages-1318", "destination": "/holidays/chandra-taal-tour-packages-13181", "permanent": true}, {source: "/holidays/tadoba-tour-packages-1106", "destination": "/holidays/tadoba-tour-packages-11061", "permanent": true}, {source: "/holidays/imphal-tour-packages-316", "destination": "/holidays/imphal-tour-packages-3161", "permanent": true}, {source: "/holidays/aizawl-tour-packages-8", "destination": "/holidays/aizawl-tour-packages-81", "permanent": true}, {source: "/holidays/ooty-tour-packages-590", "destination": "/holidays/ooty-tour-packages-5901", "permanent": true}, {source: "/holidays/nagzira-tour-packages-1140", "destination": "/holidays/nagzira-tour-packages-11401", "permanent": true}, {source: "/holidays/puri-tour-packages-645", "destination": "/holidays/puri-tour-packages-6451", "permanent": true}, {source: "/holidays/pokhara-tour-packages-1290", "destination": "/holidays/pokhara-tour-packages-12901", "permanent": true}, {source: "/holidays/kaza-tour-packages-410", "destination": "/holidays/kaza-tour-packages-4101", "permanent": true}, {source: "/holidays/kausani-tour-packages-400", "destination": "/holidays/kausani-tour-packages-4001", "permanent": true}, {source: "/holidays/nubra-valley-tour-packages-588", "destination": "/holidays/nubra-valley-tour-packages-5881", "permanent": true}, {source: "/holidays/bomdila-tour-packages/1000", "destination": "/holidays/bomdila-tour-packages-1241", "permanent": true}, {source: "/holidays/kanha-tour-packages-375", "destination": "/holidays/kanha-tour-packages-3751", "permanent": true}, {source: "/holidays/chikhaldara-tour-packages-155", "destination": "/holidays/chikhaldara-tour-packages-1551", "permanent": true}, {source: "/holidays/thekkady-tour-packages-799", "destination": "/holidays/thekkady-tour-packages-7991", "permanent": true}, {source: "/holidays/pachmarhi-tour-packages-595", "destination": "/holidays/pachmarhi-tour-packages-5951", "permanent": true}, {source: "/holidays/nagarkot-tour-packages-1289", "destination": "/holidays/nagarkot-tour-packages-12891", "permanent": true}, {source: "/holidays/kathmandu-tour-packages-1288", "destination": "/holidays/kathmandu-tour-packages-12881", "permanent": true}, {source: "/holidays/pahalgam-tour-packages-596", "destination": "/holidays/pahalgam-tour-packages-5961", "permanent": true}, {source: "/holidays/barkot-tour-packages-74", "destination": "/holidays/barkot-tour-packages-741", "permanent": true}, {source: "/holidays/lamayuru-tour-packages-1127", "destination": "/holidays/lamayuru-tour-packages-11271", "permanent": true}, {source: "/holidays/bhubaneswar-tour-packages-109", "destination": "/holidays/bhubaneswar-tour-packages-1091", "permanent": true}, {source: "/holidays/odisha-tour-packages/29/", "destination": "/holidays/odisha-tour-packages-292", "permanent": true}, {source: "/holidays/agartala-tour-packages-5", "destination": "/holidays/agartala-tour-packages-51", "permanent": true}, {source: "/holidays/bangalore-tour-packages-886", "destination": "/holidays/bangalore-tour-packages-8861", "permanent": true}, {source: "/holidays/dirang-tour-packages-1058", "destination": "/holidays/dirang-tour-packages-10581", "permanent": true}, {source: "/holidays/silchar-tour-packages-746", "destination": "/holidays/silchar-tour-packages-7461", "permanent": true}, {source: "/holidays/nagaland-tour-packages/26/", "destination": "/holidays/nagaland-tour-packages-262", "permanent": true}, {source: "/holidays/pune-tour-packages-644", "destination": "/holidays/pune-tour-packages-6441", "permanent": true}, {source: "/holidays/haridwar-tour-packages-297", "destination": "/holidays/haridwar-tour-packages-2971", "permanent": true}, {source: "/holidays/almora-tour-packages-16", "destination": "/holidays/almora-tour-packages-161", "permanent": true},
      {source: "/states/null",destination:"https://www.kiomoi.com/states",permanent:true},
      {source: "/states/mizoram-undefined",destination:"https://www.kiomoi.com/states",permanent:true},
      {source: "/states/andhra-pradesh-undefined",destination:"https://www.kiomoi.com/states",permanent:true},
      {source: "/states/null",destination:"https://www.kiomoi.com/states",permanent:true},
      // {source: "/attractions/elephant-safari-in-centra",destination:"/410",permanent:true}
      
      
      // ,
      // {
      //   source: "/holidays/:slug-tour-package-:id",
      //   destination : "/holidays/:slug-0:id",
      //   permanent: true
      // }
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
      // /cities/:city/top-sightseeing-places-and-attractions-to-visit-:id(\\d+)
      // },
      {
        source: "/attractions/elephant-safari-in-centra",
        destination: "/410",
      },
      {
        source: "/attractions/deopahar-/-deoparbat-ruins-in-kaziranga-1217",
        destination: "/410",
      },
      {
        source: "/hotels/1000",
        destination: "/410"
      },
      {
        source: "/holidays/:slug-:pre([0]{1}):id(\\d+)",
        destination: "/holidays/detail"
      },
      {
        // source:'/holiday-:slug-tour-package-:id',
        source: "/holidays/:slug-tour-package-:id",
        destination: "/holidays/detail/redirctToNew",
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

      {
        source: "/countries/:country/:slug-:id(\\d+)",
        destination: "/travel-guide/country",
      },

      {
        source: "/states/:city/:slug-:id(\\d+)",
        destination: "/travel-guide/india/detail",
      },

      {
        source: "/places/:city/:slug-:id(\\d+)",
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
      // {
      //   source: "/cities/:city/top-sightseeing-places-and-attractions-to-visit-:id(\\d+)",
      //   destination: "/travel-guide/places",
      // },
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
      // /city-travel-guide-pelling-india/109

      // destination_karde.htm
    ];
  },
};

export default nextConfig;

