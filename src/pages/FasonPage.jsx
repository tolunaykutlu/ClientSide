import React, { useEffect, useState } from 'react';
import { fasonService } from '../services/api';
import { Plus, Trash2, Loader, Factory } from 'lucide-react';

const FasonPage = () => {
    const QUALITY_OPTIONS = ["201", "202", "303", "304", "304 DDQ", "304L", "309S", "310", "310S", "316", "316L", "316Ti", "321", "409", "420", "430", "431", "440M", "309", "439", "630", 'PİRİNC', 'DKP', 'ALIMINYUM'];
    const SURFACE_OPTIONS = ['BA', 'SB', '2B'];
    const COMPANY_OPTIONS = ['KUTLU', 'ÇİMEN', 'SIRAKAYA', 'İMPEKS', 'KOCA'];
    const THICKNESS_OPTIONS = Array.from({ length: 20 }, (_, i) => (0.1 + i * 0.1).toFixed(2));

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        quality: '430',
        surfaceFinish: 'BA',
        thickness: '0.10',
        width: '',
        length: 0,
        quantity: 0,
        companyName: '',
        processType: 'Boy Kesim',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fasonService.getAll();
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
            await fasonService.create(formData);
            fetchProducts();
            setFormData({
                quality: '430',
                surfaceFinish: 'BA',
                thickness: '0.10',
                width: '',
                length: 0,
                quantity: 0,
                companyName: '',
                processType: 'Boy Kesim',
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
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

    return (
        <div>
            <h1 className="page-title">Fason İşlemler</h1>

            {/* Add Product Form */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Yeni İşlem Ekle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Firma Adı</label>
                            <input
                                list="company-options"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="glass-input"
                                required
                            />
                            <datalist id="company-options">
                                {COMPANY_OPTIONS.map((option) => (
                                    <option key={option} value={option} />
                                ))}
                            </datalist>
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
                    <button type="submit" className="glass-button">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={18} />
                            Kaydet
                        </div>
                    </button>
                </form>
            </div>

            {/* Products List */}
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
                                    <tr key={product.id}>
                                        <td>{product.companyName}</td>
                                        <td>{product.processType}</td>
                                        <td>{product.quality}</td>
                                        <td>{product.surfaceFinish}</td>
                                        <td>{product.thickness}</td>
                                        <td>{product.width}</td>
                                        <td>{product.length}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="glass-button"
                                                style={{ padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
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
