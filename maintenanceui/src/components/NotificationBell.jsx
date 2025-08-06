import React, { useState } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, unreadCount, markNotificationAsRead } = useNotifications();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            markNotificationAsRead(notification.id);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative ml-3">
            <button
                onClick={toggleDropdown}
                className="relative p-1 text-gray-400 hover:text-white focus:outline-none"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>

                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-3 bg-gray-100 border-b">
                        <h3 className="text-sm font-medium text-gray-700">
                            «·≈‘⁄«—«  {unreadCount > 0 && `(${unreadCount} ÃœÌœ)`}
                        </h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">·«  ÊÃœ ≈‘⁄«—« </div>
                        ) : (
                            notifications.map(notification => (
                                <Link
                                    key={notification.id}
                                    to={`/tickets/${notification.ticketId}`}
                                    className={`block px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''
                                        }`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="flex items-start">
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {moment(notification.sentAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="p-2 bg-gray-50 border-t">
                        <Link
                            to="/notifications"
                            className="block text-center text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            ⁄—÷ Ã„Ì⁄ «·≈‘⁄«—« 
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
























//// components/NotificationBell.js
//import React, { useState } from 'react';
//import { useNotifications } from '../contexts/NotificationContext
//import {
//    Badge, Popover, List, ListItem, ListItemText,
//    ListItemSecondaryAction, IconButton, Typography, Box
//} from '@mui/material';
//import NotificationsIcon from '@mui/icons-material/Notifications';
//import CloseIcon from '@mui/icons-material/Close';
//import { Link } from 'react-router-dom';

//const NotificationBell = () => {
//    const [anchorEl, setAnchorEl] = useState(null);
//    const { notifications, unreadCount, markAsRead } = useNotifications();
//    const open = Boolean(anchorEl);

//    const handleClick = (event) => {
//        setAnchorEl(event.currentTarget);
//    };

//    const handleClose = () => {
//        setAnchorEl(null);
//    };

//    const formatDate = (dateString) => {
//        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//        return new Date(dateString).toLocaleDateString(undefined, options);
//    };

//    return (
//        <div>
//            <IconButton
//                color="inherit"
//                onClick={handleClick}
//                aria-label="notifications"
//                aria-controls="notification-menu"
//                aria-haspopup="true"
//            >
//                <Badge badgeContent={unreadCount} color="error">
//                    <NotificationsIcon />
//                </Badge>
//            </IconButton>

//            <Popover
//                id="notification-menu"
//                open={open}
//                anchorEl={anchorEl}
//                onClose={handleClose}
//                anchorOrigin={{
//                    vertical: 'bottom',
//                    horizontal: 'right',
//                }}
//                transformOrigin={{
//                    vertical: 'top',
//                    horizontal: 'right',
//                }}
//            >
//                <Box sx={{ width: 360, p: 2 }}>
//                    <Typography variant="h6" sx={{ mb: 2 }}>
//                        «·≈‘⁄«—« 
//                        {unreadCount > 0 && (
//                            <Typography component="span" color="primary">
//                                ({unreadCount} ÃœÌœ…)
//                            </Typography>
//                        )}
//                    </Typography>

//                    {notifications.length === 0 ? (
//                        <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
//                            ·«  ÊÃœ ≈‘⁄«—« 
//                        </Typography>
//                    ) : (
//                        <List dense>
//                            {notifications.map((notification) => (
//                                <ListItem
//                                    key={notification.id}
//                                    sx={{
//                                        bgcolor: !notification.isRead ? 'action.hover' : 'background.paper',
//                                        borderLeft: !notification.isRead ? '3px solid #1976d2' : 'none'
//                                    }}
//                                >
//                                    <ListItemText
//                                        primary={
//                                            <Link
//                                                to={`/tickets/${notification.ticketId}`}
//                                                onClick={() => markAsRead(notification.id)}
//                                                style={{ textDecoration: 'none', color: 'inherit' }}
//                                            >
//                                                {notification.message}
//                                            </Link>
//                                        }
//                                        secondary={formatDate(notification.sentAt)}
//                                    />
//                                    <ListItemSecondaryAction>
//                                        <IconButton
//                                            edge="end"
//                                            size="small"
//                                            onClick={() => markAsRead(notification.id)}
//                                        >
//                                            <CloseIcon fontSize="small" />
//                                        </IconButton>
//                                    </ListItemSecondaryAction>
//                                </ListItem>
//                            ))}
//                        </List>
//                    )}
//                </Box>
//            </Popover>
//        </div>
//    );
//};

//export default NotificationBell;










































////// src/components/NotificationBell.jsx
////import React, { useState, useEffect } from 'react';
////import { useNotifications } from '../contexts/NotificationContext';
////import { useAuth } from '../contexts/AuthContext';

////const NotificationBell = () => {
////    const [isOpen, setIsOpen] = useState(false);
////    const { notifications, unreadCount, markAsRead } = useNotifications();
////    const { currentUser } = useAuth();

////    useEffect(() => {
////        if (currentUser) {
////            loadNotifications(currentUser.id);
////        }
////    }, [currentUser]);

////    const toggleDropdown = () => setIsOpen(!isOpen);

////    const handleNotificationClick = async (id) => {
////        await markAsRead(id);
////        // «· ‰ﬁ· ·’›Õ… «· –ﬂ—… Â‰«
////    };

////    return (
////        <div className="relative">
////            <button
////                onClick={toggleDropdown}
////                className="p-2 relative"
////            >
////                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
////                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
////                </svg>

////                {unreadCount > 0 && (
////                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
////                        {unreadCount}
////                    </span>
////                )}
////            </button>

////            {isOpen && (
///;/                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
////                    <div className="p-3 border-b">
////                        <h3 className="font-semibold">«·≈‘⁄«—« </h3>
////                    </div>

////                    <div className="max-h-80 overflow-y-auto">
////                        {notifications.length === 0 ? (
////                            <p className="p-4 text-center text-gray-500">·«  ÊÃœ ≈‘⁄«—« </p>
////                        ) : (
////                            notifications.map(notification => (
////                                <div
////                                    key={notification.id}
////                                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''
////                                        }`}
////                                    onClick={() => handleNotificationClick(notification.id)}
////                                >
////                                    <div className="flex justify-between">
////                                        <p className="font-medium">{notification.message}</p>
////                                        {!notification.isRead && (
////                                            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
////                                        )}
////                                    </div>
////                                    <p className="text-sm text-gray-500 mt-1">
////                                        {new Date(notification.sentAt).toLocaleString('ar-EG')}
////                                    </p>
////                                </div>
////                            ))
////                        )}
////                    </div>

////                    <div className="p-2 bg-gray-50 text-center">
////                        <button
////                            className="text-blue-600 text-sm"
////                            onClick={() => console.log('⁄—÷ «·ﬂ·')}
////                        >
////                            ⁄—÷ Ã„Ì⁄ «·≈‘⁄«—« 
////                        </button>
////                    </div>
////                </div>
////            )}
////        </div>
////    );
////};

////export default NotificationBell