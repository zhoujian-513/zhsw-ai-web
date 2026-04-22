import { AppRouteRecord } from '@/types/router'

/**
 * 安全管理路由模块
 * 对应平台功能清单 - 80. 安全管理
 */
export const safetyRoutes: AppRouteRecord = {
  path: '/safety',
  name: 'Safety',
  component: () => import('@/views/safety/index.vue'),
  meta: {
    title: '安全管理',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 80.0. 安全资质管理
    {
      path: 'qualification',
      name: 'SafetyQualification',
      component: () => import('@/views/safety/qualification/index.vue'),
      meta: {
        title: '安全资质管理',
        keepAlive: true
      },
      children: [
        {
          path: 'management',
          name: 'SafetyQualificationManagement',
          component: () => import('@/views/safety/qualification/management.vue'),
          meta: { title: '安全资质管理' }
        },
        {
          path: 'certificate',
          name: 'SafetyQualificationCertificate',
          component: () => import('@/views/safety/qualification/certificate.vue'),
          meta: { title: '人员证书管理' }
        },
        {
          path: 'temporary-personnel',
          name: 'SafetyQualificationTemporaryPersonnel',
          component: () => import('@/views/safety/qualification/temporary-personnel.vue'),
          meta: { title: '临时外来人员管理' }
        }
      ]
    },
    // 83.0. 组织机构管理
    {
      path: 'organization',
      name: 'SafetyOrganization',
      component: () => import('@/views/safety/organization/index.vue'),
      meta: {
        title: '组织机构管理',
        keepAlive: true
      },
      children: [
        {
          path: 'system',
          name: 'SafetyOrganizationSystem',
          component: () => import('@/views/safety/organization/system.vue'),
          meta: { title: '安全组织机构体系' }
        },
        {
          path: 'responsibility',
          name: 'SafetyOrganizationResponsibility',
          component: () => import('@/views/safety/organization/responsibility.vue'),
          meta: { title: '安全管理人员责任体系' }
        }
      ]
    },
    // 85.0. 安全制度管理
    {
      path: 'regulation',
      name: 'SafetyRegulation',
      component: () => import('@/views/safety/regulation/index.vue'),
      meta: {
        title: '安全制度管理',
        keepAlive: true
      },
      children: [
        {
          path: 'national-library',
          name: 'SafetyRegulationNationalLibrary',
          component: () => import('@/views/safety/regulation/national-library.vue'),
          meta: { title: '国家安全规章制度库' }
        },
        {
          path: 'company-level',
          name: 'SafetyRegulationCompanyLevel',
          component: () => import('@/views/safety/regulation/company-level.vue'),
          meta: { title: '公司各层级安全制度文件' }
        }
      ]
    },
    // 87.0. 安全培训
    {
      path: 'training',
      name: 'SafetyTraining',
      component: () => import('@/views/safety/training/index.vue'),
      meta: {
        title: '安全培训',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'SafetyTrainingPlan',
          component: () => import('@/views/safety/training/plan.vue'),
          meta: { title: '培训计划' }
        },
        {
          path: 'topic',
          name: 'SafetyTrainingTopic',
          component: () => import('@/views/safety/training/topic.vue'),
          meta: { title: '培训主题' }
        },
        {
          path: 'material',
          name: 'SafetyTrainingMaterial',
          component: () => import('@/views/safety/training/material.vue'),
          meta: { title: '培训资料管理' }
        },
        {
          path: 'question-bank',
          name: 'SafetyTrainingQuestionBank',
          component: () => import('@/views/safety/training/question-bank.vue'),
          meta: { title: '题库' }
        },
        {
          path: 'paper',
          name: 'SafetyTrainingPaper',
          component: () => import('@/views/safety/training/paper.vue'),
          meta: { title: '试卷管理' }
        },
        {
          path: 'management',
          name: 'SafetyTrainingManagement',
          component: () => import('@/views/safety/training/management.vue'),
          meta: { title: '培训管理' }
        },
        {
          path: 'my-training',
          name: 'SafetyTrainingMyTraining',
          component: () => import('@/views/safety/training/my-training.vue'),
          meta: { title: '我的培训' }
        },
        {
          path: 'my-practice',
          name: 'SafetyTrainingMyPractice',
          component: () => import('@/views/safety/training/my-practice.vue'),
          meta: { title: '我的练习' }
        },
        {
          path: 'exam-management',
          name: 'SafetyTrainingExamManagement',
          component: () => import('@/views/safety/training/exam-management.vue'),
          meta: { title: '考试管理' }
        },
        {
          path: 'my-exam',
          name: 'SafetyTrainingMyExam',
          component: () => import('@/views/safety/training/my-exam.vue'),
          meta: { title: '我的考试' }
        },
        {
          path: 'evaluation',
          name: 'SafetyTrainingEvaluation',
          component: () => import('@/views/safety/training/evaluation.vue'),
          meta: { title: '培训效果评估' }
        },
        {
          path: 'analysis',
          name: 'SafetyTrainingAnalysis',
          component: () => import('@/views/safety/training/analysis.vue'),
          meta: { title: '培训分析' }
        }
      ]
    },
    // 99.0. 安全隐患管理
    {
      path: 'hazard',
      name: 'SafetyHazard',
      component: () => import('@/views/safety/hazard/index.vue'),
      meta: {
        title: '安全隐患管理',
        keepAlive: true
      },
      children: [
        {
          path: 'report',
          name: 'SafetyHazardReport',
          component: () => import('@/views/safety/hazard/report.vue'),
          meta: { title: '隐患上报' }
        },
        {
          path: 'rectification',
          name: 'SafetyHazardRectification',
          component: () => import('@/views/safety/hazard/rectification.vue'),
          meta: { title: '隐患整改' }
        },
        {
          path: 'statistics',
          name: 'SafetyHazardStatistics',
          component: () => import('@/views/safety/hazard/statistics.vue'),
          meta: { title: '隐患统计分析' }
        }
      ]
    },
    // 102.0. 风险管控
    {
      path: 'risk',
      name: 'SafetyRisk',
      component: () => import('@/views/safety/risk/index.vue'),
      meta: {
        title: '风险管控',
        keepAlive: true
      },
      children: [
        {
          path: 'control',
          name: 'SafetyRiskControl',
          component: () => import('@/views/safety/risk/control.vue'),
          meta: { title: '安全风险管控' }
        },
        {
          path: 'hazard-source',
          name: 'SafetyRiskHazardSource',
          component: () => import('@/views/safety/risk/hazard-source.vue'),
          meta: { title: '危险源管理' }
        },
        {
          path: 'statistics',
          name: 'SafetyRiskStatistics',
          component: () => import('@/views/safety/risk/statistics.vue'),
          meta: { title: '统计分析' }
        }
      ]
    },
    // 105.0. 作业计划管理
    {
      path: 'operation-plan',
      name: 'SafetyOperationPlan',
      component: () => import('@/views/safety/operation-plan/index.vue'),
      meta: {
        title: '作业计划管理',
        keepAlive: true
      },
      children: [
        {
          path: 'management',
          name: 'SafetyOperationPlanManagement',
          component: () => import('@/views/safety/operation-plan/management.vue'),
          meta: { title: '运营作业计划管理' }
        },
        {
          path: 'patrol-screen',
          name: 'SafetyOperationPlanPatrolScreen',
          component: () => import('@/views/safety/operation-plan/patrol-screen.vue'),
          meta: { title: '运营值班巡屏' }
        },
        {
          path: 'question-personnel',
          name: 'SafetyOperationPlanQuestionPersonnel',
          component: () => import('@/views/safety/operation-plan/question-personnel.vue'),
          meta: { title: '抽问作业人员' }
        }
      ]
    },
    // 108.0. 两票管理
    {
      path: 'two-tickets',
      name: 'SafetyTwoTickets',
      component: () => import('@/views/safety/two-tickets/index.vue'),
      meta: {
        title: '两票管理',
        keepAlive: true
      },
      children: [
        {
          path: 'qualification',
          name: 'SafetyTwoTicketsQualification',
          component: () => import('@/views/safety/two-tickets/qualification.vue'),
          meta: { title: '两种人资质管理' }
        },
        {
          path: 'work-ticket',
          name: 'SafetyTwoTicketsWorkTicket',
          component: () => import('@/views/safety/two-tickets/work-ticket.vue'),
          meta: { title: '工作票办理' }
        },
        {
          path: 'operation-ticket',
          name: 'SafetyTwoTicketsOperationTicket',
          component: () => import('@/views/safety/two-tickets/operation-ticket.vue'),
          meta: { title: '操作票办理' }
        },
        {
          path: 'template',
          name: 'SafetyTwoTicketsTemplate',
          component: () => import('@/views/safety/two-tickets/template.vue'),
          meta: { title: '工作票模板' }
        },
        {
          path: 'review',
          name: 'SafetyTwoTicketsReview',
          component: () => import('@/views/safety/two-tickets/review.vue'),
          meta: { title: '两票审查' }
        },
        {
          path: 'statistics',
          name: 'SafetyTwoTicketsStatistics',
          component: () => import('@/views/safety/two-tickets/statistics.vue'),
          meta: { title: '统计分析' }
        }
      ]
    },
    // 114.0. 应急处突
    {
      path: 'emergency',
      name: 'SafetyEmergency',
      component: () => import('@/views/safety/emergency/index.vue'),
      meta: {
        title: '应急处突',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'SafetyEmergencyPlan',
          component: () => import('@/views/safety/emergency/plan.vue'),
          meta: { title: '应急预案' }
        },
        {
          path: 'drill',
          name: 'SafetyEmergencyDrill',
          component: () => import('@/views/safety/emergency/drill.vue'),
          meta: { title: '应急演练' }
        },
        {
          path: 'flood-control',
          name: 'SafetyEmergencyFloodControl',
          component: () => import('@/views/safety/emergency/flood-control.vue'),
          meta: { title: '防汛专项管理' }
        },
        {
          path: 'extreme-weather',
          name: 'SafetyEmergencyExtremeWeather',
          component: () => import('@/views/safety/emergency/extreme-weather.vue'),
          meta: { title: '极端天气预警' }
        },
        {
          path: 'emergency-repair',
          name: 'SafetyEmergencyEmergencyRepair',
          component: () => import('@/views/safety/emergency-repair/index.vue'),
          meta: { title: '应急抢修' }
        },
        {
          path: 'incident-report',
          name: 'SafetyEmergencyIncidentReport',
          component: () => import('@/views/safety/emergency/incident-report.vue'),
          meta: { title: '生产安全突发事件报送' }
        }
      ]
    },
    // 120.0. 台账管理
    {
      path: 'ledger',
      name: 'SafetyLedger',
      component: () => import('@/views/safety/ledger/index.vue'),
      meta: {
        title: '台账管理',
        keepAlive: true
      },
      children: [
        {
          path: 'confined-space',
          name: 'SafetyLedgerConfinedSpace',
          component: () => import('@/views/safety/ledger/confined-space.vue'),
          meta: { title: '有限空间台账' }
        },
        {
          path: 'special-equipment',
          name: 'SafetyLedgerSpecialEquipment',
          component: () => import('@/views/safety/ledger/special-equipment.vue'),
          meta: { title: '特种设备台账' }
        },
        {
          path: 'safety-tools',
          name: 'SafetyLedgerSafetyTools',
          component: () => import('@/views/safety/ledger/safety-tools.vue'),
          meta: { title: '安全工器具台账' }
        },
        {
          path: 'small-tools',
          name: 'SafetyLedgerSmallTools',
          component: () => import('@/views/safety/ledger/small-tools.vue'),
          meta: { title: '小型工器具（手持电动工具）台账' }
        }
      ]
    }
  ]
}
