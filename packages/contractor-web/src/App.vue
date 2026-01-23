<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { bus } from 'wujie'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

onMounted(() => {
  // 监听基座的语言切换消息
  bus.$on('contractor-web-message', (data: any) => {
    if (data.type === 'LANGUAGE_CHANGE') {
      locale.value = data.payload.locale
    }
  })
  
  // 从 localStorage 同步语言设置
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>