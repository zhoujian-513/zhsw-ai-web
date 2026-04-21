/**
 * 有限空间台账 - Mock 数据
 */
import type { ConfinedSpaceItem, ConfinedSpaceListParams } from '@/types/confined-space'

/** Mock 数据存储 */
let items: ConfinedSpaceItem[] = [
  {
    id: 1,
    belongingUnit: '一期污水处理厂',
    confinedSpaceNumber: '001',
    locationStructure: '泵站湿井',
    specificLocation: '污水处理厂一期泵站',
    mainRiskAnalysis: ['缺氧', '中毒'],
    riskControlMeasures: '通风换气、气体检测、安全绳、应急救援装备',
    responsiblePerson: '张伟',
    status: 1,
    auditOpinion: '符合要求',
    filler: '管理员',
    fillingTime: '2024-01-10 09:00:00',
    auditor: '审核员A',
    auditTime: '2024-01-11 10:00:00',
    remark: '深度8米，需使用呼吸器进入',
    createTime: '2024-01-10 09:00:00',
    updateTime: '2026-03-15 14:30:00'
  },
  {
    id: 2,
    belongingUnit: '二期污水处理厂',
    confinedSpaceNumber: '002',
    locationStructure: '格栅间地下室',
    specificLocation: '污水处理厂预处理车间',
    mainRiskAnalysis: ['缺氧', '臭气'],
    riskControlMeasures: '强制通风、有毒气体报警仪、防毒面具',
    responsiblePerson: '李明',
    status: 0,
    filler: '管理员',
    fillingTime: '2024-01-10 09:15:00',
    remark: '',
    createTime: '2024-01-10 09:15:00',
    updateTime: '2026-02-20 10:00:00'
  }
]

let nextId = 3

/**
 * 获取列表 Mock 函数
 */
export function getConfinedSpaceListMock(params: ConfinedSpaceListParams) {
  const { belongingUnit, confinedSpaceNumber, status, page = 1, pageSize = 20 } = params
  let filteredData = [...items]

  if (belongingUnit) {
    filteredData = filteredData.filter((item) => item.belongingUnit.includes(belongingUnit))
  }
  if (confinedSpaceNumber) {
    filteredData = filteredData.filter((item) => item.confinedSpaceNumber.includes(confinedSpaceNumber))
  }
  if (status !== undefined && status !== null && status !== '') {
    filteredData = filteredData.filter((item) => item.status === Number(status))
  }

  const start = (page - 1) * pageSize
  const end = start + Number(pageSize)
  const list = filteredData.slice(start, end)

  return {
    list,
    total: filteredData.length
  }
}

/**
 * 添加 Mock 函数
 */
export function addConfinedSpaceMock(data: Partial<ConfinedSpaceItem>) {
  const now = new Date().toLocaleString('zh-CN')
  const newItem: ConfinedSpaceItem = {
    id: nextId++,
    belongingUnit: data.belongingUnit || '',
    confinedSpaceNumber: data.confinedSpaceNumber || '',
    locationStructure: data.locationStructure || '',
    specificLocation: data.specificLocation || '',
    mainRiskAnalysis: data.mainRiskAnalysis || [],
    riskControlMeasures: data.riskControlMeasures || '',
    responsiblePerson: data.responsiblePerson || '',
    status: 0, // 默认未审核
    filler: data.filler || '当前用户',
    fillingTime: now,
    remark: data.remark || '',
    createTime: now,
    updateTime: now
  }
  items.unshift(newItem)
  return newItem
}

/**
 * 更新 Mock 函数
 */
export function updateConfinedSpaceMock(data: Partial<ConfinedSpaceItem>) {
  const index = items.findIndex((item) => item.id === data.id)
  if (index !== -1) {
    items[index] = {
      ...items[index],
      ...data,
      updateTime: new Date().toLocaleString('zh-CN')
    }
    return items[index]
  }
  throw new Error('数据不存在')
}

/**
 * 删除 Mock 函数
 */
export function deleteConfinedSpaceMock(id: number) {
  const index = items.findIndex((item) => item.id === id)
  if (index !== -1) {
    items.splice(index, 1)
    return true
  }
  throw new Error('数据不存在')
}
