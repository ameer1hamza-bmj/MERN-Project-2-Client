import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null);
    const authorization = `Bearer ${token}`
    const API = import.meta.env.VITE_API_BASE_URI
    const IMAGE_URI = import.meta.env.VITE_IMAGE_BASE_URI



    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        setIsLoading(false)
    }, []);

    const storeToken = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken);
    }

    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null)
    };

    const userAuthorization = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${API}/api/auth/profile`, {
                headers: {
                    Authorization: authorization
                }

            })
            setUser(res.data.profile)
            setIsLoading(false)

        } catch (error) {
            console.error('Error fetching user profile:', error);
            setIsLoading(false)
            setUser(null);
        }
    }


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setIsLoading(false); // ← only if no token
        }
    }, []);

    useEffect(() => {
        if (token) {
            userAuthorization();
        }
    }, [token])



    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, storeToken, token, logoutUser, isLoading, user, authorization, API, userAuthorization, IMAGE_URI }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}