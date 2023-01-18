import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    // console.log(pageProps)
    // console.log("_document.js")
    return (
      <Html>
        <Head />
        <body>
        <noscript>
            {/* style="display:none;visibility:hidden" */}
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MT2JH48"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}