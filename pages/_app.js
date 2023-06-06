import 'nprogress/nprogress.css';
import '@/styles/globals.css'
import '@/styles/globals.css'
import '@/styles/detail.css'
import '@/styles/global.css'
import '@/styles/Home.module.css'
import '@/styles/homepage.css'
import '@/styles/hotel.css'
import '@/styles/leadform.css'
import '@/styles/nav.css'
import '@/styles/package.css'
import '@/styles/qna.css'
import '@/styles/travel-guide.css'
import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dynamic from 'next/dynamic';
import NProgress from 'nprogress'

import { wrapper } from '../redux_fx/store'




NProgress.configure({ showSpinner: false, minimum: 0.2 })

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



const ApolloProvider = dynamic(() => import('@apollo/client').then((mod)=>mod.ApolloProvider))
const client= dynamic(() => import('@/components/Graphql/service').then((mod)=>mod.client))
const Footer = dynamic(() => import('@/components/footer'))
import Router from 'next/router'
import { useEffect } from 'react'


NProgress.configure({ showSpinner: false, minimum: 0.2 })
// NProgress.set(0.4);

Router.events.on('routeChangeStart', () => NProgress.start());
// NProgress.set(0.4)
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    dynamic(()=> import("react-facebook-pixel")
    // import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('630837885046995');
        ReactPixel.pageView();

        Router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      }));
  });
  return (
    <>
      <style jsx>{`
        .model-content{
          background-color:'red';
        }
      `}</style>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <Footer />
    </>
  )

}

// export default MyApp

export default wrapper.withRedux(MyApp)