import type { AppRouteRecord } from '@/types/router'

export const materialRoutes: AppRouteRecord = {
  path: '/material',
  name: 'Material',
  component: '',
  meta: {
    title: 'menus.material.title',
    icon: '&#xe62d;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 仓库信息
    {
      path: 'warehouse',
      name: 'MaterialWarehouse',
      component: '',
      meta: { title: 'menus.material.warehouse' },
      children: [
        {
          path: 'base',
          name: 'MaterialWarehouseBase',
          component: '/material/warehouse/base/index',
          meta: { title: 'menus.material.warehouseBase', keepAlive: true }
        },
        {
          path: 'info',
          name: 'MaterialWarehouseInfo',
          component: '/material/warehouse/info/index',
          meta: { title: 'menus.material.warehouseInfo', keepAlive: true }
        }
      ]
    },
    // 2.0. 供货管理
    {
      path: 'supply',
      name: 'MaterialSupply',
      component: '',
      meta: { title: 'menus.material.supply' },
      children: [
        {
          path: 'contract',
          name: 'MaterialSupplyContract',
          component: '/material/supply/contract/index',
          meta: { title: 'menus.material.supplyContract', keepAlive: true }
        },
        {
          path: 'delivery',
          name: 'MaterialSupplyDelivery',
          component: '/material/supply/delivery/index',
          meta: { title: 'menus.material.supplyDelivery', keepAlive: true }
        }
      ]
    },
    // 3.0. 验收入库管理
    {
      path: 'receipt',
      name: 'MaterialReceipt',
      component: '',
      meta: { title: 'menus.material.receipt' },
      children: [
        {
          path: 'inspection',
          name: 'MaterialReceiptInspection',
          component: '/material/receipt/inspection/index',
          meta: { title: 'menus.material.receiptInspection', keepAlive: true }
        },
        {
          path: 'inbound',
          name: 'MaterialReceiptInbound',
          component: '/material/receipt/inbound/index',
          meta: { title: 'menus.material.receiptInbound', keepAlive: true }
        },
        {
          path: 'inventory-summary',
          name: 'MaterialReceiptInventorySummary',
          component: '/material/receipt/inventory-summary/index',
          meta: { title: 'menus.material.receiptInventorySummary', keepAlive: true }
        },
        {
          path: 'inventory-detail',
          name: 'MaterialReceiptInventoryDetail',
          component: '/material/receipt/inventory-detail/index',
          meta: { title: 'menus.material.receiptInventoryDetail', keepAlive: true }
        }
      ]
    },
    // 4.0. 领料管理
    {
      path: 'picking',
      name: 'MaterialPicking',
      component: '',
      meta: { title: 'menus.material.picking' },
      children: [
        {
          path: 'shelving',
          name: 'MaterialPickingShelving',
          component: '/material/picking/shelving/index',
          meta: { title: 'menus.material.pickingShelving', keepAlive: true }
        },
        {
          path: 'pick',
          name: 'MaterialPickingPick',
          component: '/material/picking/pick/index',
          meta: { title: 'menus.material.pickingPick', keepAlive: true }
        },
        {
          path: 'issue',
          name: 'MaterialPickingIssue',
          component: '/material/picking/issue/index',
          meta: { title: 'menus.material.pickingIssue', keepAlive: true }
        },
        {
          path: 'return',
          name: 'MaterialPickingReturn',
          component: '/material/picking/return/index',
          meta: { title: 'menus.material.pickingReturn', keepAlive: true }
        }
      ]
    },
    // 5.0. 仓储管理
    {
      path: 'storage',
      name: 'MaterialStorage',
      component: '/material/storage/index',
      meta: { title: 'menus.material.storage', keepAlive: true }
    },
    // 6.0. 备品备件管理
    {
      path: 'spare-parts',
      name: 'MaterialSpareParts',
      component: '/material/spare-parts/index',
      meta: { title: 'menus.material.spareParts', keepAlive: true }
    },
    // 7.0. 物资报表管理
    {
      path: 'report',
      name: 'MaterialReport',
      component: '/material/report/index',
      meta: { title: 'menus.material.report', keepAlive: true }
    },
    // 8.0. 废旧物资处置
    {
      path: 'waste',
      name: 'MaterialWaste',
      component: '/material/waste/index',
      meta: { title: 'menus.material.waste', keepAlive: true }
    },
    // 9.0. 物资编码接收
    {
      path: 'code-receive',
      name: 'MaterialCodeReceive',
      component: '/material/code-receive/index',
      meta: { title: 'menus.material.codeReceive', keepAlive: true }
    }
  ]
}
