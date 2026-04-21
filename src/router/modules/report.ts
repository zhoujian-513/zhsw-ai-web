import type { AppRouteRecord } from '@/types/router'

export const reportRoutes: AppRouteRecord = {
  path: '/report',
  name: 'Report',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.report.title',
    icon: '&#xe6e6;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'production',
      name: 'ReportProduction',
      component: () => import('@/views/report/production/index.vue'),
      meta: { title: 'menus.report.production', keepAlive: true }
    },
    {
      path: 'operation',
      name: 'ReportOperation',
      component: () => import('@/views/report/operation/index.vue'),
      meta: { title: 'menus.report.operation', keepAlive: true }
    },
    {
      path: 'quality',
      name: 'ReportQuality',
      component: () => import('@/views/report/quality/index.vue'),
      meta: { title: 'menus.report.quality', keepAlive: true }
    },
    {
      path: 'custom',
      name: 'ReportCustom',
      component: () => import('@/views/report/custom/index.vue'),
      meta: { title: 'menus.report.custom', keepAlive: true }
    }
  ]
}
