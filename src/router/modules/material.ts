import { AppRouteRecord } from '@/types/router'

/**
 * 物资管理路由模块
 * 对应平台功能清单 - 212. 物资管理
 */
export const materialRoutes: AppRouteRecord = {
  path: '/material',
  name: 'Material',
  component: () => import('@/views/material/index.vue'),
  meta: {
    title: '物资管理',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 212.0. 仓库信息
    {
      path: 'warehouse',
      name: 'MaterialWarehouse',
      component: () => import('@/views/material/warehouse/index.vue'),
      meta: {
        title: '仓库信息',
        keepAlive: true
      },
      children: [
        {
          path: 'reserve-base',
          name: 'MaterialWarehouseReserveBase',
          component: () => import('@/views/material/warehouse/reserve-base.vue'),
          meta: { title: '储备基地信息' }
        },
        {
          path: 'info',
          name: 'MaterialWarehouseInfo',
          component: () => import('@/views/material/warehouse/info.vue'),
          meta: { title: '仓库信息' }
        }
      ]
    },
    // 214.0. 供货管理
    {
      path: 'supply',
      name: 'MaterialSupply',
      component: () => import('@/views/material/supply/index.vue'),
      meta: {
        title: '供货管理',
        keepAlive: true
      },
      children: [
        {
          path: 'contract',
          name: 'MaterialSupplyContract',
          component: () => import('@/views/material/supply/contract.vue'),
          meta: { title: '合同基本信息' }
        },
        {
          path: 'delivery-notice',
          name: 'MaterialSupplyDeliveryNotice',
          component: () => import('@/views/material/supply/delivery-notice.vue'),
          meta: { title: '发货通知' }
        }
      ]
    },
    // 216.0. 验收入库管理
    {
      path: 'receipt-storage',
      name: 'MaterialReceiptStorage',
      component: () => import('@/views/material/receipt-storage/index.vue'),
      meta: {
        title: '验收入库管理',
        keepAlive: true
      },
      children: [
        {
          path: 'inspection',
          name: 'MaterialReceiptStorageInspection',
          component: () => import('@/views/material/receipt-storage/inspection.vue'),
          meta: { title: '到货验收' }
        },
        {
          path: 'inbound',
          name: 'MaterialReceiptStorageInbound',
          component: () => import('@/views/material/receipt-storage/inbound.vue'),
          meta: { title: '入库管理' }
        },
        {
          path: 'inventory-summary',
          name: 'MaterialReceiptStorageInventorySummary',
          component: () => import('@/views/material/receipt-storage/inventory-summary.vue'),
          meta: { title: '库存查询（汇总）' }
        },
        {
          path: 'inventory-detail',
          name: 'MaterialReceiptStorageInventoryDetail',
          component: () => import('@/views/material/receipt-storage/inventory-detail.vue'),
          meta: { title: '库存查询（明细）' }
        }
      ]
    },
    // 220.0. 领料管理
    {
      path: 'picking',
      name: 'MaterialPicking',
      component: () => import('@/views/material/picking/index.vue'),
      meta: {
        title: '领料管理',
        keepAlive: true
      },
      children: [
        {
          path: 'shelving',
          name: 'MaterialPickingShelving',
          component: () => import('@/views/material/picking/shelving.vue'),
          meta: { title: '上架' }
        },
        {
          path: 'request',
          name: 'MaterialPickingRequest',
          component: () => import('@/views/material/picking/request.vue'),
          meta: { title: '领料' }
        },
        {
          path: 'issue',
          name: 'MaterialPickingIssue',
          component: () => import('@/views/material/picking/issue.vue'),
          meta: { title: '发料' }
        },
        {
          path: 'return',
          name: 'MaterialPickingReturn',
          component: () => import('@/views/material/picking/return.vue'),
          meta: { title: '退料' }
        }
      ]
    },
    // 224.0. 仓储管理
    {
      path: 'storage',
      name: 'MaterialStorage',
      component: () => import('@/views/material/storage/index.vue'),
      meta: {
        title: '仓储管理',
        keepAlive: true
      }
    },
    // 225.0. 备品备件管理
    {
      path: 'spare-parts',
      name: 'MaterialSpareParts',
      component: () => import('@/views/material/spare-parts/index.vue'),
      meta: {
        title: '备品备件管理',
        keepAlive: true
      }
    },
    // 226.0. 物资报表管理
    {
      path: 'report',
      name: 'MaterialReport',
      component: () => import('@/views/material/report/index.vue'),
      meta: {
        title: '物资报表管理',
        keepAlive: true
      }
    },
    // 227.0. 废旧物资处置
    {
      path: 'waste-disposal',
      name: 'MaterialWasteDisposal',
      component: () => import('@/views/material/waste-disposal/index.vue'),
      meta: {
        title: '废旧物资处置',
        keepAlive: true
      }
    },
    // 228.0. 物资编码接收
    {
      path: 'code-receive',
      name: 'MaterialCodeReceive',
      component: () => import('@/views/material/code-receive/index.vue'),
      meta: {
        title: '物资编码接收',
        keepAlive: true
      }
    }
  ]
}
