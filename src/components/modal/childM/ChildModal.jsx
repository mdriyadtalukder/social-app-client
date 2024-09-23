import { useState } from "react";
import { useEditUserInfoMutation } from "../../../rtk_query/features/users/usersApi";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Loading from "../../loading/Loading";

const ChildModal = ({ d }) => {
    const [open, setOpen] = useState(false);
    const [editUserInfo, { isLoading: loading, error }] = useEditUserInfoMutation();
    const [des, setDes] = useState(d?.des);
    const [live, setLive] = useState(d?.live);
    const [school, setSchool] = useState(d?.school);
    const [work, setWork] = useState(d?.work);
    const [link, setLink] = useState(d?.link);

    const handlelink = (e) => {
        e.preventDefault();
        if (!error) {
            editUserInfo({
                id: d?._id,
                data: {
                    des, live, school, work, link
                }
            });
            setOpen(false);
            toast.success("Successfully updated!");
        }
        else {
            toast.error("Something went wrong!")
        }
        if (loading) {
            return <Loading></Loading>
        }

    };
    return (
        <div className="">
            <div className="flex justify-center">
                <span onClick={() => setOpen(true)}>
                    <FaRegEdit className="text-lg text-gray-500 cursor-pointer"></FaRegEdit>
                </span>

                {open && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        className="fixed inset-0 z-50 w-screen overflow-y-hidden"
                    >
                        {/* Overlay */}
                        <div
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-gray-500 bg-opacity-50"
                        ></div>

                        {/* Panel */}
                        <div className="relative flex min-h-screen items-center justify-center p-4">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-sm overflow-y-auto shadow-2xl bg-white ring-1 ring-gray-200 rounded-3xl p-10"
                            >
                                <div className="relative">
                                    <div onClick={() => setOpen(false)} className="float-end cursor-pointer">
                                        <RxCross2 className="text-xl text-gray-400"></RxCross2>
                                    </div>
                                    <div className="flex flex-col text-center">

                                        <p className="text-lg font-medium text-gray-500 lg:text-xl">
                                            Update your information
                                        </p>
                                    </div>
                                    <form onSubmit={handlelink} className="mt-12">
                                        <input name="hidden" autoComplete="false" style={{ display: 'none' }} />
                                        <input name="_redirect" type="hidden" value="#" />

                                        <div className="space-y-3">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-3 text-sm font-medium text-gray-500"
                                                >
                                                    Description
                                                </label>
                                                <input
                                                    onChange={(e) => setDes(e.target.value)}
                                                    id="name"
                                                    name="text"
                                                    type="text"
                                                    placeholder="Description?"
                                                    defaultValue={d?.des}
                                                    aria-placeholder="Your name"
                                                    className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-3 text-sm font-medium text-gray-500"
                                                >
                                                    Living in
                                                </label>
                                                <input
                                                    onChange={(e) => setLive(e.target.value)}
                                                    id="name"
                                                    name="text"
                                                    type="text"
                                                    placeholder="Living in?"
                                                    defaultValue={d?.live}
                                                    aria-placeholder="Your name"
                                                    className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-3 text-sm font-medium text-gray-500"
                                                >
                                                    Went to
                                                </label>
                                                <input
                                                    onChange={(e) => setSchool(e.target.value)}
                                                    id="name"
                                                    name="text"
                                                    type="text"
                                                    placeholder="Went to?"
                                                    defaultValue={d?.school}
                                                    aria-placeholder="Your name"
                                                    className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-3 text-sm font-medium text-gray-500 "
                                                >
                                                    Works at
                                                </label>
                                                <input
                                                    onChange={(e) => setWork(e.target.value)}
                                                    id="name"
                                                    name="text"
                                                    type="text"
                                                    placeholder="Works at?"
                                                    defaultValue={d?.work}
                                                    aria-placeholder="Your name"
                                                    className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="block mb-3 text-sm font-medium text-gray-500 "
                                                >
                                                    Link
                                                </label>
                                                <input
                                                    onChange={(e) => setLink(e.target.value)}
                                                    id="name"
                                                    name="text"
                                                    type="text"
                                                    placeholder="Type link here..."
                                                    defaultValue={d?.link}
                                                    aria-placeholder="Your name"
                                                    className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                />
                                            </div>



                                            <button
                                                type="submit"
                                                className="flex  w-full items-center justify-center h-10 px-4 py-2 text-base font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 hover:to-blue-500 shadow-button  ring-offset-gray-200 hover:shadow-none"

                                            >
                                                Update
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default ChildModal;