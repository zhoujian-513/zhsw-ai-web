import { AppRouteRecord } from '@/types/router'
import { workbenchRoutes } from './workbench'
import { deviceRoutes } from './device'
import { monitorRoutes } from './monitor'
import { productionRoutes } from './production'
import { safetyRoutes } from './safety'
import { pipelineRoutes } from './pipeline'
import { operationRoutes } from './operation'
import { materialRoutes } from './material'
import { systemRoutes } from './system'

/**
 * 平台功能清单对应的路由模块
 * 严格按照平台功能清单文档组织
 * 8个一级菜单：设备中心、监测中心、生产管理、安全管理、管网监测、经营管理、物资管理、系统管理
 */
export const routeModules: AppRouteRecord[] = [
  workbenchRoutes,    // 工作台
  deviceRoutes,       // 1. 设备中心
  monitorRoutes,      // 35. 监测中心
  productionRoutes,   // 53. 生产管理
  safetyRoutes,       // 80. 安全管理
  pipelineRoutes,     // 124. 管网监测
  operationRoutes,    // 177. 经营管理
  materialRoutes,     // 212. 物资管理
  systemRoutes        // 229. 系统管理
]
