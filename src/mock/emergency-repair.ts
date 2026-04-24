import type {
  EmergencyEvent,
  EmergencyEventStatus,
  EmergencyEventType,
  RepairProgress,
  RootCauseType,
  RootCauseSubType,
  InitialReportFormData,
  FollowUpReportFormData,
  FinalReportFormData,
  OperationLog
} from '@/types/emergency-repair'

// 事件类型名称映射
const eventTypeNameMap: Record<EmergencyEventType, string> = {
  pipe_burst: '管网破裂',
  pipe_collapse: '管网塌陷',
  pipe_blockage: '管网堵塞',
  overflow: '冒溢',
  third_party_damage: '第三方施工破坏',
  equipment_failure: '设备故障',
  power_water_outage: '停电停水',
  biochemical_collapse: '生化系统崩溃',
  toxic_impact: '有毒有害物冲击',
  fire_explosion: '火灾爆炸',
  personnel_poisoning: '人员中毒'
}

// 状态名称映射
const statusNameMap: Record<EmergencyEventStatus, string> = {
  in_progress: '进行中',
  ended: '已结束'
}

// 抢修处置进展名称映射
const repairProgressNameMap: Record<RepairProgress, string> = {
  completed: '处置完成',
  ongoing: '持续处置中'
}

// 根本原因类型名称映射
const rootCauseTypeNameMap: Record<RootCauseType, string> = {
  technical: '技术原因',
  management: '管理原因',
  external: '自然/外部原因'
}

// 根本原因子类型名称映射
const rootCauseSubTypeNameMap: Record<RootCauseSubType, string> = {
  pipe_aging: '管道老化腐蚀',
  equipment_selection: '设备选型不当',
  maintenance_issue: '维护不到位',
  inspection_neglect: '巡检疏漏',
  plan_deficiency: '应急预案不完善',
  third_party_supervision: '第三方施工监管缺失',
  extreme_weather: '极端天气',
  force_majeure: '不可抗力',
  malicious_damage: '恶意破坏'
}

// 模拟数据存储
let mockEvents: EmergencyEvent[] = []
let mockFollowUpReports: Map<number, EmergencyEvent['followUpReports']> = new Map()
let mockFinalReports: Map<number, EmergencyEvent['finalReport']> = new Map()
let mockLogs: Map<number, OperationLog[]> = new Map()
let nextId = 1

// 初始化模拟数据
function initMockData() {
  const stations = ['第一污水处理厂', '第二污水处理厂', '第三污水处理厂', '泵站A', '泵站B']
  const eventTypes: EmergencyEventType[] = ['pipe_burst', 'equipment_failure', 'overflow', 'fire_explosion', 'power_water_outage']
  const locations = ['进水泵房', '曝气池', '二沉池', '出水口', '管网节点A', '配电室', '污泥处理车间']

  for (let i = 0; i < 25; i++) {
    const id = nextId++
    const stationName = stations[i % stations.length]
    const eventType = eventTypes[i % eventTypes.length]
    const status: EmergencyEventStatus = i < 15 ? 'in_progress' : 'ended'
    const createTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')

    const event: EmergencyEvent = {
      id,
      stationId: (i % stations.length) + 1,
      stationName,
      eventType,
      eventTypeName: eventTypeNameMap[eventType],
      occurrenceTime: createTime,
      location: locations[i % locations.length],
      adverseEffect: i % 2 === 0 ? '影响周边居民用水' : undefined,
      preliminaryMeasures: i % 2 === 0 ? '已启动应急预案，组织抢修' : undefined,
      initialImages: i % 3 === 0 ? ['image1.jpg', 'image2.jpg'] : undefined,
      status,
      submitter: `用户${(i % 5) + 1}`,
      submitTime: createTime,
      createTime,
      updateTime: createTime
    }

    mockEvents.push(event)

    // 添加续报记录
    if (i < 10) {
      const followUpReports = [{
        id: i + 1,
        eventId: id,
        repairProgress: 'ongoing' as RepairProgress,
        repairProgressName: repairProgressNameMap.ongoing,
        processDescription: '正在组织抢修，预计2小时内完成',
        processImages: ['process1.jpg'],
        reporter: `抢修人员${(i % 3) + 1}`,
        reportTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
      }]
      mockFollowUpReports.set(id, followUpReports)
      event.followUpReports = followUpReports
    }

    // 添加终报记录
    if (i >= 15) {
      const finalReport = {
        id: i + 1,
        eventId: id,
        rootCauseType: 'technical' as RootCauseType,
        rootCauseTypeName: rootCauseTypeNameMap.technical,
        rootCauseSubType: 'pipe_aging' as RootCauseSubType,
        rootCauseSubTypeName: rootCauseSubTypeNameMap.pipe_aging,
        finalMeasures: '更换老化管道，加强巡检',
        attachments: ['final1.jpg'],
        finalReporter: `终报人员${(i % 3) + 1}`,
        finalReportTime: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
      }
      mockFinalReports.set(id, finalReport)
      event.finalReport = finalReport
    }

    // 添加操作日志
    const logs: OperationLog[] = [
      {
        id: 1,
        eventId: id,
        operator: event.submitter,
        operationTime: event.submitTime,
        operationType: 'initial',
        operationTypeName: '初报'
      }
    ]
    if (event.followUpReports) {
      event.followUpReports.forEach((report, index) => {
        logs.push({
          id: logs.length + 1,
          eventId: id,
          operator: report.reporter,
          operationTime: report.reportTime,
          operationType: 'follow_up',
          operationTypeName: '续报'
        })
      })
    }
    if (event.finalReport) {
      logs.push({
        id: logs.length + 1,
        eventId: id,
        operator: event.finalReport.finalReporter,
        operationTime: event.finalReport.finalReportTime,
        operationType: 'final',
        operationTypeName: '终报'
      })
    }
    mockLogs.set(id, logs)
  }
}

// 初始化数据
initMockData()

/**
 * 获取应急事件列表
 */
export function mockGetEmergencyEventList(
  page: number,
  pageSize: number,
  stationId?: number,
  eventType?: EmergencyEventType,
  status?: EmergencyEventStatus,
  occurrenceMonth?: string
) {
  let list = [...mockEvents]

  // 筛选
  if (stationId) {
    list = list.filter(item => item.stationId === stationId)
  }
  if (eventType) {
    list = list.filter(item => item.eventType === eventType)
  }
  if (status) {
    list = list.filter(item => item.status === status)
  }
  if (occurrenceMonth) {
    list = list.filter(item => item.occurrenceTime.startsWith(occurrenceMonth))
  }

  // 按时间倒序
  list.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())

  // 分页
  const total = list.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageList = list.slice(start, end)

  return {
    list: pageList,
    total,
    page,
    pageSize
  }
}

/**
 * 获取应急事件详情
 */
export function mockGetEmergencyEventDetail(id: number): EmergencyEvent | undefined {
  const event = mockEvents.find(item => item.id === id)
  if (event) {
    // 加载续报和终报记录
    event.followUpReports = mockFollowUpReports.get(id)
    event.finalReport = mockFinalReports.get(id)
  }
  return event
}

/**
 * 事件初报
 */
export function mockAddInitialReport(data: InitialReportFormData): EmergencyEvent {
  const id = nextId++
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const event: EmergencyEvent = {
    id,
    stationId: data.stationId,
    stationName: getStationNameById(data.stationId),
    eventType: data.eventType,
    eventTypeName: eventTypeNameMap[data.eventType],
    occurrenceTime: now,
    location: data.location,
    adverseEffect: data.adverseEffect,
    preliminaryMeasures: data.preliminaryMeasures,
    initialImages: data.initialImages,
    status: 'in_progress',
    submitter: '当前用户',
    submitTime: now,
    createTime: now,
    updateTime: now
  }

  mockEvents.push(event)

  // 添加初报日志
  mockLogs.set(id, [{
    id: 1,
    eventId: id,
    operator: event.submitter,
    operationTime: now,
    operationType: 'initial',
    operationTypeName: '初报'
  }])

  return event
}

/**
 * 事件续报
 */
export function mockAddFollowUpReport(eventId: number, data: FollowUpReportFormData): EmergencyEvent | undefined {
  const event = mockEvents.find(item => item.id === eventId)
  if (!event) return undefined

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

  // 更新事件基本信息
  event.stationId = data.stationId
  event.stationName = getStationNameById(data.stationId)
  event.eventType = data.eventType
  event.eventTypeName = eventTypeNameMap[data.eventType]
  event.location = data.location
  event.adverseEffect = data.adverseEffect
  event.preliminaryMeasures = data.preliminaryMeasures
  event.initialImages = data.initialImages
  event.updateTime = now

  // 添加续报记录
  const followUpReport = {
    id: Date.now(),
    eventId,
    repairProgress: data.repairProgress,
    repairProgressName: repairProgressNameMap[data.repairProgress],
    processDescription: data.processDescription,
    processImages: data.processImages,
    reporter: '当前用户',
    reportTime: now
  }

  const existingReports = mockFollowUpReports.get(eventId) || []
  existingReports.push(followUpReport)
  mockFollowUpReports.set(eventId, existingReports)
  event.followUpReports = existingReports

  // 如果处置完成，更新状态为已结束
  if (data.repairProgress === 'completed') {
    event.status = 'ended'
  }

  // 添加续报日志
  const logs = mockLogs.get(eventId) || []
  logs.push({
    id: logs.length + 1,
    eventId,
    operator: followUpReport.reporter,
    operationTime: now,
    operationType: 'follow_up',
    operationTypeName: '续报'
  })
  mockLogs.set(eventId, logs)

  return event
}

/**
 * 事件终报
 */
export function mockAddFinalReport(eventId: number, data: FinalReportFormData): EmergencyEvent | undefined {
  const event = mockEvents.find(item => item.id === eventId)
  if (!event) return undefined

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

  // 更新事件基本信息
  event.stationId = data.stationId
  event.stationName = getStationNameById(data.stationId)
  event.eventType = data.eventType
  event.eventTypeName = eventTypeNameMap[data.eventType]
  event.location = data.location
  event.adverseEffect = data.adverseEffect
  event.preliminaryMeasures = data.preliminaryMeasures
  event.initialImages = data.initialImages
  event.status = 'ended'
  event.updateTime = now

  // 添加/更新续报记录
  const followUpReport = {
    id: Date.now(),
    eventId,
    repairProgress: data.repairProgress,
    repairProgressName: repairProgressNameMap[data.repairProgress],
    processDescription: data.processDescription,
    processImages: data.processImages,
    reporter: '当前用户',
    reportTime: now
  }

  const existingReports = mockFollowUpReports.get(eventId) || []
  existingReports.push(followUpReport)
  mockFollowUpReports.set(eventId, existingReports)
  event.followUpReports = existingReports

  // 添加终报记录
  const finalReport = {
    id: Date.now(),
    eventId,
    rootCauseType: data.rootCauseType,
    rootCauseTypeName: rootCauseTypeNameMap[data.rootCauseType],
    rootCauseSubType: data.rootCauseSubType,
    rootCauseSubTypeName: rootCauseSubTypeNameMap[data.rootCauseSubType],
    finalMeasures: data.finalMeasures,
    attachments: data.attachments,
    finalReporter: '当前用户',
    finalReportTime: now
  }

  mockFinalReports.set(eventId, finalReport)
  event.finalReport = finalReport

  // 添加终报日志
  const logs = mockLogs.get(eventId) || []
  logs.push({
    id: logs.length + 1,
    eventId,
    operator: finalReport.finalReporter,
    operationTime: now,
    operationType: 'final',
    operationTypeName: '终报'
  })
  mockLogs.set(eventId, logs)

  return event
}

/**
 * 获取操作日志列表
 */
export function mockGetOperationLogs(eventId: number): OperationLog[] {
  return mockLogs.get(eventId) || []
}

/**
 * 获取厂站列表
 */
export function mockGetStationList(): Array<{ id: number; name: string }> {
  return [
    { id: 1, name: '第一污水处理厂' },
    { id: 2, name: '第二污水处理厂' },
    { id: 3, name: '第三污水处理厂' },
    { id: 4, name: '泵站A' },
    { id: 5, name: '泵站B' }
  ]
}

/**
 * 根据ID获取厂站名称
 */
function getStationNameById(id: number): string {
  const station = mockGetStationList().find(item => item.id === id)
  return station?.name || '未知厂站'
}
