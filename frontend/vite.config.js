// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/send-email': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
