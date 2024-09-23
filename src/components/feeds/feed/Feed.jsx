import { BiDotsHorizontalRounded, BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import Comment from "../../comment/Comment";
import { useState } from "react";
import img from '../../../assets/empty.png'
const Feed = ({ d }) => {
    const [writeCommet, setWriteComment] = useState(false)
    return (
        <div className="bg-white mb-14">
            <div className="flex justify-between">
                <div className="flex items-center mb-4">
                    <img className="w-12 h-12 rounded-full mr-3" src={d?.profile || img} alt="Profile Image" />
                    <div>
                        <h2 className="text-lg font-semibold">{d?.name}</h2>
                        <p className="text-gray-500 text-sm">Published on {new Date(d?.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                    </div>
                </div>
                <BiDotsHorizontalRounded className="text-2xl text-gray-600 cursor-pointer"></BiDotsHorizontalRounded>
            </div>
            {
                d?.image && <img className="object-cover object-top w-full rounded-lg mb-4 " src={d?.image} alt='Mountain' />
            }

            <p className="text-gray-700 mb-4">
                {d?.description}
            </p>
            <div className="flex justify-between items-center">
                <div className="flex">
                    <button className="flex items-center ">
                        <BiSolidLike className="text-xl text-blue-400"></BiSolidLike>
                        <span className="ml-2 text-gray-500">{d?.like?.length} Likes</span>
                    </button>
                    <button onClick={() => setWriteComment(!writeCommet)} className="flex items-center ml-6">
                        <FaComment className="text-xl text-blue-400"></FaComment>
                        <span className="ml-2 text-gray-500">{d?.comment?.length} Comments</span>
                    </button>
                </div>
                <button className="flex items-center ml-6">
                    <PiShareFatFill className="text-xl text-blue-400" ></PiShareFatFill>
                    <span className="ml-2 text-gray-500">{d?.share?.length} Shares</span>
                </button>
            </div>
            {
                writeCommet && (<div>
                    <Comment></Comment>

                </div>)
            }
        </div>
    );
};

export default Feed;