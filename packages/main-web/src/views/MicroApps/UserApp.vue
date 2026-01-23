<template>
  <!-- 完全独立的用户端应用 -->
  <WujieVue
    width="100%"
    height="100vh"
    name="user-web"
    :url="appConfig.url"
    :sync="false"
    :alive="true"
    :fetch="fetch"
    :props="appProps"
    @beforeLoad="handleBeforeLoad"
    @beforeMount="handleBeforeMount"
    @afterMount="handleAfterMount"
    @loadError="handleLoadError"
  />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import WujieVue from 'wujie-vue3'
import { getMicroAppConfig } from '@/utils/wujie'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import type { I18nPlugin } from '@/plugins/i18n'

const authStore = useAuthStore()
const { locale } = useI18n()
const i18nPlugin = inject<I18nPlugin>('i18nPlugin')

const appConfig = getMicroAppConfig('user-web')

const appProps = computed(() => ({
  userInfo: authStore.userInfo,
  token: authStore.token,
  locale: locale.value
}))

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

const handleBeforeLoad = (appWindow: Window) => {
  console.log('User App 开始加载', appWindow)
}

const handleBeforeMount = (appWindow: Window) => {
  console.log('User App 开始挂载', appWindow)
  appWindow.__WUJIE_MOUNT__ = true
  appWindow.__PARENT_APP__ = {
    userInfo: authStore.userInfo,
    token: authStore.token,
    locale: locale.value
  }
}

const handleAfterMount = (appWindow: Window) => {
  console.log('User App 挂载完成', appWindow)
}

const handleLoadError = (error: any) => {
  console.error('User App 加载失败:', error)
}
</script>