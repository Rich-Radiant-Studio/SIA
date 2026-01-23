import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

// 第三方插件配置接口
export interface I18nPluginConfig {
  defaultLocale: string
  fallbackLocale: string
  availableLocales: string[]
  loadLocaleMessages: (locale: string) => Promise<any>
  onLocaleChanged?: (locale: string) => void
}

// 第三方插件类
export class I18nPlugin {
  private i18n: any
  private config: I18nPluginConfig
  private loadedLocales: Set<string> = new Set()

  constructor(config: I18nPluginConfig) {
    this.config = config
    this.i18n = createI18n({
      legacy: false,
      locale: config.defaultLocale,
      fallbackLocale: config.fallbackLocale,
      messages: {}, // 初始为空，懒加载
      globalInjection: true,
      silentTranslationWarn: true
    })
  }

  // 安装插件到Vue应用
  install(app: App) {
    app.use(this.i18n)
    
    // 全局属性
    app.config.globalProperties.$i18nPlugin = this
    
    // 提供注入
    app.provide('i18nPlugin', this)
    
    return this
  }

  // 切换语言
  async switchLocale(locale: string): Promise<void> {
    if (!this.config.availableLocales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }

    // 懒加载语言包
    if (!this.loadedLocales.has(locale)) {
      await this.loadLocale(locale)
    }

    // 切换语言
    this.i18n.global.locale.value = locale
    
    // 保存到本地存储
    localStorage.setItem('locale', locale)
    
    // 触发回调
    if (this.config.onLocaleChanged) {
      this.config.onLocaleChanged(locale)
    }

    console.log(`🌐 Language switched to: ${locale}`)
  }

  // 加载语言包
  private async loadLocale(locale: string): Promise<void> {
    try {
      console.log(`📦 Loading locale: ${locale}`)
      
      const messages = await this.config.loadLocaleMessages(locale)
      this.i18n.global.setLocaleMessage(locale, messages)
      this.loadedLocales.add(locale)
      
      console.log(`✅ Locale loaded: ${locale}`)
    } catch (error) {
      console.error(`❌ Failed to load locale: ${locale}`, error)
      throw error
    }
  }

  // 获取当前语言
  getCurrentLocale(): string {
    return this.i18n.global.locale.value
  }

  // 获取可用语言列表
  getAvailableLocales(): string[] {
    return this.config.availableLocales
  }

  // 获取已加载的语言列表
  getLoadedLocales(): string[] {
    return Array.from(this.loadedLocales)
  }

  // 预加载语言包
  async preloadLocales(locales: string[]): Promise<void> {
    const promises = locales
      .filter(locale => !this.loadedLocales.has(locale))
      .map(locale => this.loadLocale(locale))
    
    await Promise.all(promises)
    console.log(`🚀 Preloaded locales: ${locales.join(', ')}`)
  }

  // 翻译函数
  t(key: string, params?: any): string {
    return this.i18n.global.t(key, params)
  }

  // 检查翻译键是否存在
  te(key: string, locale?: string): boolean {
    return this.i18n.global.te(key, locale)
  }

  // 获取i18n实例
  getInstance() {
    return this.i18n
  }
}

// 创建插件实例
export const createI18nPlugin = (config: I18nPluginConfig): I18nPlugin => {
  return new I18nPlugin(config)
}

// 默认配置
export const defaultI18nConfig: I18nPluginConfig = {
  defaultLocale: 'zh',
  fallbackLocale: 'zh',
  availableLocales: ['zh', 'en', 'es'],
  loadLocaleMessages: async (locale: string) => {
    const messages = await import(`@/locales/${locale}.ts`)
    return messages.default
  },
  onLocaleChanged: (locale: string) => {
    // 广播语言变更事件
    document.dispatchEvent(new CustomEvent('i18n-locale-changed', {
      detail: { locale }
    }))
  }
}

// 全局类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18nPlugin: I18nPlugin
  }
}