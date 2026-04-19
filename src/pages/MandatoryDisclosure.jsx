import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './MandatoryDisclosure.module.css';

const MandatoryDisclosure = ({ type }) => {
    const isMCA = type === 'MCA';
    const contentTitle = isMCA ? 'Mandatory Disclosure (MCA)' : 'Mandatory Disclosure (MBA)';

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Mandatory Disclosure | Chetan Business School, Hubballi</title>
            </Helmet>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Mandatory Disclosure</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>/</span>
                        <span>CBS</span>
                        <span className={styles.separator}>/</span>
                        <span>Mandatory Disclosure</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={`container ${styles.contentContainer}`}>
                <h2 className={styles.pageTitle}>{contentTitle}</h2>
                
                {/* Directly embedding the PDFs inside the page */}
                <div className={styles.pdfsContainer}>
                    {isMCA ? (
                        <>
                            {/* MCA Document 1 */}
                            <div className={styles.pdfViewerWrapper}>
                                <iframe 
                                    src="https://drive.google.com/file/d/1W2Oy-JbwO6AenOu-aN0oMbob3R1-1j49/preview"
                                    title="Mandatory Disclosure (MCA)"
                                    className={styles.pdfIframe}
                                ></iframe>
                            </div>
                            
                            {/* MCA Document 2 */}
                            <h2 className={styles.pageTitle} style={{marginTop: '4rem'}}>MCA Affiliation Notification 2024-25</h2>
                            <div className={styles.pdfViewerWrapper}>
                                <iframe 
                                    src="https://drive.google.com/file/d/1nom4DCShD6SpPAORGM1gu-8tCr8x_zWj/preview"
                                    title="MCA Affiliation Notification 2024-25"
                                    className={styles.pdfIframe}
                                ></iframe>
                            </div>
                        </>
                    ) : (
                        /* MBA Document */
                        <div className={styles.pdfViewerWrapper}>
                            <iframe 
                                src="https://drive.google.com/file/d/1odEBYeH5tDJa4n5OQQFbYJHyC9f9-D7a/preview"
                                title="Mandatory Disclosure (MBA)"
                                className={styles.pdfIframe}
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MandatoryDisclosure;
