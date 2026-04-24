import type { AppRouteRecord } from '@/types/router'

export const dashboardRoutes: AppRouteRecord = {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.dashboard.title',
    icon: '&#xe81a;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'group',
      name: 'DashboardGroup',
      component: () => import('@/views/dashboard/group/index.vue'),
      meta: { title: 'menus.dashboard.group', keepAlive: true }
    },
    {
      path: 'compare',
      name: 'DashboardCompare',
      component: () => import('@/views/dashboard/compare/index.vue'),
      meta: { title: 'menus.dashboard.compare', keepAlive: true }
    }
  ]
}
