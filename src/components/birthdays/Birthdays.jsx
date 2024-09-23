import { FaGift } from "react-icons/fa";

const Birthdays = () => {
    return (
        <div className="max-w-md mx-auto mt-5 bg-white rounded-lg overflow-hidden md:max-w-lg shadow-md">
            <div className="px-4 py-2 ">
                <h2 className="font-semibold text-gray-400">Birthdays</h2>
            </div>
            <div className="flex flex-col divide-y divide-gray-200">
                <div className="flex items-center py-4 px-6">
                    <img className="w-10 h-10 object-cover rounded-full" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="Product Image" />
                    <div className="ml-3">
                        <h3 className="text-gray-900 font-semibold">John Cane</h3>

                    </div>
                    <button className="ml-auto py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                        Celerate
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between px-6 p-3 ">
                <div className="flex w-full rounded-lg items-center py-4 px-6 bg-gray-100">
                    < FaGift className="text-lg text-purple-400"></FaGift>
                    <div className="ml-3">
                        <h3 className="text-gray-500 text-sm font-semibold">Upcoming birthday</h3>
                        <p className="text-gray-400 text-xs mt-1">See other 16 have upcoming birthday</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Birthdays;