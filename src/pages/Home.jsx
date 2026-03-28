import React, { useEffect } from 'react';
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
