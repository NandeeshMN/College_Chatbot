import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-login');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/chatbot/all');
            const result = await response.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            showMessage('Error loading chatbot data', 'error');
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = editingId 
            ? `http://localhost:5000/api/chatbot/update/${editingId}`
            : 'http://localhost:5000/api/chatbot/add';
        
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ question, answer, category })
            });

            const result = await response.json();

            if (result.success) {
                showMessage(`Data ${editingId ? 'updated' : 'added'} successfully`, 'success');
                setQuestion('');
                setAnswer('');
                setCategory('');
                setEditingId(null);
                fetchData();
            } else {
                showMessage(result.error || 'Operation failed', 'error');
            }
        } catch (error) {
            showMessage('Server error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.data_id);
        setQuestion(item.question);
        setAnswer(item.answer);
        setCategory(item.category || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this specific question?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/chatbot/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            const result = await response.json();

            if (result.success) {
                showMessage('Data deleted successfully', 'success');
                fetchData();
            } else {
                showMessage('Failed to delete', 'error');
            }
        } catch (error) {
            showMessage('Server error occurred', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    return (
        <div style={{ padding: '6rem 2rem', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: '#1a365d', margin: 0 }}>Chatbot Admin Dashboard</h1>
                    <button 
                        onClick={handleLogout}
                        style={{ padding: '0.5rem 1rem', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Logout
                    </button>
                </div>

                {message.text && (
                    <div style={{ 
                        padding: '1rem', 
                        marginBottom: '2rem', 
                        borderRadius: '5px', 
                        backgroundColor: message.type === 'success' ? '#c6f6d5' : '#fed7d7',
                        color: message.type === 'success' ? '#2f855a' : '#c53030'
                    }}>
                        {message.text}
                    </div>
                )}

                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '3rem' }}>
                    <h2 style={{ top: 0, marginTop: 0, marginBottom: '1.5rem', color: '#2d3748' }}>
                        {editingId ? 'Edit Chatbot Data' : 'Add New Chatbot Data'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Question</label>
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    required
                                    rows={3}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #cbd5e0', resize: 'vertical' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Answer</label>
                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                    rows={3}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #cbd5e0', resize: 'vertical' }}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '1.5rem', maxWidth: '300px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category (Optional)</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #cbd5e0' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ padding: '0.75rem 2rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Saving...' : (editingId ? 'Update Data' : 'Add Data')}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setQuestion('');
                                        setAnswer('');
                                        setCategory('');
                                    }}
                                    style={{ padding: '0.75rem 2rem', backgroundColor: '#a0aec0', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#2d3748' }}>Existing Questions</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#edf2f7', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem' }}>Question</th>
                                    <th style={{ padding: '1rem' }}>Answer</th>
                                    <th style={{ padding: '1rem' }}>Category</th>
                                    <th style={{ padding: '1rem', width: '150px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr key={item.data_id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '1rem', verticalAlign: 'top' }}>{item.question}</td>
                                            <td style={{ padding: '1rem', verticalAlign: 'top', whiteSpace: 'pre-wrap' }}>{item.answer}</td>
                                            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                {item.category && <span style={{ backgroundColor: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.875rem' }}>{item.category}</span>}
                                            </td>
                                            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                <button 
                                                    onClick={() => handleEdit(item)}
                                                    style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ecc94b', color: '#744210', border: 'none', borderRadius: '3px', marginRight: '0.5rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem' }}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item.data_id)}
                                                    style={{ padding: '0.4rem 0.8rem', backgroundColor: '#f56565', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem' }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>No chatbot data found. Add some above.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
