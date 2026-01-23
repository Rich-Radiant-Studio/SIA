import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { setupWujie } from './utils/wujie'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('./views/Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/contractor/'),
  routes
})

// 国际化配置
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  messages: {
    zh: {
      dashboard: {
        title: '施工端工作台',
        welcome: '欢迎使用施工端系统'
      }
    },
    en: {
      dashboard: {
        title: 'Contractor Dashboard',
        welcome: 'Welcome to Contractor System'
      }
    },
    es: {
      dashboard: {
        title: 'Panel de Contratista',
        welcome: 'Bienvenido al Sistema de Contratista'
      }
    }
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(ElementPlus)

// 设置无界
setupWujie()

app.mount('#app')