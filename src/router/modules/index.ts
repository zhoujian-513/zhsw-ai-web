import { AppRouteRecord } from '@/types/router'
import { workbenchRoutes } from './workbench'
import { deviceRoutes } from './device'
import { monitorRoutes } from './monitor'
import { productionRoutes } from './production'
import { planningRoutes } from './planning'
import { safetyRoutes } from './safety'
import { materialRoutes } from './material'
import { pipelineRoutes } from './pipeline'
import { aiAssistantRoutes } from './ai-assistant'
import { reportRoutes } from './report'
import { systemRoutes } from './system'

export const routeModules: AppRouteRecord[] = [
  workbenchRoutes,
  deviceRoutes,
  monitorRoutes,
  productionRoutes,
  planningRoutes,
  safetyRoutes,
  materialRoutes,
  pipelineRoutes,
  aiAssistantRoutes,
  reportRoutes,
  systemRoutes
]
