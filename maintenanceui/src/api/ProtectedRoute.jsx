// src/components/ProtectedRoute.jsx
//import { Navigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';

//const ProtectedRoute = ({ children, allowedRoles }) => {
//    const { isAuthenticated, role } = useAuth();

//    if (!isAuthenticated) {
//        return <Navigate to="/login" replace />;
//    }

//    if (allowedRoles && !allowedRoles.includes(role)) {
//        return <Navigate to="/" replace />;
//    }

//    return children;
//};

//export default ProtectedRoute;

// src/components/ProtectedRoute.jsx


import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
