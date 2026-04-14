import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Scholarship.module.css';
import scholarshipImg1 from '../assets/images/scholarship.png';
import scholarshipImg2 from '../assets/images/scholarship1.png';

const Scholarship = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Scholarship Details</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Scholarship Details</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                <div className={styles.imageStack}>
                    <img 
                        src={scholarshipImg1} 
                        alt="Scholarship Details Part 1" 
                        className={styles.scholarshipImage}
                    />
                    <img 
                        src={scholarshipImg2} 
                        alt="Scholarship Details Part 2" 
                        className={styles.scholarshipImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Scholarship;
