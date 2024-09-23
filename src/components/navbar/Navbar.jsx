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
import { getCurrentUser } from "../../rtk_query/features/users/usersSlice";
import { PiUsersThreeLight } from "react-icons/pi";
import { AiOutlineAppstoreAdd, AiOutlineMessage } from "react-icons/ai";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const auth = getAuth(app);
    const { user } = useSelector((state) => state?.users);
    const dispatch = useDispatch()
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
                <Link to='/' className="font-bold text-3xl text-blue-500 uppercase">Social App</Link>
                <div className=" flex ">
                    <Link to='/' className="flex justify-center items-center me-4  text-md"><BiHomeAlt className="me-1 text-xl text-blue-400"></BiHomeAlt><span className="text-gray-500">Home</span></Link>
                    <Link to='/' className="flex justify-center items-center me-4 text-md"><LiaUserFriendsSolid className="me-1 text-xl text-blue-400"></LiaUserFriendsSolid><span className="text-gray-500">Friends</span></Link>
                    <Link to='/' className="flex justify-center items-center me-4 text-md"><AiOutlineAppstoreAdd className=" text-xl text-blue-400"></AiOutlineAppstoreAdd><span className="text-gray-500">Stories</span></Link>
                </div>

                <div className="relative">
                    <input type="text" className="bg-gray-200 outline-none p-2 rounded-lg focus:outline-blue-200" placeholder="Search..." />
                    <CiSearch className="absolute top-2 text-2xl right-2 text-gray-400 "></CiSearch>
                </div>
                <div className="flex relative md:pe-2">


                    {
                        user ? (<>
                            <Link to='/' className="flex justify-center items-center me-4  text-md"><PiUsersThreeLight className="me-1 text-2xl text-gray-400"></PiUsersThreeLight ></Link>
                            <Link to='/' className="flex justify-center items-center me-4 text-md"><AiOutlineMessage className="me-1 text-2xl text-gray-400"></AiOutlineMessage ></Link>
                            <Link to='/' className="flex justify-center items-center me-4 text-md"><IoMdNotificationsOutline className=" text-2xl text-gray-400"></IoMdNotificationsOutline ></Link>

                            <img onClick={() => setToggle2(!toggle2)} src={user?.photoURL} className="h-8 w-8 md:h-6 md:w-6 rounded-full" alt="" />
                            {
                                toggle2 && (<div onClick={handleLogout} className=" flex flex-col justify-center items-center gap-[1px] bg-white shadow-lg border-2 border-blue-50 absolute top-10 -right-10 md:-right-4 w-[80px] py-1 text-sm rounded-md text-gray-400">
                                    <p className="hover:bg-blue-50 w-full p-1 text-center rounded-md"><IoIosLogOut className="inline text-xl me-1"></IoIosLogOut>Logout</p>
                                </div>
                                )
                            }</>) : <Link to='/login' className="flex justify-center items-center text-md "><FaRegCircleUser className="me-1 text-xl text-blue-400"></FaRegCircleUser><span className="text-gray-500">Login/Sing up</span></Link>

                    }
                </div>
            </div>
            <div className=" block sm:hidden relative ">
                <div className="flex justify-between items-center ">
                    <h1 className="font-bold text-3xl text-blue-500 uppercase cursor-pointer">Social App</h1>
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
                        <Link to='/' className="  flex justify-center items-center w-full text-md p-1 rounded-lg">
                            <BiHomeAlt className="me-1 text-xl text-blue-400" />
                            <span className="text-gray-500">Home</span>
                        </Link>
                        <Link to='/' className=" flex justify-center items-center text-md p-1 rounded-lg">
                            <LiaUserFriendsSolid className="me-1 text-xl text-blue-400" />
                            <span className="text-gray-500">Friends</span>
                        </Link>
                        <Link to='/' className="flex justify-center items-center text-md p-1 rounded-lg">
                            <AiOutlineAppstoreAdd  className="text-xl text-blue-400" />
                            <span className="text-gray-500">Stories</span>
                        </Link>
                        {
                            user ? <>
                                <Link to='/' className="flex justify-center items-center me-4  text-md"><PiUsersThreeLight className="me-1 text-2xl text-gray-400"></PiUsersThreeLight ></Link>
                                <Link to='/' className="flex justify-center items-center me-4 text-md"><AiOutlineMessage className="me-1 text-2xl text-gray-400"></AiOutlineMessage ></Link>
                                <Link to='/' className="flex justify-center items-center me-4 text-md"><IoMdNotificationsOutline className=" text-2xl text-gray-400"></IoMdNotificationsOutline ></Link>
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