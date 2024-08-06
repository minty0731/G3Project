import React from 'react';
import Comment from './Comment';

const CommentHolder: React.FC = () => {
    const comments = [
        {
            username: "cuongpeter1234",
            avatar: "CP",
            timestamp: "01/08/2024 - 12:30 PM",
            like: 20,
            comment: "Mình đã ăn ở Quán Bún Chay và thực sự ấn tượng với chất lượng món ăn cũng như dịch vụ. Bún rất ngon, nêm nếm vừa miệng, topping phong phú và tươi ngon. Không gian quán sạch sẽ, thoáng mát, nhân viên nhiệt tình và thân thiện. Đây là một địa điểm không thể bỏ qua cho những ai yêu thích ẩm thực chay. Từ lúc bước vào quán, mình đã cảm nhận được không khí ấm cúng và dễ chịu. Bàn ghế được sắp xếp gọn gàng, không gian thoáng đãng với ánh sáng tự nhiên. Nhân viên phục vụ rất nhanh nhẹn và chu đáo, luôn nở nụ cười và sẵn sàng hỗ trợ khách hàng. Mình đã thử nhiều món trong menu và tất cả đều tuyệt vời. Bún bò chay thơm ngon với nước dùng đậm đà, nấm và rau củ tươi ngon. Bún riêu chay lại có vị chua nhẹ, thơm mùi riêu và rất nhiều topping. Không thể không nhắc đến bún chả chay, với các loại đậu hũ và nấm nướng vừa tới, ăn kèm với bún và nước chấm tuyệt hảo. Giá cả ở đây cũng rất hợp lý so với chất lượng món ăn và dịch vụ. Mình thật sự hài lòng và cảm thấy xứng đáng với số tiền bỏ ra. Quán Bún Chay đã trở thành một trong những quán yêu thích của mình và mình sẽ giới thiệu cho bạn bè và gia đình đến thưởng thức. Chắc chắn mình sẽ quay lại đây nhiều lần nữa để thưởng thức thêm nhiều món ngon khác. Cảm ơn Quán Bún Chay đã mang đến cho mình những trải nghiệm ẩm thực tuyệt vời!"
        },
        {
            username: "longduy009",
            avatar: "LD",
            timestamp: "01/08/2024 - 13:30 PM",
            like: 5,
            comment: "Nhận xét của bạn rất hữu ích. Mình sẽ ghé thử quán này."
        }
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full mb-10">
                <Comment
                    username={comments[0].username}
                    avatar={comments[0].avatar}
                    timestamp={comments[0].timestamp}
                    like={comments[0].like}
                    comment={comments[0].comment}
                />
            </div>
            <div className='w-full flex flex-col pl-12'>
                <Comment
                    username={comments[1].username}
                    avatar={comments[1].avatar}
                    timestamp={comments[1].timestamp}
                    like={comments[1].like}
                    comment={comments[1].comment}
                />
            </div>
        </div>
    );
};

export default CommentHolder;
