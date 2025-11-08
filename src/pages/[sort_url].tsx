import dynamic from "next/dynamic";
const Category: any = dynamic(() => import("@/components/Category"));
import Layout from "@/components/Layout";

Category.getLayout = function getLayout(page: any) {
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
    const { sort_url } = context?.query;

    const res = await fetch(
      `${process.env.API_SERVER_URL}/api/get-filter-categories?categories=${sort_url}&page=0&limit=12`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const obj = await res.json();
    if (!obj || obj.statusCode !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: obj?.data,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Category;
