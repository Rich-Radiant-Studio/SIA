<template>
  <teleport to="body">
    <div v-if="visible" class="auth-modal-overlay" @click.self="handleClose">
      <div class="auth-modal-container">
        <!-- 登录模态框 -->
        <div v-if="mode === 'login'" class="auth-modal">
          <button class="close-btn" @click="handleClose">×</button>
          <h2>Sign In</h2>
          
          <!-- 角色选择 -->
          <div class="role-grid">
            <div v-for="role in roleOptions" :key="role.value" 
                 :class="['role-card', { active: loginForm.role === role.value }]"
                 @click="loginForm.role = role.value">
              <div class="role-icon">{{ role.icon }}</div>
              <div class="role-name">{{ role.name }}</div>
            </div>
          </div>

          <!-- 登录表单 -->
          <div class="form-wrapper">
            <div class="form-group">
              <label>Email</label>
              <input v-model="loginForm.username" type="email" placeholder="Enter your email" />
            </div>
            
            <div class="form-group">
              <label>Password</label>
              <input v-model="loginForm.password" type="password" placeholder="Enter password" />
            </div>
            
            <button class="btn-primary" @click="handleLogin">Sign In</button>
            <button class="btn-secondary" @click="switchToRegister">Create Account</button>
            
            <div class="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <!-- 第三方登录 -->
          <div class="social-login">
            <div class="divider">Or sign in with</div>
            <button class="social-btn google-btn">
              <span>G</span> Google
            </button>
            <button class="social-btn facebook-btn">
              <span>f</span> Facebook
            </button>
            <div class="no-account">
              Don't have an account? 
              <a href="#" @click.prevent="switchToRegister">Register now</a>
            </div>
          </div>
        </div>

        <!-- 注册模态框 -->
        <div v-else class="auth-modal register-modal">
          <button class="close-btn" @click="handleClose">×</button>
          <h2>Create your account</h2>
          <p class="subtitle">Join our platform as a Customer, Designer or Supplier</p>
          
          <!-- 角色选择 -->
          <div class="role-selection">
            <div 
              v-for="role in registerRoleOptions" 
              :key="role.value"
              class="role-card"
              :class="{ active: registerForm.role === role.value }"
              @click="registerForm.role = role.value"
            >
              <div class="role-icon">{{ role.icon }}</div>
              <h3>{{ role.name }}</h3>
              <p>{{ role.desc }}</p>
            </div>
          </div>

          <!-- 可滚动表单区域 -->
          <div class="modal-body" :class="{ 'scrollable': needsScroll }">
            <!-- 基础信息 -->
            <div class="form-row">
              <div class="form-group">
                <label>*Email</label>
                <input v-model="registerForm.email" type="email" placeholder="Enter your email" />
              </div>
              
              <div class="form-group">
                <label>*Password</label>
                <input v-model="registerForm.password" type="password" placeholder="Enter password" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>*Email verification code</label>
                <div class="code-wrapper">
                  <input v-model="registerForm.emailCode" placeholder="Enter code" />
                  <button class="link-btn" :disabled="emailCodeDisabled" @click="sendEmailCode">
                    {{ emailCodeText }}
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label>*Confirm password</label>
                <input v-model="registerForm.confirmPassword" type="password" placeholder="Confirm password" />
              </div>
            </div>

            <div class="form-group">
              <label>Phone number</label>
              <input v-model="registerForm.phone" placeholder="Enter phone number" />
            </div>

            <!-- 设计师专属表单 -->
            <div v-if="registerForm.role === 'designer'" class="role-specific-section">
              <div class="section-title">Designer Nature</div>
              <div class="radio-group">
                <label><input type="radio" v-model="registerForm.designerType" value="individual" /> Individual</label>
                <label><input type="radio" v-model="registerForm.designerType" value="studio" /> Studio</label>
                <label><input type="radio" v-model="registerForm.designerType" value="company" /> Company</label>
              </div>

              <div class="form-group">
                <label>*Designer / Company Name</label>
                <input v-model="registerForm.designerName" placeholder="Enter name" />
              </div>

              <div class="section-title">Specialized Room Types</div>
              <p class="section-desc">Select the room types you specialize in (multiple selections allowed)</p>
              <div class="checkbox-grid">
                <label><input type="checkbox" value="living" v-model="registerForm.roomTypes" /> Living Room</label>
                <label><input type="checkbox" value="bedroom" v-model="registerForm.roomTypes" /> Bedroom</label>
                <label><input type="checkbox" value="kitchen" v-model="registerForm.roomTypes" /> Kitchen</label>
                <label><input type="checkbox" value="bathroom" v-model="registerForm.roomTypes" /> Bathroom</label>
                <label><input type="checkbox" value="dining" v-model="registerForm.roomTypes" /> Dining Room</label>
                <label><input type="checkbox" value="study" v-model="registerForm.roomTypes" /> Study</label>
                <label><input type="checkbox" value="balcony" v-model="registerForm.roomTypes" /> Balcony</label>
                <label><input type="checkbox" value="entrance" v-model="registerForm.roomTypes" /> Entrance</label>
                <label><input type="checkbox" value="kids" v-model="registerForm.roomTypes" /> Kids Room</label>
                <label><input type="checkbox" value="storage" v-model="registerForm.roomTypes" /> Storage</label>
              </div>
            </div>

            <!-- 供应商专属表单 -->
            <div v-if="registerForm.role === 'supplier'" class="role-specific-section supplier-section">
              <div class="section-title">Company Information</div>
              <div class="form-row">
                <div class="form-group">
                  <label>*Company Name</label>
                  <input v-model="registerForm.companyName" placeholder="Enter company name" />
                </div>
                
                <div class="form-group">
                  <label>*Contact Person</label>
                  <input v-model="registerForm.contactPerson" placeholder="Enter contact person" />
                </div>
              </div>

              <div class="form-group">
                <label>*Contact Phone</label>
                <input v-model="registerForm.contactPhone" placeholder="Enter contact phone" />
              </div>

              <div class="section-title">Company Address</div>
              <div class="form-row">
                <div class="form-group">
                  <label>*Street Address</label>
                  <input v-model="registerForm.street" placeholder="Enter street address" />
                </div>
                
                <div class="form-group">
                  <label>Apartment, Suite, Floor, etc</label>
                  <input v-model="registerForm.apartment" placeholder="Optional" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>*City</label>
                  <input v-model="registerForm.city" placeholder="Enter city" />
                </div>
                
                <div class="form-group">
                  <label>*State / Province</label>
                  <input v-model="registerForm.state" placeholder="Enter state" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>*Postal Code</label>
                  <input v-model="registerForm.zipCode" placeholder="Enter postal code" />
                </div>
                
                <div class="form-group">
                  <label>*Country</label>
                  <input v-model="registerForm.country" placeholder="Enter country" />
                </div>
              </div>

              <div class="section-title">Building Materials Category</div>
              <div class="checkbox-grid">
                <label><input type="checkbox" value="tiles" v-model="registerForm.businessCategories" /> Tiles</label>
                <label><input type="checkbox" value="flooring" v-model="registerForm.businessCategories" /> Flooring</label>
                <label><input type="checkbox" value="bathroom" v-model="registerForm.businessCategories" /> Bathroom</label>
                <label><input type="checkbox" value="cabinets" v-model="registerForm.businessCategories" /> Cabinets</label>
                <label><input type="checkbox" value="doors" v-model="registerForm.businessCategories" /> Doors & Windows</label>
                <label><input type="checkbox" value="paint" v-model="registerForm.businessCategories" /> Paint</label>
                <label><input type="checkbox" value="lighting" v-model="registerForm.businessCategories" /> Lighting</label>
                <label><input type="checkbox" value="hardware" v-model="registerForm.businessCategories" /> Hardware</label>
                <label><input type="checkbox" value="others" v-model="registerForm.businessCategories" /> Others</label>
              </div>
            </div>
          </div>

          <!-- 固定底部 -->
          <div class="modal-footer">
            <div class="agreement-item">
              <label>
                <input type="checkbox" v-model="registerForm.agreement" />
                I agree to the 
                <a href="#" @click.prevent="showTerms">Terms of Service</a>
                and 
                <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
              </label>
            </div>

            <div class="footer-actions">
              <div class="login-link">
                Already have an account? 
                <a href="#" @click.prevent="switchToLogin">Sign in</a>
              </div>
              <div class="action-buttons">
                <button class="btn-secondary" @click="handleClose">Cancel</button>
                <button class="btn-primary" @click="handleRegister">Create account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  initialMode?: 'login' | 'register'
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'login', data: any): void
  (e: 'register', data: any): void
}>()

const mode = ref<'login' | 'register'>(props.initialMode || 'login')
const emailCodeDisabled = ref(false)
const countdown = ref(0)

// 登录角色选项
const roleOptions = [
  { value: 'user', icon: '👤', name: 'Customer' },
  { value: 'designer', icon: '🎨', name: 'Designer' },
  { value: 'supplier', icon: '🏪', name: 'Supplier' },
  { value: 'contractor', icon: '🔧', name: 'Contractor' },
  { value: 'guest', icon: '👥', name: 'Guest' }
]

// 注册角色选项
const registerRoleOptions = [
  { value: 'user', icon: '👤', name: 'Customer', desc: 'Browse products and order' },
  { value: 'designer', icon: '🎨', name: 'Designer', desc: 'Upload and sell your designs' },
  { value: 'supplier', icon: '🏪', name: 'Supplier', desc: 'Offer products on our marketplace' }
]

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  role: 'user' as string
})

// 注册表单
const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
  phone: '',
  agreement: false,
  role: 'user' as string,
  // 设计师字段
  designerType: 'individual',
  designerName: '',
  roomTypes: [] as string[],
  // 供应商字段
  companyName: '',
  contactPerson: '',
  contactPhone: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  businessCategories: [] as string[]
})

// 判断是否需要滚动
const needsScroll = computed(() => {
  return registerForm.role === 'supplier'
})

// 邮箱验证码按钮文本
const emailCodeText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return 'Send verification code'
})

// 切换到注册
const switchToRegister = () => {
  mode.value = 'register'
}

// 切换到登录
const switchToLogin = () => {
  mode.value = 'login'
}

// 关闭模态框
const handleClose = () => {
  emit('update:visible', false)
}

// 处理登录
const handleLogin = () => {
  emit('login', loginForm)
  handleClose()
}

// 处理注册
const handleRegister = () => {
  if (!registerForm.agreement) {
    alert('Please agree to the terms')
    return
  }
  emit('register', registerForm)
  handleClose()
}

// 发送邮箱验证码
const sendEmailCode = () => {
  if (!registerForm.email) {
    alert('Please enter email first')
    return
  }
  
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
  alert('Terms of Service')
}

// 显示隐私政策
const showPrivacy = () => {
  alert('Privacy Policy')
}

// 监听 visible 变化，重置模式
watch(() => props.visible, (newVal) => {
  if (newVal) {
    mode.value = props.initialMode || 'login'
  }
})
</script>

<style scoped>
.auth-modal-overlay {
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

.auth-modal-container {
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  justify-content: center;
}

.auth-modal {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 40px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.register-modal {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.close-btn:hover {
  color: #333;
}

.auth-modal h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
}

.subtitle {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 0 0 24px 0;
}

/* 角色选择 */
.role-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.role-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.role-card {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.role-card:hover {
  border-color: #91d5ff;
  background: #f0f9ff;
}

.role-card.active {
  border-color: #1890ff;
  background: #e6f7ff;
}

.role-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.role-card h3,
.role-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.role-card p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* 表单样式 */
.form-wrapper {
  border: 2px solid #1890ff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.modal-body {
  padding: 24px 0;
  flex: 1;
  min-height: 0;
}

.modal-body.scrollable {
  overflow-y: auto;
  max-height: calc(90vh - 400px);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #1890ff;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.code-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-wrapper input {
  flex: 1;
}

.link-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 8px;
}

.link-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

/* 按钮 */
.btn-primary,
.btn-secondary {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 12px;
}

.btn-primary {
  background: #1890ff;
  color: white;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: white;
  border: 1px solid #d9d9d9;
  color: #333;
}

.btn-secondary:hover {
  border-color: #1890ff;
  color: #1890ff;
}

/* 角色专属表单 */
.role-specific-section {
  margin-top: 24px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.supplier-section {
  background: #f0f9ff;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.section-desc {
  font-size: 13px;
  color: #666;
  margin: -8px 0 12px 0;
}

.radio-group {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px 8px;
}

.checkbox-grid label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

/* 固定底部 */
.modal-footer {
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.agreement-item {
  margin-bottom: 16px;
  font-size: 14px;
}

.agreement-item label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.agreement-item a {
  color: #1890ff;
  text-decoration: none;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-link {
  color: #666;
  font-size: 14px;
}

.login-link a {
  color: #1890ff;
  text-decoration: none;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-buttons button {
  width: auto;
  padding: 8px 24px;
  margin: 0;
}

/* 社交登录 */
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
  padding: 12px;
  margin-bottom: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
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

.no-account,
.forgot-password {
  margin-top: 16px;
  color: #666;
  font-size: 14px;
  text-align: center;
}

.forgot-password {
  text-align: right;
}

.no-account a,
.forgot-password a {
  color: #1890ff;
  text-decoration: none;
}

/* 响应式 */
@media (max-width: 768px) {
  .role-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .role-selection {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .action-buttons {
    width: 100%;
  }
  
  .action-buttons button {
    flex: 1;
  }
}
</style>
