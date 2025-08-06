

//import api from './apiConfig';

//export const notificationService = {
//    // ������ ��� ���� ������� ��������
//    getUserNotifications: async (userId) => {
//        try {
//            const response = await api.get(`/Notification/GetNotificationsByUser?userId=${userId}`);
//            return response.data.Data;
//        } catch (error) {
//            throw new Error('Failed to fetch notifications');
//        }
//    },

//    // ����� ���� ������� (�� �������)
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

//    // ������ ��� ����� ������ ID
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






//// ��� ���� ��������� �������� ������
export const getNotifications = async (userId) => {
    
        try {
            const response = await api.get('/Notification/GetNotificationsByUserId', {
                params: { userId }
            });
            //  await api.get(`/Notification/GetNotificationsByUser?userId=${userId}`);
            return response.data.Data;
        } catch (error) {
            console.error('��� �� ��� ���������:', error);
            throw new Error('Failed to fetch notifications');
        }
};

//// ����� ������� ������
//export const markNotificationAsRead = async (notificationId) => {
//    try {
//        const response = await api.put('/Notification/UpdateNotification', {
//            id: notificationId,
//            isRead: true
//        });
//        return response.data.Data;
//    } catch (error) {
//        console.error('��� �� ����� ������� ������:', error);
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
//// ���� ��������� ��� �������� ������
//export const calculateUnreadCount = (notifications) => {
//    return notifications.filter(notification => !notification.isRead).length;
//};