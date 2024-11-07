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
        <div className="flex gap-4 border-t border-b p-4">
            {/* Left Column: Store Info */}
            <div className="w-1/2 space-y-2">
                {titles.map((title, index) => (
                    <div key={index} className="flex">
                        <div className="w-1/3 font-semibold bg-yellow-100 p-2 border">{title}</div>
                        <div className="w-2/3 p-2 border">
                            {dataValues[index] || 'No data available'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column: Image */}
            <div className="w-1/2 flex items-center justify-center">
                <a href="https://shorturl.at/pZyab">
                    <ImageLoader
                        path='v1722315790/Capture_fiohdy.png'
                        alt='map'
                        width={500}
                        height={400}
                        cloudinaryAttributes={{
                            crop: "fill",
                            gravity: "auto",
                            quality: "auto",
                            fetch_format: "auto",
                        }}
                    />
                </a>
            </div>
        </div>
    );
};

export default InfoDetailComponent;
