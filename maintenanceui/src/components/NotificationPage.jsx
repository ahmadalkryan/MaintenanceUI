//import React, { useEffect } from 'react';
//import { useNotifications } from '../contexts/NotificationContext';
//import moment from 'moment';

//const NotificationsPage = () => {
//    const { notifications, markNotificationAsRead, refreshNotifications } = useNotifications();

//    useEffect(() => {
//        refreshNotifications();

//        // Ê÷⁄ ⁄·«„… „ﬁ—Ê¡… ⁄‰œ › Õ «·’›Õ…
//        const unreadNotifications = notifications.filter(n => !n.isRead);
//        unreadNotifications.forEach(n => markNotificationAsRead(n.id));
//    }, []);

//    return (
//        <div className="max-w-4xl mx-auto p-4">
//            <h1 className="text-2xl font-bold mb-6">«·≈‘⁄«—« </h1>

//            <div className="bg-white shadow rounded-lg">
//                {notifications.length === 0 ? (
//                    <div className="p-8 text-center text-gray-500">
//                        ·«  ÊÃœ ≈‘⁄«—« 
//                    </div>
//                ) : (
//                    <ul className="divide-y divide-gray-200">
//                        {notifications.map(notification => (
//                            <li
//                                key={notification.id}
//                                className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
//                            >
//                                <div className="flex justify-between">
//                                    <div>
//                                        <p className="font-medium">{notification.message}</p>
//                                        <p className="text-sm text-gray-500 mt-1">
//                                            «· –ﬂ—… #{notification.ticketId}
//                                        </p>
//                                    </div>
//                                    <div className="text-sm text-gray-400">
//                                        {moment(notification.sentAt).format('YYYY-MM-DD HH:mm')}
//                                    </div>
//                                </div>
//                            </li>
//                        ))}
//                    </ul>
//                )}
//            </div>
//        </div>
//    );
//};


//export default NotificationsPage;















import React, { useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import moment from 'moment';

const NotificationsPage = () => {
    const { notifications, markNotificationAsRead, refreshNotifications } = useNotifications();

    useEffect(() => {
        refreshNotifications();

        // Ê÷⁄ ⁄·«„… „ﬁ—Ê¡… ⁄‰œ › Õ «·’›Õ…
        const unreadNotifications = notifications.filter(n => !n.isRead);
        unreadNotifications.forEach(n => markNotificationAsRead(n.id));
    }, [refreshNotifications, markNotificationAsRead]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">«·≈‘⁄«—« </h1>

            <div className="bg-white shadow rounded-lg">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        ·«  ÊÃœ ≈‘⁄«—« 
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {notifications.map(notification => (
                            <li
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-medium">{notification.message}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            «· –ﬂ—… #{notification.ticketId}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {moment(notification.sentAt).format('YYYY-MM-DD HH:mm')}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;