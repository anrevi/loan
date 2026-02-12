import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/indian-home-loan-calculator/', // Change this to your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
          'export': ['jspdf', 'jspdf-autotable', 'xlsx'],
          'icons': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
