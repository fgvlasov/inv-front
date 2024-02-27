import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script src="//cdn.callibri.ru/callibri.js" type="text/javascript" strategy="beforeInteractive"/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;