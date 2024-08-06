"use client"
import React, { useEffect, useState } from 'react';
import { StoreInfo } from '@/container/StoreConstant';
import { usePathname } from 'next/navigation';
import BannerDetail from '@/components/detail component/BannerDetail';
import { ImageLoader } from '@/components';
import MenuSlider from '@/components/detail component/MenuSlider';
import Rating from '@/components/detail component/Rating';
import InfoDetail from '@/components/detail component/InfoDetail';
import CommentHolder from '@/components/detail component/CommentHolder';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { SlTag } from "react-icons/sl";
import { IoIosStar } from "react-icons/io";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";

interface StoreDetailProb {
    storeDetail: StoreInfo; // Initial store detail, may be empty or default data
}

const StoreDetailPage: React.FC<StoreDetailProb> = ({ storeDetail }) => {
    const pathname = usePathname();
    const lastSegment = pathname.split('/').pop();

    const [storeData, setStoreData] = useState<StoreInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const ratingsCount = [60, 20, 15, 3, 2]; // The counts should reflect the total percentage as given
    const totalRatings = ratingsCount.reduce((a, b) => a + b, 0); // Sum of all ratings counts
    useEffect(() => {
        if (lastSegment) {
            fetch(`http://localhost:5000/product`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Assuming the response contains an array of products and we want the first match
                    const product = data.products.find((item: StoreInfo) => item.id.toString() === lastSegment);
                    setStoreData(product || null);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    }, [lastSegment]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col px-40 py-12 w-full">
            {storeData && (
                <>
                    {/*Banner and Content info*/}
                    <div className="flex w-full justify-between gap-20">
                        <div className="w-1/2">
                            <BannerDetail />
                        </div>
                        {/*Detail info section*/}
                        <div className=" w-1/2 flex flex-col gap-5">
                            <div className="flex items-start justify-between ">
                                {/*Title name of store*/}
                                <h1 className="text-2xl font-bold ">{storeData.store_name}</h1>
                                {/*Report and save button*/}
                                <div className="flex gap-3 hover:cursor-pointer">
                                    <span className="tooltip" data-tip="Báo cáo vi phạm">
                                        <AiOutlineExclamationCircle className="text-3xl text-red-600 " />
                                    </span>
                                    <span className="tooltip" data-tip="Lưu cửa hàng yêu thích">
                                        <CiBookmark className="text-3xl" />
                                    </span>
                                </div>
                            </div>
                            {/*Certificate section*/}
                            <div className="flex items-center justify-start gap-4">
                                <ImageLoader
                                    path="v1720186874/Vegan_Certification_h8z6cd.png"
                                    alt="certificate"
                                    width={24}
                                    height={24}
                                />
                                <h3>Chứng nhận thuần chay</h3>
                            </div>
                            {/*Address section*/}
                            <div className="flex items-center justify-start gap-4">
                                <LuMapPin className="text-2xl" />
                                <h3>2a/38 Bạch Đằng, P.2, Q.Tân Bình, Hồ Chí Minh, 70000, Vietnam</h3>
                            </div>
                            <div className="flex items-center justify-start gap-4">
                                <IoTimeOutline className="text-2xl" />
                                <h3>6:00 - 21:00</h3>
                            </div>
                            {/*Price section*/}
                            <div className="flex items-center justify-start gap-4">
                                <SlTag className="text-xl" />
                                <h3>{storeData.lower_price}K ~ {storeData.high_price}K</h3>
                            </div>
                            {/*Rating section*/}
                            <div className="flex items-center justify-start gap-4">
                                <IoIosStar className="text-2xl text-yellow-400" />
                                <div className="flex gap-2">
                                    <h3>4.5/5.0</h3>
                                    <span className="tooltip" data-tip="Số người đánh giá">
                                        <h3 className="underline text-blue-600 hover:cursor-pointer">({totalRatings})</h3>
                                    </span>
                                </div>
                            </div>
                            {/*Phone section*/}
                            <div className="flex items-center justify-start gap-4">
                                <IoPhonePortraitOutline className="text-2xl" />
                                <h3>0909.959.619</h3>
                            </div>
                            {/*Tag section*/}
                            <div className="flex items-center justify-start gap-4">
                                < GoInfo className="text-2xl" />
                                <h3>Tại chỗ, Mang đi, Buffet, món Thái</h3>

                            </div>
                            {/*Delivery section*/}
                            <div className="flex items-center justify-start gap-4">
                                <TbTruckDelivery className="text-2xl" />
                                <button className="btn btn-success bg-custom-green text-white font-normal btn-sm">GrabFood</button>
                                <button className="btn btn-success bg-custom-green text-white font-normal btn-sm">Shopee</button>
                                <button className="btn btn-success bg-custom-green text-white font-normal btn-sm">Foody</button>
                            </div>
                        </div>
                        {/*Detail info section*/}
                    </div>
                    {/*Banner and Content info*/}
                    {/*Description section*/}
                    <div className="flex flex-col w-full mt-12 gap-5">
                        <h1 className="text-3xl font-bold">Giới Thiệu Về {storeData.store_name}</h1>
                        <p>Quán cơm chay Swinburne là một địa điểm ẩm thực độc đáo tại khuôn viên trường đại học Swinburne, nơi chuyên phục vụ các món ăn chay ngon miệng và bổ dưỡng. Với thực đơn phong phú, quán cơm chay Swinburne mang đến cho thực khách những trải nghiệm ẩm thực đa dạng, từ các món ăn truyền thống Việt Nam đến các món ăn quốc tế được chế biến từ nguyên liệu hoàn toàn tự nhiên. Không gian quán được thiết kế ấm cúng và thoải mái, tạo điều kiện lý tưởng cho sinh viên, giảng viên và khách tham quan thưởng thức bữa ăn chay trong không khí thư giãn và thân thiện.</p>
                        <div className="h-[2px] bg-gray-500 w-full"></div>
                    </div>
                    {/*Description section*/}
                    {/*Menu slider section*/}
                    <div className="flex flex-col w-full mt-12 gap-5">
                        <h1 className="text-3xl font-bold mb-5">Thực đơn</h1>
                        <div>
                            <MenuSlider />
                        </div>
                        <div className="flex items-center justify-center w-full"><button className="btn btn-wide bg-custom-grey text-white hover:bg-gray-700 mt-10">Xem thêm</button></div>
                    </div>
                    {/*Rating  section*/}
                    <div className="flex flex-col w-full mt-12 gap-2">
                        <h1 className="text-3xl font-bold mb-5">Đánh giá</h1>
                        <div className="">
                            <Rating rating={4.5} totalRatings={totalRatings} ratingsCount={ratingsCount} />
                        </div>
                    </div>
                    {/*Rating section*/}
                    <div className="flex flex-col w-full mt-12 gap-2">
                        <div className="">
                            <CommentHolder />
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="btn btn-wide bg-custom-grey text-white hover:bg-gray-700 mt-10">Xem thêm</button>
                        </div>
                    </div>
                    {/*Info  section*/}
                    <div className="flex flex-col w-full mt-12 gap-2">
                        <h1 className="text-3xl font-bold mb-5">Thông tin</h1>
                        <InfoDetail />
                    </div>
                    {/*Info  section*/}
                </>
            )}
        </div>
    );
};

export default StoreDetailPage;
