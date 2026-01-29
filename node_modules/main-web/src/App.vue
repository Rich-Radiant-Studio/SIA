<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { locale } = useI18n()
const router = useRouter()

// 处理来自子应用的消息
const handleMessage = (event: MessageEvent) => {
  // 安全检查：确保消息来自可信源
  // 在生产环境中，应该检查 event.origin
  
  if (event.data && typeof event.data === 'object') {
    const { type, path, replace, clearGuestAccount } = event.data
    
    switch (type) {
      case 'NAVIGATE':
        console.log('📨 Received NAVIGATE message from child app:', path)
        if (path) {
          if (replace) {
            router.replace(path)
          } else {
            router.push(path)
          }
        }
        break
        
      case 'LOGOUT':
        console.log('📨 Received LOGOUT message from child app')
        authStore.logout()
        if (clearGuestAccount) {
          localStorage.removeItem('guestAccount')
        }
        router.push('/login')
        break
        
      default:
        // 忽略未知消息类型
        break
    }
  }
}

onMounted(() => {
  // 初始化用户状态
  authStore.initializeAuth()
  
  // 监听语言变化，广播给子应用
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
  }
  
  // 监听来自子应用的消息
  window.addEventListener('message', handleMessage)
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('message', handleMessage)
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
}
</style>