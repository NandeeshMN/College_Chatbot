import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Search, Calendar, Tag } from 'lucide-react';
import styles from './Blogs.module.css';
import { blogData } from '../../data/blogs';

const Blogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Extract unique categories and their counts
    const categoriesWithCounts = useMemo(() => {
        const counts = blogData.reduce((acc, blog) => {
            acc[blog.category] = (acc[blog.category] || 0) + 1;
            return acc;
        }, { 'All': blogData.length });
        return Object.entries(counts).sort(([a], [b]) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
    }, []);

    // Filtered blogs logic
    const filteredBlogs = useMemo(() => {
        return blogData.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                blog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const recentPosts = blogData.slice(0, 3);

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Blogs | Chetan Business School, Hubballi</title>
                <meta name="description" content="Stay updated with the latest insights, trends, and expert opinions from Chetan Business School." />
            </Helmet>

            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Our Blogs & Insights</h1>
                    <div className={styles.breadcrumbPill}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Blogs</span>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={styles.contentWrapper}>
                    {/* Main Content - Blog Grid */}
                    <div className={styles.mainContent}>
                        {filteredBlogs.length > 0 ? (
                            <div className={styles.blogGrid}>
                                {filteredBlogs.map((blog) => (
                                    <article key={blog.id} className={styles.blogCard}>
                                        <div className={styles.imageWrapper}>
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className={styles.blogImage}
                                                loading="lazy"
                                            />
                                            <span className={styles.categoryBadge}>{blog.category}</span>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.metaData}>
                                                <span className={styles.metaItem}><Calendar size={14} /> {blog.date}</span>
                                            </div>
                                            <h2 className={styles.blogTitleCard}>{blog.title}</h2>
                                            <p className={styles.shortDesc}>{blog.shortDescription}</p>
                                            <Link to={`/blog/${blog.id}`} className={styles.readMoreBtn}>
                                                Read More <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <h3>No blogs found matching your criteria.</h3>
                                <button 
                                    className={styles.resetBtn}
                                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                                >
                                    View All Blogs
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        {/* Search Box */}
                        <div className={styles.sidebarWidget}>
                            <h3 className={styles.widgetTitle}>Search</h3>
                            <div className={styles.searchBox}>
                                <input 
                                    type="text" 
                                    placeholder="Search blogs..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={styles.searchInput}
                                />
                                <Search className={styles.searchIcon} size={20} />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className={styles.sidebarWidget}>
                            <h3 className={styles.widgetTitle}>Categories</h3>
                            <ul className={styles.categoryList}>
                                {categoriesWithCounts.map(([cat, count]) => (
                                    <li key={cat}>
                                        <button 
                                            className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            <span className={styles.catName}>{cat}</span>
                                            <span className={styles.catCount}>{count}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Posts */}
                        <div className={styles.sidebarWidget}>
                            <h3 className={styles.widgetTitle}>Recent Posts</h3>
                            <div className={styles.recentPostsList}>
                                {recentPosts.map((post) => (
                                    <Link key={post.id} to={`/blog/${post.id}`} className={styles.recentPostItem}>
                                        <div className={styles.recentPostThumb}>
                                            <img src={post.image} alt={post.title} />
                                        </div>
                                        <div className={styles.recentPostInfo}>
                                            <h4>{post.title}</h4>
                                            <span>{post.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
