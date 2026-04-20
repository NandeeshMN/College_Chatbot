import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import styles from './Blogs.module.css';
import { blogData } from '../../data/blogs';

const Blogs = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Blogs | Chetan Business School, Hubballi</title>
                <meta name="description" content="Stay updated with the latest insights, trends, and expert opinions from Chetan Business School." />
            </Helmet>

            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Our Blogs</h1>
                    <div className={styles.breadcrumbPill}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Blogs</span>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Blog Grid */}
                <div className={styles.blogGrid}>
                    {blogData.map((blog) => (
                        <article key={blog.id} className={styles.blogCard}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className={styles.blogImage}
                                    loading="lazy"
                                />
                            </div>
                            <div className={styles.cardBody}>
                                <h2 className={styles.blogTitleCard}>{blog.title}</h2>
                                <p className={styles.shortDesc}>{blog.shortDescription}</p>
                                <Link to={`/blog/${blog.id}`} className={styles.readMoreBtn}>
                                    Read More <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
