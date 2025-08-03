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
                <Link to="/">���� �������</Link>
            </div>

            <div className="navbar-links">
                {user && (
                    <>
                        {user.isEmployee && (
                            <>
                                <Link to="/my-tickets">������</Link>
                                <Link to="/create-ticket">����� �����</Link>
                            </>
                        )}

                        {user.isMaintenance && (
                            <Link to="/maintenance">������� �������</Link>
                        )}

                        {user.isAdmin && (
                            <>
                                <Link to="/admin">���� ������</Link>
                                <Link to="/admin/all-tickets">���� �������</Link>
                            </>
                        )}

                        <button onClick={handleLogout} className="logout-btn">
                            ����� ������
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