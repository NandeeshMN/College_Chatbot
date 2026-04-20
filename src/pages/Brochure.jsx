import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ExternalLink } from 'lucide-react';
import styles from './Brochure.module.css';

const brochureData = [
    {
        title: "Placement Brochure 2024-25",
        subtitle: "Exploring Career Opportunities and Industry Partnerships at Chetan Business School.",
        file: "https://drive.google.com/file/d/1v58qeaVT_P3_gZXflBM9q_C8Dr46n-Rx/view?usp=drive_link"
    }
];

const Brochure = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Placement Brochure</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Placements</span>
                        <span className={styles.separator}>|</span>
                        <span>Brochure 2024</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                <div className={styles.headerGroup}>
                    <h2 className={styles.pageHeading}>Brochure 2024</h2>
                    <p className={styles.pageDescription}>
                        Download or view our comprehensive placement brochure to learn more about our student profiles, 
                        recruitment process, and institutional highlights.
                    </p>
                </div>

                <div className={styles.grid}>
                    {brochureData.map((item, index) => (
                        <div key={index} className={styles.brochureCard}>
                            <div className={styles.iconWrapper}>
                                <FileText size={48} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.brochureTitle}>{item.title}</h3>
                                <p className={styles.description}>{item.subtitle}</p>
                                <a
                                    href={item.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.openButton}
                                >
                                    <ExternalLink size={20} />
                                    Open Brochure
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brochure;
