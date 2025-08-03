import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">نظام التذاكر</Link>
            </div>

            <div className="navbar-links">
                {user && (
                    <>
                        {user.isEmployee && (
                            <>
                                <Link to="/my-tickets">تذاكري</Link>
                                <Link to="/create-ticket">إنشاء تذكرة</Link>
                            </>
                        )}

                        {user.isMaintenance && (
                            <Link to="/maintenance">التذاكر المعينة</Link>
                        )}

                        {user.isAdmin && (
                            <>
                                <Link to="/admin">لوحة التحكم</Link>
                                <Link to="/admin/all-tickets">جميع التذاكر</Link>
                            </>
                        )}

                        <button onClick={handleLogout} className="logout-btn">
                            تسجيل الخروج
                        </button>

                        <div className="user-info">
                            <span>{user.name}</span>
                            <span className="user-role">{user.role}</span>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;