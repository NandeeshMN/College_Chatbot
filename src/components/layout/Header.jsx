import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import styles from './Header.module.css';
import { navigationLinks } from '../../data/navigation';
import CollegeLogo from '../../assets/College_Logo.png';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const clickCountRef = useRef(0);
    const timerRef = useRef(null);

    const handleLogoClick = (e) => {
        clickCountRef.current += 1;

        if (clickCountRef.current === 1) {
            timerRef.current = setTimeout(() => {
                clickCountRef.current = 0;
            }, 2000);
        }

        if (clickCountRef.current >= 4) {
            clearTimeout(timerRef.current);
            clickCountRef.current = 0;
            e.preventDefault();
            navigate('/admin-login');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = (index) => {
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className={`container ${styles.topBarContent}`}>
                    <div className={styles.socials}>
                        <span className={styles.followText}>Follow us:</span>
                        <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
                        <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
                    </div>
                    <div className={styles.contactInfo}>
                        <a href="tel:+917337879532" className={styles.contactLink}>
                            <Phone size={14} /> <span>+91 733-787-9532</span>
                        </a>
                        <a href="mailto:info@chetanbschool.org" className={styles.contactLink}>
                            <Mail size={14} /> <span>info@chetanbschool.org</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className={`container ${styles.navbar}`}>
                <Link to="/" className={styles.logo} onClick={handleLogoClick}>
                    <img
                        src={CollegeLogo}
                        alt="Chetan Business School Logo"
                        className={styles.logoImage}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navLinks}>
                        {navigationLinks.map((link, index) => (
                            <li
                                key={index}
                                className={styles.navItem}
                                onMouseEnter={() => setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <div className={styles.linkWrapper}>
                                    <Link to={link.path} className={styles.navLink}>
                                        {link.label}
                                    </Link>
                                    {link.dropdown && <ChevronDown size={14} className={styles.chevron} />}
                                </div>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <ul className={`${styles.dropdown} ${activeDropdown === index ? styles.show : ''}`}>
                                        {link.dropdown.map((subLink, subIndex) => (
                                            <li key={subIndex} className={styles.dropdownItem}>
                                                {subLink.dropdown ? (
                                                    <>
                                                        <div className={styles.subLinkWrapper}>
                                                            <Link to={subLink.path} className={styles.dropdownLink}>
                                                                {subLink.label}
                                                            </Link>
                                                            <ChevronDown size={12} className={styles.subChevron} style={{ transform: 'rotate(-90deg)' }} />
                                                        </div>
                                                        <ul className={styles.subDropdown}>
                                                            {subLink.dropdown.map((grandLink, grandIndex) => (
                                                                <li key={grandIndex}>
                                                                    <Link to={grandLink.path} className={styles.dropdownLink}>
                                                                        {grandLink.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <Link to={subLink.path} className={styles.dropdownLink}>
                                                        {subLink.label}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Link to="/admissions" className={styles.enrollButton}>Enroll Now</Link>
                </nav>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    {navigationLinks.map((link, index) => (
                        <li key={index} className={styles.mobileNavItem}>
                            <div className={styles.mobileLinkHeader}>
                                <Link to={link.path} className={styles.mobileNavLink}>
                                    {link.label}
                                </Link>
                                {link.dropdown && (
                                    <button
                                        className={styles.dropdownToggle}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleDropdown(index);
                                        }}
                                    >
                                        <ChevronDown
                                            size={20}
                                            className={`${styles.mobileChevron} ${activeDropdown === index ? styles.rotate : ''}`}
                                        />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Dropdown */}
                            {link.dropdown && (
                                <ul className={`${styles.mobileDropdown} ${activeDropdown === index ? styles.expand : ''}`}>
                                    {link.dropdown.map((subLink, subIndex) => (
                                        <li key={subIndex}>
                                            <Link to={subLink.path} className={styles.mobileDropdownLink}>
                                                {subLink.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li className={styles.mobileNavItem}>
                        <Link to="/admissions" className={`${styles.mobileNavLink} ${styles.mobileEnroll}`}>
                            Enroll Now
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
