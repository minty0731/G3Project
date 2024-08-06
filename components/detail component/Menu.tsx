import React from 'react'
import ImageLoader from '../ImageLoader';
import { MenuInfo } from '@/container/MenuConstant';
interface MenuProp {
    menu: MenuInfo

}
const Menu: React.FC<MenuProp> = ({ menu }) => {
    return (
        <div className="flex flex-col items-center justify-center hover: cursor-pointer">
            <div className="relative flex justify-center items-center">
                <ImageLoader
                    path={menu.item_image}
                    alt="item"
                    width={200}
                    height={200}
                    className="rounded-xl transition duration-100 hover:scale-105"
                    cloudinaryAttributes={{
                        crop: "fill", // Ensure the image fills the container
                        gravity: "auto", // Adjust gravity as needed
                        quality: "auto", // Let Cloudinary determine the optimal quality
                        fetch_format: "auto", // Let Cloudinary determine the optimal format
                    }}
                />
            </div>
            <div className="flex flex-col items-center mt-4">
                <h3 className="text-md">{menu.item_name}</h3>
                <h3 className="text-md">{menu.price}.000đ</h3>
            </div>
        </div>
    );
};

export default Menu