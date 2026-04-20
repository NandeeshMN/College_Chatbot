import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronRight } from 'lucide-react';
import styles from './BlogDetail.module.css';
import { blogData } from '../../data/blogs';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    
    const blog = blogData.find(b => b.id === parseInt(id));

    // Get 5 recent/other blogs for sidebar
    const otherBlogs = blogData.filter(b => b.id !== parseInt(id)).slice(0, 5);

    // Scroll to top on mount or ID change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Simple search logic - could be expanded
        console.log('Searching for:', searchQuery);
    };

    if (!blog) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h1>Blog Not Found</h1>
                <p>The blog you are looking for does not exist.</p>
                <Link to="/blogs" style={{ color: '#0077c8', fontWeight: 'bold' }}>Back to Blogs</Link>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>{`${blog.title} | CBS Blog`}</title>
                <meta name="description" content={blog.shortDescription} />
            </Helmet>

            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>{blog.title}</h1>
                    <div className={styles.breadcrumbPill}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span className={styles.activeBreadcrumb}>{blog.title}</span>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={styles.mainContainer}>
                    {/* Main Content Column */}
                    <main className={styles.contentColumn}>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className={styles.mainImage}
                        />

                        <div className={styles.blogContent}>
                            {blog.content.split(/\n\n+/).map((paragraph, index) => (
                                <p key={index}>
                                    {paragraph.split('\n').map((line, i) => {
                                        // Heuristic: Bold if line starts with digit. OR ends with colon OR is Conclusion
                                        const isHeading = /^\d+\.\s+/.test(line.trim()) || 
                                                         line.trim().endsWith(':') || 
                                                         line.trim().startsWith('Conclusion');
                                        
                                        return (
                                            <React.Fragment key={i}>
                                                {isHeading ? <strong>{line}</strong> : line}
                                                {i !== paragraph.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        );
                                    })}
                                </p>
                            ))}
                        </div>
                    </main>

                    {/* Sidebar Column */}
                    <aside className={styles.sidebarColumn}>
                        {/* Search Bar */}
                        <div className={styles.searchBox}>
                            <form onSubmit={handleSearch} className={styles.searchInputWrapper}>
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className= {styles.searchInput}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.searchBtn}>
                                    <Search size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Recent Posts Section */}
                        <div className={styles.recentPostsContainer}>
                            <h3 className={styles.sidebarTitle}>Recent Posts</h3>
                            <ul className={styles.recentPostsList}>
                                {otherBlogs.map((post) => (
                                    <li key={post.id} className={styles.recentPostItem}>
                                        <Link to={`/blog/${post.id}`} className={styles.recentPostLink}>
                                            {post.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
