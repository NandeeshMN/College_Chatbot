import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Grievance.module.css';

const Grievance = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Grievance</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Grievance</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                {/* Simulated Watermark if no SVG exists */}
                <div className={styles.watermark}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" preserveAspectRatio="none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>

                <h2 className={styles.pageTitle}>Grievance</h2>
                
                <div className={styles.textContent}>
                    <p className={styles.paragraph}>
                        At <span className={styles.boldText}>Chetan Business School</span>, we prioritize the well-being and
                        satisfaction of our students, faculty, and staff. Our grievance
                        handling process is designed to address concerns promptly
                        and fairly. We encourage open communication and ensure that
                        all grievances are treated with confidentiality and respect. If
                        you have any grievance You can walk in during office hours,
                        give us a call.
                    </p>

                    <div className={styles.contactBlock}>
                        <div className={styles.contactLine}>
                            <span>Address:</span> 100ft Road Tajanagar Srinagar Near President Hotel Hubballi Karnataka 580-031
                        </div>
                        <div className={styles.contactLine}>
                            <span>Mobile No:</span> +91 9986049942
                        </div>
                        <div className={styles.contactLine}>
                            <span>E-mail:</span> info@chetanbschool.org
                        </div>
                    </div>

                    <p className={styles.paragraph + ' ' + styles.closing}>
                        Our goal is to create a supportive and harmonious
                        environment where every member of our community feels
                        heard and valued.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Grievance;
