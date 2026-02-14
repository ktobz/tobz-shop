import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, ShoppingBag } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Store', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <NavLink to="/" className="sidebar-header flex-center" style={{ textDecoration: 'none', cursor: 'pointer' }}>
        <div className="logo-container flex-center">
          <ShoppingBag size={24} className="text-primary" />
        </div>
        <span className="brand-name">1shopapp</span>
      </NavLink>

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
