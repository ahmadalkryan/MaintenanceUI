// src/components/RedirectToDashboard.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RedirectToDashboard = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to="/" replace />;
};

export default RedirectToDashboard;