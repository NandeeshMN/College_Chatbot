import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import WhyCBS from '../components/home/WhyCBS';
import Courses from '../components/home/Courses';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import EnrollmentForm from '../components/home/EnrollmentForm';

const Home = () => {
    const location = useLocation();
    const [activeAd, setActiveAd] = useState(null);
    const [showAdPopup, setShowAdPopup] = useState(false);

    useEffect(() => {
        const fetchActiveAd = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/ads/active');
                const result = await response.json();
                if (result.success && result.data) {
                    console.log('Active Ad fetched:', result.data);
                    setActiveAd(result.data);
                    setShowAdPopup(true);
                }
            } catch (error) {
                console.error('Error fetching active ad for popup:', error);
            }
        };
        fetchActiveAd();
    }, []);

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="home-page">
            <Helmet>
                <title>Chetan Business School | Hubballi</title>
            </Helmet>

            {/* ADVERTISEMENT POPUP MODAL */}
            {showAdPopup && activeAd && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 99999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        position: 'relative',
                        backgroundColor: activeAd.redirect_link ? 'white' : 'transparent',
                        padding: activeAd.redirect_link ? '0.5rem' : '0',
                        borderRadius: '12px',
                        width: '95%',
                        maxWidth: '500px', // slightly tighter for better button proportion
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                    }}>
                        {/* Always show top-right X button for safety/consistency */}
                        <button 
                            onClick={() => setShowAdPopup(false)}
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                transform: 'translate(40%, -40%)',
                                background: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 10,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                            }}
                        >
                            <X size={20} color="#1a202c" />
                        </button>

                        {activeAd.redirect_link ? (
                            <>
                                <img 
                                    src={`http://localhost:5000${activeAd.image_url}`} 
                                    alt="Advertisement" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        maxHeight: '70vh', 
                                        objectFit: 'contain', 
                                        borderRadius: '8px',
                                        marginBottom: '0.5rem'
                                    }}
                                />
                                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', padding: '0.5rem' }}>
                                    <a 
                                        href={activeAd.redirect_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ 
                                            flex: 1, 
                                            textAlign: 'center', 
                                            backgroundColor: '#3b82f6', 
                                            color: 'white', 
                                            padding: '0.8rem', 
                                            borderRadius: '8px', 
                                            fontWeight: 'bold', 
                                            textDecoration: 'none',
                                            transition: 'opacity 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.opacity = 0.9}
                                        onMouseLeave={(e) => e.target.style.opacity = 1}
                                    >
                                        Apply Now
                                    </a>
                                    <button 
                                        onClick={() => setShowAdPopup(false)}
                                        style={{ 
                                            flex: 1, 
                                            backgroundColor: '#ef4444', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '0.8rem', 
                                            borderRadius: '8px', 
                                            fontWeight: 'bold', 
                                            cursor: 'pointer',
                                            transition: 'opacity 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.opacity = 0.9}
                                        onMouseLeave={(e) => e.target.style.opacity = 1}
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        ) : (
                            <img 
                                src={`http://localhost:5000${activeAd.image_url}`} 
                                alt="Advertisement" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    maxHeight: '80vh', 
                                    objectFit: 'contain', 
                                    borderRadius: '12px'
                                }}
                            />
                        )}
                    </div>
                </div>
            )}

            <Hero />
            <About />
            <WhyCBS />
            <Courses />
            <Features />
            <Testimonials />
            <EnrollmentForm />
        </div>
    );
};

export default Home;
