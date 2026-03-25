import React, { useEffect, useState } from 'react';
import { fasonService, firmaService } from '../services/api';
import { Plus, Trash2, Loader, Factory, Edit2, Building2, CheckCircle2 } from 'lucide-react';

const FasonPage = () => {
    const QUALITY_OPTIONS = ["201", "202", "303", "304", "304 DDQ", "304L", "309S", "310", "310S", "316", "316L", "316Ti", "321", "409", "420", "430", "431", "440M", "309", "439", "630", 'PİRİNC', 'DKP', 'ALIMINYUM'];
    const SURFACE_OPTIONS = ['BA', 'SB', '2B'];
    const THICKNESS_OPTIONS = Array.from({ length: 20 }, (_, i) => (0.1 + i * 0.1).toFixed(2));

    const [products, setProducts] = useState([]);
    const [firms, setFirms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [showAddFirma, setShowAddFirma] = useState(false);
    const [newFirmaName, setNewFirmaName] = useState('');

    const initialFormData = {
        quality: '430',
        surfaceFinish: 'BA',
        thickness: '0.10',
        width: '',
        length: 0,
        quantity: 0,
        companyName: '',
        processType: 'Boy Kesim',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        fetchProducts();
        fetchFirms();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fasonService.getAll();
            const sortedData = response.data.sort((a, b) => b.id - a.id);
            setProducts(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFirms = async () => {
        try {
            const response = await firmaService.getAll();
            setFirms(response.data);
        } catch (error) {
            console.error('Error fetching firms:', error);
        }
    };

    const handleAddFirma = async () => {
        if (!newFirmaName.trim()) return;
        try {
            await firmaService.create({ Name: newFirmaName });
            setNewFirmaName('');
            setShowAddFirma(false);
            fetchFirms();
        } catch (error) {
            console.error('Error adding firma:', error);
            alert('Firma eklenirken bir hata oluştu.');
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
                await fasonService.update(editingId, formData);
            } else {
                await fasonService.create(formData);
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
            companyName: product.companyName,
            processType: product.processType,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData(initialFormData);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
            try {
                await fasonService.delete(id);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleToggleDone = async (id) => {
        try {
            await fasonService.toggleDone(id);
            fetchProducts();
        } catch (error) {
            console.error('Error toggling done status:', error);
        }
    };


    return (
        <div>
            <h1 className="page-title">Fason İşlemler</h1>

            {/* İşlem Ekleme/Düzenleme Formu */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
                    {editingId ? 'İşlemi Güncelle' : 'Yeni İşlem Ekle'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Firma Adı</label>
                            <select
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="glass-input"
                                required
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                            >
                                <option value="">Firma Seçin</option>
                                {firms.map((firma) => (
                                    <option key={firma.id} value={firma.name}>{firma.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">İşlem Tipi</label>
                            <select
                                name="processType"
                                value={formData.processType}
                                onChange={handleInputChange}
                                className="glass-input"
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                            >
                                <option value="Boy Kesim">Boy Kesim</option>
                                <option value="Dilme">Dilme</option>
                                <option value="Taşlama">Taşlama</option>
                                <option value="PVC Kaplama">PVC Kaplama</option>
                            </select>
                        </div>
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
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="glass-button">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
                                {editingId ? 'Güncelle' : 'Kaydet'}
                            </div>
                        </button>
                        {!editingId && (
                            <button
                                type="button"
                                onClick={() => setShowAddFirma(true)}
                                className="glass-button"
                                style={{ backgroundColor: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Building2 size={18} />
                                    Firma Ekle
                                </div>
                            </button>
                        )}
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

            {/* Firma Ekleme Modalı */}
            {showAddFirma && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(8px)'
                }}>
                    <div className="glass-panel" style={{ padding: '2rem', width: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Building2 size={24} color="#0ea5e9" />
                            Yeni Firma Ekle
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Firma Adı</label>
                            <input
                                type="text"
                                value={newFirmaName}
                                onChange={(e) => setNewFirmaName(e.target.value)}
                                className="glass-input"
                                placeholder="Örn: ABC Metal"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && handleAddFirma()}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={handleAddFirma} className="glass-button" style={{ flex: 1 }}>
                                Ekle
                            </button>
                            <button
                                onClick={() => { setShowAddFirma(false); setNewFirmaName(''); }}
                                className="glass-button"
                                style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.83)' }}
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* İşlem Listesi */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Fason Takip Listesi</h2>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader className="animate-spin" size={32} color="#0ea5e9" />
                    </div>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Firma Adı</th>
                                    <th>İşlem</th>
                                    <th>Kalite</th>
                                    <th>Yüzey</th>
                                    <th>Kalınlık</th>
                                    <th>Genişlik</th>
                                    <th>Uzunluk</th>
                                    <th>Kilo</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} style={{ color: product.isDone ? '#080808' : 'white' }}>
                                        <td>{product.companyName}</td>
                                        <td>{product.processType}</td>
                                        <td>{product.quality}</td>
                                        <td>{product.surfaceFinish}</td>
                                        <td>{product.thickness}</td>
                                        <td>{product.width}</td>
                                        <td>{product.length}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="glass-button"
                                                    style={{ padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 1)', color: '#0ea5e9' }}
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
                                                <button
                                                    onClick={() => handleToggleDone(product.id)}
                                                    className="glass-button"
                                                    style={{ 
                                                        padding: '0.5rem', 
                                                        backgroundColor: product.isDone ? 'rgba(34, 197, 94, 0.4)' : 'rgba(34, 197, 94, 0.2)', 
                                                        color: product.isDone ? '#16a34a' : '#22c55e' 
                                                    }}
                                                    title={product.isDone ? 'Tamamlandı' : 'Tamamla'}
                                                >
                                                    <CheckCircle2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>
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

export default FasonPage;
