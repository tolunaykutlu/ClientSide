const API_URL = import.meta.env.VITE_API_URL; //|| 'http://localhost:5115/api/Auth';

export const authService = {
    // Kayıt olma
    async register(username, password) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Giriş başarısız');
            }

            let token;
            try {
                // Yanıtı JSON olarak işlemeye çalış (Standart ve güvenli yöntem)
                const data = await response.json();
                // Backend { token: "..." } şeklinde nesne dönerse:
                if (typeof data === 'object' && data.token) {
                    token = data.token;
                } else {
                    // Backend direkt string olarak "token..." dönerse:
                    token = String(data);
                }
            } catch (e) {
                // JSON değilse düz metin olarak al
                token = await response.text();
            }

            if (!token) {
                throw new Error('Token alınamadı');
            }

            // Token'ı localStorage'a kaydet
            // NOT: Production ortamında güvenlik için HTTPOnly Cookie kullanılması önerilir.
            // XSS saldırılarına karşı localStorage risklidir.
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            return { success: true, token };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Çıkış yapma
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    },

    // Token kontrolü
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    // Kullanıcı adını al
    getUsername() {
        return localStorage.getItem('username');
    },

    // Token'ı al
    getToken() {

        return localStorage.getItem('token');
    }
};
