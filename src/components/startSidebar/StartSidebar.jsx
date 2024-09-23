import Ads from '../ads/Ads';
import Profile from '../profile/Profile';
import Sidebar from '../sidebar/Sidebar';

const StartSidebar = () => {
    return (
        <>
            <Profile></Profile>\
            <div className="mt-0">
            <Sidebar></Sidebar>
            </div>
            
            <Ads></Ads>
        </>
    );
};

export default StartSidebar;