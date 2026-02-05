import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8081,
    host: '0.0.0.0',
    cors: true,
    allowedHosts: [
      'women-boxing-vatican-knives.trycloudflare.com',
      '.trycloudflare.com',
      'localhost'
    ],
    hmr: false,
    origin: ''
  },
  build: {
    target: 'es2015'
  }
})