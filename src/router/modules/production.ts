import type { AppRouteRecord } from '@/types/router'

export const productionRoutes: AppRouteRecord = {
  path: '/production',
  name: 'Production',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.production.title',
    icon: '&#xe622;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'work-order',
      name: 'ProductionWorkOrder',
      component: () => import('@/views/production/work-order/index.vue'),
      meta: { title: 'menus.production.workOrder', keepAlive: true }
    },
    {
      path: 'scene',
      name: 'ProductionScene',
      component: () => import('@/views/production/scene/index.vue'),
      meta: { title: 'menus.production.scene', keepAlive: true }
    },
    {
      path: 'two-ticket',
      name: 'ProductionTwoTicket',
      component: () => import('@/views/production/two-ticket/index.vue'),
      meta: { title: 'menus.production.twoTicket', keepAlive: true }
    },
    {
      path: 'duty',
      name: 'ProductionDuty',
      component: () => import('@/views/production/duty/index.vue'),
      meta: { title: 'menus.production.duty', keepAlive: true }
    },
    {
      path: 'handover',
      name: 'ProductionHandover',
      component: () => import('@/views/production/handover/index.vue'),
      meta: { title: 'menus.production.handover', keepAlive: true }
    },
    {
      path: 'process-visual',
      name: 'ProductionProcessVisual',
      component: () => import('@/views/production/process-visual/index.vue'),
      meta: { title: 'menus.production.processVisual', keepAlive: true }
    }
  ]
}
