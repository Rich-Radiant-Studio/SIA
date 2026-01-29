<template>
  <div class="contractor-dashboard">
    <el-container>
      <el-header>
        <h1>{{ $t('dashboard.title') }}</h1>
      </el-header>
      <el-main>
        <el-card>
          <h2>{{ $t('dashboard.welcome') }}</h2>
          <p>这里是施工端的主要功能区域</p>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// 施工端主页面
</script>

<style scoped>
.contractor-dashboard {
  height: 100vh;
}

.el-header {
  background-color: #00699A;
  color: white;
  display: flex;
  align-items: center;
}

.el-main {
  padding: 20px;
}
</style>