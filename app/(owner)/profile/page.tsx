// ProfilePage.tsx
"use client";
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import EditProfile from '@/components/EditProfile';

const ProfilePage: React.FC = () => {
    const [fullName, setFullname] = useState("Phạm Quốc Việt");
    const [email, setEmail] = useState("phamquocviet1211999@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("0906959619");
    const [username, setUsername] = useState("cuongpeter123");
    const [address, setAddresses] = useState("A35 đường Bạch Đằng, phường 2, quận Tân Bình, thành phố Hồ Chí Minh, Việt Nam");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingField, setEditingField] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const openPopup = (field: string, value: string, title: string) => {
        setEditingField(field);
        setCurrentValue(value);
        setPopupTitle(title);
        setIsPopupOpen(true);
    };

    const saveField = (newValue: string) => {
        if (editingField === 'fullName') setFullname(newValue);
        else if (editingField === 'email') setEmail(newValue);
        else if (editingField === 'phoneNumber') setPhoneNumber(newValue);
        else if (editingField === 'username') setUsername(newValue);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-start w-full text-xl font-bold mb-5"><h3>Thông tin cá nhân</h3></div>
            <div className="flex flex-col h-full w-full border rounded-md border-black bg-white">
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="font-bold">Ảnh đại diện</h3>
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
                            </div>
                        </div>
                    </div>
                    <h5 onClick={() => openPopup('avatar', '', 'Ảnh đại diện')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Họ và tên</h3>
                        <h3>{fullName}</h3>
                    </div>
                    <h5 onClick={() => openPopup('fullName', fullName, 'Họ và tên')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Email</h3>
                        <h3>{email}</h3>
                    </div>
                    <h5 onClick={() => openPopup('email', email, 'Email')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Số điện thoại</h3>
                        <h3>{phoneNumber}</h3>
                    </div>
                    <h5 onClick={() => openPopup('phoneNumber', phoneNumber, 'Số điện thoại')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Địa chỉ</h3>
                        <h3>{address}</h3>
                    </div>
                    <h5 onClick={() => openPopup('address', address, 'Địa chỉ')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
            </div>
            <div className="flex items-start w-full text-xl font-bold mb-5 mt-14"><h3>Tài khoản bảo mật</h3></div>
            <div className="flex flex-col h-full w-full border rounded-md border-black bg-white">
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Tên Tài Khoản</h3>
                        <h3>{username}</h3>
                    </div>
                    <h5 onClick={() => openPopup('username', username, 'Tên Tài Khoản')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Mật Khẩu</h3>
                        <h3>••••••••••••••••••••</h3>
                    </div>
                    <h5 onClick={() => openPopup('password', '', 'Mật Khẩu')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Liên kết với Google</h3>
                    </div>
                    <button className="btn py-2 border-2 border-gray-400 text-black bg-white flex items-center gap-2">
                        <FcGoogle className="text-3xl" /> Đăng nhập bằng Google
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <EditProfile
                    title={`Sửa ${popupTitle}`}
                    currentValue={currentValue}
                    onSave={saveField}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
};

export default ProfilePage;
