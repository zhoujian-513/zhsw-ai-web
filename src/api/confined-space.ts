import request from '@/utils/http'
import {
  mockGetConfinedSpaceList,
  mockGetConfinedSpaceDetail,
  mockCreateConfinedSpace,
  mockUpdateConfinedSpace,
  mockDeleteConfinedSpace,
  mockAuditConfinedSpace,
  mockBatchAuditConfinedSpace,
  mockGetStationList,
  mockGetStructureList,
  mockGetAuditRecordList,
  mockGetHistoryRecordList
} from '@/mock/confined-space'
import type {
  ConfinedSpace,
  ConfinedSpaceQueryParams,
  ConfinedSpaceFormData,
  AuditFormData,
  BatchAuditFormData,
  ImportResult,
  AuditRecord,
  HistoryRecord
} from '@/types/confined-space'
import type { PaginationResponse } from '@/types/api'

// 是否使用 Mock 模式
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取有限空间台账列表
 * @param params 查询参数
 * @returns 分页列表
 */
export function getConfinedSpaceList(params: ConfinedSpaceQueryParams) {
  if (USE_MOCK) {
    return new Promise<{ data: PaginationResponse<ConfinedSpace> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetConfinedSpaceList(params)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.get<PaginationResponse<ConfinedSpace>>({
    url: '/safety/confined-space/list',
    params
  })
}

/**
 * 获取有限空间台账详情
 * @param id 台账ID
 * @returns 台账详情
 */
export function getConfinedSpaceDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: ConfinedSpace }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockGetConfinedSpaceDetail(id)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('台账不存在'))
        }
      }, 200)
    })
  }

  return request.get<ConfinedSpace>({
    url: `/safety/confined-space/${id}`
  })
}

/**
 * 新增有限空间台账
 * @param data 表单数据
 * @returns 新增的台账
 */
export function createConfinedSpace(data: ConfinedSpaceFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: ConfinedSpace }>((resolve) => {
      setTimeout(() => {
        const result = mockCreateConfinedSpace(data)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<ConfinedSpace>({
    url: '/safety/confined-space',
    data
  })
}

/**
 * 更新有限空间台账
 * @param data 表单数据
 * @returns 更新后的台账
 */
export function updateConfinedSpace(data: ConfinedSpaceFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: ConfinedSpace }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockUpdateConfinedSpace(data.id!, data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('更新失败'))
        }
      }, 300)
    })
  }

  return request.put<ConfinedSpace>({
    url: '/safety/confined-space',
    data
  })
}

/**
 * 删除有限空间台账
 * @param id 台账ID
 */
export function deleteConfinedSpace(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: boolean }>((resolve) => {
      setTimeout(() => {
        const result = mockDeleteConfinedSpace(id)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.delete<boolean>({
    url: `/safety/confined-space/${id}`
  })
}

/**
 * 审核有限空间台账
 * @param data 审核表单数据
 * @returns 审核后的台账
 */
export function auditConfinedSpace(data: AuditFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: ConfinedSpace }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockAuditConfinedSpace(data.id, data.approved, data.comment)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('审核失败'))
        }
      }, 300)
    })
  }

  return request.post<ConfinedSpace>({
    url: '/safety/confined-space/audit',
    data
  })
}

/**
 * 批量审核有限空间台账
 * @param data 批量审核表单数据
 * @returns 审核结果
 */
export function batchAuditConfinedSpace(data: BatchAuditFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: { success: boolean; message: string } }>((resolve) => {
      setTimeout(() => {
        const result = mockBatchAuditConfinedSpace(data.ids, data.approved, data.comment)
        resolve({ data: result })
      }, 500)
    })
  }

  return request.post<{ success: boolean; message: string }>({
    url: '/safety/confined-space/batch-audit',
    data
  })
}

/**
 * 获取审核记录列表
 * @param spaceId 台账ID
 * @returns 审核记录列表
 */
export function getAuditRecordList(spaceId: number) {
  if (USE_MOCK) {
    return new Promise<{ data: AuditRecord[] }>((resolve) => {
      setTimeout(() => {
        const result = mockGetAuditRecordList(spaceId)
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<AuditRecord[]>({
    url: '/safety/confined-space/audit-records',
    params: { spaceId }
  })
}

/**
 * 获取历史修改记录列表
 * @param spaceId 台账ID
 * @returns 历史记录列表
 */
export function getHistoryRecordList(spaceId: number) {
  if (USE_MOCK) {
    return new Promise<{ data: HistoryRecord[] }>((resolve) => {
      setTimeout(() => {
        const result = mockGetHistoryRecordList(spaceId)
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<HistoryRecord[]>({
    url: '/safety/confined-space/history-records',
    params: { spaceId }
  })
}

/**
 * 批量导出有限空间台账
 * @param ids 台账ID列表（不传则导出全部）
 * @returns Blob数据
 */
export function exportConfinedSpace(ids?: number[]) {
  return request.get<Blob>({
    url: '/safety/confined-space/export',
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
        const blob = new Blob(['有限空间台账导入模板（Mock）'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        resolve(blob)
      }, 200)
    })
  }

  return request.get<Blob>({
    url: '/safety/confined-space/import-template',
    responseType: 'blob'
  })
}

/**
 * 批量导入有限空间台账
 * @param file Excel文件
 * @returns 导入结果
 */
export function importConfinedSpace(file: File) {
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
    url: '/safety/confined-space/import',
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
    url: '/safety/confined-space/stations'
  })
}

/**
 * 获取构筑物列表（用于下拉选择）
 * @param stationId 厂站ID
 * @returns 构筑物列表
 */
export function getStructureList(stationId?: number) {
  if (USE_MOCK) {
    return new Promise<{ data: Array<{ id: number; name: string }> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetStructureList(stationId)
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<Array<{ id: number; name: string }>>({
    url: '/safety/confined-space/structures',
    params: { stationId }
  })
}
