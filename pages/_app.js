import '../styles/globals.css'
import '../styles/package.css'
import '../styles/travel-guide.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-svg-core'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import '../components/main.css'
import '../styles/leadform.css'
import '../styles/nav.css'
import '../styles/detail.css'
import '../styles/qna.css'
import '../styles/homepage.css'
import '../styles/hotel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-rangeslider/lib/index.css'
// import "react-multi-carousel/"
import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/footer'
import { ApolloProvider } from "@apollo/client";
import client from '../components/Graphql/service'
import { wrapper } from '../redux_fx/store'

import withTwindApp from '@twind/next/app'
import twindConfig from '../twind.config'


//react-multi-carousel
NProgress.configure({ showSpinner: false, minimum: 0.2 })
// NProgress.set(0.4);

Router.events.on('routeChangeStart', () => NProgress.start());
// NProgress.set(0.4)
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {
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

export default wrapper.withRedux(withTwindApp(twindConfig, MyApp))
// export default withTwindApp(twindConfig, wrapper.withRedux(MyApp))
