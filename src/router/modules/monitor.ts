import type { AppRouteRecord } from '@/types/router'

export const monitorRoutes: AppRouteRecord = {
  path: '/monitor',
  name: 'Monitor',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.monitor.title',
    icon: '&#xe638;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'object-config',
      name: 'MonitorObjectConfig',
      component: () => import('@/views/monitor/object-config/index.vue'),
      meta: { title: 'menus.monitor.objectConfig', keepAlive: true }
    },
    {
      path: 'data',
      name: 'MonitorData',
      component: () => import('@/views/monitor/data/index.vue'),
      meta: { title: 'menus.monitor.data', keepAlive: true }
    },
    {
      path: 'video',
      name: 'MonitorVideo',
      component: () => import('@/views/monitor/video/index.vue'),
      meta: { title: 'menus.monitor.video', keepAlive: true }
    },
    {
      path: 'alarm',
      name: 'MonitorAlarm',
      component: () => import('@/views/monitor/alarm/index.vue'),
      meta: { title: 'menus.monitor.alarm', keepAlive: true }
    },
    {
      path: 'data-analysis',
      name: 'MonitorDataAnalysis',
      component: () => import('@/views/monitor/data-analysis/index.vue'),
      meta: { title: 'menus.monitor.dataAnalysis', keepAlive: true }
    },
    {
      path: 'map',
      name: 'MonitorMap',
      component: () => import('@/views/monitor/map/index.vue'),
      meta: { title: 'menus.monitor.map', keepAlive: true }
    }
  ]
}
