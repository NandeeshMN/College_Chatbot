import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import styles from './WebsiteLayout.module.css';

const WebsiteLayout = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
        </>
    );
};

export default WebsiteLayout;
