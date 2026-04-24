import type {
  ProjectInfo,
  ProjectInfoFormData,
  ProjectStatus,
  ProjectMode,
  ProjectType,
  AnnualTarget
} from '@/types/project-info'

// 状态名称映射
const statusNameMap: Record<ProjectStatus, string> = {
  operating: '运营',
  constructing: '建设中',
  planning: '规划中',
  terminated: '已终止'
}

// 模式名称映射
const modeNameMap: Record<ProjectMode, string> = {
  single_business: '单一业务',
  comprehensive_business: '综合业务'
}

// 类型名称映射
const typeNameMap: Record<ProjectType, string> = {
  power_generation: '发电业务',
  distributed_pv: '分布式光伏',
  centralized_pv: '集中式光伏',
  wind_power: '风电',
  energy_storage: '储能'
}

// 模拟数据存储
let mockProjects: ProjectInfo[] = []
let nextId = 1

// 初始化模拟数据
function initMockData() {
  const units = ['长峡能源', '天津电能', '云峡资产', '北京能源', '上海电力']
  const provinces = ['河北省', '天津市', '北京市', '上海市', '山东省']
  const cities = ['衡水市', '张家口市', '天津市', '北京市', '济南市']
  
  for (let i = 0; i < 25; i++) {
    const id = nextId++
    const unitIndex = i % units.length
    const status: ProjectStatus = i < 20 ? 'operating' : 'constructing'
    const type: ProjectType = i % 2 === 0 ? 'distributed_pv' : 'centralized_pv'
    const createTime = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
    
    const project: ProjectInfo = {
      id,
      name: i === 0 ? '暂存光伏项目' : i === 1 ? '20260126非暂存项目测试' : i === 2 ? '测试t同步-暂存2' : i === 3 ? '测试同步-暂存' : `测试暂存${i + 100}`,
      shortName: `项目${id}`,
      mode: 'single_business',
      modeName: '单一业务',
      type,
      typeName: typeNameMap[type],
      responsibleUnitId: unitIndex + 1,
      responsibleUnit: units[unitIndex],
      shareRatio: 50 + (i % 50),
      status,
      statusName: statusNameMap[status],
      province: provinces[unitIndex],
      city: cities[unitIndex],
      district: '某某区',
      address: `${provinces[unitIndex]}${cities[unitIndex]}某某区`,
      serviceUser: '7777777',
      startDate: '2026-01-01',
      plannedProductionDate: '2026-01-02',
      productionDate: '2026-01-03',
      contactPerson: i % 3 === 0 ? '是是是' : i % 3 === 1 ? '张三' : '23',
      contactPhone: i % 3 === 0 ? '13666666666' : i % 3 === 1 ? '16777777777' : '22233333333',
      relatedParty: '承包方/设计方/监理方',
      gridConnectionCapacity: 100 + i * 10,
      gridConnectionDate: '2026-01-04',
      operationSubject: '运维公司A',
      stationCode: `STATION${String(id).padStart(4, '0')}`,
      creator: '管理员',
      createTime,
      isSubmitted: i < 20, // 前20个已提交，后5个未提交
      
      // 项目规模
      powerBusinessType: '分布式光伏',
      dcPower: 222 + i,
      acPower: 11 + i * 0.5,
      
      // 设备信息
      inverterCount: 10 + i,
      
      // 财务信息
      isStateOwned: i % 2 === 0,
      
      // 项目目标
      plannedInvestment: 123 + i * 10,
      epcContractAmount: 231 + i * 15,
      annualTargets: [
        {
          year: 2026,
          annualInvestment: 111 + i,
          annualInvestmentImage: '111111111111'
        }
      ]
    }
    
    mockProjects.push(project)
  }
}

// 初始化数据
initMockData()

/**
 * 获取项目基础信息列表
 */
export function mockGetProjectInfoList(
  page: number,
  pageSize: number,
  responsibleUnitId?: number,
  name?: string,
  status?: ProjectStatus
) {
  let list = [...mockProjects]
  
  // 筛选
  if (responsibleUnitId) {
    list = list.filter(item => item.responsibleUnitId === responsibleUnitId)
  }
  if (name) {
    list = list.filter(item => item.name.includes(name))
  }
  if (status) {
    list = list.filter(item => item.status === status)
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
 * 获取项目基础信息详情
 */
export function mockGetProjectInfoDetail(id: number): ProjectInfo | undefined {
  return mockProjects.find(item => item.id === id)
}

/**
 * 新增项目基础信息
 */
export function mockAddProjectInfo(data: ProjectInfoFormData): ProjectInfo {
  const id = nextId++
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
  
  const project: ProjectInfo = {
    id,
    name: data.name,
    shortName: data.shortName,
    mode: data.mode,
    modeName: modeNameMap[data.mode],
    type: data.type,
    typeName: typeNameMap[data.type],
    responsibleUnitId: data.responsibleUnitId,
    responsibleUnit: getUnitNameById(data.responsibleUnitId),
    shareRatio: data.shareRatio,
    status: data.status,
    statusName: statusNameMap[data.status],
    province: data.province,
    city: data.city,
    district: data.district,
    address: data.address,
    serviceUser: data.serviceUser,
    startDate: data.startDate,
    plannedProductionDate: data.plannedProductionDate,
    productionDate: data.productionDate,
    contactPerson: data.contactPerson,
    contactPhone: data.contactPhone,
    relatedParty: data.relatedParty,
    gridConnectionCapacity: data.gridConnectionCapacity,
    gridConnectionDate: data.gridConnectionDate,
    operationSubject: data.operationSubject,
    stationCode: data.stationCode,
    creator: '当前用户',
    createTime: now,
    
    powerBusinessType: data.powerBusinessType,
    dcPower: data.dcPower,
    acPower: data.acPower,
    inverterCount: data.inverterCount,
    isStateOwned: data.isStateOwned,
    plannedInvestment: data.plannedInvestment,
    epcContractAmount: data.epcContractAmount,
    annualTargets: data.annualTargets
  }
  
  mockProjects.push(project)
  return project
}

/**
 * 更新项目基础信息
 */
export function mockUpdateProjectInfo(data: ProjectInfoFormData): ProjectInfo | undefined {
  const index = mockProjects.findIndex(item => item.id === data.id)
  if (index === -1) return undefined
  
  const project = mockProjects[index]
  const updatedProject: ProjectInfo = {
    ...project,
    name: data.name,
    shortName: data.shortName,
    mode: data.mode,
    modeName: modeNameMap[data.mode],
    type: data.type,
    typeName: typeNameMap[data.type],
    responsibleUnitId: data.responsibleUnitId,
    responsibleUnit: getUnitNameById(data.responsibleUnitId),
    shareRatio: data.shareRatio,
    status: data.status,
    statusName: statusNameMap[data.status],
    province: data.province,
    city: data.city,
    district: data.district,
    address: data.address,
    serviceUser: data.serviceUser,
    startDate: data.startDate,
    plannedProductionDate: data.plannedProductionDate,
    productionDate: data.productionDate,
    contactPerson: data.contactPerson,
    contactPhone: data.contactPhone,
    relatedParty: data.relatedParty,
    gridConnectionCapacity: data.gridConnectionCapacity,
    gridConnectionDate: data.gridConnectionDate,
    operationSubject: data.operationSubject,
    stationCode: data.stationCode,
    
    powerBusinessType: data.powerBusinessType,
    dcPower: data.dcPower,
    acPower: data.acPower,
    inverterCount: data.inverterCount,
    isStateOwned: data.isStateOwned,
    plannedInvestment: data.plannedInvestment,
    epcContractAmount: data.epcContractAmount,
    annualTargets: data.annualTargets
  }
  
  mockProjects[index] = updatedProject
  return updatedProject
}

/**
 * 删除项目基础信息
 */
export function mockDeleteProjectInfo(id: number): boolean {
  const index = mockProjects.findIndex(item => item.id === id)
  if (index === -1) return false
  
  mockProjects.splice(index, 1)
  return true
}

/**
 * 获取项目责任单位列表
 */
export function mockGetResponsibleUnitList(): Array<{ id: number; name: string }> {
  return [
    { id: 1, name: '长峡能源' },
    { id: 2, name: '天津电能' },
    { id: 3, name: '云峡资产' },
    { id: 4, name: '北京能源' },
    { id: 5, name: '上海电力' }
  ]
}

/**
 * 根据ID获取单位名称
 */
function getUnitNameById(id: number): string {
  const unit = mockGetResponsibleUnitList().find(item => item.id === id)
  return unit?.name || '未知单位'
}
