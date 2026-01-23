# 路由跳转修复指南

## 已完成的修复

### 1. ✅ 修复微前端环境检测
**问题：** 之前的检测条件 `window.parent !== window` 太宽松，导致独立运行时也被识别为微前端环境。

**修复：** 只检查 Wujie 特定标记
```typescript
const isWujieEnv = !!(window as any).__POWERED_BY_WUJIE__ || !!(window as any).__WUJIE__
```

### 2. ✅ 添加调试支持
在开发环境中，router 现在可以通过 `window.$router` 访问。

### 3. ✅ 添加详细日志
所有关键步骤都有日志输出，方便排查问题。

### 4. ✅ 配置开发服务器
添加了 `strictPort: true` 确保端口正确。

## 测试步骤

### 步骤 1: 启动开发服务器
```bash
cd packages/user-web
npm run dev
```

### 步骤 2: 访问应用
打开浏览器访问：`http://localhost:8084`

### 步骤 3: 打开控制台
按 F12 打开浏览器开发者工具，切换到 Console 标签。

### 步骤 4: 检查日志
你应该看到以下日志：
```
user-web main.ts 开始执行
window.__POWERED_BY_WUJIE__: undefined
window.__WUJIE__: undefined
微前端环境检测: false
独立环境，直接挂载
Router 已挂载到 window.$router
路由配置完成，共 15 个路由
用户端语言切换到: zh
user-web main.ts 执行完成
```

### 步骤 5: 测试导航
点击页面上的任何导航链接（如"商城"、"设计师"等）。

**预期结果：**
- 控制台显示：`路由跳转: { from: '/', to: '/shop' }`
- URL 变化为：`http://localhost:8084/shop`
- 页面内容变化

## 调试命令

如果路由不工作，在控制台执行以下命令：

### 1. 检查路由实例
```javascript
console.log(window.$router)
```
应该看到路由对象，不是 undefined。

### 2. 查看所有路由
```javascript
console.log(window.$router.getRoutes())
```
应该看到 15 个路由配置。

### 3. 查看当前路由
```javascript
console.log(window.$router.currentRoute.value)
```
应该看到当前路由信息。

### 4. 测试编程式导航
```javascript
window.$router.push('/shop')
```
如果这个能工作，说明路由配置正确，问题在 router-link。

### 5. 测试 router-link
```javascript
// 检查页面上的 router-link 元素
document.querySelectorAll('a[href^="/"]').forEach(link => {
  console.log(link.getAttribute('href'), link.textContent)
})
```

## 常见问题排查

### 问题 1: 控制台没有任何日志
**原因：** 应用没有正确加载

**解决：**
1. 确认开发服务器正在运行
2. 检查是否有 JavaScript 错误
3. 刷新页面（Ctrl+F5 强制刷新）

### 问题 2: 看到 "微前端环境检测: true"
**原因：** 被识别为微前端环境

**解决：**
1. 确认你是直接访问 `http://localhost:8084`
2. 不要通过 iframe 或其他方式嵌入
3. 检查是否有浏览器扩展干扰

### 问题 3: 点击链接没有反应
**可能原因 A：** router-link 没有正确渲染

**检查：**
```javascript
// 查看链接元素
document.querySelector('a[href="/shop"]')
```

**可能原因 B：** 事件被拦截

**检查：**
```javascript
// 监听所有点击事件
document.addEventListener('click', (e) => {
  console.log('点击事件:', e.target)
}, true)
```

**可能原因 C：** Bootstrap JavaScript 冲突

**解决：** 检查是否有 Bootstrap 的 dropdown 或其他组件干扰。

### 问题 4: URL 变化但页面不变
**原因：** router-view 没有正确渲染

**检查：**
```javascript
// 查看 router-view 元素
document.querySelector('router-view')
```

**解决：** 确认 App.vue 中有 `<router-view />`

### 问题 5: 404 错误
**原因：** 直接访问子路由时服务器返回 404

**解决：** Vite 开发服务器默认支持 HTML5 History 模式，不应该出现此问题。如果出现，检查 vite.config.ts。

## 如果问题仍然存在

### 方案 1: 使用 Hash 模式
如果 History 模式有问题，可以临时改用 Hash 模式：

```typescript
// packages/user-web/src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
```

这样 URL 会变成 `http://localhost:8084/#/shop`

### 方案 2: 简化测试
创建一个最简单的测试页面：

```vue
<!-- packages/user-web/src/views/Test.vue -->
<template>
  <div>
    <h1>测试页面</h1>
    <router-link to="/">首页</router-link> |
    <router-link to="/shop">商城</router-link>
  </div>
</template>
```

然后访问 `http://localhost:8084/test`

## 提供诊断信息

如果问题仍然存在，请提供：

1. **控制台完整日志**（从页面加载到点击链接）
2. **Network 标签**（查看是否有请求失败）
3. **Elements 标签**（查看 DOM 结构）
4. **执行调试命令的结果**

## 测试文件

我已创建了一个测试页面：`packages/user-web/test-routing.html`

在浏览器中打开这个文件，按照说明进行测试。
