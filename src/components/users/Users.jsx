import { useGetUsersQuery } from "../../rtk_query/features/users/usersApi";
import User from "./User";

const Users = () => {
    const { data, isLoading, isError, error } = useGetUsersQuery();
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No suggestion found!!</p>
    if (!isLoading && !isError && data.length > 0) {
        content = data.slice(0,4).map(d => <User key={d?._id} d={d}></User>)
    }
    return (
        <div>
            <div className=" max-w-xl mx-auto mt-5">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-white">
                        <h1 className="text-lg font-bold text-gray-400">Suggestions</h1>
                        <span className="text-blue-400 cursor-pointer">See all</span>
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