import { AppRouteRecord } from '@/types/router'
import { workbenchRoutes } from './workbench'
import { organizationTemplateRoutes } from './organization-template'
import { permissionTemplateRoutes } from './permission-template'
import { dashboardRoutes } from './dashboard'
import { deviceRoutes } from './device'
import { monitorRoutes } from './monitor'
import { productionRoutes } from './production'
import { safetyRoutes } from './safety'
import { materialRoutes } from './material'
import { operationRoutes } from './operation'
import { pipelineRoutes } from './pipeline'
import { aiAssistantRoutes } from './ai-assistant'

export const routeModules: AppRouteRecord[] = [
  workbenchRoutes,
  dashboardRoutes,
  deviceRoutes,
  monitorRoutes,
  productionRoutes,
  safetyRoutes,
  materialRoutes,
  operationRoutes,
  pipelineRoutes,
  aiAssistantRoutes,
  organizationTemplateRoutes,
  permissionTemplateRoutes,
]
