import { useAuth } from '../Store/Auth';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/UI/Loader'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
