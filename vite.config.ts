import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy) => {
          // Fallback mock responses if backend isn't running
          proxy.on('error', () => {
            console.log('API proxy error - using fallback responses')
          })
        }
      }
    }
  }
})
