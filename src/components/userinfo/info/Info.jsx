import { BsCalendarDate } from "react-icons/bs";
import { FaCheckCircle, FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { IoBagAddSharp } from "react-icons/io5";
import Modal from "../../modal/Modal";
import { useSelector } from "react-redux";
import { useAddBlockMutation, useAddRequestMutation, useDeleteRequestMutation, useGetAllRequestsQuery, useGetRequestQuery, useGetUserQuery, useUpdateFollowersMutation, useUpdateFollowingMutation } from "../../../rtk_query/features/users/usersApi";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Info = ({ d, auser }) => {
    const { user } = useSelector((state) => state?.users);
    const { data: following, isLoading: loading, error: err } = useGetUserQuery(user?.email);
    const { data: followers, isLoading, error: e } = useGetUserQuery(d?.email);
    const [updateFollowing, { error: er }] = useUpdateFollowingMutation();
    const [updateFollowers, { error }] = useUpdateFollowersMutation();
    const [addRequest] = useAddRequestMutation();
    const { data, isLoading: load, error: erro } = useGetRequestQuery(user?.email);
    const { data: allreq, isLoading: reqload, error: reerro } = useGetAllRequestsQuery();
    const filters = data?.find(dt => dt?.myEmail === d?.email)
    const filterss = allreq?.find(dt => dt?.email === d?.email)
    const { data: followerss, isLoading: loads, error: es } = useGetUserQuery(filters?.myEmail);
    const [deleteRequest] = useDeleteRequestMutation();
    const [addBlock, { isLoading: blockload }] = useAddBlockMutation();
    const navigate = useNavigate();

    if (loading || isLoading || load || loads || reqload || blockload) {
        return loading;
    }
    const handleFollowing = () => {
        if (!err || !er || !e || !error || !reerro) {
            if (following?.following?.includes(d?.email)) {
                updateFollowing({
                    id: following?._id,
                    data: {
                        following: following?.following?.filter(f => f !== d?.email)
                    }
                });

                if (filterss?._id) {
                    deleteRequest(filterss?._id);
                }


            }
            else {
                updateFollowing({
                    id: following?._id,
                    data: {
                        following: [...following?.following, d?.email]
                    }
                })
            }

            if (followers?.followers?.includes(user?.email)) {
                updateFollowers({
                    id: followers?._id,
                    data: {
                        followers: followers?.followers?.filter(f => f !== user?.email)
                    }
                })
                if (filterss?._id) {
                    deleteRequest(filterss?._id);
                }

            }
            else {
                updateFollowers({
                    id: followers?._id,
                    data: {
                        followers: [...followers?.followers, user?.email]
                    }
                })
            }
            if (!following?.following?.includes(d?.email) || !followers?.followers?.includes(user?.email)) {
                addRequest({
                    email: d?.email,
                    myEmail: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL,
                    userId: following?._id,
                    live: following?.live,

                })
            }

            toast.success("Successfully sent request!!")
        }
        else {
            toast.error("Something went wrong!!");
        }


    }
    const handleAccept = () => {
        if (!erro || !er || !e || !es) {
            if (following?.following?.includes(filters?.myEmail)) {
                updateFollowing({
                    id: following?._id,
                    data: {
                        following: [...following?.following]
                    }
                })
            }
            else {
                updateFollowing({
                    id: following?._id,
                    data: {
                        following: [...following?.following, filters?.myEmail]
                    }
                })
            }

            if (followers?.followers?.includes(user?.email)) {
                updateFollowers({
                    id: followerss?._id,
                    data: {
                        followers: [...followerss?.followers]
                    }
                })
            }
            else {
                updateFollowers({
                    id: followerss?._id,
                    data: {
                        followers: [...followerss?.followers, user?.email]
                    }
                })
            }

            deleteRequest(filters?._id);
            toast.success("Accepted!!")



            toast.success("Successfully sent request!!")
        }
        else {
            toast.error("Something went wrong!!");
        }

    }
    const handleDelete = () => {
        if (!err || !er || !e || !error) {
            deleteRequest(filters?._id);
            toast.success("deleted!!")
        }
        else {
            toast.error("Something went wrong!!");
        }
    }

    const handleBlock = () => {
        addBlock({
            email: user?.email,
            blocked: d?.email,
            blockedName: d?.name,
            blockedImage: d?.image
        });
        navigate('/')
        toast.success("Blocked!!");
    }
    return (
        <div className=" max-w-xl mx-auto mt-5">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <h1 className="text-sm font-bold text-gray-400">User Information</h1>
                    <div className="flex gap-2">
                        {(!auser || user?.email === d?.email) && <Modal></Modal>}
                        <span className="text-blue-400 text-sm cursor-pointer">See all</span>
                    </div>

                </div>
                <div className="px-4">
                    <h1 className="text-xl font-bold">{d?.name}</h1>
                    <p className="text-gray-400 font-medium mt-3">{d?.des || "write something about you..."}</p>

                    <p className="font-medium text-gray-400 mt-3"><FaLocationDot className="inline"></FaLocationDot> Living in <span className="font-bold text-gray-600">{d?.live}</span></p>
                    <p className="font-medium text-gray-400 mt-3"><FaGraduationCap className="inline"></FaGraduationCap> Went to <span className="font-bold text-gray-600">{d?.school}</span></p>
                    <p className="font-medium text-gray-400 mt-3"><IoBagAddSharp className="inline"></IoBagAddSharp> Works at <span className="font-bold text-gray-600">{d?.work}</span></p>
                    <div className="flex justify-between items-center my-3">
                        <p className="flex justify-center items-center font-medium text-gray-400"><IoIosLink className="inline me-1"></IoIosLink > <span className="text-blue-400">{d?.link}</span></p>
                        <p className="flex justify-center items-center font-medium text-gray-400"><BsCalendarDate className="inline me-1"></BsCalendarDate > <span>Joined {d?.join
                            ? new Date(d.join).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                            : 'Unknown'}</span></p>

                    </div>
                    {
                        (auser && user?.email !== d?.email) && <button onClick={handleFollowing} className={` w-full block mx-auto rounded-lg bg-blue-500 hover:shadow-lg font-semibold text-white px-6 py-2 ${filters && 'hidden'}`}>{following?.following?.includes(d?.email) ? "Following" : "Follow"}</button>

                    }
                    {
                        filters && <div className="flex justify-center items-center gap-4">
                            <button onClick={handleAccept} className="text-gray-600 hover:text-green-700">
                                <FaCheckCircle className="text-2xl text-green-600 me-2"></FaCheckCircle>
                            </button>
                            <button onClick={handleDelete} className="text-gray-600 hover:text-red-700">
                                <MdCancel className="text-3xl text-red-600"></MdCancel>
                            </button>
                        </div>
                    }
                    {
                        (auser && user?.email !== d?.email) && <p onClick={handleBlock} className="text-red-600 float-end my-3 cursor-pointer ">Block User</p>
                    }

                </div>

            </div>
        </div>
    );
};

export default Info;