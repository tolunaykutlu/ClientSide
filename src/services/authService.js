const API_URL = `${import.meta.env.VITE_API_BASE_URL}/Auth`;

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

    async login(username, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Giriş başarısız');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAuthenticated', 'true');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async logout() {
        try {
            await fetch(`${API_URL}/logout`, { method: 'POST' });
        } catch (e) { }
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
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
