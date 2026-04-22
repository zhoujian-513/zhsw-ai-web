import { AppRouteRecord } from '@/types/router'

/**
 * 经营管理路由模块
 * 对应平台功能清单 - 177. 经营管理
 */
export const operationRoutes: AppRouteRecord = {
  path: '/operation',
  name: 'Operation',
  component: () => import('@/views/operation/index.vue'),
  meta: {
    title: '经营管理',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 177.0. 项目基础信息管理
    {
      path: 'project-base',
      name: 'OperationProjectBase',
      component: () => import('@/views/operation/project-base/index.vue'),
      meta: {
        title: '项目基础信息管理',
        keepAlive: true
      },
      children: [
        {
          path: 'project-info',
          name: 'OperationProjectBaseProjectInfo',
          component: () => import('@/views/operation/project-base/project-info.vue'),
          meta: { title: '项目基础信息' }
        },
        {
          path: 'sub-project-info',
          name: 'OperationProjectBaseSubProjectInfo',
          component: () => import('@/views/operation/project-base/sub-project-info.vue'),
          meta: { title: '子项基础信息' }
        },
        {
          path: 'business-info',
          name: 'OperationProjectBaseBusinessInfo',
          component: () => import('@/views/operation/project-base/business-info.vue'),
          meta: { title: '业务基础信息' }
        }
      ]
    },
    // 180.0. 运维资产基础信息管理
    {
      path: 'asset-base',
      name: 'OperationAssetBase',
      component: () => import('@/views/operation/asset-base/index.vue'),
      meta: {
        title: '运维资产基础信息管理',
        keepAlive: true
      },
      children: [
        {
          path: 'asset-info',
          name: 'OperationAssetBaseAssetInfo',
          component: () => import('@/views/operation/asset-base/asset-info.vue'),
          meta: { title: '运维资产基础信息' }
        },
        {
          path: 'asset-business-relation',
          name: 'OperationAssetBaseAssetBusinessRelation',
          component: () => import('@/views/operation/asset-base/asset-business-relation.vue'),
          meta: { title: '运维资产与运维业务对应关系' }
        }
      ]
    },
    // 182.0. 投运管理
    {
      path: 'commissioning',
      name: 'OperationCommissioning',
      component: () => import('@/views/operation/commissioning/index.vue'),
      meta: {
        title: '投运管理',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'OperationCommissioningPlan',
          component: () => import('@/views/operation/commissioning/plan.vue'),
          meta: { title: '投运计划管理' }
        },
        {
          path: 'trial-application',
          name: 'OperationCommissioningTrialApplication',
          component: () => import('@/views/operation/commissioning/trial-application.vue'),
          meta: { title: '试运行申请' }
        },
        {
          path: 'commercial-application',
          name: 'OperationCommissioningCommercialApplication',
          component: () => import('@/views/operation/commissioning/commercial-application.vue'),
          meta: { title: '转商运申请' }
        },
        {
          path: 'change-application',
          name: 'OperationCommissioningChangeApplication',
          component: () => import('@/views/operation/commissioning/change-application.vue'),
          meta: { title: '投运信息变更申请' }
        },
        {
          path: 'shutdown-application',
          name: 'OperationCommissioningShutdownApplication',
          component: () => import('@/views/operation/commissioning/shutdown-application.vue'),
          meta: { title: '停运申请' }
        },
        {
          path: 'asset-management',
          name: 'OperationCommissioningAssetManagement',
          component: () => import('@/views/operation/commissioning/asset-management.vue'),
          meta: { title: '投运资产管理' }
        }
      ]
    },
    // 188.0. 政府绩效考核
    {
      path: 'gov-assessment',
      name: 'OperationGovAssessment',
      component: () => import('@/views/operation/gov-assessment/index.vue'),
      meta: {
        title: '政府绩效考核',
        keepAlive: true
      },
      children: [
        {
          path: 'template',
          name: 'OperationGovAssessmentTemplate',
          component: () => import('@/views/operation/gov-assessment/template.vue'),
          meta: { title: '考核模板' }
        },
        {
          path: 'report',
          name: 'OperationGovAssessmentReport',
          component: () => import('@/views/operation/gov-assessment/report.vue'),
          meta: { title: '考核报告' }
        },
        {
          path: 'analysis',
          name: 'OperationGovAssessmentAnalysis',
          component: () => import('@/views/operation/gov-assessment/analysis.vue'),
          meta: { title: '考核分析' }
        },
        {
          path: 'approval',
          name: 'OperationGovAssessmentApproval',
          component: () => import('@/views/operation/gov-assessment/approval.vue'),
          meta: { title: '考核审批' }
        },
        {
          path: 'payment',
          name: 'OperationGovAssessmentPayment',
          component: () => import('@/views/operation/gov-assessment/payment.vue'),
          meta: { title: '考核付费管理' }
        },
        {
          path: 'risk',
          name: 'OperationGovAssessmentRisk',
          component: () => import('@/views/operation/gov-assessment/risk.vue'),
          meta: { title: '考核风险管理' }
        }
      ]
    },
    // 194.0. 计划申报
    {
      path: 'plan-declaration',
      name: 'OperationPlanDeclaration',
      component: () => import('@/views/operation/plan-declaration/index.vue'),
      meta: {
        title: '计划申报',
        keepAlive: true
      }
    },
    // 195.0. 生产计划跟踪
    {
      path: 'production-plan-tracking',
      name: 'OperationProductionPlanTracking',
      component: () => import('@/views/operation/production-plan-tracking/index.vue'),
      meta: {
        title: '生产计划跟踪',
        keepAlive: true
      },
      children: [
        {
          path: 'auto-calculation',
          name: 'OperationProductionPlanTrackingAutoCalculation',
          component: () => import('@/views/operation/production-plan-tracking/auto-calculation.vue'),
          meta: { title: '生产计划数据自动核算' }
        },
        {
          path: 'report-management',
          name: 'OperationProductionPlanTrackingReportManagement',
          component: () => import('@/views/operation/production-plan-tracking/report-management.vue'),
          meta: { title: '生产计划报表管理' }
        },
        {
          path: 'shutdown-report',
          name: 'OperationProductionPlanTrackingShutdownReport',
          component: () => import('@/views/operation/production-plan-tracking/shutdown-report.vue'),
          meta: { title: '计划性停产信息报送' }
        }
      ]
    },
    // 198.0. 采购计划跟踪
    {
      path: 'procurement-tracking',
      name: 'OperationProcurementTracking',
      component: () => import('@/views/operation/procurement-tracking/index.vue'),
      meta: {
        title: '采购计划跟踪',
        keepAlive: true
      },
      children: [
        {
          path: 'tracking',
          name: 'OperationProcurementTrackingTracking',
          component: () => import('@/views/operation/procurement-tracking/tracking.vue'),
          meta: { title: '采购计划跟踪' }
        }
      ]
    },
    // 199.0. 预算执行跟踪
    {
      path: 'budget-tracking',
      name: 'OperationBudgetTracking',
      component: () => import('@/views/operation/budget-tracking/index.vue'),
      meta: {
        title: '预算执行跟踪',
        keepAlive: true
      },
      children: [
        {
          path: 'tracking',
          name: 'OperationBudgetTrackingTracking',
          component: () => import('@/views/operation/budget-tracking/tracking.vue'),
          meta: { title: '预算执行跟踪' }
        }
      ]
    },
    // 200.0. 运维成本管理
    {
      path: 'cost-management',
      name: 'OperationCostManagement',
      component: () => import('@/views/operation/cost-management/index.vue'),
      meta: {
        title: '运维成本管理',
        keepAlive: true
      },
      children: [
        {
          path: 'data-collection',
          name: 'OperationCostManagementDataCollection',
          component: () => import('@/views/operation/cost-management/data-collection.vue'),
          meta: { title: '成本数据归集' }
        },
        {
          path: 'analysis',
          name: 'OperationCostManagementAnalysis',
          component: () => import('@/views/operation/cost-management/analysis.vue'),
          meta: { title: '成本分析' }
        }
      ]
    },
    // 205.0. 运维费管理
    {
      path: 'operation-fee',
      name: 'OperationOperationFee',
      component: () => import('@/views/operation/operation-fee/index.vue'),
      meta: {
        title: '运维费管理',
        keepAlive: true
      },
      children: [
        {
          path: 'income-expense',
          name: 'OperationOperationFeeIncomeExpense',
          component: () => import('@/views/operation/operation-fee/income-expense.vue'),
          meta: { title: '运维费收支' }
        },
        {
          path: 'fund-security',
          name: 'OperationOperationFeeFundSecurity',
          component: () => import('@/views/operation/operation-fee/fund-security.vue'),
          meta: { title: '运维资金保障' }
        }
      ]
    },
    // 208.0. 财务模型应用
    {
      path: 'financial-model',
      name: 'OperationFinancialModel',
      component: () => import('@/views/operation/financial-model/index.vue'),
      meta: {
        title: '财务模型应用',
        keepAlive: true
      }
    },
    // 209.0. 收入、成本分析
    {
      path: 'income-cost-analysis',
      name: 'OperationIncomeCostAnalysis',
      component: () => import('@/views/operation/income-cost-analysis/index.vue'),
      meta: {
        title: '收入、成本分析',
        keepAlive: true
      }
    },
    // 210.0. 对标管理
    {
      path: 'benchmarking',
      name: 'OperationBenchmarking',
      component: () => import('@/views/operation/benchmarking/index.vue'),
      meta: {
        title: '对标管理',
        keepAlive: true
      }
    }
  ]
}
