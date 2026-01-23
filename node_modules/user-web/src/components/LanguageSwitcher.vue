<template>
  <div class="language-switcher">
    <div class="dropdown">
      <button 
        class="btn btn-outline-secondary btn-sm dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown"
        :title="currentLanguage.name"
      >
        <span class="flag">{{ currentLanguage.flag }}</span>
        <span class="d-none d-md-inline ms-1">{{ currentLanguage.name }}</span>
      </button>
      <ul class="dropdown-menu">
        <li v-for="locale in availableLocales" :key="locale">
          <a 
            class="dropdown-item" 
            href="#" 
            @click.prevent="switchLanguage(locale)"
            :class="{ active: locale === currentLocale }"
          >
            <span class="flag me-2">{{ getLanguageInfo(locale).flag }}</span>
            {{ getLanguageInfo(locale).name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted } from 'vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const currentLocale = ref(i18n?.currentLocale || 'zh')

const languages = {
  zh: { name: '中文', flag: '🇨🇳' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' }
}

const availableLocales = computed(() => i18n?.availableLocales || ['zh', 'en', 'es'])

const currentLanguage = computed(() => {
  return languages[currentLocale.value as keyof typeof languages] || languages.zh
})

const getLanguageInfo = (locale: string) => {
  return languages[locale as keyof typeof languages] || languages.zh
}

const switchLanguage = async (locale: string) => {
  if (i18n && locale !== currentLocale.value) {
    await i18n.switchLocale(locale)
    currentLocale.value = locale
  }
}

// 监听语言变化事件
onMounted(() => {
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLocale.value = event.detail.locale
  })
  
  // 同步初始语言
  currentLocale.value = i18n?.currentLocale || 'zh'
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.flag {
  font-size: 1.1em;
}

.dropdown-item.active {
  background-color: #f8f9fa;
  font-weight: 500;
}

.dropdown-item:hover {
  background-color: #e9ecef;
}

.btn {
  border: 1px solid #dee2e6;
  background: white;
}

.btn:hover {
  background-color: #f8f9fa;
}
</style>