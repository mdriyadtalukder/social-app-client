import { useSelector } from "react-redux";
import Feed from "./feed/Feed";
import { useGetPostQuery } from "../../rtk_query/features/users/usersApi";

const Feeds = () => {
    const { user } = useSelector((state) => state?.users);
    const { data, isLoading, isError, error } = useGetPostQuery(user?.email);

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No Post found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(d => <Feed key={d?._id} d={d}></Feed>)
    }
    return (
        <div className="bg-white rounded-lg shadow-md border p-4 mt-5">
            {content}

        </div>
    );
};

export default Feeds;