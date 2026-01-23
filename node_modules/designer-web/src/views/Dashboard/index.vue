<template>
  <div class="designer-dashboard">
    <div class="welcome-section">
      <h1>{{ $t('designer.welcome') }}</h1>
      <p>{{ $t('designer.description') }}</p>
    </div>
    
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><Folder /></el-icon>
        </div>
        <div class="stat-info">
          <h3>12</h3>
          <p>{{ $t('designer.totalProjects') }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><Document /></el-icon>
        </div>
        <div class="stat-info">
          <h3>8</h3>
          <p>{{ $t('designer.totalTemplates') }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><Clock /></el-icon>
        </div>
        <div class="stat-info">
          <h3>3</h3>
          <p>{{ $t('designer.recentProjects') }}</p>
        </div>
      </div>
    </div>
    
    <div class="quick-actions">
      <h2>{{ $t('designer.quickActions') }}</h2>
      <div class="action-buttons">
        <el-button type="primary" size="large" @click="createProject">
          <el-icon><Plus /></el-icon>
          {{ $t('designer.createProject') }}
        </el-button>
        
        <el-button type="success" size="large" @click="browseTemplates">
          <el-icon><Document /></el-icon>
          {{ $t('designer.browseTemplates') }}
        </el-button>
        
        <el-button type="info" size="large" @click="viewProjects">
          <el-icon><Folder /></el-icon>
          {{ $t('designer.viewProjects') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Folder, Document, Clock, Plus } from '@element-plus/icons-vue'

const router = useRouter()

const createProject = () => {
  // 创建新项目的逻辑
  console.log('创建新项目')
}

const browseTemplates = () => {
  router.push('/designer/templates')
}

const viewProjects = () => {
  router.push('/designer/projects')
}
</script>

<style scoped>
.designer-dashboard {
  padding: 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-section h1 {
  color: #409eff;
  margin-bottom: 10px;
}

.welcome-section p {
  color: #606266;
  font-size: 16px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.stat-info h3 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.stat-info p {
  margin: 5px 0 0 0;
  color: #606266;
  font-size: 14px;
}

.quick-actions {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.quick-actions h2 {
  margin-bottom: 20px;
  color: #303133;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>