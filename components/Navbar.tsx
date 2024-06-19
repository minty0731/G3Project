"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import FilterDropdown from "./FilterDropdown";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
const Navbar: React.FC = () => {
  //get URL
  const pathname = usePathname();

  //active link when it's clicked or hover
  const linkClasses = (path: string): string =>
    `hover:text-green-500  ${
      pathname === path ? "font-medium text-green-500 custom-underline" : ""
    }`;

  return (
    <header className="flex h-24 items-center justify-center  mx-auto px-24">
      <div className="flex items-center gap-2">
        <Image
          src="/image/vegan.png"
          alt="Logo"
          width={256}
          height={256}
          className="h-14 w-14"
        />
        <h1 className="font-bold text-green-600 text-lg">Vegan Review</h1>
        <FilterDropdown />
        <nav className="mx-auto hidden gap-8 text-md font-normal ml-6 md:flex ">
          <Link href="/" className={linkClasses("/")} prefetch={false}>
            Trang chủ
          </Link>
          <Link href="/" className={linkClasses("#")} prefetch={false}>
            Quán ăn
          </Link>
          <Link href="/" className={linkClasses("#")} prefetch={false}>
            Cửa hàng
          </Link>
          <Link href="/" className={linkClasses("#")} prefetch={false}>
            Siêu thị chay
          </Link>
          <Link href="/" className={linkClasses("#")} prefetch={false}>
            Đồ dùng chay
          </Link>
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-8">
        <IoSearchOutline size={30} />
        <div className=" flex gap-3">
          <button className="btn bg-custom-green text-md text-white hover:bg-green-800">
            Đăng Nhập
          </button>
          <button className="btn btn-outline text-md text-custom-green border border-custom-green hover:bg-green-800 px-6">
            Đăng Ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
