import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, ChevronDown, Package, BookOpen, Users, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StorefrontNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('business');
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSolutionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const solutionsTabs = {
        business: {
            label: 'Business',
            icon: Package,
            items: [
                { label: 'Inventory Management', path: '/inventory', description: 'Manage your stock efficiently' },
                { label: 'Analytics Dashboard', path: '/dashboard/analytics', description: 'Track your performance' },
            ]
        },
        resources: {
            label: 'Resources',
            icon: BookOpen,
            items: [
                { label: 'Documentation', path: '/resources', description: 'Guides and tutorials' },
                { label: 'API Reference', path: '/resources#api', description: 'Developer resources' },
            ]
        },
        company: {
            label: 'Company',
            icon: Users,
            items: [
                { label: 'About Us', path: '/about', description: 'Learn about our story' },
                { label: 'Contact', path: '/contact', description: 'Get in touch with us' },
            ]
        }
    };

    return (
        <nav className="storefront-nav">
            <div className="nav-container">
                <NavLink to="/" className="brand-link">
                    <ShoppingBag className="text-primary" size={28} />
                    <span>1shopapp</span>
                </NavLink>

                {/* Desktop Links */}
                <div className="nav-links desktop-only">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/catalog" className="nav-link">Shop</NavLink>
                    <NavLink to="/latest-releases" className="nav-link">New Releases</NavLink>
                    
                    {/* Solutions Mega Menu */}
                    <div className="nav-dropdown" ref={dropdownRef}>
                        <button 
                            className="dropdown-trigger nav-link"
                            onClick={() => setSolutionsOpen(!solutionsOpen)}
                            onMouseEnter={() => setSolutionsOpen(true)}
                        >
                            Solutions
                            <ChevronDown 
                                size={16} 
                                className={`dropdown-icon ${solutionsOpen ? 'open' : ''}`}
                            />
                        </button>
                        {solutionsOpen && (
                            <div className="mega-menu" onMouseLeave={() => setSolutionsOpen(false)}>
                                <div className="mega-menu-tabs">
                                    {Object.entries(solutionsTabs).map(([key, tab]) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={key}
                                                className={`mega-menu-tab ${activeTab === key ? 'active' : ''}`}
                                                onMouseEnter={() => setActiveTab(key)}
                                            >
                                                <Icon size={18} />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="mega-menu-content">
                                    {solutionsTabs[activeTab].items.map((item, index) => (
                                        <NavLink
                                            key={index}
                                            to={item.path}
                                            className="mega-menu-item"
                                            onClick={() => setSolutionsOpen(false)}
                                        >
                                            <div className="mega-menu-item-title">{item.label}</div>
                                            <div className="mega-menu-item-desc">{item.description}</div>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink to="/dashboard" className="nav-link admin-link">Admin</NavLink>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <div className="user-profile">
                            <span className="user-name">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="login-btn" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/login" className="login-btn">
                            <User size={20} />
                            <span>Login</span>
                        </NavLink>
                    )}

                    {!user && (
                        <NavLink to="/signup" className="btn-primary desktop-only">Sign Up</NavLink>
                    )}

                    {/* Mobile Menu Toggle - Only visible on mobile */}
                    <button
                        className="mobile-menu-toggle mobile-only"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu fade-in">
                    <div className="mobile-menu-content">
                        <NavLink to="/" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/catalog" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Shop</NavLink>
                        <NavLink to="/latest-releases" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>New Releases</NavLink>
                        
                        <div className="mobile-menu-divider"></div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0.5rem 1rem', letterSpacing: '0.5px' }}>Solutions</div>
                        
                        {Object.entries(solutionsTabs).map(([key, tab]) => (
                            <div key={key}>
                                {tab.items.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        className="mobile-menu-item"
                                        style={{ paddingLeft: '2rem' }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                        
                        <div className="mobile-menu-divider"></div>
                        <NavLink to="/dashboard" className="mobile-menu-item admin-link" onClick={() => setMobileMenuOpen(false)}>Admin</NavLink>
                        
                        {!user && (
                            <NavLink to="/signup" className="btn-primary mobile-menu-btn" onClick={() => setMobileMenuOpen(false)}>Sign Up</NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default StorefrontNavbar;
