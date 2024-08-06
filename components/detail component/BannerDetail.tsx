"use client";
import React, { useState } from 'react';
import ImageLoader from '../ImageLoader';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const bannerImg = [
    {
        src: "v1718791452/samples/food/dessert.jpg",
        alt: "Image 1",
    },
    {
        src: "v1718791482/samples/coffee.jpg",
        alt: "Image 2",
    },
    {
        src: "v1718791483/samples/dessert-on-a-plate.jpg",
        alt: "Image 3",
    },
    {
        src: "v1718791486/cld-sample-4.jpg",
        alt: "Image 4",
    },
    {
        src: "v1718791476/samples/balloons.jpg",
        alt: "Image 5",
    },
];

const BannerDetail: React.FC = () => {
    const [mainImage, setMainImage] = useState(bannerImg[0]);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 4,
            spacing: 16,
        },
    });

    const handleThumbnailClick = (image: { src: string; alt: string }) => {
        setMainImage(image);
    };

    const handlePrevClick = () => {
        if (instanceRef.current) {
            instanceRef.current.prev();
        }
    };

    const handleNextClick = () => {
        if (instanceRef.current) {
            instanceRef.current.next();
        }
    };

    return (
        <div className="flex flex-col">
            <div className="mb-4 w-full max-w-[600px]">
                <ImageLoader
                    path={mainImage.src}
                    alt={mainImage.alt}
                    height={500}
                    width={700}
                    className="rounded-md"
                    cloudinaryAttributes={{
                        crop: "fill", // Ensure the image fills the container
                        gravity: "auto", // Adjust gravity as needed
                        quality: "auto", // Let Cloudinary determine the optimal quality
                        fetch_format: "auto", // Let Cloudinary determine the optimal format
                    }}
                />
            </div>
            <div className="relative w-full max-w-[600px]">
                <button
                    onClick={handlePrevClick}
                    className="absolute left-0 z-10 bg-custom-green-light text-black p-2"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    &#10094;
                </button>
                <div ref={sliderRef} className="keen-slider w-full">
                    {bannerImg.map((image, index) => (
                        <div className="keen-slider__slide flex items-center justify-center w-1/4">
                            <div
                                key={index}
                                className={`relative ${mainImage.src === image.src ? 'rounded-md border-spacing-0 border-4 border-green-500' : ''}`}
                                onClick={() => handleThumbnailClick(image)}
                            >
                                <ImageLoader
                                    path={image.src}
                                    alt={image.alt}
                                    height={150}
                                    width={150}
                                    className="rounded-md"
                                    cloudinaryAttributes={{
                                        crop: "fill", // Ensure the image fills the container
                                        gravity: "auto", // Adjust gravity as needed
                                        quality: "auto", // Let Cloudinary determine the optimal quality
                                        fetch_format: "auto", // Let Cloudinary determine the optimal format
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleNextClick}
                    className="absolute right-0 z-10 bg-custom-green-light text-black p-2"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default BannerDetail;
