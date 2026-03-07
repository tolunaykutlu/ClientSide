import React, { useEffect, useState } from 'react';
import { stokService } from '../services/api';
import { Plus, Trash2, Edit2, Loader } from 'lucide-react';

const StokPage = () => {
    const QUALITY_OPTIONS = ['430', '304', '316', 'PİRİNC', 'DKP', 'ALIMINYUM'];
    const SURFACE_OPTIONS = ['BA', 'SB', '2B', 'DESENLİ'];
    const THICKNESS_OPTIONS = Array.from({ length: 30 }, (_, i) => (0.1 + i * 0.1).toFixed(2));// 0.10'dan 3.00'e kadar

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

    const initialFormData = {
        quality: '430',
        surfaceFinish: 'BA',
        thickness: '0.10',
        width: '',
        length: 0,
        quantity: 0,
        location: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await stokService.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await stokService.update(editingId, formData);
            } else {
                await stokService.create(formData);
            }
            fetchProducts();
            handleCancel();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            quality: product.quality,
            surfaceFinish: product.surfaceFinish,
            thickness: Number(product.thickness).toFixed(2),
            width: product.width,
            length: product.length,
            quantity: product.quantity,
            location: product.location || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData(initialFormData);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            try {
                await stokService.delete(id);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div>
            <h1 className="page-title">Stok Yönetimi</h1>

            {/* Ürün Ekleme/Düzenleme Formu */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
                    {editingId ? 'Ürünü Güncelle' : 'Yeni Ürün Ekle'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* ... (form fields) ... */}
                        <div className="form-group">
                            <label className="form-label">Kalite</label>
                            <select
                                name="quality"
                                value={formData.quality}
                                onChange={handleInputChange}
                                className="glass-input"
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                            >
                                {QUALITY_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Yüzey</label>
                            <select
                                name="surfaceFinish"
                                value={formData.surfaceFinish}
                                onChange={handleInputChange}
                                className="glass-input"
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                            >
                                {SURFACE_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Kalınlık (mm)</label>
                            <select
                                name="thickness"
                                value={formData.thickness}
                                onChange={handleInputChange}
                                className="glass-input"
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                                required
                            >
                                {THICKNESS_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Genişlik (mm)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="width"
                                value={formData.width}
                                onChange={handleInputChange}
                                className="glass-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Uzunluk (mm)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="length"
                                value={formData.length}
                                onChange={handleInputChange}
                                className="glass-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Kilo</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="glass-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Konum</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="glass-input"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="glass-button">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
                                {editingId ? 'Güncelle' : 'Ekle'}
                            </div>
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="glass-button"
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                            >
                                Vazgeç
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Ürün Listesi */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Stok Listesi</h2>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader className="animate-spin" size={32} color="#0ea5e9" />
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kalite</th>
                                    <th>Yüzey</th>
                                    <th>Kalınlık</th>
                                    <th>Genişlik</th>
                                    <th>Uzunluk</th>
                                    <th>Adet</th>
                                    <th>Konum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.quality}</td>
                                        <td>{product.surfaceFinish}</td>
                                        <td>{product.thickness}</td>
                                        <td>{product.width}</td>
                                        <td>{product.length}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.location}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="glass-button"
                                                    style={{ padding: '0.5rem', backgroundColor: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9' }}
                                                    title="Düzenle"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="glass-button"
                                                    style={{ padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                                            Kayıt bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StokPage;
