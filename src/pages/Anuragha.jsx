import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Anuragha.module.css';

// Dynamically import all images from assets/anuragha
const imageModules = import.meta.glob('../assets/anuragha/Anuragha-img*.png', { eager: true });

// Process and sort images numerically (1 to 26)
const allImages = Object.keys(imageModules)
    .map((path) => ({
        path,
        src: imageModules[path].default || imageModules[path],
        num: parseInt(path.match(/Anuragha-img(\d+)\.png/)[1], 10)
    }))
    .sort((a, b) => a.num - b.num);

// Section-wise arrays
const quoteImage = allImages[0];
const constructionImages = allImages.slice(1, 4); // img2, img3, img4
const inaugurationImages = allImages.slice(4, 16); // img5 to img16
const visitImages = allImages.slice(16, 26); // img17 to img26

const Anuragha = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) setSelectedImageIndex(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const openLightbox = (imageNum) => {
        // Find the index in the original sorted array based on the image number
        const realIndex = allImages.findIndex(img => img.num === imageNum);
        setSelectedImageIndex(realIndex);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const ImageGrid = ({ images, title }) => (
        <section className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.galleryGrid}>
                {images.map((image) => (
                    <div 
                        key={image.num} 
                        className={styles.imageCard}
                        onClick={() => openLightbox(image.num)}
                    >
                        <img
                            src={image.src}
                            alt={title}
                            className={styles.galleryImage}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Anuragha</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>CBS</span>
                        <span className={styles.separator}>|</span>
                        <span>Anuragha</span>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* 1. QUOTE SECTION (TOP) */}
                <section className={styles.quoteSection}>
                    <div className={styles.quoteImageWrapper}>
                        {quoteImage && (
                            <img 
                                src={quoteImage.src} 
                                alt="His Holiness Shri Siddeshwar Swamiji" 
                                className={styles.quoteImage}
                                onClick={() => openLightbox(quoteImage.num)}
                                style={{cursor: 'pointer'}}
                            />
                        )}
                    </div>
                    <div className={styles.quoteTextWrapper}>
                        <p className={styles.kannadaQuote}>
                            “ಅಕ್ಷರ ಕಲಿತ ವ್ಯಕ್ತಿ ಭ್ರಷ್ಟನಾದರೂ ಆಗಬಹದು ..!!<br/>
                            ಆದರೆ ಸಂಸ್ಕಾರವನ್ನು ಕಲಿತ ವ್ಯಕ್ತಿ<br/>
                            ಎಂದೆಂದಿಗೂ ಭ್ರಷ್ಟನಾಗಲಾರ …!!<br/>
                            ಏಕೆಂದರೆ ಸಂಸ್ಕಾರದ ಶಕ್ತಿ ಅಂತದ್ದು ….”
                        </p>
                        <div className={styles.quoteAuthor}>
                            <span className={styles.authorTitle}>– His Holiness</span>
                            <span className={styles.authorName}>Shri Siddeshwar Swamiji</span>
                        </div>
                    </div>
                </section>

                {/* 2. SECTION 1 */}
                <ImageGrid 
                    images={constructionImages} 
                    title="Shri Siddeshwar Swamiji’s visit to the Construction site of CBS" 
                />

                {/* 3. SECTION 2 */}
                <ImageGrid 
                    images={inaugurationImages} 
                    title="Shri Siddeshwar Swamiji during the Inauguration of the Institute" 
                />

                {/* 4. SECTION 3 */}
                <ImageGrid 
                    images={visitImages} 
                    title="Shri Siddeshwar Swamiji visit to CBS in 2017" 
                />
            </div>

            {/* Lightbox Modal */}
            {selectedImageIndex !== null && (
                <div className={styles.modalOverlay} onClick={closeLightbox}>
                    <button className={styles.navBtn + ' ' + styles.prevBtn} onClick={prevImage}>
                        <ChevronLeft size={48} />
                    </button>
                    
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeLightbox}>
                            <X size={32} />
                        </button>
                        <img 
                            src={allImages[selectedImageIndex].src} 
                            alt="Full View" 
                            className={styles.modalImage} 
                        />
                        <div className={styles.imageCounter}>
                            {selectedImageIndex + 1} / {allImages.length}
                        </div>
                    </div>

                    <button className={styles.navBtn + ' ' + styles.nextBtn} onClick={nextImage}>
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Anuragha;
