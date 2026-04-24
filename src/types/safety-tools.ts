/**
 * 安全工器具台账管理类型定义
 */

/**
 * 校验状态枚举
 */
export enum VerificationStatus {
  /** 正常 */
  NORMAL = 'normal',
  /** 预警 */
  WARNING = 'warning',
  /** 已超期 */
  EXPIRED = 'expired'
}

/**
 * 安全工器具接口
 */
export interface SafetyTool {
  /** 工器具ID */
  id: number
  /** 所属单位ID */
  stationId: number
  /** 所属单位名称 */
  stationName: string
  /** 使用地点 */
  usageLocation: string
  /** 名称 */
  name: string
  /** 规格型号 */
  model: string
  /** 数量 */
  quantity: number
  /** 使用部门 */
  department: string
  /** 负责人 */
  manager: string
  /** 负责人手机号 */
  managerPhone: string
  /** 附件 */
  attachments?: string[]
  /** 备注 */
  remark: string
  /** 检验周期（年） */
  inspectionCycle: number
  /** 最近一次校验日期 */
  lastInspectionDate: string
  /** 下次校验日期 */
  nextInspectionDate: string
  /** 校验状态 */
  verificationStatus: VerificationStatus
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/**
 * 校验记录接口
 */
export interface InspectionRecord {
  /** 记录ID */
  id: number
  /** 工器具ID */
  toolId: number
  /** 校验日期 */
  inspectionDate: string
  /** 检验单位 */
  inspectionOrg: string
  /** 附件 */
  attachments?: string[]
  /** 备注信息 */
  remark: string
  /** 创建人 */
  createBy: string
  /** 创建时间 */
  createTime: string
}

/**
 * 安全工器具查询参数
 */
export interface SafetyToolQueryParams {
  /** 所属单位ID */
  stationId?: number
  /** 关键词（名称/规格型号） */
  keyword?: string
  /** 校验状态 */
  verificationStatus?: VerificationStatus
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 安全工器具表单数据
 */
export interface SafetyToolFormData {
  /** 工器具ID（编辑时） */
  id?: number
  /** 所属单位ID */
  stationId: number
  /** 使用地点 */
  usageLocation: string
  /** 名称 */
  name: string
  /** 规格型号 */
  model: string
  /** 数量 */
  quantity: number
  /** 使用部门 */
  department: string
  /** 负责人 */
  manager: string
  /** 负责人手机号 */
  managerPhone: string
  /** 附件 */
  attachments?: string[]
  /** 备注 */
  remark: string
  /** 检验周期（年） */
  inspectionCycle: number
}

/**
 * 校验记录表单数据
 */
export interface InspectionRecordFormData {
  /** 记录ID（编辑时） */
  id?: number
  /** 工器具ID */
  toolId: number
  /** 校验日期 */
  inspectionDate: string
  /** 检验单位 */
  inspectionOrg: string
  /** 附件 */
  attachments?: string[]
  /** 备注信息 */
  remark: string
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
