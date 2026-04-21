/**
 * 应急抢修管理 - API
 */
import request from '@/utils/http'
import type {
  EmergencyRepairItem,
  EmergencyRepairListParams,
  InitialReportForm,
  ContinuationReportForm,
  FinalReportForm
} from '@/types/emergency-repair'
import {
  getEmergencyRepairListMock,
  getEmergencyRepairDetailMock,
  initialReportMock,
  continuationReportMock,
  continuationToFinalMock,
  finalReportMock,
  deleteEmergencyRepairMock,
  batchDeleteEmergencyRepairMock
} from '@/mock/emergency-repair'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取应急抢修列表
 */
export function getEmergencyRepairList(params: EmergencyRepairListParams) {
  if (USE_MOCK) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const data = getEmergencyRepairListMock(params)
        resolve({
          code: 200,
          message: 'success',
          data
        })
      }, 300)
    })
  }

  return request.get<{
    list: EmergencyRepairItem[]
    total: number
  }>({
    url: '/admin/safety/emergency-repair/list',
    params
  })
}

/**
 * 获取应急事件详情
 */
export function getEmergencyRepairDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const data = getEmergencyRepairDetailMock(id)
        if (data) {
          resolve({
            code: 200,
            message: 'success',
            data
          })
        } else {
          reject({
            code: 404,
            message: '数据不存在'
          })
        }
      }, 300)
    })
  }

  return request.get<EmergencyRepairItem>({
    url: `/admin/safety/emergency-repair/detail/${id}`
  })
}

/**
 * 事件初报
 */
export function initialReport(data: InitialReportForm & { submitter: string }) {
  if (USE_MOCK) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const result = initialReportMock(data)
        resolve({
          code: 200,
          message: '初报成功',
          data: result
        })
      }, 300)
    })
  }

  return request.post({
    url: '/admin/safety/emergency-repair/initial-report',
    data
  })
}

/**
 * 事件续报
 */
export function continuationReport(data: ContinuationReportForm & { reporter: string }) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = continuationReportMock(data)
          resolve({
            code: 200,
            message: '续报成功',
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

  return request.post({
    url: '/admin/safety/emergency-repair/continuation-report',
    data
  })
}

/**
 * 续报转终报
 * 当续报时选择处置完成，直接填写终报信息
 */
export function continuationToFinal(data: FinalReportForm & { reporter: string }) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = continuationToFinalMock(data)
          resolve({
            code: 200,
            message: '终报成功',
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

  return request.post({
    url: '/admin/safety/emergency-repair/continuation-to-final',
    data
  })
}

/**
 * 事件终报
 */
export function finalReport(data: FinalReportForm & { finalReporter: string }) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = finalReportMock(data)
          resolve({
            code: 200,
            message: '终报成功',
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

  return request.post({
    url: '/admin/safety/emergency-repair/final-report',
    data
  })
}

/**
 * 删除应急事件
 */
export function deleteEmergencyRepair(id: number) {
  if (USE_MOCK) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          deleteEmergencyRepairMock(id)
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
    url: `/admin/safety/emergency-repair/delete/${id}`
  })
}

/**
 * 批量删除应急事件
 */
export function batchDeleteEmergencyRepair(ids: number[]) {
  if (USE_MOCK) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        batchDeleteEmergencyRepairMock(ids)
        resolve({
          code: 200,
          message: '批量删除成功'
        })
      }, 300)
    })
  }

  return request.post({
    url: '/admin/safety/emergency-repair/batch-delete',
    data: { ids }
  })
}

/**
 * 批量导出
 */
export function exportEmergencyRepair(params: EmergencyRepairListParams) {
  return request.get({
    url: '/admin/safety/emergency-repair/export',
    params,
    responseType: 'blob'
  })
}

/**
 * 批量导入
 */
export function importEmergencyRepair(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request.post({
    url: '/admin/safety/emergency-repair/import',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
