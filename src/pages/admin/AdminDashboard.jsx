import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    
    // ➤ NEW TOAST STATE
    const [toast, setToast] = useState({ show: false, text: '', type: '' });
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
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
            showToast('Error loading chatbot data', 'error');
        }
    };

    // ➤ NEW TOAST FUNCTION
    const showToast = (text, type) => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast({ show: false, text: '', type: '' }), 3000);
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
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ question, answer, category })
            });

            const result = await response.json();

            if (result.success) {
                showToast(`Data ${editingId ? 'updated' : 'added'} successfully`, 'success');
                setQuestion('');
                setAnswer('');
                setCategory('');
                setEditingId(null);
                fetchData();
            } else {
                showToast(result.error || 'Operation failed', 'error');
            }
        } catch (error) {
            showToast('Server error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleExcelUpload = async (e) => {
        e.preventDefault();
        console.log("Excel upload triggered");

        if (!excelFile) {
            showToast("select the file to continue", "error");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', excelFile);

        try {
            const response = await fetch('http://localhost:5000/api/admin/chatbot/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: formData
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (result.success) {
                showToast("Excel uploaded Successfully", 'success');
                setExcelFile(null);
                // Reset file input
                const fileInput = document.getElementById('excel-upload-input');
                if (fileInput) fileInput.value = '';
                fetchData();
            } else {
                showToast("failed to upload the file", 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showToast("failed to upload the file", 'error');
        } finally {
            setUploading(false);
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
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });

            const result = await response.json();

            if (result.success) {
                showToast('Data deleted successfully', 'success');
                fetchData();
            } else {
                showToast('Failed to delete', 'error');
            }
        } catch (error) {
            showToast('Server error occurred', 'error');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        navigate('/');
    };

    return (
        <div style={{ padding: '6rem 2rem', minHeight: '100vh', backgroundColor: '#f4f7f6', position: 'relative' }}>
            
            {/* ➤ CUSTOM CENTERED TOAST COMPONENT */}
            {toast.show && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    padding: '1.5rem 2.5rem',
                    borderRadius: '12px',
                    backgroundColor: toast.type === 'success' ? '#2f855a' : '#c53030',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    textAlign: 'center',
                    minWidth: '300px',
                    animation: 'fadeInOut 3s forwards',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <div style={{ fontSize: '1.5rem' }}>{toast.type === 'success' ? '✔' : '❌'}</div>
                    <div>{toast.text}</div>
                    
                    <style>{`
                        @keyframes fadeInOut {
                            0% { opacity: 0; transform: translate(-50%, -60%); }
                            10% { opacity: 1; transform: translate(-50%, -50%); }
                            90% { opacity: 1; transform: translate(-50%, -50%); }
                            100% { opacity: 0; transform: translate(-50%, -40%); }
                        }
                    `}</style>
                </div>
            )}

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

                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '3rem' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#2d3748' }}>
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

                {/* ➤ BULK UPLOAD SECTION */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '3rem', border: '1px dashed #cbd5e0' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📊 Bulk Upload Questions</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#718096' }}>(Excel .xlsx only)</span>
                    </h2>
                    <p style={{ marginBottom: '1.5rem', color: '#4a5568' }}>
                        Upload an Excel file with <strong>"questions"</strong> and <strong>"answers"</strong> columns for bulk insertion.
                    </p>
                    <form onSubmit={handleExcelUpload} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input 
                            id="excel-upload-input"
                            type="file" 
                            accept=".xlsx, .xls"
                            onChange={(e) => setExcelFile(e.target.files[0])}
                            style={{ padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: '5px', flex: 1 }}
                        />
                        <button
                            type="submit"
                            disabled={uploading || !excelFile}
                            style={{ 
                                padding: '0.75rem 1.5rem', 
                                backgroundColor: '#48bb78', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px', 
                                fontWeight: 'bold', 
                                cursor: (uploading || !excelFile) ? 'not-allowed' : 'pointer',
                                opacity: (uploading || !excelFile) ? 0.7 : 1
                            }}
                        >
                            {uploading ? 'Uploading...' : 'Upload Excel'}
                        </button>
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
