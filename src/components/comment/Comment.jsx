import { BiDotsHorizontalRounded, BiSolidLike } from "react-icons/bi";
import { BsEmojiSmileFill } from "react-icons/bs";

const Comment = () => {
    return (
        <>
            <div className="flex items-center gap-2 pt-4">
                <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="User profile" className="w-[2.5rem] h-[2.5rem] rounded-full" />
                <textarea rows="1" className="w-full resize-none truncate border border-blue-300 rounded-full p-[8px] text-left xs:text-sm sm:text-sm  dark:bg-blue-500 dark:text-white dark:border-blue-400 focus:outline-blue-200" placeholder="Write a comment..."></textarea>
                <BsEmojiSmileFill className="text-md text-yellow-500 bg-black rounded-lg cursor-pointer"></BsEmojiSmileFill>
            </div>
            <div className="bg-white p-4 rounded-lg mt-3">
                <div className="flex justify-between">
                    <div className="flex items-center mb-2">
                        <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <h3 className="font-semibold">John Doe</h3>
                            <p className="text-sm text-gray-500">Posted on March 15, 2024</p>
                        </div>
                    </div>
                    <BiDotsHorizontalRounded className="text-2xl text-gray-600 cursor-pointer"></BiDotsHorizontalRounded>
                </div>
                <p className="text-gray-700">Great product! I have been using it for a week now and I am very satisfied with its
                    performance.</p>
                <div className="flex gap-2 justify-start items-center mt-2">
                    <button className="flex items-center ">
                        <BiSolidLike className="text-md text-blue-400"></BiSolidLike>
                        <span className=" ms-2 text-sm text-gray-500">56 Likes</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-600 text-sm">Reply</button>
                </div>
            </div>
        </>
    );
};

export default Comment;