/**
 * 有限空间台账 - API
 */
import request from '@/utils/http'
import type { ConfinedSpaceItem, ConfinedSpaceListParams } from '@/types/confined-space'
import {
  getConfinedSpaceListMock,
  addConfinedSpaceMock,
  updateConfinedSpaceMock,
  deleteConfinedSpaceMock
} from '@/mock/confined-space'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取有限空间台账列表
 */
export function getConfinedSpaceList(params: ConfinedSpaceListParams) {
  if (USE_MOCK) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const data = getConfinedSpaceListMock(params)
        resolve({
          code: 200,
          message: 'success',
          data
        })
      }, 300)
    })
  }

  return request.get<{
    list: ConfinedSpaceItem[]
    total: number
  }>({
    url: '/admin/safety/confined-space/list',
    params
  })
}

/**
 * 添加有限空间台账
 */
export function addConfinedSpace(data: Partial<ConfinedSpaceItem>) {
  if (USE_MOCK) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const result = addConfinedSpaceMock(data)
        resolve({
          code: 200,
          message: '添加成功',
          data: result
        })
      }, 300)
    })
  }

  return request.post({
    url: '/admin/safety/confined-space/add',
    data
  })
}

/**
 * 更新有限空间台账
 */
export function updateConfinedSpace(data: Partial<ConfinedSpaceItem>) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = updateConfinedSpaceMock(data)
          resolve({
            code: 200,
            message: '更新成功',
            data: result
          })
        } catch (error: any) {
          reject({
            code: 404,
            message: error.message
          })
        }
      }, 300)
    })
  }

  return request.put({
    url: '/admin/safety/confined-space/update',
    data
  })
}

/**
 * 删除有限空间台账
 */
export function deleteConfinedSpace(id: number) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          deleteConfinedSpaceMock(id)
          resolve({
            code: 200,
            message: '删除成功'
          })
        } catch (error: any) {
          reject({
            code: 404,
            message: error.message
          })
        }
      }, 300)
    })
  }

  return request.del({
    url: `/admin/safety/confined-space/delete/${id}`
  })
}
