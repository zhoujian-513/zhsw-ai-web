import request from '@/utils/http'
import {
  mockGetProjectInfoList,
  mockGetProjectInfoDetail,
  mockAddProjectInfo,
  mockUpdateProjectInfo,
  mockDeleteProjectInfo,
  mockGetResponsibleUnitList
} from '@/mock/project-info'
import type {
  ProjectInfo,
  ProjectInfoQueryParams,
  ProjectInfoFormData,
  ImportResult
} from '@/types/project-info'
import type { PaginationResponse } from '@/types/api'

// 是否使用 Mock 模式
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取项目基础信息列表
 * @param params 查询参数
 * @returns 分页列表
 */
export function getProjectInfoList(params: ProjectInfoQueryParams) {
  if (USE_MOCK) {
    return new Promise<{ data: PaginationResponse<ProjectInfo> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetProjectInfoList(
          params.page,
          params.pageSize,
          params.responsibleUnitId,
          params.name,
          params.status
        )
        resolve({ data: result })
      }, 300)
    })
  }

  return request.get<PaginationResponse<ProjectInfo>>({
    url: '/operation/project-info/list',
    params
  })
}

/**
 * 获取项目基础信息详情
 * @param id 项目ID
 * @returns 项目详情
 */
export function getProjectInfoDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: ProjectInfo }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockGetProjectInfoDetail(id)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('项目不存在'))
        }
      }, 200)
    })
  }

  return request.get<ProjectInfo>({
    url: `/operation/project-info/${id}`
  })
}

/**
 * 新增项目基础信息
 * @param data 项目表单数据
 * @returns 新增的项目
 */
export function addProjectInfo(data: ProjectInfoFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: ProjectInfo }>((resolve) => {
      setTimeout(() => {
        const result = mockAddProjectInfo(data)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<ProjectInfo>({
    url: '/operation/project-info',
    data
  })
}

/**
 * 更新项目基础信息
 * @param data 项目表单数据
 * @returns 更新后的项目
 */
export function updateProjectInfo(data: ProjectInfoFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: ProjectInfo }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockUpdateProjectInfo(data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('项目不存在'))
        }
      }, 300)
    })
  }

  return request.put<ProjectInfo>({
    url: '/operation/project-info',
    data
  })
}

/**
 * 删除项目基础信息
 * @param id 项目ID
 */
export function deleteProjectInfo(id: number) {
  if (USE_MOCK) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const success = mockDeleteProjectInfo(id)
        if (success) {
          resolve()
        } else {
          reject(new Error('项目不存在'))
        }
      }, 200)
    })
  }

  return request.delete<void>({
    url: `/operation/project-info/${id}`
  })
}

/**
 * 批量导出项目基础信息
 * @param ids 项目ID列表（不传则导出全部）
 * @returns Blob数据
 */
export function exportProjectInfo(ids?: number[]) {
  return request.get<Blob>({
    url: '/operation/project-info/export',
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
        const blob = new Blob(['项目基础信息导入模板（Mock）'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        resolve(blob)
      }, 200)
    })
  }

  return request.get<Blob>({
    url: '/operation/project-info/import-template',
    responseType: 'blob'
  })
}

/**
 * 批量导入项目基础信息
 * @param file Excel文件
 * @returns 导入结果
 */
export function importProjectInfo(file: File) {
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
    url: '/operation/project-info/import',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取项目责任单位列表（用于下拉选择）
 * @returns 责任单位列表
 */
export function getResponsibleUnitList() {
  if (USE_MOCK) {
    return new Promise<{ data: Array<{ id: number; name: string }> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetResponsibleUnitList()
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<Array<{ id: number; name: string }>>({
    url: '/operation/project-info/responsible-units'
  })
}
