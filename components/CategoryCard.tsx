import React from "react";
import Image from "next/image";

interface CardProp {
  name: string;
}
const CategoryCard: React.FC<CardProp> = ({ name }) => {
  return (
    <div className="card w-74 bg-base-100 shadow-xl">
      <figure>
        <Image
          src="/storeIMG/vegan-category.png"
          alt="item image"
          width={397}
          height={251}
          className="object-cover w-full"
        />
      </figure>
      <div className="card-body  items-center text-center">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
