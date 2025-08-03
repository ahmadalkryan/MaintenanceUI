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
                <Link to="/">‰Ÿ«„ «· –«ﬂ—</Link>
            </div>

            <div className="navbar-links">
                {user && (
                    <>
                        {user.isEmployee && (
                            <>
                                <Link to="/my-tickets"> –«ﬂ—Ì</Link>
                                <Link to="/create-ticket">≈‰‘«¡  –ﬂ—…</Link>
                            </>
                        )}

                        {user.isMaintenance && (
                            <Link to="/maintenance">«· –«ﬂ— «·„⁄Ì‰…</Link>
                        )}

                        {user.isAdmin && (
                            <>
                                <Link to="/admin">·ÊÕ… «· Õﬂ„</Link>
                                <Link to="/admin/all-tickets">Ã„Ì⁄ «· –«ﬂ—</Link>
                            </>
                        )}

                        <button onClick={handleLogout} className="logout-btn">
                             ”ÃÌ· «·Œ—ÊÃ
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