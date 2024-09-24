import FriendRequests from "../../components/friendRequests/FriendRequests";

const Requests = () => {
    return (
        <div className="pt-4 px-4 bg-blue-50 h-max lg:grid lg:grid-cols-9 lg:g-4 lg:w-[88%] md:grid md:grid-cols-5  mx-auto">

            <div className="lg:col-span-2 me-5 hidden lg:block">


            </div>
            <div className="lg:col-span-4 md:col-span-3 h-screen bg-blue-50 ">
                <FriendRequests all></FriendRequests>
            </div>
            <div className=" lg:col-span-2 ms-5  hidden lg:block">


            </div>
        </div>
    );
};

export default Requests;