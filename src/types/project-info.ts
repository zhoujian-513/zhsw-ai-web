/**
 * 项目基础信息类型定义
 */

/**
 * 项目状态枚举
 */
export enum ProjectStatus {
  /** 运营 */
  OPERATING = 'operating',
  /** 建设中 */
  CONSTRUCTING = 'constructing',
  /** 规划中 */
  PLANNING = 'planning',
  /** 已终止 */
  TERMINATED = 'terminated'
}

/**
 * 项目模式枚举
 */
export enum ProjectMode {
  /** 单一业务 */
  SINGLE_BUSINESS = 'single_business',
  /** 综合业务 */
  COMPREHENSIVE_BUSINESS = 'comprehensive_business'
}

/**
 * 项目类型枚举
 */
export enum ProjectType {
  /** 发电业务 */
  POWER_GENERATION = 'power_generation',
  /** 分布式光伏 */
  DISTRIBUTED_PV = 'distributed_pv',
  /** 集中式光伏 */
  CENTRALIZED_PV = 'centralized_pv',
  /** 风电 */
  WIND_POWER = 'wind_power',
  /** 储能 */
  ENERGY_STORAGE = 'energy_storage'
}

/**
 * 年度目标
 */
export interface AnnualTarget {
  /** 年份 */
  year: number
  /** 年报投资额 */
  annualInvestment: number
  /** 年报拟投资形象 */
  annualInvestmentImage: string
}

/**
 * 项目基础信息接口
 */
export interface ProjectInfo {
  /** 项目ID */
  id: number
  /** 项目名称 */
  name: string
  /** 项目简称 */
  shortName: string
  /** 项目模式 */
  mode: ProjectMode
  /** 项目模式名称 */
  modeName: string
  /** 项目类型 */
  type: ProjectType
  /** 项目类型名称 */
  typeName: string
  /** 项目责任单位ID */
  responsibleUnitId: number
  /** 项目责任单位 */
  responsibleUnit: string
  /** 股比 */
  shareRatio: number
  /** 项目状态 */
  status: ProjectStatus
  /** 项目状态名称 */
  statusName: string
  /** 项目地址-省 */
  province: string
  /** 项目地址-市 */
  city: string
  /** 项目地址-区/县 */
  district: string
  /** 项目详细地址 */
  address: string
  /** 服务用户 */
  serviceUser: string
  /** 开工时间 */
  startDate: string
  /** 计划投产时间 */
  plannedProductionDate: string
  /** 投产时间 */
  productionDate: string
  /** 联系人 */
  contactPerson: string
  /** 联系人电话 */
  contactPhone: string
  /** 相关方 */
  relatedParty: string
  /** 并网容量 */
  gridConnectionCapacity: number
  /** 并网时间 */
  gridConnectionDate: string
  /** 运维主体 */
  operationSubject: string
  /** 场站编码 */
  stationCode: string
  /** 创建人员 */
  creator: string
  /** 创建时间 */
  createTime: string
  /** 是否已提交 */
  isSubmitted: boolean

  // 项目规模
  /** 发电业务类型 */
  powerBusinessType: string
  /** 直流侧功率 */
  dcPower: number
  /** 交流侧功率 */
  acPower: number

  // 设备信息
  /** 逆变器总数 */
  inverterCount: number

  // 财务信息
  /** 是否转为国有资产 */
  isStateOwned: boolean

  // 项目目标
  /** 拟投资额 */
  plannedInvestment: number
  /** EPC合同金额 */
  epcContractAmount: number
  /** 年度目标列表 */
  annualTargets: AnnualTarget[]
}

/**
 * 项目基础信息查询参数
 */
export interface ProjectInfoQueryParams {
  /** 项目责任单位ID */
  responsibleUnitId?: number
  /** 项目名称 */
  name?: string
  /** 项目状态 */
  status?: ProjectStatus
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * 项目基础信息表单数据
 */
export interface ProjectInfoFormData {
  /** 项目ID */
  id?: number
  /** 项目名称 */
  name: string
  /** 项目简称 */
  shortName: string
  /** 项目模式 */
  mode: ProjectMode
  /** 项目类型 */
  type: ProjectType
  /** 项目责任单位ID */
  responsibleUnitId: number
  /** 股比 */
  shareRatio: number
  /** 项目状态 */
  status: ProjectStatus
  /** 项目地址-省 */
  province: string
  /** 项目地址-市 */
  city: string
  /** 项目地址-区/县 */
  district: string
  /** 项目详细地址 */
  address: string
  /** 服务用户 */
  serviceUser: string
  /** 开工时间 */
  startDate: string
  /** 计划投产时间 */
  plannedProductionDate: string
  /** 投产时间 */
  productionDate: string
  /** 联系人 */
  contactPerson: string
  /** 联系人电话 */
  contactPhone: string
  /** 相关方 */
  relatedParty: string
  /** 并网容量 */
  gridConnectionCapacity: number
  /** 并网时间 */
  gridConnectionDate: string
  /** 运维主体 */
  operationSubject: string
  /** 场站编码 */
  stationCode: string

  // 项目规模
  /** 发电业务类型 */
  powerBusinessType: string
  /** 直流侧功率 */
  dcPower: number
  /** 交流侧功率 */
  acPower: number

  // 设备信息
  /** 逆变器总数 */
  inverterCount: number

  // 财务信息
  /** 是否转为国有资产 */
  isStateOwned: boolean

  // 项目目标
  /** 拟投资额 */
  plannedInvestment: number
  /** EPC合同金额 */
  epcContractAmount: number
  /** 年度目标列表 */
  annualTargets: AnnualTarget[]
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
 * 项目状态选项
 */
export const PROJECT_STATUS_OPTIONS = [
  { label: '运营', value: ProjectStatus.OPERATING },
  { label: '建设中', value: ProjectStatus.CONSTRUCTING },
  { label: '规划中', value: ProjectStatus.PLANNING },
  { label: '已终止', value: ProjectStatus.TERMINATED }
]

/**
 * 项目模式选项
 */
export const PROJECT_MODE_OPTIONS = [
  { label: '单一业务', value: ProjectMode.SINGLE_BUSINESS },
  { label: '综合业务', value: ProjectMode.COMPREHENSIVE_BUSINESS }
]

/**
 * 项目类型选项
 */
export const PROJECT_TYPE_OPTIONS = [
  { label: '发电业务', value: ProjectType.POWER_GENERATION },
  { label: '分布式光伏', value: ProjectType.DISTRIBUTED_PV },
  { label: '集中式光伏', value: ProjectType.CENTRALIZED_PV },
  { label: '风电', value: ProjectType.WIND_POWER },
  { label: '储能', value: ProjectType.ENERGY_STORAGE }
]

/**
 * 发电业务类型选项
 */
export const POWER_BUSINESS_TYPE_OPTIONS = [
  { label: '分布式光伏', value: 'distributed_pv' },
  { label: '集中式光伏', value: 'centralized_pv' },
  { label: '风电', value: 'wind_power' },
  { label: '储能', value: 'energy_storage' }
]
