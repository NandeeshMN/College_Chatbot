import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';
import hero1 from '../../assets/slider/hero1.png';
import hero2 from '../../assets/slider/hero2.png';
import hero3 from '../../assets/slider/hero3.png';

const slides = [
    {
        image: hero1,
        title: 'Shape Your Future at Chetan Business School',
        subtitle: 'Institute of Management, IT & Research',
        cta: 'Apply For Admission'
    },
    {
        image: hero2,
        title: 'Excellence in Education',
        subtitle: 'Empowering students with knowledge and skills',
        cta: 'Explore Programs'
    },
    {
        image: hero3,
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
