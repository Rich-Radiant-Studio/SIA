import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'
import './assets/styles/global.css'

import App from './App.vue'
import router from './router'
import { setupWujieListener } from './utils/wujie'

// 创建 i18n 实例 - 懒加载模式
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'zh',
  messages: {}
})

// 语言包懒加载
const loadLocaleMessages = async (locale: string) => {
  if (i18n.global.availableLocales.includes(locale)) {
    return
  }

  try {
    const messages = await import(`./locales/${locale}.ts`)
    i18n.global.setLocaleMessage(locale, messages.default)
  } catch (error) {
    console.warn(`Failed to load locale ${locale}:`, error)
  }
}

// 设置语言
export const setLanguage = async (locale: string) => {
  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(Antd)

// 设置无界监听器
setupWujieListener()

// 初始化时加载默认语言
const initLocale = localStorage.getItem('locale') || 'zh'
loadLocaleMessages(initLocale).then(() => {
  app.mount('#app')
})