import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/designer/dashboard'
  },
  {
    path: '/designer',
    name: 'DesignerLayout',
    component: () => import('@/components/Layout/index.vue'),
    redirect: '/designer/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'DesignerDashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { 
          title: 'designer.dashboard',
          icon: 'dashboard'
        }
      },
      {
        path: 'projects',
        name: 'DesignerProjects',
        component: () => import('@/views/Projects/index.vue'),
        meta: { 
          title: 'designer.projects',
          icon: 'folder'
        }
      },
      {
        path: 'templates',
        name: 'DesignerTemplates',
        component: () => import('@/views/Templates/index.vue'),
        meta: { 
          title: 'designer.templates',
          icon: 'document'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/designer'),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // 检查用户是否已登录
  if (!authStore.isAuthenticated) {
    // 如果在微前端环境中，通知父应用跳转登录
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'REDIRECT_TO_LOGIN'
      }, '*')
    }
    return
  }
  
  next()
})

export default router