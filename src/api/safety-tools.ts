import request from '@/utils/http'
import {
  mockGetSafetyToolList,
  mockGetSafetyToolDetail,
  mockCreateSafetyTool,
  mockUpdateSafetyTool,
  mockDeleteSafetyTool,
  mockGetInspectionRecordList,
  mockAddInspectionRecord,
  mockGetStationList
} from '@/mock/safety-tools'
import type {
  SafetyTool,
  SafetyToolQueryParams,
  SafetyToolFormData,
  InspectionRecord,
  InspectionRecordFormData,
  ImportResult
} from '@/types/safety-tools'
import type { PaginationResponse } from '@/types/api'

// 是否使用 Mock 模式
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取安全工器具列表
 * @param params 查询参数
 * @returns 分页列表
 */
export function getSafetyToolList(params: SafetyToolQueryParams) {
  if (USE_MOCK) {
    return new Promise<{ data: PaginationResponse<SafetyTool> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetSafetyToolList(
          params.page,
          params.pageSize,
          params.stationId,
          params.keyword,
          params.verificationStatus
        )
        resolve({ data: result })
      }, 300)
    })
  }

  return request.get<PaginationResponse<SafetyTool>>({
    url: '/safety/safety-tools/list',
    params
  })
}

/**
 * 获取安全工器具详情
 * @param id 工器具ID
 * @returns 工器具详情
 */
export function getSafetyToolDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: SafetyTool }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockGetSafetyToolDetail(id)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('工器具不存在'))
        }
      }, 200)
    })
  }

  return request.get<SafetyTool>({
    url: `/safety/safety-tools/${id}`
  })
}

/**
 * 新增安全工器具
 * @param data 表单数据
 * @returns 新增的工器具
 */
export function createSafetyTool(data: SafetyToolFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: SafetyTool }>((resolve) => {
      setTimeout(() => {
        const result = mockCreateSafetyTool(data)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<SafetyTool>({
    url: '/safety/safety-tools',
    data
  })
}

/**
 * 更新安全工器具信息
 * @param data 表单数据
 * @returns 更新后的工器具
 */
export function updateSafetyTool(data: SafetyToolFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: SafetyTool }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockUpdateSafetyTool(data.id!, data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('更新失败'))
        }
      }, 300)
    })
  }

  return request.put<SafetyTool>({
    url: '/safety/safety-tools',
    data
  })
}

/**
 * 删除安全工器具
 * @param id 工器具ID
 */
export function deleteSafetyTool(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: boolean }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockDeleteSafetyTool(id)
        if (result) {
          resolve({ data: true })
        } else {
          reject(new Error('删除失败'))
        }
      }, 200)
    })
  }

  return request.delete({
    url: `/safety/safety-tools/${id}`
  })
}

/**
 * 获取校验记录列表
 * @param toolId 工器具ID
 * @returns 校验记录列表
 */
export function getInspectionRecordList(toolId: number) {
  if (USE_MOCK) {
    return new Promise<{ data: InspectionRecord[] }>((resolve) => {
      setTimeout(() => {
        const result = mockGetInspectionRecordList(toolId)
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<InspectionRecord[]>({
    url: '/safety/safety-tools/inspection-records',
    params: { toolId }
  })
}

/**
 * 新增校验记录
 * @param data 校验记录表单数据
 * @returns 新增的校验记录
 */
export function addInspectionRecord(data: InspectionRecordFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: InspectionRecord }>((resolve) => {
      setTimeout(() => {
        const result = mockAddInspectionRecord(data.toolId, {
          inspectionDate: data.inspectionDate,
          inspectionOrg: data.inspectionOrg,
          attachments: data.attachments,
          remark: data.remark,
          createBy: '当前用户'
        })
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<InspectionRecord>({
    url: '/safety/safety-tools/inspection-record',
    data
  })
}

/**
 * 批量导出安全工器具
 * @param ids 工器具ID列表（不传则导出全部）
 * @returns Blob数据
 */
export function exportSafetyTools(ids?: number[]) {
  return request.get<Blob>({
    url: '/safety/safety-tools/export',
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
        const blob = new Blob(['安全工器具导入模板（Mock）'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        resolve(blob)
      }, 200)
    })
  }

  return request.get<Blob>({
    url: '/safety/safety-tools/import-template',
    responseType: 'blob'
  })
}

/**
 * 批量导入安全工器具
 * @param file Excel文件
 * @returns 导入结果
 */
export function importSafetyTools(file: File) {
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
    url: '/safety/safety-tools/import',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取厂站列表（用于下拉选择）
 * @returns 厂站列表
 */
export function getStationList() {
  if (USE_MOCK) {
    return new Promise<{ data: Array<{ id: number; name: string }> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetStationList()
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<Array<{ id: number; name: string }>>({
    url: '/safety/safety-tools/stations'
  })
}
