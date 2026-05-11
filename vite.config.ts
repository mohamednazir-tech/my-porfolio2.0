import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment config - Updated: 2026-05-11
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/my-porfolio2.0/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
})
