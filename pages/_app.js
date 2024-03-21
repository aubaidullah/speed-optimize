import "nprogress/nprogress.css";
import "@/styles/globals.css";
import "@/styles/globals.css";
import "@/styles/detail.css";
import "@/styles/global.css";
import "@/styles/Home.module.css";
import "@/styles/homepage.css";
import "@/styles/hotel.css";
import "@/styles/leadform.css";
import "@/styles/nav.css";
import "@/styles/package.css";
import "@/styles/qna.css";
import "@/styles/travel-guide.css";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-rangeslider/lib/index.css";
import dynamic from "next/dynamic";
import NProgress from "nprogress";
import { useRouter } from 'next/router'

import { wrapper } from "../redux_fx/store";

NProgress.configure({ showSpinner: false, minimum: 0.2 });

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

const ApolloProvider = dynamic(() =>
  import("@apollo/client").then((mod) => mod.ApolloProvider),
);
const client = dynamic(() =>
  import("@/components/Graphql/service").then((mod) => mod.client),
);
const Footer = dynamic(() => import("@/components/footer"));
import Router from "next/router";
// import { useEffect } from "react";

NProgress.configure({ showSpinner: false, minimum: 0.2 });
// NProgress.set(0.4);

Router.events.on("routeChangeStart", () => NProgress.start());
// NProgress.set(0.4)
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  // useEffect(() => {
  //   dynamic(() =>
  //     import("react-facebook-pixel")
  //       // import("react-facebook-pixel")
  //       .then((x) => x.default)
  //       .then((ReactPixel) => {
  //         ReactPixel.init("794577978818419");
  //         ReactPixel.pageView();

  //         Router.events.on("routeChangeComplete", () => {
  //           ReactPixel.pageView();
  //         });
  //       }),
  //   );
  // },[router.events]);
  
  return (
    <>
      {/* <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MT2JH48"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript> */}

      <style jsx>
        {`
          .model-content {
            background-color: "red";
          }
        `}
      </style>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>

      <Footer />

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CVJVT86DPD"
      />

      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){
                    dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'G-CVJVT86DPD');
              `,
        }}
      /> */}
    </>
  );
}

export const getStaticProps = (context) => {
  if (context.res.statusCode === 404) {
    res.writeHead(301, { Location: '/' })
    res.end()
  }
};

// export default MyApp

export default wrapper.withRedux(MyApp);
