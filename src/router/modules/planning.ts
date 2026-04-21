import type { AppRouteRecord } from '@/types/router'

export const planningRoutes: AppRouteRecord = {
  path: '/planning',
  name: 'Planning',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.planning.title',
    icon: '&#xe6e7;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'project',
      name: 'PlanningProject',
      component: () => import('@/views/planning/project/index.vue'),
      meta: { title: 'menus.planning.project', keepAlive: true }
    },
    {
      path: 'budget',
      name: 'PlanningBudget',
      component: () => import('@/views/planning/budget/index.vue'),
      meta: { title: 'menus.planning.budget', keepAlive: true }
    },
    {
      path: 'cost',
      name: 'PlanningCost',
      component: () => import('@/views/planning/cost/index.vue'),
      meta: { title: 'menus.planning.cost', keepAlive: true }
    },
    {
      path: 'contract',
      name: 'PlanningContract',
      component: () => import('@/views/planning/contract/index.vue'),
      meta: { title: 'menus.planning.contract', keepAlive: true }
    },
    {
      path: 'performance',
      name: 'PlanningPerformance',
      component: () => import('@/views/planning/performance/index.vue'),
      meta: { title: 'menus.planning.performance', keepAlive: true }
    }
  ]
}
