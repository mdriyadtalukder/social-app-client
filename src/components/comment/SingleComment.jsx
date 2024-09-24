import { BiDotsHorizontalRounded, BiSolidLike } from "react-icons/bi";
import { useUpdateCommentMutation } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";

const SingleComment = ({ c, id, comment, email }) => {
    const [updateComment, { isLoading, error }] = useUpdateCommentMutation();

    if (isLoading) {
        return <Loading></Loading>
    }
    const handleLikes = () => {
        if (!error) {
            const updatedComments = comment.map((com) => {
                if (com?._id === c?._id) {
                    if (com?.like?.includes(email)) {
                        return {
                            ...com,
                            like: com?.like?.filter(f => f !== email)
                        }
                    }
                    else {
                        return {
                            ...com,
                            like: [...com?.like, email] // Append the email to the like array
                        };
                    }
                }
                return com;
            });

            updateComment({
                id: id,
                data: {
                    comment: updatedComments // Pass the updated comments array
                }
            })
        }

    }

    return (
        <div className="bg-white p-4 rounded-lg mt-0">
            <div className="flex justify-between">
                <div className="flex items-center mb-2">
                    <img src={c?.image} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h3 className="font-semibold">{c?.name}</h3>
                        <p className="text-sm text-gray-500">Posted on {new Date(c?.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                    </div>
                </div>
                <BiDotsHorizontalRounded className="text-2xl text-gray-600 cursor-pointer"></BiDotsHorizontalRounded>
            </div>
            <p className="text-gray-700">
                {c?.title}
            </p>
            <div className="flex gap-2 justify-start items-center mt-2">
                <button onClick={handleLikes} className="flex items-center ">
                    <BiSolidLike className="text-md text-blue-400"></BiSolidLike>
                    <span className=" ms-2 text-sm text-gray-500">{c?.like?.length} Likes</span>
                </button>
                {/* <button className="text-gray-500 hover:text-gray-600 text-sm">Reply</button> */}
            </div>
        </div>
    );
};

export default SingleComment;