import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaRegCircleUser } from "react-icons/fa6";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { app } from "../../../firebase.config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getSearch, getTitle } from "../../rtk_query/features/users/usersSlice";
import { PiUsersThreeLight } from "react-icons/pi";
import { AiOutlineAppstoreAdd, AiOutlineMessage } from "react-icons/ai";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const auth = getAuth(app);
    const { user, title } = useSelector((state) => state?.users);
    const dispatch = useDispatch()

    console.log(title)
    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(getCurrentUser(null))
            localStorage.clear();

        }).catch((error) => {
            toast.error(error.message)
        });
        setToggle2(false);
    }

    return (
        <div className=" bg-white mb-2  p-5">
            <div className="justify-evenly items-center hidden lg:flex md:flex xl:flex 2xl:flex">
                <Link to='/' onClick={() => dispatch(getTitle("Home"))} className="font-bold text-3xl text-blue-500 uppercase">Social App</Link>
                <div className=" flex ">
                    <Link to='/' onClick={() => dispatch(getTitle("Home"))} className={`flex justify-center items-center me-4 ${title === "Home" && 'bg-blue-200'} p-1 rounded-lg text-md`}><BiHomeAlt className="me-1 text-xl text-blue-400"></BiHomeAlt><span className="text-gray-500">Home</span></Link>
                    {/* <Link to='/' className="flex justify-center items-center me-4 text-md"><LiaUserFriendsSolid className="me-1 text-xl text-blue-400"></LiaUserFriendsSolid><span className="text-gray-500">Friends</span></Link> */}
                    {user && <a href="#stories" onClick={() => dispatch(getTitle("Stories"))} className={`flex justify-center items-center ${title === "Stories" && 'bg-blue-200'} me-4 p-1 rounded-lg text-md`}><AiOutlineAppstoreAdd className=" text-xl text-blue-400"></AiOutlineAppstoreAdd><span className="text-gray-500">Stories</span></a>
                    }
                </div>

                {
                    user && <div className="relative">
                        <input onChange={(e) => dispatch(getSearch(e.target.value))} type="text" className="bg-gray-200 outline-none p-2 rounded-lg focus:outline-blue-200" placeholder="Search friends..." />
                        <CiSearch className="absolute top-2 text-2xl right-2 text-gray-400 "></CiSearch>
                    </div>
                }
                <div className="flex relative md:pe-2">


                    {
                        user ? (<>
                            {/* <Link to='/' className="flex justify-center items-center me-4  text-md"><PiUsersThreeLight className="me-1 text-2xl text-gray-400"></PiUsersThreeLight ></Link>
                            <Link to='/' className="flex justify-center items-center me-4 text-md"><AiOutlineMessage className="me-1 text-2xl text-gray-400"></AiOutlineMessage ></Link>
                            <Link to='/' className="flex justify-center items-center me-4 text-md"><IoMdNotificationsOutline className=" text-2xl text-gray-400"></IoMdNotificationsOutline ></Link> */}

                            <img onClick={() => setToggle2(!toggle2)} src={user?.photoURL} className="h-12 w-12 md:h-10 md:w-10 rounded-full" alt="" />
                            {
                                toggle2 && (<div className=" flex flex-col justify-center items-center gap-[1px] bg-white shadow-lg border-2 border-blue-50 absolute top-10 -right-10 md:-right-4 w-[80px] py-1 text-sm rounded-md text-gray-400">
                                    <p onClick={handleLogout} className="hover:bg-blue-50 w-full p-1 text-center rounded-md"><IoIosLogOut className="inline text-sm me-1"></IoIosLogOut>Logout</p>
                                    <Link onClick={() => dispatch(getTitle("Settings"))} to='/settings' className={`w-full p-1 text-center ${title === "Settings" && 'bg-blue-200'} rounded-md`}><IoSettingsSharp className="inline text-sm me-1"></IoSettingsSharp >Settings</Link>
                                    <Link onClick={() => dispatch(getTitle("Blocklist"))} to='/blocklist' className={`w-full p-1 text-center ${title === "Blocklist" && 'bg-blue-200'} rounded-md`}><MdBlock className="inline text-sm me-0"></MdBlock>Blocklist</Link>
                                </div>
                                )
                            }</>) : <Link to='/login' className="flex justify-center items-center text-md "><FaRegCircleUser className="me-1 text-xl text-blue-400"></FaRegCircleUser><span className="text-gray-500">Login/Sing up</span></Link>

                    }
                </div>
            </div>
            <div className=" block sm:hidden relative ">
                <div className="flex justify-between items-center ">
                    <Link to='/' className="font-bold text-3xl text-blue-500 uppercase cursor-pointer">Social App</Link>
                    <div className="flex justify-center items-center gap-4">
                        <img src={user?.photoURL} className="h-8 w-8 rounded-full" alt="" />
                        <FaBars onClick={() => setToggle(!toggle)} className="font-bold text-3xl text-blue-500 cursor-pointer" />
                    </div>

                </div>
                <div className={`absolute left-[-22px]  overflow-hidden w-screen h-screen`}>
                    <div
                        className={`bg-gray-300 w-full h-full flex flex-col justify-center gap-3 bg-opacity-30 ps-[4px]   translate duration-300 ${toggle ? 'translate-x-0 ' : 'translate-x-full'
                            } `}
                    >
                        <Link to='/' onClick={() => dispatch(getTitle("Home"))} className={`flex justify-center items-center w-full ${title === "Home" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                            <BiHomeAlt className="me-1 text-xl text-blue-400" />
                            <span className="text-gray-500">Home</span>
                        </Link>
                        {/* <Link to='/' className=" flex justify-center items-center text-md p-1 rounded-lg">
                            <LiaUserFriendsSolid className="me-1 text-xl text-blue-400" />
                            <span className="text-gray-500">Friends</span>
                        </Link> */}
                        {
                            user && <>
                                <a href="#stories" onClick={() => dispatch(getTitle("Stories"))} className={`flex justify-center items-center w-full ${title === "Stories" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                                    <AiOutlineAppstoreAdd className="text-xl text-blue-400" />
                                    <span className="text-gray-500">Stories</span>
                                </a>
                                <Link to='/requests' onClick={() => dispatch(getTitle("Requests"))} className={`flex justify-center items-center w-full ${title === "Requests" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                                    <FaUserFriends className="me-1 text-xl text-blue-400" />
                                    <span className="text-gray-500">Requests</span>
                                </Link>
                                <Link to='/suggestions' onClick={() => dispatch(getTitle("Suggestions"))} className={`flex justify-center items-center w-full ${title === "Suggestions" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                                    <GiThreeFriends className="text-xl text-blue-400" />
                                    <span className="text-gray-500">Suggestions</span>
                                </Link>
                                <Link to='/myprofile' onClick={() => dispatch(getTitle("MyProfile"))} className={`flex justify-center items-center w-full ${title === "MyProfile" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                                    <CgProfile className="text-xl text-green-400" />
                                    <span className="text-gray-500">My profile</span>
                                </Link>
                                <Link to='/settings' onClick={() => dispatch(getTitle("Settings"))} className={`flex justify-center items-center w-full ${title === "Settings" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                                    <IoSettingsSharp className="text-xl text-gray-400" />
                                    <span className="text-gray-500">Settings</span>
                                </Link>
                                <Link to='/blocklist' onClick={() => dispatch(getTitle("Blocklist"))} className={`flex justify-center items-center w-full ${title === "Blocklist" && 'bg-blue-200'} text-md p-1 rounded-lg`}>
                                    <MdBlock className="text-xl text-red-400" />
                                    <span className="text-gray-500">Blocklist</span>
                                </Link>

                            </>
                        }
                        {
                            user ? <>
                                {/* <Link to='/' className="flex justify-center items-center me-4  text-md"><PiUsersThreeLight className="me-1 text-2xl text-gray-400"></PiUsersThreeLight ></Link>
                                <Link to='/' className="flex justify-center items-center me-4 text-md"><AiOutlineMessage className="me-1 text-2xl text-gray-400"></AiOutlineMessage ></Link>
                                <Link to='/' className="flex justify-center items-center me-4 text-md"><IoMdNotificationsOutline className=" text-2xl text-gray-400"></IoMdNotificationsOutline ></Link> */}

                                <p onClick={handleLogout} className="hover:bg-blue-50 w-full p-1 text-center rounded-md"><IoIosLogOut className="inline text-xl me-1"></IoIosLogOut>Logout</p>

                            </> : <Link to='/login' className="flex justify-center items-center text-md p-1 rounded-lg">
                                <FaRegCircleUser className="me-1 text-xl text-blue-400" />
                                <span className="text-gray-500">Login/Sign up</span>

                            </Link>
                        }

                    </div>
                </div>

            </div>
        </div >
    );
};

export default Navbar;