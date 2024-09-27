import { useParams } from "react-router-dom";
import { useGetAUserQuery, useGetPostQuery } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";
import UserMedia from "../modal/UserMedia";

const Media = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetAUserQuery(id);
    const { data: mailData, isLoading: load, isError: isErr, error: er } = useGetPostQuery(data?.email);

    if (load || isLoading) {
        return <Loading></Loading>
    }
    let content;
    if ((!load && isErr) || isError) content = <p className='text-red-600 font-bold text-center'>{error?.status || er?.status || 'error!'}</p>
    if (!load && !isErr && mailData?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No media found!!</p>
    if (!load && !isErr && mailData?.length > 0) {
        content = mailData?.filter(f => f?.image)?.slice(0, 9)?.map(d => <img key={d?._id} className="rounded-lg h-32 w-30" src={d?.image} alt="" />
        )
    }
    return (
        <div className=" max-w-xl mx-auto mt-5">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <h1 className="text-sm font-bold text-gray-400">User Media</h1>

                    {
                        mailData?.length > 8 && <UserMedia></UserMedia>
                    }
                </div>
                <div className="px-4 pb-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {content}
                </div>

            </div>
        </div>
    );
};

export default Media;