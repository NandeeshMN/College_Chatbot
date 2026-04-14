import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Payments.module.css';
import paymentQR from '../assets/images/payment.png';

const Payments = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Payments</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Payments</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                {/* Building Watermark */}
                <div className={styles.watermark}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" preserveAspectRatio="none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>

                <h2 className={styles.pageTitle}>
                    <span className={styles.highlighted}>Pay College</span> Fees
                </h2>

                <div className={styles.paymentGrid}>
                    {/* Left Column: Payment Details */}
                    <div className={styles.paymentDetails}>
                        <p className={styles.introText}>
                            The college fees payment can be made by any of the digital mode to the below mentioned account number or can scan the below given QR code. Or can be payed by Cheque/ DD in favour of <strong>“Chetan Business school, Hubballi”</strong>.
                        </p>

                        <div className={styles.bankInfo}>
                            <div className={styles.infoLine}>
                                <span className={styles.label}>Name :</span>
                                <span>Chetan Business School</span>
                            </div>
                            <div className={styles.infoLine}>
                                <span className={styles.label}>A/c.No :</span>
                                <span>31901819131</span>
                            </div>
                            <div className={styles.infoLine}>
                                <span className={styles.label}>Bank :</span>
                                <span>SBI, Bhairidevarkoppa Br. Hubli-31.</span>
                            </div>
                            <div className={styles.infoLine}>
                                <span className={styles.label}>IFSC :</span>
                                <span>SBIN0018310</span>
                            </div>
                            <div className={styles.infoLine}>
                                <span className={styles.label}>UPI ID :</span>
                                <span>31901819131@SBI</span>
                            </div>
                        </div>

                        <div className={styles.closingNote}>
                            Kindly ensure to send the payment confirmation screenshot via email (<strong>info@chetanbschool.org</strong>), along with the Full Name, Course Name, Semester. This will help us process your payment efficiently.
                        </div>
                    </div>

                    {/* Right Column: QR Code */}
                    <div className={styles.qrSection}>
                        <div className={styles.qrCard}>
                            <h3 className={styles.qrHeader}>Scan & Pay</h3>
                            <div className={styles.qrImageWrapper}>
                                <img 
                                    src={paymentQR} 
                                    alt="Chetan Business School Payment QR" 
                                    className={styles.qrImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
