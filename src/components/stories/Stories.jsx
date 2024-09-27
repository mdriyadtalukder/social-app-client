import Story from "./story/Story";
import img from '../../assets/add.png';
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAddStoryMutation, useGetBlocksQuery, useGetFollowingsstoryQuery, useGetStoryQuery, useUpdateStoryMutation } from "../../rtk_query/features/users/usersApi";
import Loading from "../loading/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Stories = () => {
    const [file, setFile] = useState();
    const { user } = useSelector((state) => state.users);
    const { data: stories, isLoading: loading, error: err } = useGetStoryQuery(user?.email);
    const [addStory, { isLoading, error }] = useAddStoryMutation();
    const [updateStory, { isLoading: load, error: er }] = useUpdateStoryMutation();
    const { data, isLoading: loads, isError, error: ers } = useGetFollowingsstoryQuery(user?.email);
    const { data: block ,isLoading:loadss} = useGetBlocksQuery(user?.email);



    if (isLoading || loading || load || loads || loadss) {
        return <Loading></Loading>
    }

    let content;
    if (!loads && isError) content = <p className='text-red-600 font-bold text-center'>{ers?.status}</p>
    if (!loads && !isError && data.length === 0) content = <p className='text-blue-400 font-bold  text-center'>No story found!!</p>
    if (!loads && !isError && data.length > 0) {
        content = data.filter((item) => {
            // Check if the item.email is not in the block.blocked array
            return !block?.some((b) => b?.blocked === item?.email );
        }).map(d => <Story key={d?._id} d={d}></Story>
        )
    }

    const handleStory = async (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0]; // Access the file directly from the event
        setFile(selectedFile)

        if (selectedFile && !error && !err && !er && !ers) {
            const data = new FormData();
            data.append('image', selectedFile);

            try {
                const res = await axios.post(image_hosting_api, data);
                const photo = res?.data?.data?.display_url;


                if (stories) {
                    updateStory({
                        id: stories?._id,
                        data: {
                            stories: [...stories?.stories, photo],

                        }
                    })
                    toast.success("story uploaded!!")
                }
                else {
                    addStory({
                        stories: [photo],
                        name: user?.displayName,
                        email: user?.email,
                        userPhoto: user?.photoURL,
                        date: new Date()
                    })
                    toast.success("story uploaded!!")
                }
                setFile('')

            } catch (error) {
                toast.error(error)
            }
        } else {
            //
        }
    };




    return (
        <div id="stories" className="bg-white p-8 rounded-lg shadow-md overflow-scroll scrollbar-hide">
            <div className="flex w-max gap-3">
                <div className=" flex flex-col gap-2 justify-center items-center cursor-pointer relative">
                    <label htmlFor="fileInput" className="flex items-center gap-2 cursor-pointer">
                        <img className="h-[80px] w-[80px] rounded-full opacity-50 " src={file ? URL?.createObjectURL(file) : ''} alt="" />
                        <img className={`h-[80px] w-[80px] rounded-full absolute top-0 ${!file && 'bg-blue-50'}`} src={img} alt="" />
                    </label>

                    <input
                        onChange={handleStory}
                        id="fileInput"
                        name="image"
                        type="file"
                        className="hidden"

                    />
                    <p className="font-medium text-sm">My story</p>
                </div>
                {content}
            </div>
        </div>
    );
};

export default Stories;