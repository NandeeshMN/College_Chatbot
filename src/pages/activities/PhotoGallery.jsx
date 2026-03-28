import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    'Job Fair'
];

const PhotoGallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredImages = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <div className={styles.pageContainer}>
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
                        filteredImages.map((image) => (
                            <div key={image.id} className={styles.imageCard}>
                                <img
                                    src={image.src}
                                    alt={image.alt || 'Gallery Image'}
                                    className={styles.galleryImage}
                                    loading="lazy"
                                />
                            </div>
                        ))
                    ) : (
                        <div className={styles.noImages}>
                            <h3>Images Coming Soon</h3>
                            <p>We are currently updating our gallery. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoGallery;
