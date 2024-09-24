import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useUpdateCommentMutation } from "../../rtk_query/features/users/usersApi";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import Loading from "../loading/Loading";
import toast from "react-hot-toast";
import SingleComment from "./SingleComment";

const Comment = ({ d }) => {
    const { user } = useSelector((state) => state?.users);
    const [content, setComment] = useState('');
    const [updateComment, { isLoading, error }] = useUpdateCommentMutation();

    if (isLoading) {
        return <Loading></Loading>
    }
    const handleCommet = (e) => {
        e.preventDefault();
        if (!error) {
            let acomment = {
                name: user?.displayName,
                image: user?.photoURL,
                date: new Date(),
                title: content,
                _id: v4(),
                like: [],
            }

            updateComment({
                id: d?._id,
                data: {
                    comment: [...d?.comment, acomment]
                }
            })
            toast.success("Commented!!")
        }
    }




    return (
        <>
            <form onSubmit={handleCommet} action="#" method="POST" className="flex items-center gap-2 pt-4">
                <img src={user?.photoURL} alt="User profile" className="w-[2.5rem] h-[2.5rem] rounded-full" />
                <textarea onChange={(e) => setComment(e.target.value)} rows="1" className="w-full resize-none truncate border border-blue-300 rounded-full p-[8px] text-left xs:text-sm sm:text-sm  dark:bg-blue-500 dark:text-white dark:border-blue-400 focus:outline-blue-200" placeholder="Write a comment..."></textarea>
                <BsEmojiSmileFill className="text-md text-yellow-500 bg-black rounded-lg cursor-pointer"></BsEmojiSmileFill>
                <button disabled={!content} type="submit"
                    className={`group relative w-[10%] flex justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md   focus:outline-none focus:ring-2 focus:ring-offset-2  ${!content ? 'bg-gray-200' : 'bg-blue-400'} ${!content ? 'hover:bg-gray-300' : 'hover:bg-blue-500'}
                                    ${!content ? 'text-black' : 'text-white'} ${!content ? 'focus:ring-gray-200' : 'focus:ring-blue-400'}
                                    
                                    `}>

                    Comment
                </button>
            </form>

            <>

                {
                    d?.comment?.map(c => <SingleComment key={c?._id} c={c} id={d?._id} comment={d?.comment} email={user?.email}></SingleComment>)
                }

            </>

        </>
    );
};

export default Comment;