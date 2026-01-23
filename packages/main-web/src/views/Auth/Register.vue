<template>
  <div class="register-container">
    <div class="language-toggle">
      <LanguageSwitcher />
    </div>

    <div class="register-card">
      <div class="register-header">
        <h1>{{ $t('register.createAccount') }}</h1>
        <p>{{ $t('register.joinPlatform') }}</p>
      </div>
      
      <!-- 角色选择 -->
      <div class="role-grid">
        <div v-for="role in roleOptions" :key="role.value" 
             :class="['role-card', { active: registerForm.role === role.value }]"
             @click="registerForm.role = role.value">
          <div class="role-icon">
            <component :is="role.icon" />
          </div>
          <div class="role-name">{{ $t(`roles.${role.value}`) }}</div>
          <div class="role-desc">{{ $t(`roles.${role.value}Desc`) }}</div>
        </div>
      </div>

      <!-- 注册表单 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-position="top">
        <!-- 基础信息 - 所有角色都有 -->
        <el-form-item :label="$t('register.email')" prop="email">
          <el-input v-model="registerForm.email" :placeholder="$t('register.emailPlaceholder')" size="large" />
        </el-form-item>
        
        <el-form-item :label="$t('register.password')" prop="password">
          <el-input v-model="registerForm.password" type="password" :placeholder="$t('register.passwordPlaceholder')" size="large" show-password />
        </el-form-item>
        
        <el-form-item :label="$t('register.confirmPassword')" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" :placeholder="$t('register.confirmPasswordPlaceholder')" size="large" show-password />
        </el-form-item>

        <el-form-item :label="$t('register.emailCode')" prop="emailCode">
          <div class="code-wrapper">
            <el-input v-model="registerForm.emailCode" :placeholder="$t('register.emailCodePlaceholder')" size="large" class="code-input" />
            <el-button type="primary" :disabled="emailCodeDisabled" @click="sendEmailCode" class="code-btn">
              {{ emailCodeText }}
            </el-button>
          </div>
        </el-form-item>

        <el-form-item :label="$t('register.phone')" prop="phone">
          <el-input v-model="registerForm.phone" :placeholder="$t('register.phonePlaceholder')" size="large" />
        </el-form-item>

        <!-- 设计师专属表单 -->
        <div v-if="registerForm.role === 'designer'" class="role-specific-form designer-form">
          <div class="form-section-title">{{ $t('register.designerInfo') }}</div>
          
          <el-form-item :label="$t('register.designerType')" prop="designerType">
            <el-radio-group v-model="registerForm.designerType">
              <el-radio label="individual">{{ $t('register.individual') }}</el-radio>
              <el-radio label="studio">{{ $t('register.studio') }}</el-radio>
              <el-radio label="company">{{ $t('register.company') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('register.designerName')" prop="designerName">
            <el-input v-model="registerForm.designerName" :placeholder="$t('register.designerNamePlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.roomTypes')" prop="roomTypes">
            <div class="room-types-grid">
              <el-checkbox-group v-model="registerForm.roomTypes">
                <el-checkbox label="living">{{ $t('register.living') }}</el-checkbox>
                <el-checkbox label="bedroom">{{ $t('register.bedroom') }}</el-checkbox>
                <el-checkbox label="kitchen">{{ $t('register.kitchen') }}</el-checkbox>
                <el-checkbox label="bathroom">{{ $t('register.bathroom') }}</el-checkbox>
                <el-checkbox label="restaurant">{{ $t('register.restaurant') }}</el-checkbox>
                <el-checkbox label="study">{{ $t('register.study') }}</el-checkbox>
                <el-checkbox label="balcony">{{ $t('register.balcony') }}</el-checkbox>
                <el-checkbox label="entrance">{{ $t('register.entrance') }}</el-checkbox>
                <el-checkbox label="children">{{ $t('register.children') }}</el-checkbox>
                <el-checkbox label="storage">{{ $t('register.storage') }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </div>

        <!-- 供应商专属表单 -->
        <div v-if="registerForm.role === 'supplier'" class="role-specific-form supplier-form">
          <div class="form-section-title">{{ $t('register.supplierInfo') }}</div>
          
          <el-form-item :label="$t('register.companyName')" prop="companyName">
            <el-input v-model="registerForm.companyName" :placeholder="$t('register.companyNamePlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.contactPerson')" prop="contactPerson">
            <el-input v-model="registerForm.contactPerson" :placeholder="$t('register.contactPersonPlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.contactPhone')" prop="contactPhone">
            <el-input v-model="registerForm.contactPhone" :placeholder="$t('register.contactPhonePlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.companyAddress')" prop="companyAddress">
            <el-input v-model="registerForm.companyAddress" :placeholder="$t('register.companyAddressPlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.businessScope')" prop="businessScope">
            <el-input v-model="registerForm.businessScope" type="textarea" :rows="3" :placeholder="$t('register.businessScopePlaceholder')" />
          </el-form-item>

          <div class="address-row">
            <el-form-item :label="$t('register.city')" prop="city" class="address-item">
              <el-select v-model="registerForm.city" :placeholder="$t('register.selectCity')" size="large">
                <el-option label="北京" value="beijing" />
                <el-option label="上海" value="shanghai" />
                <el-option label="广州" value="guangzhou" />
                <el-option label="深圳" value="shenzhen" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('register.district')" prop="district" class="address-item">
              <el-select v-model="registerForm.district" :placeholder="$t('register.selectDistrict')" size="large">
                <el-option label="朝阳区" value="chaoyang" />
                <el-option label="海淀区" value="haidian" />
                <el-option label="西城区" value="xicheng" />
              </el-select>
            </el-form-item>
          </div>

          <div class="address-row">
            <el-form-item :label="$t('register.street')" prop="street" class="address-item">
              <el-input v-model="registerForm.street" :placeholder="$t('register.streetPlaceholder')" size="large" />
            </el-form-item>

            <el-form-item :label="$t('register.zipCode')" prop="zipCode" class="address-item">
              <el-input v-model="registerForm.zipCode" :placeholder="$t('register.zipCodePlaceholder')" size="large" />
            </el-form-item>
          </div>

          <el-form-item :label="$t('register.businessCategories')" prop="businessCategories">
            <el-checkbox-group v-model="registerForm.businessCategories" class="business-categories">
              <el-checkbox label="furniture">{{ $t('register.furniture') }}</el-checkbox>
              <el-checkbox label="lighting">{{ $t('register.lighting') }}</el-checkbox>
              <el-checkbox label="flooring">{{ $t('register.flooring') }}</el-checkbox>
              <el-checkbox label="wallpaper">{{ $t('register.wallpaper') }}</el-checkbox>
              <el-checkbox label="curtains">{{ $t('register.curtains') }}</el-checkbox>
              <el-checkbox label="accessories">{{ $t('register.accessories') }}</el-checkbox>
              <el-checkbox label="appliances">{{ $t('register.appliances') }}</el-checkbox>
              <el-checkbox label="other">{{ $t('register.other') }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item :label="$t('register.introduction')" prop="introduction">
            <el-input v-model="registerForm.introduction" type="textarea" :rows="4" :placeholder="$t('register.introductionPlaceholder')" />
          </el-form-item>
        </div>

        <!-- 施工方专属表单 -->
        <div v-if="registerForm.role === 'contractor'" class="role-specific-form contractor-form">
          <div class="form-section-title">{{ $t('register.contractorInfo') }}</div>
          
          <el-form-item :label="$t('register.contractorType')" prop="contractorType">
            <el-radio-group v-model="registerForm.contractorType">
              <el-radio label="individual">{{ $t('register.individual') }}</el-radio>
              <el-radio label="team">{{ $t('register.team') }}</el-radio>
              <el-radio label="company">{{ $t('register.company') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('register.contractorName')" prop="contractorName">
            <el-input v-model="registerForm.contractorName" :placeholder="$t('register.contractorNamePlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.workTypes')" prop="workTypes">
            <div class="work-types-grid">
              <el-checkbox-group v-model="registerForm.workTypes">
                <el-checkbox label="demolition">{{ $t('register.demolition') }}</el-checkbox>
                <el-checkbox label="plumbing">{{ $t('register.plumbing') }}</el-checkbox>
                <el-checkbox label="electrical">{{ $t('register.electrical') }}</el-checkbox>
                <el-checkbox label="flooring">{{ $t('register.flooringWork') }}</el-checkbox>
                <el-checkbox label="painting">{{ $t('register.painting') }}</el-checkbox>
                <el-checkbox label="tiling">{{ $t('register.tiling') }}</el-checkbox>
                <el-checkbox label="carpentry">{{ $t('register.carpentry') }}</el-checkbox>
                <el-checkbox label="hvac">{{ $t('register.hvac') }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>

          <el-form-item :label="$t('register.contractorPhone')" prop="contractorPhone">
            <el-input v-model="registerForm.contractorPhone" :placeholder="$t('register.contractorPhonePlaceholder')" size="large" />
          </el-form-item>

          <div class="address-row">
            <el-form-item :label="$t('register.contractorCity')" prop="contractorCity" class="address-item">
              <el-select v-model="registerForm.contractorCity" :placeholder="$t('register.selectCity')" size="large">
                <el-option label="北京" value="beijing" />
                <el-option label="上海" value="shanghai" />
                <el-option label="广州" value="guangzhou" />
                <el-option label="深圳" value="shenzhen" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('register.contractorDistrict')" prop="contractorDistrict" class="address-item">
              <el-select v-model="registerForm.contractorDistrict" :placeholder="$t('register.selectDistrict')" size="large">
                <el-option label="朝阳区" value="chaoyang" />
                <el-option label="海淀区" value="haidian" />
                <el-option label="西城区" value="xicheng" />
              </el-select>
            </el-form-item>
          </div>

          <el-form-item :label="$t('register.contractorAddress')" prop="contractorAddress">
            <el-input v-model="registerForm.contractorAddress" :placeholder="$t('register.contractorAddressPlaceholder')" size="large" />
          </el-form-item>

          <el-form-item :label="$t('register.contractorScope')" prop="contractorScope">
            <el-input v-model="registerForm.contractorScope" type="textarea" :rows="3" :placeholder="$t('register.contractorScopePlaceholder')" />
          </el-form-item>
        </div>

        <el-form-item prop="agreement">
          <el-checkbox v-model="registerForm.agreement">
            {{ $t('register.agreePrefix') }}
            <el-link type="primary" @click="showTerms">{{ $t('register.serviceTerms') }}</el-link>
            {{ $t('common.and') }}
            <el-link type="primary" @click="showPrivacy">{{ $t('register.privacyPolicy') }}</el-link>
          </el-checkbox>
        </el-form-item>
      </el-form>
      
      <div class="register-footer">
        <div class="login-link">
          {{ $t('register.hasAccount') }}
          <el-link type="primary" @click="$router.push('/login')">{{ $t('register.toLogin') }}</el-link>
        </div>
        <el-button type="primary" size="large" :loading="loading" class="register-btn" @click="handleRegister">
          {{ $t('register.createAccount') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { User, Brush, Shop, Setting } from '@element-plus/icons-vue'
import { registerApi } from '@/api/auth'
import { useRoleStore } from '@/stores/role'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'

const router = useRouter()
const roleStore = useRoleStore()
const { t } = useI18n()

const registerFormRef = ref<FormInstance>()
const loading = ref(false)
const emailCodeDisabled = ref(false)
const countdown = ref(0)

// 角色选项配置（注册时不包含guest）
const roleOptions = [
  { value: 'user', icon: User },
  { value: 'designer', icon: Brush },
  { value: 'supplier', icon: Shop },
  { value: 'contractor', icon: Setting }
]

// 注册表单
const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
  phone: '',
  agreement: false,
  role: 'user' as 'designer' | 'supplier' | 'contractor' | 'user',
  // 设计师专属字段
  designerType: 'individual',
  designerName: '',
  roomTypes: [] as string[],
  // 供应商专属字段
  companyName: '',
  contactPerson: '',
  contactPhone: '',
  companyAddress: '',
  businessScope: '',
  city: '',
  district: '',
  street: '',
  zipCode: '',
  businessCategories: [] as string[],
  introduction: '',
  // 施工方专属字段
  contractorType: 'individual',
  contractorName: '',
  workTypes: [] as string[],
  contractorPhone: '',
  contractorCity: '',
  contractorDistrict: '',
  contractorAddress: '',
  contractorScope: ''
})

// 初始化角色状态
onMounted(() => {
  roleStore.initRole()
  // 如果从 store 获取的角色是 guest，则设置为 user（注册页不支持 guest）
  const storeRole = roleStore.selectedRole
  if (storeRole === 'guest') {
    registerForm.role = 'user'
    roleStore.setRole('user')
  } else {
    registerForm.role = storeRole as 'designer' | 'supplier' | 'contractor' | 'user'
  }
})

// 监听角色变化，同步到表单
watch(() => roleStore.selectedRole, (newRole) => {
  if (newRole === 'guest') {
    registerForm.role = 'user'
  } else {
    registerForm.role = newRole as 'designer' | 'supplier' | 'contractor' | 'user'
  }
})

// 监听表单角色变化，同步到 store
watch(() => registerForm.role, (newRole) => {
  roleStore.setRole(newRole)
})

// 邮箱验证码按钮文本
const emailCodeText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return t('register.sendCode')
})

// 确认密码验证
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error(t('validation.passwordNotMatch')))
  } else {
    callback()
  }
}

// 协议验证
const validateAgreement = (rule: any, value: boolean, callback: any) => {
  if (!value) {
    callback(new Error(t('validation.agreementRequired')))
  } else {
    callback()
  }
}

// 表单验证规则
const registerRules: FormRules = {
  email: [
    { required: true, message: () => t('validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: () => t('validation.emailFormat'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => t('validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: () => t('validation.passwordLength'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: () => t('validation.confirmPasswordRequired'), trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: () => t('validation.emailCodeRequired'), trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: () => t('validation.phoneFormat'), trigger: 'blur' }
  ],
  agreement: [
    { validator: validateAgreement, trigger: 'change' }
  ],
  // 设计师专属验证
  designerName: [
    { required: true, message: () => t('validation.designerNameRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'designer' && !value) {
        callback(new Error(t('validation.designerNameRequired')))
      } else {
        callback()
      }
    }}
  ],
  // 供应商专属验证
  companyName: [
    { required: true, message: () => t('validation.companyNameRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'supplier' && !value) {
        callback(new Error(t('validation.companyNameRequired')))
      } else {
        callback()
      }
    }}
  ],
  contactPerson: [
    { required: true, message: () => t('validation.contactPersonRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'supplier' && !value) {
        callback(new Error(t('validation.contactPersonRequired')))
      } else {
        callback()
      }
    }}
  ],
  contactPhone: [
    { required: true, message: () => t('validation.contactPhoneRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'supplier' && !value) {
        callback(new Error(t('validation.contactPhoneRequired')))
      } else {
        callback()
      }
    }}
  ],
  // 施工方专属验证
  contractorName: [
    { required: true, message: () => t('validation.contractorNameRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'contractor' && !value) {
        callback(new Error(t('validation.contractorNameRequired')))
      } else {
        callback()
      }
    }}
  ],
  contractorPhone: [
    { required: true, message: () => t('validation.contractorPhoneRequired'), trigger: 'blur', validator: (rule: any, value: string, callback: any) => {
      if (registerForm.role === 'contractor' && !value) {
        callback(new Error(t('validation.contractorPhoneRequired')))
      } else {
        callback()
      }
    }}
  ]
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (!registerForm.email) {
    ElMessage.warning(t('validation.emailRequired'))
    return
  }
  
  try {
    ElMessage.success(t('register.codeSent'))
    
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
    
  } catch (error: any) {
    ElMessage.error(error.message || t('register.codeSendFailed'))
  }
}

// 显示服务条款
const showTerms = () => {
  ElMessageBox.alert(t('register.termsContent'), t('register.serviceTerms'), {
    confirmButtonText: t('common.confirm')
  })
}

// 显示隐私政策
const showPrivacy = () => {
  ElMessageBox.alert(t('register.privacyContent'), t('register.privacyPolicy'), {
    confirmButtonText: t('common.confirm')
  })
}

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  try {
    await registerFormRef.value.validate()
    loading.value = true
    
    await registerApi(registerForm)
    
    ElMessage.success(t('register.success'))
    router.push('/login')
    
  } catch (error: any) {
    ElMessage.error(error.message || t('register.failed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
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

.register-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.register-header p {
  color: #666;
  font-size: 14px;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

.code-wrapper {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.code-btn {
  min-width: 120px;
}

.register-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.login-link {
  color: #666;
  font-size: 14px;
}

.register-btn {
  min-width: 120px;
  height: 48px;
}

.role-specific-form {
  margin: 30px 0;
  padding: 20px;
  border-radius: 8px;
}

.designer-form {
  background: #fff9e6;
  border: 1px solid #ffd666;
}

.supplier-form {
  background: #f0f9ff;
  border: 1px solid #91d5ff;
}

.contractor-form {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.form-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.room-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.work-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.address-row {
  display: flex;
  gap: 16px;
}

.address-item {
  flex: 1;
}

.business-categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

@media (max-width: 768px) {
  .role-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .register-footer {
    flex-direction: column;
    gap: 16px;
  }
  
  .register-btn {
    width: 100%;
  }
  
  .room-types-grid,
  .work-types-grid,
  .business-categories {
    grid-template-columns: 1fr;
  }
  
  .address-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>