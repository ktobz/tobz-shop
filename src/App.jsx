import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* Admin Components */
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

/* Storefront Components */
import StorefrontLayout from './components/storefront/StorefrontLayout';
import LandingPage from './pages/storefront/LandingPage';
import ProductCatalog from './pages/storefront/ProductCatalog';
import About from './pages/storefront/About';
import Contact from './pages/storefront/Contact';

/* Auth Components */
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Storefront Routes */}
      <Route path="/" element={<StorefrontLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="catalog" element={<ProductCatalog />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
