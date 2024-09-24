import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useAddPostMutation, useGetUserQuery, useUpdatePostNumberMutation } from "../../../rtk_query/features/users/usersApi";
import Loading from "../../loading/Loading";
import toast from "react-hot-toast";

const RepostModal = ({ d }) => {
    const [open, setOpen] = useState(false);
    const [write, setWrite] = useState('');
    const { user } = useSelector((state) => state?.users);
    const { data: postNumber, isLoading: loading, error: err } = useGetUserQuery(user?.email);
    const [updatePostNumber, { error: er }] = useUpdatePostNumberMutation();
    const [addPost, { isLoading, error }] = useAddPostMutation();
    console.log(d)
    if (loading || isLoading) {
        return <Loading></Loading>
    }

    const handleRepost = (e) => {

        e.preventDefault();
        if (!error && !err && !er) {
            addPost({
                name: d?.name,
                profile: d?.profile,
                image: d?.image || '',
                description: d?.description,
                date: new Date(),
                like: [],
                comment: [],
                share: [],
                email: user?.email,
                write: write,
                type:'repost'
            });
            updatePostNumber({
                id: postNumber?._id,
                data: {
                    post: Number(postNumber?.post) + 1,
                }
            })
            setWrite("");
            setOpen(false)
            toast.success("Successfully posted!")
        }
        else {
            toast.error("Something went wrong!")
        }
    }
    return (
        <div className="">
            <div className="flex justify-center">
                <span onClick={() => setOpen(true)}>
                    <p className="hover:bg-blue-50 w-full p-1 text-center rounded-md">Repost</p>

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
                                            Repost
                                        </p>
                                    </div>
                                    <form onSubmit={handleRepost} className="mt-12">
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
                                                    onChange={(e) => setWrite(e.target.value)}
                                                    id="name"
                                                    name="text"
                                                    type="text"
                                                    placeholder="write something?"
                                                    aria-placeholder="Your name"
                                                    className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="flex  w-full items-center justify-center h-10 px-4 py-2 text-base font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 hover:to-blue-500 shadow-button  ring-offset-gray-200 hover:shadow-none"

                                            >
                                                Repost
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

export default RepostModal;