<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const { locale } = useI18n()

onMounted(() => {
  // 初始化用户状态
  authStore.initializeAuth()
  
  // 监听语言变化，广播给子应用
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
  }
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
}
</style>