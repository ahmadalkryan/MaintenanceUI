


import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    const sidebarItems = [
        ...(user?.role === 'Employee' ? [
            { path: '/', label: ' –«ﬂ—Ì', icon: '??' },
            { path: '/create-ticket', label: '≈‰‘«¡  –ﬂ—…', icon: '?' }
        ] : []),
        ...(user?.role === 'Maintenance' || user?.role === 'Admin' ? [
            { path: '/maintenance', label: '«· –«ﬂ— «·„Œ’’…', icon: '??' }
        ] : []),
        ...(user?.role === 'Admin' ? [
            { path: '/admin', label: '·ÊÕ… «· Õﬂ„', icon: '??' },
            { path: '/admin/all-tickets', label: 'Ã„Ì⁄ «· –«ﬂ—', icon: '??' }
        ] : [])
    ];

    return (
        <div className="layout">
            <Header user={user} onLogout={logout} />
            <div className="main-container">
                <Sidebar items={sidebarItems} />
                <main className="content">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;