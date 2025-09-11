import {createContext, useEffect, useState} from "react";
import apiConfig from "./apiConfig.js";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await fetch(`${apiConfig.apiUrl}/auth/login`, {
            method: 'POST',
            headers: apiConfig.getHeaders(),
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            const data = await response.json();
            handleStoreData(data);
        }
    };

    const handleStoreData = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;