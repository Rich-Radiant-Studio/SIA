<template>
  <div class="micro-app-container">
    <WujieVue
      width="100%"
      height="100%"
      name="supplier-web"
      :url="appConfig.url"
      :sync="true"
      :fetch="fetch"
      :props="appProps"
      @beforeLoad="handleBeforeLoad"
      @beforeMount="handleBeforeMount"
      @afterMount="handleAfterMount"
    />
  </div>
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

const appConfig = getMicroAppConfig('supplier-web')

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
  console.log('Supplier App 开始加载', appWindow)
}

const handleBeforeMount = (appWindow: Window) => {
  console.log('Supplier App 开始挂载', appWindow)
  appWindow.__WUJIE_MOUNT__ = true
  appWindow.__PARENT_APP__ = {
    userInfo: authStore.userInfo,
    token: authStore.token,
    locale: locale.value
  }
}

const handleAfterMount = (appWindow: Window) => {
  console.log('Supplier App 挂载完成', appWindow)
}
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