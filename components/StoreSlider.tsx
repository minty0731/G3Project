"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Store from "./Store";
import { GrNext } from "react-icons/gr";
import { StoreInfo } from "@/container/StoreConstant";

const StoreSlider: React.FC = () => {
    const [products, setProducts] = useState<StoreInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "snap",
        slides: {
            perView: 4,
            spacing: 15,
        },
    });
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
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
                        <Link key={items.id} href={`/store/${items.id}`}>
                            <Store store={items} />
                        </Link>
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

export default StoreSlider;
