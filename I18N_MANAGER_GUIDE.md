# 🌐 语言管理器使用指南

## 概述

语言管理器是一个可视化的多语言管理工具，允许您：
- ✅ 动态添加和删除语言
- ✅ 自定义翻译覆盖原始翻译
- ✅ 可视化管理所有翻译内容
- ✅ 导入导出翻译数据
- ✅ 实时预览翻译效果

## 🚀 快速开始

### 1. 访问语言管理器

在登录页面右上角点击设置图标 ⚙️，或直接访问：
```
http://localhost:8080/i18n-manager
```

### 2. 添加新语言

1. 点击"添加语言"按钮
2. 填写语言信息：
   - **语言代码**: 如 `fr`, `de`, `ja`
   - **语言名称**: 如 `Français`, `Deutsch`, `日本語`
   - **国旗图标**: 如 `🇫🇷`, `🇩🇪`, `🇯🇵`
   - **基于语言**: 选择要复制的基础语言模板

### 3. 自定义翻译覆盖

1. 选择要修改的语言
2. 输入翻译键（如 `login.title`）
3. 查看原始翻译内容
4. 输入您的自定义翻译
5. 点击保存

## 📋 支持的语言模板

### 欧洲语言
- 🇫🇷 **fr** - Français (法语)
- 🇩🇪 **de** - Deutsch (德语)
- 🇮🇹 **it** - Italiano (意大利语)
- 🇵🇹 **pt** - Português (葡萄牙语)
- 🇷🇺 **ru** - Русский (俄语)

### 亚洲语言
- 🇯🇵 **ja** - 日本語 (日语)
- 🇰🇷 **ko** - 한국어 (韩语)
- 🇹🇭 **th** - ไทย (泰语)
- 🇻🇳 **vi** - Tiếng Việt (越南语)
- 🇮🇳 **hi** - हिन्दी (印地语)

### 其他语言
- 🇸🇦 **ar** - العربية (阿拉伯语) *支持RTL*
- 🇹🇷 **tr** - Türkçe (土耳其语)

## 🔧 高级功能

### 1. 批量翻译管理

```typescript
import { translationManager } from '@/utils/translationManager'

// 批量设置翻译
translationManager.batchSetTranslations('fr', {
  'login.title': 'Connexion',
  'login.submit': 'Se connecter',
  'register.title': 'Inscription'
})

// 搜索翻译
const results = translationManager.searchTranslationKeys('login')
```

### 2. 导入导出功能

```typescript
// 导出所有翻译
const allTranslations = translationManager.exportTranslations()

// 导出特定语言
const frenchTranslations = translationManager.exportTranslations('fr')

// 导入翻译数据
translationManager.importTranslations(translationData)
```

### 3. 翻译验证

```typescript
import { validateLanguagePack } from '@/utils/languageGenerator'

const validation = validateLanguagePack(translations, [
  'login.title',
  'login.submit',
  'register.title'
])

if (!validation.valid) {
  console.log('缺失的翻译:', validation.missing)
  console.log('错误:', validation.errors)
}
```

## 📝 翻译键参考

### 登录相关
```
login.title              - 登录页标题
login.subtitle           - 登录页副标题
login.emailLabel         - 邮箱标签
login.passwordLabel      - 密码标签
login.submit             - 登录按钮
login.success            - 登录成功提示
login.failed             - 登录失败提示
```

### 注册相关
```
register.title           - 注册页标题
register.createAccount   - 创建账户
register.email           - 邮箱
register.password        - 密码
register.confirmPassword - 确认密码
register.submit          - 注册按钮
```

### 角色相关
```
roles.designer          - 设计师
roles.supplier          - 供应商
roles.contractor        - 施工方
roles.user              - 用户
roles.guest             - 游客
```

### 验证相关
```
validation.emailRequired    - 邮箱必填
validation.emailFormat      - 邮箱格式错误
validation.passwordRequired - 密码必填
validation.passwordLength   - 密码长度要求
```

## 🎯 最佳实践

### 1. 翻译键命名规范
- 使用点分隔的层级结构：`module.component.field`
- 保持键名简洁明了：`login.title` 而不是 `loginPageTitle`
- 使用驼峰命名：`emailRequired` 而不是 `email_required`

### 2. 翻译内容规范
- 保持翻译简洁准确
- 考虑不同语言的文本长度差异
- 使用占位符处理动态内容：`Hello {name}`
- 注意语言的文化差异

### 3. 性能优化
- 只添加真正需要的语言
- 定期清理未使用的翻译键
- 使用懒加载避免初始加载过多语言包

### 4. 团队协作
- 建立翻译审核流程
- 使用版本控制管理翻译文件
- 定期同步和备份翻译数据

## 🔍 故障排除

### 常见问题

**Q: 添加的语言没有显示？**
A: 检查语言代码是否正确，确保没有重复的语言代码。

**Q: 自定义翻译没有生效？**
A: 确保翻译键格式正确，检查浏览器控制台是否有错误信息。

**Q: 语言切换后页面没有更新？**
A: 刷新页面或检查组件是否正确使用了 `$t()` 函数。

### 调试工具

在浏览器控制台中使用：

```javascript
// 查看当前所有翻译
console.log(translationManager.getAllCustomTranslations())

// 搜索特定翻译
console.log(translationManager.searchTranslationKeys('login'))

// 导出翻译数据
console.log(translationManager.exportTranslations())
```

## 📊 数据存储

- **本地存储**: 翻译数据保存在浏览器 localStorage 中
- **键名**: `translation-manager-data`
- **格式**: JSON 格式，包含 custom 和 original 两部分

## 🚀 扩展开发

### 添加新的翻译源

```typescript
// 扩展翻译管理器
class CustomTranslationManager extends TranslationManager {
  // 从API加载翻译
  async loadFromAPI(locale: string) {
    const response = await fetch(`/api/translations/${locale}`)
    const translations = await response.json()
    this.batchSetTranslations(locale, translations)
  }
  
  // 保存到服务器
  async saveToServer(locale: string) {
    const translations = this.exportTranslations(locale)
    await fetch(`/api/translations/${locale}`, {
      method: 'POST',
      body: JSON.stringify(translations)
    })
  }
}
```

### 集成第三方翻译服务

```typescript
// 集成Google翻译API
async function autoTranslate(text: string, targetLang: string) {
  // 调用翻译API
  const translated = await googleTranslate(text, targetLang)
  return translated
}
```

---

通过这个语言管理器，您可以轻松管理项目中的多语言支持，提供更好的国际化用户体验！