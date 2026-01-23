# 🌐 第三方语言插件使用指南

## 概述

项目现在使用第三方语言插件系统，提供：
- ✅ 用户只看到简洁的语言切换下拉菜单
- ✅ 开发者通过配置文件管理语言
- ✅ 支持自定义翻译覆盖
- ✅ 懒加载和性能优化
- ✅ 微前端语言同步

## 🎯 用户界面

用户只能看到一个简洁的语言切换下拉菜单：
- 🌐 显示当前语言的国旗和名称
- 📋 点击显示可用语言列表
- ✅ 选择语言即时切换

## 🔧 开发者配置

### 1. 语言配置文件

编辑 `packages/main-web/src/config/languages.ts`：

```typescript
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    enabled: true, // 用户可见
    customTranslations: {
      // 自定义翻译覆盖
      'login.title': '用户登录'
    }
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    enabled: false, // 用户不可见，但可以启用
    customTranslations: {
      'login.title': 'Connexion',
      'register.title': 'Inscription'
    }
  }
]
```

### 2. 启用/禁用语言

```typescript
import { toggleLanguage } from '@/config/languages'

// 启用法语
toggleLanguage('fr', true)

// 禁用西班牙语
toggleLanguage('es', false)
```

### 3. 添加自定义翻译

```typescript
import { addCustomTranslation, addBatchCustomTranslations } from '@/config/languages'

// 单个翻译
addCustomTranslation('fr', 'login.welcome', 'Bienvenue')

// 批量翻译
addBatchCustomTranslations('de', {
  'login.title': 'Anmelden',
  'login.submit': 'Anmelden',
  'register.title': 'Registrieren'
})
```

## 📁 文件结构

```
packages/main-web/src/
├── plugins/
│   └── i18n.ts                 # 第三方插件核心
├── components/
│   └── LanguageSwitcher/       # 用户语言切换组件
│       └── index.vue
├── config/
│   └── languages.ts            # 开发者语言配置
└── locales/                    # 语言包文件
    ├── zh.ts
    ├── en.ts
    └── es.ts
```

## 🚀 插件特性

### 1. 懒加载
- 只加载用户选择的语言包
- 首次切换时动态加载
- 已加载的语言包自动缓存

### 2. 自定义翻译覆盖
- 在配置文件中定义自定义翻译
- 自动覆盖原始翻译内容
- 支持嵌套键值（如 `login.title`）

### 3. 微前端同步
- 自动广播语言变更给子应用
- 支持wujie总线通信
- localStorage备用同步机制

## 🔧 开发者API

### 插件实例方法

```typescript
import { i18nPlugin } from '@/main'

// 切换语言
await i18nPlugin.switchLocale('fr')

// 获取当前语言
const current = i18nPlugin.getCurrentLocale()

// 获取可用语言
const available = i18nPlugin.getAvailableLocales()

// 预加载语言包
await i18nPlugin.preloadLocales(['fr', 'de'])

// 翻译文本
const text = i18nPlugin.t('login.title')
```

### 配置管理

```typescript
import { 
  getEnabledLanguages, 
  getLanguageConfig,
  getCustomTranslations 
} from '@/config/languages'

// 获取用户可见的语言
const userLanguages = getEnabledLanguages()

// 获取语言配置
const config = getLanguageConfig('fr')

// 获取自定义翻译
const custom = getCustomTranslations('fr')
```

## 📝 添加新语言

### 步骤1：创建语言包文件

创建 `packages/main-web/src/locales/fr.ts`：

```typescript
export default {
  common: {
    confirm: 'Confirmer',
    cancel: 'Annuler',
    // ...
  },
  login: {
    title: 'Connexion',
    submit: 'Se connecter',
    // ...
  }
  // ...
}
```

### 步骤2：添加到配置文件

在 `languages.ts` 中添加：

```typescript
{
  code: 'fr',
  name: 'Français',
  flag: '🇫🇷',
  enabled: true, // 设置为true让用户可见
  customTranslations: {
    // 可选的自定义翻译
  }
}
```

### 步骤3：测试

重启开发服务器，用户界面会自动显示新语言选项。

## 🎨 自定义样式

语言切换组件支持自定义样式：

```vue
<template>
  <LanguageSwitcher class="custom-switcher" />
</template>

<style>
.custom-switcher .language-btn {
  background: #f0f9ff;
  border-color: #0ea5e9;
}
</style>
```

## 🔍 调试工具

### 浏览器控制台

```javascript
// 查看插件实例
console.log(window.__I18N_PLUGIN__)

// 查看当前语言
console.log(window.__I18N_PLUGIN__.getCurrentLocale())

// 查看已加载的语言
console.log(window.__I18N_PLUGIN__.getLoadedLocales())

// 手动切换语言
await window.__I18N_PLUGIN__.switchLocale('fr')
```

### 开发模式日志

插件会在控制台输出详细日志：
- `🌐 Language switched to: fr` - 语言切换成功
- `📦 Loading locale: fr` - 开始加载语言包
- `✅ Locale loaded: fr` - 语言包加载完成

## ⚡ 性能优化

### 1. 预加载策略

```typescript
// 在应用启动时预加载常用语言
await i18nPlugin.preloadLocales(['en', 'es'])
```

### 2. 缓存机制

- 已加载的语言包自动缓存
- 避免重复加载相同语言包
- localStorage持久化语言选择

### 3. 代码分割

Vite自动将语言包分割为独立chunk：
- `locales/zh-[hash].js`
- `locales/en-[hash].js`
- `locales/es-[hash].js`

## 🚀 部署注意事项

### 1. 构建优化

确保vite.config.ts包含语言包分割配置：

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'locale-zh': ['./src/locales/zh.ts'],
        'locale-en': ['./src/locales/en.ts'],
        'locale-es': ['./src/locales/es.ts']
      }
    }
  }
}
```

### 2. CDN部署

语言包可以部署到CDN以提升加载速度：

```typescript
// 修改插件配置
loadLocaleMessages: async (locale: string) => {
  const response = await fetch(`https://cdn.example.com/locales/${locale}.json`)
  return response.json()
}
```

## 🔧 故障排除

### 常见问题

**Q: 新添加的语言不显示？**
A: 检查 `languages.ts` 中 `enabled: true` 和语言包文件是否存在。

**Q: 自定义翻译不生效？**
A: 确保翻译键格式正确，检查浏览器控制台错误信息。

**Q: 语言切换后子应用没有更新？**
A: 检查子应用是否正确监听语言变更事件。

### 调试步骤

1. 检查控制台是否有错误日志
2. 确认语言包文件路径正确
3. 验证配置文件语法
4. 测试插件API调用

---

通过这个第三方插件系统，您可以轻松管理多语言支持，同时为用户提供简洁的语言切换体验！