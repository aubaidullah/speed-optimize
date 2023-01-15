import Head from 'next/head'
import { useRouter } from 'next/router';

const Meta = ({meta}) =>{
    const { asPath, pathname } = useRouter();
    console.log(asPath);
    return <>
    <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="/icons/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta 
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
        />
        <meta name="google-site-verification" content="9Sb4VP2cYN-uOYsvXZPSvdYFSlJ-8gg-K92mfDmIf6Q" />
        <meta name="theme-color" content="#000000" />
        
        
        
        <title>{meta.title}</title>

        <link rel="canonical" href={`https://www.kiomoi.com${asPath}`}/>
        <meta name="description" content={meta.longDesc} />
        <meta name="keywords" content={meta.keywords} />

        <meta property="og:title" content={meta.title}/>
        <meta property="og:url" content={`https://www.kiomoi.com${asPath}`}/>
        <meta property="og:site_name" content="thekiomoi"/>
        <meta property="fb:admins" content="263867260781770"/>
        <meta property="og:description" content={meta.longDesc}/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={meta.image}/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={meta.title}/>
        <meta name="twitter:description" content={meta.longDesc}/>
        <meta name="twitter:url" content={`https://www.kiomoi.com${asPath}`} />
        <meta name="twitter:creator" content="@ki_omoi" />
        <meta name="twitter:site" content="@ki_omoi" />
        <meta name="twitter:image" content="https://www.kiomoi.com/logo.png"/>
        <meta name="robots" content="index" />
        

        <link rel="apple-touch-icon" href="/icons/logo.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    </Head>

    </>
}

export default Meta