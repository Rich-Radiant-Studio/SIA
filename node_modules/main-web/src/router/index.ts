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
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
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
  },
  {
    path: '/contractor',
    name: 'Contractor',
    component: Layout,
    meta: {
      title: 'contractor.title',
      roles: ['contractor']
    },
    children: [
      {
        path: '',
        name: 'ContractorApp',
        component: () => import('@/views/MicroApps/ContractorApp.vue'),
        meta: { 
          title: 'contractor.app',
          microApp: 'contractor-web'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/MicroApps/UserApp.vue'),
    meta: {
      title: 'user.title',
      roles: ['user', 'guest'],
      microApp: 'user-web',
      fullscreen: true // 标记为全屏显示
    }
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