/**
 * 有限空间台账管理类型定义
 */

/**
 * 审核状态枚举
 */
export enum AuditStatus {
  /** 待审核 */
  PENDING = 'pending',
  /** 已审核 */
  APPROVED = 'approved'
}

/**
 * 主要风险分析选项
 */
export enum RiskType {
  /** 缺氧 */
  HYPOXIA = 'hypoxia',
  /** 臭气 */
  ODOR = 'odor',
  /** 中毒 */
  POISONING = 'poisoning',
  /** 窒息 */
  ASPHYXIATION = 'asphyxiation'
}

/**
 * 风险类型标签映射
 */
export const RiskTypeLabels: Record<RiskType, string> = {
  [RiskType.HYPOXIA]: '缺氧',
  [RiskType.ODOR]: '臭气',
  [RiskType.POISONING]: '中毒',
  [RiskType.ASPHYXIATION]: '窒息'
}

/**
 * 审核状态标签映射
 */
export const AuditStatusLabels: Record<AuditStatus, string> = {
  [AuditStatus.PENDING]: '待审核',
  [AuditStatus.APPROVED]: '已审核'
}

/**
 * 审核记录接口
 */
export interface AuditRecord {
  /** 记录ID */
  id: number
  /** 台账ID */
  spaceId: number
  /** 审核人 */
  auditBy: string
  /** 审核时间 */
  auditTime: string
  /** 审核结果 */
  approved: boolean
  /** 审核意见 */
  comment: string
}

/**
 * 历史修改记录接口
 */
export interface HistoryRecord {
  /** 记录ID */
  id: number
  /** 操作类型 */
  operationType: 'create' | 'update' | 'audit' | 'delete'
  /** 操作内容 */
  content: string
  /** 操作人 */
  operator: string
  /** 操作时间 */
  operationTime: string
}

/**
 * 有限空间台账接口
 */
export interface ConfinedSpace {
  /** 台账ID */
  id: number
  /** 所属单位ID（厂站ID） */
  stationId: number
  /** 所属单位名称 */
  stationName: string
  /** 有限空间编号 */
  code: number
  /** 所在部位（构筑物） */
  structure: string
  /** 具体位置 */
  location: string
  /** 主要风险分析 */
  riskAnalysis: RiskType[]
  /** 风险管控措施 */
  riskControlMeasures: string
  /** 责任人 */
  responsiblePerson: string
  /** 备注 */
  remark?: string
  /** 照片列表 */
  photos?: string[]
  /** 状态 */
  status: AuditStatus
  /** 审核意见 */
  auditComment?: string
  /** 填报人 */
  createBy: string
  /** 填报时间 */
  createTime: string
  /** 审核人 */
  auditBy?: string
  /** 审核时间 */
  auditTime?: string
  /** 更新时间 */
  updateTime?: string
}

/**
 * 有限空间台账查询参数
 */
export interface ConfinedSpaceQueryParams {
  /** 所属厂站ID */
  stationId?: number
  /** 有限空间编号 */
  code?: number
  /** 所在部位（构筑物） */
  structure?: string
  /** 审核状态 */
  status?: AuditStatus
  /** 主要风险分析 */
  riskAnalysis?: RiskType[]
  /** 填报月份（格式：YYYY-MM） */
  createMonth?: string
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 有限空间台账表单数据
 */
export interface ConfinedSpaceFormData {
  /** 台账ID（编辑时） */
  id?: number
  /** 所属单位ID */
  stationId: number
  /** 有限空间编号 */
  code: number
  /** 所在部位（构筑物） */
  structure: string
  /** 具体位置 */
  location: string
  /** 主要风险分析 */
  riskAnalysis: RiskType[]
  /** 风险管控措施 */
  riskControlMeasures: string
  /** 责任人 */
  responsiblePerson: string
  /** 备注 */
  remark?: string
  /** 照片列表 */
  photos?: string[]
}

/**
 * 审核表单数据
 */
export interface AuditFormData {
  /** 台账ID */
  id: number
  /** 审核结果：true-通过，false-不通过 */
  approved: boolean
  /** 审核意见 */
  comment: string
}

/**
 * 批量审核表单数据
 */
export interface BatchAuditFormData {
  /** 台账ID列表 */
  ids: number[]
  /** 审核结果：true-通过，false-不通过 */
  approved: boolean
  /** 审核意见 */
  comment: string
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
