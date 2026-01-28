import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Briefcase, LogOut } from 'lucide-react';
import { authService } from '../services/authService';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/stok', label: 'Stok Yönetimi', icon: Package },
        { path: '/fason', label: 'Fason İşlemler', icon: Briefcase },
    ];

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
        setMenuOpen(false);
    };

    const handleMenuToggle = () => setMenuOpen((prev) => !prev);

    const isAuthenticated = authService.isAuthenticated();
    return (
        <nav className="glass-panel" style={{ marginBottom: '2rem', padding: '1rem 2rem' }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: 0, gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 auto' }}>
                    <LayoutDashboard color="#0ea5e9" size={28} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        StainlessMarket
                    </span>
                </div>
                {/* Hamburger icon for mobile */}
                <button
                    className="mobile-hamburger"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        alignItems: 'center',
                        padding: '0.5rem',
                        marginLeft: 'auto',
                    }}
                    aria-label="Menüyü Aç/Kapat"
                    onClick={handleMenuToggle}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </button>
                {/* Desktop menu */}
                <div className="desktop-navbar" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', overflowX: 'auto', paddingBottom: '2px', flex: '0 1 auto' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                padding: '0.5rem 0.8rem',
                                borderRadius: '8px',
                                color: isActive(item.path) ? '#fff' : '#94a3b8',
                                background: isActive(item.path) ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                                fontSize: '0.9rem'
                            }}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    ))}
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.8rem',
                                borderRadius: '8px',
                                color: '#0ea5e9',
                                background: 'rgba(14, 165, 233, 0.1)',
                                border: '1px solid rgba(14, 165, 233, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                                fontSize: '0.9rem',
                                fontFamily: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            Giriş Yap
                        </Link>
                    )}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 0.8rem',
                                borderRadius: '8px',
                                color: '#ef4444',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                                fontSize: '0.9rem',
                                fontFamily: 'inherit'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                        >
                            <LogOut size={16} />
                            Çıkış
                        </button>
                    )}
                </div>
                {/* Mobile menu (drawer) */}
                {menuOpen && (
                    <div className="mobile-navbar" style={{
                        position: 'absolute',
                        top: '70px',
                        right: '20px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        padding: '1rem',
                        zIndex: 100,
                        minWidth: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        animation: 'fadeIn 0.2s',
                    }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    textDecoration: 'none',
                                    padding: '0.5rem 0.8rem',
                                    borderRadius: '8px',
                                    color: isActive(item.path) ? '#fff' : '#94a3b8',
                                    background: isActive(item.path) ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <item.icon size={16} />
                                {item.label}
                            </Link>
                        ))}
                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 0.8rem',
                                    borderRadius: '8px',
                                    color: '#0ea5e9',
                                    background: 'rgba(14, 165, 233, 0.1)',
                                    border: '1px solid rgba(14, 165, 233, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem',
                                    fontFamily: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                Giriş Yap
                            </Link>
                        )}
                        {isAuthenticated && (
                            <button
                                onClick={handleLogout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 0.8rem',
                                    borderRadius: '8px',
                                    color: '#ef4444',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem',
                                    fontFamily: 'inherit'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                }}
                            >
                                <LogOut size={16} />
                                Çıkış
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
