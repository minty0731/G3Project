"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ImageLoader from '@/components/ImageLoader';
import { vegan, frontStoreBanner } from '@/constant/ImageConstant';
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('owner');
    const [error, setError] = useState('');

    const router = useRouter()
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 2000); // Adjust the time (3000ms = 3s) as needed

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password, userType)
        const response = await fetch('http://127.0.0.1:8080/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, userType }),
        });
        if (response.ok) {

            const data = await response.json();
            Cookies.set('token', data.token)
            router.push('/overview'); // Redirect to the homepage after successful login
        } else {
            const errorData = await response.json();
            setError(errorData.error);
        }
    }

    return (
        <div>
            <div className="w-full fixed top-0 left-0 text-black shadow-lg z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
                    {/* Logo or Brand Name */}
                    <div className="flex items-center gap-5">
                        <ImageLoader
                            path={vegan.link}
                            alt={vegan.alt}
                            width={64}
                            height={64}
                        />
                        <h1 className="font-bold text-green-600 text-2xl">Vegan Review</h1>
                    </div>
                    <div>
                        <h3 className="text-red-600">Bạn cần giúp đỡ?</h3>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-full h-screen gap-48">
                <div className="flex flex-col items-end w-1/2">
                    <div className="flex flex-col items-center gap-12">
                        <div>
                            <h1 className="text-3xl text-green-600 font-bold">Quảng bá cửa hàng của bạn</h1>
                            <h3 className="text-lg w-[24rem] mt-5">Quản lý và quảng bá shop của bạn hiệu quả hơn trên Kênh Cửa Hàng với Review Vegan</h3>
                        </div>
                        <ImageLoader
                            path={frontStoreBanner.link}
                            alt={frontStoreBanner.alt}
                            width={250}
                            height={250}
                        />
                    </div>
                </div>
                <div className=" flex flex-col items-start w-1/2">

                    {error && (
                        <div role="alert" className="absolute top-24 w-[26rem] alert alert-error text-white flex items-center mt-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    <div className=" w-[26rem]  border-2 shadow-lg rounded-lg py-12 px-12">
                        <h1 className="w-full text-center text-2xl text-black font-bold mb-8 mt-2">Đăng Nhập</h1>
                        <form onSubmit={handleLoginSubmit} className=" flex flex-col w-full h-full gap-5">
                            <h3 className="text-dark-blue-theme text-md">Tên đăng nhập</h3>
                            <div>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Tên đăng nhập"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className=" border border-[#a0a0a0] rounded-xl w-full py-3 px-3 text-black leading-tight  focus:outline-none focus:ring-1 focus:ring-green-600" />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=" border border-[#a0a0a0] rounded-xl w-full py-3 px-3 text-black leading-tight  focus:outline-none focus:ring-1 focus:ring-green-600" />
                            </div>
                            <button type="submit" className=" bg-custom-green rounded-xl w-full py-3 px-3 hover:bg-green-800 text-white">Đăng nhập</button>
                            <div className="flex justify-between text-dark-blue-theme ">
                                <Link href={"/signup"}><h4 className="hover:underline cursor-pointer">Tạo tài khoản</h4></Link>
                                <h4 className="hover:underline cursor-pointer">Quên mật khẩu?</h4>
                            </div>
                            <div className="w-full border  border-gray-500"></div>
                            <div className="flex items-center justify-center gap-5">
                                <button
                                    className="btn py-2 border border-gray-500 text-black bg-white"
                                >
                                    <FcGoogle className="text-3xl" />
                                    Đăng nhập bằng Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>

    )
}


export default LoginPage