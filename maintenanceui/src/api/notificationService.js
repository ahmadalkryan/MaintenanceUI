

//import api from './apiConfig';

//export const notificationService = {
//    // ÇáÍÕæá Úáì ÌãíÚ ÅÔÚÇÑÇÊ ÇáãÓÊÎÏã
//    getUserNotifications: async (userId) => {
//        try {
//            const response = await api.get(`/Notification/GetNotificationsByUser?userId=${userId}`);
//            return response.data.Data;
//        } catch (error) {
//            throw new Error('Failed to fetch notifications');
//        }
//    },

//    // ÊÍÏíË ÍÇáÉ ÇáÅÔÚÇÑ (Êã ÇáÞÑÇÁÉ)
//    markAsRead: async (notificationId) => {
//        try {
//            await api.put('/Notification/UpdateNotification', {
//                id: notificationId,
//                isRead: true
//            });
//        } catch (error) {
//            throw new Error('Failed to mark notification as read');
//        }
//    },

//    // ÇáÍÕæá Úáì ÅÔÚÇÑ ÈæÇÓØÉ ID
//    getNotificationById: async (id) => {
//        try {
//            const response = await api.get(`/Notification/GetNotificationById?id=${id}`);
//            return response.data.Data;
//        } catch (error) {
//            throw new Error('Failed to fetch notification');
//        }
//    }
//};
// src/api/notifications.js
import api from './apiConfig';






//// ÌáÈ ÌãíÚ ÇáÅÔÚÇÑÇÊ ááãÓÊÎÏã ÇáÍÇáí
export const getNotifications = async (userId) => {
    
        try {
            const response = await api.get('/Notification/GetNotificationsByUserId', {
                params: { userId }
            });
            //  await api.get(`/Notification/GetNotificationsByUser?userId=${userId}`);
            return response.data.Data;
        } catch (error) {
            console.error('ÎØÃ Ýí ÌáÈ ÇáÅÔÚÇÑÇÊ:', error);
            throw new Error('Failed to fetch notifications');
        }
};

//// ÊãííÒ ÇáÅÔÚÇÑ ßãÞÑæÁ
//export const markNotificationAsRead = async (notificationId) => {
//    try {
//        const response = await api.put('/Notification/UpdateNotification', {
//            id: notificationId,
//            isRead: true
//        });
//        return response.data.Data;
//    } catch (error) {
//        console.error('ÎØÃ Ýí ÊãííÒ ÇáÅÔÚÇÑ ßãÞÑæÁ:', error);
//        throw error;
//    }
//};















// services/notificationService.js
//import api from './apiConfig';

//export const notificationService = {
//    getNotifications: async (userId) => {
//        try {
//            const response = await api.get(`/Notification/GetNotificationsByUserId?userId=${userId}`);
//            return response.data;
//        } catch (error) {
//            console.error('Error fetching notifications:', error);
//            throw error;
//        }
//    },

//    markAsRead: async (notificationId) => {
//        try {
//            const response = await api.put('/Notification/UpdateNotification', {
//                id: notificationId,
//                isRead: true
//            });
//            return response.data;
//        } catch (error) {
//            console.error('Error marking notification as read:', error);
//            throw error;
//        }
//    }
//};
//// ÍÓÇÈ ÇáÅÔÚÇÑÇÊ ÛíÑ ÇáãÞÑæÁÉ ãÍáíÇð
//export const calculateUnreadCount = (notifications) => {
//    return notifications.filter(notification => !notification.isRead).length;
//};