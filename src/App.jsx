import React from 'react';
import { Routes, Route } from 'react-router-dom';

// UI Library Providers
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ConfigProvider, theme as antdTheme } from 'antd';

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
import Inventory from './pages/storefront/Inventory';
import WhatsNew from './pages/storefront/WhatsNew';
import Resources from './pages/storefront/Resources';
import LatestReleases from './pages/storefront/LatestReleases';
import Cart from './pages/storefront/Cart';
import Wishlist from './pages/storefront/Wishlist';

/* Auth Components */
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import './App.scss';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  }); // Light MUI theme

  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfigProvider theme={{ algorithm: antdTheme.defaultAlgorithm }}>
          <Routes>
            {/* Storefront Routes */}
            <Route path="/" element={<StorefrontLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="catalog" element={<ProductCatalog />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="whats-new" element={<WhatsNew />} />
              <Route path="resources" element={<Resources />} />
              <Route path="latest-releases" element={<LatestReleases />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
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
        </ConfigProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
