<template>
  <div class="projects-page">
    <div class="page-header">
      <h1>{{ $t('designer.projects') }}</h1>
      <p>{{ $t('designer.projectsDesc') }}</p>
    </div>
    
    <div class="projects-content">
      <el-empty :description="$t('common.noData')" />
    </div>
  </div>
</template>

<script setup lang="ts">
// 项目页面 - 待开发
</script>

<style scoped>
.projects-page {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 10px 0;
  color: #303133;
}

.page-header p {
  margin: 0;
  color: #606266;
}

.projects-content {
  background: white;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
}
</style>