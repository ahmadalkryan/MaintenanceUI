// src/components/NotificationDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import en from 'date-fns/locale/en-US';
import './NotificationDropdown.css';

const NotificationDropdown = () => {
    const { notifications, unreadCount, isLoading, error, fetchNotifications } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const dropdownRef = useRef(null);

  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSelectedNotification(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNotificationClick = (e, notification) => {
        e.stopPropagation();
        setSelectedNotification(notification);
    };

    const handleCloseDetails = (e) => {
        e.stopPropagation();
        setSelectedNotification(null);
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (!isNaN(date)) {
                return formatDistanceToNow(date, {
                    addSuffix: true,
                    locale: en
                });
            }
            return 'Just now';
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Just now';
        }
    };

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            <button
                className="notification-icon"
                onClick={() => {
                    setIsOpen(!isOpen);
                    setSelectedNotification(null);
                    if (!isOpen) {
                        fetchNotifications();
                    }
                }}
                aria-label="Notifications"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown-menu">
                    {selectedNotification ? (
                        <div className="notification-details">
                            <div className="notification-details-header">
                                <button
                                    className="back-button"
                                    onClick={handleCloseDetails}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                    </svg>
                                    Back
                                </button>
                                <h3>Notification Details</h3>
                            </div>
                            <div className="notification-details-content">
                                <div className="notification-details-header-info">
                                    <span className={`status-badge ${selectedNotification.IsRead ? 'read' : 'unread'}`}>
                                        {selectedNotification.IsRead ? 'Read' : 'New'}
                                    </span>
                                    <span className="notification-time">
                                        {formatDate(selectedNotification.SentAt)}
                                    </span>
                                </div>
                                <h4>{selectedNotification.Message}</h4>
                                <div className="notification-meta">
                                    <p><strong>Ticket ID:</strong> #{selectedNotification.TicketId}</p>
                                    <p><strong>Received:</strong> {new Date(selectedNotification.SentAt).toLocaleString('en-US')}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="notification-header">
                                <h3>Notifications</h3>
                                <span className="notification-count">{notifications.length} notifications</span>
                            </div>

                            <div className="notification-list">
                                {isLoading ? (
                                    <div className="notification-loading">
                                        <div className="spinner"></div>
                                        <p>Loading notifications...</p>
                                    </div>
                                ) : error ? (
                                    <div className="notification-error">
                                        <p>{error}</p>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            fetchNotifications();
                                        }}>Try Again</button>
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="notification-empty">
                                        <p>No notifications available</p>
                                    </div>
                                ) : (
                                    notifications.map(notification => (
                                        // ✅ التأكد من وجود key فريد
                                        <div
                                            key={notification.Id || notification.TicketId || `notification-${Math.random()}`}
                                            className={`notification-item ${!notification.isRead ? 'unread' : 'read'}`}
                                            onClick={(e) => handleNotificationClick(e, notification)}
                                        >
                                            <div className="notification-content">
                                                <div className="notification-header-row">
                                                    <span className={`status-badge ${notification.IsRead ? 'read' : 'unread'}`}>
                                                        {notification.IsRead ? 'Read' : 'New'}
                                                    </span>
                                                    <span className="notification-time">
                                                        {formatDate(notification.SentAt)}
                                                    </span>
                                                </div>
                                                <p className="notification-message">{notification.Message}</p>
                                                <div className="notification-footer">
                                                    <span>Ticket #{notification.TicketId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {notifications.length > 0 && (
                                <div className="notification-summary">
                                    <p>
                                        <span className="unread-count">{unreadCount}</span>
                                        {unreadCount === 1 ? " new notification" : " new notifications"}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;




//// src/components/NotificationDropdown.js
//import React, { useState, useRef, useEffect } from 'react';
//import { useNotifications } from '../contexts/NotificationContext';
//import { formatDistanceToNow } from 'date-fns';
//import ar from 'date-fns/locale/ar';
//import './NotificationDropdown.css';

//const NotificationDropdown = () => {
//    const { notifications, unreadCount, isLoading, error, fetchNotifications } = useNotifications();
//    const [isOpen, setIsOpen] = useState(false);
//    const dropdownRef = useRef(null);

//    // إغلاق القائمة عند النقر خارجها
//    useEffect(() => {
//        const handleClickOutside = (event) => {
//            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                setIsOpen(false);
//            }
//        };

//        document.addEventListener('mousedown', handleClickOutside);
//        return () => {
//            document.removeEventListener('mousedown', handleClickOutside);
//        };
//    }, []);

//    const handleNotificationClick = (notification) => {
//        // الانتقال إلى تفاصيل التذكرة
//        window.location.href = `/ticket/${notification.ticketId}`;
//        setIsOpen(false);
//    };

//    return (
//        <div className="notification-dropdown" ref={dropdownRef}>
//            <button
//                className="notification-icon"
//                onClick={() => {
//                    setIsOpen(!isOpen);
//                    if (!isOpen) {
//                        fetchNotifications();
//                    }
//                }}
//                aria-label="الإشعارات"
//            >
//                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
//                </svg>
//                {unreadCount > 0 && (
//                    <span className="notification-badge">{unreadCount}</span>
//                )}
//            </button>

//            {isOpen && (
//                <div className="notification-dropdown-menu">
//                    <div className="notification-header">
//                        <h3>Notification</h3>
//                    </div>

//                    <div className="notification-list">
//                        {isLoading ? (
//                            <div className="notification-loading">
//                                <div className="spinner"></div>
//                                <p>Loading ......</p>
//                            </div>
//                        ) : error ? (
//                            <div className="notification-error">
//                                <p>{error}</p>
//                                <button onClick={fetchNotifications}> Try Again</button>
//                            </div>
//                        ) : notifications.length === 0 ? (
//                            <div className="notification-empty">
//                                <p>No Notidications </p>
//                            </div>
//                        ) : (
//                            notifications.map(notification => (
//                                <div
//                                    key={notification.id}
//                                    className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
//                                    onClick={() => handleNotificationClick(notification)}
//                                >
//                                    <div className="notification-content">
//                                        <p className="notification-message">{notification.message}</p>
//                                        <span className="notification-time">
//                                            {formatDistanceToNow(new Date(notification.sentAt), {
//                                                addSuffix: true,
//                                                locale: ar
//                                            })}
//                                        </span>
//                                    </div>
//                                </div>
//                            ))
//                        )}
//                    </div>

//                    <div className="notification-footer">
//                        <a href="/notifications"> Display All Notifications  </a>
//                    </div>
//                </div>
//            )}
//        </div>
//    );
//};

//export default NotificationDropdown;



















