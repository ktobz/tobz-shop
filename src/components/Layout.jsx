import React, { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarContext = createContext(260);

export const useSidebarWidth = () => useContext(SidebarContext);

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          marginLeft: '260px',
          minHeight: '100vh',
          padding: '2rem',
          background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 30%, #f9fafb 60%, #f3f4f6 100%)',
          transition: 'margin-left 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
