import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, ChevronDown, Package, BookOpen, Users, Mail, BarChart3, AppWindow, Megaphone, Building, Headphones, ShoppingCart, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWatchlist } from '../../hooks/useWatchlist';

const StorefrontNavbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const { watchlist } = useWatchlist();
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
                { label: 'Products', path: '/inventory', description: 'Manage your stock efficiently', icon: Package },
                { label: 'About Us', path: '/about', description: 'Learn about our story', icon: Building },
                { label: 'Support', path: '/contact', description: 'Get in touch with us', icon: Headphones },
            ]
        },
        resources: {
            label: 'Resources',
            icon: BookOpen,
            items: [
                { label: 'Apps & Resources', path: '/resources', description: 'Guides, tutorials and more', icon: AppWindow },
                { label: 'Help Center', path: '/contact', description: 'Get technical support', icon: Headphones },
            ]
        },
        company: {
            label: 'Company',
            icon: Users,
            items: [
                { label: 'Analytics', path: '/dashboard/analytics', description: 'Track your performance', icon: BarChart3 },
                { label: 'Marketing', path: '/resources#api', description: 'Developer resources', icon: Megaphone },
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
                    <NavLink to="/" className="nav-link">Store</NavLink>
                    <NavLink to="/catalog" className="nav-link">Products</NavLink>
                    <NavLink to="/latest-releases" className="nav-link">Latest Products</NavLink>

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
                                    {solutionsTabs[activeTab].items.map((item, index) => {
                                        const ItemIcon = item.icon;
                                        return (
                                            <NavLink
                                                key={index}
                                                to={item.path}
                                                className="mega-menu-item"
                                                onClick={() => setSolutionsOpen(false)}
                                            >
                                                <div className="mega-menu-item-icon">
                                                    <ItemIcon size={20} />
                                                </div>
                                                <div className="mega-menu-item-text">
                                                    <div className="mega-menu-item-title">{item.label}</div>
                                                    <div className="mega-menu-item-desc">{item.description}</div>
                                                </div>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink to="/dashboard" className="nav-link admin-link">Dashboard</NavLink>
                </div>

                <div className="nav-actions">
                    <NavLink to="/cart" className="icon-link" title="Shopping Cart">
                        <div className="icon-container">
                            <ShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                        </div>
                    </NavLink>
                    <NavLink to="/wishlist" className="icon-link" title="Wishlist">
                        <div className="icon-container">
                            <Heart size={20} />
                            {watchlist.size > 0 && (
                                <span className="badge">{watchlist.size}</span>
                            )}
                        </div>
                    </NavLink>
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
                        <NavLink to="/" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Store</NavLink>
                        <NavLink to="/catalog" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Products</NavLink>
                        <NavLink to="/latest-releases" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Latest Products</NavLink>

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
                        <NavLink to="/dashboard" className="mobile-menu-item admin-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>

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
