/**
 * 应急抢修管理类型定义
 */

/**
 * 事件状态枚举
 */
export enum EmergencyEventStatus {
  /** 进行中 */
  IN_PROGRESS = 'in_progress',
  /** 已结束 */
  ENDED = 'ended'
}

/**
 * 事件类型枚举
 */
export enum EmergencyEventType {
  /** 管网破裂 */
  PIPE_BURST = 'pipe_burst',
  /** 管网塌陷 */
  PIPE_COLLAPSE = 'pipe_collapse',
  /** 管网堵塞 */
  PIPE_BLOCKAGE = 'pipe_blockage',
  /** 冒溢 */
  OVERFLOW = 'overflow',
  /** 第三方施工破坏 */
  THIRD_PARTY_DAMAGE = 'third_party_damage',
  /** 设备故障 */
  EQUIPMENT_FAILURE = 'equipment_failure',
  /** 停电停水 */
  POWER_WATER_OUTAGE = 'power_water_outage',
  /** 生化系统崩溃 */
  BIOCHEMICAL_COLLAPSE = 'biochemical_collapse',
  /** 有毒有害物冲击 */
  TOXIC_IMPACT = 'toxic_impact',
  /** 火灾爆炸 */
  FIRE_EXPLOSION = 'fire_explosion',
  /** 人员中毒 */
  PERSONNEL_POISONING = 'personnel_poisoning'
}

/**
 * 抢修处置进展枚举
 */
export enum RepairProgress {
  /** 处置完成 */
  COMPLETED = 'completed',
  /** 持续处置中 */
  ONGOING = 'ongoing'
}

/**
 * 根本原因类型
 */
export enum RootCauseType {
  /** 技术原因 */
  TECHNICAL = 'technical',
  /** 管理原因 */
  MANAGEMENT = 'management',
  /** 自然/外部原因 */
  EXTERNAL = 'external'
}

/**
 * 根本原因子类型
 */
export enum RootCauseSubType {
  /** 管道老化腐蚀 */
  PIPE_AGING = 'pipe_aging',
  /** 设备选型不当 */
  EQUIPMENT_SELECTION = 'equipment_selection',
  /** 维护不到位 */
  MAINTENANCE_ISSUE = 'maintenance_issue',
  /** 巡检疏漏 */
  INSPECTION_NEGLECT = 'inspection_neglect',
  /** 应急预案不完善 */
  PLAN_DEFICIENCY = 'plan_deficiency',
  /** 第三方施工监管缺失 */
  THIRD_PARTY_SUPERVISION = 'third_party_supervision',
  /** 极端天气 */
  EXTREME_WEATHER = 'extreme_weather',
  /** 不可抗力 */
  FORCE_MAJEURE = 'force_majeure',
  /** 恶意破坏 */
  MALICIOUS_DAMAGE = 'malicious_damage'
}

/**
 * 应急事件接口
 */
export interface EmergencyEvent {
  /** 事件ID */
  id: number
  /** 所属单位ID */
  stationId: number
  /** 所属单位名称 */
  stationName: string
  /** 事件类型 */
  eventType: EmergencyEventType
  /** 事件类型名称 */
  eventTypeName: string
  /** 发生时间 */
  occurrenceTime: string
  /** 地点/部位 */
  location: string
  /** 核心不良影响 */
  adverseEffect?: string
  /** 初步处置措施 */
  preliminaryMeasures?: string
  /** 初报图片 */
  initialImages?: string[]
  /** 事件状态 */
  status: EmergencyEventStatus
  /** 提交人 */
  submitter: string
  /** 提交时间 */
  submitTime: string
  /** 续报记录列表 */
  followUpReports?: FollowUpReport[]
  /** 终报信息 */
  finalReport?: FinalReport
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/**
 * 续报记录接口
 */
export interface FollowUpReport {
  /** 记录ID */
  id: number
  /** 事件ID */
  eventId: number
  /** 抢修处置进展 */
  repairProgress: RepairProgress
  /** 抢修处置进展名称 */
  repairProgressName: string
  /** 处置过程描述 */
  processDescription: string
  /** 处置过程照片 */
  processImages?: string[]
  /** 续报人 */
  reporter: string
  /** 续报时间 */
  reportTime: string
}

/**
 * 终报信息接口
 */
export interface FinalReport {
  /** 记录ID */
  id: number
  /** 事件ID */
  eventId: number
  /** 根本原因类型 */
  rootCauseType: RootCauseType
  /** 根本原因类型名称 */
  rootCauseTypeName: string
  /** 根本原因子类型 */
  rootCauseSubType: RootCauseSubType
  /** 根本原因子类型名称 */
  rootCauseSubTypeName: string
  /** 最终处置措施 */
  finalMeasures: string
  /** 附件 */
  attachments?: string[]
  /** 终报人 */
  finalReporter: string
  /** 终报时间 */
  finalReportTime: string
}

/**
 * 操作日志接口
 */
export interface OperationLog {
  /** 日志ID */
  id: number
  /** 事件ID */
  eventId: number
  /** 操作人 */
  operator: string
  /** 操作时间 */
  operationTime: string
  /** 操作类型 */
  operationType: 'initial' | 'follow_up' | 'final'
  /** 操作类型名称 */
  operationTypeName: string
  /** 操作内容 */
  content?: string
}

/**
 * 应急事件查询参数
 */
export interface EmergencyEventQueryParams {
  /** 所属单位ID */
  stationId?: number
  /** 事件类型 */
  eventType?: EmergencyEventType
  /** 事件状态 */
  status?: EmergencyEventStatus
  /** 发生月份 */
  occurrenceMonth?: string
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 初报事件表单数据
 */
export interface InitialReportFormData {
  /** 所属单位ID */
  stationId: number
  /** 事件类型 */
  eventType: EmergencyEventType
  /** 地点/部位 */
  location: string
  /** 核心不良影响 */
  adverseEffect?: string
  /** 初步处置措施 */
  preliminaryMeasures?: string
  /** 初报图片 */
  initialImages?: string[]
}

/**
 * 续报事件表单数据
 */
export interface FollowUpReportFormData {
  /** 事件ID */
  eventId: number
  /** 所属单位ID */
  stationId: number
  /** 事件类型 */
  eventType: EmergencyEventType
  /** 地点/部位 */
  location: string
  /** 核心不良影响 */
  adverseEffect?: string
  /** 初步处置措施 */
  preliminaryMeasures?: string
  /** 初报图片 */
  initialImages?: string[]
  /** 抢修处置进展 */
  repairProgress: RepairProgress
  /** 处置过程描述 */
  processDescription: string
  /** 处置过程照片 */
  processImages?: string[]
}

/**
 * 终报事件表单数据
 */
export interface FinalReportFormData {
  /** 事件ID */
  eventId: number
  /** 所属单位ID */
  stationId: number
  /** 事件类型 */
  eventType: EmergencyEventType
  /** 地点/部位 */
  location: string
  /** 核心不良影响 */
  adverseEffect?: string
  /** 初步处置措施 */
  preliminaryMeasures?: string
  /** 初报图片 */
  initialImages?: string[]
  /** 抢修处置进展 */
  repairProgress: RepairProgress
  /** 处置过程描述 */
  processDescription: string
  /** 处置过程照片 */
  processImages?: string[]
  /** 根本原因类型 */
  rootCauseType: RootCauseType
  /** 根本原因子类型 */
  rootCauseSubType: RootCauseSubType
  /** 最终处置措施 */
  finalMeasures: string
  /** 附件 */
  attachments?: string[]
}

/**
 * 批量导入结果
 */
export interface ImportResult {
  /** 成功数量 */
  successCount: number
  /** 失败数量 */
  failCount: number
  /** 失败详情 */
  failDetails?: Array<{
    row: number
    message: string
  }>
}

/**
 * 事件类型选项
 */
export const EVENT_TYPE_OPTIONS = [
  { label: '管网破裂', value: EmergencyEventType.PIPE_BURST },
  { label: '管网塌陷', value: EmergencyEventType.PIPE_COLLAPSE },
  { label: '管网堵塞', value: EmergencyEventType.PIPE_BLOCKAGE },
  { label: '冒溢', value: EmergencyEventType.OVERFLOW },
  { label: '第三方施工破坏', value: EmergencyEventType.THIRD_PARTY_DAMAGE },
  { label: '设备故障', value: EmergencyEventType.EQUIPMENT_FAILURE },
  { label: '停电停水', value: EmergencyEventType.POWER_WATER_OUTAGE },
  { label: '生化系统崩溃', value: EmergencyEventType.BIOCHEMICAL_COLLAPSE },
  { label: '有毒有害物冲击', value: EmergencyEventType.TOXIC_IMPACT },
  { label: '火灾爆炸', value: EmergencyEventType.FIRE_EXPLOSION },
  { label: '人员中毒', value: EmergencyEventType.PERSONNEL_POISONING }
]

/**
 * 抢修处置进展选项
 */
export const REPAIR_PROGRESS_OPTIONS = [
  { label: '处置完成', value: RepairProgress.COMPLETED },
  { label: '持续处置中', value: RepairProgress.ONGOING }
]

/**
 * 根本原因级联选项
 */
export const ROOT_CAUSE_CASCADER_OPTIONS = [
  {
    label: '技术原因',
    value: RootCauseType.TECHNICAL,
    children: [
      { label: '管道老化腐蚀', value: RootCauseSubType.PIPE_AGING },
      { label: '设备选型不当', value: RootCauseSubType.EQUIPMENT_SELECTION },
      { label: '维护不到位', value: RootCauseSubType.MAINTENANCE_ISSUE }
    ]
  },
  {
    label: '管理原因',
    value: RootCauseType.MANAGEMENT,
    children: [
      { label: '巡检疏漏', value: RootCauseSubType.INSPECTION_NEGLECT },
      { label: '应急预案不完善', value: RootCauseSubType.PLAN_DEFICIENCY },
      { label: '第三方施工监管缺失', value: RootCauseSubType.THIRD_PARTY_SUPERVISION }
    ]
  },
  {
    label: '自然/外部原因',
    value: RootCauseType.EXTERNAL,
    children: [
      { label: '极端天气', value: RootCauseSubType.EXTREME_WEATHER },
      { label: '不可抗力', value: RootCauseSubType.FORCE_MAJEURE },
      { label: '恶意破坏', value: RootCauseSubType.MALICIOUS_DAMAGE }
    ]
  }
]
