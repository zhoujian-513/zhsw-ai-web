import { AppRouteRecord } from '@/types/router'

/**
 * 管网监测路由模块
 * 对应平台功能清单 - 124. 管网监测
 */
export const pipelineRoutes: AppRouteRecord = {
  path: '/pipeline',
  name: 'Pipeline',
  component: () => import('@/views/pipeline/index.vue'),
  meta: {
    title: '管网监测',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 124.0. 排水一张图
    {
      path: 'drainage-map',
      name: 'PipelineDrainageMap',
      component: () => import('@/views/pipeline/drainage-map/index.vue'),
      meta: {
        title: '排水一张图',
        keepAlive: true
      }
    },
    // 125.0. 管网运维驾驶舱
    {
      path: 'cockpit',
      name: 'PipelineCockpit',
      component: () => import('@/views/pipeline/cockpit/index.vue'),
      meta: {
        title: '管网运维驾驶舱',
        keepAlive: true
      }
    },
    // 126.0. 数据录入
    {
      path: 'data-entry',
      name: 'PipelineDataEntry',
      component: () => import('@/views/pipeline/data-entry/index.vue'),
      meta: {
        title: '数据录入',
        keepAlive: true
      },
      children: [
        {
          path: 'rtk',
          name: 'PipelineDataEntryRtk',
          component: () => import('@/views/pipeline/data-entry/rtk.vue'),
          meta: { title: 'RTK录入' }
        },
        {
          path: 'upload',
          name: 'PipelineDataEntryUpload',
          component: () => import('@/views/pipeline/data-entry/upload.vue'),
          meta: { title: '数据上传' }
        },
        {
          path: 'quality-rule',
          name: 'PipelineDataEntryQualityRule',
          component: () => import('@/views/pipeline/data-entry/quality-rule.vue'),
          meta: { title: '数据质检规则' }
        }
      ]
    },
    // 129.0. 移交接管申请
    {
      path: 'handover',
      name: 'PipelineHandover',
      component: () => import('@/views/pipeline/handover/index.vue'),
      meta: {
        title: '移交接管申请',
        keepAlive: true
      }
    },
    // 130.0. 档案管理
    {
      path: 'archive',
      name: 'PipelineArchive',
      component: () => import('@/views/pipeline/archive/index.vue'),
      meta: {
        title: '档案管理',
        keepAlive: true
      },
      children: [
        {
          path: 'basic-info',
          name: 'PipelineArchiveBasicInfo',
          component: () => import('@/views/pipeline/archive/basic-info.vue'),
          meta: { title: '基础资料' }
        },
        {
          path: 'regulation-standard',
          name: 'PipelineArchiveRegulationStandard',
          component: () => import('@/views/pipeline/archive/regulation-standard.vue'),
          meta: { title: '管理制度及标准' }
        },
        {
          path: 'operation',
          name: 'PipelineArchiveOperation',
          component: () => import('@/views/pipeline/archive/operation.vue'),
          meta: { title: '运维档案' }
        }
      ]
    },
    // 133.0. 人员管理
    {
      path: 'personnel',
      name: 'PipelinePersonnel',
      component: () => import('@/views/pipeline/personnel/index.vue'),
      meta: {
        title: '人员管理',
        keepAlive: true
      },
      children: [
        {
          path: 'roster',
          name: 'PipelinePersonnelRoster',
          component: () => import('@/views/pipeline/personnel/roster.vue'),
          meta: { title: '花名册' }
        },
        {
          path: 'attendance',
          name: 'PipelinePersonnelAttendance',
          component: () => import('@/views/pipeline/personnel/attendance.vue'),
          meta: { title: '人员考勤' }
        },
        {
          path: 'scheduling',
          name: 'PipelinePersonnelScheduling',
          component: () => import('@/views/pipeline/personnel/scheduling.vue'),
          meta: { title: '人员排班管理' }
        }
      ]
    },
    // 136.0. 管网基础信息台账
    {
      path: 'basic-ledger',
      name: 'PipelineBasicLedger',
      component: () => import('@/views/pipeline/basic-ledger/index.vue'),
      meta: {
        title: '管网基础信息台账',
        keepAlive: true
      },
      children: [
        {
          path: 'area',
          name: 'PipelineBasicLedgerArea',
          component: () => import('@/views/pipeline/basic-ledger/area.vue'),
          meta: { title: '片区台账' }
        },
        {
          path: 'road',
          name: 'PipelineBasicLedgerRoad',
          component: () => import('@/views/pipeline/basic-ledger/road.vue'),
          meta: { title: '道路台账' }
        },
        {
          path: 'pipeline-info',
          name: 'PipelineBasicLedgerPipelineInfo',
          component: () => import('@/views/pipeline/basic-ledger/pipeline-info.vue'),
          meta: { title: '管线信息台账' }
        },
        {
          path: 'point-info',
          name: 'PipelineBasicLedgerPointInfo',
          component: () => import('@/views/pipeline/basic-ledger/point-info.vue'),
          meta: { title: '管点信息台账' }
        },
        {
          path: 'overflow-point',
          name: 'PipelineBasicLedgerOverflowPoint',
          component: () => import('@/views/pipeline/basic-ledger/overflow-point.vue'),
          meta: { title: '冒溢点/积涝点台账' }
        },
        {
          path: 'pump-station',
          name: 'PipelineBasicLedgerPumpStation',
          component: () => import('@/views/pipeline/basic-ledger/pump-station.vue'),
          meta: { title: '泵站台账' }
        },
        {
          path: 'storage-pool',
          name: 'PipelineBasicLedgerStoragePool',
          component: () => import('@/views/pipeline/basic-ledger/storage-pool.vue'),
          meta: { title: '调蓄池台账' }
        }
      ]
    },
    // 143.0. 管理台账
    {
      path: 'management-ledger',
      name: 'PipelineManagementLedger',
      component: () => import('@/views/pipeline/management-ledger/index.vue'),
      meta: {
        title: '管理台账',
        keepAlive: true
      },
      children: [
        {
          path: 'operation-plan',
          name: 'PipelineManagementLedgerOperationPlan',
          component: () => import('@/views/pipeline/management-ledger/operation-plan.vue'),
          meta: { title: '运维方案' }
        },
        {
          path: 'operation',
          name: 'PipelineManagementLedgerOperation',
          component: () => import('@/views/pipeline/management-ledger/operation.vue'),
          meta: { title: '运维台账' }
        },
        {
          path: 'protection',
          name: 'PipelineManagementLedgerProtection',
          component: () => import('@/views/pipeline/management-ledger/protection.vue'),
          meta: { title: '管道保护' }
        }
      ]
    },
    // 146.0. 管网巡查
    {
      path: 'inspection',
      name: 'PipelineInspection',
      component: () => import('@/views/pipeline/inspection/index.vue'),
      meta: {
        title: '管网巡查',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'PipelineInspectionPlan',
          component: () => import('@/views/pipeline/inspection/plan.vue'),
          meta: { title: '巡查作业计划' }
        },
        {
          path: 'workorder',
          name: 'PipelineInspectionWorkorder',
          component: () => import('@/views/pipeline/inspection/workorder.vue'),
          meta: { title: '巡查工单' }
        }
      ]
    },
    // 148.0. 管网养护维修
    {
      path: 'maintenance',
      name: 'PipelineMaintenance',
      component: () => import('@/views/pipeline/maintenance/index.vue'),
      meta: {
        title: '管网养护维修',
        keepAlive: true
      },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineMaintenanceAnnualPlan',
          component: () => import('@/views/pipeline/maintenance/annual-plan.vue'),
          meta: { title: '管网年度养护计划' }
        },
        {
          path: 'workorder',
          name: 'PipelineMaintenanceWorkorder',
          component: () => import('@/views/pipeline/maintenance/workorder.vue'),
          meta: { title: '管网养护工单' }
        },
        {
          path: 'repair-workorder',
          name: 'PipelineMaintenanceRepairWorkorder',
          component: () => import('@/views/pipeline/maintenance/repair-workorder.vue'),
          meta: { title: '管网维修工单（有审核流程）' }
        }
      ]
    },
    // 151.0. 管网检测
    {
      path: 'detection',
      name: 'PipelineDetection',
      component: () => import('@/views/pipeline/detection/index.vue'),
      meta: {
        title: '管网检测',
        keepAlive: true
      },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineDetectionAnnualPlan',
          component: () => import('@/views/pipeline/detection/annual-plan.vue'),
          meta: { title: '年度检测计划' }
        },
        {
          path: 'workorder',
          name: 'PipelineDetectionWorkorder',
          component: () => import('@/views/pipeline/detection/workorder.vue'),
          meta: { title: '检测作业工单' }
        },
        {
          path: 'analysis',
          name: 'PipelineDetectionAnalysis',
          component: () => import('@/views/pipeline/detection/analysis.vue'),
          meta: { title: '检测分析' }
        }
      ]
    },
    // 154.0. 管网水质水量管理
    {
      path: 'water-quality',
      name: 'PipelineWaterQuality',
      component: () => import('@/views/pipeline/water-quality/index.vue'),
      meta: {
        title: '管网水质水量管理',
        keepAlive: true
      },
      children: [
        {
          path: 'discharge-unit',
          name: 'PipelineWaterQualityDischargeUnit',
          component: () => import('@/views/pipeline/water-quality/discharge-unit.vue'),
          meta: { title: '排水户管理' }
        },
        {
          path: 'annual-sampling-plan',
          name: 'PipelineWaterQualityAnnualSamplingPlan',
          component: () => import('@/views/pipeline/water-quality/annual-sampling-plan.vue'),
          meta: { title: '年度水质取样计划' }
        },
        {
          path: 'sampling-workorder',
          name: 'PipelineWaterQualitySamplingWorkorder',
          component: () => import('@/views/pipeline/water-quality/sampling-workorder.vue'),
          meta: { title: '水质取样工单' }
        },
        {
          path: 'traceability-workorder',
          name: 'PipelineWaterQualityTraceabilityWorkorder',
          component: () => import('@/views/pipeline/water-quality/traceability-workorder.vue'),
          meta: { title: '溯源排查工单' }
        }
      ]
    },
    // 158.0. 泵站/调蓄池巡查
    {
      path: 'pump-inspection',
      name: 'PipelinePumpInspection',
      component: () => import('@/views/pipeline/pump-inspection/index.vue'),
      meta: {
        title: '泵站/调蓄池巡查',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'PipelinePumpInspectionPlan',
          component: () => import('@/views/pipeline/pump-inspection/plan.vue'),
          meta: { title: '巡查作业计划' }
        },
        {
          path: 'workorder',
          name: 'PipelinePumpInspectionWorkorder',
          component: () => import('@/views/pipeline/pump-inspection/workorder.vue'),
          meta: { title: '巡查工单' }
        }
      ]
    },
    // 160.0. 泵站/调蓄池养护维修
    {
      path: 'pump-maintenance',
      name: 'PipelinePumpMaintenance',
      component: () => import('@/views/pipeline/pump-maintenance/index.vue'),
      meta: {
        title: '泵站/调蓄池养护维修',
        keepAlive: true
      },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelinePumpMaintenanceAnnualPlan',
          component: () => import('@/views/pipeline/pump-maintenance/annual-plan.vue'),
          meta: { title: '年度养护维修计划' }
        },
        {
          path: 'workorder',
          name: 'PipelinePumpMaintenanceWorkorder',
          component: () => import('@/views/pipeline/pump-maintenance/workorder.vue'),
          meta: { title: '养护维修工单' }
        }
      ]
    },
    // 162.0. 大修重置
    {
      path: 'overhaul',
      name: 'PipelineOverhaul',
      component: () => import('@/views/pipeline/overhaul/index.vue'),
      meta: {
        title: '大修重置',
        keepAlive: true
      },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineOverhaulAnnualPlan',
          component: () => import('@/views/pipeline/overhaul/annual-plan.vue'),
          meta: { title: '年度大修重置计划' }
        },
        {
          path: 'scheme',
          name: 'PipelineOverhaulScheme',
          component: () => import('@/views/pipeline/overhaul/scheme.vue'),
          meta: { title: '大修重置维修方案' }
        },
        {
          path: 'workorder',
          name: 'PipelineOverhaulWorkorder',
          component: () => import('@/views/pipeline/overhaul/workorder.vue'),
          meta: { title: '大修重置工单' }
        }
      ]
    },
    // 165.0. 缺陷中心
    {
      path: 'defect',
      name: 'PipelineDefect',
      component: () => import('@/views/pipeline/defect/index.vue'),
      meta: {
        title: '缺陷中心',
        keepAlive: true
      },
      children: [
        {
          path: 'event',
          name: 'PipelineDefectEvent',
          component: () => import('@/views/pipeline/defect/event.vue'),
          meta: { title: '事件管理' }
        },
        {
          path: 'management',
          name: 'PipelineDefectManagement',
          component: () => import('@/views/pipeline/defect/management.vue'),
          meta: { title: '缺陷管理' }
        }
      ]
    },
    // 167.0. 应急管理
    {
      path: 'emergency',
      name: 'PipelineEmergency',
      component: () => import('@/views/pipeline/emergency/index.vue'),
      meta: {
        title: '应急管理',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'PipelineEmergencyPlan',
          component: () => import('@/views/pipeline/emergency/plan.vue'),
          meta: { title: '应急预案' }
        },
        {
          path: 'drill',
          name: 'PipelineEmergencyDrill',
          component: () => import('@/views/pipeline/emergency/drill.vue'),
          meta: { title: '应急演练' }
        },
        {
          path: 'material',
          name: 'PipelineEmergencyMaterial',
          component: () => import('@/views/pipeline/emergency/material.vue'),
          meta: { title: '应急物资' }
        },
        {
          path: 'response',
          name: 'PipelineEmergencyResponse',
          component: () => import('@/views/pipeline/emergency/response.vue'),
          meta: { title: '应急响应' }
        },
        {
          path: 'workorder',
          name: 'PipelineEmergencyWorkorder',
          component: () => import('@/views/pipeline/emergency/workorder.vue'),
          meta: { title: '应急工单' }
        }
      ]
    },
    // 172.0. 公众事件管理
    {
      path: 'public-event',
      name: 'PipelinePublicEvent',
      component: () => import('@/views/pipeline/public-event/index.vue'),
      meta: {
        title: '公众事件管理',
        keepAlive: true
      },
      children: [
        {
          path: 'ledger',
          name: 'PipelinePublicEventLedger',
          component: () => import('@/views/pipeline/public-event/ledger.vue'),
          meta: { title: '投诉事件台账' }
        },
        {
          path: 'workorder',
          name: 'PipelinePublicEventWorkorder',
          component: () => import('@/views/pipeline/public-event/workorder.vue'),
          meta: { title: '投诉事件处置工单' }
        }
      ]
    },
    // 174.0. 管网监测
    {
      path: 'monitor',
      name: 'PipelineMonitor',
      component: () => import('@/views/pipeline/monitor/index.vue'),
      meta: {
        title: '管网监测',
        keepAlive: true
      },
      children: [
        {
          path: 'pump-station',
          name: 'PipelineMonitorPumpStation',
          component: () => import('@/views/pipeline/monitor/pump-station.vue'),
          meta: { title: '泵站' }
        },
        {
          path: 'pipeline',
          name: 'PipelineMonitorPipeline',
          component: () => import('@/views/pipeline/monitor/pipeline.vue'),
          meta: { title: '管渠' }
        },
        {
          path: 'risk-point',
          name: 'PipelineMonitorRiskPoint',
          component: () => import('@/views/pipeline/monitor/risk-point.vue'),
          meta: { title: '易涝点等风险点位' }
        }
      ]
    }
  ]
}
