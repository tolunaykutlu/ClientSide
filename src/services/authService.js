const API_URL = 'http://localhost:5115/api/Auth';

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

            let token = await response.text();

            // Token'daki gereksiz karakterleri temizle (tırnak işaretleri, boşluklar vb.)
            token = token.replace(/^["']|["']$/g, '').trim();

            // Token'ı localStorage'a kaydet
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
