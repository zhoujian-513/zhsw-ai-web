import type { AppRouteRecord } from '@/types/router'

export const operationRoutes: AppRouteRecord = {
  path: '/operation',
  name: 'Operation',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.operation.title',
    icon: '&#xe620;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 项目基础信息管理
    {
      path: 'project-base',
      name: 'OperationProjectBase',
      meta: { title: 'menus.operation.projectBase' },
      children: [
        {
          path: 'project-info',
          name: 'OperationProjectInfo',
          component: () => import('@/views/operation/project-base/project-info/index.vue'),
          meta: { title: 'menus.operation.projectInfo', keepAlive: true }
        },
        {
          path: 'sub-project',
          name: 'OperationSubProject',
          component: '/operation/project-base/sub-project/index',
          meta: { title: 'menus.operation.subProject', keepAlive: true }
        },
        {
          path: 'business-info',
          name: 'OperationBusinessInfo',
          component: '/operation/project-base/business-info/index',
          meta: { title: 'menus.operation.businessInfo', keepAlive: true }
        }
      ]
    },
    // 2.0. 运维资产基础信息管理
    {
      path: 'asset-base',
      name: 'OperationAssetBase',
      component: '',
      meta: { title: 'menus.operation.assetBase' },
      children: [
        {
          path: 'asset-info',
          name: 'OperationAssetInfo',
          component: '/operation/asset-base/asset-info/index',
          meta: { title: 'menus.operation.assetInfo', keepAlive: true }
        },
        {
          path: 'asset-business',
          name: 'OperationAssetBusiness',
          component: '/operation/asset-base/asset-business/index',
          meta: { title: 'menus.operation.assetBusiness', keepAlive: true }
        }
      ]
    },
    // 3.0. 投运管理
    {
      path: 'commissioning',
      name: 'OperationCommissioning',
      component: '',
      meta: { title: 'menus.operation.commissioning' },
      children: [
        {
          path: 'plan',
          name: 'OperationCommissioningPlan',
          component: '/operation/commissioning/plan/index',
          meta: { title: 'menus.operation.commissioningPlan', keepAlive: true }
        },
        {
          path: 'trial',
          name: 'OperationCommissioningTrial',
          component: '/operation/commissioning/trial/index',
          meta: { title: 'menus.operation.commissioningTrial', keepAlive: true }
        },
        {
          path: 'commercial',
          name: 'OperationCommissioningCommercial',
          component: '/operation/commissioning/commercial/index',
          meta: { title: 'menus.operation.commissioningCommercial', keepAlive: true }
        },
        {
          path: 'change',
          name: 'OperationCommissioningChange',
          component: '/operation/commissioning/change/index',
          meta: { title: 'menus.operation.commissioningChange', keepAlive: true }
        },
        {
          path: 'shutdown',
          name: 'OperationCommissioningShutdown',
          component: '/operation/commissioning/shutdown/index',
          meta: { title: 'menus.operation.commissioningShutdown', keepAlive: true }
        },
        {
          path: 'asset-manage',
          name: 'OperationCommissioningAssetManage',
          component: '/operation/commissioning/asset-manage/index',
          meta: { title: 'menus.operation.commissioningAssetManage', keepAlive: true }
        }
      ]
    },
    // 4.0. 政府绩效考核
    {
      path: 'performance',
      name: 'OperationPerformance',
      component: '',
      meta: { title: 'menus.operation.performance' },
      children: [
        {
          path: 'template',
          name: 'OperationPerformanceTemplate',
          component: '/operation/performance/template/index',
          meta: { title: 'menus.operation.performanceTemplate', keepAlive: true }
        },
        {
          path: 'report',
          name: 'OperationPerformanceReport',
          component: '/operation/performance/report/index',
          meta: { title: 'menus.operation.performanceReport', keepAlive: true }
        },
        {
          path: 'analysis',
          name: 'OperationPerformanceAnalysis',
          component: '/operation/performance/analysis/index',
          meta: { title: 'menus.operation.performanceAnalysis', keepAlive: true }
        },
        {
          path: 'approval',
          name: 'OperationPerformanceApproval',
          component: '/operation/performance/approval/index',
          meta: { title: 'menus.operation.performanceApproval', keepAlive: true }
        },
        {
          path: 'payment',
          name: 'OperationPerformancePayment',
          component: '/operation/performance/payment/index',
          meta: { title: 'menus.operation.performancePayment', keepAlive: true }
        },
        {
          path: 'risk',
          name: 'OperationPerformanceRisk',
          component: '/operation/performance/risk/index',
          meta: { title: 'menus.operation.performanceRisk', keepAlive: true }
        }
      ]
    },
    // 5.0. 生产计划跟踪
    {
      path: 'production-plan',
      name: 'OperationProductionPlan',
      component: '',
      meta: { title: 'menus.operation.productionPlan' },
      children: [
        {
          path: 'auto-calculate',
          name: 'OperationProductionPlanAutoCalculate',
          component: '/operation/production-plan/auto-calculate/index',
          meta: { title: 'menus.operation.productionPlanAutoCalculate', keepAlive: true }
        },
        {
          path: 'report',
          name: 'OperationProductionPlanReport',
          component: '/operation/production-plan/report/index',
          meta: { title: 'menus.operation.productionPlanReport', keepAlive: true }
        },
        {
          path: 'shutdown-report',
          name: 'OperationProductionPlanShutdownReport',
          component: '/operation/production-plan/shutdown-report/index',
          meta: { title: 'menus.operation.productionPlanShutdownReport', keepAlive: true }
        }
      ]
    },
    // 6.0. 采购计划跟踪
    {
      path: 'purchase-plan',
      name: 'OperationPurchasePlan',
      component: '/operation/purchase-plan/index',
      meta: { title: 'menus.operation.purchasePlan', keepAlive: true }
    },
    // 7.0. 预算执行跟踪
    {
      path: 'budget',
      name: 'OperationBudget',
      component: '/operation/budget/index',
      meta: { title: 'menus.operation.budget', keepAlive: true }
    },
    // 8.0. 运维成本管理
    {
      path: 'cost',
      name: 'OperationCost',
      component: '',
      meta: { title: 'menus.operation.cost' },
      children: [
        {
          path: 'collection',
          name: 'OperationCostCollection',
          component: '/operation/cost/collection/index',
          meta: { title: 'menus.operation.costCollection', keepAlive: true }
        },
        {
          path: 'analysis',
          name: 'OperationCostAnalysis',
          component: '/operation/cost/analysis/index',
          meta: { title: 'menus.operation.costAnalysis', keepAlive: true }
        }
      ]
    },
    // 9.0. 运维费管理
    {
      path: 'operation-fee',
      name: 'OperationOperationFee',
      component: '',
      meta: { title: 'menus.operation.operationFee' },
      children: [
        {
          path: 'inout',
          name: 'OperationOperationFeeInout',
          component: '/operation/operation-fee/inout/index',
          meta: { title: 'menus.operation.operationFeeInout', keepAlive: true }
        },
        {
          path: 'fund',
          name: 'OperationOperationFeeFund',
          component: '/operation/operation-fee/fund/index',
          meta: { title: 'menus.operation.operationFeeFund', keepAlive: true }
        }
      ]
    },
    // 10.0. 财务模型应用
    {
      path: 'finance-model',
      name: 'OperationFinanceModel',
      component: '/operation/finance-model/index',
      meta: { title: 'menus.operation.financeModel', keepAlive: true }
    },
    // 11.0. 收入、成本分析
    {
      path: 'income-cost',
      name: 'OperationIncomeCost',
      component: '/operation/income-cost/index',
      meta: { title: 'menus.operation.incomeCost', keepAlive: true }
    },
    // 12.0. 对标管理
    {
      path: 'benchmark',
      name: 'OperationBenchmark',
      component: '/operation/benchmark/index',
      meta: { title: 'menus.operation.benchmark', keepAlive: true }
    }
  ]
}
