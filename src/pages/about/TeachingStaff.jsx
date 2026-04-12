import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TeachingStaff.module.css';

// Management Images
import presidentImg from '../../assets/management/president.png';
import honSecretaryImg from '../../assets/management/hon_secretary.png';
import chairmanImg from '../../assets/management/chairman.png';
import secretaryImg from '../../assets/management/secretary.png';

// Teaching Staff Images
import chachadiImg from '../../assets/staff/dr_chachadi.png';
import kulkarniImg from '../../assets/staff/dr_kulkarni.png';
import manikImg from '../../assets/staff/dr_manik.png';
import revankarImg from '../../assets/staff/dr_revankar.png';
import huliImg from '../../assets/staff/dr_huli.png';
import wadakannavarImg from '../../assets/staff/dr_wadakannavar.png';
import anilImg from '../../assets/staff/dr_anil_yaragatti.png';
import aniruddhaImg from '../../assets/staff/dr_aniruddha_r.png';
import mangalaImg from '../../assets/staff/dr_mangala_yaragatti.png';
import shwetaSajjanarImg from '../../assets/staff/prof_shweta_sajjanar.png';
import shreyasImg from '../../assets/staff/prof_shreyas_murdeshwar.png';
import ravikumarImg from '../../assets/staff/dr_ravikumar_roogi.png';
import laliImg from '../../assets/staff/prof_shweta_lali.png';
import almasImg from '../../assets/staff/Prof. Almas M.png.jpeg';

// Placeholder for staff images - using a generic div in CSS if source is empty,
// or we can use a temporary placeholder. For now, I'll use a transparent pixel or rely on alt text/CSS styling.
// The user said they will providing images later.

const managementTeam = [
    { name: 'Shri Murugesh S Sidnal', designation: 'President', image: presidentImg },
    { name: 'Shri Rajanna M Koravi', designation: 'Hon. Secretary', image: honSecretaryImg },
    { name: 'Shri Jagadeesh H Dyavappanavar', designation: 'Chairman', image: chairmanImg },
    { name: 'Dr. Vishwanth M Koravi', designation: 'Secretary', image: secretaryImg },
];

const teachingStaff = [
    { name: 'Dr. A H Chachadi', designation: 'Professor Emeritus and Mentor', image: chachadiImg },
    { name: 'Dr. Ramakant Kulkarni', designation: 'Director, Academics', image: kulkarniImg },
    { name: 'Dr. Mohammed Jameel Manik', designation: 'Professor & Dean', image: manikImg },
    { name: 'Dr. Bhargav Revankar', designation: 'Professor & HOD, MCA Department', image: revankarImg },
    { name: 'Dr. M B Huli', designation: 'Adjunct Professor', image: huliImg },
    { name: 'Dr. A R Wadakannavar', designation: 'Adjunct Professor', image: wadakannavarImg },
    { name: 'Dr. Anil Yaragatti', designation: 'Adjunct Professor', image: anilImg },
    { name: 'Dr. Aniruddha R', designation: 'Associate Professor', image: aniruddhaImg },
    { name: 'Dr. Mangala Yaragatti', designation: 'Associate Professor', image: mangalaImg },
    { name: 'Prof. Shweta Sajjanar', designation: 'Assistant Professor', image: shwetaSajjanarImg },
    { name: 'Prof. Shreyas Murdeshwar', designation: 'Assistant Professor', image: shreyasImg },
    { name: 'Dr. Ravikumar Roogi', designation: 'Assistant Professor', image: ravikumarImg },
    { name: 'Prof. Shweta Lali', designation: 'Teaching Associate', image: laliImg },
    { name: 'Prof. Almas M', designation: 'Teaching Associate', image: almasImg },
];

const StaffCard = ({ name, designation, image }) => (
    <div className={styles.card}>
        <div className={styles.imageWrapper}>
            {image ? (
                <img src={image} alt={name} className={styles.image} />
            ) : (
                <div className={styles.placeholderImage}></div>
            )}
        </div>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.designation}>{designation}</p>
    </div>
);

const TeachingStaff = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="container">
                    <h1 className={styles.heroTitle}>Teaching Staff</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Teaching Staff</span>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Management Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Our <span className={styles.blackText}>Management</span></h2>
                    <div className={styles.grid}>
                        {managementTeam.map((member, index) => (
                            <StaffCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                {/* Teaching Staff Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitleLink}>Teaching Staff</h2>
                    <div className={styles.grid}>
                        {teachingStaff.map((member, index) => (
                            <StaffCard key={index} {...member} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeachingStaff;
