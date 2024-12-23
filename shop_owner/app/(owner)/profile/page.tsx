"use client";
import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import EditProfile from '@/components/EditProfile';
import { getUserData, getAuth, updateUser, updateAuth } from '@/constant/RestaurantAPI';
import { userData } from '@/constant/RestaurantData';
import ImageLoader from '@/components/ImageLoader';
const ProfilePage: React.FC = () => {
    const [userType, setUserType] = useState('owner');
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddresses] = useState("A35, Bạch Đằng, Quận Tân Bình, TP. Hồ Chí Minh");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingField, setEditingField] = useState('');
    const [popupTitle, setPopupTitle] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [userData, setUserData] = useState<userData>()
    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const info = await getUserData();
                const user = await getAuth();
                setUsername(user);
                setUserData(info);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        fetchUserData();
    }, []);

    // Open popup for editing
    const openPopup = (field: string, value: string, title: string) => {
        setEditingField(field);
        setCurrentValue(value);
        setPopupTitle(title);
        setIsPopupOpen(true);
    };



    // Save changes
    const saveField = async (newValue: string) => {
        try {
            let updatedData: { [key: string]: string } | null = null; // Data for updateUser API
            let updateAuthen: { [key: string]: string } | null = null; // Data for updateAuth API

            // Handle user fields
            if (editingField === 'fullName') {
                setFullname(newValue);
                updatedData = { fullName: newValue };
            } else if (editingField === 'email') {
                setEmail(newValue);
                updatedData = { email: newValue };
            } else if (editingField === 'phoneNumber') {
                setPhoneNumber(newValue);
                updatedData = { phoneNumber: newValue };
            } else if (editingField === 'address') {
                setAddresses(newValue);
                updatedData = { address: newValue };
            }

            // Handle authentication fields
            if (editingField === 'username') {
                setUsername(newValue);
                updateAuthen = { username: newValue };
            }

            // Include userType if it exists
            if (userType) {
                if (updatedData) {
                    updatedData.userType = userType;
                }
                if (updateAuthen) {
                    updateAuthen.userType = userType;
                }
            }

            // Perform updates
            if (updateAuthen) {
                await updateAuth(updateAuthen); // Call the updateAuth API
            }
            if (updatedData) {
                await updateUser(updatedData); // Call the updateUser API
            }

            console.log("User data updated successfully");
        } catch (error) {
            console.error("Failed to update user data", error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex items-start w-full text-xl font-bold mb-5">
                <h3>Thông tin cá nhân</h3>
            </div>
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
                    <h5 className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Họ và tên</h3>
                        <h3>{userData?.fullName}</h3>
                    </div>
                    <h5 onClick={() => openPopup('fullName', fullName, 'Họ và tên')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Email</h3>
                        <h3>{userData?.email}</h3>
                    </div>
                    <h5 onClick={() => openPopup('email', email, 'Email')} className="hover:text-red-600 cursor-pointer">Sửa</h5>
                </div>
                <div className="flex items-start justify-between border-b border-black w-full pb-4 p-6">
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold">Số điện thoại</h3>
                        <h3>{userData?.phoneNumber}</h3>
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
            <div className="flex items-start w-full text-xl font-bold mb-5 mt-14">
                <h3>Tài khoản bảo mật</h3>
            </div>
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
