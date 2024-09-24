import { Link } from "react-router-dom"

const User = ({ d }) => {
    return (
        <div className="flex items-center mb-2">
            <img className="h-16 w-16  rounded-full mr-4" src={d?.image || img}
                alt="Product" />
            <div className="flex-1">
                <Link to={`/profile/${d?._id}`} className="text-lg font-bold">{d?.name}</Link>
            </div>

            <Link to={`/profile/${d?._id}`} className="text-white hover:bg-blue-500 bg-blue-400 p-2 rounded-lg">
                View
            </Link>
        </div>
    );
};

export default User;