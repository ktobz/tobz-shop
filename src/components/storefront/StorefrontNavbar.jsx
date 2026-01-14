import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, User, Search, Heart, ChevronDown, Menu, X } from 'lucide-react';

const StorefrontNavbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const toggleMobileDropdown = (name) => {
        setOpenMobileDropdown(openMobileDropdown === name ? null : name);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <nav className="storefront-nav">
            <div className="nav-container">
                <NavLink to="/" className="brand-link">
                    <ShoppingBag className="text-primary" />
                    <span>1shopapp</span>
                </NavLink>

                <div className="nav-links desktop-only">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/catalog" className="nav-link">Shop</NavLink>
                    
                    <div className="nav-dropdown">
                        <button 
                            className="nav-link dropdown-trigger"
                            onClick={() => toggleDropdown('solutions')}
                        >
                            Solutions
                            <ChevronDown size={16} className={`dropdown-icon ${openDropdown === 'solutions' ? 'open' : ''}`} />
                        </button>
                        {openDropdown === 'solutions' && (
                            <div className="dropdown-menu">
                                <NavLink to="/inventory" className="dropdown-item">E-Commerce</NavLink>
                                <NavLink to="/inventory" className="dropdown-item">Inventory</NavLink>
                                <NavLink to="/dashboard/analytics" className="dropdown-item">Analytics</NavLink>
                                <NavLink to="/" className="dropdown-item">Payments</NavLink>
                            </div>
                        )}
                    </div>

                    <div className="nav-dropdown">
                        <button 
                            className="nav-link dropdown-trigger"
                            onClick={() => toggleDropdown('news')}
                        >
                            What's New
                            <ChevronDown size={16} className={`dropdown-icon ${openDropdown === 'news' ? 'open' : ''}`} />
                        </button>
                        {openDropdown === 'news' && (
                            <div className="dropdown-menu">
                                <NavLink to="/whats-new" className="dropdown-item">Latest Updates</NavLink>
                                <NavLink to="/whats-new" className="dropdown-item">Feature Releases</NavLink>
                                <NavLink to="/" className="dropdown-item">Blog</NavLink>
                            </div>
                        )}
                    </div>

                    <div className="nav-dropdown">
                        <button 
                            className="nav-link dropdown-trigger"
                            onClick={() => toggleDropdown('resources')}
                        >
                            Resources
                            <ChevronDown size={16} className={`dropdown-icon ${openDropdown === 'resources' ? 'open' : ''}`} />
                        </button>
                        {openDropdown === 'resources' && (
                            <div className="dropdown-menu">
                                <NavLink to="/resources" className="dropdown-item">Documentation</NavLink>
                                <NavLink to="/resources" className="dropdown-item">Tutorials</NavLink>
                                <NavLink to="/resources" className="dropdown-item">API Reference</NavLink>
                                <NavLink to="/contact" className="dropdown-item">Support</NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/about" className="nav-link">About</NavLink>
                    <NavLink to="/contact" className="nav-link">Contact</NavLink>
                    <NavLink to="/dashboard" className="nav-link admin-link">Admin</NavLink>
                </div>

                <div className="nav-actions">
                    <div className={`search-bar ${searchOpen ? 'active' : ''}`}>
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-submit">
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    <button 
                        className="nav-icon-btn" 
                        onClick={() => setSearchOpen(!searchOpen)}
                        title="Search"
                    >
                        <Search size={20} />
                    </button>
                    
                    <button className="nav-icon-btn" title="Wishlist">
                        <Heart size={20} />
                    </button>
                    
                    <NavLink to="/login" className="login-btn desktop-only">
                        <User size={20} />
                        <span>Login</span>
                    </NavLink>
                    
                    <NavLink to="/signup" className="btn-primary desktop-only">Sign Up</NavLink>

                    <button 
                        className="mobile-menu-toggle mobile-only"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        title="Menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-content">
                        <NavLink 
                            to="/" 
                            className="mobile-menu-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/catalog" 
                            className="mobile-menu-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </NavLink>

                        <div className="mobile-accordion">
                            <button 
                                className="mobile-accordion-trigger"
                                onClick={() => toggleMobileDropdown('solutions')}
                            >
                                Solutions
                                <ChevronDown size={16} className={`accordion-icon ${openMobileDropdown === 'solutions' ? 'open' : ''}`} />
                            </button>
                            {openMobileDropdown === 'solutions' && (
                                <div className="mobile-accordion-content">
                                    <NavLink to="/inventory" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>E-Commerce</NavLink>
                                    <NavLink to="/inventory" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Inventory</NavLink>
                                    <NavLink to="/dashboard/analytics" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Analytics</NavLink>
                                    <NavLink to="/" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Payments</NavLink>
                                </div>
                            )}
                        </div>

                        <div className="mobile-accordion">
                            <button 
                                className="mobile-accordion-trigger"
                                onClick={() => toggleMobileDropdown('news')}
                            >
                                What's New
                                <ChevronDown size={16} className={`accordion-icon ${openMobileDropdown === 'news' ? 'open' : ''}`} />
                            </button>
                            {openMobileDropdown === 'news' && (
                                <div className="mobile-accordion-content">
                                    <NavLink to="/whats-new" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Latest Updates</NavLink>
                                    <NavLink to="/whats-new" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Feature Releases</NavLink>
                                    <NavLink to="/" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Blog</NavLink>
                                </div>
                            )}
                        </div>

                        <div className="mobile-accordion">
                            <button 
                                className="mobile-accordion-trigger"
                                onClick={() => toggleMobileDropdown('resources')}
                            >
                                Resources
                                <ChevronDown size={16} className={`accordion-icon ${openMobileDropdown === 'resources' ? 'open' : ''}`} />
                            </button>
                            {openMobileDropdown === 'resources' && (
                                <div className="mobile-accordion-content">
                                    <NavLink to="/resources" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Documentation</NavLink>
                                    <NavLink to="/resources" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Tutorials</NavLink>
                                    <NavLink to="/resources" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>API Reference</NavLink>
                                    <NavLink to="/contact" className="mobile-accordion-item" onClick={() => setMobileMenuOpen(false)}>Support</NavLink>
                                </div>
                            )}
                        </div>

                        <NavLink 
                            to="/about" 
                            className="mobile-menu-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            className="mobile-menu-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </NavLink>
                        <NavLink 
                            to="/dashboard" 
                            className="mobile-menu-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Admin
                        </NavLink>

                        <div className="mobile-menu-divider"></div>

                        <NavLink 
                            to="/login" 
                            className="mobile-menu-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <User size={18} />
                            Login
                        </NavLink>
                        <NavLink 
                            to="/signup" 
                            className="btn-primary mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default StorefrontNavbar;
