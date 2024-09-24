import { BiDotsHorizontalRounded, BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import Comment from "../../comment/Comment";
import { useState } from "react";
import img from '../../../assets/empty.png'
import { useDeletePostMutation, useGetAPostQuery, useGetUserQuery, useUpdateLikeMutation, useUpdatePostNumberMutation } from "../../../rtk_query/features/users/usersApi";
import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";
import RepostModal from "../../repost/repostModal/RepostModal";
const Feed = ({ d }) => {
    const { user } = useSelector((state) => state?.users);
    const [toggle, setToggle] = useState(false)
    const [writeCommet, setWriteComment] = useState(false);
    const { data, isLoading, error } = useGetAPostQuery(d?._id);
    const [updateLike, { isLoading: load, error: err }] = useUpdateLikeMutation();
    const [deletePost, { isLoading: loads, error: errs }] = useDeletePostMutation();
    const { data: postNumber, isLoading: loading, error: errss } = useGetUserQuery(user?.email);
    const [updatePostNumber, { error: er }] = useUpdatePostNumberMutation();
    if (isLoading || load || loads) {
        return <Loading></Loading>
    }
    if (err || error || errs) {
        return <p className='text-red-600 font-bold text-center'>{error?.status || err?.status}</p>
    }
    console.log(d)

    const handleLike = () => {
        if (!err || !error) {

            if (data?.like?.includes(user?.email)) {
                updateLike({
                    id: d?._id,
                    data: {
                        like: data?.like?.filter(d => d !== user?.email)
                    }
                })
            }
            else {
                updateLike({
                    id: d?._id,
                    data: {
                        like: [...d?.like, user?.email]
                    }
                })
            }
        }

    }
    const handleDelete = () => {
        if (!errss || !er) {
            deletePost(d?._id)
            updatePostNumber({
                id: postNumber?._id,
                data: {
                    post: Number(postNumber?.post) - 1,
                }
            })
        }

    }


    return (
        <div className="bg-white mb-14">

            <div className="flex justify-between relative">
                <div className="flex items-center mb-4">
                    <img className="w-12 h-12 rounded-full mr-3" src={d?.profile || img} alt="Profile Image" />
                    <div>
                        <h2 className="text-lg font-semibold">{d && d?.name}</h2>
                        <p className="text-gray-500 text-sm">Published on {new Date(d?.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                    </div>
                </div>
                {
                    user?.email === d?.email && (<><BiDotsHorizontalRounded onClick={() => setToggle(!toggle)} className="text-2xl text-gray-600 cursor-pointer"></BiDotsHorizontalRounded>
                        {
                            toggle && (<div className=" flex flex-col justify-center items-center gap-[1px] bg-white shadow-lg border-2 border-blue-50 absolute top-5 -right-10 md:-right-4 w-[80px] py-1 text-sm rounded-md text-gray-400">
                                <p onClick={handleDelete} className="hover:bg-blue-50 w-full p-1 text-red-400 text-center rounded-md">Delete</p>
                                <RepostModal d={d}></RepostModal>
                            </div>)
                        }</>)
                }
            </div>
            {
                d?.type && (<> {
                    d?.write && <p className="text-gray-500 mb-1">{d?.write}</p>
                }
                    <div className="p-8 shadow-lg rounded-lg mb-4 border-2 border-gray-200">
                        {
                            d?.image && <img className="object-cover object-top w-full rounded-lg mb-4 " src={d?.image} alt='Mountain' />
                        }

                        <p className="text-gray-700 mb-4">
                            {d?.description}
                        </p>
                    </div></>)
            }
            {
                !d?.type && (<> {
                    d?.image && <img className="object-cover object-top w-full rounded-lg mb-4 " src={d?.image} alt='Mountain' />
                }

                    <p className="text-gray-700 mb-4">
                        {d?.description}
                    </p></>)
            }
            <div className="flex justify-between items-center">
                <div className="flex">
                    <button onClick={handleLike} className="flex items-center ">
                        <BiSolidLike className={` text-xl text-blue-400 ${data?.like?.includes(user?.email) ? 'text-blue-400' : 'text-gray-400'}`}></BiSolidLike>
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
                    <Comment d={d}></Comment>

                </div>)
            }
        </div>
    );
};

export default Feed;