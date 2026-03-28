import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Download, FileText } from 'lucide-react';
import styles from './MBAProgram.module.css';

const MBAProgram = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="container">
                    <h1 className={styles.heroTitle}>Master of Business Administration (MBA)</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Master of Business Administration (MBA)</span>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.contentWrapper}`}>
                {/* Main Content */}
                <div className={styles.mainContent}>
                    {/* Admission Banner */}
                    <div className={styles.admissionBanner}>
                        <div className={styles.bannerContent}>
                            <h2>MASTER OF BUSINESS ADMINISTRATION</h2>
                            <p className={styles.bannerSubtitle}>ADMISSIONS ARE OPEN 2025</p>
                            <button className={styles.applyButton}>
                                Apply For <br /> <span className={styles.bigText}>ADMISSION</span>
                            </button>
                        </div>
                        <div className={styles.bannerCircle}></div>
                    </div>

                    {/* Course Overview */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Course Overview</h2>
                        <div className={styles.textBlock}>
                            <p>
                                Chetan Business School's MBA program, affiliated with Karnatak University, Dharwad, and AICTE approved,
                                offers a comprehensive postgraduate degree for future business leaders. Recognized by the Government of
                                Karnataka, the 2-year full-time course provides advanced knowledge in key areas such as Marketing, Finance,
                                Human Resource Management, Operations, and Business Analytics.
                            </p>
                            <p>
                                This program equips students with the skills required for successful careers in various business sectors, while also
                                preparing them for further studies and certifications in fields like Chartered Accountancy (CA), Company Secretary
                                (CS), and Financial Analysis (CFA), along with entrepreneurial ventures.
                            </p>
                            <h3 className={styles.subTitle}>Key Objectives:</h3>
                        </div>

                        {/* Objectives Box */}
                        <div className={styles.objectivesBox}>
                            <ul className={styles.objectivesList}>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Help students become strong leaders and managers.</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Teach important subjects like Finance, Marketing, and Human Resources.</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Foster creative thinking and skills for starting and running a business.</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Build the ability to analyze data and trends to make smart business decisions.</span>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}><Check size={16} /></span>
                                    <span>Improve skills in speaking and writing for better management and networking.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Core Subjects */}
                    <section className={styles.section}>
                        <h3 className={styles.subTitle}>Core Subject:</h3>
                        <div className={styles.subjectsGrid}>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>1</span> Principles of management</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>2</span> Business environment for managerial decision making</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>3</span> Business statistics</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>4</span> Corporate communication-I</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>5</span> Information technology for managers</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>6</span> Marketing management</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>7</span> Marketing management</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>8</span> Financial accounting for Managers</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>9</span> Business Ethics</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>10</span> Legal Aspects of Business</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>11</span> Management Control Systems</div>
                            <div className={styles.subjectItem}><span className={styles.subjectNumber}>12</span> E-business</div>
                        </div>
                    </section>

                    {/* Previous Question Papers */}
                    <section className={styles.section}>
                        <h3 className={styles.subTitle}>Previous Question Paper:</h3>
                        <div className={styles.buttonGroup}>
                            <button className={styles.blueButton}>MBA 1st Sem Question Paper</button>
                            <button className={styles.blueButton}>MBA 2nd Sem Question Paper</button>
                            <button className={styles.blueButton}>MBA 3rd Sem Question Paper</button>
                            <button className={styles.blueButton}>MBA 4th Sem Question Paper</button>
                        </div>
                    </section>

                    {/* Syllabus */}
                    <section className={styles.section}>
                        <h3 className={styles.subTitle}>MBA Syllabus I-IV Sem</h3>
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
                            <h4 className={styles.courseName}>MBA</h4>
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

export default MBAProgram;
