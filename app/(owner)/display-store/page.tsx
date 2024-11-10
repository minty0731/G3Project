"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getRestaurantID } from '@/constant/RestaurantID';
import { restaurantData } from '@/constant/RestaurantData';

const DisplayStorePage = () => {
    const [restaurantData, setRestaurantData] = useState<restaurantData | null>(null)

    useEffect(() => {
        const fetchRestaurantData = async () => {
            const token = Cookies.get('token');
            if (token) {
                const resID = await getRestaurantID(token);
                const response = await fetch(`http://127.0.0.1:8080/api/restaurant/${resID}/info`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setRestaurantData(data.restaurant_info);  // Adjust to access restaurant_info directly
                    console.log(data.restaurant_info);
                } else {
                    console.error('Error fetching data');
                }
            }
        };

        fetchRestaurantData();
    }, []);

    if (!restaurantData) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <div>
                <h1 className="text-2xl font-semibold">{restaurantData.name}</h1>
                <p className="text-gray-600">{restaurantData.category_description}</p>
            </div>
            <div>
                <h2 className="font-semibold">Contact Details</h2>
                <p>Phone: {restaurantData.phone_number}</p>
                <p>Country: {restaurantData.food_country_type}</p>
            </div>
            <div>
                <div>
                    <h2 className="font-semibold">Operating Hours</h2>
                    <p>{restaurantData.open_hours} ({restaurantData.open_days})</p>
                </div>

                <div>
                    <h2 className="font-semibold">Pricing</h2>
                    <p>Lowest Price: {restaurantData.lowest_price} VND</p>
                    <p>Highest Price: {restaurantData.highest_price} VND</p>
                </div>

                <div>
                    <h2 className="font-semibold">Delivery Options</h2>
                    {restaurantData.delivery_collection.map((delivery, index) => (
                        <p key={index}>{delivery.company}: <a href={delivery.link} target="_blank" className="text-blue-500 underline">{delivery.link}</a></p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayStorePage;
