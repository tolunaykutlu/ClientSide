const API_URL = '/api/Auth';

export const authService = {
    // Kayıt olma
    async register(username, password) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Kayıt başarısız');
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Giriş yapma
    async login(username, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Giriş başarısız');
            }

            // Backend auth mekanizması güncellendi, token artık HttpOnly cookie olarak dönülüyor.
            // Bu yüzden response body'den token okumaya gerek yok.
            localStorage.setItem('isAuthenticated', 'true');

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Çıkış yapma
    async logout() {
        try {
            // Çıkış işlemlerini backend tarafında cookie'yi silmek amaçlı bir request'e dönüştürüyoruz
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (e) {
            console.error('Logout isteği hatası', e);
        }
        localStorage.removeItem('isAuthenticated');
        // Uygulamada token ve kullanıcı adı bilgileri temizlenmiş oldu
    },

    // Token kontrolü
    isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === 'true';
    },

    // Kullanıcı adını al
    getUsername() {
        // Doğrudan saklanılan kullanıcı bilgisi (XSS) kaldırıldı
        return null;
    },

    // Token'ı al
    getToken() {
        return null;
    }
};
