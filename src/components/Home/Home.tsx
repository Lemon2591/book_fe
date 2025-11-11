import React, { useState } from "react";
import MetaSeo from "../MetaSeo";
import {
  AiOutlineSearch,
  AiFillStar,
  AiOutlineSignature,
  AiOutlineRight,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as PaginationAntd, message } from "antd";
import moment from "moment";
import "moment/locale/vi";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
moment.locale("vi");
import Image from "next/image";

const OutIcon = AiOutlineSignature as unknown as React.FC<any>;
const SearchIcon = AiOutlineSearch as unknown as React.FC<any>;
const StarIcon = AiFillStar as unknown as React.FC<any>;
const RightIcon = AiOutlineRight as unknown as React.FC<any>;

function Home({ data, dataPage }: any) {
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");
  const [dataPageState, setDataPageState] = useState(dataPage || []);
  const [isLoading, setIsLoading] = useState(false);

  const dataSeo = {
    pageType: "home",
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
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/api/get-top?page=${page}&limit=12`
      );
      setDataPageState(data?.data);
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
          <section>
            <div className="hero" id="home">
              <div className="container container-slide">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={3}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  autoplay={{
                    delay: 1000, // ⏱️ thời gian giữa mỗi slide (ms) — 1000ms = 1s
                    disableOnInteraction: false, // 👈 vẫn tự động chạy sau khi user tương tác
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                      coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5, // 👈 Mobile nhẹ hơn
                        slideShadows: false,
                      },
                    },
                    640: {
                      slidesPerView: 2, // 👈 Tablet nhỏ
                      coverflowEffect: {
                        rotate: 0,
                        stretch: 44.5,
                        depth: 100,
                        modifier: 2.5, // 👈 Mobile nhẹ hơn
                        slideShadows: false,
                      },
                    },
                    1024: {
                      slidesPerView: 3, // 👈 Desktop
                      coverflowEffect: {
                        rotate: 0,
                        stretch: 19.5,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                      },
                    },
                  }}
                  className="swiper_container"
                >
                  {data?.stories?.length > 0 &&
                    data?.stories?.map((val: any, key: number) => {
                      const urlShort = val?.cover_url?.split("/");
                      const urlEnd = urlShort
                        ? urlShort[urlShort?.length - 1]
                        : "";
                      const url = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
                      return (
                        <SwiperSlide
                          key={key}
                          onClick={(e) => navigateURL(e, val?.slug)}
                        >
                          <div className="slide-item relative">
                            <Image
                              src={url}
                              alt={val?.slug}
                              fill
                              className="object-cover"
                            />
                            <div>
                              <h2>{val?.title}</h2>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </section>

          <section className="suggest" id="suggest">
            <div className="container">
              <div className="py-[50px] suggest-content">
                <div className="flex suggest-search">
                  <div className="w-[70%] suggest-left">
                    <h1>Đề xuất truyện hay</h1>
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
                    {dataPageState?.topData?.length > 0 &&
                      dataPageState?.topData?.map((val: any, idx: any) => {
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
                    total={dataPageState?.total || 0}
                    onChange={(page, pageSize) =>
                      paginationPage(page, pageSize)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="trending" id="trending">
            <div className="container">
              <div className="py-[50px] trending-content">
                <div className="flex">
                  <div className="w-[70%] ">
                    <div className="trending-title">
                      <h1>Xu hướng</h1>
                    </div>
                    <div className="">
                      <div className="flex flex-wrap">
                        {data?.topStories?.length > 0 &&
                          data?.topStories?.map((val: any, ix: number) => {
                            const urlShort = val?.cover_url?.split("/");
                            const urlEnd = urlShort
                              ? urlShort[urlShort?.length - 1]
                              : "";
                            const url = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
                            return (
                              <a
                                className="trending-container-item flex"
                                key={ix}
                                onClick={(e) => navigateURL(e, val?.slug)}
                                href={`/page/${val?.slug}`}
                              >
                                <div className="suggest-container-img relative">
                                  <Image
                                    src={url}
                                    alt={val?.slug}
                                    fill
                                    className="object-cover"
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
                                      Tất cả: {val?.chapters?.length || 0}{" "}
                                      Chương
                                    </p>
                                  </div>

                                  <div className="suggest-container-detail-at">
                                    <p>
                                      {capitalize(
                                        moment(val?.createdAt).fromNow()
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%]">
                    <div className="trending-type">
                      <h1>Thể loại</h1>
                    </div>
                    <div className="trending-type-list px-[10px]">
                      <ul>
                        {data?.categories?.length > 0 &&
                          data?.categories?.map((val: any, idx: number) => {
                            return (
                              <li
                                className="flex items-center cursor-pointer"
                                key={idx}
                                onClick={() => router.push(`${val?.slug}`)}
                              >
                                <i className="mr-[5px]">
                                  <RightIcon />
                                </i>
                                <a
                                  href={val?.slug}
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {val?.name}
                                </a>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export default Home;
