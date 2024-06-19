import React from "react";
import Image from "next/image";
interface Sliderprop {
  src: string;
  alt: string;
}
const Slider: React.FC<Sliderprop> = ({ src = "", alt = "" }) => {
  return (
    <div className="carousel rounded-box">
      <div className="carousel-item">
        <Image src={src} alt={alt} fill={true} className=" object-cover" />
      </div>
    </div>
  );
};

export default Slider;
