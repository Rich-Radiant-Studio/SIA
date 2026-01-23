<template>
  <div class="designer-layout">
    <el-container>
      <el-header class="designer-header">
        <div class="header-left">
          <h1>{{ $t('designer.title') }}</h1>
        </div>
        <div class="header-right">
          <span class="user-info">{{ userInfo?.username }}</span>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px" class="designer-aside">
          <el-menu
            :default-active="$route.path"
            class="sidebar-menu"
            router
          >
            <el-menu-item index="/designer/dashboard">
              <el-icon><House /></el-icon>
              <span>{{ $t('designer.dashboard') }}</span>
            </el-menu-item>
            
            <el-menu-item index="/designer/projects">
              <el-icon><Folder /></el-icon>
              <span>{{ $t('designer.projects') }}</span>
            </el-menu-item>
            
            <el-menu-item index="/designer/templates">
              <el-icon><Document /></el-icon>
              <span>{{ $t('designer.templates') }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <el-main class="designer-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { House, Folder, Document } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const userInfo = computed(() => authStore.userInfo)
</script>

<style scoped>
.designer-layout {
  height: 100vh;
}

.designer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}

.header-left h1 {
  margin: 0;
  color: #409eff;
  font-size: 20px;
}

.user-info {
  color: #606266;
}

.designer-aside {
  background: #fff;
  border-right: 1px solid #e4e7ed;
}

.sidebar-menu {
  border-right: none;
}

.designer-main {
  background: #f5f7fa;
  padding: 20px;
}
</style>