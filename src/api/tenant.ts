import { mockGetTenantList } from '@/mock/tenant'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export function getTenantList() {
  if (USE_MOCK) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve({ code: 200, data: mockGetTenantList(), message: '获取成功' })
      }, 300)
    })
  }
  return Promise.reject(new Error('请配置真实接口'))
}
