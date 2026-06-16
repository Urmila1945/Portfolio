import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/static': 'http://localhost:5000',
      '/contact': 'http://localhost:5000',
      '/chat': 'http://localhost:5000',
      '/analyze_resume': 'http://localhost:5000'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
