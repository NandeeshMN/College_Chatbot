import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './PageBanner.module.css';

const PageBanner = ({ title, breadcrumbs, subtitle }) => {
    return (
        <section className={styles.banner}>
            {/* Animated Background Elements */}
            <div className={styles.meshGradient}></div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className={`${styles.glowCircle} ${styles.glow1}`}
            ></motion.div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1.1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className={`${styles.glowCircle} ${styles.glow2}`}
            ></motion.div>
            <div className={styles.abstractShape}></div>

            <div className={styles.contentWrapper}>
                <div className={styles.innerContent}>
                    {/* Breadcrumbs */}
                    <motion.nav 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.breadcrumbNav} 
                        aria-label="Breadcrumb"
                    >
                        <ol className={styles.breadcrumbList}>
                            <li>
                                <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                            </li>
                            {breadcrumbs && breadcrumbs.map((crumb, index) => (
                                <li key={index} className={styles.breadcrumbItem}>
                                    <ChevronRight size={14} className={styles.chevron} />
                                    {crumb.url ? (
                                        <Link to={crumb.url} className={styles.breadcrumbLink}>
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className={styles.activeCrumb}>{crumb.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </motion.nav>

                    {/* Title & Subtitle */}
                    <div className={styles.titleContainer}>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={styles.title}
                        >
                            {title}
                        </motion.h1>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className={styles.titleUnderline}
                        ></motion.div>
                        {subtitle && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className={styles.subtitle}
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Section Separator */}
            <div className={styles.separator}>
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100L1440 100V0C1440 0 1140 80 720 80C300 80 0 0 0 0V100Z" fill="white"/>
                </svg>
            </div>
        </section>
    );
};

export default PageBanner;
