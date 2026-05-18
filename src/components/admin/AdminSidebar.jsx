import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MessageSquare, Image, LogOut, LayoutDashboard, X, AlertTriangle } from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        <>
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
                    onClick={() => setShowLogoutModal(true)}
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
                    className="admin-logout-btn"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000,
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '16px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        animation: 'scaleIn 0.2s ease'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#fff5f5',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#e53e3e'
                        }}>
                            <AlertTriangle size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a365d', marginBottom: '0.5rem' }}>Logout Confirmation</h3>
                        <p style={{ color: '#718096', marginBottom: '2rem' }}>Are you sure you want to log out? You will need to sign in again to access the admin panel.</p>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: 'white',
                                    color: '#4a5568',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleLogout}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: '#e53e3e',
                                    color: 'white',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSidebar;
