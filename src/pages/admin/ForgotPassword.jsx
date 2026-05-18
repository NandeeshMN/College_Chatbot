import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Validation state
    const [validation, setValidation] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
        match: false
    });

    const [strength, setStrength] = useState({ label: 'None', color: '#e2e8f0', width: '0%' });

    useEffect(() => {
        const checks = {
            length: newPassword.length >= 8,
            upper: /[A-Z]/.test(newPassword),
            lower: /[a-z]/.test(newPassword),
            number: /\d/.test(newPassword),
            special: /[@$!%*?&]/.test(newPassword),
            match: newPassword === confirmPassword && newPassword !== ''
        };
        setValidation(checks);

        // Strength calculation
        const score = Object.values(checks).filter(v => v).length - (checks.match ? 1 : 0); // exclude match from score
        if (newPassword.length === 0) {
            setStrength({ label: 'None', color: '#e2e8f0', width: '0%' });
        } else if (score <= 2) {
            setStrength({ label: 'Weak', color: '#f56565', width: '33%' });
        } else if (score <= 4) {
            setStrength({ label: 'Medium', color: '#ed8936', width: '66%' });
        } else {
            setStrength({ label: 'Strong', color: '#48bb78', width: '100%' });
        }
    }, [newPassword, confirmPassword]);

    const isPasswordValid = validation.length && validation.upper && validation.lower && validation.number && validation.special && validation.match;

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/admin/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            
            if (data.success) {
                setMessage({ type: 'success', text: data.message });
                setStep(2);
            } else {
                setMessage({ type: 'error', text: data.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Connection failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/admin/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();
            
            if (data.success) {
                setMessage({ type: 'success', text: data.message });
                setStep(3);
            } else {
                setMessage({ type: 'error', text: data.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Verification failed.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) return;

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/admin/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword, confirmPassword })
            });
            const data = await response.json();
            
            if (data.success) {
                setMessage({ type: 'success', text: 'Password reset successful! You can now log in.' });
                setTimeout(() => window.location.href = '/admin-login', 3000);
            } else {
                setMessage({ type: 'error', text: data.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Reset failed.' });
        } finally {
            setLoading(false);
        }
    };

    const Requirement = ({ met, text }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: met ? '#48bb78' : '#a0aec0', marginBottom: '0.25rem' }}>
            {met ? <Check size={12} /> : <X size={12} />}
            <span>{text}</span>
        </div>
    );

    return (
        <div style={{ padding: '6rem 2rem', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '440px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>
                    {step === 1 && 'Forgot Password'}
                    {step === 2 && 'Verify OTP'}
                    {step === 3 && 'Create Strong Password'}
                </h2>

                {message.text && (
                    <div style={{ 
                        backgroundColor: message.type === 'success' ? '#c6f6d5' : '#fed7d7', 
                        color: message.type === 'success' ? '#22543d' : '#c53030', 
                        padding: '0.75rem', borderRadius: '5px', marginBottom: '1.5rem', fontSize: '0.875rem' 
                    }}>
                        {message.text}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Register Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your registered email"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enter 6-Digit OTP</label>
                            <input
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="******"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #e2e8f0', textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }}
                            />
                            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#718096' }}>OTP is valid for 5 minutes.</p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setStep(1)}
                            style={{ width: '100%', marginTop: '1rem', background: 'none', border: 'none', color: '#1a365d', cursor: 'pointer', fontSize: '0.875rem' }}
                        >
                            Back to Email
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter strong password"
                                    style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Strength Indicator */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#718096' }}>Strength: {strength.label}</span>
                            </div>
                            <div style={{ width: '100%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: strength.width, height: '100%', backgroundColor: strength.color, transition: 'width 0.3s ease' }}></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Confirm New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm your password"
                                    style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer' }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Requirements Checklist */}
                        <div style={{ backgroundColor: '#f7fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' }}>Requirements:</p>
                            <Requirement met={validation.length} text="At least 8 characters" />
                            <Requirement met={validation.upper} text="At least one uppercase (A-Z)" />
                            <Requirement met={validation.lower} text="At least one lowercase (a-z)" />
                            <Requirement met={validation.number} text="At least one number (0-9)" />
                            <Requirement met={validation.special} text="At least one special char (@$!%*?&)" />
                            <Requirement met={validation.match} text="Passwords match" />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isPasswordValid}
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                backgroundColor: isPasswordValid ? '#1a365d' : '#a0aec0', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px', 
                                fontWeight: 'bold', 
                                cursor: (loading || !isPasswordValid) ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Link to="/admin-login" style={{ color: '#1a365d', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
