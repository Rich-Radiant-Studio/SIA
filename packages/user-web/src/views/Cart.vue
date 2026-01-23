<template>
  <div class="cart-page">
    <div class="container-fluid px-4 py-4">
      <h1 class="text-center mb-4">{{ $t('page.cart') }}</h1>
      <p class="text-center text-muted">{{ $t('page.developing') }}</p>
      <div class="text-center mt-4">
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, getCurrentInstance } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const instance = getCurrentInstance()
const currentLanguage = ref(i18n?.currentLocale || 'zh')
const componentKey = ref(0)

const $t = (key: string) => {
  const _ = currentLanguage.value
  return i18n?.t(key) || key
}

onMounted(() => {
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLanguage.value = event.detail.locale
    componentKey.value++
    instance?.proxy?.$forceUpdate()
  })
})
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding-top: 2rem;
}
</style>