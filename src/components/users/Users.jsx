import { Link } from "react-router-dom";
import { useGetBlocksQuery, useGetUsersQuery } from "../../rtk_query/features/users/usersApi";
import User from "./User";
import { useSelector } from "react-redux";

const Users = ({ all }) => {
    const { data, isLoading, isError, error } = useGetUsersQuery();
    const { user, search } = useSelector((state) => state?.users);
    const { data: block } = useGetBlocksQuery(user?.email);

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No suggestion found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        if (all) {
            if (search) {
                content = data?.filter((item) => {
                    // Check if the item.email is not in the block.blocked array
                    return !block?.some((b) => b?.blocked === item?.email);
                }).filter(f => f?.email !== user?.email)?.filter(f => f?.name?.toLowerCase()?.includes(search?.toLowerCase())).map(d => <User key={d?._id} d={d}></User>)
            }
            else {
                content = data?.filter((item) => {
                    // Check if the item.email is not in the block.blocked array
                    return !block?.some((b) => b?.blocked === item?.email);
                }).filter(f => f?.email !== user?.email)?.map(d => <User key={d?._id} d={d}></User>)
            }
        }
        else {
            content = data?.filter((item) => {
                // Check if the item.email is not in the block.blocked array
                return !block?.some((b) => b?.blocked === item?.email);
            }).filter(f => f?.email !== user?.email)?.slice(0, 4).map(d => <User key={d?._id} d={d}></User>)
        }
    }
    return (
        <div>
            <div className=" max-w-xl mx-auto mt-5">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-white">
                        <h1 className="text-lg font-bold text-gray-400">Suggestions</h1>
                        {
                            (!all && data?.length > 5) ? <Link to='/suggestions' className="text-blue-400 cursor-pointer">See all</Link> : ''
                        }
                    </div>
                    <div className="px-4">
                        {content}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Users;