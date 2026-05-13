import React, { useState, useEffect } from 'react';
import { MessageSquare, BookOpen } from 'lucide-react';
import styles from './Hero.module.css';

// Import slider images
import mca1 from '../../assets/gallery/MCA/mca1.png';
import classroom from '../../assets/gallery/infrastructure/classroom_lecture.png';
import village from '../../assets/gallery/outing/traditional_village_visit.png';
import conference from '../../assets/gallery/conference/conference_large_group.png';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [mca1, classroom, village, conference];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleExploreCourses = () => {
        const el = document.getElementById('enquiry-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChatToggle = () => {
        const toggleBtn = document.querySelector('[aria-label="Toggle Chatbot"]');
        if (toggleBtn) toggleBtn.click();
    };

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                {/* Left Column: Content */}
                <div className={styles.heroLeft}>
                    <div className={styles.badge}>Admissions Open 2026</div>
                    <h1 className={styles.heading}>
                        Empowering Students <br />
                        for a <span className={styles.gradientText}>Better Future</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Join a legacy of innovation and excellence. We provide quality education
                        through industry-ready skills and research-driven learning.
                    </p>
                    <div className={styles.buttonGroup}>
                        <button className={styles.primaryBtn} onClick={handleExploreCourses}>
                            Apply for Admission <BookOpen size={18} />
                        </button>
                        <button className={styles.secondaryBtn} onClick={handleChatToggle}>
                            Get Admission Guidance <MessageSquare size={18} />
                        </button>
                    </div>
                </div>

                {/* Right Column: Visuals (Auto Slider) */}
                <div className={styles.heroRight}>
                    <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                            {slides.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Campus slide ${index + 1}`}
                                    className={`${styles.mainImage} ${index === currentSlide ? styles.activeSlide : ''}`}
                                />
                            ))}
                        </div>

                        {/* Slider Pagination Dots */}
                        <div className={styles.pagination}>
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
