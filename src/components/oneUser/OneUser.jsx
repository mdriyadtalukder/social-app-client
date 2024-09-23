import { useParams } from "react-router-dom";
import { useGetAUserQuery } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";
import Child from "../profile/myprofile/chile/Child";

const OneUser = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetAUserQuery(id);
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && !data) content = <p className='text-blue-400 font-bold  text-center'>No info found!!</p>
    if (!isLoading && !isError && data) {
        content = <Child d={data}></Child>
    }
    return (
        <>
            {
                isLoading ? <Loading></Loading> : (<>
                    {content}
                </>)
            }
        </>
    );
};

export default OneUser;