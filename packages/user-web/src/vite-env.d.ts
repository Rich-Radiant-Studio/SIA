/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 微前端相关类型声明
declare global {
  interface Window {
    __POWERED_BY_WUJIE__?: boolean
    __WUJIE_MOUNT__?: () => void
    __WUJIE_UNMOUNT__?: () => void
    __PARENT_APP__?: {
      userInfo?: any
      token?: string
      locale?: string
    }
  }
}

export {}