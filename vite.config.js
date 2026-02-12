import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/indian-home-loan-calculator/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // faster & default
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
