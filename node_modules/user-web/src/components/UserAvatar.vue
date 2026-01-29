<template>
  <div class="user-avatar-section d-flex align-items-center gap-3">
    <!-- 未登录状态 -->
    <template v-if="!isAuthenticated">
      <button class="btn btn-outline-orange btn-sm" @click="handleLogin">
        {{ $t('nav.login') }}
      </button>
      <button class="btn btn-orange btn-sm" @click="handleRegister">
        {{ $t('nav.register') }}
      </button>
    </template>

    <!-- 已登录状态（包括游客） -->
    <template v-else>
      <div class="dropdown">
        <button 
          class="btn btn-link p-0 d-flex align-items-center gap-2 text-decoration-none" 
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img 
            :src="userAvatar" 
            class="rounded-circle user-avatar" 
            width="36" 
            height="36" 
            :alt="username"
          >
          <span class="text-dark">{{ username }}</span>
          <i class="bi bi-chevron-down text-muted"></i>
        </button>
        
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <router-link to="/profile" class="dropdown-item">
              <i class="bi bi-person me-2"></i>{{ $t('nav.profile') }}
            </router-link>
          </li>
          <li>
            <router-link to="/profile/orders" class="dropdown-item">
              <i class="bi bi-box-seam me-2"></i>{{ $t('nav.orders') }}
            </router-link>
          </li>
          <li>
            <router-link to="/profile/favorites" class="dropdown-item">
              <i class="bi bi-heart me-2"></i>{{ $t('nav.favorites') }}
            </router-link>
          </li>
          <li v-if="isGuest">
            <hr class="dropdown-divider">
          </li>
          <li v-if="isGuest">
            <a href="javascript:void(0)" @click.prevent="handleUpgrade" class="dropdown-item text-primary">
              <i class="bi bi-person-plus me-2"></i>{{ $t('nav.upgradeAccount') }}
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <button class="dropdown-item text-danger" @click.stop="handleLogout">
              <i class="bi bi-box-arrow-right me-2"></i>{{ $t('nav.logout') }}
            </button>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { I18nPlugin } from '@/plugins/i18n'
import { navigation } from '@/utils/navigation'

const router = useRouter()
const i18n = inject<I18nPlugin>('i18n')

// 从父应用获取用户信息
const parentUserInfo = ref<any>(null)
const isAuthenticated = ref(false)
const isGuest = ref(false)

// 默认头像
const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'

// 用户名
const username = computed(() => {
  if (parentUserInfo.value) {
    return parentUserInfo.value.username || i18n?.t('nav.guest') || 'Guest'
  }
  return i18n?.t('nav.guest') || 'Guest'
})

// 用户头像
const userAvatar = computed(() => {
  if (parentUserInfo.value?.avatar) {
    return parentUserInfo.value.avatar
  }
  return defaultAvatar
})

// 翻译函数
const $t = (key: string) => {
  return i18n?.t(key) || key
}

// 初始化用户信息
const initUserInfo = () => {
  // 从 window 对象获取父应用传递的用户信息
  if ((window as any).__PARENT_APP__) {
    parentUserInfo.value = (window as any).__PARENT_APP__.userInfo
    isAuthenticated.value = !!(window as any).__PARENT_APP__.token
    isGuest.value = parentUserInfo.value?.isGuest || false
  } else {
    // 从 localStorage 获取
    const token = localStorage.getItem('token')
    const userInfoStr = localStorage.getItem('userInfo')
    
    if (token && userInfoStr) {
      try {
        parentUserInfo.value = JSON.parse(userInfoStr)
        isAuthenticated.value = true
        isGuest.value = parentUserInfo.value?.isGuest || false
      } catch (e) {
        console.error('Failed to parse user info:', e)
      }
    }
  }
}

// 处理登录 - 通过消息通信跳转到主应用
const handleLogin = () => {
  console.log('Redirecting to login page...')
  navigation.toLogin()
}

// 处理注册 - 通过消息通信跳转到主应用
const handleRegister = () => {
  console.log('Redirecting to register page...')
  navigation.toRegister()
}

// 处理升级账号 - 通过消息通信跳转到主应用注册页
const handleUpgrade = () => {
  console.log('Upgrading to full account...')
  navigation.toRegister()
}

// 处理登出
const handleLogout = () => {
  console.log('Logout clicked')
  if (confirm($t('common.logoutConfirm'))) {
    navigation.logout(false)
  }
}

// 监听父应用的用户信息变化
onMounted(() => {
  initUserInfo()
  
  // 监听用户信息变化事件
  window.addEventListener('storage', (e) => {
    if (e.key === 'userInfo' || e.key === 'token') {
      initUserInfo()
    }
  })
  
  // 监听来自父应用的消息
  window.addEventListener('message', (event) => {
    if (event.data.type === 'LOGIN_STATUS_CHANGE') {
      initUserInfo()
    }
  })
})
</script>

<style scoped>
.user-avatar {
  border: 2px solid #f97316;
  object-fit: cover;
}

.btn-orange {
  background-color: #f97316;
  border-color: #f97316;
  color: white;
}

.btn-orange:hover {
  background-color: #ea580c;
  border-color: #ea580c;
}

.btn-outline-orange {
  border-color: #f97316;
  color: #f97316;
}

.btn-outline-orange:hover {
  background-color: #fff7ed;
  border-color: #f97316;
  color: #f97316;
}

.dropdown-menu {
  min-width: 200px;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #fff7ed;
}

.dropdown-item i {
  width: 20px;
}
</style>
