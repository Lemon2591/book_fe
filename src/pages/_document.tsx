// @ts-nocheck
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Link from "next/link";
import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // @ts-ignore
    return (
      <Html id="html-main" lang="vi">
        <Head>
          <link rel="shortcut icon" href="/assets/img/favicon/favicon.png" />
          <link rel="shortcut icon" href="/assets/img/favicon/favicon.ico" />
          <link rel="icon" href="/assets/img/favicon/favicon.png" />
          <link rel="icon" href="/assets/img/favicon/favicon.ico" sizes="any" />
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TNMMNWJS"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
