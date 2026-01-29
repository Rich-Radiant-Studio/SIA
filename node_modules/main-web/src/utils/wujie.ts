import WujieVue from 'wujie-vue3'
import { bus } from 'wujie'

// 子应用配置
const MICRO_APP_CONFIG = {
  'designer-web': {
    url: 'http://localhost:8081',
    name: 'designer-web'
  },
  'supplier-web': {
    url: 'http://localhost:8082', 
    name: 'supplier-web'
  },
  'user-web': {
    url: 'http://localhost:8084',
    name: 'user-web'
  }
}

// 初始化无界
export const setupWujie = () => {
  // 预加载子应用
  Object.values(MICRO_APP_CONFIG).forEach(config => {
    WujieVue.preloadApp({
      name: config.name,
      url: config.url,
      sync: true,
      prefix: {
        'prefix-dialog': 'dialog',
        'prefix-counter': 'counter'
      }
    })
  })
}

// 广播消息给所有子应用
export const broadcastToMicroApps = (data: any) => {
  Object.keys(MICRO_APP_CONFIG).forEach(appName => {
    try {
      // 使用 wujie bus 广播
      bus.$emit(`${appName}-message`, data)
      
      // 同时更新 localStorage 以确保数据同步
      if (data.type === 'LANGUAGE_CHANGE') {
        localStorage.setItem('locale', data.payload.locale)
      }
      
      if (data.type === 'LOGIN_STATUS_CHANGE') {
        if (data.payload.isLoggedIn) {
          localStorage.setItem('token', data.payload.token)
          localStorage.setItem('userInfo', JSON.stringify(data.payload.user))
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
        }
      }
    } catch (error) {
      console.warn(`广播消息给 ${appName} 失败:`, error)
    }
  })
}

// 获取子应用配置
export const getMicroAppConfig = (appName: string) => {
  return MICRO_APP_CONFIG[appName as keyof typeof MICRO_APP_CONFIG]
}

export { MICRO_APP_CONFIG }