"use client";
import React from "react";
import Image from "next/image";
import { StoreCard, CategoryCard } from "@/components";
function page() {
  return (
    <div>
      <header className="relative flex items-center justify-center w-full h-[26rem]">
        <Image
          src="/image/banner.png"
          alt="Logo"
          fill={true}
          quality={75}
          className=" object-cover"
        />
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30 "></div>
        <div className="absolute flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-white text-2xl font-bold text-center w-[32rem]">
            Website Số 1 Việt Nam Về Review Các Quán Ăn, Cửa Hàng Chuyên Về Đồ
            Chay
          </h1>
          <div className="mt-6">
            <button className="btn btn-wide bg-white rounded-none font-bold">
              Khám Phá Ngay!
            </button>
          </div>
        </div>
      </header>
      <main className="flex flex-col h-full max-w-screen-desktop mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mt-10 space-x-32">
          <div className="avatar flex flex-col items-center text-center">
            <div className="w-48 rounded-full overflow-hidden">
              <Image
                src="/image/search-banner.jpg"
                alt="item image"
                width={397}
                height={251}
                className="object-cover w-full h-full"
              />
            </div>
            <h6 className="mt-2 font-medium text-2xl  text-green-600">
              Tìm Kiếm
            </h6>
            <p className="mt-1  w-[15rem] text-lg">
              Đa dạng lựa chọn trong vài nút bấm
            </p>
          </div>
          <div className="avatar flex flex-col items-center text-center">
            <div className="w-48 rounded-full overflow-hidden">
              <Image
                src="/image/review-banner.jpg"
                alt="item image"
                width={397}
                height={251}
                className="object-cover w-full h-full"
              />
            </div>
            <h6 className="mt-2 font-medium text-2xl  text-green-600">
              Review
            </h6>
            <p className="mt-1 w-[15rem] text-lg">
              Tham khảo, và trực tiếp đánh giá cửa hàng
            </p>
          </div>
          <div className="avatar flex flex-col items-center text-center">
            <div className="w-48 rounded-full overflow-hidden">
              <Image
                src="/image/market-banner.jpg"
                alt="item image"
                width={397}
                height={251}
                className="object-cover w-full h-full"
              />
            </div>
            <h6 className="mt-2 font-bold text-2xl text-green-600">Quảng Bá</h6>
            <p className="mt-1 w-[15rem] text-lg">
              Quảng bá cửa hàng của bạn đến với mọi người
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className=" text-3xl font-bold my-10">
            Shop được đánh giá tốt gần bạn
          </h1>
          <div className="grid grid-cols-4 gap-4">
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
            <StoreCard></StoreCard>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <button className="btn btn-outline btn-success rounded-none font-bold w-full">
              Xem Thêm
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold my-10">Danh Mục</h1>
          <div className="grid grid-cols-4 gap-4">
            <CategoryCard name="Nhà hàng" />
            <CategoryCard name="Quán ăn" />
            <CategoryCard name="Siêu thị" />
            <CategoryCard name="Đồ chay" />
            <CategoryCard name="Thực phẩm chức năng" />
            <CategoryCard name="Rau xanh" />
            <CategoryCard name="Trái cây" />
            <CategoryCard name="Ẩm thực chay thế giới" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
