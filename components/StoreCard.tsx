import React from "react";
import Image from "next/image";
import Link from "next/link";
const StoreCard: React.FC = () => {
  return (
    <Link href="/">
      <div className="card w-74 bg-base-100 shadow-xl">
        <figure>
          <Image
            src="/storeIMG/vegan-combo.png"
            alt="item image"
            width={384}
            height={256}
            className="object-cover w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Cơm Chay Swinburne</h2>
          <p>2a/38 Bạch Đằng, P.2, Q.Tân Bình, Hồ Chí Minh, 70000, Vietnam</p>
          <div className=" flex items-center gap-4">
            <div className="tooltip" data-tip="Chứng nhận thuần chay">
              <Image
                src="/image/vegan-cef.png"
                alt="certificate image"
                width={32}
                height={32}
                className="hover-image"
              />
            </div>
            <div
              className="flex items-center gap-2 tooltip"
              data-tip="Điểm đánh giá của người dùng"
            >
              <Image
                src="/image/star.png"
                alt="certificate image"
                width={32}
                height={32}
                className="hover-image"
              />
              <p className=" text-lg">4.3</p>
            </div>
            <div
              className="flex items-center gap-2 tooltip"
              data-tip="Giá tối thiểu"
            >
              <Image
                src="/image/price-tag.png"
                alt="certificate image"
                width={32}
                height={32}
                className="hover-image"
              />
              <p className=" text-lg">30K</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
