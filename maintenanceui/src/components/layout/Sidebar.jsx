import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ items }) => {
    return (
        <nav className="sidebar">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;




