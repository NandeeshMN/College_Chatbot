import React from 'react';
import { Award, BookOpen, Users, TrendingUp, Layers, CheckCircle } from 'lucide-react';
import styles from './WhyCBS.module.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const features = [
    {
        icon: <Award size={40} />,
        title: 'Excellence In Education',
        description: 'CBS offers top-quality MBA and MCA programs that blend rigorous academics with practical experience.'
    },
    {
        icon: <BookOpen size={40} />,
        title: 'Industry Relevant Curriculum',
        description: 'Our curriculum is designed to meet the evolving demands of the business and technology sectors.'
    },
    {
        icon: <Users size={40} />,
        title: 'Distinguished Faculty',
        description: 'CBS boasts a team of experienced and knowledgeable faculty who bring academic expertise.'
    },
    {
        icon: <Layers size={40} />,
        title: 'Affiliation With Karnatak University',
        description: 'As an affiliated institution of Karnatak University, CBS provides students with a recognized qualification.'
    },
    {
        icon: <TrendingUp size={40} />,
        title: 'Comprehensive Program Offering',
        description: 'CBS offers Master of Computer Applications (MCA) and Master of Business Administration (MBA) degrees.'
    },
    {
        icon: <CheckCircle size={40} />,
        title: 'Focus On Career Readiness',
        description: 'At CBS, we focus on hands-on learning and career readiness, equipping students with skills to excel.'
    }
];

const WhyCBS = () => {
    const [ref, isVisible] = useScrollAnimation(0.1);

    return (
        <section className={styles.whyCbs} ref={ref} id="why-cbs">
            <div className="container">
                <h2 className={`section-title ${styles.heading} ${isVisible ? styles.animateTitle : ''}`}>Why CBS?</h2>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${isVisible ? styles.animateCard : ''}`}
                            style={{ transitionDelay: `${index * 0.15}s` }}
                        >
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.title}>{feature.title}</h3>
                            <p className={styles.description}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyCBS;
