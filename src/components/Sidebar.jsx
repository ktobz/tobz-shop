import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Settings, ShoppingBag, ChevronLeft, ChevronRight, Package, Users, ShoppingCart } from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Products', path: '/dashboard/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '260px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.02), 2px 0 12px rgba(0,0,0,0.03)',
        zIndex: 50,
        transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        padding: collapsed ? '20px 16px' : '20px 20px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          marginBottom: '32px',
          gap: '10px',
        }}
      >
        {!collapsed && (
          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShoppingBag size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#111827', letterSpacing: '-0.02em' }}>
              1shopapp
            </span>
          </NavLink>
        )}
        {collapsed && (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShoppingBag size={18} color="#fff" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(0,0,0,0.04)',
            border: 'none',
            borderRadius: '8px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6b7280',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = '#111827'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#6b7280'; }}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '12px' : '12px 14px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: isActive ? '#111827' : '#6b7280',
              fontWeight: isActive ? 700 : 600,
              fontSize: '0.9rem',
              background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
              transition: 'all 0.2s ease',
              justifyContent: collapsed ? 'center' : 'flex-start',
              letterSpacing: '-0.01em',
            })}
            onMouseEnter={(e) => {
              const isActive = e.currentTarget.className.includes('active');
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              const isActive = e.currentTarget.className.includes('active');
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #111827, #374151)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.8rem',
            flexShrink: 0,
          }}
        >
          A
        </div>
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827' }}>Admin</span>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 500 }}>Super Admin</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
