import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, ChevronDown, Package, BookOpen, Users, Mail, BarChart3, AppWindow, Megaphone, Building, Headphones, ShoppingCart, Heart, Rocket, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWatchlist } from '../../hooks/useWatchlist';

const SOLUTIONS_TABS = {
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
            { label: 'Help Center', path: '/contact', description: 'Get professional support', icon: Headphones },
        ]
    },
    company: {
        label: 'Company',
        icon: Users,
        items: [
            { label: 'Join Our Journey', path: '/join-journey', description: 'Be part of our mission', icon: Rocket },
            { label: 'Analytics', path: '/dashboard/analytics', description: 'Track your performance', icon: BarChart3 },
            { label: 'Marketing', path: '/marketing', description: 'Growth tools', icon: Megaphone },
        ]
    }
};

const StorefrontNavbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const { watchlist } = useWatchlist();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileSection, setMobileSection] = useState(null); // tracks which accordion is open
    const [activeTab, setActiveTab] = useState('business');
    const dropdownRef = useRef(null);

    const handleLogout = () => { logout(); navigate('/'); };

    const closeMobile = () => { setMobileOpen(false); setMobileSection(null); };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    // Close desktop dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setSolutionsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const cartCount = cartItems.length;
    const wishCount = watchlist.size;

    return (
        <nav className="storefront-nav" role="navigation">
            <div className="nav-container">
                {/* Brand */}
                <NavLink to="/" className="brand-link" onClick={closeMobile}>
                    <ShoppingBag size={26} strokeWidth={2.5} />
                    <span>1shopapp</span>
                </NavLink>

                {/* Desktop Links */}
                <div className="nav-links desktop-only">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Store</NavLink>
                    <NavLink to="/catalog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
                    <NavLink to="/latest-releases" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>New Arrivals</NavLink>

                    {/* Mega Menu */}
                    <div className="nav-dropdown" ref={dropdownRef}>
                        <button
                            className={`dropdown-trigger nav-link ${solutionsOpen ? 'active' : ''}`}
                            onClick={() => setSolutionsOpen(v => !v)}
                            onMouseEnter={() => setSolutionsOpen(true)}
                        >
                            Solutions
                            <ChevronDown size={14} className={`dropdown-icon ${solutionsOpen ? 'open' : ''}`} />
                        </button>
                        {solutionsOpen && (
                            <div className="mega-menu" onMouseLeave={() => setSolutionsOpen(false)}>
                                <div className="mega-menu-tabs">
                                    {Object.entries(SOLUTIONS_TABS).map(([key, tab]) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={key}
                                                className={`mega-menu-tab ${activeTab === key ? 'active' : ''}`}
                                                onMouseEnter={() => setActiveTab(key)}
                                                onClick={() => setActiveTab(key)}
                                            >
                                                <Icon size={16} />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="mega-menu-content">
                                    {SOLUTIONS_TABS[activeTab].items.map((item, i) => {
                                        const Icon = item.icon;
                                        return (
                                            <NavLink
                                                key={i}
                                                to={item.path}
                                                className="mega-menu-item"
                                                onClick={() => setSolutionsOpen(false)}
                                            >
                                                <div className="mega-menu-item-icon"><Icon size={18} /></div>
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

                    <NavLink to="/dashboard" className={({ isActive }) => `nav-link admin-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
                </div>

                {/* Nav Actions */}
                <div className="nav-actions">
                    {/* Cart */}
                    <NavLink to="/cart" className="icon-link" title="Cart">
                        <div className="icon-container">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
                        </div>
                    </NavLink>

                    {/* Wishlist */}
                    <NavLink to="/wishlist" className="icon-link" title="Wishlist">
                        <div className="icon-container">
                            <Heart size={20} />
                            {wishCount > 0 && <span className="nav-badge wish">{wishCount}</span>}
                        </div>
                    </NavLink>

                    {/* User */}
                    {user ? (
                        <div className="user-menu">
                            <span className="user-name desktop-only">Hi, {user.displayName.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="icon-link" title="Logout">
                                <LogOut size={19} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login" className="icon-link desktop-only" title="Login">
                                <User size={20} />
                            </NavLink>
                            <NavLink to="/signup" className="nav-signup-btn desktop-only">Sign Up</NavLink>
                        </>
                    )}

                    {/* Hamburger — mobile only */}
                    <button
                        className="hamburger mobile-only"
                        onClick={() => setMobileOpen(v => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <span className={`ham-bar bar1 ${mobileOpen ? 'open' : ''}`} />
                        <span className={`ham-bar bar2 ${mobileOpen ? 'open' : ''}`} />
                        <span className={`ham-bar bar3 ${mobileOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>

            {/* ── Mobile Drawer ──────────────────────────────── */}
            {mobileOpen && (
                <div className="mobile-drawer" role="dialog" aria-modal="true">
                    {/* Backdrop */}
                    <div className="mobile-drawer-backdrop" onClick={closeMobile} />

                    {/* Drawer Panel */}
                    <div className="mobile-drawer-panel">
                        {/* Header */}
                        <div className="mobile-drawer-header">
                            <NavLink to="/" className="brand-link" onClick={closeMobile}>
                                <ShoppingBag size={22} strokeWidth={2.5} />
                                <span>1shopapp</span>
                            </NavLink>
                            <button className="mobile-drawer-close" onClick={closeMobile} aria-label="Close menu">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Nav items */}
                        <div className="mobile-nav-items">
                            <NavLink to="/" className="mobile-nav-link" onClick={closeMobile}>Store</NavLink>
                            <NavLink to="/catalog" className="mobile-nav-link" onClick={closeMobile}>Products</NavLink>
                            <NavLink to="/latest-releases" className="mobile-nav-link" onClick={closeMobile}>New Arrivals</NavLink>
                            <NavLink to="/dashboard" className="mobile-nav-link" onClick={closeMobile}>Dashboard</NavLink>

                            {/* Solutions accordion */}
                            <div className="mobile-accordion">
                                <button
                                    className="mobile-accordion-trigger"
                                    onClick={() => setMobileSection(mobileSection === 'solutions' ? null : 'solutions')}
                                >
                                    Solutions
                                    <ChevronDown size={14} className={mobileSection === 'solutions' ? 'open' : ''} />
                                </button>
                                {mobileSection === 'solutions' && (
                                    <div className="mobile-accordion-content">
                                        {Object.entries(SOLUTIONS_TABS).map(([, tab]) =>
                                            tab.items.map((item, i) => (
                                                <NavLink key={i} to={item.path} className="mobile-sub-link" onClick={closeMobile}>
                                                    {item.label}
                                                </NavLink>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mobile-drawer-footer">
                            {user ? (
                                <button onClick={() => { handleLogout(); closeMobile(); }} className="mobile-logout-btn">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            ) : (
                                <div className="mobile-auth-btns">
                                    <NavLink to="/login" className="mobile-login-btn" onClick={closeMobile}>Log In</NavLink>
                                    <NavLink to="/signup" className="mobile-signup-btn" onClick={closeMobile}>Sign Up Free</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default StorefrontNavbar;
