import type { AppRouteRecord } from '@/types/router'

export const pipelineRoutes: AppRouteRecord = {
  path: '/pipeline',
  name: 'Pipeline',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.pipeline.title',
    icon: '&#xe630;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'gis',
      name: 'PipelineGis',
      component: () => import('@/views/pipeline/gis/index.vue'),
      meta: { title: 'menus.pipeline.gis', keepAlive: true }
    },
    {
      path: 'leakage',
      name: 'PipelineLeakage',
      component: () => import('@/views/pipeline/leakage/index.vue'),
      meta: { title: 'menus.pipeline.leakage', keepAlive: true }
    },
    {
      path: 'patrol',
      name: 'PipelinePatrol',
      component: () => import('@/views/pipeline/patrol/index.vue'),
      meta: { title: 'menus.pipeline.patrol', keepAlive: true }
    },
    {
      path: 'archive',
      name: 'PipelineArchive',
      component: () => import('@/views/pipeline/archive/index.vue'),
      meta: { title: 'menus.pipeline.archive', keepAlive: true }
    }
  ]
}
