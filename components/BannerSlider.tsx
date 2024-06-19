"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const bannerImg = [
  {
    src: "/banner-slider/banner-3.png",
    alt: "banner 3",
  },
  {
    src: "/banner-slider/banner.png",
    alt: "banner 1",
  },
  {
    src: "/banner-slider/banner-2.png",
    alt: "banner 2",
  },
];

const BannerSlider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next image
      setCurrentImage((prevIndex) =>
        prevIndex === bannerImg.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" overflow-hidden">
      {bannerImg.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill={true}
            className="object-cover"
            quality={100}
          />
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
