import React from 'react';
import { Target, Monitor, DollarSign, Calendar } from 'lucide-react';
import styles from './Features.module.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const features = [
    {
        icon: <Target size={32} />,
        title: 'Career Focus',
        description: 'Programs designed to enhance employability and career growth.'
    },
    {
        icon: <Monitor size={32} />,
        title: 'Hands-on Learning',
        description: 'Practical exposure through labs, projects, and internships.'
    },
    {
        icon: <DollarSign size={32} />,
        title: 'Affordable Courses',
        description: 'Quality education at competitive fee structures.'
    },
    {
        icon: <Calendar size={32} />,
        title: 'Flexible Timing',
        description: 'Options suitable for both regular students and working professionals.'
    }
];

const Features = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);

    return (
        <section className={styles.features} ref={ref}>
            <div className="container">
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${isVisible ? styles.animateItem : ''}`}
                            style={{ transitionDelay: `${index * 0.15}s` }}
                        >
                            <div className={styles.iconBox}>
                                {feature.icon}
                            </div>
                            <div className={styles.content}>
                                <h4 className={styles.title}>{feature.title}</h4>
                                <p className={styles.description}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
