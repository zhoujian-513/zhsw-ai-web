/**
 * 应急抢修管理 - 类型定义
 */

/** 事件状态 */
export type EmergencyStatus = 'in_progress' | 'ended'

/** 事件类型 */
export type EmergencyType =
  | 'pipe_burst' // 管网破裂
  | 'pipe_collapse' // 管网塌陷
  | 'pipe_blockage' // 管网堵塞
  | 'overflow' // 冒溢
  | 'third_party_damage' // 第三方施工破坏
  | 'equipment_failure' // 设备故障
  | 'power_outage' // 停电停水
  | 'biological_collapse' // 生化系统崩溃
  | 'toxic_shock' // 有毒有害物冲击
  | 'fire_explosion' // 火灾爆炸
  | 'personnel_poisoning' // 人员中毒

/** 抢修处置进展 */
export type RepairProgress = 'ongoing' | 'completed'

/** 根本原因分析 - 一级分类 */
export type RootCauseType = 'technical' | 'management' | 'natural_external'

/** 根本原因分析 - 二级选项 */
export type RootCauseOption =
  | 'pipe_aging_corrosion' // 管道老化腐蚀
  | 'equipment_selection_improper' // 设备选型不当
  | 'maintenance_inadequate' // 维护不到位
  | 'inspection_negligence' // 巡检疏漏
  | 'emergency_plan_incomplete' // 应急预案不完善
  | 'third_party_supervision_missing' // 第三方施工监管缺失
  | 'extreme_weather' // 极端天气
  | 'force_majeure' // 不可抗力
  | 'malicious_damage' // 恶意破坏

/** 操作类型 */
export type OperationType = 'initial' | 'continuation' | 'final'

/** 续报记录 */
export interface ContinuationRecord {
  id: number
  emergencyId: number
  repairProgress: RepairProgress
  processDescription: string
  processPhotos: string[]
  reporter: string
  reportTime: string
  createTime: string
}

/** 操作日志 */
export interface OperationLog {
  id: number
  emergencyId: number
  /** 操作类型：初报、续报、终报 */
  operationType: OperationType
  /** 操作人 */
  operator: string
  /** 操作时间 */
  operationTime: string
  /** 操作内容描述 */
  operationContent?: string
}

/** 修改日志 */
export interface ModificationLog {
  id: number
  emergencyId: number
  /** 关联的操作日志ID */
  operationLogId?: number
  fieldName: string
  oldValue: string
  newValue: string
  modifier: string
  modifyTime: string
}

/** 应急事件数据项 */
export interface EmergencyRepairItem {
  /** 主键 */
  id: number
  /** 所属单位 */
  belongingUnit: string
  /** 事件类型 */
  eventType: EmergencyType
  /** 提交人 */
  submitter: string
  /** 提交时间 */
  submitTime: string
  /** 地点/部位 */
  location: string
  /** 核心不良影响 */
  adverseEffect?: string
  /** 初步处置措施 */
  preliminaryMeasures?: string
  /** 初报图片 */
  initialPhotos: string[]
  /** 事件状态 */
  status: EmergencyStatus
  /** 续报记录列表 */
  continuationRecords: ContinuationRecord[]
  /** 根本原因分析 - 一级 */
  rootCauseType?: RootCauseType
  /** 根本原因分析 - 二级 */
  rootCauseOption?: RootCauseOption
  /** 最终处置措施 */
  finalMeasures?: string
  /** 终报附件 */
  finalAttachments: string[]
  /** 终报人 */
  finalReporter?: string
  /** 终报时间 */
  finalReportTime?: string
  /** 操作日志 */
  operationLogs: OperationLog[]
  /** 修改日志 */
  modificationLogs: ModificationLog[]
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/**
 * 列表查询参数
 */
export interface EmergencyRepairListParams {
  /** 所属单位 */
  belongingUnit?: string
  /** 事件类型 */
  eventType?: EmergencyType
  /** 事件状态 */
  status?: EmergencyStatus
  /** 发生月份 */
  month?: string
  /** 当前页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 初报表单数据
 */
export interface InitialReportForm {
  belongingUnit: string
  eventType: EmergencyType
  location: string
  adverseEffect?: string
  preliminaryMeasures?: string
  photos: string[]
}

/**
 * 续报表单数据
 */
export interface ContinuationReportForm {
  emergencyId: number
  location?: string
  adverseEffect?: string
  preliminaryMeasures?: string
  initialPhotos?: string[]
  repairProgress: RepairProgress
  processDescription: string
  processPhotos: string[]
}

/**
 * 终报表单数据
 */
export interface FinalReportForm {
  emergencyId: number
  location?: string
  adverseEffect?: string
  preliminaryMeasures?: string
  initialPhotos?: string[]
  processDescription: string
  processPhotos: string[]
  rootCauseType: RootCauseType
  rootCauseOption: RootCauseOption
  finalMeasures: string
  attachments: string[]
}
