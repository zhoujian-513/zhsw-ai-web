/**
 * 有限空间台账 - 类型定义
 */

/**
 * 有限空间数据项
 */
export interface ConfinedSpaceItem {
  /** 主键 */
  id: number
  /** 所属单位 */
  belongingUnit: string
  /** 有限空间编号 */
  confinedSpaceNumber: string
  /** 所在部位（构筑物） */
  locationStructure: string
  /** 具体位置 */
  specificLocation: string
  /** 主要风险分析 (缺氧、臭气、中毒、窒息) */
  mainRiskAnalysis: string[]
  /** 风险管控措施 */
  riskControlMeasures: string
  /** 责任人 */
  responsiblePerson: string
  /** 状态 (0: 未审核, 1: 已审核) */
  status: number
  /** 审核意见 */
  auditOpinion?: string
  /** 填报人 */
  filler: string
  /** 填报时间 */
  fillingTime: string
  /** 审核人 */
  auditor?: string
  /** 审核时间 */
  auditTime?: string
  /** 备注 */
  remark?: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/**
 * 列表查询参数
 */
export interface ConfinedSpaceListParams {
  /** 所属单位 */
  belongingUnit?: string
  /** 有限空间编号 */
  confinedSpaceNumber?: string
  /** 状态 */
  status?: number | string | null
  /** 当前页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}
