"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, User, LogOut, Menu, X, ChevronDown, Package, BookOpen, Users, Mail, BarChart3, AppWindow, Megaphone, Building, Headphones, ShoppingCart, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWatchlist } from '../../hooks/useWatchlist';
import ThemeToggle from '../ThemeToggle';

const StorefrontNavbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const { watchlist } = useWatchlist();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('business');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSolutionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const solutionsTabs: Record<string, { label: string; icon: any; items: { label: string; path: string; description: string; icon: any }[] }> = {
        business: {
            label: 'Business',
            icon: Package,
            items: [
                { label: 'Products', path: '/inventory', description: 'Manage your stock efficiently', icon: Package },
                { label: 'Analytics', path: '/dashboard/analytics', description: 'Track your performance', icon: BarChart3 },
            ]
        },
        resources: {
            label: 'Resources',
            icon: BookOpen,
            items: [
                { label: 'Apps', path: '/resources', description: 'Guides and tutorials', icon: AppWindow },
                { label: 'Marketing', path: '/resources#api', description: 'Developer resources', icon: Megaphone },
            ]
        },
        company: {
            label: 'Company',
            icon: Users,
            items: [
                { label: 'About Us', path: '/about', description: 'Learn about our story', icon: Building },
                { label: 'Support', path: '/contact', description: 'Get in touch with us', icon: Headphones },
            ]
        }
    };

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-lg sticky top-0 z-[100] border-b border-base-200 px-4 lg:px-10">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </label>
                </div>
                <Link href="/" className="btn btn-ghost text-xl normal-case gap-2 px-2 hover:bg-transparent">
                    <ShoppingBag className="text-primary" size={28} />
                    <span className="font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">1shopapp</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li><Link href="/" className={`font-semibold ${pathname === '/' ? 'text-primary' : ''}`}>Store</Link></li>
                    <li><Link href="/catalog" className={`font-semibold ${pathname === '/catalog' ? 'text-primary' : ''}`}>Products</Link></li>
                    <li><Link href="/latest-releases" className={`font-semibold ${pathname === '/latest-releases' ? 'text-primary' : ''}`}>Latest</Link></li>
                    <li tabIndex={0} className="z-[101]" ref={dropdownRef}>
                        <details open={solutionsOpen}>
                            <summary className="font-semibold" onClick={(e) => { e.preventDefault(); setSolutionsOpen(!solutionsOpen); }}>
                                Solutions
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-lg shadow-xl border border-base-200 w-80">
                                {Object.entries(solutionsTabs).map(([key, tab]) => {
                                    const Icon = tab.icon;
                                    return (
                                        <React.Fragment key={key}>
                                            <li className="menu-title flex flex-row items-center gap-2 mt-2 first:mt-0">
                                                <Icon size={14} className="text-primary" />
                                                <span>{tab.label}</span>
                                            </li>
                                            {tab.items.map((item, idx) => (
                                                <li key={idx}><Link href={item.path} className="text-sm font-normal py-2">{item.label}</Link></li>
                                            ))}
                                        </React.Fragment>
                                    )
                                })}
                            </ul>
                        </details>
                    </li>
                    <li><Link href="/dashboard" className="font-semibold">Dashboard</Link></li>
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <div className="hidden sm:flex items-center gap-1">
                    <ThemeToggle />
                    <Link href="/wishlist" className="btn btn-ghost btn-circle" title="Wishlist">
                        <div className="indicator">
                            <Heart size={20} />
                            {watchlist.size > 0 && (
                                <span className="badge badge-sm badge-primary indicator-item">{watchlist.size}</span>
                            )}
                        </div>
                    </Link>
                    <Link href="/cart" className="btn btn-ghost btn-circle" title="Shopping Cart">
                        <div className="indicator">
                            <ShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="badge badge-sm badge-primary indicator-item">{cartItems.length}</span>
                            )}
                        </div>
                    </Link>
                </div>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost gap-2 normal-case border-none hover:bg-base-200">
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-8">
                                    <span className="text-xs">{user.name?.[0] || 'U'}</span>
                                </div>
                            </div>
                            <span className="hidden md:inline font-semibold">{user.name}</span>
                            <ChevronDown size={14} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[101] menu p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200 mt-4">
                            <li><Link href="/dashboard"><User size={16} /> Profile</Link></li>
                            <li><Link href="/dashboard/settings"><BarChart3 size={16} /> Settings</Link></li>
                            <div className="divider my-0"></div>
                            <li><button onClick={handleLogout} className="text-error"><LogOut size={16} /> Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="btn btn-ghost hidden sm:inline-flex rounded-full">Login</Link>
                        <Link href="/signup" className="btn btn-primary text-white shadow-lg shadow-primary/20 rounded-full">Sign Up</Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-base-100 border-b border-base-200 shadow-xl p-4 flex flex-col gap-2 z-[99]">
                    <Link href="/" className="btn btn-ghost justify-start" onClick={() => setMobileMenuOpen(false)}>Store</Link>
                    <Link href="/catalog" className="btn btn-ghost justify-start" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                    <Link href="/latest-releases" className="btn btn-ghost justify-start" onClick={() => setMobileMenuOpen(false)}>Latest</Link>
                    <Link href="/dashboard" className="btn btn-ghost justify-start" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    <div className="divider my-1"></div>
                    {!user && (
                        <Link href="/signup" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default StorefrontNavbar;
