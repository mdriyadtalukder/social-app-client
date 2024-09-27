import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../rtk_query/features/users/usersApi";
import Loading from '../loading/Loading'
import { Link } from "react-router-dom";
import img from '../../assets/empty.png'


const Profile = () => {
    const { user } = useSelector((state) => state?.users);
    const { data, isLoading, isError, error } = useGetUserQuery(user?.email)

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && !data) content = <p className='text-blue-400 font-bold  text-center'>No info found!!</p>
    if (!isLoading && !isError && data) {
        content = (<>
            <div className="text-center mt-2">
                <h2 className="font-semibold">{data?.name}</h2>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                    <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <div>{data?.start.length}</div>
                </li>
                <li className="flex flex-col items-center justify-between">
                    <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                    </svg>
                    <div>{data?.followers.length}</div>
                </li>

            </ul>
        </>)
    }
    return (
        <>
            {
                isLoading ? <Loading></Loading> :
                    (<div
                        className="max-w-2xl  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  bg-white shadow-md rounded-lg text-gray-900">
                        <div className="rounded-t-lg h-32 overflow-hidden">
                            <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                        </div>
                        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                            <img className="object-cover object-center h-32 w-full" src={user?.photoURL || img} alt='Woman looking front' />
                        </div>
                        {content}
                        <div className="p-4 mx-8 mt-2">
                            <Link to='/myprofile' className=" block mx-auto rounded-full bg-blue-500 hover:shadow-lg font-semibold text-white px-6 py-2 text-center">My profile</Link>
                        </div>
                    </div>)
            }

        </>
    );
};

export default Profile;