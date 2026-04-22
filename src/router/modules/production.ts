import { AppRouteRecord } from '@/types/router'

/**
 * 生产管理路由模块
 * 对应平台功能清单 - 53. 生产管理
 */
export const productionRoutes: AppRouteRecord = {
  path: '/production',
  name: 'Production',
  component: () => import('@/views/production/index.vue'),
  meta: {
    title: '生产管理',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 53.0. 值班管理
    {
      path: 'duty',
      name: 'ProductionDuty',
      component: () => import('@/views/production/duty/index.vue'),
      meta: {
        title: '值班管理',
        keepAlive: true
      },
      children: [
        {
          path: 'scheduling',
          name: 'ProductionDutyScheduling',
          component: () => import('@/views/production/duty/scheduling.vue'),
          meta: { title: '排班管理' }
        },
        {
          path: 'log',
          name: 'ProductionDutyLog',
          component: () => import('@/views/production/duty/log.vue'),
          meta: { title: '值班日志/记录' }
        },
        {
          path: 'daily-statistics',
          name: 'ProductionDutyDailyStatistics',
          component: () => import('@/views/production/duty/daily-statistics.vue'),
          meta: { title: '值班日数据统计' }
        },
        {
          path: 'sludge-statistics',
          name: 'ProductionDutySludgeStatistics',
          component: () => import('@/views/production/duty/sludge-statistics.vue'),
          meta: { title: '过磅污泥处置量统计' }
        },
        {
          path: 'water-daily',
          name: 'ProductionDutyWaterDaily',
          component: () => import('@/views/production/duty/water-daily.vue'),
          meta: { title: '进出水在线水质日报' }
        }
      ]
    },
    // 58.0. 化验管理
    {
      path: 'laboratory',
      name: 'ProductionLaboratory',
      component: () => import('@/views/production/laboratory/index.vue'),
      meta: {
        title: '化验管理',
        keepAlive: true
      },
      children: [
        {
          path: 'base-info',
          name: 'ProductionLaboratoryBaseInfo',
          component: () => import('@/views/production/laboratory/base-info.vue'),
          meta: { title: '化验室基础信息管理' }
        },
        {
          path: 'record',
          name: 'ProductionLaboratoryRecord',
          component: () => import('@/views/production/laboratory/record.vue'),
          meta: { title: '化验记录' }
        },
        {
          path: 'template',
          name: 'ProductionLaboratoryTemplate',
          component: () => import('@/views/production/laboratory/template.vue'),
          meta: { title: '原始记录模板管理' }
        },
        {
          path: 'daily-report',
          name: 'ProductionLaboratoryDailyReport',
          component: () => import('@/views/production/laboratory/daily-report.vue'),
          meta: { title: '化验日报' }
        },
        {
          path: 'custom-report',
          name: 'ProductionLaboratoryCustomReport',
          component: () => import('@/views/production/laboratory/custom-report.vue'),
          meta: { title: '自定义化验报表' }
        }
      ]
    },
    // 63.0. 自定义生产日报、周报、月报、年报
    {
      path: 'report',
      name: 'ProductionReport',
      component: () => import('@/views/production/report/index.vue'),
      meta: {
        title: '自定义生产日报、周报、月报、年报',
        keepAlive: true
      },
      children: [
        {
          path: 'daily',
          name: 'ProductionReportDaily',
          component: () => import('@/views/production/report/daily.vue'),
          meta: { title: '生产日报' }
        },
        {
          path: 'custom-query',
          name: 'ProductionReportCustomQuery',
          component: () => import('@/views/production/report/custom-query.vue'),
          meta: { title: '自定义生产数据查询' }
        },
        {
          path: 'submission',
          name: 'ProductionReportSubmission',
          component: () => import('@/views/production/report/submission.vue'),
          meta: { title: '生产数据报送' }
        },
        {
          path: 'audit-statistics',
          name: 'ProductionReportAuditStatistics',
          component: () => import('@/views/production/report/audit-statistics.vue'),
          meta: { title: '审核情况统计' }
        }
      ]
    },
    // 67.0. 巡检及调控工单
    {
      path: 'inspection',
      name: 'ProductionInspection',
      component: () => import('@/views/production/inspection/index.vue'),
      meta: {
        title: '巡检及调控工单',
        keepAlive: true
      },
      children: [
        {
          path: 'two-hour-report',
          name: 'ProductionInspectionTwoHourReport',
          component: () => import('@/views/production/inspection/two-hour-report.vue'),
          meta: { title: '两小时巡检报表' }
        },
        {
          path: 'plan',
          name: 'ProductionInspectionPlan',
          component: () => import('@/views/production/inspection/plan.vue'),
          meta: { title: '巡检计划管理' }
        },
        {
          path: 'workorder',
          name: 'ProductionInspectionWorkorder',
          component: () => import('@/views/production/inspection/workorder.vue'),
          meta: { title: '巡检工单（运行、设备、安全、电气、仪表）' }
        },
        {
          path: 'comprehensive-workorder',
          name: 'ProductionInspectionComprehensiveWorkorder',
          component: () => import('@/views/production/inspection/comprehensive-workorder.vue'),
          meta: { title: '综合巡检工单' }
        },
        {
          path: 'process-control',
          name: 'ProductionInspectionProcessControl',
          component: () => import('@/views/production/inspection/process-control.vue'),
          meta: { title: '工艺调控单' }
        },
        {
          path: 'statistics',
          name: 'ProductionInspectionStatistics',
          component: () => import('@/views/production/inspection/statistics.vue'),
          meta: { title: '巡检工单执行统计分析' }
        }
      ]
    },
    // 73.0. 生产运行维护监督检查
    {
      path: 'supervision',
      name: 'ProductionSupervision',
      component: () => import('@/views/production/supervision/index.vue'),
      meta: {
        title: '生产运行维护监督检查',
        keepAlive: true
      },
      children: [
        {
          path: 'issue-tracking',
          name: 'ProductionSupervisionIssueTracking',
          component: () => import('@/views/production/supervision/issue-tracking.vue'),
          meta: { title: '问题录入及跟踪闭环' }
        }
      ]
    },
    // 74.0. 运营质量等级评评定
    {
      path: 'quality-rating',
      name: 'ProductionQualityRating',
      component: () => import('@/views/production/quality-rating/index.vue'),
      meta: {
        title: '运营质量等级评评定',
        keepAlive: true
      },
      children: [
        {
          path: 'evaluation',
          name: 'ProductionQualityRatingEvaluation',
          component: () => import('@/views/production/quality-rating/evaluation.vue'),
          meta: { title: '申报、自评、复评' }
        }
      ]
    },
    // 75.0. 运营考评
    {
      path: 'assessment',
      name: 'ProductionAssessment',
      component: () => import('@/views/production/assessment/index.vue'),
      meta: {
        title: '运营考评',
        keepAlive: true
      },
      children: [
        {
          path: 'evaluation',
          name: 'ProductionAssessmentEvaluation',
          component: () => import('@/views/production/assessment/evaluation.vue'),
          meta: { title: '发起考评、评价、复核、汇总' }
        }
      ]
    },
    // 76.0. 药剂管理
    {
      path: 'chemical',
      name: 'ProductionChemical',
      component: () => import('@/views/production/chemical/index.vue'),
      meta: {
        title: '药剂管理',
        keepAlive: true
      },
      children: [
        {
          path: 'inspection',
          name: 'ProductionChemicalInspection',
          component: () => import('@/views/production/chemical/inspection.vue'),
          meta: { title: '检验管理' }
        },
        {
          path: 'usage',
          name: 'ProductionChemicalUsage',
          component: () => import('@/views/production/chemical/usage.vue'),
          meta: { title: '使用管理' }
        },
        {
          path: 'analysis',
          name: 'ProductionChemicalAnalysis',
          component: () => import('@/views/production/chemical/analysis.vue'),
          meta: { title: '药剂分析' }
        }
      ]
    },
    // 79.0. 节能降耗
    {
      path: 'energy-saving',
      name: 'ProductionEnergySaving',
      component: () => import('@/views/production/energy-saving/index.vue'),
      meta: {
        title: '节能降耗',
        keepAlive: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'ProductionEnergySavingDashboard',
          component: () => import('@/views/production/energy-saving/dashboard.vue'),
          meta: { title: '节能降耗' }
        }
      ]
    }
  ]
}
