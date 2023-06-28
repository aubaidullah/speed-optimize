import Head from "next/head";
import { useRouter } from "next/router";
// import Script from 'next/script';
import * as Constants from "./Constants";

const Meta = ({ meta }) => {
  const { asPath, pathname } = useRouter();
  console.log(asPath);
  const GA_TRACKING_ID = "GTM-MT2JH48";
  // const GA_TRACKING_ID = "G-CVJVT86DPD"
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MT2JH48');
              `
          }}
        />
        <meta charset="utf-8" />
        <link
          rel="icon"
          href={`${Constants.assets_api}/public/icons/logo.png`}
        />
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

        <title>{meta.title}</title>

        <link rel="canonical" href={`https://www.kiomoi.com${asPath}`} />
        <meta name="description" content={meta.longDesc} />
        <meta name="keywords" content={meta.keywords} />

        <meta property="og:title" content={meta.title} />
        <meta property="og:url" content={`https://www.kiomoi.com${asPath}`} />
        <meta property="og:site_name" content="thekiomoi" />
        <meta property="fb:admins" content="263867260781770" />
        <meta property="og:description" content={meta.longDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={meta.image} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.longDesc} />
        <meta name="twitter:url" content={`https://www.kiomoi.com${asPath}`} />
        <meta name="twitter:creator" content="@ki_omoi" />
        <meta name="twitter:site" content="@ki_omoi" />
        <meta
          name="twitter:image"
          content={`${Constants.assets_api}/public/logo.png`}
        />
        <meta name="robots" content="index" />

        <link
          rel="apple-touch-icon"
          href={`${Constants.assets_api}/public/icons/logo.png`}
        />

        <link
          rel="manifest"
          href={`${Constants.assets_api}/public/manifest.json`}
        />
      </Head>
    </>
  );
};

export default Meta;
