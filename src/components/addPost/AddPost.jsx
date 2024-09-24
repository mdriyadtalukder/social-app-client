import axios from "axios";
import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { FaSquarePollVertical } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useAddPostMutation, useGetUserQuery, useUpdatePostNumberMutation } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {
    const { user } = useSelector((state) => state?.users);
    const { data: postNumber, isLoading: loading, error: err } = useGetUserQuery(user?.email);
    const [updatePostNumber, { error: er }] = useUpdatePostNumberMutation();
    const [content, setContent] = useState('');
    const [file, setFile] = useState();
    const [addPost, { isLoading, error }] = useAddPostMutation();

    if (loading) {
        return loading;
    }

    var photo;
    const handlePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', file)
        if (file) {
            const res = await axios.post(image_hosting_api, data);
            photo = res?.data?.data?.display_url;

        }
        if (!error && !err && !er && content) {
            addPost({
                name: postNumber?.name,
                profile: user?.photoURL,
                image: photo || '',
                description: content,
                date: new Date(),
                like: [],
                comment: [],
                share: [],
                email: user?.email
            });
            updatePostNumber({
                id: postNumber?._id,
                data: {
                    post: Number(postNumber?.post) + 1,
                }
            })
            setContent("");
            setFile('');
            toast.success("Successfully posted!")
        }
        else {
            toast.error("Something went wrong!")
        }


    }


    return (


        <>
            {
                isLoading ? <Loading></Loading> : (<form onSubmit={handlePost} action="#" method="POST"
                    className="w-full flex flex-col gap-1 p-2 border shadow-md rounded-xl my-3 mt-5 bg-white dark:border-gray-400 dark:bg-gray-800">
                    {
                        file && (<div className="relative self-center">
                            <img src={URL.createObjectURL(file)} alt="User profile" className="w-[3rem] h-[3rem] rounded-full" />
                            <RxCross2 onClick={() => setFile('')} className="text-sm text-black absolute font-bold cursor-pointer top-0 right-0"></RxCross2>

                        </div>)
                    }
                    <div className="flex items-center gap-2 pt-2">
                        <img src={user?.photoURL} alt="User profile" className="w-[3.5rem] h-[3.5rem] rounded-full" />
                        <textarea onChange={(e) => setContent(e.target.value)} rows="1" className="w-full resize-none truncate border border-blue-300 rounded-full p-[12px] text-left xs:text-sm sm:text-lg  dark:bg-blue-500 dark:text-white dark:border-blue-400 focus:outline-blue-200" placeholder="What's on your mind?"></textarea>
                        <BsEmojiSmileFill className="text-xl text-yellow-500 bg-black rounded-lg cursor-pointer"></BsEmojiSmileFill>
                        <button disabled={!content} type="submit"
                            className={`group relative w-[10%] flex justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md   focus:outline-none focus:ring-2 focus:ring-offset-2  ${!content ? 'bg-gray-200' : 'bg-blue-400'} ${!content ? 'hover:bg-gray-300' : 'hover:bg-blue-500'}
                                    ${!content ? 'text-black' : 'text-white'} ${!content ? 'focus:ring-gray-200' : 'focus:ring-blue-400'}
                                    
                                    `}>

                            Post
                        </button>
                    </div>

                    <div className="flex sm:px-4 m-auto mt-2 justify-between w-[80%]">
                        <div
                            className="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <label htmlFor="fileInput" className="flex items-center gap-2 cursor-pointer">
                                <span className="material-symbols-outlined text-green-400">
                                    <IoMdPhotos />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Photo</h3>
                            </label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                id="fileInput"
                                name="image"
                                type="file"
                                className="hidden"

                            />
                        </div>

                        <div
                            className="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <label htmlFor="fileInput" className="flex items-center gap-2 cursor-pointer">
                                <span className="material-symbols-outlined text-pink-400">
                                    <FaPhotoVideo />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Video</h3>
                            </label>
                            <input
                                id="fileInput"
                                name="image"
                                type="file"
                                className="hidden"
                            />
                        </div>

                        <div
                            className="flex items-center gap-2 sm:p-2 xs:p-1 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="material-symbols-outlined text-orange-300"><FaSquarePollVertical></FaSquarePollVertical></span>
                            <h3 className="text-sm sm:font-semibold xs:truncate text-gray-600 dark:text-gray-300">Poll</h3>
                        </div>
                        <div
                            className="flex items-center gap-2 sm:p-2 xs:p-1 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="material-symbols-outlined text-blue-400"><MdEventNote></MdEventNote></span>
                            <h3 className="text-sm sm:font-semibold xs:truncate text-gray-600 dark:text-gray-300">Event</h3>
                        </div>
                    </div>

                </form>)
            }

        </>
    );
};

export default AddPost;