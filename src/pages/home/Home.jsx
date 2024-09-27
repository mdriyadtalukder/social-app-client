import { useSelector } from "react-redux";
import AddPost from "../../components/addPost/AddPost";
import EndSidebar from "../../components/endSidebar/EndSidebar";
import FollowingFeed from "../../components/feeds/FollowingFeed";
import StartSidebar from "../../components/startSidebar/StartSidebar";
import Stories from "../../components/stories/Stories";
import Suggestions from "../suggestions/Suggestions";

const Home = () => {
    const { search } = useSelector((state) => state?.users);

    return (
        <>{

            search ? <Suggestions></Suggestions> : (<div className="pt-4 px-4 bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5  mx-auto">

                <div className="lg:col-span-2 me-5 hidden lg:block md:block md:col-span-2">

                    <StartSidebar></StartSidebar>
                </div>
                <div className="lg:col-span-4 md:col-span-3 ">
                    <Stories></Stories>
                    <AddPost></AddPost>
                    <FollowingFeed></FollowingFeed>
                </div>
                <div className=" lg:col-span-3 ms-5  hidden lg:block">
                    <EndSidebar></EndSidebar>

                </div>
            </div>)
        }</>
    );
};

export default Home;