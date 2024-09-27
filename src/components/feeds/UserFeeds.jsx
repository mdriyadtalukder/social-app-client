import { useGetAUserQuery, useGetPostQuery } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";
import Feed from "./feed/Feed";
import { useParams } from "react-router-dom";

const UserFeeds = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetAUserQuery(id);
    const { data: mailData, isLoading: load, isError: isErr } = useGetPostQuery(data?.email);
    if (load || isLoading) {
        return <Loading></Loading>
    }
    let content;
    if ((!isLoading && isError) || isErr) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && mailData.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No Post found!!</p>
    if (!isLoading && !isError && mailData.length > 0) {
        content = mailData.map(d => <Feed key={d?._id} d={d}></Feed>)
    }
    return (
        <div className="bg-white rounded-lg shadow-md border p-4 mt-5">
            {content}

        </div>
    );
};

export default UserFeeds;