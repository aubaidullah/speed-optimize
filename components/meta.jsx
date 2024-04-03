import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
// import Script from 'next/script';
import * as Constants from "./Constants";

const Meta = ({ meta }) => {
  const { asPath, pathname } = useRouter();
  const GA_TRACKING_ID = "GTM-MT2JH48";
  const jsonData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.kiomoi.com",
    name: "Kiomoi Travels",
    description: "Book Holiday Packages, Honeymoon And Vacation Trip",
    url: "https://www.kiomoi.com",
    telephone: "+919650687940",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "IN",
      postalCode: "201301",
      streetAddress: "201301 H-187, Lohia Road, Sector-63, Noida 201301 India",
    },
    logo: "https://www.kiomoi.com/icons/kiomoi%20logo.svg",
    email: "info@kiomoi.com",
    sameAs: [
      "https://www.facebook.com/thekiomoi/",
      "https://twitter.com/ki_omoi",
      "https://www.instagram.com/kiomoi_in/",
      "https://www.linkedin.com/company/kiomoi/",
      "https://www.youtube.com/channel/UCPq6EimDUQ2eknEJgyLqnnA",
    ],
  };

  // const jsonP ={
  //   "@context":"http://schema.org/",
  //   "@type":"Organization",
  //   "name":"KIOMOI TRAVEL SERVICES (P) LTD",
  //   "aggregateRating":
  //   {
  //     "@type":"AggregateRating",
  //     "ratingValue":"4.5",
  //     "reviewCount":"1"
  //   },
  //   "review":
  //       [
  //         {
  //         "@type":"Review",
  //         "author":
  //           {
  //             "@type":"Person",
  //             "name":"Bhuvanesh Prajapati"
  //           },
  //           "reviewBody":" I recently visited meghalaya during the long weekend around independence day and I travelled solo and was planning my itinerary all by myself. ",
  //           "name":"Kiomoi Reviews",
  //           "reviewRating":
  //           {
  //             "@type":"Rating",
  //             "bestRating":"5",
  //             "ratingValue":"5",
  //             "worstRating": "2.5"
  //           }
  //         }
  //       ]
  //   }

  const jsonP = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": "https://www.kiomoi.com/",
    "name": "Kiomoi Travel",
    "description":"Book Domestic And International Holiday Tour Packages, Honeymoon And Adventure Vacations for Families",
    "logo": "https://www.kiomoi.com/icons/kiomoi%20logo.svg",
    "sameAs": [
      "",
      "https://www.facebook.com/thekiomoi/",
      "https://twitter.com/ki_omoi",
      "https://www.instagram.com/kiomoi_in/",
      "https://www.linkedin.com/company/kiomoi/",
      "https://www.youtube.com/channel/UCPq6EimDUQ2eknEJgyLqnnA",
      "https://in.pinterest.com/kiomoitravel/"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9650687940",
        "contactType": "Customer Service",
        "ContactOption": "Customer Service"
      },
      {
        "@type": "ContactPoint",
        "email": "info@kiomoi.com",
        "contactType": "Customer Service",
        "ContactOption": "Send Enquiry"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9650687940",
        "contactType": "Customer Service",
        "ContactOption": "WHATSAPP - For Foreign and Nationals"
      }
     
    ]
  }

  const jsonLocal = {
    "@context": "http://schema.org/",
    "@type": "LocalBusiness",
    "url": "https://www.kiomoi.com/",
    "name": "KIOMOI TRAVEL SERVICES (P) LTD",
    "email": "info@kiomoi.com",
    "telephone": "+91-9650687940",
    "image": "https://www.kiomoi.com/icons/kiomoi%20logo.svg",
    "sameAs": [
      "https://www.facebook.com/thekiomoi/",
      "https://twitter.com/ki_omoi",
      "https://www.instagram.com/kiomoi_in/",
      "https://www.linkedin.com/company/kiomoi/",
      "https://www.youtube.com/channel/UCPq6EimDUQ2eknEJgyLqnnA",
      "https://in.pinterest.com/kiomoitravel/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": {
        "@type": "Country",
        "name": "India"
      },
      "streetAddress": "H-187, Sector-63,",
      "addressLocality": "Lohia Road",
      "addressRegion": "Noida, Uttar Pradesh",
      "postalCode": "201301"
    }  
  }

  // const GA_TRACKING_ID = "G-CVJVT86DPD"
  return (
    <>
      <Head>



      <link rel="apple-touch-icon" sizes="57x57" href={`${Constants.assets_api}/public/icons/meta/apple-icon-57x57.png`}/>
      <link rel="apple-touch-icon" sizes="60x60" href={`${Constants.assets_api}/public/icons/meta/apple-icon-60x60.png`}/>
      <link rel="apple-touch-icon" sizes="72x72" href={`${Constants.assets_api}/public/icons/meta/apple-icon-72x72.png`}/>
      <link rel="apple-touch-icon" sizes="76x76" href={`${Constants.assets_api}/public/icons/meta/apple-icon-76x76.png`}/>
      <link rel="apple-touch-icon" sizes="114x114" href={`${Constants.assets_api}/public/icons/meta/apple-icon-114x114.png`}/>
      <link rel="apple-touch-icon" sizes="120x120" href={`${Constants.assets_api}/public/icons/meta/apple-icon-120x120.png`}/>
      <link rel="apple-touch-icon" sizes="144x144" href={`${Constants.assets_api}/public/icons/meta/apple-icon-144x144.png`}/>
      <link rel="apple-touch-icon" sizes="152x152" href={`${Constants.assets_api}/public/icons/meta/apple-icon-152x152.png`}/>
      <link rel="apple-touch-icon" sizes="180x180" href={`${Constants.assets_api}/public/icons/meta/apple-icon-180x180.png`}/>
      <link rel="icon" type="image/png" sizes="192x192"  href={`${Constants.assets_api}/public/icons/meta/android-icon-192x192.png`}/>
      <link rel="icon" type="image/png" sizes="32x32" href={`${Constants.assets_api}/public/icons/meta/favicon-32x32.png`}/>      
      <link rel="icon" type="image/png" sizes="96x96" href={`${Constants.assets_api}/public/icons/meta/favicon-96x96.png`}/>      
      <link rel="icon" type="image/png" sizes="16x16" href={`${Constants.assets_api}/public/icons/meta/favicon-16x16.png`}/>
      <meta name="msapplication-TileImage" content={`${Constants.assets_api}/public/icons/meta/ms-icon-144x144.png`}/>
      <meta name="msapplication-TileColor" content="#ffffff"/>


        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MT2JH48');
              `,
          }}
        />

        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
        /> */}

        {
          !asPath.includes("/travel-articles") && !asPath.includes("/attractions/")
          ?
            <>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonP) }}
              />
              {
                !asPath.includes("/cities/") && !asPath.includes("/places/") && !asPath.includes("/states/") && !asPath.includes("/travel-guide")
                ? <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLocal)}}
                  />
              :""
              }

            </>
          
          :""
        }
        



        {/* </script> */}

        <meta charSet="utf-8" />
        {/* <link
          rel="icon"
          href={`${Constants.assets_api}/public/icons/logo.png`}
        /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta
          name="google-site-verification"
          content="9Sb4VP2cYN-uOYsvXZPSvdYFSlJ-8gg-K92mfDmIf6Q"
        />
        <meta name="theme-color" content="#f06726" />
        <meta
          name="facebook-domain-verification"
          content="lmf2rs35govemhvoa9eitvy3mwv2b2"
        />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          // strategy="afterInteractive"
        />

        {/* <Script>

            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}');
            `}
            </Script> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />

        {/* </script> */}
        {/* dangerouslySetInnerHTML = {{
                   __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${GA_TRACKING_ID}', {
               page_path: window.location.pathname,
             });
           `,
         }}
         /> */}

        <title>{meta?.title??meta?.metaTitle}</title>

        <link rel="canonical" href={`https://www.kiomoi.com${asPath}`} />
        <meta name="description" content={meta?.longDesc??meta?.metaDesc} />
        <meta name="keywords" content={meta?.keywords??meta?.metaKeywords} />

        <meta property="og:title" content={meta?.title??meta?.metaTitle} />
        <meta property="og:url" content={`https://www.kiomoi.com${asPath}`} />
        <meta property="og:site_name" content="thekiomoi" />
        <meta property="fb:admins" content="263867260781770" />
        <meta property="og:description" content={meta?.longDesc??meta?.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={meta?.image} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta?.title??meta?.metaTitle} />
        <meta name="twitter:description" content={meta?.longDesc??meta?.metaDesc} />
        <meta name="twitter:url" content={`https://www.kiomoi.com${asPath}`} />
        <meta name="twitter:creator" content="@ki_omoi" />
        <meta name="twitter:site" content="@ki_omoi" />
        <meta
          name="twitter:image"
          content={`${Constants.assets_api}/public/logo.png`}
        />
        <meta name="robots" content="index,follow" />

        {/* <link
          rel="apple-touch-icon"
          href={`${Constants.assets_api}/public/icons/logo.png`}
        /> */}

        <link
          rel="manifest"
          href={`${Constants.assets_api}/public/manifest.json`}
        />
      </Head>
    </>
  );
};

export default Meta;
