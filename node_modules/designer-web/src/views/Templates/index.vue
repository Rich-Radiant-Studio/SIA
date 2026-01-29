<template>
  <div class="templates-page">
    <div class="page-header">
      <h1>{{ $t('designer.templates') }}</h1>
      <p>{{ $t('designer.templatesDesc') }}</p>
    </div>
    
    <div class="templates-content">
      <el-empty :description="$t('common.noData')" />
    </div>
  </div>
</template>

<script setup lang="ts">
// 模板页面 - 待开发
</script>

<style scoped>
.templates-page {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 10px 0;
  color: #102129;
}

.page-header p {
  margin: 0;
  color: #606266;
}

.templates-content {
  background: white;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
}
</style>