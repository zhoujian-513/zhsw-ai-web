/**
 * 页面链接分享工具
 * 用于生成各页面的外部访问链接
 */
import { ElMessage } from 'element-plus'

/**
 * 页面路由配置
 * 定义所有可分享的页面
 */
export const shareablePages = [
  // ==================== 工作台 ====================
  {
    name: '工作台',
    path: '/workbench',
    icon: '&#xe81a;',
    description: '个人工作台首页'
  },

  // ==================== 设备管理 ====================
  {
    name: '设备编码配置',
    path: '/device/code-config',
    icon: '&#xe8b5;',
    description: '设备编码规则配置'
  },
  {
    name: '设备台账',
    path: '/device/ledger',
    icon: '&#xe8b5;',
    description: '设备台账管理'
  },
  {
    name: '设备缺陷',
    path: '/device/defect',
    icon: '&#xe8b5;',
    description: '设备缺陷管理'
  },
  {
    name: '设备评价',
    path: '/device/evaluation',
    icon: '&#xe8b5;',
    description: '设备健康评价'
  },
  {
    name: '设备检修-日常维护',
    path: '/device/project/maintenance',
    icon: '&#xe8b5;',
    description: '设备日常维护管理'
  },
  {
    name: '设备检修-年度检修',
    path: '/device/project/annual-repair',
    icon: '&#xe8b5;',
    description: '设备年度检修管理'
  },
  {
    name: '设备检修-大修管理',
    path: '/device/project/overhaul',
    icon: '&#xe8b5;',
    description: '设备大修项目管理'
  },
  {
    name: '设备规程',
    path: '/device/regulation',
    icon: '&#xe8b5;',
    description: '设备操作规程管理'
  },
  {
    name: '设备分析',
    path: '/device/analysis',
    icon: '&#xe8b5;',
    description: '设备运行分析'
  },

  // ==================== 监测中心 ====================
  {
    name: '监测对象配置',
    path: '/monitor/object-config',
    icon: '&#xe638;',
    description: '监测对象配置管理'
  },
  {
    name: '监测数据',
    path: '/monitor/data',
    icon: '&#xe638;',
    description: '实时监测数据查看'
  },
  {
    name: '视频监控',
    path: '/monitor/video',
    icon: '&#xe638;',
    description: '视频监控管理'
  },
  {
    name: '报警管理',
    path: '/monitor/alarm',
    icon: '&#xe638;',
    description: '报警记录管理'
  },
  {
    name: '数据分析',
    path: '/monitor/data-analysis',
    icon: '&#xe638;',
    description: '监测数据分析'
  },
  {
    name: '监测地图',
    path: '/monitor/map',
    icon: '&#xe638;',
    description: '监测点位地图展示'
  },

  // ==================== 生产管理 ====================
  {
    name: '运维工单',
    path: '/production/work-order',
    icon: '&#xe622;',
    description: '运维工单管理'
  },
  {
    name: '现场作业',
    path: '/production/scene',
    icon: '&#xe622;',
    description: '现场作业管理'
  },
  {
    name: '两票管理',
    path: '/production/two-ticket',
    icon: '&#xe622;',
    description: '工作票操作票管理'
  },
  {
    name: '值班管理',
    path: '/production/duty',
    icon: '&#xe622;',
    description: '值班排班管理'
  },
  {
    name: '交接班管理',
    path: '/production/handover',
    icon: '&#xe622;',
    description: '交接班记录管理'
  },
  {
    name: '工艺可视化',
    path: '/production/process-visual',
    icon: '&#xe622;',
    description: '生产工艺流程可视化'
  },

  // ==================== 计划经营 ====================
  {
    name: '预算管理',
    path: '/planning/budget',
    icon: '&#xe6e7;',
    description: '年度预算编制与管理'
  },
  {
    name: '成本管理',
    path: '/planning/cost',
    icon: '&#xe6e7;',
    description: '生产成本核算与分析'
  },
  {
    name: '合同管理',
    path: '/planning/contract',
    icon: '&#xe6e7;',
    description: '合同签订与执行跟踪'
  },
  {
    name: '绩效考核',
    path: '/planning/performance',
    icon: '&#xe6e7;',
    description: '部门及个人绩效考核'
  },

  // ==================== 安全管理 ====================
  {
    name: '应急抢修管理',
    path: '/safety/emergency-repair',
    icon: '&#xe628;',
    description: '应急事件初报、续报、终报管理'
  },
  {
    name: '有限空间台账',
    path: '/safety/confined-space',
    icon: '&#xe628;',
    description: '有限空间作业管理台账'
  },
  {
    name: '特种设备台账',
    path: '/safety/special-equipment',
    icon: '&#xe628;',
    description: '特种设备管理台账'
  },
  {
    name: '隐患排查',
    path: '/safety/hazard',
    icon: '&#xe628;',
    description: '安全隐患排查记录'
  },
  {
    name: '安全巡检',
    path: '/safety/inspection',
    icon: '&#xe628;',
    description: '安全巡检管理'
  },
  {
    name: '应急预案',
    path: '/safety/emergency',
    icon: '&#xe628;',
    description: '应急预案管理'
  },
  {
    name: '事故记录',
    path: '/safety/accident',
    icon: '&#xe628;',
    description: '安全事故记录'
  },

  // ==================== 物资管理 ====================
  {
    name: '仓库管理',
    path: '/material/warehouse',
    icon: '&#xe675;',
    description: '仓库基础信息管理'
  },
  {
    name: '采购管理',
    path: '/material/purchase',
    icon: '&#xe675;',
    description: '物资采购申请与审批'
  },
  {
    name: '库存管理',
    path: '/material/inventory',
    icon: '&#xe675;',
    description: '库存盘点与预警'
  },
  {
    name: '出入库管理',
    path: '/material/inout',
    icon: '&#xe675;',
    description: '物资出入库记录'
  },

  // ==================== 管网管理 ====================
  {
    name: 'GIS地图',
    path: '/pipeline/gis',
    icon: '&#xe630;',
    description: '管网GIS地图展示'
  },
  {
    name: '漏损管理',
    path: '/pipeline/leakage',
    icon: '&#xe630;',
    description: '管网漏损检测与分析'
  },
  {
    name: '巡检管理',
    path: '/pipeline/patrol',
    icon: '&#xe630;',
    description: '管网巡检计划与记录'
  },
  {
    name: '档案管理',
    path: '/pipeline/archive',
    icon: '&#xe630;',
    description: '管网工程档案管理'
  },

  // ==================== AI助手 ====================
  {
    name: '智能问答',
    path: '/ai-assistant/chat',
    icon: '&#xe8d3;',
    description: 'AI智能问答助手'
  },
  {
    name: '预警分析',
    path: '/ai-assistant/warning',
    icon: '&#xe8d3;',
    description: 'AI智能预警分析'
  },
  {
    name: '报表生成',
    path: '/ai-assistant/report',
    icon: '&#xe8d3;',
    description: 'AI自动生成报表'
  },

  // ==================== 报表中心 ====================
  {
    name: '生产报表',
    path: '/report/production',
    icon: '&#xe6e6;',
    description: '生产数据报表'
  },
  {
    name: '运营报表',
    path: '/report/operation',
    icon: '&#xe6e6;',
    description: '运营分析报表'
  },
  {
    name: '质量报表',
    path: '/report/quality',
    icon: '&#xe6e6;',
    description: '水质监测报表'
  },
  {
    name: '自定义报表',
    path: '/report/custom',
    icon: '&#xe6e6;',
    description: '自定义报表设计'
  },

  // ==================== 系统管理 ====================
  {
    name: '用户管理',
    path: '/system/user',
    icon: '&#xe6e8;',
    description: '系统用户管理'
  },
  {
    name: '角色管理',
    path: '/system/role',
    icon: '&#xe6e8;',
    description: '角色权限配置'
  },
  {
    name: '菜单管理',
    path: '/system/menu',
    icon: '&#xe6e8;',
    description: '系统菜单配置'
  },
  {
    name: '组织架构',
    path: '/system/organization',
    icon: '&#xe6e8;',
    description: '组织架构管理'
  },
  {
    name: '日志管理',
    path: '/system/log',
    icon: '&#xe6e8;',
    description: '系统操作日志'
  },
  {
    name: '系统配置',
    path: '/system/config',
    icon: '&#xe6e8;',
    description: '系统参数配置'
  }
]

/**
 * 生成完整的外部访问链接
 * @param path 页面路径
 * @returns 完整URL
 */
export function generateShareLink(path: string): string {
  const baseUrl = window.location.origin
  return `${baseUrl}${path}`
}

/**
 * 生成带参数的详情页链接
 * @param path 基础路径
 * @param params 查询参数
 * @returns 完整URL
 */
export function generateDetailLink(
  path: string,
  params?: Record<string, string | number>
): string {
  const baseUrl = window.location.origin
  let url = `${baseUrl}${path}`

  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString()
    url += `?${queryString}`
  }

  return url
}

/**
 * 复制链接到剪贴板
 * @param link 要复制的链接
 * @param showMessage 是否显示成功提示
 */
export async function copyLinkToClipboard(
  link: string,
  showMessage: boolean = true
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(link)
    if (showMessage) {
      ElMessage.success('链接已复制到剪贴板')
    }
    return true
  } catch (error) {
    console.error('复制链接失败:', error)
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = link
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      if (showMessage) {
        ElMessage.success('链接已复制到剪贴板')
      }
      return true
    } catch (err) {
      console.error('降级复制失败:', err)
      ElMessage.error('复制失败，请手动复制')
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * 复制当前页面链接
 */
export function copyCurrentPageLink(): void {
  const currentUrl = window.location.href
  copyLinkToClipboard(currentUrl)
}

/**
 * 生成二维码（使用第三方API）
 * @param link 要生成二维码的链接
 * @returns 二维码图片URL
 */
export function generateQRCode(link: string): string {
  // 使用 QRCode.js 或其他二维码生成服务
  // 这里使用 QRServer 的免费API
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`
}

/**
 * 生成邮件分享链接
 * @param link 页面链接
 * @param title 邮件主题
 * @param description 邮件内容
 */
export function generateEmailShareLink(
  link: string,
  title: string,
  description?: string
): string {
  const subject = encodeURIComponent(title)
  const body = encodeURIComponent(
    `${description || ''}\n\n点击链接查看：${link}`
  )
  return `mailto:?subject=${subject}&body=${body}`
}

/**
 * 生成企业微信分享链接
 * @param link 页面链接
 * @param title 分享标题
 * @param description 分享描述
 */
export function generateWeChatWorkShareLink(
  link: string,
  title: string,
  description?: string
): string {
  // 企业微信分享需要使用企业微信JS-SDK
  // 这里返回一个提示信息
  return `weixin://dl/business/?t= ${encodeURIComponent(link)}`
}

/**
 * 获取页面信息
 * @param path 页面路径
 */
export function getPageInfo(path: string) {
  return shareablePages.find(page => page.path === path) || {
    name: '未知页面',
    path,
    icon: '&#xe628;',
    description: ''
  }
}

/**
 * 搜索可分享页面
 * @param keyword 搜索关键词
 */
export function searchShareablePages(keyword: string) {
  if (!keyword) return shareablePages
  const lowerKeyword = keyword.toLowerCase()
  return shareablePages.filter(
    page =>
      page.name.toLowerCase().includes(lowerKeyword) ||
      page.description.toLowerCase().includes(lowerKeyword)
  )
}
