import type { AppRouteRecord } from '@/types/router'

export const safetyRoutes: AppRouteRecord = {
  path: '/safety',
  name: 'Safety',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.safety.title',
    icon: '&#xe628;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 安全资质管理
    {
      path: 'qualification',
      name: 'SafetyQualification',
      meta: { title: 'menus.safety.qualification' },
      children: [
        {
          path: 'certificate',
          name: 'SafetyQualificationCertificate',
          component: () => import('@/views/safety/qualification/certificate/index.vue'),
          meta: { title: 'menus.safety.qualificationCertificate', keepAlive: true }
        },
        {
          path: 'staff-certificate',
          name: 'SafetyStaffCertificate',
          component: () => import('@/views/safety/qualification/staff-certificate/index.vue'),
          meta: { title: 'menus.safety.staffCertificate', keepAlive: true }
        },
        {
          path: 'visitor',
          name: 'SafetyVisitor',
          component: () => import('@/views/safety/qualification/visitor/index.vue'),
          meta: { title: 'menus.safety.visitor', keepAlive: true }
        }
      ]
    },
    // 2.0. 组织机构管理
    {
      path: 'organization',
      name: 'SafetyOrganization',
      meta: { title: 'menus.safety.organization' },
      children: [
        {
          path: 'structure',
          name: 'SafetyOrganizationStructure',
          component: () => import('@/views/safety/organization/structure/index.vue'),
          meta: { title: 'menus.safety.organizationStructure', keepAlive: true }
        },
        {
          path: 'responsibility',
          name: 'SafetyOrganizationResponsibility',
          component: () => import('@/views/safety/organization/responsibility/index.vue'),
          meta: { title: 'menus.safety.organizationResponsibility', keepAlive: true }
        }
      ]
    },
    // 3.0. 安全制度管理
    {
      path: 'system',
      name: 'SafetySystem',
      meta: { title: 'menus.safety.system' },
      children: [
        {
          path: 'national',
          name: 'SafetySystemNational',
          component: () => import('@/views/safety/system/national/index.vue'),
          meta: { title: 'menus.safety.systemNational', keepAlive: true }
        },
        {
          path: 'company',
          name: 'SafetySystemCompany',
          component: () => import('@/views/safety/system/company/index.vue'),
          meta: { title: 'menus.safety.systemCompany', keepAlive: true }
        }
      ]
    },
    // 4.0. 安全培训
    {
      path: 'training',
      name: 'SafetyTraining',
      meta: { title: 'menus.safety.training' },
      children: [
        {
          path: 'plan',
          name: 'SafetyTrainingPlan',
          component: () => import('@/views/safety/training/plan/index.vue'),
          meta: { title: 'menus.safety.trainingPlan', keepAlive: true }
        },
        {
          path: 'topic',
          name: 'SafetyTrainingTopic',
          component: () => import('@/views/safety/training/topic/index.vue'),
          meta: { title: 'menus.safety.trainingTopic', keepAlive: true }
        },
        {
          path: 'material',
          name: 'SafetyTrainingMaterial',
          component: () => import('@/views/safety/training/material/index.vue'),
          meta: { title: 'menus.safety.trainingMaterial', keepAlive: true }
        },
        {
          path: 'question-bank',
          name: 'SafetyTrainingQuestionBank',
          component: () => import('@/views/safety/training/question-bank/index.vue'),
          meta: { title: 'menus.safety.trainingQuestionBank', keepAlive: true }
        },
        {
          path: 'paper',
          name: 'SafetyTrainingPaper',
          component: () => import('@/views/safety/training/paper/index.vue'),
          meta: { title: 'menus.safety.trainingPaper', keepAlive: true }
        },
        {
          path: 'manage',
          name: 'SafetyTrainingManage',
          component: () => import('@/views/safety/training/manage/index.vue'),
          meta: { title: 'menus.safety.trainingManage', keepAlive: true }
        },
        {
          path: 'my-training',
          name: 'SafetyMyTraining',
          component: () => import('@/views/safety/training/my-training/index.vue'),
          meta: { title: 'menus.safety.myTraining', keepAlive: true }
        },
        {
          path: 'my-practice',
          name: 'SafetyMyPractice',
          component: () => import('@/views/safety/training/my-practice/index.vue'),
          meta: { title: 'menus.safety.myPractice', keepAlive: true }
        },
        {
          path: 'exam-manage',
          name: 'SafetyExamManage',
          component: () => import('@/views/safety/training/exam-manage/index.vue'),
          meta: { title: 'menus.safety.examManage', keepAlive: true }
        },
        {
          path: 'my-exam',
          name: 'SafetyMyExam',
          component: () => import('@/views/safety/training/my-exam/index.vue'),
          meta: { title: 'menus.safety.myExam', keepAlive: true }
        },
        {
          path: 'effect-evaluation',
          name: 'SafetyEffectEvaluation',
          component: () => import('@/views/safety/training/effect-evaluation/index.vue'),
          meta: { title: 'menus.safety.effectEvaluation', keepAlive: true }
        },
        {
          path: 'training-analysis',
          name: 'SafetyTrainingAnalysis',
          component: () => import('@/views/safety/training/training-analysis/index.vue'),
          meta: { title: 'menus.safety.trainingAnalysis', keepAlive: true }
        }
      ]
    },
    // 5.0. 安全隐患管理
    {
      path: 'hazard',
      name: 'SafetyHazard',
      meta: { title: 'menus.safety.hazard' },
      children: [
        {
          path: 'report',
          name: 'SafetyHazardReport',
          component: () => import('@/views/safety/hazard/report/index.vue'),
          meta: { title: 'menus.safety.hazardReport', keepAlive: true }
        },
        {
          path: 'rectification',
          name: 'SafetyHazardRectification',
          component: () => import('@/views/safety/hazard/rectification/index.vue'),
          meta: { title: 'menus.safety.hazardRectification', keepAlive: true }
        },
        {
          path: 'statistics',
          name: 'SafetyHazardStatistics',
          component: () => import('@/views/safety/hazard/statistics/index.vue'),
          meta: { title: 'menus.safety.hazardStatistics', keepAlive: true }
        }
      ]
    },
    // 6.0. 风险管控
    {
      path: 'risk',
      name: 'SafetyRisk',
      meta: { title: 'menus.safety.risk' },
      children: [
        {
          path: 'control',
          name: 'SafetyRiskControl',
          component: () => import('@/views/safety/risk/control/index.vue'),
          meta: { title: 'menus.safety.riskControl', keepAlive: true }
        },
        {
          path: 'source',
          name: 'SafetyRiskSource',
          component: () => import('@/views/safety/risk/source/index.vue'),
          meta: { title: 'menus.safety.riskSource', keepAlive: true }
        },
        {
          path: 'statistics',
          name: 'SafetyRiskStatistics',
          component: () => import('@/views/safety/risk/statistics/index.vue'),
          meta: { title: 'menus.safety.riskStatistics', keepAlive: true }
        }
      ]
    },
    // 7.0. 作业计划管理
    {
      path: 'operation-plan',
      name: 'SafetyOperationPlan',
      meta: { title: 'menus.safety.operationPlan' },
      children: [
        {
          path: 'plan-manage',
          name: 'SafetyPlanManage',
          component: () => import('@/views/safety/operation-plan/plan-manage/index.vue'),
          meta: { title: 'menus.safety.planManage', keepAlive: true }
        },
        {
          path: 'screen-patrol',
          name: 'SafetyScreenPatrol',
          component: () => import('@/views/safety/operation-plan/screen-patrol/index.vue'),
          meta: { title: 'menus.safety.screenPatrol', keepAlive: true }
        },
        {
          path: 'question',
          name: 'SafetyQuestion',
          component: () => import('@/views/safety/operation-plan/question/index.vue'),
          meta: { title: 'menus.safety.question', keepAlive: true }
        }
      ]
    },
    // 8.0. 两票管理
    {
      path: 'two-ticket',
      name: 'SafetyTwoTicket',
      meta: { title: 'menus.safety.twoTicket' },
      children: [
        {
          path: 'qualification',
          name: 'SafetyTwoTicketQualification',
          component: () => import('@/views/safety/two-ticket/qualification/index.vue'),
          meta: { title: 'menus.safety.twoTicketQualification', keepAlive: true }
        },
        {
          path: 'work-ticket',
          name: 'SafetyWorkTicket',
          component: () => import('@/views/safety/two-ticket/work-ticket/index.vue'),
          meta: { title: 'menus.safety.workTicket', keepAlive: true }
        },
        {
          path: 'operation-ticket',
          name: 'SafetyOperationTicket',
          component: () => import('@/views/safety/two-ticket/operation-ticket/index.vue'),
          meta: { title: 'menus.safety.operationTicket', keepAlive: true }
        },
        {
          path: 'template',
          name: 'SafetyTwoTicketTemplate',
          component: () => import('@/views/safety/two-ticket/template/index.vue'),
          meta: { title: 'menus.safety.twoTicketTemplate', keepAlive: true }
        },
        {
          path: 'review',
          name: 'SafetyTwoTicketReview',
          component: () => import('@/views/safety/two-ticket/review/index.vue'),
          meta: { title: 'menus.safety.twoTicketReview', keepAlive: true }
        },
        {
          path: 'statistics',
          name: 'SafetyTwoTicketStatistics',
          component: () => import('@/views/safety/two-ticket/statistics/index.vue'),
          meta: { title: 'menus.safety.twoTicketStatistics', keepAlive: true }
        }
      ]
    },
    // 9.0. 应急处突
    {
      path: 'emergency',
      name: 'SafetyEmergency',
      meta: { title: 'menus.safety.emergency' },
      children: [
        {
          path: 'plan',
          name: 'SafetyEmergencyPlan',
          component: () => import('@/views/safety/emergency/plan/index.vue'),
          meta: { title: 'menus.safety.emergencyPlan', keepAlive: true }
        },
        {
          path: 'drill',
          name: 'SafetyEmergencyDrill',
          component: () => import('@/views/safety/emergency/drill/index.vue'),
          meta: { title: 'menus.safety.emergencyDrill', keepAlive: true }
        },
        {
          path: 'flood',
          name: 'SafetyEmergencyFlood',
          component: () => import('@/views/safety/emergency/flood/index.vue'),
          meta: { title: 'menus.safety.emergencyFlood', keepAlive: true }
        },
        {
          path: 'weather',
          name: 'SafetyEmergencyWeather',
          component: () => import('@/views/safety/emergency/weather/index.vue'),
          meta: { title: 'menus.safety.emergencyWeather', keepAlive: true }
        },
        {
          path: 'repair',
          name: 'SafetyEmergencyRepair',
          component: () => import('@/views/safety/emergency/repair/index.vue'),
          meta: { title: 'menus.safety.emergencyRepair', keepAlive: true }
        },
        {
          path: 'incident',
          name: 'SafetyEmergencyIncident',
          component: () => import('@/views/safety/emergency/incident/index.vue'),
          meta: { title: 'menus.safety.emergencyIncident', keepAlive: true }
        }
      ]
    },
    // 10.0. 台账管理
    {
      path: 'ledger',
      name: 'SafetyLedger',
      meta: { title: 'menus.safety.ledger' },
      children: [
        {
          path: 'confined-space',
          name: 'SafetyConfinedSpace',
          component: () => import('@/views/safety/ledger/confined-space/index-fixed.vue'),
          meta: { title: 'menus.safety.confinedSpace', keepAlive: false }
        },
        {
          path: 'special-equipment',
          name: 'SafetySpecialEquipment',
          component: () => import('@/views/safety/ledger/special-equipment/index.vue'),
          meta: { title: 'menus.safety.specialEquipment', keepAlive: true }
        },
        {
          path: 'safety-tools',
          name: 'SafetySafetyTools',
          component: () => import('@/views/safety/ledger/safety-tools/index.vue'),
          meta: { title: 'menus.safety.safetyTools', keepAlive: true }
        },
        {
          path: 'small-tools',
          name: 'SafetySmallTools',
          component: () => import('@/views/safety/ledger/small-tools/index.vue'),
          meta: { title: 'menus.safety.smallTools', keepAlive: true }
        }
      ]
    }
  ]
}
