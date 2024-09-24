import { FaClipboardList, FaNewspaper, FaPhotoVideo, FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { IoAlbums, IoSettings } from "react-icons/io5";
import { LuActivitySquare } from "react-icons/lu";
import { MdEventNote, MdGolfCourse, MdPostAdd } from "react-icons/md";
import { SiCoinmarketcap } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex flex-col items-center shadow-md  overflow-hidden text-gray-500 bg-white rounded-lg">
            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3">
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <MdPostAdd className="text-2xl text-yellow-400"></MdPostAdd>
                        <span className="ml-2 text-sm font-medium">My posts</span>
                    </a>
                    <Link to='/requests' className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <FaUserFriends className="text-2xl text-blue-400"></FaUserFriends >
                        <span className="ml-2 text-sm font-medium">Friend requests</span>
                    </Link>
                    <Link to='/suggestions' className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <GiThreeFriends className="text-2xl text-green-400"></GiThreeFriends >
                        <span className="ml-2 text-sm font-medium">Suggestions</span>
                    </Link>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <LuActivitySquare className="text-2xl text-blue-400"></LuActivitySquare>
                        <span className="ml-2 text-sm font-medium">Activity</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <SiCoinmarketcap className="text-2xl text-amber-900"></SiCoinmarketcap>
                        <span className="ml-2 text-sm font-medium">Marketplaces</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <MdEventNote className="text-2xl text-blue-400"></MdEventNote >
                        <span className="ml-2 text-sm font-medium">Events</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <IoAlbums className="text-2xl text-green-400"></IoAlbums>
                        <span className="ml-2 text-sm font-medium">My post</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <FaPhotoVideo className="text-2xl text-pink-400"></FaPhotoVideo>
                        <span className="ml-2 text-sm font-medium">Videos</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <FaNewspaper className="text-2xl text-purple-400"></FaNewspaper >
                        <span className="ml-2 text-sm font-medium">News</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <MdGolfCourse className="text-2xl text-cyan-400"></MdGolfCourse >
                        <span className="ml-2 text-sm font-medium">Courses</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <FaClipboardList className="text-2xl text-purple-950"></FaClipboardList>
                        <span className="ml-2 text-sm font-medium">Lists</span>
                    </a>
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-300" href="#">
                        <IoSettings className="text-2xl text-gray-400"></IoSettings >
                        <span className="ml-2 text-sm font-medium">Settings</span>
                    </a>

                </div>

            </div>

        </div>
    );
};

export default Sidebar;