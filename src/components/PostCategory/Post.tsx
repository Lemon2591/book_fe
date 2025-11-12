import React from "react";
import MetaSeo from "../MetaSeo";
import { AiOutlineHome } from "react-icons/ai";
import moment from "moment";
import { useRouter } from "next/router";
import { Breadcrumb, Space, Table, Button } from "antd";
import type { TableProps } from "antd";
import "moment/locale/vi";
import { stringToSlug } from "@/util/helper";
moment.locale("vi");
import Image from "next/image";

const OutIcon = AiOutlineHome as unknown as React.FC<any>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Post = ({ data }: any) => {
  const router = useRouter();
  const convertUrl = (url: string) => {
    const urlShort = url?.split("/");
    const urlEnd = urlShort ? urlShort[urlShort?.length - 1] : "";
    const urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
    return urlStr;
  };

  const keySeo = data?.genres?.map((val: any) => {
    return val?.name;
  });

  const dataSeo = {
    description: data?.description?.replaceAll("<br/>", ""),
    image: convertUrl(data?.cover_url),
    title: `Đọc truyện ${data?.title} miễn phí`,
    url: `${process.env.NEXT_PUBLIC_SERVER_FE}/page/${data?.slug}`,
    keywords: keySeo?.join(","),
    pageType: "detail",
    dataPage: data,
  };
  const readStory = () => {
    const chapterOne = data?.chapters?.find(
      (val: any) => val?.order_number === 1
    );

    if (chapterOne) {
      router.push(`/page/${data?.slug}/${chapterOne?.id}`);
    }
  };

  const readStoryTable = (value: any) => {
    if (value) {
      router.push(`/page/${data?.slug}/${value?.id}`);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Chương",
      dataIndex: "chapter",
      key: "chapter",
      render: (text) => <a>Chương: {text}</a>,
      width: "60%",
    },
    {
      title: "Ngày đăng",
      dataIndex: "date",
      key: "date",
      width: "30%",
    },
    {
      title: "",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="pink"
            variant="outlined"
            onClick={() => readStoryTable(record)}
            className="no-random-open"
          >
            Đọc truyện
          </Button>
        </Space>
      ),
    },
  ];

  const dataChapter: any[] = data?.chapters?.map((val: any, idx: number) => {
    let titleChap = "";
    if (val?.title !== "null") {
      if (val?.title) {
        titleChap = val?.title;
      }
    }
    return {
      key: idx,
      chapter: val?.order_number + " " + titleChap,
      date: moment(val?.createdAt).format("l"),
      id: val?.id,
    };
  });

  const capitalize = (text: any) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
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
                      style={{
                        color: "#a15252",
                      }}
                    >
                      {data?.title || ""}
                    </a>
                  ),
                },
              ]}
            />
          </div>
          <div className="page-content">
            <div className="page-content-container">
              <div className="page-content-des flex">
                <div className="page-content-des-img relative">
                  <Image
                    src={convertUrl(data?.cover_url)}
                    alt={data?.slug}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="page-content-des-text">
                  <h1>{data?.title || ""}</h1>
                  <div>
                    <h2>Cập nhật:</h2>
                    <p>{capitalize(moment(data?.createdAt).fromNow())}</p>
                  </div>
                  <div>
                    <h2>Tác giả:</h2>
                    <p>{data?.author || "Truyen247"}</p>
                  </div>
                  <div>
                    <h2>Lượt xem:</h2>
                    <p>{data?.views}</p>
                  </div>
                  <div>
                    <h2>Trạng thái:</h2>
                    <p>Trọn bộ</p>
                  </div>
                  <div>
                    <h2>Thể loại:</h2>
                    <div>
                      {data?.genres?.map((val: any, idx: number) => {
                        return (
                          <span
                            key={idx}
                            onClick={() =>
                              router.push(`/${stringToSlug(val?.name)}`)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {val?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <button onClick={readStory}>Đọc truyện</button>
                  </div>
                </div>
              </div>

              <div className="page-content-step">
                <div className="page-content-step-intro text-hd-css">
                  <h2>Giới thiệu truyện:</h2>
                  <p
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  ></p>
                </div>
                <div className="page-content-step-case text-hd-css">
                  <h2>Danh sách chương:</h2>
                  <div className="page-content-chapter-table">
                    <Table<DataType>
                      columns={columns}
                      dataSource={dataChapter}
                      pagination={false}
                      style={{
                        color: "#a15252",
                      }}
                      onRow={(record) => ({
                        onClick: () => {
                          readStoryTable(record);
                        },
                      })}
                      rowClassName="no-random-open"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
