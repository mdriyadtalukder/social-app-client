import Ads from "../ads/Ads";
import Birthdays from "../birthdays/Birthdays";
import FriendRequests from "../friendRequests/FriendRequests";
import Users from "../users/Users";

const EndSidebar = () => {
    return (
        <>
            <FriendRequests></FriendRequests>
            <Birthdays></Birthdays>
            <Ads></Ads>
            <Users></Users>
        </>
    );
};

export default EndSidebar;