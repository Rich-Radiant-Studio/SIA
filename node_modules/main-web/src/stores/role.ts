import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const selectedRole = ref<'designer' | 'supplier' | 'user' | 'guest'>('user')

  const setRole = (role: 'designer' | 'supplier' | 'user' | 'guest') => {
    selectedRole.value = role
    // 持久化到 localStorage
    localStorage.setItem('selectedRole', role)
  }

  // 初始化时从 localStorage 读取
  const initRole = () => {
    const savedRole = localStorage.getItem('selectedRole')
    if (savedRole && ['designer', 'supplier', 'user', 'guest'].includes(savedRole)) {
      selectedRole.value = savedRole as 'designer' | 'supplier' | 'user' | 'guest'
    }
  }

  // 监听角色变化，同步到 localStorage
  watch(selectedRole, (newRole) => {
    localStorage.setItem('selectedRole', newRole)
  })

  return {
    selectedRole,
    setRole,
    initRole
  }
})