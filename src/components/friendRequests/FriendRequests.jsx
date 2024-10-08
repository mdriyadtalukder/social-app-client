
import { useSelector } from "react-redux";
import FriendRequest from "./friendRequest/FriendRequest";
import { useGetBlocksQuery, useGetRequestQuery } from "../../rtk_query/features/users/usersApi";
import { Link } from "react-router-dom";
const FriendRequests = ({ all }) => {
    const { user } = useSelector((state) => state?.users);
    const { data, isLoading, isError, error } = useGetRequestQuery(user?.email);
    const { data: block } = useGetBlocksQuery(user?.email);

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No Request found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        if (all) {
            content = data.filter((item) => {
                // Check if the item.email is not in the block.blocked array
                return !block?.some((b) => b?.blocked === item?.myEmail);
            }).map(d => <FriendRequest key={d?._id} d={d}></FriendRequest>)
        }
        else {
            content = data.filter((item) => {
                // Check if the item.email is not in the block.blocked array
                return !block?.some((b) => b?.blocked === item?.myEmail);
            }).slice(0, 4).map(d => <FriendRequest key={d?._id} d={d}></FriendRequest>)
        }
    }
    return (
        <div className=" max-w-xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <h1 className="text-lg font-bold text-gray-400">Friend requests</h1>
                    {(!all && data?.length > 4) ? <Link to='/requests' className="text-blue-400 cursor-pointer">See all</Link> : ''}
                </div>
                <div className="px-4">
                    {content}
                </div>

            </div>
        </div>
    );
};

export default FriendRequests;