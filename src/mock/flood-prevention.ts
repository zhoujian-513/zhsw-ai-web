import type { FloodPrevention, FloodProjectDetail, ProjectInfo } from '@/types/flood-prevention'
import type { PaginationResponse } from '@/types/api'
import { FloodProjectType, RiskType } from '@/types/flood-prevention'

// 模拟防汛专项管理数据
const mockFloodPreventionData: FloodPrevention[] = [
  {
    id: 1,
    projectId: 1,
    projectName: '第一污水处理厂扩建工程',
    location: '广东省深圳市宝安区',
    regionCompany: '深圳区域公司',
    projectDetails: [
      {
        id: 1,
        floodPreventionId: 1,
        projectName: '主厂区防汛排涝系统',
        projectType: FloodProjectType.DRAINAGE,
        riskType: RiskType.LOW_LYING,
        relatedWaterSystem: '茅洲河',
        floodSeasonStart: '2024-04',
        floodSeasonEnd: '2024-10',
        keyNodeSchedule: '2024年6月完成泵站设备安装',
        mainImpact: '厂区地势低洼，暴雨时易积水，影响生产运行',
        safeguardMeasures: '1.完善排水管网；2.增设应急排水泵；3.建立24小时值班制度；4.储备防汛物资',
        constructionUnit: '深圳市市政工程总公司',
        historicalIncidents: '2023年8月受台风影响，厂区短暂积水，已整改',
        remark: '重点关注区域',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-03-20 14:20:00'
      },
      {
        id: 2,
        floodPreventionId: 1,
        projectName: '茅洲河堤防加固工程',
        projectType: FloodProjectType.HYDRAULIC,
        riskType: RiskType.NEAR_RIVER,
        relatedWaterSystem: '茅洲河',
        floodSeasonStart: '2024-04',
        floodSeasonEnd: '2024-10',
        keyNodeSchedule: '2024年5月完成堤防加固',
        mainImpact: '临近茅洲河，汛期河水倒灌风险',
        safeguardMeasures: '1.加固堤防；2.设置防洪闸门；3.加强巡查监测',
        constructionUnit: '广东省水利水电建设有限公司',
        historicalIncidents: '无',
        remark: '',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-03-20 14:20:00'
      }
    ],
    createBy: '张三',
    createTime: '2024-01-15 10:30:00',
    updateBy: '李四',
    updateTime: '2024-03-20 14:20:00'
  },
  {
    id: 2,
    projectId: 2,
    projectName: '第二污水处理厂提标改造工程',
    location: '广东省广州市番禺区',
    regionCompany: '广州区域公司',
    projectDetails: [
      {
        id: 3,
        floodPreventionId: 2,
        projectName: '生化池防汛工程',
        projectType: FloodProjectType.HYDRAULIC,
        riskType: RiskType.NODE_DEADLINE,
        relatedWaterSystem: '珠江',
        floodSeasonStart: '2024-05',
        floodSeasonEnd: '2024-09',
        keyNodeSchedule: '2024年6月30日前完成主体工程',
        mainImpact: '汛前有明确节点工期，需确保汛期前完成关键工程',
        safeguardMeasures: '1.优化施工方案；2.增加施工人员和设备；3.制定应急预案',
        constructionUnit: '广州市政集团有限公司',
        historicalIncidents: '无',
        remark: '工期紧张，需重点关注',
        createTime: '2024-02-01 09:00:00',
        updateTime: '2024-03-15 11:30:00'
      }
    ],
    createBy: '王五',
    createTime: '2024-02-01 09:00:00',
    updateBy: '王五',
    updateTime: '2024-03-15 11:30:00'
  },
  {
    id: 3,
    projectId: 3,
    projectName: '第三污水处理厂新建工程',
    location: '广东省东莞市虎门镇',
    regionCompany: '东莞区域公司',
    projectDetails: [
      {
        id: 4,
        floodPreventionId: 3,
        projectName: '箱涵排水系统',
        projectType: FloodProjectType.DRAINAGE,
        riskType: RiskType.TYPHOON_AFFECTED,
        relatedWaterSystem: '太平水道',
        floodSeasonStart: '2024-04',
        floodSeasonEnd: '2024-11',
        keyNodeSchedule: '2024年7月完成箱涵贯通',
        mainImpact: '地处沿海，受台风、大风影响大',
        safeguardMeasures: '1.加固临时设施；2.制定防台风预案；3.密切关注气象预警',
        constructionUnit: '东莞市建筑工程有限公司',
        historicalIncidents: '2022年台风期间工地临时设施受损，已加强防护',
        remark: '台风高发区域',
        createTime: '2024-01-20 14:00:00',
        updateTime: '2024-03-10 16:00:00'
      },
      {
        id: 5,
        floodPreventionId: 3,
        projectName: '泵站设备安装',
        projectType: FloodProjectType.OTHER,
        riskType: RiskType.DEFECT_TASK,
        relatedWaterSystem: '太平水道',
        floodSeasonStart: '2024-04',
        floodSeasonEnd: '2024-11',
        keyNodeSchedule: '2024年5月完成消缺任务',
        mainImpact: '汛前有具体消缺任务，需确保设备正常运行',
        safeguardMeasures: '1.加快安装进度；2.提前调试设备；3.备足备品备件',
        constructionUnit: '东莞市机电安装公司',
        historicalIncidents: '无',
        remark: '',
        createTime: '2024-01-20 14:00:00',
        updateTime: '2024-03-10 16:00:00'
      }
    ],
    createBy: '赵六',
    createTime: '2024-01-20 14:00:00',
    updateBy: '孙七',
    updateTime: '2024-03-10 16:00:00'
  },
  {
    id: 4,
    projectId: 4,
    projectName: '某河道治理工程',
    location: '广东省佛山市南海区',
    regionCompany: '佛山区域公司',
    projectDetails: [
      {
        id: 6,
        floodPreventionId: 4,
        projectName: '河道清淤工程',
        projectType: FloodProjectType.HYDRAULIC,
        riskType: RiskType.OTHER,
        relatedWaterSystem: '汾江河',
        floodSeasonStart: '2024-05',
        floodSeasonEnd: '2024-09',
        keyNodeSchedule: '2024年6月完成清淤',
        mainImpact: '河道淤积影响行洪',
        safeguardMeasures: '1.分段施工；2.设置围堰；3.加强水质监测',
        constructionUnit: '佛山市水利工程公司',
        historicalIncidents: '无',
        remark: '',
        createTime: '2024-02-10 10:00:00',
        updateTime: '2024-02-10 10:00:00'
      }
    ],
    createBy: '周八',
    createTime: '2024-02-10 10:00:00',
    updateBy: '周八',
    updateTime: '2024-02-10 10:00:00'
  },
  {
    id: 5,
    projectId: 5,
    projectName: '某泵站改造工程',
    location: '广东省中山市石岐区',
    regionCompany: '中山区域公司',
    projectDetails: [
      {
        id: 7,
        floodPreventionId: 5,
        projectName: '泵站主体工程',
        projectType: FloodProjectType.DRAINAGE,
        riskType: RiskType.LOW_LYING,
        relatedWaterSystem: '岐江河',
        floodSeasonStart: '2024-04',
        floodSeasonEnd: '2024-10',
        keyNodeSchedule: '2024年5月完成主体改造',
        mainImpact: '泵站地势低洼，设备易受淹',
        safeguardMeasures: '1.抬高设备基础；2.完善排水设施；3.设置应急电源',
        constructionUnit: '中山市市政工程公司',
        historicalIncidents: '2021年暴雨导致泵站停机，已改造',
        remark: '改造后需验证效果',
        createTime: '2024-01-05 08:30:00',
        updateTime: '2024-03-25 09:00:00'
      }
    ],
    createBy: '吴九',
    createTime: '2024-01-05 08:30:00',
    updateBy: '郑十',
    updateTime: '2024-03-25 09:00:00'
  }
]

// 模拟项目列表数据
const mockProjectList: ProjectInfo[] = [
  { id: 1, name: '第一污水处理厂扩建工程', location: '广东省深圳市宝安区', regionCompany: '深圳区域公司' },
  { id: 2, name: '第二污水处理厂提标改造工程', location: '广东省广州市番禺区', regionCompany: '广州区域公司' },
  { id: 3, name: '第三污水处理厂新建工程', location: '广东省东莞市虎门镇', regionCompany: '东莞区域公司' },
  { id: 4, name: '某河道治理工程', location: '广东省佛山市南海区', regionCompany: '佛山区域公司' },
  { id: 5, name: '某泵站改造工程', location: '广东省中山市石岐区', regionCompany: '中山区域公司' },
  { id: 6, name: '某管网建设工程', location: '广东省珠海市香洲区', regionCompany: '珠海区域公司' },
  { id: 7, name: '某水厂建设工程', location: '广东省惠州市惠城区', regionCompany: '惠州区域公司' }
]

// 获取防汛专项管理列表
export function mockGetFloodPreventionList(
  page: number,
  pageSize: number,
  projectId?: number,
  keyword?: string,
  regionCompany?: string
): PaginationResponse<FloodPrevention> {
  let list = [...mockFloodPreventionData]

  // 筛选
  if (projectId) {
    list = list.filter(item => item.projectId === projectId)
  }
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase()
    list = list.filter(item =>
      item.projectName.toLowerCase().includes(lowerKeyword) ||
      item.location.toLowerCase().includes(lowerKeyword)
    )
  }
  if (regionCompany) {
    list = list.filter(item => item.regionCompany === regionCompany)
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

// 获取防汛专项管理详情
export function mockGetFloodPreventionDetail(id: number): FloodPrevention | undefined {
  return mockFloodPreventionData.find(item => item.id === id)
}

// 创建防汛专项管理
export function mockCreateFloodPrevention(data: {
  projectId: number
  projectDetails: Omit<FloodProjectDetail, 'id' | 'floodPreventionId' | 'createTime' | 'updateTime'>[]
}): FloodPrevention {
  const project = mockProjectList.find(p => p.id === data.projectId)
  const newId = Math.max(...mockFloodPreventionData.map(item => item.id)) + 1

  const newDetails: FloodProjectDetail[] = data.projectDetails.map((detail, index) => ({
    id: Date.now() + index,
    floodPreventionId: newId,
    ...detail,
    createTime: new Date().toLocaleString(),
    updateTime: new Date().toLocaleString()
  }))

  const newRecord: FloodPrevention = {
    id: newId,
    projectId: data.projectId,
    projectName: project?.name || '',
    location: project?.location || '',
    regionCompany: project?.regionCompany || '',
    projectDetails: newDetails,
    createBy: '当前用户',
    createTime: new Date().toLocaleString(),
    updateBy: '当前用户',
    updateTime: new Date().toLocaleString()
  }

  mockFloodPreventionData.push(newRecord)
  return newRecord
}

// 更新防汛专项管理
export function mockUpdateFloodPrevention(
  id: number,
  data: {
    projectId: number
    projectDetails: Omit<FloodProjectDetail, 'id' | 'floodPreventionId' | 'createTime' | 'updateTime'>[]
  }
): FloodPrevention | undefined {
  const index = mockFloodPreventionData.findIndex(item => item.id === id)
  if (index > -1) {
    const project = mockProjectList.find(p => p.id === data.projectId)

    const updatedDetails: FloodProjectDetail[] = data.projectDetails.map((detail, idx) => ({
      id: mockFloodPreventionData[index].projectDetails[idx]?.id || Date.now() + idx,
      floodPreventionId: id,
      ...detail,
      createTime: mockFloodPreventionData[index].projectDetails[idx]?.createTime || new Date().toLocaleString(),
      updateTime: new Date().toLocaleString()
    }))

    mockFloodPreventionData[index] = {
      ...mockFloodPreventionData[index],
      projectId: data.projectId,
      projectName: project?.name || mockFloodPreventionData[index].projectName,
      location: project?.location || mockFloodPreventionData[index].location,
      regionCompany: project?.regionCompany || mockFloodPreventionData[index].regionCompany,
      projectDetails: updatedDetails,
      updateBy: '当前用户',
      updateTime: new Date().toLocaleString()
    }
    return mockFloodPreventionData[index]
  }
  return undefined
}

// 删除防汛专项管理
export function mockDeleteFloodPrevention(id: number): boolean {
  const index = mockFloodPreventionData.findIndex(item => item.id === id)
  if (index > -1) {
    mockFloodPreventionData.splice(index, 1)
    return true
  }
  return false
}

// 获取项目列表
export function mockGetProjectList(): ProjectInfo[] {
  return mockProjectList
}
