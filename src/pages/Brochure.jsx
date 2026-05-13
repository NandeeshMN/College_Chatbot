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

import PageBanner from '../components/common/PageBanner';

const Brochure = () => {
    const breadcrumbs = [
        { label: 'Placements' },
        { label: 'Brochure 2024' }
    ];

    return (
        <div className={styles.pageContainer}>
            <PageBanner 
                title="Placement Brochure"
                breadcrumbs={breadcrumbs}
                subtitle="Comprehensive insights into our recruitment ecosystem, student achievement, and corporate partnerships."
            />

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
