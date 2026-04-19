import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './Recruiters.module.css';

// Import images
import img4_1 from '../../assets/recruiters/4-1.png';
import img6 from '../../assets/recruiters/6.png';
import img7 from '../../assets/recruiters/7.png';
import img8 from '../../assets/recruiters/8.png';
import img9 from '../../assets/recruiters/9.png';
import img10 from '../../assets/recruiters/10.png';
import img11 from '../../assets/recruiters/11.png';
import img12 from '../../assets/recruiters/12.png';
import img13 from '../../assets/recruiters/13.png';
import img14 from '../../assets/recruiters/14.png';
import img15 from '../../assets/recruiters/15.png';
import img16 from '../../assets/recruiters/16.png';
import img16_1 from '../../assets/recruiters/16-1.png';
import img17 from '../../assets/recruiters/17.png';
import img18 from '../../assets/recruiters/18.png';
import download_1 from '../../assets/recruiters/download-1.png';

const recruiters = [
    { id: 1, logo: img4_1 },
    { id: 2, logo: img6 },
    { id: 3, logo: img7 },
    { id: 4, logo: img8 },
    { id: 5, logo: img9 },
    { id: 6, logo: img10 },
    { id: 7, logo: img11 },
    { id: 8, logo: img12 },
    { id: 9, logo: img13 },
    { id: 10, logo: img14 },
    { id: 11, logo: img15 },
    { id: 12, logo: img16 },
    { id: 13, logo: img16_1 },
    { id: 14, logo: img17 },
    { id: 15, logo: img18 },
    { id: 16, logo: download_1 },
];

const Recruiters = () => {
    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Placements | Chetan Business School, Hubballi</title>
            </Helmet>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Recruiters</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Recruiters</span>
                    </div>
                </div>
            </div>

            {/* Recruiters Grid */}
            <section className={styles.recruitersSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {recruiters.map((recruiter) => (
                            <div key={recruiter.id} className={styles.logoCard}>
                                {/* Render Image */}
                                <img
                                    src={recruiter.logo}
                                    alt={`Recruiter ${recruiter.id}`}
                                    className={styles.recruiterLogo}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Recruiters;
