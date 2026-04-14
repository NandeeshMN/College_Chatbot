import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sankalp.module.css';

const sankalpData = [
    { title: "Sankalp 2015-16 Year Book", file: "https://drive.google.com/file/d/1ztZQika479FYSijZD4A3tfeA-9QXI5Qt/preview" },
    { title: "Sankalp 2016-17 Year Book", file: "https://drive.google.com/file/d/1nYB4m6rbawrpW0S3Qm62RJynFeZ_6WgW/preview" },
    { title: "Sankalp 2017-18 Year Book", file: "https://drive.google.com/file/d/1ZgLroFoxHsmgUd6TPeGxUi25Hj9QDJl8/preview" },
    { title: "Sankalp 2018-19 Year Book", file: "https://drive.google.com/file/d/1mM9GvqOmwtH2vvfs5KMXmohYYNa-T8f7/preview" },
    { title: "Sankalp 2019-20 Year Book", file: "https://drive.google.com/file/d/1RB4yivQyswU549ijTH1y6sPU2y5nEV3a/preview" },
    { title: "SANKALP 2020-21", file: "https://drive.google.com/file/d/1aAn1frzKXLWh-x5HNR0wrF2w3xcLzv7a/preview" },
    { title: "SANKALP 2021-22", file: "https://drive.google.com/file/d/1P7dIa0qVa7qTkP_TIOevL62MypMdhWR1/preview" },
    { title: "SANKALP 2022-23", file: "#" }, // Placeholder, disabled
    { title: "SANKALP 2023-24", file: "https://drive.google.com/file/d/1m69sjxSJEAlpyR6QquzjHGRoeIhvg-f1/preview" } // Last item to be centered
];

const Sankalp = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Sankalp</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>CBS</span>
                        <span className={styles.separator}>|</span>
                        <span>Sankalp</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={styles.contentContainer}>
                <h2 className={styles.pageTitle}>Sankalp</h2>

                <div className={styles.gridContainer}>
                    {sankalpData.map((item, index) => {
                        const isLastItem = index === sankalpData.length - 1;

                        if (isLastItem) {
                            return (
                                <div key={index} className={styles.centeredRow}>
                                    <div className={`${styles.docCard} ${styles.centeredItem}`}>
                                        <h3 className={styles.docTitle}>{item.title}</h3>
                                        <a
                                            href={item.file}
                                            target={item.file !== "#" ? "_blank" : undefined}
                                            rel={item.file !== "#" ? "noopener noreferrer" : undefined}
                                            className={`${styles.openBtn} ${item.file === "#" ? styles.disabled : ''}`}
                                            onClick={(e) => item.file === "#" && e.preventDefault()}
                                        >
                                            {item.file === "#" ? "Coming Soon" : "Open Document"}
                                        </a>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className={styles.docCard}>
                                <h3 className={styles.docTitle}>{item.title}</h3>
                                <a
                                    href={item.file}
                                    target={item.file !== "#" ? "_blank" : undefined}
                                    rel={item.file !== "#" ? "noopener noreferrer" : undefined}
                                    className={`${styles.openBtn} ${item.file === "#" ? styles.disabled : ''}`}
                                    onClick={(e) => item.file === "#" && e.preventDefault()}
                                >
                                    {item.file === "#" ? "Open Document" : "Open Document"}
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sankalp;
