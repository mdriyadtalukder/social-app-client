import Ads from "../../components/ads/Ads";
import UserFeeds from "../../components/feeds/UserFeeds";
import FriendRequests from "../../components/friendRequests/FriendRequests";
import Media from "../../components/media/Media";
import OneUser from "../../components/oneUser/OneUser";
import Sidebar from "../../components/sidebar/Sidebar";
import OneUserInfo from "../../components/userinfo/OneUserInfo";

const OneUserProfile = () => {
    return (
        <div className="pt-4 px-4 bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5  mx-auto">

            <div className="lg:col-span-2 me-5 hidden lg:block">
                <Sidebar></Sidebar>
                <Ads></Ads>

            </div>
            <div className="lg:col-span-4 md:col-span-3">
                <OneUser></OneUser>
                <UserFeeds></UserFeeds>
            </div>
            <div className=" lg:col-span-3 ms-5  hidden lg:block md:block md:col-span-2">
                <FriendRequests></FriendRequests>
                <OneUserInfo></OneUserInfo>
                <Media></Media>

            </div>
        </div>
    );
};

export default OneUserProfile;