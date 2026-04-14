import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

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
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

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

    return (
        <div style={{ padding: '6rem 2rem', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>
                    {step === 1 && 'Forgot Password'}
                    {step === 2 && 'Verify OTP'}
                    {step === 3 && 'New Password'}
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
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength="8"
                                placeholder="Min 8 characters"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
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
