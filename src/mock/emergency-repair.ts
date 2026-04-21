/**
 * 应急抢修管理 - Mock 数据
 */
import type {
  EmergencyRepairItem,
  EmergencyRepairListParams,
  InitialReportForm,
  ContinuationReportForm,
  FinalReportForm,
  ContinuationRecord,
  ModificationLog,
  OperationLog
} from '@/types/emergency-repair'

/** Mock 数据存储 */
let items: EmergencyRepairItem[] = [
  {
    id: 1,
    belongingUnit: '一期污水处理厂',
    eventType: 'pipe_burst',
    submitter: '张三',
    submitTime: '2024-03-15 09:30:00',
    location: '厂区主干道DN800输水管道',
    adverseEffect: '导致厂区部分区域停水，影响生产运行',
    preliminaryMeasures: '立即关闭相关阀门，组织抢修队伍进场',
    initialPhotos: [],
    status: 'ended',
    continuationRecords: [
      {
        id: 1,
        emergencyId: 1,
        repairProgress: 'completed',
        processDescription: '已完成管道修复，恢复正常供水',
        processPhotos: [],
        reporter: '李四',
        reportTime: '2024-03-15 14:00:00',
        createTime: '2024-03-15 14:00:00'
      }
    ],
    rootCauseType: 'technical',
    rootCauseOption: 'pipe_aging_corrosion',
    finalMeasures: '更换老化管道段，加强日常巡检',
    finalAttachments: [],
    finalReporter: '王五',
    finalReportTime: '2024-03-15 16:00:00',
    operationLogs: [
      {
        id: 1,
        emergencyId: 1,
        operationType: 'initial',
        operator: '张三',
        operationTime: '2024-03-15 09:30:00',
        operationContent: '提交事件初报'
      },
      {
        id: 2,
        emergencyId: 1,
        operationType: 'continuation',
        operator: '李四',
        operationTime: '2024-03-15 14:00:00',
        operationContent: '提交事件续报，处置进展：处置完成'
      },
      {
        id: 3,
        emergencyId: 1,
        operationType: 'final',
        operator: '王五',
        operationTime: '2024-03-15 16:00:00',
        operationContent: '提交事件终报'
      }
    ],
    modificationLogs: [],
    createTime: '2024-03-15 09:30:00',
    updateTime: '2024-03-15 16:00:00'
  },
  {
    id: 2,
    belongingUnit: '二期污水处理厂',
    eventType: 'equipment_failure',
    submitter: '赵六',
    submitTime: '2024-03-20 10:00:00',
    location: '2号鼓风机房',
    adverseEffect: '生化池曝气不足',
    preliminaryMeasures: '启用备用鼓风机，联系维修人员',
    initialPhotos: [],
    status: 'in_progress',
    continuationRecords: [
      {
        id: 2,
        emergencyId: 2,
        repairProgress: 'ongoing',
        processDescription: '正在拆卸故障设备，等待配件到货',
        processPhotos: [],
        reporter: '赵六',
        reportTime: '2024-03-20 15:00:00',
        createTime: '2024-03-20 15:00:00'
      }
    ],
    finalAttachments: [],
    operationLogs: [
      {
        id: 4,
        emergencyId: 2,
        operationType: 'initial',
        operator: '赵六',
        operationTime: '2024-03-20 10:00:00',
        operationContent: '提交事件初报'
      },
      {
        id: 5,
        emergencyId: 2,
        operationType: 'continuation',
        operator: '赵六',
        operationTime: '2024-03-20 15:00:00',
        operationContent: '提交事件续报，处置进展：持续处置中'
      }
    ],
    modificationLogs: [],
    createTime: '2024-03-20 10:00:00',
    updateTime: '2024-03-20 15:00:00'
  },
  {
    id: 3,
    belongingUnit: '泵站',
    eventType: 'power_outage',
    submitter: '孙七',
    submitTime: '2024-03-22 08:00:00',
    location: '1号泵站',
    preliminaryMeasures: '启动柴油发电机，保证基本运行',
    initialPhotos: [],
    status: 'ended',
    continuationRecords: [
      {
        id: 3,
        emergencyId: 3,
        repairProgress: 'completed',
        processDescription: '市电已恢复，设备运行正常',
        processPhotos: [],
        reporter: '孙七',
        reportTime: '2024-03-22 10:30:00',
        createTime: '2024-03-22 10:30:00'
      }
    ],
    rootCauseType: 'natural_external',
    rootCauseOption: 'extreme_weather',
    finalMeasures: '检查备用电源系统，确保应急状态下正常运行',
    finalAttachments: [],
    finalReporter: '孙七',
    finalReportTime: '2024-03-22 11:00:00',
    operationLogs: [
      {
        id: 6,
        emergencyId: 3,
        operationType: 'initial',
        operator: '孙七',
        operationTime: '2024-03-22 08:00:00',
        operationContent: '提交事件初报'
      },
      {
        id: 7,
        emergencyId: 3,
        operationType: 'final',
        operator: '孙七',
        operationTime: '2024-03-22 11:00:00',
        operationContent: '提交事件终报（通过续报转终报）'
      }
    ],
    modificationLogs: [],
    createTime: '2024-03-22 08:00:00',
    updateTime: '2024-03-22 11:00:00'
  }
]

let nextId = 4
let nextContinuationId = 4
let nextLogId = 1
let nextOperationLogId = 8

/** 事件类型映射 */
const eventTypeMap: Record<string, string> = {
  pipe_burst: '管网破裂',
  pipe_collapse: '管网塌陷',
  pipe_blockage: '管网堵塞',
  overflow: '冒溢',
  third_party_damage: '第三方施工破坏',
  equipment_failure: '设备故障',
  power_outage: '停电停水',
  biological_collapse: '生化系统崩溃',
  toxic_shock: '有毒有害物冲击',
  fire_explosion: '火灾爆炸',
  personnel_poisoning: '人员中毒'
}

/** 事件状态映射 */
const statusMap: Record<string, string> = {
  in_progress: '进行中',
  ended: '已结束'
}

/**
 * 获取列表 Mock 函数
 */
export function getEmergencyRepairListMock(params: EmergencyRepairListParams) {
  const { belongingUnit, eventType, status, month, page = 1, pageSize = 20 } = params
  let filteredData = [...items]

  if (belongingUnit) {
    filteredData = filteredData.filter((item) => item.belongingUnit.includes(belongingUnit))
  }
  if (eventType) {
    filteredData = filteredData.filter((item) => item.eventType === eventType)
  }
  if (status) {
    filteredData = filteredData.filter((item) => item.status === status)
  }
  if (month) {
    filteredData = filteredData.filter((item) => item.submitTime.startsWith(month))
  }

  const start = (page - 1) * pageSize
  const end = start + Number(pageSize)
  const list = filteredData.slice(start, end)

  return {
    list,
    total: filteredData.length
  }
}

/**
 * 获取详情 Mock 函数
 */
export function getEmergencyRepairDetailMock(id: number): EmergencyRepairItem | null {
  return items.find((item) => item.id === id) || null
}

/**
 * 初报 Mock 函数
 */
export function initialReportMock(data: InitialReportForm & { submitter: string }) {
  const now = new Date().toLocaleString('zh-CN')
  const newItem: EmergencyRepairItem = {
    id: nextId++,
    belongingUnit: data.belongingUnit,
    eventType: data.eventType,
    submitter: data.submitter,
    submitTime: now,
    location: data.location,
    adverseEffect: data.adverseEffect || '',
    preliminaryMeasures: data.preliminaryMeasures || '',
    initialPhotos: data.photos || [],
    status: 'in_progress',
    continuationRecords: [],
    finalAttachments: [],
    operationLogs: [
      {
        id: nextOperationLogId++,
        emergencyId: nextId - 1,
        operationType: 'initial',
        operator: data.submitter,
        operationTime: now,
        operationContent: '提交事件初报'
      }
    ],
    modificationLogs: [],
    createTime: now,
    updateTime: now
  }
  items.unshift(newItem)
  return newItem
}

/**
 * 续报 Mock 函数
 * 如果抢修处置进展选择为处置完成，则事件状态变为已结束，并直接填写终报信息
 */
export function continuationReportMock(data: ContinuationReportForm & { reporter: string }) {
  const now = new Date().toLocaleString('zh-CN')
  const item = items.find((i) => i.id === data.emergencyId)

  if (!item) {
    throw new Error('应急事件不存在')
  }

  // 创建续报记录
  const continuationRecord: ContinuationRecord = {
    id: nextContinuationId++,
    emergencyId: data.emergencyId,
    repairProgress: data.repairProgress,
    processDescription: data.processDescription,
    processPhotos: data.processPhotos || [],
    reporter: data.reporter,
    reportTime: now,
    createTime: now
  }

  item.continuationRecords.push(continuationRecord)

  // 创建操作日志
  const operationLog: OperationLog = {
    id: nextOperationLogId++,
    emergencyId: data.emergencyId,
    operationType: 'continuation',
    operator: data.reporter,
    operationTime: now,
    operationContent: `提交事件续报，处置进展：${data.repairProgress === 'completed' ? '处置完成' : '持续处置中'}`
  }
  item.operationLogs.push(operationLog)

  // 记录修改日志
  const logs: ModificationLog[] = []
  if (data.location !== undefined && data.location !== item.location) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '地点/部位',
      oldValue: item.location,
      newValue: data.location,
      modifier: data.reporter,
      modifyTime: now
    })
    item.location = data.location
  }
  if (data.adverseEffect !== undefined && data.adverseEffect !== item.adverseEffect) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '核心不良影响',
      oldValue: item.adverseEffect || '',
      newValue: data.adverseEffect,
      modifier: data.reporter,
      modifyTime: now
    })
    item.adverseEffect = data.adverseEffect
  }
  if (data.preliminaryMeasures !== undefined && data.preliminaryMeasures !== item.preliminaryMeasures) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '初步处置措施',
      oldValue: item.preliminaryMeasures || '',
      newValue: data.preliminaryMeasures,
      modifier: data.reporter,
      modifyTime: now
    })
    item.preliminaryMeasures = data.preliminaryMeasures
  }
  if (data.initialPhotos !== undefined) {
    item.initialPhotos = data.initialPhotos
  }

  item.modificationLogs.push(...logs)

  // 更新状态
  if (data.repairProgress === 'completed') {
    item.status = 'ended'
  }

  item.updateTime = now
  return item
}

/**
 * 续报转终报 Mock 函数
 * 当续报时选择处置完成，直接填写终报信息
 */
export function continuationToFinalMock(data: FinalReportForm & { reporter: string }) {
  const now = new Date().toLocaleString('zh-CN')
  const item = items.find((i) => i.id === data.emergencyId)

  if (!item) {
    throw new Error('应急事件不存在')
  }

  // 创建续报记录（处置完成）
  const continuationRecord: ContinuationRecord = {
    id: nextContinuationId++,
    emergencyId: data.emergencyId,
    repairProgress: 'completed',
    processDescription: data.processDescription,
    processPhotos: data.processPhotos || [],
    reporter: data.reporter,
    reportTime: now,
    createTime: now
  }

  item.continuationRecords.push(continuationRecord)

  // 创建操作日志（标记为终报类型）
  const operationLog: OperationLog = {
    id: nextOperationLogId++,
    emergencyId: data.emergencyId,
    operationType: 'final',
    operator: data.reporter,
    operationTime: now,
    operationContent: '提交事件终报（通过续报转终报）'
  }
  item.operationLogs.push(operationLog)

  // 记录修改日志
  const logs: ModificationLog[] = []
  if (data.location !== undefined && data.location !== item.location) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '地点/部位',
      oldValue: item.location,
      newValue: data.location,
      modifier: data.reporter,
      modifyTime: now
    })
    item.location = data.location
  }
  if (data.adverseEffect !== undefined && data.adverseEffect !== item.adverseEffect) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '核心不良影响',
      oldValue: item.adverseEffect || '',
      newValue: data.adverseEffect,
      modifier: data.reporter,
      modifyTime: now
    })
    item.adverseEffect = data.adverseEffect
  }
  if (data.preliminaryMeasures !== undefined && data.preliminaryMeasures !== item.preliminaryMeasures) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '初步处置措施',
      oldValue: item.preliminaryMeasures || '',
      newValue: data.preliminaryMeasures,
      modifier: data.reporter,
      modifyTime: now
    })
    item.preliminaryMeasures = data.preliminaryMeasures
  }
  if (data.initialPhotos !== undefined) {
    item.initialPhotos = data.initialPhotos
  }

  item.modificationLogs.push(...logs)

  // 更新终报信息
  item.rootCauseType = data.rootCauseType
  item.rootCauseOption = data.rootCauseOption
  item.finalMeasures = data.finalMeasures
  item.finalAttachments = data.attachments || []
  item.finalReporter = data.reporter
  item.finalReportTime = now
  item.status = 'ended'
  item.updateTime = now

  return item
}

/**
 * 终报 Mock 函数
 */
export function finalReportMock(data: FinalReportForm & { finalReporter: string }) {
  const now = new Date().toLocaleString('zh-CN')
  const item = items.find((i) => i.id === data.emergencyId)

  if (!item) {
    throw new Error('应急事件不存在')
  }

  // 创建续报记录（终报包含续报信息）
  const continuationRecord: ContinuationRecord = {
    id: nextContinuationId++,
    emergencyId: data.emergencyId,
    repairProgress: 'completed',
    processDescription: data.processDescription,
    processPhotos: data.processPhotos || [],
    reporter: data.finalReporter,
    reportTime: now,
    createTime: now
  }

  item.continuationRecords.push(continuationRecord)

  // 创建操作日志
  const operationLog: OperationLog = {
    id: nextOperationLogId++,
    emergencyId: data.emergencyId,
    operationType: 'final',
    operator: data.finalReporter,
    operationTime: now,
    operationContent: '提交事件终报'
  }
  item.operationLogs.push(operationLog)

  // 记录修改日志
  const logs: ModificationLog[] = []
  if (data.location !== undefined && data.location !== item.location) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '地点/部位',
      oldValue: item.location,
      newValue: data.location,
      modifier: data.finalReporter,
      modifyTime: now
    })
    item.location = data.location
  }
  if (data.adverseEffect !== undefined && data.adverseEffect !== item.adverseEffect) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '核心不良影响',
      oldValue: item.adverseEffect || '',
      newValue: data.adverseEffect,
      modifier: data.finalReporter,
      modifyTime: now
    })
    item.adverseEffect = data.adverseEffect
  }
  if (data.preliminaryMeasures !== undefined && data.preliminaryMeasures !== item.preliminaryMeasures) {
    logs.push({
      id: nextLogId++,
      emergencyId: data.emergencyId,
      operationLogId: operationLog.id,
      fieldName: '初步处置措施',
      oldValue: item.preliminaryMeasures || '',
      newValue: data.preliminaryMeasures,
      modifier: data.finalReporter,
      modifyTime: now
    })
    item.preliminaryMeasures = data.preliminaryMeasures
  }
  if (data.initialPhotos !== undefined) {
    item.initialPhotos = data.initialPhotos
  }

  item.modificationLogs.push(...logs)

  // 更新终报信息
  item.rootCauseType = data.rootCauseType
  item.rootCauseOption = data.rootCauseOption
  item.finalMeasures = data.finalMeasures
  item.finalAttachments = data.attachments || []
  item.finalReporter = data.finalReporter
  item.finalReportTime = now
  item.status = 'ended'
  item.updateTime = now

  return item
}

/**
 * 删除 Mock 函数
 */
export function deleteEmergencyRepairMock(id: number) {
  const index = items.findIndex((item) => item.id === id)
  if (index !== -1) {
    items.splice(index, 1)
    return true
  }
  throw new Error('数据不存在')
}

/**
 * 批量删除 Mock 函数
 */
export function batchDeleteEmergencyRepairMock(ids: number[]) {
  items = items.filter((item) => !ids.includes(item.id))
  return true
}
