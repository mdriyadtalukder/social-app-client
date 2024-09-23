import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../rtk_query/features/users/usersApi";
import Loading from "../../loading/Loading";
import Child from "./chile/Child";

const MyProfile = () => {
    const { user } = useSelector((state) => state?.users);
    const { data, isLoading, isError, error } = useGetUserQuery(user?.email);
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

export default MyProfile;