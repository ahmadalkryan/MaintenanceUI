//import { createContext, useContext, useEffect, useState } from 'react';
//import { getCurrentUser, logout } from '../api/auth';

//const AuthContext = createContext();

//export function AuthProvider({ children }) {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const login = async (userData) => {
//        try {
//            // «” Œœ„ «·»Ì«‰«  «·„„——… „»«‘—… »œ·« „‰ Ã·»Â« „‰ «·Œ«œ„
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




import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
















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
//            console.log("API Response:", response); // ·· √ﬂœ „‰ «·ÂÌﬂ·

//            // «” Œ—«Ã «·»Ì«‰«  Õ”» ÂÌﬂ· «·«” Ã«»… «·›⁄·Ì
//            const token = response.Data.Token; // ·«ÕŸ response.Data Ê·Ì” response.data
//            const userData = {
//                role: response.Data.role || response.data?.role, 
//                userId: response.Data.userId,
//                department: response.Data.Department,
//                email: response.Data.Email,
//                fullName: response.Data.FullName
//            };

//            localStorage.setItem('authToken', token);
//            setUser(userData); // Â–« «·”ÿ— «·√Â„!

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

//            //  ”ÃÌ· «·œŒÊ· Ê«·Õ’Ê· ⁄·Ï token
//            const loginResponse = await apiLogin(username, password);
//            localStorage.setItem('authToken', loginResponse.token);

//            // Ã·» »Ì«‰«  «·„” Œœ„ »«” Œœ«„ token «·ÃœÌœ
//            const userData = await getCurrentUser();
//            setUser(userData);

//            return userData;
//        } catch (error) {
//            // ≈“«·… token ›Ì Õ«·… «·Œÿ√
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
//                // ≈“«·… token €Ì— ’«·Õ
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

//    // œ«·…  ”ÃÌ· «·œŒÊ· «·„ÊÕœ…
//    const login = async (username, password) => {
//        try {
//            // 1.  ”ÃÌ· «·œŒÊ· ⁄»— API
//            const response = await login(username, password);
//            localStorage.setItem('authToken', response.token);

//            // 2. Ã·» »Ì«‰«  «·„” Œœ„
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