import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-login', { replace: true });
        }

        // Prevent back-button caching
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            if (!sessionStorage.getItem('adminToken')) {
                window.location.replace("/admin-login");
            } else {
                window.history.pushState(null, "", window.location.href);
            }
        };

        return () => {
            window.onpopstate = null; // cleanup
        };
    }, [navigate]);

    return (
        <div className="admin-layout-container">
            {/* Mobile Toggle Button */}
            <button className="mobile-nav-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
            </button>

            {/* Sidebar Overlay for Mobile */}
            <div 
                className={`admin-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
