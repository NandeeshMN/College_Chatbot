import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="container">
                    <h1 className={styles.heroTitle}>Contact Us</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Contact Us</span>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.contentWrapper}`}>
                <h2 className={styles.sectionTitle}>Get In Touch <span className={styles.highlight}>With Us</span></h2>

                <div className={styles.gridContainer}>
                    {/* Left Side - Info */}
                    <div className={styles.infoColumn}>
                        {/* Phone Card */}
                        <div className={styles.infoCard}>
                            <div className={styles.iconCircle}>
                                <Phone size={24} />
                            </div>
                            <h3 className={styles.infoValue}>733-787-9532</h3>
                            <p className={styles.infoLabel}>Mobile Number</p>
                        </div>

                        {/* Address Card */}
                        <div className={`${styles.infoCard} ${styles.addressCard}`}>
                            <div className={styles.iconCircle}>
                                <MapPin size={24} />
                            </div>
                            <h3 className={styles.addressText}>
                                100ft Road Tajanagar Srinagar <br />
                                Near President Hotel Hubballi <br />
                                Karnataka 580-031
                            </h3>
                            <p className={styles.infoLabel}>College Address</p>
                        </div>

                        {/* Distance Table */}
                        <div className={styles.tableContainer}>
                            <h4 className={styles.tableTitle}>How to Reach Us</h4>
                            <table className={styles.distanceTable}>
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Kms</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>From New Busstand</td>
                                        <td>5.6 Kms</td>
                                    </tr>
                                    <tr>
                                        <td>From Railway Station</td>
                                        <td>6.9 Kms</td>
                                    </tr>
                                    <tr>
                                        <td>From Hosur Bustand</td>
                                        <td>4.1 Kms</td>
                                    </tr>
                                    <tr>
                                        <td>From Nrupatanga Hills</td>
                                        <td>3.5 Kms</td>
                                    </tr>
                                    <tr>
                                        <td>From Chennamma circle</td>
                                        <td>5.8 Kms</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className={styles.formColumn}>
                        <form className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <input type="text" placeholder="Full Name *" className={styles.input} required />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="tel" placeholder="Mobile Number" className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="email" placeholder="Email Id" className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="text" placeholder="Subject" className={styles.input} />
                            </div>
                            <div className={styles.formGroup}>
                                <textarea placeholder="Message (Short & Sweet Please)" className={styles.textarea} rows={4}></textarea>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" id="auth" className={styles.checkbox} />
                                <label htmlFor="auth" className={styles.checkboxLabel}>
                                    I hereby authorize Chetan Business School & its representatives to call, sms, e-mail or whatsapp regarding their courses, terms & conditions.
                                </label>
                            </div>

                            <button type="submit" className={styles.submitButton}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className={styles.mapSection}>
                <div className="container">
                    <h2 className={styles.mapTitle}>We Are <span className={styles.blackText}>Located At</span></h2>
                </div>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.541628469443!2d75.1162498!3d15.3866516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d2a7d0000001%3A0x3d18913a5122f9d4!2sChetan%20Business%20School%2C%20Hubli!5e0!3m2!1sen!2sin!4v1706466000000!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="College Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
