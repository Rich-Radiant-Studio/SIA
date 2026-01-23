const { spawn } = require('child_process')
const path = require('path')

// 应用配置
const apps = [
  { name: 'main-web', port: 8080, title: '基座应用' },
  { name: 'designer-web', port: 8081, title: 'B端设计师端' },
  { name: 'supplier-web', port: 8082, title: 'B端供应商端' },
  { name: 'user-web', port: 8084, title: 'C端用户端' }
]

console.log('🚀 启动微前端开发环境...\n')

// 启动所有应用
apps.forEach(app => {
  const appPath = path.join(__dirname, '..', 'packages', app.name)
  
  console.log(`📦 启动 ${app.title} (${app.name}) - 端口: ${app.port}`)
  
  const child = spawn('npm', ['run', 'dev'], {
    cwd: appPath,
    stdio: 'inherit',
    shell: true
  })
  
  child.on('error', (error) => {
    console.error(`❌ ${app.title} 启动失败:`, error)
  })
})

console.log('\n✅ 所有应用启动完成！')
console.log('\n📋 访问地址:')
apps.forEach(app => {
  console.log(`   ${app.title}: http://localhost:${app.port}`)
})

console.log('\n💡 提示: 请先访问基座应用进行登录，然后通过导航访问各个子系统')

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭所有应用...')
  process.exit(0)
})