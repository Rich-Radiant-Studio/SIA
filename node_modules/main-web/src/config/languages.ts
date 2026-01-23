// 语言配置文件 - 开发者管理
// 这个文件用于配置项目支持的语言，用户只能看到切换按钮

export interface LanguageConfig {
  code: string
  name: string
  flag: string
  enabled: boolean
  customTranslations?: Record<string, string>
}

// 支持的语言配置
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    enabled: true,
    // 可以在这里覆盖特定的翻译
    customTranslations: {
      // 'login.title': '用户登录', // 自定义翻译示例
    }
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    enabled: true,
    customTranslations: {
      // 'login.title': 'User Login', // 自定义翻译示例
    }
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    enabled: true,
    customTranslations: {
      // 'login.title': 'Iniciar Sesión', // 自定义翻译示例
    }
  },
  // 可以添加更多语言
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    enabled: false, // 设置为false则不显示给用户
    customTranslations: {
      'login.title': 'Connexion',
      'login.submit': 'Se connecter',
      'register.title': 'Inscription'
    }
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    enabled: false,
    customTranslations: {
      'login.title': 'Anmelden',
      'login.submit': 'Anmelden',
      'register.title': 'Registrieren'
    }
  },
  {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    enabled: false,
    customTranslations: {
      'login.title': 'ログイン',
      'login.submit': 'ログイン',
      'register.title': '登録'
    }
  }
]

// 获取启用的语言列表（用户可见）
export const getEnabledLanguages = (): LanguageConfig[] => {
  return SUPPORTED_LANGUAGES.filter(lang => lang.enabled)
}

// 获取语言配置
export const getLanguageConfig = (code: string): LanguageConfig | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code)
}

// 获取自定义翻译
export const getCustomTranslations = (code: string): Record<string, string> => {
  const config = getLanguageConfig(code)
  return config?.customTranslations || {}
}

// 开发者工具：启用/禁用语言
export const toggleLanguage = (code: string, enabled: boolean): void => {
  const config = getLanguageConfig(code)
  if (config) {
    config.enabled = enabled
    console.log(`Language ${code} ${enabled ? 'enabled' : 'disabled'}`)
  }
}

// 开发者工具：添加自定义翻译
export const addCustomTranslation = (
  languageCode: string, 
  key: string, 
  value: string
): void => {
  const config = getLanguageConfig(languageCode)
  if (config) {
    if (!config.customTranslations) {
      config.customTranslations = {}
    }
    config.customTranslations[key] = value
    console.log(`Custom translation added: ${languageCode}.${key} = ${value}`)
  }
}

// 开发者工具：批量添加自定义翻译
export const addBatchCustomTranslations = (
  languageCode: string,
  translations: Record<string, string>
): void => {
  const config = getLanguageConfig(languageCode)
  if (config) {
    if (!config.customTranslations) {
      config.customTranslations = {}
    }
    Object.assign(config.customTranslations, translations)
    console.log(`Batch custom translations added for ${languageCode}:`, translations)
  }
}