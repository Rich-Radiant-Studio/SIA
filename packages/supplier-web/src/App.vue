<template>
  <div id="app">
    <div class="supplier-app">
      <h1>B端供应商系统</h1>
      <p>欢迎使用供应商管理平台</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Supplier Web 系统已启动')
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.supplier-app {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.supplier-app h1 {
  color: #f093fb;
  margin-bottom: 16px;
}

.supplier-app p {
  color: #666;
}
</style>