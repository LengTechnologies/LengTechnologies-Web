import { defineConfig } from 'vite';

// set via command npm run dev = development
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    base: '/',
    build: {
      outDir: '../frontend/dist', // adjust if needed for correct path in your backend
    },
    server: isDev
      ? {
          proxy: {
            '/send-email': {
              target: 'http://localhost:3001',
              changeOrigin: true,
            },
          },
        }
      : {},
  };
});
