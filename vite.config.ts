import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment config
export default defineConfig({
  plugins: [react()],
  base: '/my-porfolio2.0/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
})
