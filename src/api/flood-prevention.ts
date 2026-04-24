import request from '@/utils/http'
import {
  mockGetFloodPreventionList,
  mockGetFloodPreventionDetail,
  mockCreateFloodPrevention,
  mockUpdateFloodPrevention,
  mockDeleteFloodPrevention,
  mockGetProjectList
} from '@/mock/flood-prevention'
import type {
  FloodPrevention,
  FloodPreventionQueryParams,
  FloodPreventionFormData,
  ImportResult,
  ProjectInfo
} from '@/types/flood-prevention'
import type { PaginationResponse } from '@/types/api'

// 是否使用 Mock 模式
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取防汛专项管理列表
 * @param params 查询参数
 * @returns 分页列表
 */
export function getFloodPreventionList(params: FloodPreventionQueryParams) {
  if (USE_MOCK) {
    return new Promise<{ data: PaginationResponse<FloodPrevention> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetFloodPreventionList(
          params.page,
          params.pageSize,
          params.projectId,
          params.keyword,
          params.regionCompany
        )
        resolve({ data: result })
      }, 300)
    })
  }

  return request.get<PaginationResponse<FloodPrevention>>({
    url: '/safety/flood-prevention/list',
    params
  })
}

/**
 * 获取防汛专项管理详情
 * @param id 主键ID
 * @returns 详情
 */
export function getFloodPreventionDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: FloodPrevention }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockGetFloodPreventionDetail(id)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('记录不存在'))
        }
      }, 200)
    })
  }

  return request.get<FloodPrevention>({
    url: `/safety/flood-prevention/${id}`
  })
}

/**
 * 创建防汛专项管理
 * @param data 表单数据
 * @returns 创建后的记录
 */
export function createFloodPrevention(data: FloodPreventionFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: FloodPrevention }>((resolve) => {
      setTimeout(() => {
        const result = mockCreateFloodPrevention(data)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<FloodPrevention>({
    url: '/safety/flood-prevention',
    data
  })
}

/**
 * 更新防汛专项管理
 * @param data 表单数据
 * @returns 更新后的记录
 */
export function updateFloodPrevention(data: FloodPreventionFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: FloodPrevention }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockUpdateFloodPrevention(data.id!, data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('更新失败'))
        }
      }, 300)
    })
  }

  return request.put<FloodPrevention>({
    url: '/safety/flood-prevention',
    data
  })
}

/**
 * 删除防汛专项管理
 * @param id 主键ID
 */
export function deleteFloodPrevention(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: boolean }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockDeleteFloodPrevention(id)
        if (result) {
          resolve({ data: true })
        } else {
          reject(new Error('删除失败'))
        }
      }, 300)
    })
  }

  return request.delete({
    url: `/safety/flood-prevention/${id}`
  })
}

/**
 * 批量导出防汛专项管理
 * @param ids 主键ID列表（不传则导出全部）
 * @returns Blob数据
 */
export function exportFloodPrevention(ids?: number[]) {
  return request.get<Blob>({
    url: '/safety/flood-prevention/export',
    params: { ids },
    responseType: 'blob'
  })
}

/**
 * 下载导入模板
 * @returns Blob数据
 */
export function downloadImportTemplate() {
  if (USE_MOCK) {
    return new Promise<Blob>((resolve) => {
      setTimeout(() => {
        const blob = new Blob(['防汛专项管理导入模板（Mock）'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        resolve(blob)
      }, 200)
    })
  }

  return request.get<Blob>({
    url: '/safety/flood-prevention/import-template',
    responseType: 'blob'
  })
}

/**
 * 批量导入防汛专项管理
 * @param file Excel文件
 * @returns 导入结果
 */
export function importFloodPrevention(file: File) {
  if (USE_MOCK) {
    return new Promise<{ data: ImportResult }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            successCount: 5,
            failCount: 0,
            failDetails: []
          }
        })
      }, 1000)
    })
  }

  const formData = new FormData()
  formData.append('file', file)
  return request.post<ImportResult>({
    url: '/safety/flood-prevention/import',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取项目列表（用于下拉选择）
 * @returns 项目列表
 */
export function getProjectList() {
  if (USE_MOCK) {
    return new Promise<{ data: ProjectInfo[] }>((resolve) => {
      setTimeout(() => {
        const result = mockGetProjectList()
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<ProjectInfo[]>({
    url: '/safety/flood-prevention/projects'
  })
}
