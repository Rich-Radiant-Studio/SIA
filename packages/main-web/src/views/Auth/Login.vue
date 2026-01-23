<template>
  <div class="login-container">
    <div class="language-toggle">
      <LanguageSwitcher />
    </div>

    <div class="login-card">
      <h1>{{ $t('login.title') }}</h1>
      
      <!-- 角色选择 -->
      <div class="role-grid">
        <div v-for="role in roleOptions" :key="role.value" 
             :class="['role-card', { active: loginForm.role === role.value }]"
             @click="loginForm.role = role.value">
          <div class="role-icon">
            <component :is="role.icon" />
          </div>
          <div class="role-name">{{ $t(`roles.${role.value}`) }}</div>
          <div class="role-desc">{{ $t(`roles.${role.value}Desc`) }}</div>
        </div>
      </div>

      <!-- 登录表单 -->
      <div class="login-form-wrapper">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" @keyup.enter="handleLogin">
          <div class="form-label">{{ $t('login.emailLabel') }}</div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :placeholder="$t('login.emailPlaceholder')" size="large" />
          </el-form-item>
          
          <div class="form-label">{{ $t('login.passwordLabel') }}</div>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" :placeholder="$t('login.passwordPlaceholder')" size="large" show-password />
          </el-form-item>
          
          <el-button type="primary" size="large" :loading="loading" class="login-btn" @click="handleLogin">
            {{ $t('login.submit') }}
          </el-button>
          
          <el-button size="large" class="register-btn" @click="$router.push('/register')">
            {{ $t('login.toRegister') }}
          </el-button>
          
          <div class="forgot-password">
            <el-link type="primary">{{ $t('login.forgotPassword') }}</el-link>
          </div>
        </el-form>
      </div>

      <!-- 第三方登录 -->
      <div class="social-login">
        <div class="divider">{{ $t('login.orLoginWith') }}</div>
        <el-button class="social-btn google-btn">
          <span>G</span> Google
        </el-button>
        <el-button class="social-btn facebook-btn">
          <span>f</span> Facebook
        </el-button>
        <div class="no-account">
          {{ $t('login.noAccount') }}
          <el-link type="primary" @click="$router.push('/register')">{{ $t('login.registerNow') }}</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { User, Brush, Shop, Setting, UserFilled } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useRoleStore } from '@/stores/role'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'

const router = useRouter()
const authStore = useAuthStore()
const roleStore = useRoleStore()
const { t } = useI18n()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

// 角色选项配置
const roleOptions = [
  { value: 'user', icon: User },
  { value: 'designer', icon: Brush },
  { value: 'supplier', icon: Shop },
  { value: 'contractor', icon: Setting },
  { value: 'guest', icon: UserFilled }
]

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  role: 'user' as 'designer' | 'supplier' | 'contractor' | 'user' | 'guest'
})

// 初始化角色状态
onMounted(() => {
  roleStore.initRole()
  loginForm.role = roleStore.selectedRole
})

// 监听角色变化，同步到表单
watch(() => roleStore.selectedRole, (newRole) => {
  loginForm.role = newRole
})

// 监听表单角色变化，同步到 store
watch(() => loginForm.role, (newRole) => {
  roleStore.setRole(newRole)
})

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: () => t('validation.usernameRequired'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => t('validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: () => t('validation.passwordLength'), trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    await authStore.login(loginForm)
    
    ElMessage.success(t('login.success'))
    
    // 根据角色跳转到对应的子系统
    const roleRouteMap = {
      designer: '/designer',
      supplier: '/supplier',
      contractor: '/contractor',
      user: '/user',
      guest: '/guest'
    }
    
    router.push(roleRouteMap[loginForm.role] || '/dashboard')
    
  } catch (error: any) {
    ElMessage.error(error.message || t('login.failed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.language-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 6px;
}

.login-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.login-card h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.role-card {
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.role-card:hover,
.role-card.active {
  border-color: #409eff;
  background: #f0f9ff;
}

.role-icon {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 8px;
}

.role-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.role-desc {
  font-size: 12px;
  color: #666;
}

.login-form-wrapper {
  border: 2px solid #409eff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.login-form-wrapper :deep(.el-form-item) {
  margin-bottom: 20px;
}

.login-btn,
.register-btn {
  width: 100%;
  height: 48px;
  margin-bottom: 12px;
}

.register-btn {
  background: white;
  border: 1px solid #409eff;
  color: #409eff;
}

.forgot-password {
  text-align: right;
}

.social-login {
  text-align: center;
}

.divider {
  color: #999;
  margin: 20px 0;
  font-size: 14px;
}

.social-btn {
  width: 100%;
  height: 48px;
  margin-bottom: 12px;
  background: white;
  border: 1px solid #ddd;
  color: #666;
}

.google-btn span {
  color: #4285f4;
  font-weight: bold;
  margin-right: 8px;
}

.facebook-btn span {
  color: #1877f2;
  font-weight: bold;
  margin-right: 8px;
}

.no-account {
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .role-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>