import React, { useState } from "react";
import MetaSeo from "../MetaSeo";
import {
  AiOutlineSearch,
  AiFillStar,
  AiOutlineSignature,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { Pagination as PaginationAntd } from "antd";
import moment from "moment";
import "moment/locale/vi";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
moment.locale("vi");
import Image from "next/image";

const SearchIcon = AiOutlineSearch as unknown as React.FC<any>;
const StarIcon = AiFillStar as unknown as React.FC<any>;
const OutIcon = AiOutlineSignature as unknown as React.FC<any>;

function Categories({ data }: any) {
  console.log(data);
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataPageState, setDataPageState] = useState(data?.topStories || []);

  const dataSeo = {
    description: `Tổng hợp truyện ${data?.categoryId?.name} đặc sắc nhất, cập nhật liên tục. Đọc full, đọc online miễn phí, cập nhật chương mới mỗi ngày!`,
    title: `Truyện ${data?.categoryId?.name} Hay Nhất – Đọc Online Miễn Phí, Cập Nhật Liên Tục`,
    domain: `${process.env.NEXT_PUBLIC_SERVER_FE}`,
    pageType: "category",
    dataPage: data,
  };

  const handleSearch = (e?: any, isKey?: string) => {
    if (valueSearch) {
      if (isKey === "key") {
        if (e.key === "Enter") {
          router.push(`/search?key=${valueSearch}`);
        }
      } else {
        router.push(`/search?key=${valueSearch}`);
      }
    }
  };

  const capitalize = (text: any) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const paginationPage = async (page: any, pageSize: any) => {
    try {
      const { sort_url } = router.query;
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/api/get-filter-categories?categories=${sort_url}&page=${page}&limit=12`
      );
      setDataPageState(data?.data?.topStories);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const navigateURL = (e: any, url: string) => {
    e.preventDefault();
    router.push(`/page/${url}`);
  };

  return (
    <>
      <MetaSeo {...dataSeo} />
      <main>
        <article>
          <section className="suggest" id="suggest">
            <div className="container">
              <div className="py-[50px] suggest-content suggest-category-ct">
                <div className="flex suggest-search pt-[40px] suggest-category">
                  <div className="w-[70%] suggest-left">
                    <h1>Truyện theo thể loại: {data?.categoryId?.name}</h1>
                  </div>
                  <div className="w-[30%] suggest-right">
                    <div>
                      <input
                        type="text"
                        placeholder="Tìm kiếm"
                        onKeyDown={(e) => handleSearch(e, "key")}
                        onChange={(e) => setValueSearch(e.target.value)}
                      />
                      <i>
                        <SearchIcon
                          color="#FDAAAA"
                          size={20}
                          cursor={"pointer"}
                          onClick={() => handleSearch()}
                        />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="suggest-container">
                  {isLoading && (
                    <div className="loading-secction">
                      <div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap">
                    {dataPageState?.length > 0 &&
                      dataPageState?.map((val: any, idx: any) => {
                        const urlShort = val?.cover_url?.split("/");
                        const urlEnd = urlShort
                          ? urlShort[urlShort?.length - 1]
                          : "";
                        const url = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
                        return (
                          <a
                            className="suggest-container-item flex"
                            key={idx}
                            onClick={(e) => navigateURL(e, val?.slug)}
                            href={`/page/${val?.slug}`}
                          >
                            <div className="suggest-container-img relative">
                              <Image
                                src={url}
                                alt={val?.slug}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="suggest-container-detail ml-[10px]">
                              <div className="suggest-container-detail-hd flex items-center">
                                <span>Full</span>
                                <h2>{val?.title}</h2>
                              </div>
                              <div className="suggest-container-rate flex items-center">
                                <span>Đánh giá: 5</span>
                                <i>
                                  <StarIcon color="#FDAAAA" />
                                </i>
                              </div>
                              <div className="suggest-container-detail-auth inline-flex items-center">
                                <i>
                                  <OutIcon color="#FDAAAA" />
                                </i>
                                <p>{val?.author || "Truyen247"}</p>
                              </div>
                              <div className="suggest-container-total">
                                <p>
                                  Tất cả: {val?.chapters?.length || 0} Chương
                                </p>
                              </div>

                              <div className="suggest-container-detail-at">
                                <p>
                                  {capitalize(moment(val?.createdAt).fromNow())}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                </div>
                <div className="suggest-pagination flex justify-center mt-[30px]">
                  <PaginationAntd
                    defaultCurrent={1}
                    defaultPageSize={12}
                    pageSize={12}
                    total={data?.total || 0}
                    onChange={(page, pageSize) =>
                      paginationPage(page, pageSize)
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export default Categories;
