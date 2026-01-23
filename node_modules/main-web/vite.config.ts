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
    port: 8080,
    cors: true
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        // 手动分割代码块 - 语言包按需加载
        manualChunks: {
          'locale-zh': ['./src/locales/zh.ts'],
          'locale-en': ['./src/locales/en.ts'],
          'locale-es': ['./src/locales/es.ts'],
          'element-plus': ['element-plus'],
          'ant-design-vue': ['ant-design-vue'],
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'wujie': ['wujie-vue3', 'wujie']
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name?.includes('locale-')) {
            return 'locales/[name]-[hash].js'
          }
          return 'js/[name]-[hash].js'
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router', 
      'pinia',
      'vue-i18n',
      'element-plus',
      'ant-design-vue'
    ]
  }
})