
import FriendRequest from "./friendRequest/FriendRequest";

const FriendRequests = () => {
    return (
        <div className=" max-w-xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <h1 className="text-lg font-bold text-gray-400">Friend requests</h1>
                    <span className="text-blue-400 cursor-pointer">See all</span>
                </div>
                <div className="px-4">
                <FriendRequest></FriendRequest>
                </div>
                
            </div>
        </div>
    );
};

export default FriendRequests;