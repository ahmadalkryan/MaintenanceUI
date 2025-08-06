
import api from './apiConfig';



// api/auth.js
//export const login = async (username, password) => {
//    try {
//        const response = await api.post('/Auth/Login', {
//            Name: username,
//            Password: password
//        });

//        if (!response.Data?.Token) {
//            throw new Error('Invalid response structure');
//        }

//        // ✅ استخراج المعلومات من الـ response
//        localStorage.setItem('token', response.Data.Token);
//        localStorage.setItem('userId', response.Data.User.Id);
//        localStorage.setItem('role', response.Data.User.Role); // أو من UserRoles

//        return response;
//    } catch (err) {
//        localStorage.removeItem('token');
//        localStorage.removeItem('userId');
//        localStorage.removeItem('role');
//        throw err;
//    }
//};

// src/api/auth.js
export const login = async (username, password) => {
    try {
        console.log("Sending login request for:", username);
        const response = await api.post('/Auth/Login', {
            Name: username,
            Password: password
        });

        console.log("Login API response:", response.data);

        if (response.data.Data?.Token) {
            localStorage.setItem('authToken', response.data.Data.Token);
            localStorage.setItem('userId', response.data.Data.userId);
            localStorage.setItem('role', response.data.Data.role);
            localStorage.setItem('userName', response.data.Data.FullName);
        }

        return response.data;
    } catch (error) {
        console.error("Login API error:", error.response?.data || error.message);
        throw error;
    }
};

export const logout = async () => {
    const response = await api.post('/Auth/Logout');
    return response.data;
};


export const getCurrentUser = async () => {
    const response = await api.get('/Auth/profile');
    return response.data;
};


















// في ملف auth.js
//export const login = async (username, password) => {
//    try {
//        console.log("Sending login request for:", username);
//        const response = await api.post('/Auth/Login', {
//            Name: username,
//            Password: password
//        });

//        console.log("Login API response:", response.data);
//        return response.data;
//    } catch (error) {
//        console.error("Login API error:", error.response?.data || error.message);
//        throw error;
//    }
//};



















//// auth.js
//import api from './apiConfig';

//export const login = async (username, password) => {
//    try {
//        if (!username || !password) {
//            throw new Error('اسم المستخدم وكلمة المرور مطلوبان');
//        }

//        const response = await api.post('/Auth/Login', {
//            username,
//            password
//        });

//        if (!response.data.Success) {
//            throw new Error(response.data.Message || 'فشل تسجيل الدخول');
//        }

//        return {
//            success: true,
//            data: response.data.Data,
//            message: response.data.Message
//        };

//    } catch (error) {
//        console.error('Login error:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'حدث خطأ أثناء تسجيل الدخول');
//    }
//};

//export const logout = async () => {
//    try {
//        const token = localStorage.getItem('authToken');
//        if (!token) return;

//        const response = await api.post('/Auth/Logout', {}, {
//            headers: {
//                Authorization: `Bearer ${token}`
//            }
//        });

//        if (!response.data.Success) {
//            throw new Error(response.data.Message || 'فشل تسجيل الخروج');
//        }

//        return {
//            success: true,
//            message: response.data.Message
//        };

//    } catch (error) {
//        console.error('Logout error:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'حدث خطأ أثناء تسجيل الخروج');
//    }
//};

//export const getCurrentUser = async () => {
//    try {
//        const response = await api.get('/Auth/profile');

//        if (!response.data.Success) {
//            throw new Error(response.data.Message || 'فشل جلب بيانات المستخدم');
//        }

//        return {
//            success: true,
//            user: response.data.Data,
//            message: response.data.Message
//        };

//    } catch (error) {
//        console.error('Get user error:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'حدث خطأ أثناء جلب بيانات المستخدم');
//    }
//};