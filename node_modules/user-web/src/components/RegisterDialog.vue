<template>
  <div v-if="visible" class="register-modal" @click.self="hide">
    <div class="register-dialog">
      <div class="register-header">
        <h1>{{ $t('register.createAccount') }}</h1>
        <button class="close-btn" @click="hide">×</button>
      </div>
      
      <p class="register-subtitle">{{ $t('register.joinPlatform') }}</p>
      
      <!-- 角色选择 -->
      <div class="role-grid">
        <div 
          v-for="role in roleOptions" 
          :key="role.value" 
          :class="['role-card', { active: registerForm.role === role.value }]"
          @click="registerForm.role = role.value"
        >
          <div class="role-icon">{{ role.icon }}</div>
          <div class="role-name">{{ $t(`roles.${role.value}`) }}</div>
          <div class="role-desc">{{ $t(`roles.${role.value}Desc`) }}</div>
        </div>
      </div>

      <!-- 注册表单 -->
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-row">
          <div class="form-item-half">
            <input 
              v-model="registerForm.email" 
              type="email"
              :placeholder="'*' + $t('register.email')" 
              class="form-control"
              required
            />
          </div>
          
          <div class="form-item-half">
            <input 
              v-model="registerForm.password" 
              type="password" 
              :placeholder="'*' + $t('register.password')" 
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-item-half">
            <div class="code-wrapper">
              <input 
                v-model="registerForm.emailCode" 
                type="text"
                :placeholder="'*' + $t('register.emailCode')" 
                class="form-control"
                required
              />
              <button 
                type="button"
                class="code-link" 
                :disabled="emailCodeDisabled" 
                @click="sendEmailCode"
              >
                {{ emailCodeText }}
              </button>
            </div>
          </div>

          <div class="form-item-half">
            <input 
              v-model="registerForm.confirmPassword" 
              type="password" 
              :placeholder="'*' + $t('register.confirmPassword')" 
              class="form-control"
              required
            />
          </div>
        </div>

        <div class="form-item">
          <input 
            v-model="registerForm.phone" 
            type="tel"
            :placeholder="$t('register.phone')" 
            class="form-control"
          />
        </div>

        <!-- 设计师专属表单 -->
        <div v-if="registerForm.role === 'designer'" class="designer-specific-section">
          <div class="section-title">{{ $t('register.designerNature') }}</div>
          
          <div class="form-item">
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="registerForm.designerType" value="individual" />
                <span>{{ $t('register.individual') }}</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="registerForm.designerType" value="studio" />
                <span>{{ $t('register.studio') }}</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="registerForm.designerType" value="company" />
                <span>{{ $t('register.company') }}</span>
              </label>
            </div>
          </div>

          <div class="form-item">
            <input 
              v-model="registerForm.designerName" 
              type="text"
              :placeholder="'*' + $t('register.designerName')" 
              class="form-control"
              required
            />
          </div>

          <div class="section-title">{{ $t('register.specializedRoomTypes') }}</div>
          <div class="section-subtitle">{{ $t('register.specializedRoomTypesDesc') }}</div>
          
          <div class="form-item">
            <div class="checkbox-grid">
              <label class="checkbox-label">
                <input type="checkbox" value="living" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.livingRoom') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="bedroom" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.bedroom') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="kitchen" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.kitchen') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="bathroom" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.bathroom') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="dining" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.diningRoom') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="study" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.study') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="balcony" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.balcony') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="entrance" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.entrance') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="kids" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.kidsRoom') }}</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="storage" v-model="registerForm.roomTypes" />
                <span>{{ $t('register.storage') }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="agreement-item">
          <label class="d-flex align-items-start">
            <input type="checkbox" v-model="registerForm.agreement" required class="me-2 mt-1">
            <span class="small">
              {{ $t('register.agreePrefix') }}
              <a href="#" class="text-primary" @click.prevent="showTerms">{{ $t('register.serviceTerms') }}</a>
              {{ $t('common.and') }}
              <a href="#" class="text-primary" @click.prevent="showPrivacy">{{ $t('register.privacyPolicy') }}</a>
            </span>
          </label>
        </div>

        <div class="login-link">
          {{ $t('register.hasAccount') }}
          <a href="#" class="text-primary" @click.prevent="goToLogin">{{ $t('register.toLogin') }}</a>
        </div>

        <div class="register-footer">
          <button type="button" class="btn cancel-btn" @click="hide">
            {{ $t('common.cancel') }}
          </button>
          <button type="submit" class="btn register-btn" :disabled="loading">
            {{ loading ? $t('common.loading') : $t('register.createAccount') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')

const visible = ref(false)
const loading = ref(false)
const emailCodeDisabled = ref(false)
const countdown = ref(0)

// 角色选项
const roleOptions = [
  { value: 'user', icon: '👤' },
  { value: 'designer', icon: '🎨' },
  { value: 'supplier', icon: '📦' }
]

// 注册表单
const registerForm = ref({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
  phone: '',
  agreement: false,
  role: 'user',
  // 设计师专属字段
  designerType: 'individual',
  designerName: '',
  roomTypes: [] as string[]
})

// 翻译函数
const $t = (key: string) => {
  return i18n?.t(key) || key
}

// 邮箱验证码按钮文本
const emailCodeText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return $t('register.sendCode')
})

// 显示弹窗
const show = () => {
  visible.value = true
  // 重置表单
  registerForm.value = {
    email: '',
    password: '',
    confirmPassword: '',
    emailCode: '',
    phone: '',
    agreement: false,
    role: 'user',
    designerType: 'individual',
    designerName: '',
    roomTypes: []
  }
}

// 隐藏弹窗
const hide = () => {
  visible.value = false
}

// 发送邮箱验证码
const sendEmailCode = () => {
  if (!registerForm.value.email) {
    alert($t('validation.emailRequired'))
    return
  }
  
  // 模拟发送验证码
  alert($t('register.codeSent'))
  
  // 开始倒计时
  emailCodeDisabled.value = true
  countdown.value = 60
  
  const timer = setInterval(() => {
    countdown.value--
    
    if (countdown.value <= 0) {
      clearInterval(timer)
      emailCodeDisabled.value = false
    }
  }, 1000)
}

// 显示服务条款
const showTerms = () => {
  alert($t('register.termsContent'))
}

// 显示隐私政策
const showPrivacy = () => {
  alert($t('register.privacyContent'))
}

// 跳转到登录页
const goToLogin = () => {
  hide()
  window.location.href = '/login'
}

// 处理注册
const handleRegister = async () => {
  // 验证密码
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert($t('validation.passwordNotMatch'))
    return
  }
  
  if (!registerForm.value.agreement) {
    alert($t('validation.agreementRequired'))
    return
  }
  
  loading.value = true
  
  try {
    // 模拟注册API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert($t('register.success'))
    hide()
    
    // 跳转到登录页
    window.location.href = '/login'
  } catch (error: any) {
    alert(error.message || $t('register.failed'))
  } finally {
    loading.value = false
  }
}

defineExpose({
  show,
  hide
})
</script>

<style scoped>
.register-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.register-dialog {
  background: white;
  border-radius: 8px;
  padding: 40px 50px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.register-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #102129;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #102129;
}

.register-subtitle {
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.role-card {
  padding: 24px 20px;
  border: 1px solid #E5E6EB;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #fafafa;
}

.role-card:hover {
  border-color: #00699A;
  background: #f0f8fb;
  transform: translateY(-2px);
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

.role-icon {
  font-size: 36px;
  margin-bottom: 12px;
  color: #00699A;
}

.role-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #102129;
  margin-bottom: 6px;
}

.role-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.register-form {
  margin-top: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-item-half {
  flex: 1;
}

.form-item {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #f97316;
}

.code-wrapper {
  position: relative;
}

.code-link {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #f97316;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.code-link:hover {
  color: #ea580c;
}

.code-link:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.agreement-item {
  margin-top: 10px;
  margin-bottom: 15px;
}

.login-link {
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
}

.register-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.btn {
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.cancel-btn {
  background: white;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.cancel-btn:hover {
  background: #f5f7fa;
}

.register-btn {
  background: #333333;
  color: white;
  min-width: 150px;
}

.register-btn:hover {
  background: #34495e;
}

.register-btn:disabled {
  background: #c0c4cc;
  cursor: not-allowed;
}

.designer-specific-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #102129;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
}

.radio-label input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .register-dialog {
    padding: 30px 20px;
  }
  
  .role-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
  
  .checkbox-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .radio-group {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
