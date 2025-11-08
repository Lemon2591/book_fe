import dynamic from "next/dynamic";
const Home: any = dynamic(() => import("@/components/Home/Home"));
import Layout from "@/components/Layout";

Home.getLayout = function getLayout(page: any) {
  return (
    <Layout webViewMobile={true} web="home">
      {page}
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  if (
    context &&
    context.query &&
    Object.keys(context.query).includes("_escaped_fragment_") &&
    context.query._escaped_fragment_.length > 1
  ) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
    return {
      notFound: true,
    };
  }

  try {
    const [data_trend, data_top] = await Promise.all([
      fetch(`${process.env.API_SERVER_URL}/api/get-trending`, {
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${process.env.API_SERVER_URL}/api/get-top?page=0&limit=12`, {
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    const [res, data_page] = await Promise.all([
      data_trend.json(),
      data_top.json(),
    ]);

    if (!res || res.statusCode !== 200) {
      return {
        notFound: true,
      };
    }

    if (!data_page || data_page.statusCode !== 200) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data: res?.data,
        dataPage: data_page?.data,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Home;
