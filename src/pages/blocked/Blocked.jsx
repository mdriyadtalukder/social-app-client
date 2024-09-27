import { useSelector } from "react-redux";
import { useDeleteBlockMutation, useGetBlocksQuery } from "../../rtk_query/features/users/usersApi";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import Sidebar from "../../components/sidebar/Sidebar";

const Blocked = () => {
    const { user } = useSelector((state) => state?.users);
    const { data, isLoading, isError, error } = useGetBlocksQuery(user?.email);
    const [deleteBlock, { isLoading: load }] = useDeleteBlockMutation();


    if (isLoading || load) {
        return <Loading></Loading>
    }

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No block found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(d => <div key={d?._id} className="flex items-center mb-2">
            <img className="h-16 w-16  rounded-full mr-4" src={d?.blockedImage}
                alt="Product" />
            <div className="flex-1">
                <p className="text-lg font-bold">{d?.blockedName}</p>
            </div>

            <button onClick={() => { deleteBlock(d?._id); toast.success("Unblocked!") }} className=" bg-green-600 p-2 text-white font-bold rounded-lg text-xs ">
                Unblock
            </button>


        </div>)


    }
    return (
        <div className="pt-4 px-4 bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5  mx-auto">

            <div className="lg:col-span-2 me-5 hidden lg:block">
                <Sidebar></Sidebar>

            </div>
            <div className="lg:col-span-4 md:col-span-3 h-screen bg-white p-2 ">

                {content}
            </div>
            <div className=" lg:col-span-2 ms-5  hidden lg:block">


            </div>
        </div>
    );
};

export default Blocked;