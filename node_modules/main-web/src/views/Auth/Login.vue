<template>
  <div class="login-container">
    <div class="language-toggle">
      <LanguageSwitcher />
    </div>

    <div class="login-card">
      <div class="login-header">
        <h1>{{ $t('login.title') }}</h1>
      </div>
      
      <!-- 角色选择 -->
      <div class="role-grid">
        <div v-for="role in roleOptions" :key="role.value" 
             :class="['role-card', { active: loginForm.role === role.value }]"
             @click="loginForm.role = role.value">
          <div class="role-icon-wrapper">
            <component :is="role.icon" class="role-icon-svg" />
          </div>
          <div class="role-name">{{ $t(`roles.${role.value}`) }}</div>
          <div class="role-desc">{{ $t(`roles.${role.value}Desc`) }}</div>
        </div>
      </div>

      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" @keyup.enter="handleLogin">
        <el-form-item prop="username" class="required-field floating-label-item">
          <div class="floating-label-wrapper">
            <el-input 
              v-model="loginForm.username" 
              placeholder=" "
              size="large"
            />
            <label class="floating-label">{{ $t('login.emailLabel') }}</label>
          </div>
        </el-form-item>
        
        <el-form-item prop="password" class="required-field floating-label-item">
          <div class="floating-label-wrapper">
            <el-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder=" "
              size="large" 
              show-password 
            />
            <label class="floating-label">{{ $t('login.passwordLabel') }}</label>
          </div>
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
        
        <!-- 第三方登录 -->
        <div class="social-login">
          <div class="divider">{{ $t('login.orLoginWith') }}</div>
          <el-button class="social-btn google-btn">
            <img src="/google.png" alt="Google" class="social-logo" />
          </el-button>
          <el-button class="social-btn facebook-btn">
            <img src="/facebook.png" alt="Facebook" class="social-logo" />
          </el-button>
        </div>
        
        <div class="no-account">
          {{ $t('login.noAccount') }}
          <el-link type="primary" @click="$router.push('/register')">{{ $t('login.registerNow') }}</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { User, Brush, Shop, UserFilled } from '@element-plus/icons-vue'
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

// 角色选项配置（登录时不包含guest）
const roleOptions = [
  { value: 'user', icon: User },
  { value: 'designer', icon: Brush },
  { value: 'supplier', icon: Shop }
]

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  role: 'user' as 'designer' | 'supplier' | 'user'
})

// 初始化角色状态
onMounted(() => {
  roleStore.initRole()
  // 如果从 store 获取的角色是 guest，则设置为 user（登录页不支持 guest）
  const storeRole = roleStore.selectedRole
  if (storeRole === 'guest') {
    loginForm.role = 'user'
    roleStore.setRole('user')
  } else {
    loginForm.role = storeRole as 'designer' | 'supplier' | 'user'
  }
})

// 监听角色变化，同步到表单
watch(() => roleStore.selectedRole, (newRole) => {
  if (newRole === 'guest') {
    loginForm.role = 'user'
  } else {
    loginForm.role = newRole as 'designer' | 'supplier' | 'user'
  }
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

// 处理游客访问
const handleGuestAccess = async () => {
  try {
    loading.value = true
    
    // 创建游客账号并自动登录
    await authStore.createGuestAccount()
    
    ElMessage.success(t('login.guestAccessSuccess'))
    
    // 跳转到用户端
    router.push('/user')
    
  } catch (error: any) {
    ElMessage.error(error.message || t('login.guestAccessFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* {
  letter-spacing: 0;
}

.login-container {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  position: relative;
  letter-spacing: 0;
}

.language-toggle {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
}

.login-card {
  max-width: 60rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  position: relative;
}

.login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.login-header h1 {
  font-family: Inter, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: 0;
  color: #1D2129;
  margin: 0;
  text-align: center;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.role-card {
  padding: 1rem;
  border: 1px solid #E5E6EB;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  background: white;
  min-height: 7.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-card:hover {
  border-color: #00699A;
  background: #f0f8fb;
}

.role-card.active {
  border-color: #00699A;
  background: #e6f4f9;
}

.role-card.active .role-name {
  color: #00699A;
}

.role-card.active .role-desc {
  color: #00699A;
}

.role-icon-wrapper {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.role-icon-svg {
  width: 100%;
  height: 100%;
  color: #00699A;
}

.role-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #102129;
  margin-bottom: 8px;
  line-height: 18px;
}

.role-desc {
  font-size: 13px;
  color: #909399;
  line-height: 18px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 4px;
  box-shadow: 0 0 0 1px #E5E6EB inset;
  padding: 1px 15px;
  background-color: white;
}

.login-form :deep(.el-input__inner) {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  color: #1D2129;
  height: 38px;
}

.login-form :deep(.el-input__inner::placeholder) {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  color: #5C5C5C;
}

/* 浮动标签容器 */
.floating-label-wrapper {
  position: relative;
  width: 100%;
}

/* 浮动标签样式 */
.floating-label {
  position: absolute;
  left: 0.9375rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  color: #5C5C5C;
  padding: 0 0.25rem;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 2;
  background: transparent;
}

/* 使用伪元素遮盖边框 - 默认隐藏 */
.floating-label::after {
  content: '';
  position: absolute;
  left: -0.125rem;
  right: -0.125rem;
  top: 50%;
  height: 0.125rem;
  background: white;
  transform: translateY(-50%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* 当输入框有内容或获得焦点时，标签上移并缩小 */
.floating-label-wrapper:has(.el-input__inner:not(:placeholder-shown)) .floating-label,
.floating-label-wrapper:has(.el-input__inner:focus) .floating-label,
.floating-label-wrapper:focus-within .floating-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.75rem;
  line-height: 1rem;
  color: #5C5C5C;
}

/* 浮动状态下显示伪元素遮盖边框 */
.floating-label-wrapper:has(.el-input__inner:not(:placeholder-shown)) .floating-label::after,
.floating-label-wrapper:has(.el-input__inner:focus) .floating-label::after,
.floating-label-wrapper:focus-within .floating-label::after {
  opacity: 1;
}

/* 必填字段的浮动标签 - 星号在文字前面 */
.floating-label-item.required-field .floating-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 0.125rem;
}

/* 确保输入框包装器的z-index较低 */
.floating-label-wrapper :deep(.el-input__wrapper) {
  position: relative;
  z-index: 1;
}

/* 隐藏 Element Plus 默认的灰色星号 */
.login-form :deep(.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before) {
  display: none;
}

.login-form :deep(.el-form-item.is-required .el-form-item__label::before) {
  display: none;
}

/* 错误提示文字样式 - 使用绝对定位避免影响布局 */
.login-form :deep(.el-form-item__error) {
  font-family: Inter, sans-serif;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #f56c6c;
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 0.25rem;
  margin: 0;
}

/* 确保表单项有相对定位，作为错误提示的定位参考 */
.login-form :deep(.el-form-item) {
  position: relative;
  margin-bottom: 1.5rem;
}

/* 确保浮动标签的表单项错误提示正确显示 */
.floating-label-item :deep(.el-form-item__error) {
  z-index: 10;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #E5E6EB inset;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #E5E6EB inset;
}

/* 错误状态：红色边框 */
.login-form :deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}

/* 抖动动画 */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
}

.login-form :deep(.el-form-item.is-error .el-input__wrapper) {
  animation: shake 0.5s;
}

.forgot-password {
  text-align: center;
  margin-bottom: 1.5rem;
}

.forgot-password :deep(.el-link) {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  color: #00699A;
}

.forgot-password :deep(.el-link:hover) {
  color: #008bb8;
}

.login-btn,
.register-btn {
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.75rem;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin-left: 0;
  margin-right: 0;
}

.login-btn {
  background: #333333;
  border-color: #333333;
  color: white;
}

.login-btn:hover {
  background: #4d4d4d;
  border-color: #4d4d4d;
}

.register-btn {
  background: #E5E5E5;
  border: 1px solid #E5E6EB;
  color: #102129;
}

.register-btn:hover {
  color: #00699A;
  border-color: #b3dce8;
  background: #e6f4f9;
}

.social-login {
  margin-top: 1.5rem;
}

.divider {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  color: #7D7D7D;
  margin: 1.25rem 0;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E6EB;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

.social-btn {
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.75rem;
  margin-left: 0;
  margin-right: 0;
  background: white;
  border: 1px solid #E5E6EB;
  color: #102129;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.social-btn:hover {
  border-color: #b3dce8;
  background: #f0f8fb;
}

.social-logo {
  object-fit: contain;
}

.google-btn .social-logo {
  width: 61.95px;
  height: 24px;
}

.facebook-btn .social-logo {
  width: 86.63px;
  height: 24px;
}

.no-account {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  color: #102129;
  margin-top: 1.25rem;
  text-align: center;
}

.no-account :deep(.el-link) {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0;
  vertical-align: baseline;
  color: #00699A;
}

.no-account :deep(.el-link:hover) {
  color: #008bb8;
}

@media (max-width: 768px) {
  .login-card {
    padding: 32px 24px;
  }

  .role-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .role-name {
    line-height: 18px;
  }
  
  .role-desc {
    line-height: 18px;
  }
}
</style>