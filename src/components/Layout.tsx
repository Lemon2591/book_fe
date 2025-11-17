import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" lang="vi" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>
          Đọc Truyện Online Hay Nhất – Ngôn Tình, Cổ Đại, Hiện Đại, Ngược
        </title>
        <meta
          name="google-site-verification"
          content="uvytJCs6KvlOtjAkGZxLOV-y52f7mW0sQkCqTdXV1mE"
        />
      </Head>

      <div>
        <Header />
        {/* end header */}
        {children}
        {/* footer */}
        <Footer />
      </div>
    </>
  );
};

export default React.memo(Layout);
