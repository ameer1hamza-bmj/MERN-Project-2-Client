import { useEffect } from 'react'
import { useAuth } from '../Store/Auth'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Logout = () => {

    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
        toast.success('Logged out successfully!');
        navigate('/login');
    }, [])
    return null;
}

export default Logout
