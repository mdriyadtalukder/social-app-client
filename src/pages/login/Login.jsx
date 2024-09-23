import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../../firebase.config";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../rtk_query/features/users/usersSlice";
import SocialLogin from "../../components/social/SocialLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const auth = getAuth(app);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        setLoading(true)
        e.preventDefault();
        if (email && password && checkbox) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    dispatch(getCurrentUser(user))
                    navigate('/');
                    toast.success("Log in successfully!")
                })
                .catch((error) => {
                    setError(error?.message)
                });
        }
        else {

            toast.error('Something went wrong!')
        }
        setLoading(false);
    }
    return (
        <>
            {
                isLoading ? <Loading></Loading> : (
                    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600 max-w">
                                Or
                                <Link to='/signup' className="ms-1 font-medium text-blue-400 hover:text-blue-300">
                                    create an account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
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

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input onClick={() => setCheckbox(!checkbox)} id="remember_me" name="remember_me" type="checkbox"
                                                className="h-4 w-4 text-indigo-400 focus:ring-indigo-300 border-gray-300 rounded" />
                                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>
                                    {error && <p className="font-bold text-red-600 text-center">{error}</p>}
                                    <div>
                                        <button disabled={!email || !password || !checkbox} type="submit"
                                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md   focus:outline-none focus:ring-2 focus:ring-offset-2  ${!email || !password || !checkbox ? 'bg-gray-200' : 'bg-blue-400'} ${!email || !password || !checkbox ? 'hover:bg-gray-300' : 'hover:bg-blue-500'}
                                ${!email || !password || !checkbox ? 'text-black' : 'text-white'} ${!email || !password || !checkbox ? 'focus:ring-gray-200' : 'focus:ring-blue-400'}
                                
                                `}>

                                            Sign in
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

export default Login;