import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Power, PowerOff } from 'lucide-react';

const AdsManagement = () => {
    const [ads, setAds] = useState([]);
    const [formData, setFormData] = useState({
        redirect_link: '',
        start_date: '',
        end_date: '',
        is_active: 'true',
        display_order: '0'
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, text: '', type: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [adToDelete, setAdToDelete] = useState(null);

    const API_BASE_URL = 'http://localhost:5000/api/admin/ads';

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setAds(result.data);
            }
        } catch (error) {
            showToast('Error loading advertisements', 'error');
        }
    };

    const showToast = (text, type) => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast({ show: false, text: '', type: '' }), 3000);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('redirect_link', formData.redirect_link);
        data.append('start_date', formData.start_date);
        data.append('end_date', formData.end_date);
        data.append('is_active', formData.is_active);
        data.append('display_order', formData.display_order);
        if (imageFile) {
            data.append('image', imageFile);
        }

        const url = editingId ? `${API_BASE_URL}/update/${editingId}` : `${API_BASE_URL}/add`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: data
            });

            const result = await response.json();
            if (result.success) {
                showToast(`Ad ${editingId ? 'updated' : 'added'} successfully`, 'success');
                resetForm();
                fetchAds();
            } else {
                showToast(result.message || 'Operation failed', 'error');
            }
        } catch (error) {
            showToast('Server error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            redirect_link: '',
            start_date: '',
            end_date: '',
            is_active: 'true',
            display_order: '0'
        });
        setImageFile(null);
        setPreviewUrl(null);
        setEditingId(null);
    };

    const handleEdit = (ad) => {
        setEditingId(ad.id);
        setFormData({
            redirect_link: ad.redirect_link || '',
            start_date: ad.start_date ? ad.start_date.split('T')[0] : '',
            end_date: ad.end_date ? ad.end_date.split('T')[0] : '',
            is_active: ad.is_active ? 'true' : 'false',
            display_order: ad.display_order.toString()
        });
        setPreviewUrl(`http://localhost:5000${ad.image_url}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setAdToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!adToDelete) return;

        try {
            const response = await fetch(`${API_BASE_URL}/delete/${adToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                showToast('Advertisement deleted', 'success');
                fetchAds();
            }
        } catch (error) {
            showToast('Delete failed', 'error');
        } finally {
            setShowDeleteModal(false);
            setAdToDelete(null);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/toggle/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                showToast('Status updated', 'success');
                fetchAds();
            }
        } catch (error) {
            showToast('Toggle failed', 'error');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {toast.show && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 9999, padding: '1.5rem 2.5rem', borderRadius: '12px',
                    backgroundColor: toast.type === 'success' ? '#2f855a' : '#c53030',
                    color: 'white', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    textAlign: 'center', minWidth: '300px'
                }}>
                    <div>{toast.text}</div>
                </div>
            )}

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ color: '#1a365d', marginBottom: '2rem' }}>Advertisement Management</h1>

                {/* Form Section */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#2d3748', fontSize: '1.25rem' }}>
                        {editingId ? 'Edit Advertisement' : 'Add New Advertisement'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Brochure Image</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} required={!editingId} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                                {previewUrl && (
                                    <div style={{ marginTop: '1rem', position: 'relative', width: '200px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                        <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Redirect Link (Apply Now)</label>
                                <input type="url" placeholder="https://example.com/apply" value={formData.redirect_link} onChange={(e) => setFormData({...formData, redirect_link: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                            </div>
                        </div>

                        <div className="admin-form-grid-4">
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Start Date</label>
                                <input type="date" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>End Date</label>
                                <input type="date" value={formData.end_date} onChange={(e) => setFormData({...formData, end_date: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Display Order</label>
                                <input type="number" min="0" value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Status</label>
                                <select value={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="admin-button-group">
                            <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                {loading ? 'Saving...' : (editingId ? 'Update Advertisement' : 'Post Advertisement')}
                            </button>
                            {editingId && <button type="button" onClick={resetForm} style={{ padding: '0.75rem 2rem', backgroundColor: '#a0aec0', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel Edit</button>}
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="responsive-table-wrapper">
                    <table className="responsive-table">
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Preview</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Link & Order</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Duration</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.length > 0 ? ads.map((ad) => (
                                <tr key={ad.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                            <img src={`http://localhost:5000${ad.image_url}`} alt="Ad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ad.redirect_link || 'No link'}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Order: {ad.display_order}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontSize: '0.875rem' }}>{ad.start_date ? new Date(ad.start_date).toLocaleDateString() : '-'}</div>
                                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>to {ad.end_date ? new Date(ad.end_date).toLocaleDateString() : '-'}</div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <button onClick={() => handleToggleStatus(ad.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: ad.is_active ? '#38a169' : '#e53e3e' }}>
                                            {ad.is_active ? <Power size={20} /> : <PowerOff size={20} />}
                                        </button>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button onClick={() => handleEdit(ad)} style={{ color: '#3182ce', background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(ad.id)} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No advertisements found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
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
                        <h3 style={{ marginTop: 0, color: '#e53e3e', fontSize: '1.25rem', marginBottom: '1rem' }}>Delete Advertisement</h3>
                        <p style={{ color: '#4a5568', marginBottom: '2rem' }}>Are you sure you want to delete this advertisement? This action cannot be undone.</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button 
                                onClick={() => { setShowDeleteModal(false); setAdToDelete(null); }}
                                style={{ padding: '0.6rem 1.5rem', border: '1px solid #cbd5e0', backgroundColor: 'transparent', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#4a5568', transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                style={{ padding: '0.6rem 1.5rem', border: 'none', backgroundColor: '#e53e3e', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#c53030'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#e53e3e'}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdsManagement;
