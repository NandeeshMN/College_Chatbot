import React from 'react';
import { Link } from 'react-router-dom';
import {
    GraduationCap,
    FileText,
    Presentation,
    FileCheck,
    Search,
    Handshake,
    Briefcase,
    MapPin
} from 'lucide-react';
import styles from './PlacementProcess.module.css';

const PlacementProcess = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="container">
                    <h1 className={styles.heroTitle}>Placement Process</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Placement Process</span>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 className={styles.pageTitle}>PLACEMENT PROCESS</h2>

                <div className={styles.processContainer}>
                    {/* Left Column */}
                    <div className={styles.column}>
                        {/* Step 1 */}
                        <div className={styles.stepItem}>
                            <h3 className={styles.stepTitle}>1. Pre-Placement Preparation</h3>
                            <ul className={styles.stepList}>
                                <li><strong>Training & workshops:</strong> Resume building and cover letter drafting.</li>
                                <li><strong>Soft skills:</strong> Communication, and leadership development.</li>
                                <li><strong>Aptitude test:</strong> And mock interview practice.</li>
                                <li><strong>Seminars by Industry Experts:</strong> Insights into industry trends.</li>
                                <li><strong>Alumni interaction sessions:</strong> Learning from the experiences of previous students.</li>
                            </ul>
                        </div>

                        {/* Step 2 */}
                        <div className={styles.stepItem}>
                            <h3 className={styles.stepTitle}>2. Placement Registration & Eligibility Check</h3>
                            <ul className={styles.stepList}>
                                <li>Students must register with the placement cell by filling out a placement registration form.</li>
                                <li>Eligibility is verified based on: Attendance, grades, and disciplinary record.</li>
                                <li>Participation in pre-placement activities.</li>
                            </ul>
                        </div>

                        {/* Step 3 */}
                        <div className={styles.stepItem}>
                            <h3 className={styles.stepTitle}>3. Pre-Placement Talks (PPTs)</h3>
                            <ul className={styles.stepList}>
                                <li>Companies conduct presentations to share details about: Company profile and culture.</li>
                                <li>Job roles and responsibilities.</li>
                                <li>Compensation structure & Growth opportunities.</li>
                                <li>Students' queries: An interactive session follows where students can ask questions.</li>
                            </ul>
                        </div>

                        {/* Step 4 */}
                        <div className={styles.stepItem}>
                            <h3 className={`${styles.stepTitle} ${styles.purpleText}`}>4. Application and Shortlisting</h3>
                            <ul className={styles.stepList}>
                                <li><strong>Online/Offline Application:</strong> Students apply for the companies they are interested in.</li>
                                <li>Shortlisting based on: Academic records.</li>
                                <li>Skills and certifications.</li>
                                <li>Pre-requisite assessments (if any).</li>
                            </ul>
                        </div>
                    </div>

                    {/* Center Graphics Column */}
                    <div className={styles.centerGraphics}>
                        {/* Icons corresponding to steps */}
                        <div className={`${styles.graphicIcon} ${styles.blueShape}`}><GraduationCap size={24} /></div>
                        <div className={`${styles.graphicIcon} ${styles.greenShape}`}><Search size={24} /></div>
                        <div className={`${styles.graphicIcon} ${styles.tealShape}`}><FileText size={24} /></div>
                        <div className={`${styles.graphicIcon} ${styles.redShape}`}><Handshake size={24} /></div>
                        <div className={`${styles.graphicIcon} ${styles.yellowShape}`}><Presentation size={24} /></div>
                        <div className={`${styles.graphicIconSee} ${styles.purpleShape}`}><FileCheck size={24} /></div>
                        <div className={`${styles.graphicIcon} ${styles.magentaShape}`}><Briefcase size={24} /></div>
                        <div className={`${styles.graphicIcon} ${styles.pinkShape}`}><MapPin size={24} /></div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.column}>
                        {/* Step 5 */}
                        <div className={styles.stepItem}>
                            <h3 className={`${styles.stepTitle} ${styles.greenText}`}>5. Placement Rounds (Selection Process)</h3>
                            <ul className={styles.stepList}>
                                <li>Different companies may follow these or a combination of these rounds:</li>
                                <li><strong>Aptitude test:</strong> Logical reasoning, verbal ability, and quantitative aptitude.</li>
                                <li><strong>Group discussion (GD):</strong> Evaluating communication, teamwork, and problem-solving skills.</li>
                                <li><strong>Technical/Domain interviews:</strong> Focused on subject knowledge related to the job role.</li>
                                <li><strong>HR Interview:</strong> Assessing the candidate's personality, adaptability, and career aspirations.</li>
                            </ul>
                        </div>

                        {/* Step 6 */}
                        <div className={styles.stepItem}>
                            <h3 className={`${styles.stepTitle} ${styles.redText}`}>6. Offer Rollout & Acceptance</h3>
                            <ul className={styles.stepList}>
                                <li><strong>Offer letter distribution:</strong> Selected students receive offer letters from the companies.</li>
                                <li><strong>Offer acceptance:</strong> Students must confirm acceptance within a specified time.</li>
                                <li><strong>Pre-joining documentation:</strong> Submission of necessary documents for background checks.</li>
                            </ul>
                        </div>

                        {/* Step 7 */}
                        <div className={styles.stepItem}>
                            <h3 className={`${styles.stepTitle} ${styles.purpleText}`}>7. Internships (For MBA/MCA Students)</h3>
                            <ul className={styles.stepList}>
                                <li>Companies may also offer internships as part of their placement process.</li>
                                <li>Internship performance can sometimes lead to pre-placement offers (PPOs).</li>
                            </ul>
                        </div>

                        {/* Step 8 */}
                        <div className={styles.stepItem}>
                            <h3 className={`${styles.stepTitle} ${styles.pinkText}`}>8. Post-Placement Support</h3>
                            <ul className={styles.stepList}>
                                <li><strong>Joining preparation:</strong> Guidance on joining formalities and corporate etiquette.</li>
                                <li><strong>Career mentorship:</strong> Continued support to ensure smooth transition into the job.</li>
                                <li><strong>Key placement highlights:</strong> Dedicated placement cell ensuring 100% assistance.</li>
                                <li>Industry connections across various sectors for MBA and MCA profiles.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementProcess;
