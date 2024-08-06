import React, { useState, useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Filter {
    name: string;
    checked: boolean; // Track checked status
}

interface Category {
    name: string;
    filters: Filter[];
}

interface SidebarProp {
    isOpen: boolean;
    toggleSidebar: () => void;
    categories: Category[];
}

const Sidebar: React.FC<SidebarProp> = ({ isOpen, toggleSidebar, categories = [] }) => {
    const [updatedCategories, setUpdatedCategories] = useState<Category[]>(categories);

    useEffect(() => {
        setUpdatedCategories(categories);
    }, [categories]);

    // Handle filter change
    const handleFilterChange = (categoryIndex: number, filterIndex: number) => {
        const newCategories = [...updatedCategories];
        newCategories[categoryIndex].filters[filterIndex].checked = !newCategories[categoryIndex].filters[filterIndex].checked;
        setUpdatedCategories(newCategories);
    };

    // Reset filters and close sidebar
    const resetFiltersAndClose = () => {
        const newCategories = updatedCategories.map(category => ({
            ...category,
            filters: category.filters.map(filter => ({
                ...filter,
                checked: false
            }))
        }));
        setUpdatedCategories(newCategories);
        toggleSidebar();
    };

    // Alert checked filters and then reset filters and close sidebar
    const handleData = () => {
        const checkedFilters = updatedCategories.flatMap((category) =>
            category.filters
                .filter(filter => filter.checked)
                .map(filter => `${filter.name}`)
        ).join('\n');

        alert(checkedFilters || "No filters selected.");
        resetFiltersAndClose();
    };

    return (
        <div
            className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-md transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-[60]`}
        >
            <div className="fixed top-0 w-full bg-[#2B2F4C] p-4 text-white flex items-center justify-between h-20">
                <h3 className="text-lg">Bộ lọc</h3>
                <IoMdCloseCircleOutline onClick={toggleSidebar} className="text-2xl hover:cursor-pointer" />
            </div>
            <div className="flex flex-col mt-20 p-4 overflow-y-auto h-[calc(100%-5rem)]">
                {updatedCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="flex flex-col w-full mt-2 py-3 px-4 gap-2">
                        <h1 className="bg-custom-green text-white p-3 rounded-md">{category.name}</h1>
                        {category.filters.map((filter, filterIndex) => (
                            <label key={filterIndex} className="flex items-center justify-start gap-4 cursor-pointer p-2 rounded-md">
                                <input
                                    type="checkbox"
                                    checked={filter.checked}
                                    onChange={() => handleFilterChange(categoryIndex, filterIndex)}
                                    className="checkbox"
                                />
                                <span className="text-md">{filter.name}</span>
                            </label>
                        ))}
                    </div>
                ))}
                <div className="flex items-center justify-center mt-5">
                    <button className="btn btn-wide bg-[#2B2F4C] text-white hover:bg-gray-700 mt-10" onClick={handleData}>Lọc cửa hàng</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
