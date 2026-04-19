import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ExternalLink } from 'lucide-react';
import styles from './Chaitanya.module.css';

const newsletterData = [
    {
        edition: "Edition 1",
        title: "Chaitanya Newsletter - Edition 1",
        subtitle: "Exploring the foundations of excellence in management and research.",
        file: "https://drive.google.com/file/d/1h9srGW3JG7WFtkX4HFiSa0byK3qN6wmA/preview"
    },
    {
        edition: "Edition 2",
        title: "Chaitanya Newsletter - Edition 2",
        subtitle: "Continuing our journey of academic innovation and student success.",
        file: "https://drive.google.com/file/d/1G0bqrS5lW0Gc1TqBS6_jXHpEbX9W61vY/preview"
    },
    {
        edition: "Edition 3",
        title: "Chaitanya Newsletter - Edition 3",
        subtitle: "Delivering new insights and updates from the world of business and management.",
        file: "https://drive.google.com/file/d/1nJ0NdFbL5HHTBWT4TV-lpWxZstP8gTk3/preview"
    }
];

const Chaitanya = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Chaitanya</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>CBS</span>
                        <span className={styles.separator}>|</span>
                        <span>Chaitanya</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                <h2 className={styles.pageHeading}>Chaitanya</h2>

                <div className={styles.grid}>
                    {newsletterData.map((item, index) => (
                        <div key={index} className={styles.newsletterCard}>
                            <div className={styles.iconWrapper}>
                                <Newspaper size={40} />
                            </div>
                            <h3 className={styles.editionTitle}>{item.title}</h3>
                            <p className={styles.description}>{item.subtitle}</p>
                            <a
                                href={item.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.openButton}
                            >
                                <ExternalLink size={20} />
                                Open Document
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chaitanya;
