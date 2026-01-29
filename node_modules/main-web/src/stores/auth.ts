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
  isGuest?: boolean
  guestAccountId?: string
}

export interface LoginForm {
  username: string
  password: string
  role: 'designer' | 'supplier' | 'user' | 'guest'
}

export interface GuestAccount {
  id: string
  username: string
  password: string
  createdAt: number
  isSaved?: boolean  // 标记账号是否已保存
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const permissions = ref<string[]>([])
  const lastVisitedRoute = ref<string>(localStorage.getItem('lastVisitedRoute') || '')

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!userInfo.value)
  const userRoles = computed(() => userInfo.value?.roles || [])
  const isGuest = computed(() => userInfo.value?.isGuest || false)

  // 初始化认证状态
  const initializeAuth = async () => {
    if (token.value) {
      try {
        // 检查 token 是否过期
        const tokenExpiry = localStorage.getItem('tokenExpiry')
        if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
          console.log('Token 已过期，清除认证状态')
          logout()
          return
        }
        
        // 恢复用户信息
        const savedUserInfo = localStorage.getItem('userInfo')
        if (savedUserInfo) {
          userInfo.value = JSON.parse(savedUserInfo)
          await generateRoutes()
        } else {
          await getUserInfo()
          await generateRoutes()
        }
      } catch (error) {
        console.error('初始化认证失败:', error)
        logout()
      }
    }
  }

  // 创建游客账号
  const createGuestAccount = async () => {
    try {
      // 模拟后端生成游客账号
      const guestId = 'guest_' + Date.now()
      const guestAccount: GuestAccount = {
        id: guestId,
        username: 'Guest_' + Math.random().toString(36).substr(2, 6),
        password: Math.random().toString(36).substr(2, 10),
        createdAt: Date.now(),
        isSaved: false  // 初始为未保存状态
      }
      
      // 保存游客账号信息（供弹窗使用）
      localStorage.setItem('guestAccount', JSON.stringify(guestAccount))
      
      // 自动登录游客账号
      const guestToken = 'guest-token-' + Date.now()
      const guestUserInfo: UserInfo = {
        id: guestAccount.id,
        username: guestAccount.username,
        email: '',
        roles: ['guest', 'user'],
        isGuest: true,
        guestAccountId: guestAccount.id
      }
      
      token.value = guestToken
      userInfo.value = guestUserInfo
      
      // 设置 token 过期时间（7天）
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000
      localStorage.setItem('token', guestToken)
      localStorage.setItem('tokenExpiry', expiry.toString())
      localStorage.setItem('userInfo', JSON.stringify(guestUserInfo))
      
      // 生成动态路由
      await generateRoutes()
      
      // 广播登录状态给子应用
      broadcastLoginStatus(true, guestUserInfo)
      
      return { guestAccount, token: guestToken }
    } catch (error) {
      console.error('创建游客账号失败:', error)
      throw error
    }
  }

  // 更新游客账号信息
  const updateGuestAccount = async (username: string, password: string) => {
    try {
      const guestAccount = localStorage.getItem('guestAccount')
      if (guestAccount) {
        const account = JSON.parse(guestAccount)
        account.username = username
        account.password = password
        account.isSaved = true  // 标记为已保存
        localStorage.setItem('guestAccount', JSON.stringify(account))
        
        // 更新用户信息
        if (userInfo.value) {
          userInfo.value.username = username
          localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
        }
        
        return account
      }
    } catch (error) {
      console.error('更新游客账号失败:', error)
      throw error
    }
  }

  // 保存最后访问的路由
  const saveLastVisitedRoute = (route: string) => {
    lastVisitedRoute.value = route
    localStorage.setItem('lastVisitedRoute', route)
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
            avatar: '',
            isGuest: false
          }
        }
      }
      
      const { token: newToken, userInfo: newUserInfo } = response.data
      
      token.value = newToken
      userInfo.value = newUserInfo
      
      // 设置 token 过期时间（7天）
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000
      localStorage.setItem('token', newToken)
      localStorage.setItem('tokenExpiry', expiry.toString())
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
      
      // 清除游客账号信息
      localStorage.removeItem('guestAccount')
      
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
  const logout = (clearGuestAccount = false) => {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('lastVisitedRoute')
    
    if (clearGuestAccount) {
      localStorage.removeItem('guestAccount')
    }
    
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
    if (route.meta?.roles && Array.isArray(route.meta.roles)) {
      return userRoles.value.some(role => (route.meta!.roles as string[]).includes(role))
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
    isGuest,
    lastVisitedRoute,
    initializeAuth,
    login,
    getUserInfo,
    logout,
    generateRoutes,
    hasPermission: hasRoutePermission,
    createGuestAccount,
    updateGuestAccount,
    saveLastVisitedRoute
  }
})