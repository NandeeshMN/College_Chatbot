import React, { useState } from 'react';
import styles from './EnrollmentForm.module.css';
import emailjs from '@emailjs/browser';

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        course: '',
        message: '',
        agree: false
    });
    const [status, setStatus] = useState(null);
    const [toastTimer, setToastTimer] = useState(null);
    const [errors, setErrors] = useState({});

    const showToast = (type, message) => {
        setStatus({ type, message });
        if (toastTimer) clearTimeout(toastTimer);
        const timer = setTimeout(() => setStatus(null), 4000);
        setToastTimer(timer);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Clear error when user starts typing or checking
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }

        if (name === 'mobile') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) {
                setFormData({ ...formData, [name]: numericValue });
            }
            return;
        }

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};

        // Strict Validation
        if (!formData.message.trim()) {
            newErrors.message = 'Please enter your message';
            showToast('error', 'Please enter your message');
        } else if (!formData.agree) {
            newErrors.agree = 'Please accept before submitting';
            showToast('error', 'Please accept before submitting');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Existing field validation
        if (!formData.name || !formData.email || !formData.mobile || !formData.course) {
            showToast('error', 'Please fill all required fields.');
            return;
        }

        if (formData.mobile.length !== 10) {
            showToast('error', 'Please enter exactly 10 digits for the mobile number.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('error', 'Please enter a valid email address.');
            return;
        }

        // Prepare template parameters matching the EmailJS template variables
        const templateParams = {
            name: formData.name,
            email: formData.email,
            phone: formData.mobile,
            course: formData.course,
            message: formData.message
        };

        // Send email using EmailJS
        emailjs.send(
            'service_cwxa0gv',   // Service ID
            'template_x45uabr',  // Template ID
            templateParams,
            'EWtQvkNP9spi7S9Rb'  // Public Key
        ).then((response) => {
            // Success handling
            showToast('success', 'Form submitted successfully!');
            setFormData({ name: '', email: '', mobile: '', course: '', message: '', agree: false });
            setErrors({});
        }).catch((err) => {
            // Error handling
            console.error('Failed to send email:', err);
            showToast('error', 'Failed to send message. Please try again.');
        });
    };

    return (
        <section id="enroll-now" className={styles.enrollmentSection}>
            {status && (
                <div className={`${styles.toast} ${styles[status.type]}`}>
                    {status.message}
                </div>
            )}

            <div className={styles.headingWrapper}>
                <h2 className={styles.heading}>
                    <span className={styles.highlightText}>Enroll Now!</span> For MBA & MCA
                </h2>
            </div>
            
            <div className={styles.formContainerBg}>
                <div className={`container ${styles.formContainer}`}>
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <div className={styles.inputGrid}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.phoneInputWrapper}>
                                    <span className={styles.phonePrefix}>+91</span>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter 10-digit mobile number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className={`${styles.inputField} ${styles.phoneInput}`}
                                        maxLength="10"
                                        pattern="[0-9]{10}"
                                        inputMode="numeric"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="" disabled>Course Interested *</option>
                                    <option value="MBA">MBA</option>
                                    <option value="MCA">MCA</option>
                                </select>
                            </div>

                            <div className={styles.formGroupFull}>
                                <textarea
                                    name="message"
                                    placeholder="Message Short & Sweet Please *"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`${styles.textArea} ${errors.message ? styles.errorField : ''}`}
                                    rows="4"
                                    required
                                />
                                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                            </div>

                            <div className={styles.checkboxGroup}>
                                <div className={`${styles.checkboxWrapper} ${errors.agree ? styles.errorOutline : ''}`}>
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                        required
                                    />
                                    <label htmlFor="agree" className={styles.checkboxLabel}>
                                        * I hereby authorize Chetan Business School & its representatives to call, sms, e-mail or whatsapp regarding their courses, terms & conditions.
                                    </label>
                                </div>
                                {errors.agree && <span className={styles.errorText}>{errors.agree}</span>}
                            </div>

                            <div className={styles.submitGroup}>
                                <button type="submit" className={styles.submitButton}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EnrollmentForm;
