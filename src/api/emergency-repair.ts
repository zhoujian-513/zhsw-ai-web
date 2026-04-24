import request from '@/utils/http'
import {
  mockGetEmergencyEventList,
  mockGetEmergencyEventDetail,
  mockAddInitialReport,
  mockAddFollowUpReport,
  mockAddFinalReport,
  mockGetOperationLogs,
  mockGetStationList
} from '@/mock/emergency-repair'
import type {
  EmergencyEvent,
  EmergencyEventQueryParams,
  InitialReportFormData,
  FollowUpReportFormData,
  FinalReportFormData,
  OperationLog,
  ImportResult
} from '@/types/emergency-repair'
import type { PaginationResponse } from '@/types/api'

// 是否使用 Mock 模式
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取应急事件列表
 * @param params 查询参数
 * @returns 分页列表
 */
export function getEmergencyEventList(params: EmergencyEventQueryParams) {
  if (USE_MOCK) {
    return new Promise<{ data: PaginationResponse<EmergencyEvent> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetEmergencyEventList(
          params.page,
          params.pageSize,
          params.stationId,
          params.eventType,
          params.status,
          params.occurrenceMonth
        )
        resolve({ data: result })
      }, 300)
    })
  }

  return request.get<PaginationResponse<EmergencyEvent>>({
    url: '/safety/emergency-repair/list',
    params
  })
}

/**
 * 获取应急事件详情
 * @param id 事件ID
 * @returns 事件详情
 */
export function getEmergencyEventDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: EmergencyEvent }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockGetEmergencyEventDetail(id)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('事件不存在'))
        }
      }, 200)
    })
  }

  return request.get<EmergencyEvent>({
    url: `/safety/emergency-repair/${id}`
  })
}

/**
 * 事件初报
 * @param data 初报表单数据
 * @returns 新增的事件
 */
export function addInitialReport(data: InitialReportFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: EmergencyEvent }>((resolve) => {
      setTimeout(() => {
        const result = mockAddInitialReport(data)
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<EmergencyEvent>({
    url: '/safety/emergency-repair/initial-report',
    data
  })
}

/**
 * 事件续报
 * @param data 续报表单数据
 * @returns 更新后的事件
 */
export function addFollowUpReport(data: FollowUpReportFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: EmergencyEvent }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockAddFollowUpReport(data.eventId, data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('事件不存在'))
        }
      }, 300)
    })
  }

  return request.post<EmergencyEvent>({
    url: '/safety/emergency-repair/follow-up-report',
    data
  })
}

/**
 * 事件终报
 * @param data 终报表单数据
 * @returns 更新后的事件
 */
export function addFinalReport(data: FinalReportFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: EmergencyEvent }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockAddFinalReport(data.eventId, data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('事件不存在'))
        }
      }, 300)
    })
  }

  return request.post<EmergencyEvent>({
    url: '/safety/emergency-repair/final-report',
    data
  })
}

/**
 * 获取操作日志列表
 * @param eventId 事件ID
 * @returns 日志列表
 */
export function getOperationLogs(eventId: number) {
  if (USE_MOCK) {
    return new Promise<{ data: OperationLog[] }>((resolve) => {
      setTimeout(() => {
        const result = mockGetOperationLogs(eventId)
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<OperationLog[]>({
    url: '/safety/emergency-repair/operation-logs',
    params: { eventId }
  })
}

/**
 * 批量导出应急事件
 * @param ids 事件ID列表（不传则导出全部）
 * @returns Blob数据
 */
export function exportEmergencyEvents(ids?: number[]) {
  return request.get<Blob>({
    url: '/safety/emergency-repair/export',
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
        const blob = new Blob(['应急抢修事件导入模板（Mock）'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        resolve(blob)
      }, 200)
    })
  }

  return request.get<Blob>({
    url: '/safety/emergency-repair/import-template',
    responseType: 'blob'
  })
}

/**
 * 批量导入应急事件
 * @param file Excel文件
 * @returns 导入结果
 */
export function importEmergencyEvents(file: File) {
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
    url: '/safety/emergency-repair/import',
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
    url: '/safety/emergency-repair/stations'
  })
}
