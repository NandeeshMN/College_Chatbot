import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MandatoryDisclosure.module.css';

const MandatoryDisclosure = ({ type }) => {
    const isMCA = type === 'MCA';
    const contentTitle = isMCA ? 'Mandatory Disclosure (MCA)' : 'Mandatory Disclosure (MBA)';

    return (
        <div className={styles.pageContainer}>
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
                                    src="/pdfs/Mandatory_Disclosure_MCA.pdf#view=FitH"
                                    title="Mandatory Disclosure (MCA)"
                                    className={styles.pdfIframe}
                                ></iframe>
                            </div>
                            
                            {/* MCA Document 2 */}
                            <h2 className={styles.pageTitle} style={{marginTop: '4rem'}}>MCA Affiliation Notification 2024-25</h2>
                            <div className={styles.pdfViewerWrapper}>
                                <iframe 
                                    src="/pdfs/MCA-Affiliation-Notification-2024-25-2-1.pdf#view=FitH"
                                    title="MCA Affiliation Notification 2024-25"
                                    className={styles.pdfIframe}
                                ></iframe>
                            </div>
                        </>
                    ) : (
                        /* MBA Document */
                        <div className={styles.pdfViewerWrapper}>
                            <iframe 
                                src="/pdfs/Mandatory_Disclosure_MBA.pdf#view=FitH"
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
