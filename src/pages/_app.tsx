import "antd/dist/reset.css";
import "../../assets/css/theme.css";
import "../../assets/css/base.css";
import "../../assets/css/main.css";
import "../../assets/css/responsive.css";
import "../../assets/css/post.css";
import "../../assets/css/tiny.css";
import "../../assets/css/404.css";
import "../../assets/css/game.css";

import "aos/dist/aos.css";
import Layout from "../components/Layout";
import "lazysizes";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const openRandomUrl = () => {
      const urls = [
        "https://s.lazada.vn/s.6gsi5",
        "https://s.shopee.vn/1BEMtIZKvw",
      ];
      const rate = 0.15;

      if (Math.random() < rate) {
        const percentUrl = Math.random();
        let index = percentUrl < 0.5 ? 0 : 1;
        const url = urls[index];
        window.open(url, "_blank");
      }
    };

    const handleGlobalClick = (event: any) => {
      if (event.target.closest(".no-random-open")) return;
      openRandomUrl();
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);
  return (
    <>
      <Layout>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=GTM-TNMMNWJS'+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TNMMNWJS');
        `}
        </Script>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
