import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'
import './assets/styles/global.css'

import App from './App.vue'
import router from './router'
import { setupWujie } from './utils/wujie'
import { createI18nPlugin, defaultI18nConfig } from './plugins/i18n'
import { useAuthStore } from './stores/auth'

// 创建第三方i18n插件实例
const i18nPlugin = createI18nPlugin({
  ...defaultI18nConfig,
  onLocaleChanged: (locale: string) => {
    // 广播给微前端子应用
    if (window.wujie?.bus) {
      window.wujie.bus.$emit('language-change', {
        type: 'LANGUAGE_CHANGE',
        payload: { locale }
      })
    }

    // 设置HTML属性
    document.documentElement.lang = locale

    // 触发全局事件
    window.dispatchEvent(new CustomEvent('app-language-changed', {
      detail: { locale }
    }))
  }
})

// 初始化应用
const initApp = async () => {
  const app = createApp(App)
  const pinia = createPinia()

  // 安装插件
  app.use(pinia)
  app.use(router)
  app.use(i18nPlugin) // 使用第三方i18n插件
  app.use(ElementPlus)
  app.use(Antd)

  // 初始化无界
  setupWujie()

  // 初始化认证状态和动态路由
  const authStore = useAuthStore()
  await authStore.initializeAuth()

  // 初始化默认语言
  const savedLocale = localStorage.getItem('locale') || 'zh'
  await i18nPlugin.switchLocale(savedLocale)

  // 挂载应用
  app.mount('#app')

  console.log('🚀 App initialized with i18n plugin and auth')
}

// 启动应用
initApp().catch(console.error)

// 导出插件实例供其他模块使用
export { i18nPlugin }