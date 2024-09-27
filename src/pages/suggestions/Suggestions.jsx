import Sidebar from "../../components/sidebar/Sidebar";
import Users from "../../components/users/Users";

const Suggestions = () => {
    return (
        <div className=" bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5 mx-auto">

            <div className="lg:col-span-2 me-5 hidden lg:block mt-5">

            <Sidebar></Sidebar>
            </div>
            <div className="lg:col-span-4 md:col-span-3 h-screen bg-blue-50 ">
                <Users all></Users>
            </div>
            <div className=" lg:col-span-2 ms-5  hidden lg:block">


            </div>
        </div>
    );
};

export default Suggestions;