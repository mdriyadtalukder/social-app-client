import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import img from '../../../assets/empty.png'
import { Link } from "react-router-dom";

const FriendRequest = ({ d, suggest }) => {
    return (

        <div className="flex items-center mb-2">
            <img className="h-16 w-16  rounded-full mr-4" src={d?.image || img}
                alt="Product" />
            <div className="flex-1">
                <Link to={`profile/${d?._id}`} className="text-lg font-bold">{d?.name}</Link>
            </div>
            {
                suggest ? <button className="text-white hover:bg-blue-500 bg-blue-400 p-2 rounded-lg">
                    Follow
                </button> : (<><button className="text-gray-600 hover:text-green-700">
                    <FaCheckCircle className="text-2xl text-green-600 me-2"></FaCheckCircle>
                </button>
                    <button className="text-gray-600 hover:text-red-700">
                        <MdCancel className="text-3xl text-red-600"></MdCancel>
                    </button></>)
            }
        </div>

    );
};

export default FriendRequest;