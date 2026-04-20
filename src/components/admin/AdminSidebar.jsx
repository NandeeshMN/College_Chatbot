import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MessageSquare, Image, LogOut, LayoutDashboard, X } from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        navigate('/', { replace: true });
    };

    const linkStyle = ({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.875rem 1rem',
        color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
        backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
        borderRadius: '8px',
        textDecoration: 'none',
        marginBottom: '0.5rem',
        transition: 'all 0.2s ease',
        fontWeight: isActive ? 'bold' : 'normal'
    });

    return (
        <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-sidebar-btn" onClick={() => setIsOpen(false)}>
                <X size={24} />
            </button>
            <div className="admin-sidebar-logo">
                <LayoutDashboard size={24} />
                <span>CBS Admin</span>
            </div>

            <nav style={{ flex: 1 }}>
                <NavLink to="/admin-dashboard/chatbot" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <MessageSquare size={20} />
                    <span>Chatbot Data</span>
                </NavLink>
                
                <NavLink to="/admin-dashboard/ads" style={linkStyle} onClick={() => setIsOpen(false)}>
                    <Image size={20} />
                    <span>Ad Management</span>
                </NavLink>
            </nav>

            <button 
                onClick={handleLogout}
                style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    color: 'rgba(255,255,255,0.7)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default AdminSidebar;
