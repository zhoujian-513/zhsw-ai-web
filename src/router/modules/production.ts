import type { AppRouteRecord } from '@/types/router'

export const productionRoutes: AppRouteRecord = {
  path: '/production',
  name: 'Production',
  component: '',
  meta: {
    title: 'menus.production.title',
    icon: '&#xe622;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 值班管理
    {
      path: 'duty',
      name: 'ProductionDuty',
      component: '',
      meta: { title: 'menus.production.duty' },
      children: [
        {
          path: 'schedule',
          name: 'ProductionDutySchedule',
          component: '/production/duty/schedule/index',
          meta: { title: 'menus.production.dutySchedule', keepAlive: true }
        },
        {
          path: 'log',
          name: 'ProductionDutyLog',
          component: '/production/duty/log/index',
          meta: { title: 'menus.production.dutyLog', keepAlive: true }
        },
        {
          path: 'statistics',
          name: 'ProductionDutyStatistics',
          component: '/production/duty/statistics/index',
          meta: { title: 'menus.production.dutyStatistics', keepAlive: true }
        },
        {
          path: 'sludge',
          name: 'ProductionDutySludge',
          component: '/production/duty/sludge/index',
          meta: { title: 'menus.production.dutySludge', keepAlive: true }
        },
        {
          path: 'water-quality',
          name: 'ProductionDutyWaterQuality',
          component: '/production/duty/water-quality/index',
          meta: { title: 'menus.production.dutyWaterQuality', keepAlive: true }
        }
      ]
    },
    // 2.0. 化验管理
    {
      path: 'lab',
      name: 'ProductionLab',
      component: '',
      meta: { title: 'menus.production.lab' },
      children: [
        {
          path: 'base-info',
          name: 'ProductionLabBaseInfo',
          component: '/production/lab/base-info/index',
          meta: { title: 'menus.production.labBaseInfo', keepAlive: true }
        },
        {
          path: 'record',
          name: 'ProductionLabRecord',
          component: '/production/lab/record/index',
          meta: { title: 'menus.production.labRecord', keepAlive: true }
        },
        {
          path: 'template',
          name: 'ProductionLabTemplate',
          component: '/production/lab/template/index',
          meta: { title: 'menus.production.labTemplate', keepAlive: true }
        },
        {
          path: 'daily',
          name: 'ProductionLabDaily',
          component: '/production/lab/daily/index',
          meta: { title: 'menus.production.labDaily', keepAlive: true }
        },
        {
          path: 'custom-report',
          name: 'ProductionLabCustomReport',
          component: '/production/lab/custom-report/index',
          meta: { title: 'menus.production.labCustomReport', keepAlive: true }
        }
      ]
    },
    // 3.0. 自定义生产日报、周报、月报、年报
    {
      path: 'report',
      name: 'ProductionReport',
      component: '',
      meta: { title: 'menus.production.report' },
      children: [
        {
          path: 'daily',
          name: 'ProductionReportDaily',
          component: '/production/report/daily/index',
          meta: { title: 'menus.production.reportDaily', keepAlive: true }
        },
        {
          path: 'custom-query',
          name: 'ProductionReportCustomQuery',
          component: '/production/report/custom-query/index',
          meta: { title: 'menus.production.reportCustomQuery', keepAlive: true }
        },
        {
          path: 'submit',
          name: 'ProductionReportSubmit',
          component: '/production/report/submit/index',
          meta: { title: 'menus.production.reportSubmit', keepAlive: true }
        },
        {
          path: 'audit',
          name: 'ProductionReportAudit',
          component: '/production/report/audit/index',
          meta: { title: 'menus.production.reportAudit', keepAlive: true }
        }
      ]
    },
    // 4.0. 巡检及调控工单
    {
      path: 'inspection',
      name: 'ProductionInspection',
      component: '',
      meta: { title: 'menus.production.inspection' },
      children: [
        {
          path: 'two-hour-report',
          name: 'ProductionInspectionTwoHourReport',
          component: '/production/inspection/two-hour-report/index',
          meta: { title: 'menus.production.inspectionTwoHourReport', keepAlive: true }
        },
        {
          path: 'plan',
          name: 'ProductionInspectionPlan',
          component: '/production/inspection/plan/index',
          meta: { title: 'menus.production.inspectionPlan', keepAlive: true }
        },
        {
          path: 'work-order',
          name: 'ProductionInspectionWorkOrder',
          component: '/production/inspection/work-order/index',
          meta: { title: 'menus.production.inspectionWorkOrder', keepAlive: true }
        },
        {
          path: 'comprehensive-order',
          name: 'ProductionInspectionComprehensiveOrder',
          component: '/production/inspection/comprehensive-order/index',
          meta: { title: 'menus.production.inspectionComprehensiveOrder', keepAlive: true }
        },
        {
          path: 'process-control',
          name: 'ProductionInspectionProcessControl',
          component: '/production/inspection/process-control/index',
          meta: { title: 'menus.production.inspectionProcessControl', keepAlive: true }
        },
        {
          path: 'statistics',
          name: 'ProductionInspectionStatistics',
          component: '/production/inspection/statistics/index',
          meta: { title: 'menus.production.inspectionStatistics', keepAlive: true }
        }
      ]
    },
    // 5.0. 生产运行维护监督检查
    {
      path: 'supervision',
      name: 'ProductionSupervision',
      component: '/production/supervision/index',
      meta: { title: 'menus.production.supervision', keepAlive: true }
    },
    // 6.0. 运营质量等级评定
    {
      path: 'quality-evaluation',
      name: 'ProductionQualityEvaluation',
      component: '/production/quality-evaluation/index',
      meta: { title: 'menus.production.qualityEvaluation', keepAlive: true }
    },
    // 7.0. 运营考评
    {
      path: 'operation-evaluation',
      name: 'ProductionOperationEvaluation',
      component: '/production/operation-evaluation/index',
      meta: { title: 'menus.production.operationEvaluation', keepAlive: true }
    },
    // 8.0. 药剂管理
    {
      path: 'chemical',
      name: 'ProductionChemical',
      component: '',
      meta: { title: 'menus.production.chemical' },
      children: [
        {
          path: 'inspection',
          name: 'ProductionChemicalInspection',
          component: '/production/chemical/inspection/index',
          meta: { title: 'menus.production.chemicalInspection', keepAlive: true }
        },
        {
          path: 'usage',
          name: 'ProductionChemicalUsage',
          component: '/production/chemical/usage/index',
          meta: { title: 'menus.production.chemicalUsage', keepAlive: true }
        },
        {
          path: 'analysis',
          name: 'ProductionChemicalAnalysis',
          component: '/production/chemical/analysis/index',
          meta: { title: 'menus.production.chemicalAnalysis', keepAlive: true }
        }
      ]
    },
    // 9.0. 节能降耗
    {
      path: 'energy-saving',
      name: 'ProductionEnergySaving',
      component: '/production/energy-saving/index',
      meta: { title: 'menus.production.energySaving', keepAlive: true }
    },
    // 两票管理
    {
      path: 'two-ticket',
      name: 'ProductionTwoTicket',
      component: '/production/two-ticket/index',
      meta: { title: 'menus.production.twoTicket', keepAlive: true }
    },
    // 工艺可视化
    {
      path: 'process-visual',
      name: 'ProductionProcessVisual',
      component: '/production/process-visual/index',
      meta: { title: 'menus.production.processVisual', keepAlive: true }
    }
  ]
}
