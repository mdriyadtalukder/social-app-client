import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user } = useSelector((state) => state.users)

    const location = useLocation();
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>

};

export default PrivateRouter;