import { bus } from 'wujie'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

// 设置无界监听器
export const setupWujieListener = () => {
  // 监听来自基座的消息
  bus.$on('designer-web-message', (data: any) => {
    console.log('Designer Web 收到消息:', data)
    
    switch (data.type) {
      case 'LANGUAGE_CHANGE':
        handleLanguageChange(data.payload.locale)
        break
        
      case 'LOGIN_STATUS_CHANGE':
        handleLoginStatusChange(data.payload)
        break
        
      default:
        console.log('未知消息类型:', data.type)
    }
  })
  
  // 监听 localStorage 变化（备用同步机制）
  window.addEventListener('storage', (e) => {
    if (e.key === 'locale' && e.newValue) {
      handleLanguageChange(e.newValue)
    }
    
    if (e.key === 'token') {
      const authStore = useAuthStore()
      if (e.newValue) {
        // 用户登录
        authStore.setToken(e.newValue)
      } else {
        // 用户登出
        authStore.clearAuth()
      }
    }
  })
}

// 处理语言变化
const handleLanguageChange = async (newLocale: string) => {
  try {
    // 动态导入语言包
    const { setLanguage } = await import('@/main')
    await setLanguage(newLocale)
    localStorage.setItem('locale', newLocale)
    console.log(`Designer Web 语言已切换为: ${newLocale}`)
  } catch (error) {
    console.error('Designer Web 语言切换失败:', error)
  }
}

// 处理登录状态变化
const handleLoginStatusChange = (payload: any) => {
  const authStore = useAuthStore()
  
  if (payload.isLoggedIn) {
    authStore.setUserInfo(payload.user)
    authStore.setToken(payload.token)
    console.log('Designer Web 用户已登录:', payload.user)
  } else {
    authStore.clearAuth()
    console.log('Designer Web 用户已登出')
  }
}