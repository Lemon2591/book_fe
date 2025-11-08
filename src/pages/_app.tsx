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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const openRandomUrl = () => {
      const urls = ["https://link1.com", "https://link2.com"];
      const rate = 0.2;

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
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
