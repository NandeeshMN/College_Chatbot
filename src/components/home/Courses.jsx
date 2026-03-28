import React from 'react';
import styles from './Courses.module.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import mbaImg from '../../assets/images/ourcourses(MBA).png';
import mcaImg from '../../assets/images/ourcourses(MCA).png';

const Courses = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);

    return (
        <section className={styles.courses} ref={ref}>
            <div className="container">
                <h2 className={`${styles.heading} ${isVisible ? styles.animateHeading : ''}`}>Our Courses</h2>

                <div className={styles.grid}>
                    {/* MBA Card */}
                    <div className={`${styles.card} ${isVisible ? styles.animateCard : ''}`} style={{ transitionDelay: '0s' }}>
                        <img src={mbaImg} alt="MBA Course" className={styles.courseImage} />
                        <div className={styles.cardBody}>
                            <h3 className={styles.courseTitle}>Master of Business Administration (MBA)</h3>
                            <p className={styles.description}>
                                Chetan Business School's MBA program, affiliated with Karnatak University, Dharwad, offers a comprehensive postgraduate degree for future business leaders.
                            </p>
                            <Link to="/programs/mba" className={`${styles.applyBtn} ${styles.yellowBtn}`}>
                                Read More
                            </Link>
                        </div>
                    </div>

                    {/* MCA Card */}
                    <div className={`${styles.card} ${isVisible ? styles.animateCard : ''}`} style={{ transitionDelay: '0.2s' }}>
                        <img src={mcaImg} alt="MCA Course" className={styles.courseImage} />
                        <div className={styles.cardBody}>
                            <h3 className={styles.courseTitle}>Master of Computer Application (MCA)</h3>
                            <p className={styles.description}>
                                Chetan Business School's MCA program, affiliated with Karnatak University, Dharwad, offers a comprehensive postgraduate degree for aspiring IT professionals.
                            </p>
                            <Link to="/programs/mca" className={`${styles.applyBtn} ${styles.yellowBtn}`}>
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Courses;
