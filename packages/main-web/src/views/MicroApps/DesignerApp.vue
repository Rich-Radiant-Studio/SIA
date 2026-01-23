<template>
  <div class="micro-app-container">
    <WujieVue
      width="100%"
      height="100%"
      name="designer-web"
      :url="appConfig.url"
      :sync="true"
      :fetch="fetch"
      :props="appProps"
      @beforeLoad="handleBeforeLoad"
      @beforeMount="handleBeforeMount"
      @afterMount="handleAfterMount"
      @beforeUnmount="handleBeforeUnmount"
      @afterUnmount="handleAfterUnmount"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, inject } from 'vue'
import WujieVue from 'wujie-vue3'
import { getMicroAppConfig } from '@/utils/wujie'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import type { I18nPlugin } from '@/plugins/i18n'

const authStore = useAuthStore()
const { locale } = useI18n()
const i18nPlugin = inject<I18nPlugin>('i18nPlugin')

// 获取应用配置
const appConfig = getMicroAppConfig('designer-web')

// 传递给子应用的属性
const appProps = computed(() => ({
  userInfo: authStore.userInfo,
  token: authStore.token,
  locale: locale.value
}))

// 自定义 fetch 函数
const fetch = (url: string, options?: RequestInit) => {
  return window.fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${authStore.token}`,
      'Accept-Language': locale.value
    }
  })
}

// 生命周期钩子
const handleBeforeLoad = (appWindow: Window) => {
  console.log('Designer App 开始加载', appWindow)
}

const handleBeforeMount = (appWindow: Window) => {
  console.log('Designer App 开始挂载', appWindow)
  
  // 向子应用注入全局变量
  appWindow.__WUJIE_MOUNT__ = true
  appWindow.__PARENT_APP__ = {
    userInfo: authStore.userInfo,
    token: authStore.token,
    locale: locale.value
  }
}

const handleAfterMount = (appWindow: Window) => {
  console.log('Designer App 挂载完成', appWindow)
}

const handleBeforeUnmount = (appWindow: Window) => {
  console.log('Designer App 开始卸载', appWindow)
}

const handleAfterUnmount = (appWindow: Window) => {
  console.log('Designer App 卸载完成', appWindow)
}

onMounted(() => {
  console.log('DesignerApp 组件已挂载')
})
</script>

<style scoped>
.micro-app-container {
  width: 100%;
  height: calc(100vh - 120px);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>