<template>
  <div class="language-switcher">
    <!-- 简洁的语言切换按钮 - 用户界面 -->
    <el-dropdown @command="handleLanguageChange" trigger="click">
      <el-button size="small" class="language-btn">
        <span class="current-flag">{{ getCurrentLanguageInfo().flag }}</span>
        <span class="current-name">{{ getCurrentLanguageInfo().name }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item 
            v-for="lang in availableLanguages" 
            :key="lang.code"
            :command="lang.code"
            :class="{ 'is-active': currentLocale === lang.code }"
          >
            <span class="lang-flag">{{ lang.flag }}</span>
            <span class="lang-name">{{ lang.name }}</span>
            <span v-if="currentLocale === lang.code" class="lang-check">✓</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getEnabledLanguages, getCustomTranslations } from '@/config/languages'
import type { I18nPlugin } from '@/plugins/i18n'

// 从配置文件获取启用的语言列表
const availableLanguages = ref(getEnabledLanguages())

const { locale } = useI18n()
const i18nPlugin = inject<I18nPlugin>('i18nPlugin')
const currentLocale = computed(() => locale.value)

// 获取当前语言信息
const getCurrentLanguageInfo = () => {
  return availableLanguages.value.find(lang => lang.code === currentLocale.value) || 
         availableLanguages.value[0]
}

// 处理语言切换
const handleLanguageChange = async (langCode: string) => {
  try {
    // 使用第三方插件的语言切换
    if (i18nPlugin) {
      await i18nPlugin.switchLocale(langCode)
      
      // 应用自定义翻译
      const customTranslations = getCustomTranslations(langCode)
      if (Object.keys(customTranslations).length > 0) {
        applyCustomTranslations(langCode, customTranslations)
      }
    }
    
    ElMessage.success(`已切换到 ${getCurrentLanguageInfo().name}`)
  } catch (error) {
    console.error('Language switch failed:', error)
    ElMessage.error('语言切换失败')
  }
}

// 应用自定义翻译
const applyCustomTranslations = (locale: string, customTranslations: Record<string, string>) => {
  const { setLocaleMessage, getLocaleMessage } = useI18n()
  const messages = getLocaleMessage(locale)
  
  // 合并自定义翻译
  for (const [key, value] of Object.entries(customTranslations)) {
    setNestedValue(messages, key, value)
  }
  
  setLocaleMessage(locale, messages)
  console.log(`Applied custom translations for ${locale}:`, customTranslations)
}

// 设置嵌套值
const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.')
  let current = obj
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {}
    }
    current = current[keys[i]]
  }
  
  current[keys[keys.length - 1]] = value
}

// 初始化语言设置
const initializeLanguage = async () => {
  const savedLocale = localStorage.getItem('locale') || 'zh'
  
  if (savedLocale !== currentLocale.value) {
    await handleLanguageChange(savedLocale)
  }
}

// 组件挂载时初始化
onMounted(() => {
  initializeLanguage()
})

// 暴露给父组件的方法
defineExpose({
  switchLanguage: handleLanguageChange,
  getCurrentLanguage: getCurrentLanguageInfo,
  availableLanguages: availableLanguages.value
})
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.language-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.current-flag {
  font-size: 16px;
}

.current-name {
  font-size: 13px;
  font-weight: 500;
}

.lang-flag {
  font-size: 16px;
  margin-right: 8px;
}

.lang-name {
  font-size: 14px;
  flex: 1;
}

.lang-check {
  color: #67c23a;
  font-weight: bold;
  margin-left: 8px;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

:deep(.el-dropdown-menu__item.is-active) {
  background-color: #f5f7fa;
  color: #409eff;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #ecf5ff;
}
</style>