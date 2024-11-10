import React, { useState, useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";

interface SidebarProp {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProp> = ({ isOpen, toggleSidebar }) => {
    const [priceRange, setPriceRange] = useState<{ min: number | string; max: number | string }>({
        min: '',
        max: ''
    });

    const [mealTypes, setMealTypes] = useState<string[]>([]);
    const [delivery, setDelivery] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>(''); // State to hold the selected country

    const mealOptions = [
        { label: 'Tại chỗ', value: 'dineIn' },
        { label: 'Mang đi', value: 'takeAway' },
        { label: 'Buffet', value: 'buffet' }
    ];

    const deliveryOptions = [
        { label: 'ShopeeFood', value: 'shopeeFood' },
        { label: 'GrabFood', value: 'grabFood' },
        { label: 'Foody', value: 'foody' }
    ];

    const countryOptions = [
        "Việt Nam", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "Thái", "Ý", "Pháp", "Mê Xi Cô", "Ấn Độ", "Mỹ",
        "Tây Ban Nha", "Đức", "Nga"
    ];

    useEffect(() => {
        // This effect can be used to perform any necessary logic, such as fetching initial data.
    }, []);

    const handleMealTypeChange = (value: string) => {
        setMealTypes((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleDeliveryChange = (value: string) => {
        setDelivery((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value); // Update selected country
    };

    const handleFilter = () => {
        const data = {
            mealTypes,
            delivery,
            priceRange,
            selectedCountry,
        }
        console.log(data)
    }
    return (
        <div
            className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-md transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-[60]`}
        >
            <div className="fixed top-0 w-full bg-[#2B2F4C] p-4 text-white flex items-center justify-between h-20">
                <h3 className="text-lg">Bộ lọc</h3>
                <IoMdCloseCircleOutline onClick={toggleSidebar} className="text-2xl hover:cursor-pointer" />
            </div>
            <div className="flex flex-col mt-20 p-4 overflow-y-auto h-[calc(100%-5rem)]">
                {/* Price Range Inputs */}
                <div className="flex flex-col w-full mt-2 py-3 px-4 gap-2">
                    <h1 className="bg-custom-green text-white p-3 rounded-md">Giá</h1>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="Giá thấp"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        />
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="Giá cao"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        />
                    </div>
                </div>

                {/* Meal Type Options */}
                <div className="flex flex-col w-full mt-2 py-3 px-4 gap-2">
                    <h1 className="bg-custom-green text-white p-3 rounded-md">Hình Thức Dùng Bữa</h1>
                    {mealOptions.map((option) => (
                        <label key={option.value} className="flex items-center justify-start gap-4 cursor-pointer p-2 rounded-md">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={mealTypes.includes(option.value)}
                                onChange={() => handleMealTypeChange(option.value)}
                            />
                            <span className="text-md">{option.label}</span>
                        </label>
                    ))}
                </div>

                {/* Country Food Options */}
                <div className="flex flex-col w-full mt-2 py-3 px-4 gap-2">
                    <h1 className="bg-custom-green text-white p-3 rounded-md">Quốc gia</h1>
                    <select
                        className="select select-bordered w-full"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    >
                        <option value="">Chọn quốc gia</option>
                        {countryOptions.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Delivery Options */}
                <div className="flex flex-col w-full mt-2 py-3 px-4 gap-2">
                    <h1 className="bg-custom-green text-white p-3 rounded-md">Dịch vụ mang đi</h1>
                    {deliveryOptions.map((option) => (
                        <label key={option.value} className="flex items-center justify-start gap-4 cursor-pointer p-2 rounded-md">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={delivery.includes(option.value)}
                                onChange={() => handleDeliveryChange(option.value)}
                            />
                            <span className="text-md">{option.label}</span>
                        </label>
                    ))}
                </div>

                <div className="flex items-center justify-center mt-5">
                    <button onClick={handleFilter} className="btn btn-wide bg-[#2B2F4C] text-white hover:bg-gray-700 mt-10">Lọc cửa hàng</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
