import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './AuthPages.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validasyon
        if (!username || !password || !confirmPassword) {
            setError('Lütfen tüm alanları doldurun');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            setLoading(false);
            return;
        }

        const result = await authService.register(username, password);

        if (result.success) {
            // Başarılı kayıt - login sayfasına yönlendir
            navigate('/login');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-glow auth-glow-1"></div>
                <div className="auth-glow auth-glow-2"></div>
                <div className="auth-glow auth-glow-3"></div>
            </div>

            <div className="auth-card glass-panel">
                <div className="auth-header">
                    <h1 className="auth-title">Hesap Oluştur</h1>
                    <p className="auth-subtitle">Yeni bir hesap oluşturun</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="auth-error animate-fade-in">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="currentColor" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="glass-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Kullanıcı adınızı girin"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Şifre
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="glass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifrenizi girin (en az 6 karakter)"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">
                            Şifre Tekrar
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="glass-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Şifrenizi tekrar girin"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="glass-button auth-submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner">
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                </svg>
                                Kayıt yapılıyor...
                            </span>
                        ) : (
                            'Kayıt Ol'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Zaten hesabınız var mı?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="auth-link"
                            disabled={loading}
                        >
                            Giriş Yap
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
