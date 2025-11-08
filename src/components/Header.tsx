import Link from "next/link";
import React, { FC, useState } from "react";
import {
  AiOutlineFacebook,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

const FaIcon = AiOutlineFacebook as unknown as React.FC<any>;
const MenuIcon = AiOutlineMenu as unknown as React.FC<any>;
const CloseIcon = AiOutlineClose as unknown as React.FC<any>;

import { useRouter } from "next/router";
interface IRoute {
  content: string;
  href: string;
}

const Header: FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  const header: IRoute[] = [
    {
      content: "Xu hướng",
      href: "/",
    },
  ];

  return (
    <>
      <header
        className="header_des md:block fixed bg-[#fff] left-[0] right-[0] hidden bg-pink"
        data-header
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          zIndex: 10,
        }}
      >
        <div className="container ">
          <nav
            className="header_des_container max-w-[1250px] flex justify-between py-[15px] items-center"
            data-navbar
          >
            <div className="flex items-center">
              <a onClick={() => router.push("/")} className="cursor-pointer">
                <img
                  src="/assets/img/static/logo.svg"
                  alt="logo"
                  className="w-[150px]"
                />
              </a>
            </div>
            <ul className="flex justify-center">
              {header?.map((val, idx) => {
                return (
                  <li
                    key={idx}
                    className={`mx-[25px] py-[5px] ${
                      router?.pathname?.split("/")[1] ===
                      val?.href?.replace("/", "")
                        ? "active_nav"
                        : ""
                    } hover_nav`}
                  >
                    <Link
                      href={val?.href}
                      className="font-[600] text-[#fff] text-[16px] "
                    >
                      {val?.content}
                      {/* </a> */}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="flex items-center">
              <li
                className="mx-[5px] cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=61581490630976",
                    "_blank"
                  )
                }
              >
                <i className="text-[20px]">
                  <FaIcon color="#fff" />
                </i>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <header className="md:hidden block bg-pink">
        <nav className="flex justify-between py-[15px] items-center px-[15px]">
          <div className="">
            <a onClick={() => router.push("/")} className="cursor-pointer">
              <img
                src="/assets/img/static/logo.svg"
                alt="logo"
                className="w-[150px]"
              />
            </a>
          </div>
          <div className="cursor-pointer" onClick={() => setToggle(true)}>
            <i className="text-[24px]">
              <MenuIcon color="#fff" />
            </i>
          </div>
        </nav>

        <nav className={`relative `}>
          <div
            className={`fixed z-50 bg-pink top-[0] left-[0] right-[0] bottom-[0] scroll_bar ${
              toggle ? "list_nav_mb" : "list_nav_mb_hidden"
            }`}
          >
            <div
              className="absolute top-[20px] left-[20px] cursor-pointer"
              onClick={() => setToggle(false)}
            >
              <i className="text-[24px]">
                <CloseIcon color="#fff" />
              </i>
            </div>
            <div>
              <ul className="mt-[80px]">
                {header?.map((val, idx) => {
                  return (
                    <li key={idx} className={`mx-[25px] my-[25px] text-center`}>
                      <Link
                        onClick={() => setToggle(false)}
                        href={val?.href}
                        className={`font-[600] text-[#fff] py-[10px] text-[16px] hover_nav ${
                          router?.pathname === val?.href ? "active_nav" : ""
                        }`}
                      >
                        {val?.content}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
