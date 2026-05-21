import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './NonTeachingStaff.module.css';
import PageBanner from '../../components/common/PageBanner';

// Management Images removed as per layout

// Non-Teaching Staff Images
import kalburgiImg from '../../assets/non_teaching/mr_sunil_kalburgi.png';
import shetImg from '../../assets/non_teaching/mr_gn_shet.png';
import kambarImg from '../../assets/non_teaching/ms_sheela_kambar.png';
import shiraguppiImg from '../../assets/non_teaching/ms_pushpa_shiraguppi.png';
import bharmappaImg from '../../assets/non_teaching/mr_bharmappa_jattappanavar.png';
import mallikarjunImg from '../../assets/non_teaching/mr_mallikarjun_arksali.png';
import chaitraImg from '../../assets/non_teaching/ms_chaitra_badami.png';
import ashrafImg from '../../assets/non_teaching/mr_ashraf_ali.png';
import hussainImg from '../../assets/non_teaching/mr_hussain_t.png';



const nonTeachingStaff = [
    { name: 'Mr. Sunil Kalburgi', designation: 'Senior Accountant', image: kalburgiImg },
    { name: 'Mr. G N Shet', designation: 'Administrative Officer', image: shetImg },
    { name: 'Ms. Sheela Kambar', designation: 'Office Assistant', image: kambarImg },
    { name: 'Ms. Pushpa Shiraguppi', designation: 'Non-Teaching Staff', image: shiraguppiImg },
    { name: 'Mr. Bharmappa Jattappanavar', designation: 'Non-Teaching Staff', image: bharmappaImg },
    { name: 'Mr. Mallikarjun Arksali', designation: 'Non-Teaching Staff', image: mallikarjunImg },
    { name: 'Ms. Chaitra Badami', designation: 'Placement Assistant', image: chaitraImg },
    { name: 'Mr. Ashraf Ali', designation: 'System Admin', image: ashrafImg },
    { name: 'Mr. Hussain T', designation: 'Office Assistant', image: hussainImg },
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

const NonTeachingStaff = () => {
    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>About Us | Chetan Business School, Hubballi</title>
            </Helmet>
            <PageBanner 
                title="Non-Teaching Staff"
                breadcrumbs={[{ label: 'About Us' }, { label: 'Non-Teaching Staff' }]}
                subtitle="The dedicated support team ensuring smooth campus operations and student success."
            />

            <div className="container">
                {/* Non-Teaching Staff Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitleLink}>Non Teaching Staff</h2>
                    <div className={styles.grid}>
                        {nonTeachingStaff.map((member, index) => (
                            <StaffCard key={index} {...member} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NonTeachingStaff;
