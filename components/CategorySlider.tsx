"use client";
import React, { useEffect, useState } from "react";
import ImageLoader from "./ImageLoader";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const CategorySlider: React.FC = () => {
    const [category, setCategory] = useState<any[]>([]);
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
        fetch('http://localhost:5000/category')
            .then(res => res.json())
            .then(data => {
                setCategory(data.categories)
                setIsLoading(false);
                if (instanceRef.current) {
                    instanceRef.current.update();
                }
            }) // Ensure you access the correct data property
            .catch(error => console.error('Error fetching category:', error));
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
        <div ref={sliderRef} className="keen-slider">
            {category.map((item, index) => (
                <div key={index} className="keen-slider__slide">
                    <div className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
                        <div>
                            <ImageLoader
                                path={item.category_img}
                                alt={item.category_name}
                                width={300}
                                height={180}
                                className="w-full h-full object-cover"
                                cloudinaryAttributes={{
                                    crop: "fill", // Ensure the image fills the container
                                    gravity: "auto", // Adjust gravity as needed
                                    quality: "auto", // Let Cloudinary determine the optimal quality
                                    fetch_format: "auto", // Let Cloudinary determine the optimal format
                                }}
                            />
                            <div className="absolute top-5 left-0 bg-white bg-opacity-65 w-full p-2 text-black">
                                <h1 className="text-xl font-bold">{item.category_name}</h1>
                                <h1 className="text-sm text-gray-600 w-[74%] mt-2">{item.category_desc}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategorySlider;
