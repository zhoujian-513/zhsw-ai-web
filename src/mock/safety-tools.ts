import type { SafetyTool, InspectionRecord } from '@/types/safety-tools'
import type { PaginationResponse } from '@/types/api'

// 模拟安全工器具数据
const mockSafetyToolData: SafetyTool[] = [
  {
    id: 1,
    stationId: 1,
    stationName: '第一污水处理厂',
    usageLocation: '配电室',
    name: '绝缘手套',
    model: '12kV 级',
    quantity: 10,
    department: '电气班组',
    manager: '张三',
    managerPhone: '13800138001',
    attachments: [],
    remark: '高压绝缘手套，用于电气操作',
    inspectionCycle: 0.5,
    lastInspectionDate: '2024-10-15',
    nextInspectionDate: '2025-04-15',
    verificationStatus: 'normal',
    createTime: '2023-01-10 09:30:00',
    updateTime: '2024-10-16 10:00:00'
  },
  {
    id: 2,
    stationId: 1,
    stationName: '第一污水处理厂',
    usageLocation: '配电室',
    name: '绝缘靴',
    model: '25kV 级',
    quantity: 6,
    department: '电气班组',
    manager: '张三',
    managerPhone: '13800138001',
    attachments: [],
    remark: '高压绝缘靴',
    inspectionCycle: 0.5,
    lastInspectionDate: '2024-10-15',
    nextInspectionDate: '2025-04-15',
    verificationStatus: 'normal',
    createTime: '2023-01-10 09:30:00',
    updateTime: '2024-10-16 10:00:00'
  },
  {
    id: 3,
    stationId: 1,
    stationName: '第一污水处理厂',
    usageLocation: '鼓风机房',
    name: '安全帽',
    model: 'ABS材质 白色',
    quantity: 20,
    department: '运行班组',
    manager: '李四',
    managerPhone: '13800138002',
    attachments: [],
    remark: '标准安全帽',
    inspectionCycle: 2.5,
    lastInspectionDate: '2022-06-20',
    nextInspectionDate: '2025-06-20',
    verificationStatus: 'warning',
    createTime: '2022-06-15 14:00:00',
    updateTime: '2024-04-20 09:00:00'
  },
  {
    id: 4,
    stationId: 2,
    stationName: '第二污水处理厂',
    usageLocation: '加药间',
    name: '防毒面具',
    model: '3M 6800',
    quantity: 8,
    department: '化验班组',
    manager: '王五',
    managerPhone: '13800138003',
    attachments: [],
    remark: '全面罩防毒面具',
    inspectionCycle: 1,
    lastInspectionDate: '2023-05-10',
    nextInspectionDate: '2024-05-10',
    verificationStatus: 'expired',
    createTime: '2021-05-05 10:30:00',
    updateTime: '2023-05-12 11:00:00'
  },
  {
    id: 5,
    stationId: 1,
    stationName: '第一污水处理厂',
    usageLocation: '脱水机房',
    name: '安全带',
    model: '全身式 五点式',
    quantity: 5,
    department: '维修班组',
    manager: '赵六',
    managerPhone: '13800138004',
    attachments: [],
    remark: '高空作业安全带',
    inspectionCycle: 1,
    lastInspectionDate: '2024-08-20',
    nextInspectionDate: '2025-08-20',
    verificationStatus: 'normal',
    createTime: '2022-03-15 16:00:00',
    updateTime: '2024-08-22 09:30:00'
  },
  {
    id: 6,
    stationId: 3,
    stationName: '第三污水处理厂',
    usageLocation: '化验室',
    name: '护目镜',
    model: '防化学飞溅',
    quantity: 15,
    department: '化验班组',
    manager: '孙七',
    managerPhone: '13800138005',
    attachments: [],
    remark: '防化学护目镜',
    inspectionCycle: 1,
    lastInspectionDate: '2024-12-01',
    nextInspectionDate: '2025-12-01',
    verificationStatus: 'normal',
    createTime: '2023-06-10 11:00:00',
    updateTime: '2024-12-02 10:00:00'
  },
  {
    id: 7,
    stationId: 1,
    stationName: '第一污水处理厂',
    usageLocation: '污泥处理段',
    name: '防化服',
    model: '轻型防化服',
    quantity: 4,
    department: '污泥处理班组',
    manager: '周八',
    managerPhone: '13800138006',
    attachments: [],
    remark: '化学品防护服装',
    inspectionCycle: 1,
    lastInspectionDate: '2024-03-15',
    nextInspectionDate: '2025-03-15',
    verificationStatus: 'warning',
    createTime: '2022-09-20 14:30:00',
    updateTime: '2024-03-18 09:00:00'
  }
]

// 模拟校验记录数据
const mockInspectionRecords: Record<number, InspectionRecord[]> = {
  1: [
    {
      id: 1,
      toolId: 1,
      inspectionDate: '2024-10-15',
      inspectionOrg: '广东省电力科学研究院',
      attachments: ['report_20241015.pdf'],
      remark: '绝缘性能测试合格，无破损老化现象',
      createBy: '张三',
      createTime: '2024-10-16 09:30:00'
    },
    {
      id: 2,
      toolId: 1,
      inspectionDate: '2024-04-15',
      inspectionOrg: '广东省电力科学研究院',
      attachments: ['report_20240415.pdf'],
      remark: '绝缘性能良好，通过耐压试验',
      createBy: '张三',
      createTime: '2024-04-16 10:00:00'
    },
    {
      id: 3,
      toolId: 1,
      inspectionDate: '2023-10-10',
      inspectionOrg: '广东省电力科学研究院',
      attachments: ['report_20231010.pdf'],
      remark: '初次定期检验，各项指标符合标准',
      createBy: '张三',
      createTime: '2023-10-12 14:30:00'
    }
  ],
  2: [
    {
      id: 4,
      toolId: 2,
      inspectionDate: '2024-10-15',
      inspectionOrg: '广东省电力科学研究院',
      attachments: ['report_20241015.pdf'],
      remark: '绝缘性能测试合格',
      createBy: '张三',
      createTime: '2024-10-16 09:30:00'
    }
  ],
  3: [
    {
      id: 5,
      toolId: 3,
      inspectionDate: '2022-06-20',
      inspectionOrg: '深圳市劳动防护用品检测中心',
      attachments: ['report_20220620.pdf'],
      remark: '冲击吸收性能、耐穿刺性能均合格',
      createBy: '李四',
      createTime: '2022-06-22 11:00:00'
    }
  ],
  4: [
    {
      id: 6,
      toolId: 4,
      inspectionDate: '2023-05-10',
      inspectionOrg: '广州市特种劳动防护用品检测站',
      attachments: ['report_20230510.pdf'],
      remark: '气密性测试合格，滤毒盒在有效期内',
      createBy: '王五',
      createTime: '2023-05-12 10:00:00'
    },
    {
      id: 7,
      toolId: 4,
      inspectionDate: '2022-05-08',
      inspectionOrg: '广州市特种劳动防护用品检测站',
      attachments: ['report_20220508.pdf'],
      remark: '面罩无裂纹，呼吸阀工作正常',
      createBy: '王五',
      createTime: '2022-05-10 09:30:00'
    }
  ],
  5: [
    {
      id: 8,
      toolId: 5,
      inspectionDate: '2024-08-20',
      inspectionOrg: '深圳市劳动防护用品检测中心',
      attachments: ['report_20240820.pdf'],
      remark: '织带无磨损，金属配件完好，缓冲包正常',
      createBy: '赵六',
      createTime: '2024-08-22 09:30:00'
    },
    {
      id: 9,
      toolId: 5,
      inspectionDate: '2023-08-18',
      inspectionOrg: '深圳市劳动防护用品检测中心',
      attachments: ['report_20230818.pdf'],
      remark: '静态负荷试验合格',
      createBy: '赵六',
      createTime: '2023-08-20 10:00:00'
    }
  ],
  6: [
    {
      id: 10,
      toolId: 6,
      inspectionDate: '2024-12-01',
      inspectionOrg: '广州市特种劳动防护用品检测站',
      attachments: ['report_20241201.pdf'],
      remark: '镜片无划痕，镜框无变形，密封性良好',
      createBy: '孙七',
      createTime: '2024-12-02 10:00:00'
    }
  ],
  7: [
    {
      id: 11,
      toolId: 7,
      inspectionDate: '2024-03-15',
      inspectionOrg: '深圳市劳动防护用品检测中心',
      attachments: ['report_20240315.pdf'],
      remark: '面料无破损，接缝牢固，防护性能达标',
      createBy: '周八',
      createTime: '2024-03-18 09:00:00'
    }
  ]
}

// 获取安全工器具列表
export function mockGetSafetyToolList(
  page: number,
  pageSize: number,
  stationId?: number,
  keyword?: string,
  verificationStatus?: string
): PaginationResponse<SafetyTool> {
  let list = [...mockSafetyToolData]

  // 筛选
  if (stationId) {
    list = list.filter(item => item.stationId === stationId)
  }
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase()
    list = list.filter(item =>
      item.name.toLowerCase().includes(lowerKeyword) ||
      item.model.toLowerCase().includes(lowerKeyword)
    )
  }
  if (verificationStatus) {
    list = list.filter(item => item.verificationStatus === verificationStatus)
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

// 获取安全工器具详情
export function mockGetSafetyToolDetail(id: number): SafetyTool | undefined {
  return mockSafetyToolData.find(item => item.id === id)
}

// 新增安全工器具
export function mockCreateSafetyTool(data: Partial<SafetyTool>): SafetyTool {
  const newTool: SafetyTool = {
    id: Date.now(),
    stationId: data.stationId || 1,
    stationName: data.stationId === 1 ? '第一污水处理厂' : data.stationId === 2 ? '第二污水处理厂' : '第三污水处理厂',
    usageLocation: data.usageLocation || '',
    name: data.name || '',
    model: data.model || '',
    quantity: data.quantity || 1,
    department: data.department || '',
    manager: data.manager || '',
    managerPhone: data.managerPhone || '',
    attachments: data.attachments || [],
    remark: data.remark || '',
    inspectionCycle: data.inspectionCycle || 1,
    lastInspectionDate: '',
    nextInspectionDate: '',
    verificationStatus: 'normal',
    createTime: new Date().toLocaleString(),
    updateTime: new Date().toLocaleString()
  }
  mockSafetyToolData.push(newTool)
  return newTool
}

// 更新安全工器具
export function mockUpdateSafetyTool(
  id: number,
  data: Partial<SafetyTool>
): SafetyTool | undefined {
  const index = mockSafetyToolData.findIndex(item => item.id === id)
  if (index > -1) {
    mockSafetyToolData[index] = { ...mockSafetyToolData[index], ...data, updateTime: new Date().toLocaleString() }
    return mockSafetyToolData[index]
  }
  return undefined
}

// 删除安全工器具
export function mockDeleteSafetyTool(id: number): boolean {
  const index = mockSafetyToolData.findIndex(item => item.id === id)
  if (index > -1) {
    mockSafetyToolData.splice(index, 1)
    delete mockInspectionRecords[id]
    return true
  }
  return false
}

// 获取校验记录列表
export function mockGetInspectionRecordList(toolId: number): InspectionRecord[] {
  return mockInspectionRecords[toolId] || []
}

// 新增校验记录
export function mockAddInspectionRecord(
  toolId: number,
  data: Omit<InspectionRecord, 'id' | 'toolId' | 'createTime'>
): InspectionRecord {
  const newRecord: InspectionRecord = {
    id: Date.now(),
    toolId,
    ...data,
    createTime: new Date().toLocaleString()
  }

  if (!mockInspectionRecords[toolId]) {
    mockInspectionRecords[toolId] = []
  }
  mockInspectionRecords[toolId].unshift(newRecord)

  // 更新工器具的校验日期和状态
  const tool = mockSafetyToolData.find(item => item.id === toolId)
  if (tool) {
    tool.lastInspectionDate = data.inspectionDate
    // 计算下次校验日期（按年计算）
    const nextDate = new Date(data.inspectionDate)
    nextDate.setFullYear(nextDate.getFullYear() + Math.floor(tool.inspectionCycle))
    // 处理小数年份（如0.5年=6个月）
    const months = Math.round((tool.inspectionCycle % 1) * 12)
    if (months > 0) {
      nextDate.setMonth(nextDate.getMonth() + months)
    }
    tool.nextInspectionDate = nextDate.toISOString().split('T')[0]

    // 更新校验状态
    const daysDiff = Math.ceil((nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (daysDiff > 7) {
      tool.verificationStatus = 'normal'
    } else if (daysDiff >= 0) {
      tool.verificationStatus = 'warning'
    } else {
      tool.verificationStatus = 'expired'
    }
    tool.updateTime = new Date().toLocaleString()
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
