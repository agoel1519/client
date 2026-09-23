import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    port: 5173
  }
})
