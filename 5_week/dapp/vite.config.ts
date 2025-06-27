import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis', // Use globalThis instead of window for better compatibility
    'process.env': '{}', // Provide empty process.env for libraries that expect it
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  resolve: {
    alias: {
      // Ensure Buffer is available globally
      buffer: 'buffer',
    },
  },
  plugins: [react()],
})
