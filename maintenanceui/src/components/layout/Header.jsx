import React from 'react';

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>‰Ÿ«„ ≈œ«—…  –«ﬂ— «·’Ì«‰…</h1>
                </div>

                <div className="user-info">
                    {user && (
                        <>
                            <span className="user-name">{user.fullName}</span>
                            <span className="user-role">
                                {user.role === 'Employee' ? '„ÊŸ›' :
                                    user.role === 'Maintenance' ? '›‰Ì ’Ì«‰…' : '„”ƒÊ·'}
                            </span>
                            <button onClick={onLogout} className="logout-btn"> ”ÃÌ· «·Œ—ÊÃ</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;