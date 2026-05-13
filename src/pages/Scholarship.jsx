import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Scholarship.module.css';
import scholarshipImg1 from '../assets/images/scholarship.png';
import scholarshipImg2 from '../assets/images/scholarship1.png';

import PageBanner from '../components/common/PageBanner';

const Scholarship = () => {
    return (
        <div className={styles.pageContainer}>
            <PageBanner 
                title="Scholarships"
                breadcrumbs={[{ label: 'CBS' }, { label: 'Scholarships' }]}
                subtitle="Empowering academic excellence through diverse financial aid programs and merit-based support."
            />

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
