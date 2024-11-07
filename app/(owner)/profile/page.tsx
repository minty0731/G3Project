import React from 'react'
import { FcGoogle } from "react-icons/fc";
const ProfilePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-start w-full text-xl font-bold mb-5"><h3>Thông tin cá nhân</h3></div>
            {/*Beginning of user information*/}
            <div className="flex flex-col h-full w-full border rounded-md border-black bg-white">
                <div className="flex items-start justify-between border-b border-black w-full pb-4  p-6">
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="font-bold">Ảnh đại diện</h3>
                        <div>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Họ và tên</h3>
                        <h3>Phạm Quốc Việt</h3>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Email</h3>
                        <h3>phamquocviet1211999@gmail.com</h3>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Số điện thoại</h3>
                        <h3>0906959619</h3>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
                <div className="flex items-start justify-between w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Địa chỉ</h3>
                        <h3>A35 đường Bạch Đằng, phường 2, quận Tân Bình, thành phố Hồ Chí Minh, VIệt Nam</h3>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
            </div>
            {/*End of user information*/}
            <div className="flex items-start w-full text-xl font-bold mb-5 mt-14"><h3>Tài khoản bảo mật</h3></div>
            {/*Beginning of user account*/}
            <div className="flex flex-col h-full w-full border rounded-md border-black bg-white ">
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Tên Tài Khoản</h3>
                        <h3>user123</h3>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Mật Khẩu</h3>
                        <h3>••••••••••••••••••••</h3>
                    </div>
                    <div>
                        <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                    </div>
                </div>
                <div className="flex items-start justify-between w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Liên kêt với Google</h3>
                    </div>
                    <div>
                        <button
                            className="btn py-2 border-2 border-gray-400 text-black bg-white"
                        >
                            <FcGoogle className="text-3xl" />
                            Đăng nhập bằng Google
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ProfilePage