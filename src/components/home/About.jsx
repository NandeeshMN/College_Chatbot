import React from 'react';
import styles from './About.module.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import aboutImg from '../../assets/images/aboutus.png';

const About = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);

    return (
        <section className={`section ${styles.about}`} ref={ref}>
            <div className={`container ${styles.content}`}>
                <div className={`${styles.imageWrapper} ${isVisible ? styles.animate : ''}`}>
                    <img
                        src={aboutImg}
                        alt="About CBS"
                        className={styles.image}
                    />
                    <div className={styles.circleGraphic}></div>
                </div>

                <div className={`${styles.textContent} ${isVisible ? styles.animate : ''}`}>
                    <h4 className={styles.subtitle}>About Us</h4>
                    <h2 className={styles.title}>Chetan Business School (CBS)</h2>
                    <p className={styles.description}>
                        Established in 2011 in Hubballi, is a premier institution committed to providing high-quality management education.
                        Our flagship two-year MBA & MCA program, accredited by AICTE and ISO and affiliated with Karnatak University,
                        combines rigorous academics with practical experience.
                    </p>
                    <button className={styles.readMoreBtn}>Read More</button>
                </div>
            </div>
        </section>
    );
};

export default About;
