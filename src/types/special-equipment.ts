/**
 * 特种设备管理类型定义
 */

/**
 * 校验状态枚举
 */
export enum VerificationStatus {
  /** 正常 */
  NORMAL = 'normal',
  /** 预警 */
  WARNING = 'warning',
  /** 已过期 */
  EXPIRED = 'expired'
}

/**
 * 使用状态枚举
 */
export enum UsageStatus {
  /** 在用 */
  IN_USE = 'in_use',
  /** 停用 */
  STOPPED = 'stopped'
}

/**
 * 特种设备接口
 */
export interface SpecialEquipment {
  /** 设备ID */
  id: number
  /** 所属厂站ID */
  stationId: number
  /** 所属厂站名称 */
  stationName: string
  /** 设备名称 */
  name: string
  /** 设备编码 */
  code: string
  /** 设备类型 */
  type: string
  /** 所属工艺段 */
  processSection: string
  /** 所属构筑物 */
  structure: string
  /** 型号规格 */
  model: string
  /** 制造单位 */
  manufacturer: string
  /** 设备注册代码 */
  registrationCode: string
  /** 使用证编号 */
  certificateNo: string
  /** 吨数 */
  tonnage?: number
  /** 设计使用年限（年） */
  designLife: number
  /** 使用状态 */
  usageStatus: UsageStatus
  /** 使用地点 */
  usageLocation: string
  /** 检验周期（月） */
  inspectionCycle: number
  /** 安全管理责任人 */
  safetyManager: string
  /** 生产日期 */
  productionDate: string
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
  /** 特种设备ID */
  equipmentId: number
  /** 检验日期 */
  inspectionDate: string
  /** 检验单位 */
  inspectionOrg: string
  /** 检验记录 */
  inspectionResult: string
  /** 校验附件 */
  attachments?: string[]
  /** 创建人 */
  createBy: string
  /** 创建时间 */
  createTime: string
}

/**
 * 特种设备查询参数
 */
export interface SpecialEquipmentQueryParams {
  /** 所属厂站ID */
  stationId?: number
  /** 设备名称/编码关键词 */
  keyword?: string
  /** 校验状态 */
  verificationStatus?: VerificationStatus
  /** 使用状态 */
  usageStatus?: UsageStatus
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 特种设备表单数据
 */
export interface SpecialEquipmentFormData {
  /** 设备ID（编辑时） */
  id?: number
  /** 设备注册代码 */
  registrationCode: string
  /** 使用证编号 */
  certificateNo: string
  /** 吨数 */
  tonnage?: number
  /** 设计使用年限（年） */
  designLife: number
  /** 使用状态 */
  usageStatus: UsageStatus
  /** 使用地点 */
  usageLocation: string
  /** 检验周期（月） */
  inspectionCycle: number
  /** 安全管理责任人 */
  safetyManager: string
}

/**
 * 校验记录表单数据
 */
export interface InspectionRecordFormData {
  /** 记录ID（编辑时） */
  id?: number
  /** 特种设备ID */
  equipmentId: number
  /** 检验日期 */
  inspectionDate: string
  /** 检验单位 */
  inspectionOrg: string
  /** 检验记录 */
  inspectionResult: string
  /** 校验附件 */
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
