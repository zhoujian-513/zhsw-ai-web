import { AppRouteRecord } from '@/types/router'

/**
 * 系统管理路由模块
 * 对应平台功能清单 - 229. 系统管理
 */
export const systemRoutes: AppRouteRecord = {
  path: '/system',
  name: 'System',
  component: () => import('@/views/system/index.vue'),
  meta: {
    title: '系统管理',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 229.0. 菜单管理
    {
      path: 'menu',
      name: 'SystemMenu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        title: '菜单管理',
        keepAlive: true
      }
    },
    // 230.0. 租户管理
    {
      path: 'tenant',
      name: 'SystemTenant',
      component: () => import('@/views/system/tenant/index.vue'),
      meta: {
        title: '租户管理',
        keepAlive: true
      }
    },
    // 231.0. 子系统配置
    {
      path: 'subsystem',
      name: 'SystemSubsystem',
      component: () => import('@/views/system/subsystem/index.vue'),
      meta: {
        title: '子系统配置',
        keepAlive: true
      }
    },
    // 232.0. 门户配置
    {
      path: 'portal',
      name: 'SystemPortal',
      component: () => import('@/views/system/portal/index.vue'),
      meta: {
        title: '门户配置',
        keepAlive: true
      }
    },
    // 233.0. 组织用户管理
    {
      path: 'org-user',
      name: 'SystemOrgUser',
      component: () => import('@/views/system/org-user/index.vue'),
      meta: {
        title: '组织用户管理',
        keepAlive: true
      }
    },
    // 234.0. 角色管理
    {
      path: 'role',
      name: 'SystemRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        keepAlive: true
      }
    },
    // 235.0. 岗位管理
    {
      path: 'position',
      name: 'SystemPosition',
      component: () => import('@/views/system/position/index.vue'),
      meta: {
        title: '岗位管理',
        keepAlive: true
      }
    },
    // 236.0. 流程管理
    {
      path: 'process',
      name: 'SystemProcess',
      component: () => import('@/views/system/process/index.vue'),
      meta: {
        title: '流程管理',
        keepAlive: true
      }
    },
    // 237.0. 用户组管理
    {
      path: 'user-group',
      name: 'SystemUserGroup',
      component: () => import('@/views/system/user-group/index.vue'),
      meta: {
        title: '用户组管理',
        keepAlive: true
      }
    }
  ]
}
