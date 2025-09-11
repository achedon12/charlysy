import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../../providers/AuthProvider.jsx";
import Loader from "../loader/Loader.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;