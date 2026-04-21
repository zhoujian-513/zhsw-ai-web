import type { AppRouteRecord } from '@/types/router'

export const deviceRoutes: AppRouteRecord = {
  path: '/device',
  name: 'Device',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.device.title',
    icon: '&#xe8b5;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'info',
      name: 'DeviceInfo',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.device.info.title' },
      children: [
        {
          path: 'ledger',
          name: 'DeviceInfoLedger',
          component: () => import('@/views/device/info/ledger/index.vue'),
          meta: { title: 'menus.device.info.ledger', keepAlive: true }
        },
        {
          path: 'query',
          name: 'DeviceInfoQuery',
          component: () => import('@/views/device/info/query/index.vue'),
          meta: { title: 'menus.device.info.query', keepAlive: true }
        }
      ]
    },
    {
      path: 'defect',
      name: 'DeviceDefect',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.device.defect.title' },
      children: [
        {
          path: 'management',
          name: 'DeviceDefectManagement',
          component: () => import('@/views/device/defect/management/index.vue'),
          meta: { title: 'menus.device.defect.management', keepAlive: true }
        },
        {
          path: 'statistics',
          name: 'DeviceDefectStatistics',
          component: () => import('@/views/device/defect/statistics/index.vue'),
          meta: { title: 'menus.device.defect.statistics', keepAlive: true }
        },
        {
          path: 'pipeline',
          name: 'DeviceDefectPipeline',
          component: () => import('@/views/device/defect/pipeline/index.vue'),
          meta: { title: 'menus.device.defect.pipeline', keepAlive: true }
        },
        {
          path: 'accident',
          name: 'DeviceDefectAccident',
          component: () => import('@/views/device/defect/accident/index.vue'),
          meta: { title: 'menus.device.defect.accident', keepAlive: true }
        }
      ]
    }
  ]
}
