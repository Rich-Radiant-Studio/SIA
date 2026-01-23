# 微前端装修平台系统

基于 Vue 3 + Wujie 的微前端架构装修平台，包含一个基座应用和五个子系统，支持多角色、多语言的装修服务生态系统。

## 🏗️ 项目概述

这是一个完整的装修行业微前端解决方案，支持设计师、供应商、施工方、用户等多种角色，提供从设计到施工的全流程服务。

## 📁 项目结构

```
micro-frontend-workspace/
├── packages/
│   ├── main-web/           # 基座应用 (端口: 8086)
│   ├── designer-web/       # B端设计师端 (端口: 8087)
│   ├── supplier-web/       # B端供应商端 (端口: 8089)
│   ├── contractor-web/     # B端施工端 (端口: 8088)
│   └── user-web/           # C端用户端 (端口: 8085)
├── scripts/                # 构建脚本
│   ├── dev.js             # 开发环境启动脚本
│   └── generate-subapp.js # 子应用生成脚本
└── package.json           # 工作空间配置
```

## 🎯 系统说明

### 🏠 基座应用 (main-web)
- **文件夹**: `packages/main-web`
- **端口**: 8086
- **功能**: 
  - 统一登录注册页面（支持角色选择）
  - 权限管理和分发
  - 语言状态管理（中英文切换）
  - 子应用路由和加载
  - 角色状态同步

### 🎨 B端设计师端 (designer-web)
- **文件夹**: `packages/designer-web`
- **端口**: 8087
- **角色**: designer
- **功能**: 设计工具、模板管理、项目管理、房间类型专业化

### 🏪 B端供应商端 (supplier-web)
- **文件夹**: `packages/supplier-web`
- **端口**: 8089
- **角色**: supplier
- **功能**: 供应商管理、订单处理、库存管理、产品分类

### 🔨 B端施工端 (contractor-web)
- **文件夹**: `packages/contractor-web`
- **端口**: 8088
- **角色**: contractor
- **功能**: 施工项目管理、工种分类、施工进度跟踪

### 👤 C端用户端 (user-web)
- **文件夹**: `packages/user-web`
- **端口**: 8085
- **角色**: user, guest
- **功能**: 用户界面、个人中心、订单管理（游客可浏览部分内容）

## 🔐 登录注册系统

### 📍 位置
- **路径**: `packages/main-web/src/views/Auth/`
- **文件**: 
  - `Login.vue` - 登录页面
  - `Register.vue` - 注册页面

### ✨ 功能特点
- **角色选择**: 支持五种角色切换 (designer/supplier/contractor/user/guest)
- **动态表单**: 注册表单根据角色动态变化
- **状态同步**: 登录和注册页面角色选择实时同步
- **多语言**: 支持中英文切换
- **自动跳转**: 登录成功后根据角色自动跳转到对应子系统
- **游客模式**: 支持有限访问权限

### 🎭 角色专属注册表单

#### 设计师 (Designer)
- 设计师性质：个人/工作室/公司
- 设计师/公司名称
- 擅长房间类型：客厅、卧室、厨房、卫生间等

#### 供应商 (Supplier)
- 公司信息：公司名称、联系人、联系电话
- 地址信息：城市、区域、街道、邮编
- 经营类别：家具、灯具、地板、壁纸等
- 业务范围和自我介绍

#### 施工方 (Contractor)
- 施工方性质：个人/团队/公司
- 工作类型：拆除、水电、电工、地板、油漆等
- 联系信息和详细地址
- 经营范围描述

## 🛠️ 技术栈

### 核心技术
- **框架**: Vue 3 (Composition API, `<script setup>`)
- **构建工具**: Vite
- **路由**: Vue Router 4 (支持动态路由挂载)
- **状态管理**: Pinia (模块化结构)
- **微前端**: Wujie (无界)
- **国际化**: vue-i18n
- **HTTP客户端**: Axios
- **类型检查**: TypeScript

### UI 组件库优先级
1. **Element UI** (最高优先级)
2. **Element Plus** (次优先级)
3. **Ant Design Vue** (备选)

## 📋 开发规范

### 命名规范
- **组件文件夹/文件**: 大驼峰 (PascalCase)
- **变量与函数**: 小驼峰 (camelCase)
- **常量**: 全大写下划线 (SNAKE_CASE)

### 权限控制 (RBAC)
- 路由分为 `constantRoutes` (公共) 和 `asyncRoutes` (权限)
- 支持"游客模式"：`meta: { allowGuest: true }`

### 国际化规范
- 禁止模板中硬编码中文，必须使用 `$t('key')`
- 基座与子应用通过 localStorage 和 wujie.bus 同步语言状态

### 代码组织
- 复杂逻辑抽离到 `useXXX` 组合式函数 (Composables)
- CSS 必须使用 scoped，优先使用 CSS 变量实现主题切换
- 必须定义 defineProps 和 defineEmits

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式 (启动所有应用)
```bash
npm run dev
```

### 单独启动应用
```bash
# 基座应用
npm run dev:main

# 设计师端
npm run dev:designer

# 供应商端
npm run dev:supplier

# 施工端
npm run dev:contractor

# 用户端
npm run dev:user
```

### 构建
```bash
# 构建所有应用
npm run build

# 单独构建
npm run build:main
npm run build:designer
npm run build:supplier
npm run build:contractor
npm run build:user
```

## 🌐 语言状态广播机制

当用户在基座应用中切换语言时，系统会通过以下方式同步给所有子应用：

### 实现机制
1. **Wujie Bus 广播**: 使用 `wujie.bus` 向所有子应用发送语言变更消息
2. **localStorage 同步**: 更新 localStorage 中的 locale 值
3. **子应用监听**: 子应用监听 bus 消息和 storage 事件，自动更新语言

### 代码示例

**基座应用广播语言变化**:
```typescript
// packages/main-web/src/utils/wujie.ts
export const broadcastToMicroApps = (data: any) => {
  Object.keys(MICRO_APP_CONFIG).forEach(appName => {
    bus.$emit(`${appName}-message`, data)
  })
}
```

**子应用接收语言变化**:
```typescript
// packages/contractor-web/src/utils/wujie.ts
bus.$on('contractor-web-message', (data: any) => {
  if (data.type === 'LANGUAGE_CHANGE') {
    locale.value = data.payload.locale
  }
})
```

## 🔄 角色状态管理

### 状态同步机制
- 使用 Pinia store 管理角色状态
- 登录和注册页面角色选择实时同步
- 支持 localStorage 持久化
- 注册表单根据角色动态变化

### 实现代码
```typescript
// packages/main-web/src/stores/role.ts
export const useRoleStore = defineStore('role', () => {
  const selectedRole = ref<'designer' | 'supplier' | 'contractor' | 'user' | 'guest'>('user')
  
  const setRole = (role) => {
    selectedRole.value = role
    localStorage.setItem('selectedRole', role)
  }
  
  return { selectedRole, setRole, initRole }
})
```

## 🎨 UI 设计特点

### 响应式设计
- 支持桌面端和移动端
- 角色卡片网格布局自适应
- 表单字段响应式排列

### 视觉设计
- 现代化卡片式设计
- 角色选择可视化图标
- 动态表单切换动画
- 统一的色彩主题

## 📱 访问地址

启动项目后，可通过以下地址访问：

- **主应用**: http://localhost:8086
- **设计师端**: http://localhost:8087
- **供应商端**: http://localhost:8089
- **施工端**: http://localhost:8088
- **用户端**: http://localhost:8085

## 🔧 后续开发指南

项目已搭建完成基础架构，您可以直接在对应的子系统文件夹中进行页面开发：

### 开发路径
- **设计师端页面**: `packages/designer-web/src/views/`
- **供应商端页面**: `packages/supplier-web/src/views/`
- **施工端页面**: `packages/contractor-web/src/views/`
- **用户端页面**: `packages/user-web/src/views/`

### 已配置功能
- ✅ 基础路由系统
- ✅ 状态管理 (Pinia)
- ✅ 国际化支持
- ✅ 与基座应用通信机制
- ✅ TypeScript 类型支持
- ✅ UI 组件库集成

## 🤝 贡献指南

1. 遵循项目代码规范
2. 优先使用 Element UI 组件
3. 确保国际化支持
4. 保持响应式设计
5. 添加适当的 TypeScript 类型

## 📄 许可证

本项目采用 MIT 许可证。