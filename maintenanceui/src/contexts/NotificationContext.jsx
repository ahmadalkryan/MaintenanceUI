//import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
//import { notificationService } from '../api/notificationService';
//import { useAuth } from '../contexts/AuthContext';

//const NotificationContext = createContext();

//export const useNotifications = () => useContext(NotificationContext);

//export const NotificationProvider = ({ children }) => {
//    const [notifications, setNotifications] = useState([]);
//    const [unreadCount, setUnreadCount] = useState(0);
//    const { currentUser } = useAuth();

//    // Ã·» «·≈‘⁄«—«  ⁄‰œ  €ÌÌ— «·„” Œœ„
//    useEffect(() => {
//        if (currentUser?.userId) {
//            fetchNotifications();
//        }
//    }, [currentUser]);

//    const fetchNotifications = useCallback(async () => {
//        try {
//            const response = await notificationService.getNotifications(currentUser.userId);
//            setNotifications(response.data);
//            updateUnreadCount(response.data);
//        } catch (error) {
//            console.error('Failed to fetch notifications:', error);
//        }
//    }, [currentUser]);

//    const updateUnreadCount = (notifications) => {
//        const count = notifications.filter(notification => !notification.isRead).length;
//        setUnreadCount(count);
//    };

//    const addNotification = useCallback((notification) => {
//        setNotifications(prev => [notification, ...prev]);
//        setUnreadCount(prev => prev + 1);
//    }, []);

//    const markNotificationAsRead = useCallback(async (notificationId) => {
//        try {
//            await notificationService.markAsRead(notificationId);
//            setNotifications(prev =>
//                prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
//            );
//            setUnreadCount(prev => prev - 1);
//        } catch (error) {
//            console.error('Failed to mark notification as read:', error);
//        }
//    }, []);

//    const value = {
//        notifications,
//        unreadCount,
//        addNotification, // ” „—— Â–Â «·œ«·… ·‹ SignalR
//        markNotificationAsRead,
//        refreshNotifications: fetchNotifications
//    };

//    return (
//        <NotificationContext.Provider value={value}>
//            {children}
//        </NotificationContext.Provider>
//    );
//};


// src/contexts/NotificationContext.js
// src/contexts/NotificationContext.js


import React, { createContext, useState, useContext, useEffect } from 'react';
import { connectToNotificationHub, disconnectFromNotificationHub } from '../api/signalRService';
import { getNotifications } from '../api/notificationService';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ã·» «·≈‘⁄«—« 
    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            const userId = localStorage.getItem('userId');

            if (!userId) {
                throw new Error('User ID not found');
            }

            const data = await getNotifications(userId);
            setNotifications(data);

            // Õ”«» ⁄œœ «·≈‘⁄«—«  €Ì— «·„ﬁ—Ê¡…
            const unread = data.filter(n => !n.isRead).length;
            setUnreadCount(unread);
            setError(null);
        } catch (err) {
            setError('  failed  To load Notification');
            console.error('   Failed To fetch notifi :', err);
        } finally {
            setIsLoading(false);
        }
    };

    // „⁄«·Ã… «·≈‘⁄«— «·ÃœÌœ
    const handleNewNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
        if (!notification.isRead) {
            setUnreadCount(prev => prev + 1);

            // ⁄—÷ ≈‘⁄«— „ ’›Õ ≈–« ﬂ«‰ „œ⁄Ê„«
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(' New Notification', {
                    body: notification.message,
                    icon: '/logo192.png'
                });
            }
        }
    };

    useEffect(() => {
        // ÿ·» ≈–‰ «·≈‘⁄«—«  ≈–« ·“„
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        // Ã·» «·≈‘⁄«—« 
        fetchNotifications();

        // «·« ’«· »‹ SignalR
        connectToNotificationHub(handleNewNotification);

        return () => {
            disconnectFromNotificationHub();
        };
    }, []);

    const value = {
        notifications,
        unreadCount,
        isLoading,
        error,
        fetchNotifications
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications ÌÃ» «” Œœ«„Â œ«Œ· NotificationProvider');
    }
    return context;
};































////// src/contexts/NotificationContext.js
////import React, { createContext, useContext, useState, useEffect } from 'react';
////import { notificationService } from '../api/notificationService';

////const NotificationContext = createContext();

////export function useNotifications() {
////    return useContext(NotificationContext);
////}

////export function NotificationProvider({ children }) {
////    const [notifications, setNotifications] = useState([]);
////    const [unreadCount, setUnreadCount] = useState(0);

////    //  Õ„Ì· «·≈‘⁄«—«  ⁄‰œ  €ÌÌ— «·„” Œœ„
////    const loadNotifications = async (userId) => {
////        try {
////            const data = await notificationService.getUserNotifications(userId);
////            setNotifications(data);
////            updateUnreadCount(data);
////        } catch (error) {
////            console.error('Error loading notifications:', error);
////        }
////    };

////    //  ÕœÌÀ ⁄œœ «·≈‘⁄«—«  €Ì— «·„ﬁ—Ê¡…
////    const updateUnreadCount = (notifications) => {
////        const count = notifications.filter(n => !n.isRead).length;
////        setUnreadCount(count);
////    };

////    //  „ÌÌ“ «·≈‘⁄«— ﬂ„ﬁ—Ê¡
////    const markAsRead = async (id) => {
////        try {
////            await notificationService.markAsRead(id);
////            setNotifications(prev =>
////                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
////            );
////            setUnreadCount(prev => prev - 1);
////        } catch (error) {
////            console.error('Error marking notification as read:', error);
////        }
////    };

////    // ≈÷«›… ≈‘⁄«— ÃœÌœ (··≈‘⁄«—«  «·›Ê—Ì…)
////    const addNotification = (notification) => {
////        setNotifications(prev => [notification, ...prev]);
////        setUnreadCount(prev => prev + 1);
////    };

////    const value = {
////        notifications,
////        unreadCount,
////        loadNotifications,
////        markAsRead,
////        addNotification
////    };

////    return (
////        <NotificationContext.Provider value={value}>
////            {children}
////        </NotificationContext.Provider>
////    );
////}