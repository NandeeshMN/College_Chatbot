import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                {/* Column 1: Contact Info */}
                <div className={styles.column}>
                    <h3 className={styles.heading}>We Are Located At</h3>
                    <ul className={styles.contactList}>
                        <li className={styles.contactItem}>
                            <div className={styles.iconCircle}>
                                <Phone size={18} />
                            </div>
                            <span>733-787-9532</span>
                        </li>
                        <li className={styles.contactItem}>
                            <div className={styles.iconCircle}>
                                <Mail size={18} />
                            </div>
                            <a href="mailto:info@chetanbschool.org">info@chetanbschool.org</a>
                        </li>
                        <li className={styles.contactItem}>
                            <div className={styles.iconCircle}>
                                <MapPin size={18} />
                            </div>
                            <span>100ft Road Tajanagar Srinagar Near President Hotel Hubballi Karnataka 580-031</span>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Quick Links */}
                <div className={styles.column}>
                    <h3 className={styles.heading}>Quick Links</h3>
                    <ul className={styles.linksList}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/activities/photos">Photo Gallery</Link></li>
                        <li><Link to="/blogs">Blogs</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Courses */}
                <div className={styles.column}>
                    <h3 className={styles.heading}>Courses</h3>
                    <ul className={styles.coursesList}>
                        <li><Link to="/programs/mca">Masters of Computer Application (MCA)</Link></li>
                        <li><Link to="/programs/mba">Masters of Business Administration (MBA)</Link></li>
                    </ul>
                    <Link to="/admissions" className={styles.applyButton}>
                        Apply For Admission
                    </Link>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className={styles.copyright}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Chetan Business School. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
