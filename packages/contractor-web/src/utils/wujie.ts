import { bus } from 'wujie'

export const setupWujie = () => {
  // 监听基座消息
  bus.$on('contractor-web-message', (data: any) => {
    console.log('施工端收到消息:', data)
    
    if (data.type === 'LANGUAGE_CHANGE') {
      // 处理语言切换
      localStorage.setItem('locale', data.payload.locale)
      window.location.reload() // 简单的重新加载来应用语言变化
    }
    
    if (data.type === 'LOGIN_STATUS_CHANGE') {
      // 处理登录状态变化
      if (data.payload.isLoggedIn) {
        localStorage.setItem('token', data.payload.token)
        localStorage.setItem('userInfo', JSON.stringify(data.payload.user))
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
      }
    }
  })
}

// 向基座发送消息
export const sendMessageToMain = (data: any) => {
  bus.$emit('contractor-web-to-main', data)
}