import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      "/user": "http://localhost:5173",
      "/home": "http://localhost:5173",
      "/swipe": "http://localhost:5173",
      "/admin": "http://localhost:5173"
    }
  }
});