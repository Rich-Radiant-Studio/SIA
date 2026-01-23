const fs = require('fs')
const path = require('path')

// 子应用配置
const subApps = [
  {
    name: 'supplier-web',
    port: 8082,
    title: 'B端供应商端',
    routePrefix: '/supplier',
    displayName: 'Supplier'
  },
  {
    name: 'user-web',
    port: 8084,
    title: 'C端用户端',
    routePrefix: '/user',
    displayName: 'User'
  }
]

// 生成子应用文件
subApps.forEach(app => {
  const appDir = `packages/${app.name}`
  
  // 创建目录结构
  const dirs = [
    'src/components/Layout',
    'src/views/Dashboard',
    'src/views/Projects',
    'src/stores',
    'src/utils',
    'src/locales',
    'src/api'
  ]
  
  dirs.forEach(dir => {
    const fullPath = path.join(appDir, dir)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }
  })
  
  // 生成 vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
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
    port: ${app.port},
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: '${app.displayName}App',
      fileName: '${app.name}'
    }
  }
})`
  
  fs.writeFileSync(path.join(appDir, 'vite.config.ts'), viteConfig)
  
  // 生成 index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${app.title}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`
  
  fs.writeFileSync(path.join(appDir, 'index.html'), indexHtml)
  
  console.log(`✅ 已生成 ${app.name} 的基础文件`)
})

console.log('🎉 所有子系统基础文件生成完成！')