import type { AppRouteRecord } from '@/types/router'

export const materialRoutes: AppRouteRecord = {
  path: '/material',
  name: 'Material',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.material.title',
    icon: '&#xe675;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'warehouse',
      name: 'MaterialWarehouse',
      component: () => import('@/views/material/warehouse/index.vue'),
      meta: { title: 'menus.material.warehouse', keepAlive: true }
    },
    {
      path: 'purchase',
      name: 'MaterialPurchase',
      component: () => import('@/views/material/purchase/index.vue'),
      meta: { title: 'menus.material.purchase', keepAlive: true }
    },
    {
      path: 'inventory',
      name: 'MaterialInventory',
      component: () => import('@/views/material/inventory/index.vue'),
      meta: { title: 'menus.material.inventory', keepAlive: true }
    },
    {
      path: 'inout',
      name: 'MaterialInout',
      component: () => import('@/views/material/inout/index.vue'),
      meta: { title: 'menus.material.inout', keepAlive: true }
    }
  ]
}
