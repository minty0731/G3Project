"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Menu from "./Menu";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GrNext } from "react-icons/gr";
import { MenuInfo } from "@/container/MenuConstant";

const MenuSlider: React.FC = () => {
    const [products, setProducts] = useState<MenuInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "snap",
        slides: {
            perView: 5,
            spacing: 15,
        },
    });
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setProducts(data.menus);
                setIsLoading(false);
                if (instanceRef.current) {
                    instanceRef.current.update();
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []); // Adding an empty dependency array to run the effect only once
    if (isLoading) {
        return (
            <div>
                <button className="btn btn-square">
                    <span className="loading loading-spinner"></span>
                </button>
            </div>)
    }
    return (
        <div className="flex items-center w-full ">
            <button
                className="bg-white p-2 rounded-full shadow-lg border-4 border-black outline-none hover:opacity-60"
                onClick={() => instanceRef.current?.prev()}
            >
                <GrNext className="text-4xl rotate-180" />
            </button>
            <div ref={sliderRef} className="keen-slider flex-1 mx-4">
                {products.map((items, index) => (
                    <div key={index} className="keen-slider__slide">
                        <Menu menu={items} />
                    </div>
                ))}
            </div>
            <button
                className="bg-white p-2 rounded-full shadow-lg border-4 border-black outline-none hover:opacity-60"
                onClick={() => instanceRef.current?.next()}
            >
                <GrNext className="text-4xl" />
            </button>
        </div>
    );
};

export default MenuSlider;