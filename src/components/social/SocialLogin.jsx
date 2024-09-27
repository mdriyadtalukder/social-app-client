import { FacebookAuthProvider, getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app } from "../../../firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { getCurrentUser } from "../../rtk_query/features/users/usersSlice";
import { useAddUserMutation } from "../../rtk_query/features/users/usersApi";
// eslint-disable-next-line react/prop-types
const SocialLogin = ({ setError }) => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const [addUser] = useAddUserMutation();

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                await addUser({
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
                    des: ""

                });
                dispatch(getCurrentUser(user));

                window.location.href = '/';
            }).catch((error) => {

                //const credential = GoogleAuthProvider.credentialFromError(error);
                setError(error?.message);
            });
    }

    const facebookLogin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;

                await addUser({
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
                    des: ""

                });
                dispatch(getCurrentUser(user));

                window.location.href = '/';
            })
            .catch((error) => {

                //const credential = FacebookAuthProvider.credentialFromError(error);
                setError(error?.message);
                // ...
            });

    }

    const twitterLogin = () => {
        const provider = new TwitterAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                //const credential = TwitterAuthProvider.credentialFromResult(result);
                //const token = credential.accessToken;
                //const secret = credential.secret;

                // The signed-in user info.
                const user = result.user;
                await addUser({
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
                    des: ""

                })
                dispatch(getCurrentUser(user));

                window.location.href = '/';
            }).catch((error) => {
                // Handle Errors here.

                // const credential = TwitterAuthProvider.credentialFromError(error);
                setError(error?.message);
            });
    }
    return (
        <div className="mt-6 grid grid-cols-3 gap-3">
            <div onClick={facebookLogin} className="cursor-pointer">
                <p
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img className="h-5 w-5" src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                        alt="" />
                </p>
            </div>
            <div onClick={twitterLogin} className="cursor-pointer">
                <p
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img className="h-5 w-5" src="https://img.icons8.com/fluent/30/000000/twitter.png"
                        alt="" />
                </p>
            </div>
            <div onClick={googleLogin} className="cursor-pointer">
                <p
                    className="w-full flex cursor-pointer items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img className="h-5 w-5" src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                        alt="" />
                </p>
            </div>
        </div>
    );
};

export default SocialLogin;