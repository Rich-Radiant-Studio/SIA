import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Layout from '@/components/Layout/index.vue'

// 公共路由（无需权限）
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: { 
      allowGuest: true,
      title: 'login.title'
    }
  },
  {
    path: '/register',
    name: 'Register', 
    component: () => import('@/views/Auth/Register.vue'),
    meta: { 
      allowGuest: true,
      title: 'register.title'
    }
  },
  {
    path: '/',
    redirect: '/user' // 默认重定向到用户端
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/MicroApps/UserApp.vue'),
    meta: {
      title: 'user.title',
      roles: ['user', 'guest'],
      microApp: 'user-web',
      fullscreen: true, // 标记为全屏显示
      allowGuest: true // 允许游客访问
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { 
          title: 'dashboard.title',
          icon: 'dashboard'
        }
      }
    ]
  }
]

// 权限路由（需要权限验证）
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/guest',
    name: 'Guest',
    component: Layout,
    meta: {
      title: 'guest.title',
      allowGuest: true
    },
    children: [
      {
        path: '',
        name: 'GuestDashboard',
        component: () => import('@/views/Guest/index.vue'),
        meta: { 
          title: 'guest.dashboard',
          allowGuest: true
        }
      }
    ]
  },
  {
    path: '/designer',
    name: 'Designer',
    component: Layout,
    meta: {
      title: 'designer.title',
      roles: ['designer']
    },
    children: [
      {
        path: '',
        name: 'DesignerApp',
        component: () => import('@/views/MicroApps/DesignerApp.vue'),
        meta: { 
          title: 'designer.app',
          microApp: 'designer-web'
        }
      }
    ]
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Layout,
    meta: {
      title: 'supplier.title',
      roles: ['supplier']
    },
    children: [
      {
        path: '',
        name: 'SupplierApp',
        component: () => import('@/views/MicroApps/SupplierApp.vue'),
        meta: { 
          title: 'supplier.app',
          microApp: 'supplier-web'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  console.log('路由守卫:', {
    to: to.path,
    isAuthenticated: authStore.isAuthenticated,
    userRoles: authStore.userRoles,
    routeMeta: to.meta
  })
  
  // 如果访问用户端且未登录，自动创建游客账号
  if (to.path === '/user' && !authStore.isAuthenticated) {
    try {
      await authStore.createGuestAccount()
      authStore.saveLastVisitedRoute(to.path)
      next()
      return
    } catch (error) {
      console.error('创建游客账号失败:', error)
      next('/login')
      return
    }
  }
  
  // 检查是否为游客模式允许的路由
  if (to.meta?.allowGuest) {
    next()
    return
  }
  
  // 检查用户是否已登录
  if (!authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // 保存最后访问的路由（排除登录注册页）
  if (to.path !== '/login' && to.path !== '/register') {
    authStore.saveLastVisitedRoute(to.path)
  }
  
  // 检查权限路由
  if (!authStore.hasPermission(to)) {
    console.warn('权限检查失败:', {
      path: to.path,
      userRoles: authStore.userRoles,
      requiredRoles: to.meta?.roles
    })
    next('/dashboard') // 改为跳转到dashboard而不是403
    return
  }
  
  next()
})

export default router