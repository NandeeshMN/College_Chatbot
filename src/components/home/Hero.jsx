import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Shape Your Future at Chetan Business School',
        subtitle: 'Institute of Management, IT & Research',
        cta: 'Apply For Admission'
    },
    {
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Excellence in Education',
        subtitle: 'Empowering students with knowledge and skills',
        cta: 'Explore Programs'
    },
    {
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'State-of-the-Art Infrastructure',
        subtitle: 'Creating an inspiring learning environment',
        cta: 'Campus Tour'
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === slides.length - 1 ? 0 : current + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [current]);

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    return (
        <section className={styles.hero}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === current ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className={styles.overlay}>
                        <div className={`container ${styles.content}`}>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <p className={styles.subtitle}>{slide.subtitle}</p>
                            <Link to="/#enroll-now" className={styles.ctaButton}>
                                {slide.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <button className={styles.prevBtn} onClick={prevSlide}>
                <ChevronLeft size={32} />
            </button>
            <button className={styles.nextBtn} onClick={nextSlide}>
                <ChevronRight size={32} />
            </button>

            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === current ? styles.activeIndicator : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
