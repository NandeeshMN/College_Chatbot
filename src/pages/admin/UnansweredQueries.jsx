import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Trash2, Search, ArrowUpDown, ShieldAlert, CheckCircle } from 'lucide-react';

const UnansweredQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Modals & Toasts
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [showClearAllModal, setShowClearAllModal] = useState(false);
    const [toast, setToast] = useState({ show: false, text: '', type: '' });
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-login');
            return;
        }
        fetchQueries();
    }, [navigate]);

    const fetchQueries = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/unanswered-queries', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            
            if (response.status === 401) {
                sessionStorage.removeItem('adminToken');
                navigate('/admin-login');
                return;
            }

            if (result.success) {
                setQueries(result.data);
            } else {
                showToast(result.error || 'Failed to fetch queries', 'error');
            }
        } catch (error) {
            console.error('Error fetching queries:', error);
            showToast('Server error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (text, type) => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast({ show: false, text: '', type: '' }), 3000);
    };

    const handleDelete = (id) => {
        setIdToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!idToDelete) return;

        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/unanswered-queries/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                showToast('Query deleted successfully', 'success');
                fetchQueries();
            } else {
                showToast('Failed to delete query', 'error');
            }
        } catch (error) {
            showToast('Server error occurred', 'error');
        } finally {
            setShowDeleteModal(false);
            setIdToDelete(null);
        }
    };

    const handleClearAll = () => {
        if (queries.length === 0) return;
        setShowClearAllModal(true);
    };

    const confirmClearAll = async () => {
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/unanswered-queries`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.success) {
                showToast('All queries cleared', 'success');
                fetchQueries();
            } else {
                showToast('Failed to clear queries', 'error');
            }
        } catch (error) {
            showToast('Server error occurred', 'error');
        } finally {
            setShowClearAllModal(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        showToast('Query copied to clipboard', 'success');
    };

    // Filter & Sort Logic
    const filteredQueries = queries.filter(q => 
        q.query.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedQueries = [...filteredQueries].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedQueries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedQueries = sortedQueries.slice(startIndex, startIndex + itemsPerPage);

    // Ensure we don't end up on an empty page if we delete the last item
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div style={{ position: 'relative' }}>
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
                    <div style={{ fontSize: '1.5rem' }}>
                        {toast.type === 'success' ? <CheckCircle size={28} /> : '❌'}
                    </div>
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
                    <h1 style={{ color: '#1a365d', margin: 0 }}>Unanswered Queries</h1>
                </div>

                {/* Statistics Card */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{ 
                        backgroundColor: '#ebf8ff', 
                        padding: '1rem', 
                        borderRadius: '50%', 
                        color: '#3182ce',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ShieldAlert size={32} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: '#4a5568', fontSize: '1rem', fontWeight: 'normal' }}>Total Unanswered Queries</h3>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontSize: '2rem', fontWeight: 'bold' }}>
                            {queries.length}
                        </p>
                    </div>
                </div>

                {/* Data Section */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    
                    {/* Controls Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        
                        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                            {/* Search */}
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                                <input
                                    type="text"
                                    placeholder="Search queries..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.6rem 0.6rem 0.6rem 2.5rem', 
                                        borderRadius: '5px', 
                                        border: '1px solid #cbd5e0',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            {/* Sort */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #cbd5e0', borderRadius: '5px', padding: '0 0.5rem', backgroundColor: '#f7fafc' }}>
                                <ArrowUpDown size={16} color="#4a5568" />
                                <select 
                                    value={sortOrder}
                                    onChange={(e) => {
                                        setSortOrder(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        padding: '0.6rem 0',
                                        color: '#4a5568',
                                        fontWeight: '500',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={handleClearAll}
                            disabled={queries.length === 0}
                            style={{ 
                                padding: '0.6rem 1.2rem', 
                                backgroundColor: queries.length === 0 ? '#fc8181' : '#e53e3e', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px', 
                                cursor: queries.length === 0 ? 'not-allowed' : 'pointer', 
                                fontWeight: 'bold', 
                                fontSize: '0.9rem',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#edf2f7', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem', width: '50px' }}>#</th>
                                    <th style={{ padding: '1rem' }}>User Query</th>
                                    <th style={{ padding: '1rem', width: '200px' }}>Date & Time</th>
                                    <th style={{ padding: '1rem', width: '150px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>Loading queries...</td>
                                    </tr>
                                ) : paginatedQueries.length > 0 ? (
                                    paginatedQueries.map((item, index) => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '1rem', color: '#718096' }}>{startIndex + index + 1}</td>
                                            <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>{item.query}</td>
                                            <td style={{ padding: '1rem', color: '#718096', fontSize: '0.9rem' }}>{formatDate(item.created_at)}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button 
                                                        onClick={() => handleCopy(item.query)}
                                                        title="Copy Query"
                                                        style={{ 
                                                            padding: '0.4rem', 
                                                            backgroundColor: '#edf2f7', 
                                                            color: '#4a5568', 
                                                            border: 'none', 
                                                            borderRadius: '4px', 
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Copy size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        title="Delete Query"
                                                        style={{ 
                                                            padding: '0.4rem', 
                                                            backgroundColor: '#fff5f5', 
                                                            color: '#e53e3e', 
                                                            border: 'none', 
                                                            borderRadius: '4px', 
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '3rem', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ 
                                                    width: '64px', height: '64px', 
                                                    backgroundColor: '#f0fff4', 
                                                    borderRadius: '50%', 
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                    color: '#38a169'
                                                }}>
                                                    <CheckCircle size={32} />
                                                </div>
                                                <p style={{ margin: 0, color: '#4a5568', fontSize: '1.1rem', fontWeight: '500' }}>
                                                    {searchTerm ? 'No queries match your search.' : '🎉 No unanswered queries found.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedQueries.length)} of {sortedQueries.length}
                            </span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        backgroundColor: currentPage === 1 ? '#edf2f7' : '#e2e8f0',
                                        color: currentPage === 1 ? '#a0aec0' : '#4a5568',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    Previous
                                </button>
                                <span style={{ padding: '0.4rem 0.8rem', backgroundColor: '#3182ce', color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
                                    {currentPage}
                                </span>
                                <button 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        backgroundColor: currentPage === totalPages ? '#edf2f7' : '#e2e8f0',
                                        color: currentPage === totalPages ? '#a0aec0' : '#4a5568',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Single Confirmation Modal */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 10000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
                        width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#e53e3e', fontSize: '1.25rem', marginBottom: '1rem' }}>Delete Query</h3>
                        <p style={{ color: '#4a5568', marginBottom: '2rem' }}>Are you sure you want to delete this unanswered query?</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button 
                                onClick={() => { setShowDeleteModal(false); setIdToDelete(null); }}
                                style={{ padding: '0.6rem 1.5rem', border: '1px solid #cbd5e0', backgroundColor: 'transparent', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#4a5568', transition: 'background-color 0.2s' }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                style={{ padding: '0.6rem 1.5rem', border: 'none', backgroundColor: '#e53e3e', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Clear All Confirmation Modal */}
            {showClearAllModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 10000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
                        width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#e53e3e', fontSize: '1.25rem', marginBottom: '1rem' }}>Delete All Queries</h3>
                        <p style={{ color: '#4a5568', marginBottom: '2rem' }}>Are you sure you want to delete all unanswered queries? This action cannot be undone.</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button 
                                onClick={() => setShowClearAllModal(false)}
                                style={{ padding: '0.6rem 1.5rem', border: '1px solid #cbd5e0', backgroundColor: 'transparent', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#4a5568', transition: 'background-color 0.2s' }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmClearAll}
                                style={{ padding: '0.6rem 1.5rem', border: 'none', backgroundColor: '#e53e3e', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Yes, Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UnansweredQueries;
