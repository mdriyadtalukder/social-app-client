import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../../firebase.config";
import { getCurrentUser } from "../../rtk_query/features/users/usersSlice";
import toast from "react-hot-toast";

const InputModal = ({ myName, myEmail, myPassword }) => {
    const { user } = useSelector((state) => state.users);
    const auth = getAuth(app);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(myEmail);
    const [email, setEmail] = useState(myEmail);
    const [passwords, setPasswords] = useState('');
    const handleName = (e) => {
        e.preventDefault();
        if (name) {
            updateProfile(auth.currentUser, {
                displayName: name, photoURL: user?.photoURL
            }).then(() => {
                // users = JSON.parse(users);

                // // Step 3: Update the name property
                // users.photoURL = photo; // Replace 'New Name' with the new name you want to set

                // // Step 4: Convert the updated object back to a string and store it in localStorage
                // localStorage.setItem('user', JSON.stringify(users));
                dispatch(getCurrentUser(auth.currentUser));
                window.location.href = '/settings';
                toast.success("name updated!");


            }).catch((error) => {
                toast.error(error)
            });
        }
        else {
            toast.error("Something went wrong!");

        }
    }

    const handleEmail = (e) => {
        e.preventDefault();

        if (email) {
            updateEmail(auth.currentUser, email).then(() => {
                dispatch(getCurrentUser(auth.currentUser));
                window.location.href = '/settings';
                toast.success("email updated!");
            }).catch((error) => {
                toast.error(error)

            });
        } else {
            toast.error("Something went wrong!");

        }
    }
    const handlePassword = (e) => {
        e.preventDefault();

        if (passwords) {
            updatePassword(auth.currentUser, passwords).then(() => {
                dispatch(getCurrentUser(auth.currentUser));
                window.location.href = '/settings';
                toast.success("password updated!");
            }).catch((error) => {
                toast.error(error)

            });
        } else {
            toast.error("Something went wrong!");

        }
    }
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
                                            Update User information
                                        </p>
                                    </div>
                                    <form onSubmit={myName
                                        ? handleName
                                        : myEmail
                                            ? handleEmail
                                            : handlePassword} className="mt-12">
                                        <input name="hidden" autoComplete="false" style={{ display: 'none' }} />
                                        <input name="_redirect" type="hidden" value="#" />

                                        <div className="space-y-3">
                                            {
                                                myName && <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-3 text-sm font-medium text-gray-500"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        onChange={(e) => setName(e.target.value)}
                                                        id="name"
                                                        name="text"
                                                        type="text"
                                                        defaultValue={myName}
                                                        placeholder="new name"
                                                        aria-placeholder="new name"
                                                        className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                    />
                                                </div>
                                            }
                                            {
                                                myEmail && <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-3 text-sm font-medium text-gray-500"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        id="email"
                                                        name="email"
                                                        defaultValue={myEmail}
                                                        type="email"
                                                        placeholder="new email"
                                                        aria-placeholder="Your email"
                                                        className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                    />
                                                </div>
                                            }

                                            {
                                                myPassword && <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-3 text-sm font-medium text-gray-500"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        onChange={(e) => setPasswords(e.target.value)}
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="new password"
                                                        aria-placeholder="Your password"
                                                        className="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xs"
                                                    />
                                                </div>
                                            }



                                            <button
                                                type="submit"
                                                className="flex  w-full items-center justify-center h-10 px-4 py-2 text-base font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 hover:to-blue-500 shadow-button  ring-offset-gray-200 hover:shadow-none"

                                            >
                                                Change
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

export default InputModal;