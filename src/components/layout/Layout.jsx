import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = () => {
    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
        </>
    );
};

export default Layout;
