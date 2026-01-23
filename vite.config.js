import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Stok': {
        target: 'http://localhost:5115',
        changeOrigin: true,
        secure: false,
      },
      '/Fason': {
        target: 'http://localhost:5115',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
