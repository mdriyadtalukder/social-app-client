import Ads from "../../components/ads/Ads";
import Feeds from "../../components/feeds/Feeds";
import FriendRequests from "../../components/friendRequests/FriendRequests";
import Media from "../../components/media/Media";
import OwnMedia from "../../components/media/OwnMedia";
import MyProfile from "../../components/profile/myprofile/MyProfile";
import Sidebar from "../../components/sidebar/Sidebar";
import UserInfo from "../../components/userinfo/UserInfo";

const UserProfile = () => {
    return (
        <div className="pt-4 px-4 bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5  mx-auto">

            <div className="hidden lg:block lg:col-span-2 me-5">
                <Sidebar />
                <Ads />
            </div>

            <div className="lg:col-span-4 md:col-span-3">
                <MyProfile></MyProfile>
                <div className="block sm:hidden">
                    <UserInfo />
                    <OwnMedia></OwnMedia>

                </div>
                <Feeds></Feeds>
            </div>
            <div className=" lg:col-span-3 ms-5  hidden lg:block md:block md:col-span-2">
                <FriendRequests></FriendRequests>
                <UserInfo></UserInfo>
                <OwnMedia></OwnMedia>

            </div>
        </div>
    );
};

export default UserProfile;