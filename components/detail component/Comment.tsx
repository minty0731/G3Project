import React from 'react';
import { IoIosStar } from "react-icons/io";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";

interface CommentProp {
    username: string;
    avatar: string;
    timestamp: string;
    like: number;
    comment: string;
}
const Comment: React.FC<CommentProp> = ({ username, avatar, timestamp, like, comment }) => {
    return (
        <div className="flex flex-col items-center w-full">
            {/*User section*/}
            <div className="flex items-start justify-between w-full">
                <div className="flex items-start gap-4">
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-14 rounded-full">
                            <span className="text-lg">{avatar}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2"> {/* Margin left to create space */}
                        <h3 className="text-lg">{username}</h3>
                        <h4 className="text-sm text-gray-500">{timestamp}</h4>
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, index) => (
                                <IoIosStar key={index} className="text-md text-yellow-400" />
                            ))}
                        </div>
                    </div>
                </div>
                <IoEllipsisHorizontalCircle className="text-4xl hover:cursor-pointer" />
            </div>
            {/*User section*/}
            <div className="flex items-start mt-5 px-16 w-full">
                <p> {comment}</p>
            </div>
            <div className="flex items-center mt-5 w-full px-16  gap-3">
                <div className="flex items-center gap-1">
                    <CiHeart className="text-3xl " />
                    <h3>{like}</h3>
                </div>
                <TfiCommentAlt className="text-2xl " />

            </div>
        </div>
    );
}

export default Comment;
