import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import { loginApi, getUserInfoApi } from '@/api/auth'
import { asyncRoutes } from '@/router'
import router from '@/router'
import { broadcastToMicroApps } from '@/utils/wujie'

export interface UserInfo {
  id: string
  username: string
  email: string
  roles: string[]
  avatar?: string
}

export interface LoginForm {
  username: string
  password: string
  role: 'designer' | 'supplier' | 'user' | 'guest'
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const permissions = ref<string[]>([])

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!userInfo.value)
  const userRoles = computed(() => userInfo.value?.roles || [])

  // 初始化认证状态
  const initializeAuth = async () => {
    if (token.value) {
      try {
        await getUserInfo()
        await generateRoutes()
      } catch (error) {
        console.error('初始化认证失败:', error)
        logout()
      }
    }
  }

  // 登录
  const login = async (loginForm: LoginForm) => {
    try {
      // 模拟登录API调用
      const response = {
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: {
            id: '1',
            username: loginForm.username,
            email: loginForm.username + '@example.com',
            roles: [loginForm.role],
            avatar: ''
          }
        }
      }
      
      const { token: newToken, userInfo: newUserInfo } = response.data
      
      token.value = newToken
      userInfo.value = newUserInfo
      
      localStorage.setItem('token', newToken)
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
      
      // 生成动态路由
      await generateRoutes()
      
      // 广播登录状态给子应用
      broadcastLoginStatus(true, newUserInfo)
      
      return response
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await getUserInfoApi()
      userInfo.value = response.data
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      return response
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    
    // 清除动态路由
    clearRoutes()
    
    // 广播登出状态给子应用
    broadcastLoginStatus(false, null)
    
    router.push('/login')
  }

  // 生成动态路由
  const generateRoutes = async () => {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, userRoles.value)
    
    // 动态添加路由
    accessedRoutes.forEach(route => {
      router.addRoute(route)
    })
    
    return accessedRoutes
  }

  // 过滤权限路由
  const filterAsyncRoutes = (routes: any[], roles: string[]) => {
    const res: any[] = []
    
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })
    
    return res
  }

  // 检查权限
  const hasPermission = (roles: string[], route: any) => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    }
    return true
  }

  // 检查路由权限
  const hasRoutePermission = (route: RouteLocationNormalized) => {
    if (route.meta?.roles) {
      return userRoles.value.some(role => route.meta!.roles!.includes(role))
    }
    return true
  }

  // 清除路由
  const clearRoutes = () => {
    // 移除动态添加的路由
    asyncRoutes.forEach(route => {
      if (router.hasRoute(route.name as string)) {
        router.removeRoute(route.name as string)
      }
    })
  }

  // 广播登录状态给子应用
  const broadcastLoginStatus = (isLoggedIn: boolean, user: UserInfo | null) => {
    const loginData = {
      type: 'LOGIN_STATUS_CHANGE',
      payload: {
        isLoggedIn,
        user,
        token: token.value
      }
    }
    
    broadcastToMicroApps(loginData)
  }

  return {
    token,
    userInfo,
    permissions,
    isAuthenticated,
    userRoles,
    initializeAuth,
    login,
    getUserInfo,
    logout,
    generateRoutes,
    hasPermission: hasRoutePermission
  }
})