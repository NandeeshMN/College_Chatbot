import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.admin));
                navigate('/admin-dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please configure the backend properly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '6rem 2rem', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <Helmet>
                <title>Admin Login | CBS</title>
            </Helmet>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>Admin Access</h2>
                {error && <div style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '0.75rem', borderRadius: '5px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '1rem' }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div style={{ textAlign: 'center' }}>
                        <Link 
                            to="/forgot-password" 
                            style={{ color: '#1a365d', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
