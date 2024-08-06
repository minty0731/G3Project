import React, { useEffect, useState } from 'react';
import ImageLoader from '../ImageLoader';

interface InfoDetail {
    store_name: string;
    certificate: string;
    category: string;
    phone_number: string;
    address: string;
    price_range: string;
    open_hours: string;
    payment_method: string;
    delivery: string;
}

const InfoDetailComponent: React.FC = () => {
    const [data, setData] = useState<InfoDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const titles = [
        'Tên cửa hàng',
        'Chứng nhận thuần chay',
        'Danh mục',
        'Điện thoại',
        'Địa chỉ',
        'Phạm vi giá',
        'Giờ Mở cửa',
        'Phương thức thanh toán',
        'Dịch vụ giao hàng',
    ];

    useEffect(() => {
        fetch('http://localhost:5000/infoDetail')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setData(data.infoDetail[0]);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const dataValues = data ? [
        data.store_name,
        data.certificate,
        data.category,
        data.phone_number,
        data.address,
        data.price_range,
        data.open_hours,
        data.payment_method,
        data.delivery,
    ] : [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-[40%_60%] grid-rows-[repeat(3,_min-content)_auto_repeat(5,_min-content)] border-t border-b">
            {titles.map((title, index) => (
                <React.Fragment key={index}>
                    <div className="border p-2 bg-yellow-100">{title}</div>
                    <div className="border p-2">
                        {index === 4 ? (
                            <div>
                                <a href="https://shorturl.at/pZyab">
                                    <ImageLoader path='v1722315790/Capture_fiohdy.png' alt='map' width={1000} height={400} cloudinaryAttributes={{
                                        crop: "fill",
                                        gravity: "auto",
                                        quality: "auto",
                                        fetch_format: "auto",
                                    }} />
                                </a>
                            </div>
                        ) : (
                            dataValues[index] || 'No data available'
                        )}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default InfoDetailComponent;
