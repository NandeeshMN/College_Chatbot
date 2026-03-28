import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

import imgChaitanya from '../../assets/images/Chaitanya.png';
import imgSoumya from '../../assets/images/Soumya.png';
import imgSiddharth from '../../assets/images/Siddharth.png';
import imgShrinidhi from '../../assets/images/Shrinidhi-1.png';

const testimonials = [
    {
        quote: "Chetan Business School offers a top-notch MBA experience with excellent facilities, internships, and 100% placement support. The comprehensive curriculum and highly qualified faculty provide both education and extracurricular opportunities, making CBS an excellent institution for career development",
        name: "Chaitanya Nekkanti",
        image: imgChaitanya
    },
    {
        quote: "I am proud to be a student at Chetan Business School (CBS), where I've gained invaluable intellectual and professional growth. The education and supportive environment have boosted my confidence and helped me become a well-rounded individual. Choosing CBS was the best decision for my future, and I'm grateful to the faculty and administration for guiding us to success.",
        name: "Soumya Elemani",
        image: imgSoumya
    },
    {
        quote: "My time at Chetan Business School was transformative. I overcame my fear of public speaking and gained valuable skills, supported by excellent faculty and facilities. The emphasis on practical learning and strong placement assistance ensures a bright future for all graduates. I'm grateful for the enriching experiences and support from Dr. V.M. Koravi.",
        name: "Siddharth Kalburgi",
        image: imgSiddharth
    },
    {
        quote: "Chetan Business School holds a special place in my heart, thanks to the incredible teachers who guided and influenced me. Dr. Koravi imparted valuable life skills, while Dr. Aniruddha encouraged my growth and resilience. Serving as a placement coordinator highlighted the school's commitment to student success and enriched my experience.",
        name: "Shrinidhi P Y",
        image: imgShrinidhi
    }
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
        }, 6000);
        return () => clearInterval(interval);
    }, [current]);

    return (
        <section className={styles.testimonialsWrapper}>
            <div className={styles.headingWrapper}>
                <h2 className={styles.heading}>
                    <span className={styles.highlightText}>What Our</span> Alumni Says
                </h2>
            </div>
            
            <div className={styles.sliderBg}>
                <div className={`container ${styles.sliderContainer}`}>
                    <div className={styles.slider}>
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.slide} ${index === current ? styles.active : ''}`}
                            >
                                <div className={styles.content}>
                                    <div className={styles.quoteIcon}>
                                        <span className={styles.quoteOutline}>&#8221;</span>
                                    </div>
                                    <p className={styles.quote}>{item.quote}</p>
                                    <div className={styles.author}>
                                        <img src={item.image} alt={item.name} className={styles.avatar} />
                                        <div>
                                            <h4 className={styles.name}>{item.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className={styles.dots}>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${index === current ? styles.activeDot : ''}`}
                                    onClick={() => setCurrent(index)}
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

export default Testimonials;
