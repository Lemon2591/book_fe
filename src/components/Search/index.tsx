import React, { FC, useEffect, useState } from "react";
import MetaSeo from "../MetaSeo";
import { useRouter } from "next/router";
import {
  AiOutlineSearch,
  AiFillStar,
  AiOutlineSignature,
} from "react-icons/ai";
import { Pagination as PaginationAntd } from "antd";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import Image from "next/image";

const SearchIcon = AiOutlineSearch as unknown as React.FC<any>;
const StarIcon = AiFillStar as unknown as React.FC<any>;
const SigIcon = AiOutlineSignature as unknown as React.FC<any>;

const Search: FC<any> = ({ data }) => {
  const dataSeo = {
    pageType: "home",
    dataPage: data,
  };
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState(router.query?.key || "");
  const [dataCurrent, setDataCurrent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // số item mỗi trang

  // Tính phần tử đang hiển thị
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleSearch = (e?: any, isKey?: string) => {
    // const value = stringToSlug(valueSearch);
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

  useEffect(() => {
    const dataRes = data?.slice(startIndex, endIndex);
    setDataCurrent(dataRes);
  }, [currentPage, data]);

  const convertUrl = (url: string) => {
    const urlShort = url?.split("/");
    const urlEnd = urlShort ? urlShort[urlShort?.length - 1] : "";
    const urlStr = `${process.env.NEXT_PUBLIC_API_SERVER_NEWS}/img/stories/${urlEnd}`;
    return urlStr;
  };

  const navigateURL = (url: string) => {
    router.push(`/page/${url}`);
  };

  return (
    <>
      <MetaSeo {...dataSeo} />
      <div>
        <div className="search-page container mb-[30px]">
          <div className="pt-[120px] pb-[30px] suggest-right search-page-input">
            <div className="flex items-center search-page-control">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                onKeyDown={(e) => handleSearch(e, "key")}
                onChange={(e) => setValueSearch(e.target.value)}
                value={valueSearch}
              />
              <i>
                <SearchIcon />
              </i>
            </div>
          </div>

          <div className="search-page-result">
            <div>
              <h1>
                {data?.length} Kết quả liên quan cho "{valueSearch}"
              </h1>
            </div>
          </div>

          <div className="search-page-list mt-[20px]">
            {dataCurrent?.length > 0 ? (
              dataCurrent?.map((val: any) => {
                return (
                  <div
                    className="trending-container-item flex"
                    key={val?.id}
                    onClick={() => navigateURL(val?.slug)}
                  >
                    <div className="suggest-container-img relative">
                      <Image
                        src={convertUrl(val?.cover_url)}
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
                          <SigIcon color="#FDAAAA" />
                        </i>
                        <p>{val?.author}</p>
                      </div>
                      <div className="suggest-container-total">
                        <p>Tất cả: {val?.chapters?.length || 0} Chương</p>
                      </div>

                      <div className="suggest-container-detail-at">
                        <p>{capitalize(moment(data?.createdAt).fromNow())}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="not-found">
                <div>Không có kết quả nào !</div>
              </div>
            )}
          </div>

          <div className="suggest-pagination flex justify-center mt-[30px]">
            <PaginationAntd
              defaultCurrent={1}
              total={data?.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
