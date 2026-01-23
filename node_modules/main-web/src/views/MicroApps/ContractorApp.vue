<template>
  <div class="contractor-app">
    <WujieVue
      width="100%"
      height="100%"
      name="contractor-web"
      :url="contractorConfig.url"
      :sync="true"
      :fetch="fetch"
      :props="props"
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

// 获取施工端配置
const contractorConfig = getMicroAppConfig('contractor-web')

// 传递给子应用的属性
const props = computed(() => ({
  userInfo: authStore.userInfo,
  token: authStore.token,
  locale: locale.value
}))

// 自定义 fetch 函数
const fetch = (url: string, options: any) => {
  return window.fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}
</script>

<style scoped>
.contractor-app {
  width: 100%;
  height: 100%;
}
</style>