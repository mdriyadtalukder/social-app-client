import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { app } from "../../../firebase.config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../rtk_query/features/users/usersSlice";
import SocialLogin from "../../components/social/SocialLogin";
import { useAddUserMutation } from "../../rtk_query/features/users/usersApi";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const auth = getAuth(app)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [addUser, { isLoading: loading }] = useAddUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        setLoading(true);
        e.preventDefault();
        const forms = new FormData(e.target);
        const image = forms.get('image');
        const data = new FormData();
        data.append('image', image)
        const res = await axios.post(image_hosting_api, data)
        const photo = res?.data?.data?.display_url;

        if (email && password && name && checkbox) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: photo
                    }).then(() => {
                        dispatch(getCurrentUser(auth.currentUser));
                        addUser({
                            name: auth?.currentUser?.displayName,
                            email: auth?.currentUser?.email,
                            image: auth?.currentUser?.photoURL,
                            post: 0,
                            followers: [],
                            following: [],
                            live: "",
                            school: "",
                            work: "",
                            link: "",
                            join: new Date(),
                            follow: "Follow",
                            start: [],
                            des:""

                        });
                        navigate('/');
                        toast.success('Created account Successfully!');
                        setLoading(false);

                    }).catch((error) => {
                        setLoading(false);
                        setError(error?.message)
                    });
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error?.message)
                });
        }
        else {
            setLoading(false);
            toast.error('Something went wrong!')
        }


    }
    return (
        <>
            {
                (isLoading || loading) ? <Loading></Loading> : (
                    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Sign up! Already have account?
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600 max-w">
                                Then
                                <Link to='/login' className="ms-1 font-medium text-blue-400 hover:text-blue-300">
                                    Login                    </Link>
                            </p>
                        </div>

                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <form onSubmit={handleSignup} className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <div className="mt-1">
                                            <input onChange={(e) => setName(e.target.value)} id="name" name="name" type="text" autoComplete="name" required
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter your name" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter your email address" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter your password" />
                                        </div>
                                    </div>

                                    <div className="max-w-sm">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Your photo
                                        </label>
                                        <div className="relative z-0 mt-0.5 flex w-full -space-x-px">
                                            <input id="example1" name='image' type="file" className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0  file:bg-blue-400 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500 focus:outline-none disabled:pointer-events-none disabled:opacity-60" required />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input onClick={() => setCheckbox(!checkbox)} id="remember_me" name="remember_me" type="checkbox"
                                                className="h-4 w-4 text-indigo-400 focus:ring-indigo-300 border-gray-300 rounded" />
                                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                    </div>
                                    {error && <p className="font-bold text-red-600 text-center">{error}</p>}
                                    <div>
                                        <button disabled={!email || !password || !checkbox || !name} type="submit"
                                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md   focus:outline-none focus:ring-2 focus:ring-offset-2  ${!email || !password || !checkbox || !name ? 'bg-gray-200' : 'bg-blue-400'} ${!email || !password || !checkbox || !name ? 'hover:bg-gray-300' : 'hover:bg-blue-500'}
                                ${!email || !password || !checkbox || !name ? 'text-black' : 'text-white'} ${!email || !password || !checkbox || !name ? 'focus:ring-gray-200' : 'focus:ring-blue-400'}
                                
                                `}>

                                            Sign up
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-6">

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-gray-100 text-gray-500">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    <SocialLogin setError={setError}></SocialLogin>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

        </>


    );
};

export default SignUp;