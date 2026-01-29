<template>
  <div class="dashboard">
    <div class="welcome-card">
      <h2>{{ $t('dashboard.welcome') }}</h2>
      <p>{{ $t('dashboard.description') }}</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon designer">
          <el-icon><Brush /></el-icon>
        </div>
        <div class="stat-content">
          <h3>{{ $t('nav.designer') }}</h3>
          <p>{{ $t('dashboard.designerDesc') }}</p>
          <el-button 
            v-if="hasRole(['designer'])"
            type="primary" 
            @click="$router.push('/designer')"
          >
            {{ $t('common.enter') }}
          </el-button>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon supplier">
          <el-icon><Shop /></el-icon>
        </div>
        <div class="stat-content">
          <h3>{{ $t('nav.supplier') }}</h3>
          <p>{{ $t('dashboard.supplierDesc') }}</p>
          <el-button 
            v-if="hasRole(['supplier'])"
            type="primary" 
            @click="$router.push('/supplier')"
          >
            {{ $t('common.enter') }}
          </el-button>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon user">
          <el-icon><User /></el-icon>
        </div>
        <div class="stat-content">
          <h3>{{ $t('nav.user') }}</h3>
          <p>{{ $t('dashboard.userDesc') }}</p>
          <el-button 
            v-if="hasRole(['user', 'guest'])"
            type="primary" 
            @click="$router.push('/user')"
          >
            {{ $t('common.enter') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Brush, Shop, Setting, User } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// 检查用户角色
const hasRole = (roles: string[]) => {
  return authStore.userRoles.some(role => roles.includes(role))
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;
}

.welcome-card h2 {
  color: #00699A;
  margin-bottom: 10px;
}

.welcome-card p {
  color: #606266;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.stat-icon.designer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.supplier {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.admin {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.user {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0 0 10px 0;
  color: #102129;
  font-size: 18px;
}

.stat-content p {
  margin: 0 0 15px 0;
  color: #606266;
  font-size: 14px;
}
</style>