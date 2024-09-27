import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { IoMdClose } from "react-icons/io";

const StorySwipers = ({ d, setModal }) => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    var c = 0;

    const onAutoplayTimeLeft = (s, time, progress) => {
        c = c + 1

        if (c >= Number(d?.length * 300)) {
            progressContent.current.textContent = "Done";
            setModal(false);
            return 0;

        }
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        console.log(c)


    };
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                    stopOnLastSlide: true
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper bg-blue-100 rounded-lg fixed  top-10 h-[500px] w-[500px]"
            >
                <span onClick={() => setModal(false)} className="absolute top-0 right-2 flex items-center z-10">
                    <IoMdClose className="text-2xl text-gray-500 cursor-pointer"></IoMdClose>
                </span>
                {
                    d?.map(dt => <SwiperSlide key={dt} className="h-[400px] w-[400px] rounded-lg flex justify-center items-center">
                        <img className="h-[350px] w-[350px] rounded-lg" src={dt} alt="" />
                    </SwiperSlide>)
                }
                {/* Repeat SwiperSlide as necessary */}

                {/* Autoplay Progress Timer */}
                <div className="absolute bottom-0 left-2 flex items-center z-10"> {/* Position fixed on top-left of swiper */}
                    <svg viewBox="0 0 48 48" ref={progressCircle} className="w-2 h-2"> {/* Set a visible size for the timer */}
                    </svg>
                    <span ref={progressContent} className="text-blue-600 font-bold text-sm"></span> {/* Timer content */}
                </div>
            </Swiper>

        </>
    );
};

export default StorySwipers;