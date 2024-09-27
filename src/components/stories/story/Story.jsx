import StorySwipers from "../storySwipers/StorySwipers";
import { useState } from "react";

const Story = ({ d }) => {
    const [modal, setModal] = useState(false);
    return (
        <>
            <div onClick={() => setModal(!modal)} className=" flex  flex-col gap-2 justify-center items-center cursor-pointer">
                <img className={`h-[80px] w-[80px] rounded-full ${d?.stories?.length > 0 && 'border-2 '}  ${d?.stories?.length > 0 && ' border-blue-500'}`} src={d?.userPhoto} alt="" />
                <p className="font-medium text-sm cursor-pointer">{d?.name}</p>
            </div>
            {
                (modal && d?.stories?.length > 0) && <StorySwipers setModal={setModal} d={d?.stories}></StorySwipers>
            }

        </>

    );
};

export default Story;