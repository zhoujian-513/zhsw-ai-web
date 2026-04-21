import type { AppRouteRecord } from '@/types/router'

export const operationRoutes: AppRouteRecord = {
  path: '/operation',
  name: 'Operation',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.operation.title',
    icon: '&#xe8b3;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'project',
      name: 'OperationProject',
      component: () => import('@/views/operation/project/index.vue'),
      meta: { title: 'menus.operation.project', keepAlive: true }
    },
    {
      path: 'report',
      name: 'OperationReport',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.operation.report' },
      children: [
        {
          path: 'daily',
          name: 'OperationReportDaily',
          component: () => import('@/views/operation/report/daily/index.vue'),
          meta: { title: 'menus.operation.reportDaily', keepAlive: true }
        },
        {
          path: 'weekly',
          name: 'OperationReportWeekly',
          component: () => import('@/views/operation/report/weekly/index.vue'),
          meta: { title: 'menus.operation.reportWeekly', keepAlive: true }
        },
        {
          path: 'monthly',
          name: 'OperationReportMonthly',
          component: () => import('@/views/operation/report/monthly/index.vue'),
          meta: { title: 'menus.operation.reportMonthly', keepAlive: true }
        }
      ]
    },
    {
      path: 'plan-analysis',
      name: 'OperationPlanAnalysis',
      component: () => import('@/views/operation/plan-analysis/index.vue'),
      meta: { title: 'menus.operation.planAnalysis', keepAlive: true }
    },
    {
      path: 'annual-plan',
      name: 'OperationAnnualPlan',
      component: () => import('@/views/operation/annual-plan/index.vue'),
      meta: { title: 'menus.operation.annualPlan', keepAlive: true }
    }
  ]
}
