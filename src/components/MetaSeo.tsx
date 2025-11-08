import Head from "next/head";
export default function MetaSeo(props: any) {
  const convertUrl = (url: string) => {
    const urlShort = url?.split("/");
    const urlEnd = urlShort ? urlShort[urlShort?.length - 1] : "";
    const urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
    return urlStr;
  };
  const urlSeo = `${process.env.NEXT_PUBLIC_SERVER_FE}`;
  let {
    url,
    type,
    title,
    description,
    image,
    domain,
    card,
    keywords,
    pageType,
    dataPage,
  } = props;
  if (!url) {
    url = urlSeo;
  }
  if (!type) {
    type = "website";
  }
  if (!title) {
    title = "Đọc Truyện Online Hay Nhất – Ngôn Tình, Cổ Đại, Hiện Đại, Ngược";
  }
  if (!description) {
    description =
      "Truyện 247 - kho truyện chữ Trung Quốc đồ sộ – ngôn tình, cung đấu, gia đấu, cổ đại, hiện đại, ngược tâm, full và đang ra. Cập nhật nhanh nhất mỗi ngày, đọc miễn phí!";
  }
  if (!image) {
    image = `${urlSeo}/assets/img/static/image_a.jpg`;
  }
  if (!domain) {
    domain = `${process.env.NEXT_PUBLIC_SERVER_FE}`;
  }
  if (!card) {
    card = "summary_large_image";
  }
  if (!keywords) {
    keywords =
      "đọc truyện online, truyện chữ, truyện full, truyện hay, web đọc truyện miễn phí, truyện ngôn tình, truyện tiên hiệp, truyện xuyên không, truyện đam mỹ, truyện bách hợp, truyện hot 2025";
  }

  let schemaProps: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Truyện247",
    url: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
    description:
      "Truyện 247 - đọc truyện online miễn phí: Ngôn Tình, Cổ Đại, Hiện Đại, Ngược, Full.",
    inLanguage: "vi",
    publisher: {
      "@type": "Organization",
      name: "Truyện247",
      url: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SERVER_FE}/assets/img/favicon/favicon.ico`,
        width: 60,
        height: 60,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SERVER_FE}/search?key={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SERVER_FE}`,
    },
  };

  if (pageType === "home") {
    schemaProps = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Truyện247",
      url: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
      potentialAction: {
        "@type": "SearchAction",
        target: `${process.env.NEXT_PUBLIC_SERVER_FE}/search?key={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
          },
        ],
      },
    };
  }
  if (pageType === "detail") {
    schemaProps = {
      "@context": "https://schema.org",
      "@type": "Book",
      name: dataPage?.title,
      url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${dataPage?.slug}`,
      image: convertUrl(dataPage?.cover_url),
      description: dataPage?.description,
      inLanguage: "vi",
      author: {
        "@type": "Person",
        name: dataPage?.author,
      },
      publisher: {
        "@type": "Organization",
        name: dataPage?.title,
        url: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_SERVER_FE}/assets/img/favicon/favicon.ico`,
          width: 60,
          height: 60,
        },
      },
      datePublished: dataPage?.createdAt,
      dateModified: dataPage?.updatedAt,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "9999",
      },
      hasPart: dataPage?.chapters?.map((val: any, idx: number) => {
        return {
          "@type": "Chapter",
          name: `Chương ${val?.order_number}: ${val?.title}`,
          url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${dataPage?.slug}/${val?.id}`,
          position: idx + 1,
        };
      }),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${dataPage?.slug}`,
      },
    };
  }
  if (pageType === "chapter") {
    schemaProps = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Chương ${dataPage?.chapter?.order_number}: ${dataPage?.chapter?.title}`,
      url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${dataPage?.chapter?.slug}/${dataPage?.chapter?.id}`,
      inLanguage: "vi",
      author: {
        "@type": "Person",
        name: `${dataPage?.details?.author}`,
      },
      publisher: {
        "@type": "Organization",
        name: dataPage?.chapter?.title,
        url: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_SERVER_FE}/assets/img/favicon/favicon.ico`,
          width: 60,
          height: 60,
        },
      },
      datePublished: dataPage?.details?.createdAt,
      dateModified: dataPage?.details?.createdAt,
      isPartOf: {
        "@type": `${dataPage?.details?.title}`,
        name: dataPage?.details?.createdAt,
        url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${dataPage?.chapter?.slug}`,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${dataPage?.chapter?.slug}/${dataPage?.chapter?.id}`,
      },
    };
  }
  if (pageType === "category") {
    schemaProps = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: dataPage?.categoryId?.name,
      url: `${process.env.NEXT_PUBLIC_SERVER_FE}/${dataPage?.categoryId?.slug}`,
      description:
        "Danh sách các truyện ngôn tình hay nhất, cập nhật nhanh và miễn phí.",
      inLanguage: "vi",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: dataPage?.topStories?.map((val: any, idx: number) => {
          return {
            "@type": "ListItem",
            position: idx + 1,
            url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${val?.slug}`,
            name: val?.title,
          };
        }),
      },
      publisher: {
        "@type": "Organization",
        name: "Truyện247",
        url: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_SERVER_FE}/assets/img/favicon/favicon.ico`,
          width: 60,
          height: 60,
        },
      },
    };
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="news_keywords" content={keywords} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="keywords" content={keywords} />
        <meta name="twitter:card" content={card} />
        <meta property="twitter:domain" content={domain} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="canonical" href={url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaProps),
          }}
        />
      </Head>
    </>
  );
}
