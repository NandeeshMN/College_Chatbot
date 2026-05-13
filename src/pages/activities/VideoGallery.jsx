import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './VideoGallery.module.css';

import PageBanner from '../../components/common/PageBanner';

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

    const breadcrumbs = [
        { label: 'Activities' },
        { label: 'Video Gallery' }
    ];

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Video Gallery | Chetan Business School, Hubballi</title>
            </Helmet>
            
            <PageBanner 
                title="Video Gallery"
                breadcrumbs={breadcrumbs}
                subtitle="Explore our campus life and events through our curated collection of videos."
            />

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
