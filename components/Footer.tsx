import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-600 w-full mt-12">
      <div className="flex items-center justify-between h-full max-w-screen-desktop mx-auto px-4 p-10">
        <nav className="flex flex-col mr-10 text-md text-white space-y-5">
          <h6 className="font-medium text-xl">Thông tin</h6>
          <div className="flex items-center gap-4 ">
            <FaRegBuilding size={18} />
            <p>Công ty cổ phần/TNHH [Vegan]</p>
          </div>
          <div className="flex items-center gap-4">
            <IoLocationSharp size={24} />
            <p>A35 Bạch Đằng, phường 2, quận Tân Bình, Hồ Chí Minh</p>
          </div>
          <div className="flex items-center gap-4">
            <MdOutlineEmail size={20} />
            <p>vegan@green.com</p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone size={18} />
            <p>911.911.911</p>
          </div>
        </nav>
        <nav className="flex flex-col mr-10 text-md text-white space-y-5">
          <h6 className="font-medium text-xl">Danh mục</h6>
          <div className="flex flex-col items-start gap-3 ">
            <a href="/" className="link-hover">
              Về chúng tôi
            </a>
            <a href="/" className="link-hover">
              Mở shop
            </a>
            <a href="/" className="link-hover ">
              Cách review cửa hàng
            </a>
            <a href="/" className="link-hover ">
              Chính sách
            </a>
            <a href="/" className="link-hover ">
              Trung tâm hỗ trợ
            </a>
          </div>
        </nav>
        <nav className="flex flex-col text-white">
          <h6 className="font-medium text-xl">
            Tải ứng dụng ngay trên điện thoại
          </h6>
          <div className="flex items-center justify-center mt-5">
            <Image
              src="/image/download-logo.png"
              alt="certificate image"
              width={220}
              height={318}
              className="hover-image"
            />
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
