<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('guest.saveAccountTitle')"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="guest-account-content">
      <div class="account-info">
        <el-alert
          :title="$t('guest.accountGeneratedTitle')"
          type="info"
          :closable="false"
          show-icon
        >
          <template #default>
            <p>{{ $t('guest.accountGeneratedDesc') }}</p>
          </template>
        </el-alert>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="account-form">
        <el-form-item :label="$t('guest.username')" prop="username">
          <el-input 
            v-model="form.username" 
            :placeholder="$t('guest.usernamePlaceholder')"
            size="large"
          />
        </el-form-item>

        <el-form-item :label="$t('guest.password')" prop="password">
          <el-input 
            v-model="form.password" 
            type="password"
            :placeholder="$t('guest.passwordPlaceholder')"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item :label="$t('guest.confirmPassword')" prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            type="password"
            :placeholder="$t('guest.confirmPasswordPlaceholder')"
            size="large"
            show-password
          />
        </el-form-item>
      </el-form>

      <div class="account-tips">
        <p>{{ $t('guest.saveTip') }}</p>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="handleCancel">
          {{ $t('guest.noThanks') }}
        </el-button>
        <el-button type="primary" size="large" :loading="loading" @click="handleSave">
          {{ $t('guest.saveAccount') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 验证确认密码
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value !== form.password) {
    callback(new Error(t('validation.passwordNotMatch')))
  } else {
    callback()
  }
}

const rules: FormRules = {
  username: [
    { required: true, message: () => t('validation.usernameRequired'), trigger: 'blur' },
    { min: 3, message: () => t('validation.usernameLength'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: () => t('validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: () => t('validation.passwordLength'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: () => t('validation.confirmPasswordRequired'), trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

// 显示弹窗
const show = () => {
  const guestAccount = localStorage.getItem('guestAccount')
  if (guestAccount) {
    const account = JSON.parse(guestAccount)
    form.username = account.username
    form.password = account.password
    form.confirmPassword = account.password
  }
  dialogVisible.value = true
}

// 保存账号
const handleSave = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 更新游客账号信息
    await authStore.updateGuestAccount(form.username, form.password)
    
    ElMessage.success(t('guest.saveSuccess'))
    dialogVisible.value = false
    
  } catch (error: any) {
    if (error !== false) { // 验证失败时不显示错误
      ElMessage.error(error.message || t('guest.saveFailed'))
    }
  } finally {
    loading.value = false
  }
}

// 取消保存
const handleCancel = () => {
  // 清除游客账号信息
  authStore.logout(true)
  dialogVisible.value = false
}

defineExpose({
  show
})
</script>

<style scoped>
.guest-account-content {
  padding: 10px 0;
}

.account-info {
  margin-bottom: 24px;
}

.account-info :deep(.el-alert__description) {
  margin-top: 8px;
  line-height: 1.6;
}

.account-form {
  margin-top: 24px;
}

.account-tips {
  margin-top: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
}

.account-tips p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
