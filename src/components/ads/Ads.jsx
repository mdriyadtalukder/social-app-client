import { BiDotsHorizontalRounded } from "react-icons/bi";

const Ads = () => {
    return (
        <div className="relative mt-5 flex w-full  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="flex justify-between items-center mx-3 mt-3">
                <p className="font-semibold text-gray-400">Sponsored Ads</p>
                <BiDotsHorizontalRounded className="text-2xl text-gray-600 cursor-pointer"></BiDotsHorizontalRounded>

            </div>
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover w-full" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
            </a>
            <div className=" mx-3 mt-3">
                <div className="flex items-center gap-4">
                    <img className="w-8 h-8 object-cover rounded-full" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Product Image" />
                    <a href="#">
                        <h5 className="text-lg tracking-tight text-blue-400">BigChef Lounge</h5>
                    </a>
                </div>
                <p className="my-2 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur repellendus autem consequuntur perspiciati!</p>
                <a href="#" className="flex items-center justify-center rounded-md bg-gray-200 mb-3 px-5 py-2.5 text-center text-sm font-medium text-black  focus:outline-none focus:ring-4 focus:ring-blue-300">Learn More</a>

            </div>
        </div>
    );
};

export default Ads;