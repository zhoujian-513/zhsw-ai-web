/**
 * 防汛专项管理类型定义
 */

/**
 * 防汛工程类型枚举
 */
export enum FloodProjectType {
  /** 在建在运的水利工程 */
  HYDRAULIC = 'hydraulic',
  /** 防汛排涝系统（管网、箱涵、泵站等） */
  DRAINAGE = 'drainage',
  /** 其他防汛项目 */
  OTHER = 'other'
}

/**
 * 主要风险类型枚举
 */
export enum RiskType {
  /** 汛前有明确节点工期的在建项目 */
  NODE_DEADLINE = 'node_deadline',
  /** 汛前有具体消缺任务的在运项目 */
  DEFECT_TASK = 'defect_task',
  /** 临近河湖项目 */
  NEAR_RIVER = 'near_river',
  /** 地势低洼项目 */
  LOW_LYING = 'low_lying',
  /** 受台风、大风影响大的项目 */
  TYPHOON_AFFECTED = 'typhoon_affected',
  /** 其他 */
  OTHER = 'other'
}

/**
 * 防汛工程明细
 */
export interface FloodProjectDetail {
  /** 明细ID */
  id: number
  /** 防汛专项管理ID */
  floodPreventionId: number
  /** 防汛工程名称 */
  projectName: string
  /** 防汛工程类型 */
  projectType: FloodProjectType
  /** 主要风险类型 */
  riskType: RiskType
  /** 关联水系（河湖等） */
  relatedWaterSystem: string
  /** 汛期开始日期 */
  floodSeasonStart: string
  /** 汛期截止日期 */
  floodSeasonEnd: string
  /** 关键节点工期 */
  keyNodeSchedule: string
  /** 主要影响 */
  mainImpact: string
  /** 应对保障措施 */
  safeguardMeasures: string
  /** 施工单位/运维单位 */
  constructionUnit: string
  /** 历年涉险事件（2020年1月1日以来） */
  historicalIncidents: string
  /** 备注 */
  remark: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/**
 * 防汛专项管理主表
 */
export interface FloodPrevention {
  /** 主键ID */
  id: number
  /** 项目ID */
  projectId: number
  /** 项目名称 */
  projectName: string
  /** 所在地 */
  location: string
  /** 所属区域公司 */
  regionCompany: string
  /** 防汛工程明细列表 */
  projectDetails: FloodProjectDetail[]
  /** 创建人 */
  createBy: string
  /** 创建时间 */
  createTime: string
  /** 更新人 */
  updateBy: string
  /** 更新时间 */
  updateTime: string
}

/**
 * 防汛专项管理查询参数
 */
export interface FloodPreventionQueryParams {
  /** 项目ID */
  projectId?: number
  /** 项目名称关键词 */
  keyword?: string
  /** 所属区域公司 */
  regionCompany?: string
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 防汛工程明细表单数据
 */
export interface FloodProjectDetailFormData {
  /** 明细ID（编辑时） */
  id?: number
  /** 防汛工程名称 */
  projectName: string
  /** 防汛工程类型 */
  projectType: FloodProjectType
  /** 主要风险类型 */
  riskType: RiskType
  /** 关联水系（河湖等） */
  relatedWaterSystem: string
  /** 汛期开始日期 */
  floodSeasonStart: string
  /** 汛期截止日期 */
  floodSeasonEnd: string
  /** 关键节点工期 */
  keyNodeSchedule: string
  /** 主要影响 */
  mainImpact: string
  /** 应对保障措施 */
  safeguardMeasures: string
  /** 施工单位/运维单位 */
  constructionUnit: string
  /** 历年涉险事件（2020年1月1日以来） */
  historicalIncidents: string
  /** 备注 */
  remark: string
}

/**
 * 防汛专项管理表单数据
 */
export interface FloodPreventionFormData {
  /** 主键ID（编辑时） */
  id?: number
  /** 项目ID */
  projectId: number
  /** 防汛工程明细列表 */
  projectDetails: FloodProjectDetailFormData[]
}

/**
 * 项目信息（用于下拉选择）
 */
export interface ProjectInfo {
  /** 项目ID */
  id: number
  /** 项目名称 */
  name: string
  /** 所在地 */
  location: string
  /** 所属区域公司 */
  regionCompany: string
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
 * 防汛工程类型选项
 */
export const floodProjectTypeOptions = [
  { label: '在建在运的水利工程', value: FloodProjectType.HYDRAULIC },
  { label: '防汛排涝系统（管网、箱涵、泵站等）', value: FloodProjectType.DRAINAGE },
  { label: '其他防汛项目', value: FloodProjectType.OTHER }
]

/**
 * 主要风险类型选项
 */
export const riskTypeOptions = [
  { label: '汛前有明确节点工期的在建项目', value: RiskType.NODE_DEADLINE },
  { label: '汛前有具体消缺任务的在运项目', value: RiskType.DEFECT_TASK },
  { label: '临近河湖项目', value: RiskType.NEAR_RIVER },
  { label: '地势低洼项目', value: RiskType.LOW_LYING },
  { label: '受台风、大风影响大的项目', value: RiskType.TYPHOON_AFFECTED },
  { label: '其他', value: RiskType.OTHER }
]

/**
 * 获取防汛工程类型文本
 */
export function getFloodProjectTypeText(type: FloodProjectType): string {
  const map: Record<string, string> = {
    [FloodProjectType.HYDRAULIC]: '在建在运的水利工程',
    [FloodProjectType.DRAINAGE]: '防汛排涝系统（管网、箱涵、泵站等）',
    [FloodProjectType.OTHER]: '其他防汛项目'
  }
  return map[type] || type
}

/**
 * 获取主要风险类型文本
 */
export function getRiskTypeText(type: RiskType): string {
  const map: Record<string, string> = {
    [RiskType.NODE_DEADLINE]: '汛前有明确节点工期的在建项目',
    [RiskType.DEFECT_TASK]: '汛前有具体消缺任务的在运项目',
    [RiskType.NEAR_RIVER]: '临近河湖项目',
    [RiskType.LOW_LYING]: '地势低洼项目',
    [RiskType.TYPHOON_AFFECTED]: '受台风、大风影响大的项目',
    [RiskType.OTHER]: '其他'
  }
  return map[type] || type
}
