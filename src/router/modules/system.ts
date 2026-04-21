import type { AppRouteRecord } from '@/types/router'

export const systemRoutes: AppRouteRecord = {
  path: '/system',
  name: 'System',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.system.title',
    icon: '&#xe6e8;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: { title: 'menus.system.user', keepAlive: true }
    },
    {
      path: 'role',
      name: 'SystemRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: { title: 'menus.system.role', keepAlive: true }
    },
    {
      path: 'menu',
      name: 'SystemMenu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: { title: 'menus.system.menu', keepAlive: true }
    },
    {
      path: 'organization',
      name: 'SystemOrganization',
      component: () => import('@/views/system/organization/index.vue'),
      meta: { title: 'menus.system.organization', keepAlive: true }
    },
    {
      path: 'log',
      name: 'SystemLog',
      component: () => import('@/views/system/log/index.vue'),
      meta: { title: 'menus.system.log', keepAlive: true }
    },
    {
      path: 'config',
      name: 'SystemConfig',
      component: () => import('@/views/system/config/index.vue'),
      meta: { title: 'menus.system.config', keepAlive: true }
    }
  ]
}
