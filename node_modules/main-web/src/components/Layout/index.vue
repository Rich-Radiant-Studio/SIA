<template>
  <div class="layout-container">
    <el-container>
      <!-- 顶部导航 -->
      <el-header class="layout-header">
        <div class="header-left">
          <h1 class="logo">{{ $t('common.systemName') }}</h1>
        </div>
        
        <div class="header-right">
          <!-- 语言切换 -->
          <LanguageSwitcher />
          
          <!-- 用户信息 -->
          <el-dropdown @command="handleUserCommand">
            <span class="user-info">
              <el-avatar :size="32" :src="userInfo?.avatar">
                {{ userInfo?.username?.charAt(0).toUpperCase() }}
              </el-avatar>
              <span class="username">{{ userInfo?.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">{{ $t('nav.profile') }}</el-dropdown-item>
                <el-dropdown-item command="settings">{{ $t('nav.settings') }}</el-dropdown-item>
                <el-dropdown-item divided command="logout">{{ $t('nav.logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-container>
        <!-- 侧边导航 -->
        <el-aside width="200px" class="layout-aside">
          <el-menu
            :default-active="$route.path"
            class="sidebar-menu"
            router
          >
            <el-menu-item index="/dashboard">
              <el-icon><House /></el-icon>
              <span>{{ $t('nav.dashboard') }}</span>
            </el-menu-item>
            
            <el-menu-item 
              v-if="hasRole(['designer'])"
              index="/designer"
            >
              <el-icon><Brush /></el-icon>
              <span>{{ $t('nav.designer') }}</span>
            </el-menu-item>
            
            <el-menu-item 
              v-if="hasRole(['supplier'])"
              index="/supplier"
            >
              <el-icon><Shop /></el-icon>
              <span>{{ $t('nav.supplier') }}</span>
            </el-menu-item>
            
            <el-menu-item 
              v-if="hasRole(['user', 'guest'])"
              index="/user"
            >
              <el-icon><User /></el-icon>
              <span>{{ $t('nav.user') }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <!-- 主内容区 -->
        <el-main class="layout-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown, House, Brush, Shop, Setting, User } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()
const i18nPlugin = inject<I18nPlugin>('i18nPlugin')

const userInfo = computed(() => authStore.userInfo)

// 检查用户角色
const hasRole = (roles: string[]) => {
  return authStore.userRoles.some(role => roles.includes(role))
}

// 处理用户操作
const handleUserCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      // 跳转到个人资料页
      router.push('/profile')
      break
      
    case 'settings':
      // 跳转到设置页
      router.push('/settings')
      break
      
    case 'logout':
      try {
        await ElMessageBox.confirm(
          t('common.logoutConfirm'),
          t('common.confirm'),
          {
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.cancel'),
            type: 'warning'
          }
        )
        
        authStore.logout()
        ElMessage.success(t('common.logoutSuccess'))
      } catch {
        // 用户取消登出
      }
      break
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}

.header-left .logo {
  margin: 0;
  color: #409eff;
  font-size: 20px;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.language-selector {
  width: 100px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.username {
  font-size: 14px;
  color: #606266;
}

.layout-aside {
  background: #fff;
  border-right: 1px solid #e4e7ed;
}

.sidebar-menu {
  border-right: none;
}

.layout-main {
  background: #f5f7fa;
  padding: 20px;
}
</style>