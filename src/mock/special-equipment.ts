import type { SpecialEquipment, InspectionRecord } from '@/types/special-equipment'
import type { PaginationResponse } from '@/types/api'

// 模拟特种设备数据
const mockEquipmentData: SpecialEquipment[] = [
  {
    id: 1,
    stationId: 1,
    stationName: '第一污水处理厂',
    name: '蒸汽锅炉',
    code: 'GL-001',
    type: '锅炉',
    processSection: '污泥处理段',
    structure: '锅炉房',
    model: 'WNS4-1.25-Q',
    manufacturer: '上海锅炉厂有限公司',
    registrationCode: 'TS21101020240001',
    certificateNo: '锅粤A00001',
    tonnage: 4,
    designLife: 15,
    usageStatus: 'in_use',
    usageLocation: '锅炉房',
    inspectionCycle: 12,
    safetyManager: '张三',
    productionDate: '2020-03-15',
    lastInspectionDate: '2024-03-10',
    nextInspectionDate: '2025-03-10',
    verificationStatus: 'normal',
    createTime: '2020-05-20 10:30:00',
    updateTime: '2024-03-15 14:20:00'
  },
  {
    id: 2,
    stationId: 1,
    stationName: '第一污水处理厂',
    name: '压力容器-储气罐',
    code: 'RQ-001',
    type: '压力容器',
    processSection: '鼓风机房',
    structure: '鼓风机房',
    model: 'C-2.0/0.8',
    manufacturer: '江苏压力容器厂',
    registrationCode: 'TS22101020240002',
    certificateNo: '容粤A00002',
    tonnage: 2,
    designLife: 10,
    usageStatus: 'in_use',
    usageLocation: '鼓风机房',
    inspectionCycle: 12,
    safetyManager: '李四',
    productionDate: '2019-06-20',
    lastInspectionDate: '2024-01-15',
    nextInspectionDate: '2024-07-15',
    verificationStatus: 'warning',
    createTime: '2019-08-10 09:15:00',
    updateTime: '2024-01-20 11:30:00'
  },
  {
    id: 3,
    stationId: 2,
    stationName: '第二污水处理厂',
    name: '电梯-货梯',
    code: 'DT-001',
    type: '电梯',
    processSection: '综合楼',
    structure: '综合楼',
    model: 'THJ2000/0.5-JXW',
    manufacturer: '广州电梯厂',
    registrationCode: 'TS33101020240003',
    certificateNo: '梯粤A00003',
    designLife: 15,
    usageStatus: 'in_use',
    usageLocation: '综合楼',
    inspectionCycle: 12,
    safetyManager: '王五',
    productionDate: '2018-09-10',
    lastInspectionDate: '2023-09-05',
    nextInspectionDate: '2024-03-05',
    verificationStatus: 'expired',
    createTime: '2018-11-20 16:45:00',
    updateTime: '2023-09-10 10:00:00'
  },
  {
    id: 4,
    stationId: 1,
    stationName: '第一污水处理厂',
    name: '起重机械-电动葫芦',
    code: 'QZ-001',
    type: '起重机械',
    processSection: '脱水机房',
    structure: '脱水机房',
    model: 'CD1-5t-9m',
    manufacturer: '河南矿山起重机有限公司',
    registrationCode: 'TS24101020240004',
    certificateNo: '起粤A00004',
    tonnage: 5,
    designLife: 12,
    usageStatus: 'stopped',
    usageLocation: '脱水机房',
    inspectionCycle: 24,
    safetyManager: '赵六',
    productionDate: '2017-04-25',
    lastInspectionDate: '2023-04-20',
    nextInspectionDate: '2025-04-20',
    verificationStatus: 'normal',
    createTime: '2017-06-15 08:30:00',
    updateTime: '2024-01-10 09:00:00'
  },
  {
    id: 5,
    stationId: 3,
    stationName: '第三污水处理厂',
    name: '压力管道',
    code: 'GD-001',
    type: '压力管道',
    processSection: '加药间',
    structure: '加药间',
    model: 'DN150 PN1.6',
    manufacturer: '天津钢管集团',
    registrationCode: 'TS25101020240005',
    certificateNo: '管粤A00005',
    designLife: 20,
    usageStatus: 'in_use',
    usageLocation: '加药间',
    inspectionCycle: 36,
    safetyManager: '孙七',
    productionDate: '2021-02-18',
    lastInspectionDate: '2024-02-15',
    nextInspectionDate: '2027-02-15',
    verificationStatus: 'normal',
    createTime: '2021-04-10 14:00:00',
    updateTime: '2024-02-20 11:00:00'
  }
]

// 模拟校验记录数据
const mockInspectionRecords: Record<number, InspectionRecord[]> = {
  1: [
    {
      id: 1,
      equipmentId: 1,
      inspectionDate: '2024-03-10',
      inspectionOrg: '广东省特种设备检测院',
      inspectionResult: '锅炉整体状况良好，安全阀、压力表等安全附件工作正常，水质符合标准要求。建议继续保持定期排污和水质监测。',
      attachments: ['report_20240310.pdf'],
      createBy: '张三',
      createTime: '2024-03-12 09:30:00'
    },
    {
      id: 2,
      equipmentId: 1,
      inspectionDate: '2023-03-08',
      inspectionOrg: '广东省特种设备检测院',
      inspectionResult: '锅炉运行正常，燃烧系统工作良好，热效率达到设计要求。建议下次检验前进行一次全面保养。',
      attachments: ['report_20230308.pdf'],
      createBy: '张三',
      createTime: '2023-03-10 10:00:00'
    },
    {
      id: 3,
      equipmentId: 1,
      inspectionDate: '2022-03-05',
      inspectionOrg: '广东省特种设备检测院',
      inspectionResult: '初次定期检验，锅炉各项指标符合国家标准，准予继续使用。',
      attachments: ['report_20220305.pdf'],
      createBy: '张三',
      createTime: '2022-03-08 14:30:00'
    }
  ],
  2: [
    {
      id: 4,
      equipmentId: 2,
      inspectionDate: '2024-01-15',
      inspectionOrg: '深圳市特种设备安全检验研究院',
      inspectionResult: '储气罐外观检查良好，壁厚测量结果符合要求，安全阀校验合格。注意检查排污阀密封性。',
      attachments: ['report_20240115.pdf'],
      createBy: '李四',
      createTime: '2024-01-18 11:00:00'
    },
    {
      id: 5,
      equipmentId: 2,
      inspectionDate: '2023-01-12',
      inspectionOrg: '深圳市特种设备安全检验研究院',
      inspectionResult: '定期检验合格，未发现影响安全使用的缺陷。压力表已更换新表。',
      attachments: ['report_20230112.pdf'],
      createBy: '李四',
      createTime: '2023-01-15 09:30:00'
    }
  ],
  3: [
    {
      id: 6,
      equipmentId: 3,
      inspectionDate: '2023-09-05',
      inspectionOrg: '广州市特种设备检测研究院',
      inspectionResult: '电梯运行平稳，各项安全保护装置功能正常。轿厢门机系统有轻微异响，建议润滑保养。',
      attachments: ['report_20230905.pdf'],
      createBy: '王五',
      createTime: '2023-09-08 10:00:00'
    },
    {
      id: 7,
      equipmentId: 3,
      inspectionDate: '2022-09-02',
      inspectionOrg: '广州市特种设备检测研究院',
      inspectionResult: '年度检验合格，限速器-安全钳联动试验正常，缓冲器无异常。',
      attachments: ['report_20220902.pdf'],
      createBy: '王五',
      createTime: '2022-09-05 14:00:00'
    }
  ],
  4: [
    {
      id: 8,
      equipmentId: 4,
      inspectionDate: '2023-04-20',
      inspectionOrg: '广东省特种设备检测院',
      inspectionResult: '电动葫芦起升机构工作正常，制动器灵敏可靠，钢丝绳磨损在允许范围内。',
      attachments: ['report_20230420.pdf'],
      createBy: '赵六',
      createTime: '2023-04-22 09:00:00'
    }
  ],
  5: [
    {
      id: 9,
      equipmentId: 5,
      inspectionDate: '2024-02-15',
      inspectionOrg: '广东省特种设备检测院',
      inspectionResult: '压力管道宏观检查无异常，壁厚测量数据正常，支吊架完好，管道标识清晰。',
      attachments: ['report_20240215.pdf'],
      createBy: '孙七',
      createTime: '2024-02-18 10:30:00'
    }
  ]
}

// 获取特种设备列表
export function mockGetSpecialEquipmentList(
  page: number,
  pageSize: number,
  stationId?: number,
  keyword?: string,
  verificationStatus?: string,
  usageStatus?: string
): PaginationResponse<SpecialEquipment> {
  let list = [...mockEquipmentData]
  
  // 筛选
  if (stationId) {
    list = list.filter(item => item.stationId === stationId)
  }
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase()
    list = list.filter(item => 
      item.name.toLowerCase().includes(lowerKeyword) ||
      item.code.toLowerCase().includes(lowerKeyword)
    )
  }
  if (verificationStatus) {
    list = list.filter(item => item.verificationStatus === verificationStatus)
  }
  if (usageStatus) {
    list = list.filter(item => item.usageStatus === usageStatus)
  }
  
  // 分页
  const total = list.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  list = list.slice(start, end)
  
  return {
    list,
    total,
    page,
    pageSize
  }
}

// 获取特种设备详情
export function mockGetSpecialEquipmentDetail(id: number): SpecialEquipment | undefined {
  return mockEquipmentData.find(item => item.id === id)
}

// 更新特种设备
export function mockUpdateSpecialEquipment(
  id: number,
  data: Partial<SpecialEquipment>
): SpecialEquipment | undefined {
  const index = mockEquipmentData.findIndex(item => item.id === id)
  if (index > -1) {
    mockEquipmentData[index] = { ...mockEquipmentData[index], ...data, updateTime: new Date().toLocaleString() }
    return mockEquipmentData[index]
  }
  return undefined
}

// 获取校验记录列表
export function mockGetInspectionRecordList(equipmentId: number): InspectionRecord[] {
  return mockInspectionRecords[equipmentId] || []
}

// 新增校验记录
export function mockAddInspectionRecord(
  equipmentId: number,
  data: Omit<InspectionRecord, 'id' | 'equipmentId' | 'createTime'>
): InspectionRecord {
  const newRecord: InspectionRecord = {
    id: Date.now(),
    equipmentId,
    ...data,
    createTime: new Date().toLocaleString()
  }
  
  if (!mockInspectionRecords[equipmentId]) {
    mockInspectionRecords[equipmentId] = []
  }
  mockInspectionRecords[equipmentId].unshift(newRecord)
  
  // 更新设备的校验日期和状态
  const equipment = mockEquipmentData.find(item => item.id === equipmentId)
  if (equipment) {
    equipment.lastInspectionDate = data.inspectionDate
    // 计算下次校验日期
    const nextDate = new Date(data.inspectionDate)
    nextDate.setMonth(nextDate.getMonth() + equipment.inspectionCycle)
    equipment.nextInspectionDate = nextDate.toISOString().split('T')[0]
    
    // 更新校验状态
    const daysDiff = Math.ceil((nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (daysDiff > 7) {
      equipment.verificationStatus = 'normal'
    } else if (daysDiff >= 0) {
      equipment.verificationStatus = 'warning'
    } else {
      equipment.verificationStatus = 'expired'
    }
    equipment.updateTime = new Date().toLocaleString()
  }
  
  return newRecord
}

// 获取厂站列表
export function mockGetStationList(): Array<{ id: number; name: string }> {
  return [
    { id: 1, name: '第一污水处理厂' },
    { id: 2, name: '第二污水处理厂' },
    { id: 3, name: '第三污水处理厂' }
  ]
}
