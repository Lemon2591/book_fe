/* eslint-disable jsx-quotes */
import Router, { useRouter } from "next/router";
import MetaSeo from "@/components/MetaSeo";
import Link from "next/link";
import Game from "@/components/Game";

const Custom404 = () => {
  return (
    <>
      <MetaSeo />
      <div className="page-404">
        <div className="page_error flex items-center justify-center mx-10">
          <div className="" data-bs-spy="scroll" data-bs-target="#navScroll">
            <div className="h-100 container-fluid error-container">
              <div className="h-100 row d-flex align-items-stretch">
                <div className="col-12 d-flex align-items-start flex-column px-vw-5">
                  <header className="mb-auto py-vh-2 col-12">
                    <a className="navbar-brand pe-4 fs-4" href="/">
                      {/* <span className="ms-1 fw-bolder">Stride</span> */}
                    </a>
                  </header>
                  <main className="mb-auto col-12">
                    <h1 className="text-[38px] text-[#FDAAAA]">404</h1>

                    <h1 className="display-1 text-[32px] font-[700] text-[#FDAAAA]">
                      Ồ nâu.... Có lỗi xảy ra mất rồi !
                    </h1>
                    <p className="lead text-[18px] font-[300] text-[#FDAAAA]">
                      Bạn đang truy cập vào trang không tồn tại hoặc đã bị di
                      chuyển.
                      <br />
                      Đừng buồn, mình có thử thách bên dưới cho bạn nhé !
                    </p>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="game-container" id="game-container">
          <Game />
        </div>

        <div className="flex justify-center">
          <div className="px-5 py-5 link-to-home">
            <Link
              href="/"
              className="link-fancy flex items-center text-[18px] font-[300]"
            >
              {/* <a> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              &ensp;Trở về trang chủ
              {/* </a> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
