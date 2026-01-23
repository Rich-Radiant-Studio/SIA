import request from './request'
import { LoginForm, UserInfo } from '@/stores/auth'

// 登录接口
export const loginApi = (data: LoginForm) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 注册接口
export const registerApi = (data: any) => {
  // 模拟注册API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: '注册成功'
        }
      })
    }, 1000)
  })
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: '/auth/userinfo',
    method: 'get'
  })
}

// 登出接口
export const logoutApi = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 刷新token
export const refreshTokenApi = (refreshToken: string) => {
  return request({
    url: '/auth/refresh',
    method: 'post',
    data: { refreshToken }
  })
}