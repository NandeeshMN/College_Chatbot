import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, Download } from 'lucide-react';
import styles from './MCAProgram.module.css';

const MCAProgram = () => {
    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Programs | Chetan Business School, Hubballi</title>
            </Helmet>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="container">
                    <h1 className={styles.heroTitle}>Master of Computer Applications (MCA)</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Master of Computer Applications (MCA)</span>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.contentWrapper}`}>
                {/* Main Content */}
                <div className={styles.mainContent}>
                    {/* Admission Banner */}
                    <div className={styles.admissionBanner}>
                        <div className={styles.bannerContent}>
                            <h2>MCA ADMISSIONS <br /> ARE OPEN 2025</h2>
                            <div className={styles.bannerCheckpoints}>
                                <div className={styles.bannerCheckItem}>
                                    <Check size={20} className={styles.bannerCheckIcon} />
                                    <span>Get a seat through the government quota</span>
                                </div>
                                <div className={styles.bannerCheckItem}>
                                    <Check size={20} className={styles.bannerCheckIcon} />
                                    <span>Visit our campus for free career counseling</span>
                                </div>
                            </div>
                            <button className={styles.applyButton}>
                                Apply For <br /> <span className={styles.bigText}>ADMISSION</span>
                            </button>
                        </div>
                        {/* Image placeholder or graphic would go here */}
                    </div>

                    {/* Course Overview */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Course Overview</h2>
                        <div className={styles.textBlock}>
                            <p>
                                Chetan Business School's MCA program, affiliated with Karnatak University, Dharwad, and AICTE approved,
                                offers a comprehensive postgraduate degree for aspiring IT professionals. Recognized by the Government of
                                Karnataka, the 2-year full-time course provides advanced knowledge in areas such as Programming, Database
                                Management, Software Engineering, Web Technologies, Data Structures, and Network Security.
                            </p>
                            <p>
                                This program equips students with the skills required for successful careers in the IT industry, while also
                                preparing them for further studies and certifications in fields like Software Development, Data Science,
                                Artificial Intelligence, and academic research.
                            </p>
                            <h3 className={styles.subTitle}>Key Objectives:</h3>
                        </div>

                        {/* Objectives Box */}
                        <div className={styles.objectivesBox}>
                            <ul className={styles.objectivesList}>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Teach students deep knowledge of computer applications, software development, and IT management</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Help students improve their problem-solving skills through hands-on practice with programming, databases, and software design.</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Prepare students for various IT careers like software development, data science, cybersecurity, and AI</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Build expertise in modern technologies such as web development, data structures, and cloud computing.</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Promote innovation, critical thinking, and research skills to help students grow in the tech world.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Core Subjects */}
                    <section className={styles.section}>
                        <h3 className={styles.subTitle}>Core Subject:</h3>
                        <div className={styles.subjectsGrid}>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>1</span> Digital logic and computer design</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>2</span> Computer networks</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>3</span> Python programming</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>4</span> Database management system</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>5</span> Design and analysis of algorithms</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>6</span> Data mining</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>7</span> Web technologies</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>8</span> Software engineering</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>9</span> Artificial intelligence and machine learning</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>10</span> Operation research</div>
                        </div>
                    </section>

                    {/* Syllabus */}
                    <section className={styles.section}>
                        <h3 className={styles.subTitle}>MCA Syllabus I-IV Sem</h3>
                        <button className={styles.downloadButton}>
                            <Download size={18} /> Download PDF Now
                        </button>
                    </section>
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.sidebarCard}>
                        <div className={styles.cardHeader}>
                            <h3>Course Features</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <h4 className={styles.courseName}>MCA</h4>
                            <div className={styles.featureRow}>
                                <span className={styles.featureLabel}>Eligibility:</span>
                                <span className={styles.featureValue}>Degree with 50% <br />(45% for others)</span>
                            </div>
                            <div className={styles.featureRow}>
                                <span className={styles.featureLabel}>Course Type:</span>
                                <span className={styles.featureValue}>Full time</span>
                            </div>
                            <div className={styles.featureRow}>
                                <span className={styles.featureLabel}>Duration:</span>
                                <span className={styles.featureValue}>2 Years</span>
                            </div>
                            <div className={styles.featureRow}>
                                <span className={styles.featureLabel}>Intake Capacity:</span>
                                <span className={styles.featureValue}>120</span>
                            </div>
                            <div className={`${styles.featureRow} ${styles.lastRow}`}>
                                <span className={styles.featureLabel}>Activities:</span>
                                <span className={styles.featureValue}>Talent hunt, <br />Internship, <br />Workshop, <br />Webinars,</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCAProgram;
