import { BsCalendarDate } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { IoBagAddSharp } from "react-icons/io5";
import Modal from "../../modal/Modal";
import UserModal from "../../modal/UserModal";

const Info = ({ d, auser }) => {
    return (
        <div className=" max-w-xl mx-auto mt-5">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <h1 className="text-sm font-bold text-gray-400">User Information</h1>
                    <div className="flex gap-2">
                        {
                            auser ? <UserModal></UserModal> : <Modal></Modal>
                        }
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
                    <button className=" w-full block mx-auto rounded-lg bg-blue-500 hover:shadow-lg font-semibold text-white px-6 py-2">{d?.follow}</button>

                    <p className="text-red-600 float-end my-3 ">Block User</p>

                </div>

            </div>
        </div>
    );
};

export default Info;