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
                            <a 
                                href="https://www.google.com/maps/place/Chetan+Business+School,+Hubli/@15.3879865,75.11363,16z/data=!4m6!3m5!1s0x3bb8d2a7d0000001:0x3d18913a5122f9d4!8m2!3d15.3866516!4d75.1162498!16s%2Fg%2F11b7y9kv3w?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'inherit', textDecoration: 'none' }}
                            >
                                <div className={styles.iconCircle}>
                                    <MapPin size={18} />
                                </div>
                                <span>100ft Road Tajanagar Srinagar Near President Hotel Hubballi Karnataka 580-031</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Quick Links */}
                <div className={styles.column}>
                    <h3 className={styles.heading}>Quick Links</h3>
                    <ul className={styles.linksList}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/activities/photo-gallery">Photo Gallery</Link></li>
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
                    <Link to="/#enroll-now" className={styles.applyButton}>
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
