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
      path: 'code-config',
      name: 'DeviceCodeConfig',
      component: () => import('@/views/device/code-config/index.vue'),
      meta: { title: 'menus.device.codeConfig', keepAlive: true }
    },
    {
      path: 'ledger',
      name: 'DeviceLedger',
      component: () => import('@/views/device/ledger/index.vue'),
      meta: { title: 'menus.device.ledger', keepAlive: true }
    },
    {
      path: 'defect',
      name: 'DeviceDefect',
      component: () => import('@/views/device/defect/index.vue'),
      meta: { title: 'menus.device.defect', keepAlive: true }
    },
    {
      path: 'evaluation',
      name: 'DeviceEvaluation',
      component: () => import('@/views/device/evaluation/index.vue'),
      meta: { title: 'menus.device.evaluation', keepAlive: true }
    },
    {
      path: 'project',
      name: 'DeviceProject',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.device.project' },
      children: [
        {
          path: 'maintenance',
          name: 'DeviceProjectMaintenance',
          component: () => import('@/views/device/project/maintenance/index.vue'),
          meta: { title: 'menus.device.maintenance', keepAlive: true }
        },
        {
          path: 'annual-repair',
          name: 'DeviceProjectAnnualRepair',
          component: () => import('@/views/device/project/annual-repair/index.vue'),
          meta: { title: 'menus.device.annualRepair', keepAlive: true }
        },
        {
          path: 'overhaul',
          name: 'DeviceProjectOverhaul',
          component: () => import('@/views/device/project/overhaul/index.vue'),
          meta: { title: 'menus.device.overhaul', keepAlive: true }
        }
      ]
    },
    {
      path: 'regulation',
      name: 'DeviceRegulation',
      component: () => import('@/views/device/regulation/index.vue'),
      meta: { title: 'menus.device.regulation', keepAlive: true }
    },
    {
      path: 'analysis',
      name: 'DeviceAnalysis',
      component: () => import('@/views/device/analysis/index.vue'),
      meta: { title: 'menus.device.analysis', keepAlive: true }
    }
  ]
}
