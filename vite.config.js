import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.exr'], 
  server: {
    proxy: {
      '/drei-assets': {
        target: 'https://raw.githubusercontent.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/drei-assets/, ''),
      },
    },
  },
})
