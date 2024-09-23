import { useParams } from "react-router-dom";
import { useGetAUserQuery } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";
import ChildModal from "./childM/ChildModal";

const UserModal = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetAUserQuery(id);

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && !data) content = <p className='text-blue-400 font-bold  text-center'>No info found!!</p>
    if (!isLoading && !isError && data) {
        content = <ChildModal d={data}></ChildModal>
    }


    return (
        <>
            {
                isLoading ? <Loading></Loading> : (<>{content}</>)
            }
        </>
    );
};

export default UserModal;