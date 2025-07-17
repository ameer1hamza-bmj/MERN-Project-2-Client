import { useAuth } from '../Store/Auth';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/UI/Loader'

const AdminRoute = ({ children }) => {
    const { isLoggedIn, isLoading, user } = useAuth();




    if (isLoading || (isLoggedIn && !user)) {
        return <Loader />;
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    if (!user || !user?.isAdmin) {
        return <Navigate to={'/'} replace />
    }

    return children;
};

export default AdminRoute;
