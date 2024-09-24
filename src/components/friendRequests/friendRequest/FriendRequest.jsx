import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import img from '../../../assets/empty.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteRequestMutation, useGetUserQuery, useUpdateFollowersMutation, useUpdateFollowingMutation } from "../../../rtk_query/features/users/usersApi";
import toast from "react-hot-toast";
import Loading from "../../loading/Loading";

const FriendRequest = ({ d }) => {
    const { user } = useSelector((state) => state?.users);
    const { data: following, isLoading: loading, error: err } = useGetUserQuery(user?.email);
    const { data: followers, isLoading, error: e } = useGetUserQuery(d?.myEmail);
    const [updateFollowing, { error: er }] = useUpdateFollowingMutation();
    const [updateFollowers, { error }] = useUpdateFollowersMutation();
    const [deleteRequest] = useDeleteRequestMutation();
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    const handleAccept = () => {
        if (!err || !er || !e || !error) {
            if (following?.following?.includes(d?.myEmail)) {
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
                        following: [...following?.following, d?.myEmail]
                    }
                })
            }

            if (followers?.followers?.includes(user?.email)) {
                updateFollowers({
                    id: followers?._id,
                    data: {
                        followers: [...followers?.followers]
                    }
                })
            }
            else {
                updateFollowers({
                    id: followers?._id,
                    data: {
                        followers: [...followers?.followers, user?.email]
                    }
                })
            }

            deleteRequest(d?._id);
            toast.success("Accepted!!")



            toast.success("Successfully sent request!!")
        }
        else {
            toast.error("Something went wrong!!");
        }

    }

    const handleDelete = () => {
        if (!err || !er || !e || !error) {
            deleteRequest(d?._id);
            toast.success("deleted!!")
        }
        else {
            toast.error("Something went wrong!!");
        }
    }
    return (

        <div className="flex items-center mb-2">
            <img className="h-16 w-16  rounded-full mr-4" src={d?.image || img}
                alt="Product" />
            <div className="flex-1">
                <Link to={`profile/${d?.userId}`} className="text-lg font-bold">{d?.name}</Link>
            </div>

            <button onClick={handleAccept} className="text-gray-600 hover:text-green-700">
                <FaCheckCircle className="text-2xl text-green-600 me-2"></FaCheckCircle>
            </button>
            <button onClick={handleDelete} className="text-gray-600 hover:text-red-700">
                <MdCancel className="text-3xl text-red-600"></MdCancel>
            </button>

        </div>

    );
};

export default FriendRequest;