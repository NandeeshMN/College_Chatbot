import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PhotoGallery.module.css';

// Awards Images
import rankBadgeImg from '../../assets/gallery/awards/rank_2_badge.png';
import redFmAwardImg from '../../assets/gallery/awards/red_fm_award.png';
import isoCertImg from '../../assets/gallery/awards/iso_certificate.png';
import natureCertImg from '../../assets/gallery/awards/nature_bound_certificate.png';

// Sports Images
import volleyballMatchImg from '../../assets/gallery/sports/volleyball_match.png';
import throwballWomenImg from '../../assets/gallery/sports/throwball_women.png';
import volleyballSpikeImg from '../../assets/gallery/sports/volleyball_spike.png';
import throwballMatchImg from '../../assets/gallery/sports/throwball_match.png';

// Conference Images
import confEntranceGroupImg from '../../assets/gallery/conference/conference_entrance_group.png';
import confStageBannerImg from '../../assets/gallery/conference/conference_stage_banner.png';
import confLargeGroupImg from '../../assets/gallery/conference/conference_large_group.png';
import confCertPresentationImg from '../../assets/gallery/conference/conference_certificate_presentation.png';

// Infrastructure Images
import classroomLectureImg from '../../assets/gallery/infrastructure/classroom_lecture.png';
import libraryReadingImg from '../../assets/gallery/infrastructure/library_reading.png';
import libraryBrowsingImg from '../../assets/gallery/infrastructure/library_browsing.png';
import computerLabImg from '../../assets/gallery/infrastructure/computer_lab.png';

// Events Images
import aarambhWelcomeImg from '../../assets/gallery/events/aarambh_welcome.png';
import ptmImg from '../../assets/gallery/events/parents_teacher_meeting.png';
import aagamanaPartyImg from '../../assets/gallery/events/aagamana_fresher_party.png';
import lampLightingImg from '../../assets/gallery/events/lamp_lighting_ceremony.png';
import aarambhSpeechImg from '../../assets/gallery/events/aarambh_speech.png';

// Outing Images
import boatRideImg from '../../assets/gallery/outing/boat_ride.png';
import traditionalVisitImg from '../../assets/gallery/outing/traditional_village_visit.png';
import bullockCartImg from '../../assets/gallery/outing/bullock_cart_ride.png';

// CSR Images
import yogaDayGroupImg from '../../assets/gallery/csr/yoga_day_group.png';
import bloodDonationImg from '../../assets/gallery/csr/blood_donation_camp.png';
import yogaDayStageImg from '../../assets/gallery/csr/yoga_day_stage.png';
import cleanlinessDriveImg from '../../assets/gallery/csr/cleanliness_drive.png';
import voterAwarenessImg from '../../assets/gallery/csr/voter_awareness.png';

// SIP Images
import sipInaugurationImg from '../../assets/gallery/sip/sip_inauguration.png';
import sipZeptoImg from '../../assets/gallery/sip/sip_zepto_event.png';
import sipProficientImg from '../../assets/gallery/sip/sip_proficient_minds.png';
import sipHyundaiImg from '../../assets/gallery/sip/sip_hyundai_visit.png';
import sipSurveyImg from '../../assets/gallery/sip/sip_field_survey.png';
import sipMgHectorImg from '../../assets/gallery/sip/mg_hector_visit.png';
import sipAirportGroupImg from '../../assets/gallery/sip/airport_visit_group.png';
import sipAirportStudentsImg from '../../assets/gallery/sip/airport_visit_students.png';

// MCA Images
import mca1 from '../../assets/gallery/MCA/mca1.png';
import mca2 from '../../assets/gallery/MCA/mca2.png';
import mca3 from '../../assets/gallery/MCA/mca3.png';
import mca4 from '../../assets/gallery/MCA/mca4.png';
import mca5 from '../../assets/gallery/MCA/mca5.png';
import mca6 from '../../assets/gallery/MCA/mca6.png';
import mca7 from '../../assets/gallery/MCA/mca7.png';
import mca8 from '../../assets/gallery/MCA/mca8.png';
import mca9 from '../../assets/gallery/MCA/mca9.png';
import mca10 from '../../assets/gallery/MCA/mca10.png';
import mca11 from '../../assets/gallery/MCA/mca11.png';
import mca12 from '../../assets/gallery/MCA/mca12.png';
import mca13 from '../../assets/gallery/MCA/mca13.png';
import mca14 from '../../assets/gallery/MCA/mca14.png';
import mca15 from '../../assets/gallery/MCA/mca15.png';
import mca16 from '../../assets/gallery/MCA/mca16.png';
import mca17 from '../../assets/gallery/MCA/mca17.png';
import mca18 from '../../assets/gallery/MCA/mca18.png';
import mca19 from '../../assets/gallery/MCA/mca19.png';
import mca20 from '../../assets/gallery/MCA/mca20.png';
import mca21 from '../../assets/gallery/MCA/mca21.png';

// Placeholder empty array for now as per instructions (will populate later)
const galleryImages = [
    { id: 2, category: 'Awards', src: rankBadgeImg, alt: '2nd Rank in India Badge' },
    { id: 3, category: 'Awards', src: redFmAwardImg, alt: 'Red FM Best B-School Award' },
    { id: 4, category: 'Awards', src: isoCertImg, alt: 'ISO Registration Certificate' },
    { id: 5, category: 'Awards', src: natureCertImg, alt: 'Nature Bound Recognition Certificate' },

    // Sports
    { id: 6, category: 'Sports', src: volleyballMatchImg, alt: 'Volleyball Match' },
    { id: 7, category: 'Sports', src: throwballWomenImg, alt: 'Women Throwball Team' },
    { id: 8, category: 'Sports', src: volleyballSpikeImg, alt: 'Volleyball Action Block' },
    { id: 9, category: 'Sports', src: throwballMatchImg, alt: 'Throwball Match' },

    // Conference
    { id: 10, category: 'Conference', src: confEntranceGroupImg, alt: 'Conference Entrance Group Photo' },
    { id: 11, category: 'Conference', src: confStageBannerImg, alt: 'Conference Stage Banner' },
    { id: 12, category: 'Conference', src: confLargeGroupImg, alt: 'Conference Large Group Photo' },
    { id: 13, category: 'Conference', src: confCertPresentationImg, alt: 'Conference Certificate Presentation' },

    // Infrastructure
    { id: 14, category: 'Infrastructure', src: classroomLectureImg, alt: 'MBA Class Lecture' },
    { id: 15, category: 'Infrastructure', src: libraryReadingImg, alt: 'Students in Library' },
    { id: 16, category: 'Infrastructure', src: libraryBrowsingImg, alt: 'Student Browsing Books' },
    { id: 17, category: 'Infrastructure', src: computerLabImg, alt: 'Computer Lab Session' },

    // Events
    { id: 18, category: 'Events', src: aarambhWelcomeImg, alt: 'Aarambh Welcome Event' },
    { id: 19, category: 'Events', src: ptmImg, alt: 'Parents Teacher Meeting' },
    { id: 20, category: 'Events', src: aagamanaPartyImg, alt: 'Aagamana Fresher Party' },
    { id: 21, category: 'Events', src: lampLightingImg, alt: 'Lamp Lighting Ceremony' },
    { id: 22, category: 'Events', src: aarambhSpeechImg, alt: 'Aarambh Event Speech' },

    // Outing
    { id: 23, category: 'Outing', src: boatRideImg, alt: 'Students on Boat Ride' },
    { id: 24, category: 'Outing', src: traditionalVisitImg, alt: 'Traditional Village Visit' },
    { id: 25, category: 'Outing', src: bullockCartImg, alt: 'Bullock Cart Ride' },

    // CSR
    { id: 26, category: 'CSR', src: yogaDayGroupImg, alt: 'International Yoga Day Celebration' },
    { id: 27, category: 'CSR', src: bloodDonationImg, alt: 'Blood Donation Camp' },
    { id: 28, category: 'CSR', src: yogaDayStageImg, alt: 'Yoga Day Stage Event' },
    { id: 29, category: 'CSR', src: cleanlinessDriveImg, alt: 'Cleanliness Drive (Swachh Bharat)' },
    { id: 30, category: 'CSR', src: voterAwarenessImg, alt: 'Voter Awareness Rally' },

    // SIP
    { id: 31, category: 'SIP', src: sipInaugurationImg, alt: 'SIP Inauguration Ceremony' },
    { id: 32, category: 'SIP', src: sipZeptoImg, alt: 'Zepto Marketing Activity' },
    { id: 33, category: 'SIP', src: sipProficientImg, alt: 'Proficient Minds Workshop' },
    { id: 34, category: 'SIP', src: sipHyundaiImg, alt: 'Industrial Visit to Hyundai' },
    { id: 35, category: 'SIP', src: sipSurveyImg, alt: 'Students Conducting Field Survey' },
    { id: 36, category: 'SIP', src: sipMgHectorImg, alt: 'Industrial Visit to MG Motors' },
    { id: 37, category: 'SIP', src: sipAirportGroupImg, alt: 'Hubballi Airport Visit - Group' },
    { id: 38, category: 'SIP', src: sipAirportStudentsImg, alt: 'Hubballi Airport Visit - Students' },

    // MCA
    { id: 39, category: 'MCA', src: mca1, alt: 'MCA Event Photo 1' },
    { id: 40, category: 'MCA', src: mca2, alt: 'MCA Event Photo 2' },
    { id: 41, category: 'MCA', src: mca3, alt: 'MCA Event Photo 3' },
    { id: 42, category: 'MCA', src: mca4, alt: 'MCA Event Photo 4' },
    { id: 43, category: 'MCA', src: mca5, alt: 'MCA Event Photo 5' },
    { id: 44, category: 'MCA', src: mca6, alt: 'MCA Event Photo 6' },
    { id: 45, category: 'MCA', src: mca7, alt: 'MCA Event Photo 7' },
    { id: 46, category: 'MCA', src: mca8, alt: 'MCA Event Photo 8' },
    { id: 47, category: 'MCA', src: mca9, alt: 'MCA Event Photo 9' },
    { id: 48, category: 'MCA', src: mca10, alt: 'MCA Event Photo 10' },
    { id: 49, category: 'MCA', src: mca11, alt: 'MCA Event Photo 11' },
    { id: 50, category: 'MCA', src: mca12, alt: 'MCA Event Photo 12' },
    { id: 51, category: 'MCA', src: mca13, alt: 'MCA Event Photo 13' },
    { id: 52, category: 'MCA', src: mca14, alt: 'MCA Event Photo 14' },
    { id: 53, category: 'MCA', src: mca15, alt: 'MCA Event Photo 15' },
    { id: 54, category: 'MCA', src: mca16, alt: 'MCA Event Photo 16' },
    { id: 55, category: 'MCA', src: mca17, alt: 'MCA Event Photo 17' },
    { id: 56, category: 'MCA', src: mca18, alt: 'MCA Event Photo 18' },
    { id: 57, category: 'MCA', src: mca19, alt: 'MCA Event Photo 19' },
    { id: 58, category: 'MCA', src: mca20, alt: 'MCA Event Photo 20' },
    { id: 59, category: 'MCA', src: mca21, alt: 'MCA Event Photo 21' },
];

const categories = [
    'All',
    'Awards',
    'Yashas',
    'Sports',
    'Conference',
    'Events',
    'Infrastructure',
    'CSR',
    'SIP',
    'Outing',
    'Job Fair',
    'MCA'
];

const PhotoGallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const filteredImages = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext(e);
            if (e.key === 'ArrowLeft') showPrev(e);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, filteredImages]); // Include filteredImages to ensure correct nav context

    const openModal = (index) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden'; // Disable scroll
    };

    const closeModal = () => {
        setSelectedIndex(null);
        document.body.style.overflow = 'auto'; // Re-enable scroll
    };

    const showNext = (e) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const showPrev = (e) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    return (
        <div className={styles.pageContainer}>
            <Helmet>
                <title>Activities | Chetan Business School, Hubballi</title>
            </Helmet>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Photo Gallery</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.separator}>|</span>
                        <span>Photo Gallery</span>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Filter Buttons */}
                <div className={styles.filterSection}>
                    <div className={styles.filterContainer}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className={styles.galleryGrid}>
                    {filteredImages.length > 0 ? (
                        filteredImages.map((image, index) => (
                            <div 
                                key={image.id} 
                                className={styles.imageCard}
                                onClick={() => openModal(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt || 'Gallery Image'}
                                    className={styles.galleryImage}
                                    loading="lazy"
                                />
                                <div className={styles.imageOverlay}>
                                    <span className={styles.viewText}>VIEW IMAGE</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noImages}>
                            <h3>Images Coming Soon</h3>
                            <p>We are currently updating our gallery. Please check back later.</p>
                        </div>
                    )}
                </div>

                {/* Lightbox Modal */}
                {selectedIndex !== null && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={closeModal}>
                                <X size={32} />
                            </button>
                            
                            <button className={styles.navBtn} style={{ left: '-60px' }} onClick={showPrev}>
                                <ChevronLeft size={48} />
                            </button>

                            <img 
                                src={filteredImages[selectedIndex].src} 
                                alt={filteredImages[selectedIndex].alt} 
                                className={styles.modalImage} 
                            />

                            <button className={styles.navBtn} style={{ right: '-60px' }} onClick={showNext}>
                                <ChevronRight size={48} />
                            </button>
                            
                            {/* Mobile Nav Overlay (invisible on desktop) */}
                            <div className={styles.mobileNav}>
                                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={showPrev}>
                                    <ChevronLeft size={32} />
                                </button>
                                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={showNext}>
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;
