import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, User, Search, Heart, ChevronDown } from 'lucide-react';

const StorefrontNavbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav className="storefront-nav">
            <div className="nav-container">
                <NavLink to="/" className="brand-link">
                    <ShoppingBag className="text-primary" />
                    <span>1shopapp</span>
                </NavLink>

                <div className="nav-links">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/catalog" className="nav-link">Shop</NavLink>
                    
                    {/* Solutions Dropdown */}
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
                                <NavLink to="/catalog" className="dropdown-item">E-Commerce</NavLink>
                                <NavLink to="/catalog" className="dropdown-item">Inventory</NavLink>
                                <NavLink to="/catalog" className="dropdown-item">Analytics</NavLink>
                                <NavLink to="/catalog" className="dropdown-item">Payments</NavLink>
                            </div>
                        )}
                    </div>

                    {/* What's New Dropdown */}
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
                                <NavLink to="/" className="dropdown-item">Latest Updates</NavLink>
                                <NavLink to="/" className="dropdown-item">Feature Releases</NavLink>
                                <NavLink to="/" className="dropdown-item">Blog</NavLink>
                            </div>
                        )}
                    </div>

                    {/* Resources Dropdown */}
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
                                <NavLink to="/" className="dropdown-item">Documentation</NavLink>
                                <NavLink to="/" className="dropdown-item">Tutorials</NavLink>
                                <NavLink to="/" className="dropdown-item">API Reference</NavLink>
                                <NavLink to="/" className="dropdown-item">Support</NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/about" className="nav-link">About</NavLink>
                    <NavLink to="/contact" className="nav-link">Contact</NavLink>
                    <NavLink to="/dashboard" className="nav-link admin-link">Admin</NavLink>
                </div>

                <div className="nav-actions">
                    <button className="nav-icon-btn" title="Search">
                        <Search size={20} />
                    </button>
                    <button className="nav-icon-btn" title="Wishlist">
                        <Heart size={20} />
                    </button>
                    <NavLink to="/login" className="login-btn">
                        <User size={20} />
                        <span>Login</span>
                    </NavLink>
                    <NavLink to="/signup" className="btn-primary">Sign Up</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default StorefrontNavbar;
