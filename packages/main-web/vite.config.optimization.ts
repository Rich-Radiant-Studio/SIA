import { defineConfig } from 'vite'

// Vite 构建优化配置
export const buildOptimization = {
  rollupOptions: {
    output: {
      // 手动分割代码块
      manualChunks: {
        // 将语言包分离到独立的 chunk
        'locale-zh': ['./src/locales/zh.ts'],
        'locale-en': ['./src/locales/en.ts'],
        'locale-es': ['./src/locales/es.ts'],
        
        // 将大型依赖库分离
        'element-plus': ['element-plus'],
        'ant-design-vue': ['ant-design-vue'],
        'vue-vendor': ['vue', 'vue-router', 'pinia'],
        'wujie': ['wujie-vue3', 'wujie']
      },
      
      // 为动态导入的模块生成独立的 chunk
      chunkFileNames: (chunkInfo) => {
        if (chunkInfo.name?.includes('locale-')) {
          return 'locales/[name]-[hash].js'
        }
        return 'js/[name]-[hash].js'
      }
    }
  },
  
  // 启用代码分割
  chunkSizeWarningLimit: 1000,
  
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'vue-i18n',
      'element-plus',
      'ant-design-vue'
    ],
    exclude: [
      // 排除语言包，让它们按需加载
      './src/locales/zh.ts',
      './src/locales/en.ts', 
      './src/locales/es.ts'
    ]
  }
}