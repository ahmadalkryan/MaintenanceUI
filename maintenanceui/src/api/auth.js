
import api from './apiConfig';

//export const login = async (username, password) => {
//    const response = await api.post('/Auth/Login', {
//        Name: username,  // ÊÛííÑ ãä username Åáì Name
//        Password: password // ÊÛííÑ ãä password Åáì Password
//    }


//    );
//    return response.data;
//};

export const logout = async () => {
    const response = await api.post('/Auth/Logout');
    return response.data;
};


export const getCurrentUser = async () => {
    const response = await api.get('/Auth/profile');
    return response.data;
};


// İí ãáİ auth.js
export const login = async (username, password) => {
    try {
        console.log("Sending login request for:", username);
        const response = await api.post('/Auth/Login', {
            Name: username,
            Password: password
        });

        console.log("Login API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login API error:", error.response?.data || error.message);
        throw error;
    }
};



















//// auth.js
//import api from './apiConfig';

//export const login = async (username, password) => {
//    try {
//        if (!username || !password) {
//            throw new Error('ÇÓã ÇáãÓÊÎÏã æßáãÉ ÇáãÑæÑ ãØáæÈÇä');
//        }

//        const response = await api.post('/Auth/Login', {
//            username,
//            password
//        });

//        if (!response.data.Success) {
//            throw new Error(response.data.Message || 'İÔá ÊÓÌíá ÇáÏÎæá');
//        }

//        return {
//            success: true,
//            data: response.data.Data,
//            message: response.data.Message
//        };

//    } catch (error) {
//        console.error('Login error:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'ÍÏË ÎØÃ ÃËäÇÁ ÊÓÌíá ÇáÏÎæá');
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
//            throw new Error(response.data.Message || 'İÔá ÊÓÌíá ÇáÎÑæÌ');
//        }

//        return {
//            success: true,
//            message: response.data.Message
//        };

//    } catch (error) {
//        console.error('Logout error:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'ÍÏË ÎØÃ ÃËäÇÁ ÊÓÌíá ÇáÎÑæÌ');
//    }
//};

//export const getCurrentUser = async () => {
//    try {
//        const response = await api.get('/Auth/profile');

//        if (!response.data.Success) {
//            throw new Error(response.data.Message || 'İÔá ÌáÈ ÈíÇäÇÊ ÇáãÓÊÎÏã');
//        }

//        return {
//            success: true,
//            user: response.data.Data,
//            message: response.data.Message
//        };

//    } catch (error) {
//        console.error('Get user error:', error);
//        throw new Error(error.response?.data?.Message || error.message || 'ÍÏË ÎØÃ ÃËäÇÁ ÌáÈ ÈíÇäÇÊ ÇáãÓÊÎÏã');
//    }
//};