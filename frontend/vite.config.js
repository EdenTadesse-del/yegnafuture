import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite is the development server and build tool for our React app.
// This config tells it to use React, and to proxy API calls to the backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // When React calls /api/... it forwards to our backend server
      '/api': 'http://localhost:5000',
      // Uploaded images are served by the backend
      '/uploads': 'http://localhost:5000',
    },
  },
});