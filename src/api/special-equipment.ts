import request from '@/utils/http'
import {
  mockGetSpecialEquipmentList,
  mockGetSpecialEquipmentDetail,
  mockUpdateSpecialEquipment,
  mockGetInspectionRecordList,
  mockAddInspectionRecord,
  mockGetStationList
} from '@/mock/special-equipment'
import type {
  SpecialEquipment,
  SpecialEquipmentQueryParams,
  SpecialEquipmentFormData,
  InspectionRecord,
  InspectionRecordFormData,
  ImportResult
} from '@/types/special-equipment'
import type { PaginationResponse } from '@/types/api'

// 是否使用 Mock 模式
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * 获取特种设备列表
 * @param params 查询参数
 * @returns 分页列表
 */
export function getSpecialEquipmentList(params: SpecialEquipmentQueryParams) {
  if (USE_MOCK) {
    return new Promise<{ data: PaginationResponse<SpecialEquipment> }>((resolve) => {
      setTimeout(() => {
        const result = mockGetSpecialEquipmentList(
          params.page,
          params.pageSize,
          params.stationId,
          params.keyword,
          params.verificationStatus,
          params.usageStatus
        )
        resolve({ data: result })
      }, 300)
    })
  }

  return request.get<PaginationResponse<SpecialEquipment>>({
    url: '/safety/special-equipment/list',
    params
  })
}

/**
 * 获取特种设备详情
 * @param id 设备ID
 * @returns 设备详情
 */
export function getSpecialEquipmentDetail(id: number) {
  if (USE_MOCK) {
    return new Promise<{ data: SpecialEquipment }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockGetSpecialEquipmentDetail(id)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('设备不存在'))
        }
      }, 200)
    })
  }

  return request.get<SpecialEquipment>({
    url: `/safety/special-equipment/${id}`
  })
}

/**
 * 更新特种设备信息
 * @param data 表单数据
 * @returns 更新后的设备
 */
export function updateSpecialEquipment(data: SpecialEquipmentFormData) {
  if (USE_MOCK) {
    return new Promise<{ data: SpecialEquipment }>((resolve, reject) => {
      setTimeout(() => {
        const result = mockUpdateSpecialEquipment(data.id!, data)
        if (result) {
          resolve({ data: result })
        } else {
          reject(new Error('更新失败'))
        }
      }, 300)
    })
  }

  return request.put<SpecialEquipment>({
    url: '/safety/special-equipment',
    data
  })
}

/**
 * 获取校验记录列表
 * @param equipmentId 设备ID
 * @returns 校验记录列表
 */
export function getInspectionRecordList(equipmentId: number) {
  if (USE_MOCK) {
    return new Promise<{ data: InspectionRecord[] }>((resolve) => {
      setTimeout(() => {
        const result = mockGetInspectionRecordList(equipmentId)
        resolve({ data: result })
      }, 200)
    })
  }

  return request.get<InspectionRecord[]>({
    url: '/safety/special-equipment/inspection-records',
    params: { equipmentId }
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
        const result = mockAddInspectionRecord(data.equipmentId, {
          inspectionDate: data.inspectionDate,
          inspectionOrg: data.inspectionOrg,
          inspectionResult: data.inspectionResult,
          attachments: data.attachments,
          createBy: '当前用户'
        })
        resolve({ data: result })
      }, 300)
    })
  }

  return request.post<InspectionRecord>({
    url: '/safety/special-equipment/inspection-record',
    data
  })
}

/**
 * 批量导出特种设备
 * @param ids 设备ID列表（不传则导出全部）
 * @returns Blob数据
 */
export function exportSpecialEquipment(ids?: number[]) {
  return request.get<Blob>({
    url: '/safety/special-equipment/export',
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
    // Mock 模式下返回一个空的 Blob
    return new Promise<Blob>((resolve) => {
      setTimeout(() => {
        const blob = new Blob(['特种设备导入模板（Mock）'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        resolve(blob)
      }, 200)
    })
  }

  return request.get<Blob>({
    url: '/safety/special-equipment/import-template',
    responseType: 'blob'
  })
}

/**
 * 批量导入特种设备
 * @param file Excel文件
 * @returns 导入结果
 */
export function importSpecialEquipment(file: File) {
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
    url: '/safety/special-equipment/import',
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
    url: '/safety/special-equipment/stations'
  })
}
