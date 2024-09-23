import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";
import Info from "./info/Info";

const UserInfo = () => {
    const { user } = useSelector((state) => state?.users);
    const { data, isLoading, isError, error } = useGetUserQuery(user?.email);
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && !data) content = <p className='text-blue-400 font-bold  text-center'>No info found!!</p>
    if (!isLoading && !isError && data) {
        content = <Info d={data}></Info>
    }
    return (
        <>
            {
                isLoading ? <Loading></Loading> : (<>{content}</>)
            }
        </>
    );
};

export default UserInfo;