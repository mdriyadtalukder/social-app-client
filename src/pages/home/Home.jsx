import AddPost from "../../components/addPost/AddPost";
import EndSidebar from "../../components/endSidebar/EndSidebar";
import Feeds from "../../components/feeds/Feeds";
import StartSidebar from "../../components/startSidebar/StartSidebar";
import Stories from "../../components/stories/Stories";

const Home = () => {
    return (
        <div className="pt-4 px-4 bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5  mx-auto">

            <div className="lg:col-span-2 me-5 hidden lg:block md:block md:col-span-2">

                <StartSidebar></StartSidebar>
            </div>
            <div className="lg:col-span-4 md:col-span-3 ">
                <Stories></Stories>
                <AddPost></AddPost>
                <Feeds></Feeds>
            </div>
            <div className=" lg:col-span-3 ms-5  hidden lg:block">
                <EndSidebar></EndSidebar>

            </div>
        </div>
    );
};

export default Home;