import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, ShoppingBag } from 'lucide-react';
import '../index.css';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header flex-center">
        <div className="logo-container flex-center">
          <ShoppingBag size={24} className="text-primary" />
        </div>
        <span className="brand-name">1shopapp</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">U</div>
          <div className="user-info">
            <span className="name">User Name</span>
            <span className="role">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
