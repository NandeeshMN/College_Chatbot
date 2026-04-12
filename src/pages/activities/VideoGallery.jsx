import React from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoGallery.module.css';

const VideoGallery = () => {
    // Extracted exactly as requested
    const videoIds = [
        "4BHsdTxCEcs",
        "mTBe5SMKgxU",
        "6XV0wxwVcFw",
        "lMMtjKa2S9k",
        "kOf-NFDjOmo",
        "ETQPFbD47Bg",
        "i1J5eLZTirM"
    ];

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Video Gallery</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Video Gallery</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container">
                <div className={styles.videoGrid}>
                    {videoIds.map((id, index) => (
                        <div key={index} className={styles.videoWrapper}>
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${id}`} 
                                title={`YouTube video player ${index + 1}`} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
