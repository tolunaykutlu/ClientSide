import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Briefcase, LogOut } from 'lucide-react';
import { authService } from '../services/authService';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/stok', label: 'Stok Yönetimi', icon: Package },
        { path: '/fason', label: 'Fason İşlemler', icon: Briefcase },
    ];

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{ marginBottom: '2rem', padding: '1rem 2rem' }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: 0, gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 auto' }}>
                    <LayoutDashboard color="#0ea5e9" size={28} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        StainlessMarket
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', overflowX: 'auto', paddingBottom: '2px', flex: '0 1 auto' }}>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
