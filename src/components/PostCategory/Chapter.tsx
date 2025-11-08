import React, { FC, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Select } from "antd";
import { useRouter } from "next/router";
import MetaSeo from "../MetaSeo";
import { Breadcrumb } from "antd";
import Cookies from "js-cookie";

const OutIcon = AiOutlineHome as unknown as React.FC<any>;

const Chapter: FC<any> = ({ data, isLock }) => {
  const router = useRouter();
  const [unlocked, setUnlock] = useState(!isLock);
  const convertUrl = (url: string) => {
    const urlShort = url?.split("/");
    const urlEnd = urlShort ? urlShort[urlShort?.length - 1] : "";
    const urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
    return urlStr;
  };

  const dataSeo = {
    description: data?.details?.description?.replaceAll("<br/>", ""),
    image: convertUrl(data?.details?.cover_url),
    title: `Đọc truyện ${data?.details?.title} Chương ${data?.chapter?.order_number} - Chapter ${data?.chapter?.order_number}`,
    url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${data?.details?.slug}/${data?.chapter?.id}`,
    pageType: "chapter",
    dataPage: data,
  };
  const options = data.details?.chapters?.map((val: any) => {
    return { value: val?.id, label: `Chương: ${val?.order_number}` };
  });
  const paramsID = router?.query?.chapter;
  const slug = router?.query?.sort_url;

  const handleChange = (value: any) => {
    router.push(`/page/${slug}/${value}`); // chuyển route
  };
  const totalChapter = data?.details?.chapters?.length;

  const nextChapter = () => {
    const currentChapter = data?.details?.chapters?.find(
      (val: any) => val?.id == paramsID
    );
    if (currentChapter?.order_number >= totalChapter) {
      return;
    }
    const nextChapter = data?.details?.chapters?.find(
      (val: any) => val?.order_number == currentChapter?.order_number + 1
    );
    router.push(`/page/${slug}/${nextChapter?.id}`);
  };

  const backChapter = () => {
    const currentChapter = data?.details?.chapters?.find(
      (val: any) => val?.id == paramsID
    );
    if (currentChapter?.order_number <= 1) {
      return;
    }
    const nextChapter = data?.details?.chapters?.find(
      (val: any) => val?.order_number == currentChapter?.order_number - 1
    );
    router.push(`/page/${slug}/${nextChapter?.id}`);
  };

  useEffect(() => {
    setUnlock(!isLock);
  }, [isLock]);
  const handleSetUnlock = () => {
    // set cookie trên FE, tồn tại 10 phút
    Cookies.set("GA-AFF", "true", { expires: 1 / 144 }); // 10 phút
    setUnlock(true);
    window.open("https://s.shopee.vn/1BEMtIZKvw", "_blank");
  };

  return (
    <>
      <MetaSeo {...dataSeo} />
      <div className="pt-[70px] cx-page">
        <div className="container">
          <div className="py-[5px] bread-crum-main">
            <Breadcrumb
              items={[
                {
                  title: (
                    <a
                      className="items-center breadcrum-home"
                      onClick={() => router.push("/")}
                    >
                      <i className="mr-[5px]">
                        <OutIcon />
                      </i>
                      <span>Trang chủ</span>
                    </a>
                  ),
                },
                {
                  title: (
                    <a
                      className="items-center breadcrum-home"
                      onClick={() =>
                        router.push(`/page/${data?.details?.slug}`)
                      }
                    >
                      <span>{data?.details?.title}</span>
                    </a>
                  ),
                },
                {
                  title: (
                    <a
                      style={{
                        color: "#a15252",
                      }}
                    >
                      {`Chương ${
                        data?.details?.chapters?.find(
                          (val: any) => val?.id == paramsID
                        )?.order_number
                      }`}
                    </a>
                  ),
                },
              ]}
            />
          </div>

          <div className="container-docs">
            <div className="container-docs-header">
              <h1>{`Chương ${
                data?.details?.chapters?.find((val: any) => val?.id == paramsID)
                  ?.order_number
              }`}</h1>
              <p>
                Hãy theo dõi <span>truyen247</span> trên facebook để trò chuyện,
                giao lưu và xem lịch cập nhật truyện mới nhất nhé !
              </p>
            </div>
            <div
              className={`container-docs-body ${unlocked ? "block" : "hidden"}`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: data?.chapter?.content }}
              ></div>
            </div>

            <div className={`unlock-c ${unlocked ? "hidden" : "block"}`}>
              <div className="unlock">
                <p>Mời bạn CLICK vào liên kết bên dưới và</p>
                <span>MỞ ỨNG DỤNG SHOPPE</span>
                <p>Để mở khoá toàn bộ chương chuyện</p>
                <button className="no-random-open" onClick={handleSetUnlock}>
                  Mở khoá
                </button>
              </div>
              <div className="unlock-img">
                <img src="/assets/img/static/aff.webp" alt="" />
              </div>
            </div>
            <div className="container-docs-aff"></div>
          </div>

          <div className="control-tab">
            <div>
              <div className="control-tab-container">
                <button onClick={backChapter}>Trước</button>
                <Select
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={options}
                  value={Number(paramsID)}
                />
                <button onClick={nextChapter}>Sau</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chapter;
