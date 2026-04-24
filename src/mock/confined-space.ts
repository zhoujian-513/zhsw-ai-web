import type { ConfinedSpace, ConfinedSpaceFormData, ConfinedSpaceQueryParams, AuditRecord, HistoryRecord } from '@/types/confined-space'
import { RiskType, AuditStatus } from '@/types/confined-space'
import type { PaginationResponse } from '@/types/api'

// 模拟有限空间台账数据
let mockConfinedSpaceData: ConfinedSpace[] = [
  {
    id: 1,
    stationId: 1,
    stationName: '第一污水处理厂',
    code: 1001,
    structure: '进水泵房',
    location: '泵房地下一层集水池',
    riskAnalysis: [RiskType.HYPOXIA, RiskType.ODOR],
    riskControlMeasures: '1.作业前必须进行通风换气；2.作业人员必须佩戴防毒面具；3.必须配备气体检测仪；4.必须设置专人监护；5.严格执行作业审批制度',
    responsiblePerson: '张三',
    remark: '重点监控区域',
    photos: ['https://picsum.photos/200/200?random=1', 'https://picsum.photos/200/200?random=2'],
    status: AuditStatus.APPROVED,
    auditComment: '审核通过，风险管控措施完善',
    createBy: '李四',
    createTime: '2024-01-15 10:30:00',
    auditBy: '王五',
    auditTime: '2024-01-16 09:00:00',
    updateTime: '2024-01-16 09:00:00'
  },
  {
    id: 2,
    stationId: 1,
    stationName: '第一污水处理厂',
    code: 1002,
    structure: '生化池',
    location: '1号生化池检修井',
    riskAnalysis: [RiskType.HYPOXIA, RiskType.POISONING],
    riskControlMeasures: '1.进入前必须进行气体检测；2.作业人员佩戴正压式呼吸器；3.设置安全绳和三角架；4.持续通风；5.监护人员不得离开',
    responsiblePerson: '赵六',
    remark: '',
    photos: [],
    status: AuditStatus.APPROVED,
    auditComment: '同意',
    createBy: '李四',
    createTime: '2024-01-20 14:00:00',
    auditBy: '王五',
    auditTime: '2024-01-21 10:00:00',
    updateTime: '2024-01-21 10:00:00'
  },
  {
    id: 3,
    stationId: 2,
    stationName: '第二污水处理厂',
    code: 2001,
    structure: '污泥脱水机房',
    location: '污泥料仓内部',
    riskAnalysis: [RiskType.HYPOXIA, RiskType.ASPHYXIATION],
    riskControlMeasures: '1.严格执行有限空间作业票制度；2.作业前强制通风30分钟以上；3.佩戴自给式空气呼吸器；4.设置应急救援装备；5.保持通讯畅通',
    responsiblePerson: '孙七',
    remark: '需定期检查',
    photos: ['https://picsum.photos/200/200?random=3'],
    status: AuditStatus.PENDING,
    createBy: '周八',
    createTime: '2024-02-01 09:00:00'
  },
  {
    id: 4,
    stationId: 1,
    stationName: '第一污水处理厂',
    code: 1003,
    structure: '消毒池',
    location: '消毒池地下管廊',
    riskAnalysis: [RiskType.POISONING, RiskType.ODOR],
    riskControlMeasures: '1.检测氯气浓度；2.佩戴防毒面具；3.准备应急药品；4.设置警示标识；5.限制作业时间',
    responsiblePerson: '吴九',
    remark: '',
    photos: [],
    status: AuditStatus.PENDING,
    createBy: '李四',
    createTime: '2024-02-05 11:00:00'
  },
  {
    id: 5,
    stationId: 3,
    stationName: '第三污水处理厂',
    code: 3001,
    structure: '粗格栅间',
    location: '格栅渠道底部',
    riskAnalysis: [RiskType.HYPOXIA, RiskType.ODOR, RiskType.POISONING],
    riskControlMeasures: '1.提前开启通风设备；2.检测H2S和CH4浓度；3.佩戴防护装备；4.设置安全监护人；5.准备应急救援设备',
    responsiblePerson: '郑十',
    remark: '新增加区域',
    photos: ['https://picsum.photos/200/200?random=4', 'https://picsum.photos/200/200?random=5'],
    status: AuditStatus.APPROVED,
    auditComment: '审核通过',
    createBy: '钱十一',
    createTime: '2024-02-10 08:30:00',
    auditBy: '王十二',
    auditTime: '2024-02-11 09:00:00',
    updateTime: '2024-02-11 09:00:00'
  }
]

// 模拟审核记录数据
const mockAuditRecords: Record<number, AuditRecord[]> = {
  1: [
    {
      id: 1,
      spaceId: 1,
      auditBy: '王五',
      auditTime: '2024-01-16 09:00:00',
      approved: true,
      comment: '审核通过，风险管控措施完善'
    }
  ],
  2: [
    {
      id: 2,
      spaceId: 2,
      auditBy: '王五',
      auditTime: '2024-01-21 10:00:00',
      approved: true,
      comment: '同意'
    }
  ],
  5: [
    {
      id: 3,
      spaceId: 5,
      auditBy: '王十二',
      auditTime: '2024-02-11 09:00:00',
      approved: true,
      comment: '审核通过'
    }
  ]
}

// 模拟历史修改记录数据
const mockHistoryRecords: Record<number, HistoryRecord[]> = {
  1: [
    {
      id: 1,
      operationType: 'create',
      content: '创建有限空间台账',
      operator: '李四',
      operationTime: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      operationType: 'audit',
      content: '审核通过：风险管控措施完善',
      operator: '王五',
      operationTime: '2024-01-16 09:00:00'
    }
  ],
  2: [
    {
      id: 3,
      operationType: 'create',
      content: '创建有限空间台账',
      operator: '李四',
      operationTime: '2024-01-20 14:00:00'
    },
    {
      id: 4,
      operationType: 'audit',
      content: '审核通过',
      operator: '王五',
      operationTime: '2024-01-21 10:00:00'
    }
  ],
  3: [
    {
      id: 5,
      operationType: 'create',
      content: '创建有限空间台账',
      operator: '周八',
      operationTime: '2024-02-01 09:00:00'
    }
  ],
  5: [
    {
      id: 6,
      operationType: 'create',
      content: '创建有限空间台账',
      operator: '钱十一',
      operationTime: '2024-02-10 08:30:00'
    },
    {
      id: 7,
      operationType: 'audit',
      content: '审核通过',
      operator: '王十二',
      operationTime: '2024-02-11 09:00:00'
    }
  ]
}

// 获取有限空间台账列表
export function mockGetConfinedSpaceList(
  params: ConfinedSpaceQueryParams
): PaginationResponse<ConfinedSpace> {
  let list = [...mockConfinedSpaceData]

  // 筛选
  if (params.stationId) {
    list = list.filter(item => item.stationId === params.stationId)
  }
  if (params.code) {
    list = list.filter(item => item.code === params.code)
  }
  if (params.structure) {
    list = list.filter(item => item.structure === params.structure)
  }
  if (params.status) {
    list = list.filter(item => item.status === params.status)
  }
  if (params.riskAnalysis && params.riskAnalysis.length > 0) {
    list = list.filter(item =>
      params.riskAnalysis!.some(risk => item.riskAnalysis.includes(risk))
    )
  }
  if (params.createMonth) {
    list = list.filter(item => item.createTime.startsWith(params.createMonth!))
  }

  // 分页
  const total = list.length
  const start = (params.page - 1) * params.pageSize
  const end = start + params.pageSize
  list = list.slice(start, end)

  return {
    list,
    total,
    page: params.page,
    pageSize: params.pageSize
  }
}

// 获取有限空间台账详情
export function mockGetConfinedSpaceDetail(id: number): ConfinedSpace | undefined {
  return mockConfinedSpaceData.find(item => item.id === id)
}

// 创建有限空间台账
export function mockCreateConfinedSpace(data: ConfinedSpaceFormData): ConfinedSpace {
  const stationMap: Record<number, string> = {
    1: '第一污水处理厂',
    2: '第二污水处理厂',
    3: '第三污水处理厂'
  }

  const newItem: ConfinedSpace = {
    id: Date.now(),
    stationId: data.stationId,
    stationName: stationMap[data.stationId] || '未知厂站',
    code: data.code,
    structure: data.structure,
    location: data.location,
    riskAnalysis: data.riskAnalysis,
    riskControlMeasures: data.riskControlMeasures,
    responsiblePerson: data.responsiblePerson,
    remark: data.remark || '',
    photos: data.photos || [],
    status: AuditStatus.PENDING,
    createBy: '当前用户',
    createTime: new Date().toLocaleString()
  }

  mockConfinedSpaceData.unshift(newItem)

  // 添加历史记录
  mockHistoryRecords[newItem.id] = [{
    id: Date.now(),
    operationType: 'create',
    content: '创建有限空间台账',
    operator: '当前用户',
    operationTime: new Date().toLocaleString()
  }]

  return newItem
}

// 更新有限空间台账
export function mockUpdateConfinedSpace(
  id: number,
  data: Partial<ConfinedSpaceFormData>
): ConfinedSpace | undefined {
  const index = mockConfinedSpaceData.findIndex(item => item.id === id)
  if (index > -1) {
    const stationMap: Record<number, string> = {
      1: '第一污水处理厂',
      2: '第二污水处理厂',
      3: '第三污水处理厂'
    }

    mockConfinedSpaceData[index] = {
      ...mockConfinedSpaceData[index],
      ...data,
      stationName: data.stationId ? stationMap[data.stationId] : mockConfinedSpaceData[index].stationName,
      updateTime: new Date().toLocaleString()
    }

    // 添加历史记录
    if (!mockHistoryRecords[id]) {
      mockHistoryRecords[id] = []
    }
    mockHistoryRecords[id].unshift({
      id: Date.now(),
      operationType: 'update',
      content: '修改有限空间台账信息',
      operator: '当前用户',
      operationTime: new Date().toLocaleString()
    })

    return mockConfinedSpaceData[index]
  }
  return undefined
}

// 删除有限空间台账
export function mockDeleteConfinedSpace(id: number): boolean {
  const index = mockConfinedSpaceData.findIndex(item => item.id === id)
  if (index > -1) {
    mockConfinedSpaceData.splice(index, 1)
    return true
  }
  return false
}

// 审核有限空间台账
export function mockAuditConfinedSpace(
  id: number,
  approved: boolean,
  comment: string
): ConfinedSpace | undefined {
  const index = mockConfinedSpaceData.findIndex(item => item.id === id)
  if (index > -1) {
    mockConfinedSpaceData[index].status = approved ? AuditStatus.APPROVED : AuditStatus.PENDING
    mockConfinedSpaceData[index].auditComment = comment
    mockConfinedSpaceData[index].auditBy = '当前审核人'
    mockConfinedSpaceData[index].auditTime = new Date().toLocaleString()
    mockConfinedSpaceData[index].updateTime = new Date().toLocaleString()

    // 添加审核记录
    if (!mockAuditRecords[id]) {
      mockAuditRecords[id] = []
    }
    mockAuditRecords[id].unshift({
      id: Date.now(),
      spaceId: id,
      auditBy: '当前审核人',
      auditTime: new Date().toLocaleString(),
      approved,
      comment
    })

    // 添加历史记录
    if (!mockHistoryRecords[id]) {
      mockHistoryRecords[id] = []
    }
    mockHistoryRecords[id].unshift({
      id: Date.now(),
      operationType: 'audit',
      content: approved ? `审核通过：${comment}` : `审核不通过：${comment}`,
      operator: '当前审核人',
      operationTime: new Date().toLocaleString()
    })

    return mockConfinedSpaceData[index]
  }
  return undefined
}

// 批量审核有限空间台账
export function mockBatchAuditConfinedSpace(
  ids: number[],
  approved: boolean,
  comment: string
): { success: boolean; message: string } {
  let successCount = 0
  ids.forEach(id => {
    const result = mockAuditConfinedSpace(id, approved, comment)
    if (result) {
      successCount++
    }
  })

  return {
    success: successCount === ids.length,
    message: `成功审核 ${successCount} 条记录`
  }
}

// 获取审核记录列表
export function mockGetAuditRecordList(spaceId: number): AuditRecord[] {
  return mockAuditRecords[spaceId] || []
}

// 获取历史修改记录列表
export function mockGetHistoryRecordList(spaceId: number): HistoryRecord[] {
  return mockHistoryRecords[spaceId] || []
}

// 获取厂站列表
export function mockGetStationList(): Array<{ id: number; name: string }> {
  return [
    { id: 1, name: '第一污水处理厂' },
    { id: 2, name: '第二污水处理厂' },
    { id: 3, name: '第三污水处理厂' }
  ]
}

// 获取构筑物列表
export function mockGetStructureList(stationId?: number): Array<{ id: number; name: string }> {
  const structureMap: Record<number, Array<{ id: number; name: string }>> = {
    1: [
      { id: 1, name: '进水泵房' },
      { id: 2, name: '生化池' },
      { id: 3, name: '消毒池' },
      { id: 4, name: '污泥脱水机房' }
    ],
    2: [
      { id: 5, name: '粗格栅间' },
      { id: 6, name: '细格栅间' },
      { id: 7, name: '污泥脱水机房' },
      { id: 8, name: '鼓风机房' }
    ],
    3: [
      { id: 9, name: '进水泵房' },
      { id: 10, name: '沉淀池' },
      { id: 11, name: '生化池' },
      { id: 12, name: '污泥浓缩池' }
    ]
  }

  if (stationId) {
    return structureMap[stationId] || []
  }

  // 返回所有构筑物
  return Object.values(structureMap).flat()
}
