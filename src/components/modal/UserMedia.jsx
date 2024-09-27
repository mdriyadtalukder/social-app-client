import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { useGetAUserQuery, useGetPostQuery } from '../../rtk_query/features/users/usersApi';
import Loading from '../loading/Loading';

const UserMedia = () => {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetAUserQuery(id);
    const { data: mailData, isLoading: load, isError: isErr, error: er } = useGetPostQuery(data?.email);

    if (load || isLoading) {
        return <Loading></Loading>
    }
    let content;
    if ((!load && isErr) || isError) content = <p className='text-red-600 font-bold text-center'>{error?.status || er?.status || 'error!'}</p>
    if (!load && !isErr && maildata?.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No media found!!</p>
    if (!load && !isErr && maildata?.length > 0) {
        content = mailData?.filter(f => f?.image)?.map(d => <img key={d?._id} className="rounded-lg h-32 w-30" src={d?.image} alt="" />
        )
    }
    return (
        <div className="">
            <div className="flex justify-center">
                <span onClick={() => setOpen(true)}>
                    <span className="text-blue-400 text-sm cursor-pointer">See all</span>
                </span>

                {open && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        className="fixed inset-0 z-50 w-screen overflow-y-scroll border-2 "
                    >
                        {/* Overlay */}
                        <div
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-gray-500 bg-opacity-50"
                        ></div>

                        {/* Panel */}
                        <div className="relative flex min-h-screen items-center justify-center p-4 ">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full bg-white max-w-sm overflow-y-auto shadow-2xl  ring-1 ring-gray-200 rounded-3xl p-10"
                            >
                                <div className="relative">
                                    <div onClick={() => setOpen(false)} className="float-end cursor-pointer">
                                        <RxCross2 className="text-xl text-gray-400"></RxCross2>
                                    </div>

                                    <div className="px-4 pb-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
                                        {content}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default UserMedia;