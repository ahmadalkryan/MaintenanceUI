
//import { createContext, useState, useEffect } from 'react';


//export const AuthContext = createContext();

//export const AuthProvider = ({ children }) => {
//    const [isAuthenticated, setIsAuthenticated] = useState(
//        !!localStorage.getItem('token')
//    );



//    useEffect(() => {
//        const handleStorageChange = () => {
//            setIsAuthenticated(!!localStorage.getItem('token'));
//        };
//        window.addEventListener('storage', handleStorageChange);
//        return () => window.removeEventListener('storage', handleStorageChange);
//    }, []);

//    return (
//        <AuthContext.Provider value={{
//            isAuthenticated,
//            setIsAuthenticated,

//        }}>
//            {children}
//        </AuthContext.Provider>
//    );
//};


// src/contexts/AuthContext.js ******************

//import { createContext, useState, useEffect } from 'react';
//import { NotificationProvider } from './NotificationContext';

//export const AuthContext = createContext();

//export const AuthProvider = ({ children }) => {
//    const [isAuthenticated, setIsAuthenticated] = useState(
//        !!localStorage.getItem('token')
//    );

//    useEffect(() => {
//        const handleStorageChange = () => {
//            setIsAuthenticated(!!localStorage.getItem('token'));
//        };

//        window.addEventListener('storage', handleStorageChange);
//        return () => window.removeEventListener('storage', handleStorageChange);
//    }, []);

//    return (
//        <AuthContext.Provider value={{
//            isAuthenticated,
//            setIsAuthenticated,
//        }}>
//            <NotificationProvider>
//                {children}
//            </NotificationProvider>
//        </AuthContext.Provider>
//    );
//};





//import { createContext, useState, useContext, useEffect } from 'react';

//// src/contexts/AuthContext.jsx


//// ✅ تعريف الـ Context
//export const AuthContext = createContext();

//// ✅ دالة مخصصة لاستخدام الـ Auth
//export const useAuth = () => {
//    const context = useContext(AuthContext);
//    if (!context) {
//        throw new Error('useAuth must be used within AuthProvider');
//    }
//    return context;
//};

//// ✅ Provider
//export const AuthProvider = ({ children }) => {
//    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
//    const [role, setRole] = useState(localStorage.getItem('role'));
//    const [userId, setUserId] = useState(localStorage.getItem('userId'));
//    const [isLoading, setIsLoading] = useState(true);

//    useEffect(() => {
//        const token = localStorage.getItem('token');
//        const role = localStorage.getItem('role');
//        const userId = localStorage.getItem('userId');

//        setIsAuthenticated(!!token);
//        setRole(role);
//        setUserId(userId);
//        setIsLoading(false);

//        const handleStorageChange = () => {
//            const newToken = localStorage.getItem('token');
//            setIsAuthenticated(!!newToken);
//            setRole(localStorage.getItem('role'));
//            setUserId(localStorage.getItem('userId'));
//        };

//        window.addEventListener('storage', handleStorageChange);
//        return () => window.removeEventListener('storage', handleStorageChange);
//    }, []);

//    const logout = () => {
//        localStorage.removeItem('token');
//        localStorage.removeItem('role');
//        localStorage.removeItem('userId');
//        localStorage.removeItem('userName');
//        setIsAuthenticated(false);
//        setRole(null);
//        setUserId(null);
//        window.location.href = '/login';
//    };

//    // ✅ لا تُرجع أي شيء من الـ Provider
//    return (
//        <AuthContext.Provider value={{
//            isAuthenticated,
//            role,
//            userId,
//            isLoading,
//            logout
//        }}>
//            {children}
//        </AuthContext.Provider>
//    );
//};


// src/contexts/AuthContext.jsx
// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

// ✅ أنشئ AuthContext بقيمة افتراضية تحتوي على دوال وهمية
const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { }, // دالة وهمية لتجنب الخطأ
    role: null,
    userId: null
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');

        setIsAuthenticated(!!token);
        setRole(role);
        setUserId(userId);
        setIsLoading(false);

        const handleStorageChange = () => {
            const newToken = localStorage.getItem('authToken');
            setIsAuthenticated(!!newToken);
            setRole(localStorage.getItem('role'));
            setUserId(localStorage.getItem('userId'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
        setRole(null);
        setUserId(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            role,
            userId,
            isLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};


//import { createContext, useContext, useEffect, useState } from 'react';
//import { getCurrentUser, logout } from '../api/auth';

//const AuthContext = createContext();

//export function AuthProvider({ children }) {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const login = async (userData) => {
//        try {
//            // استخدم البيانات الممررة مباشرة بدلاً من جلبها من الخادم
//            setUser(userData);
//            return userData;
//        } catch (error) {
//            throw error;
//        }
//    };
//    const login = async (credentials) => {
//        try {
//            const userData = await getCurrentUser();
//            setUser(userData);
//            return userData;
//        } catch (error) {
//            throw error;
//        }
//    };

//    const handleLogout = async () => {
//        await logout();
//        setUser(null);
//        localStorage.removeItem('authToken');
//    };

//    useEffect(() => {
//        const fetchUser = async () => {
//            try {
//                const token = localStorage.getItem('authToken');
//                if (token) {
//                    const userData = await getCurrentUser();
//                    setUser(userData);
//                }
//            } catch (error) {
//                console.error('Failed to fetch user', error);
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchUser();
//    }, []);

//    const isEmployee = user?.role === 'Employee';
//    const isMaintenance = user?.role === 'Maintenance';
//    const isAdmin = user?.role === 'Admin';

//    return (
//        <AuthContext.Provider value={{
//            user,
//            loading,
//            login,
//            logout: handleLogout,
//            isEmployee,
//            isMaintenance,
//            isAdmin
//        }}>
//            {children}
//        </AuthContext.Provider>
//    );
//}

//export const useAuth = () => useContext(AuthContext);













//import { createContext, useContext, useEffect, useState } from 'react';
//import {login, getCurrentUser, logout } from '../api/auth';

//const AuthContext = createContext();


//export function AuthProvider  ({ children })  {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);

//    const authLogin = async (username, password) => {
//        try {
//            const response = await login(username, password);
//            localStorage.setItem('authToken', response.token);

//            const userData = await getCurrentUser();
//            setUser(userData);
//            return userData;
//        } catch (error) {
//            throw error;
//        }
//    };



//    const handleLogout = async () => {
//        try {
//            await logout();
//            setUser(null);
//            localStorage.removeItem('authToken');
//        } catch (error) {
//            console.error('Logout failed:', error);
//        }
//    };
//    useEffect(() => {
//        const fetchUser = async () => {
//            try {
//                const token = localStorage.getItem('authToken');
//                if (token) {
//                    const userData = await getCurrentUser();
//                    setUser(userData);
//                }
//            } catch (error) {
//                console.error('Failed to fetch user', error);
//            } finally {
//                setLoading(false);
//            }
//        };
//        fetchUser();
//    }, []);


//    const isEmployee = user?.role === 'Employee';
//    const isMaintenance = user?.role === 'Maintenance';
//    const isAdmin = user?.role === 'Admin';

//    return (
//        <AuthContext.Provider value={{
//            user,
//            loading,
//            login,
//            logout: handleLogout,
//            isEmployee: user?.role === 'Employee',
//            isMaintenance: user?.role === 'Maintenance',
//            isAdmin: user?.role === 'Admin'
//        }}>
//            {children}
//        </AuthContext.Provider>
//    );
//}

//export const useAuth = () => useContext(AuthContext);





















//import { createContext, useContext, useEffect, useState } from 'react';
//import { login as apiLogin, getCurrentUser, logout as apiLogout } from '../api/auth';

//const AuthContext = createContext();

//export function AuthProvider({ children }) {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    const authLogin = async (username, password) => {
//        try {
//            setError(null);
//            setLoading(true);

//            const response = await apiLogin(username, password);
//            console.log("API Response:", response); // للتأكد من الهيكل

//            // استخراج البيانات حسب هيكل الاستجابة الفعلي
//            const token = response.Data.Token; // لاحظ response.Data وليس response.data
//            const userData = {
//                role: response.Data.role || response.data?.role, 
//                userId: response.Data.userId,
//                department: response.Data.Department,
//                email: response.Data.Email,
//                fullName: response.Data.FullName
//            };

//            localStorage.setItem('authToken', token);
//            setUser(userData); // هذا السطر الأهم!

//            return userData;
//        } catch (error) {
//            localStorage.removeItem('authToken');
//            setError(error.response?.data?.Message || 'Login failed. Please check your credentials.');
//            throw error;
//        } finally {
//            setLoading(false);
//        }
//    };

//    const handleLogout = async () => {
//        try {
//            setLoading(true);
//            await apiLogout();
//            setUser(null);
//            localStorage.removeItem('authToken');
//        } catch (error) {
//            console.error('Logout failed:', error);
//            setError('Logout failed. Please try again.');
//        } finally {
//            setLoading(false);
//        }
//    };

//    const hasPermission = (requiredRole) => {
//        if (!user) return false;
//        return user.role === requiredRole;
//    };

//    useEffect(() => {
//        const fetchUser = async () => {
//            try {
//                setLoading(true);
//                const token = localStorage.getItem('authToken');

//                if (token) {
//                    const userData = await getCurrentUser();
//                    setUser(userData);
//                }
//            } catch (error) {
//                localStorage.removeItem('authToken');
//                setError('Failed to fetch user data. Please login again.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchUser();
//    }, []);

//    return (
//        <AuthContext.Provider value={{
//            user,
//            loading,
//            error,
//            login: authLogin,
//            logout: handleLogout,
//            hasPermission,
//            isEmployee: user?.role === 'Employee'
//        }}>
//            {children}
//        </AuthContext.Provider>
//    );
//}

//export const useAuth = () => useContext(AuthContext);























//import { createContext, useContext, useEffect, useState } from 'react';
//import { login as apiLogin, getCurrentUser, logout as apiLogout } from '../api/auth';

//const AuthContext = createContext();

//export function AuthProvider({ children }) {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    const authLogin = async (username, password) => {
//        try {
//            setError(null);
//            setLoading(true);

//            // تسجيل الدخول والحصول على token
//            const loginResponse = await apiLogin(username, password);
//            localStorage.setItem('authToken', loginResponse.token);

//            // جلب بيانات المستخدم باستخدام token الجديد
//            const userData = await getCurrentUser();
//            setUser(userData);

//            return userData;
//        } catch (error) {
//            // إزالة token في حالة الخطأ
//            localStorage.removeItem('authToken');
//            setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
//            throw error;
//        } finally {
//            setLoading(false);
//        }
//    };

//    const handleLogout = async () => {
//        try {
//            setLoading(true);
//            await apiLogout();
//            setUser(null);
//            localStorage.removeItem('authToken');
//        } catch (error) {
//            console.error('Logout failed:', error);
//            setError('Logout failed. Please try again.');
//        } finally {
//            setLoading(false);
//        }
//    };

//    const hasPermission = (requiredRole) => {
//        if (!user) return false;

//        const roleHierarchy = {
//            'Admin': ['Admin', 'Maintenance', 'Employee'],
//            'Maintenance': ['Maintenance', 'Employee'],
//            'Employee': ['Employee']
//        };

//        return roleHierarchy[user.role]?.includes(requiredRole) || false;
//    };

//    useEffect(() => {
//        const fetchUser = async () => {
//            try {
//                setLoading(true);
//                const token = localStorage.getItem('authToken');

//                if (token) {
//                    const userData = await getCurrentUser();
//                    setUser(userData);
//                }
//            } catch (error) {
//                console.error('Failed to fetch user data', error);
//                // إزالة token غير صالح
//                localStorage.removeItem('authToken');
//                setError('Failed to fetch user data. Please login again.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchUser();
//    }, []);

//    return (
//        <AuthContext.Provider value={{
//            user,
//            loading,
//            error,
//            login: authLogin,
//            logout: handleLogout,
//            hasPermission,
//            isEmployee: user?.role === 'Employee',
//            isMaintenance: user?.role === 'Maintenance',
//            isAdmin: user?.role === 'Admin'
//        }}>
//            {children}
//        </AuthContext.Provider>
//    );
//}

//export const useAuth = () => useContext(AuthContext);









































//export function AuthProvider({ children }) {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);

//    // دالة تسجيل الدخول الموحدة
//    const login = async (username, password) => {
//        try {
//            // 1. تسجيل الدخول عبر API
//            const response = await login(username, password);
//            localStorage.setItem('authToken', response.token);

//            // 2. جلب بيانات المستخدم
//            const userData = await getCurrentUser();
//            setUser(userData);

//            return userData;
//        } catch (error) {
//            throw error;
//        }
//    };






//const handleLogout = async () => {
//    await logout();
//    setUser(null);
//    localStorage.removeItem('authToken');
//};