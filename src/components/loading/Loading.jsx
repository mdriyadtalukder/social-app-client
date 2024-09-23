import { PuffLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <PuffLoader size={100} color="#60a5fa" />
        </div>
    );
};

export default Loading;