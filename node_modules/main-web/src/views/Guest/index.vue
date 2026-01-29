<template>
  <div class="guest-dashboard">
    <div class="welcome-section">
      <h1>{{ $t('guest.welcome') }}</h1>
      <p>{{ $t('guest.description') }}</p>
    </div>
    
    <div class="guest-features">
      <div class="feature-card">
        <div class="feature-icon">
          <el-icon><View /></el-icon>
        </div>
        <div class="feature-content">
          <h3>{{ $t('guest.browseProducts') }}</h3>
          <p>{{ $t('guest.browseProductsDesc') }}</p>
          <el-button type="primary" @click="browseProducts">
            {{ $t('common.browse') }}
          </el-button>
        </div>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">
          <el-icon><InfoFilled /></el-icon>
        </div>
        <div class="feature-content">
          <h3>{{ $t('guest.aboutUs') }}</h3>
          <p>{{ $t('guest.aboutUsDesc') }}</p>
          <el-button type="info" @click="viewAbout">
            {{ $t('common.learn') }}
          </el-button>
        </div>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">
          <el-icon><User /></el-icon>
        </div>
        <div class="feature-content">
          <h3>{{ $t('guest.joinUs') }}</h3>
          <p>{{ $t('guest.joinUsDesc') }}</p>
          <el-button type="success" @click="$router.push('/register')">
            {{ $t('common.register') }}
          </el-button>
        </div>
      </div>
    </div>
    
    <div class="guest-notice">
      <el-alert
        :title="$t('guest.notice')"
        type="info"
        :description="$t('guest.noticeDesc')"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { View, InfoFilled, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const browseProducts = () => {
  ElMessage.info(t('guest.guestLimitMessage'))
}

const viewAbout = () => {
  ElMessage.info(t('guest.guestLimitMessage'))
}
</script>

<style scoped>
.guest-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.welcome-section h1 {
  margin-bottom: 15px;
  font-size: 32px;
}

.welcome-section p {
  font-size: 18px;
  opacity: 0.9;
}

.guest-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
}

.feature-content h3 {
  margin-bottom: 15px;
  color: #102129;
  font-size: 20px;
}

.feature-content p {
  margin-bottom: 20px;
  color: #606266;
  line-height: 1.6;
}

.guest-notice {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>