import Sidebar from "../../components/sidebar/Sidebar";
import img from '../../assets/empty.png';
import InputModal from "../../components/modal/InputModal";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCamera } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { deleteUser, getAuth, updateProfile } from "firebase/auth";
import { app } from "../../../firebase.config";
import toast from "react-hot-toast";
import { getCurrentUser } from "../../rtk_query/features/users/usersSlice";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Settings = () => {
    const { user } = useSelector((state) => state.users);
    const [file, setFile] = useState();
    const auth = getAuth(app);
    //let users = localStorage.getItem('user');
    const dispatch = useDispatch();



    const handleImageUpdate = async (e) => {
        e.preventDefault();
        const forms = new FormData(e.target);
        const image = forms.get('image');
        const data = new FormData();
        data.append('image', image)
        const res = await axios.post(image_hosting_api, data)
        const photo = res?.data?.data?.display_url;
        if (photo && users) {
            updateProfile(auth.currentUser, {
                displayName: user?.displayName, photoURL: photo
            }).then(() => {
                // users = JSON.parse(users);

                // // Step 3: Update the name property
                // users.photoURL = photo; // Replace 'New Name' with the new name you want to set

                // // Step 4: Convert the updated object back to a string and store it in localStorage
                // localStorage.setItem('user', JSON.stringify(users));
                dispatch(getCurrentUser(auth.currentUser));
                window.location.href = '/settings';
                toast.success("photo updated!");


            }).catch((error) => {
                toast.error(error)
            });
        }
        else {
            toast.error("Something went wrong!")

        }
    }
    const handleDelete = () => {
        deleteUser(auth.currentUser).then(() => {
            localStorage.clear();
            window.location.href = '/login';
            toast.success("deleted account");
            // User deleted.
        }).catch((error) => {
            toast.error(error)

        });
    }
    return (

        <div className="bg-blue-50 h-screen lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5 mx-auto pb-4">

            <div className="lg:col-span-2 me-5 hidden lg:block md:block md:col-span- mt-4">
                <Sidebar></Sidebar>
            </div>
            <div className="lg:col-span-4 md:col-span-3 mt-4 bg-white rounded-lg shadow-md">
                <div className="py-2">
                    <form onSubmit={handleImageUpdate} action="" className="text-center my-3">
                        <div className=" flex relative flex-col justify-center items-center border-4 border-white rounded-full overflow-hidden">

                            <label htmlFor="fileInput" className="flex items-center gap-2 cursor-pointer">
                                <img className="object-cover  w-32 h-32 rounded-full  object-center " src={file ? URL?.createObjectURL(file) : user?.photoURL || img} alt='Woman looking front' />
                                <BiSolidCamera className="absolute text-blue-500 bottom-0 left-80  " />
                                <input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    id="fileInput"
                                    name="image"
                                    type="file"
                                    className="hidden"

                                />
                            </label>
                        </div>
                        {
                            file && <button className="bg-blue-500 p-1 rounded-lg text-xs text-white " type="submit">Save</button>
                        }
                    </form>

                    <div className=" flex flex-col ">
                        <hr />
                        <div className="flex bg-blue-50 justify-between p-4">

                            <div>
                                <p className="text-gray-500 text-sm font-bold">Name</p>
                                <p className="text-gray-500 text-sm">{user?.displayName}</p>
                            </div>
                            <InputModal myName={user?.displayName}></InputModal>

                        </div>
                        <hr />
                        <div className="flex bg-blue-50 justify-between p-4">

                            <div>
                                <p className="text-gray-500 text-sm font-bold">Email</p>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                            </div>
                            <InputModal myEmail={user?.email}></InputModal>

                        </div>
                        <hr />

                        <div className="flex bg-blue-50 justify-between p-4">

                            <p className="text-gray-500 text-sm font-bold">Change password</p>
                            <InputModal myPassword></InputModal>

                        </div>
                        <hr />
                        <p onClick={handleDelete} className="p-4 bg-blue-50 text-red-400 text-sm font-bold cursor-pointer">Delete account</p>

                    </div>
                </div>
            </div>
            <div className=" lg:col-span-3 ms-5  hidden lg:block">


            </div>
        </div>

    );
};

export default Settings;