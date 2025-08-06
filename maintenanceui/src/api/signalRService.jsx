//// src/services/signalRService.js
//import * as signalR from '@microsoft/signalr';

//let connection = null;

//export const startSignalRConnection = (token, onReceiveNotification) => {
//    connection = new signalR.HubConnectionBuilder()
//        .withUrl('https://localhost:7220/notificationHub', {
//            accessTokenFactory: () => token
//        })
//        .withAutomaticReconnect()
//        .build();

//    connection.start()
//        .then(() => console.log('SignalR Connected'))
//        .catch(err => console.error('SignalR Connection Error: ', err));

//    connection.on('ReceiveNotification', onReceiveNotification);
//};

//export const stopSignalRConnection = () => {
//    if (connection) {
//        connection.stop();
//    }
//};




//// src/services/signalRService.js
//import * as signalR from '@microsoft/signalr';

//let connection = null;

//export const connectToNotificationHub = (onNotificationReceived) => {
//    const token = localStorage.getItem('token');

//    if (!token) {
//        console.log('No token available, cannot connect to notification hub');
//        return;
//    }

//    // إنشاء اتصال بـ SignalR
//    connection = new signalR.HubConnectionBuilder()
//        .withUrl(`${process.env.REACT_APP_API_BASE_URL || 'https://localhost:7220'}/notificationHub`, {
//            accessTokenFactory: () => token
//        })
//        .withAutomaticReconnect()
//        .build();

//    // بدء الاتصال
//    connection.start()
//        .then(() => {
//            console.log('تم الاتصال بنجاح بـ Notification Hub');
//        })
//        .catch(err => {
//            console.error('خطأ في الاتصال بـ Notification Hub:', err);
//        });

//    // تسجيل معالج للإشعارات الواردة
//    connection.on('ReceiveNotification', (notification) => {
//        console.log('تم استقبال إشعار:', notification);
//        onNotificationReceived(notification);
//    });

//    // معالجة انقطاع الاتصال
//    connection.onclose(async () => {
//        console.log('تم انقطاع الاتصال. محاولة إعادة الاتصال...');
//    });
//};

//export const disconnectFromNotificationHub = () => {
//    if (connection) {
//        connection.stop();
//        connection = null;
//    }
//};

// src/api/signalRService.jsx
// src/services/signalRService.js
// src/services/signalRService.js
import * as signalR from '@microsoft/signalr';

let connection = null;

export const connectToNotificationHub = (onNotificationReceived) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.log('No authentication token found. Cannot connect to SignalR.');
        return;
    }

    // إنشاء اتصال بـ SignalR
    connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7220/notificationHub', {
            accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .build();

    // بدء الاتصال
    connection.start()
        .then(() => {
            console.log('✅ اتصال SignalR ناجح مع notificationHub');
        })
        .catch(err => {
            console.error('❌ فشل الاتصال بـ SignalR:', err.toString());
        });

    // الاستماع للإشعارات الواردة
    connection.on('ReceiveNotification', (notification) => {
        console.log('📨 إشعار وارد:', notification);
        onNotificationReceived(notification);
    });

    // معالجة انقطاع الاتصال
    connection.onclose((err) => {
        console.warn('⚠️ اتصال SignalR انقطع:', err?.toString());
    });
};

export const disconnectFromNotificationHub = () => {
    if (connection) {
        connection.stop()
            .then(() => console.log('تم إغلاق اتصال SignalR'))
            .catch(err => console.error('خطأ في إغلاق الاتصال:', err));
        connection = null;
    }
};