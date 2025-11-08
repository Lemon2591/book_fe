import dynamic from "next/dynamic";
const Chapter: any = dynamic(() => import("@/components/PostCategory/Chapter"));
import Layout from "@/components/Layout";
import Cookies from "cookies";

Chapter.getLayout = function getLayout(page: any) {
  return (
    <Layout webViewMobile={true} web="post">
      {page}
    </Layout>
  );
};

export default Chapter;

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
    const slug = context.params?.sort_url;
    const chapterId = context.params?.chapter;
    const cookies = new Cookies(context.req, context.res);

    const res = await fetch(
      `${process.env.API_SERVER_URL}/api/get-chapter?slug=${slug}&chapterId=${chapterId}`,
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

    if (!obj?.data?.chapter || obj.statusCode !== 200) {
      return {
        notFound: true,
      };
    }
    const order_number = obj?.data?.chapter?.order_number;
    let isLock = order_number !== 1;
    if (order_number > 1) {
      const unlockCookie = cookies.get(`GA-AFF`);
      if (unlockCookie) isLock = false; // cookie tồn tại -> mở khoá
    }
    return {
      props: {
        data: obj?.data,
        isLock: isLock,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
