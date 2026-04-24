import type { AppRouteRecord } from '@/types/router'

export const pipelineRoutes: AppRouteRecord = {
  path: '/pipeline',
  name: 'Pipeline',
  component: '',
  meta: {
    title: 'menus.pipeline.title',
    icon: '&#xe62c;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 排水一张图
    {
      path: 'drainage-map',
      name: 'PipelineDrainageMap',
      component: '/pipeline/drainage-map/index',
      meta: { title: 'menus.pipeline.drainageMap', keepAlive: true }
    },
    // 2.0. 管网运维驾驶舱
    {
      path: 'cockpit',
      name: 'PipelineCockpit',
      component: '/pipeline/cockpit/index',
      meta: { title: 'menus.pipeline.cockpit', keepAlive: true }
    },
    // 3.0. 数据录入
    {
      path: 'data-entry',
      name: 'PipelineDataEntry',
      component: '',
      meta: { title: 'menus.pipeline.dataEntry' },
      children: [
        {
          path: 'rtk',
          name: 'PipelineDataEntryRtk',
          component: '/pipeline/data-entry/rtk/index',
          meta: { title: 'menus.pipeline.dataEntryRtk', keepAlive: true }
        },
        {
          path: 'upload',
          name: 'PipelineDataEntryUpload',
          component: '/pipeline/data-entry/upload/index',
          meta: { title: 'menus.pipeline.dataEntryUpload', keepAlive: true }
        },
        {
          path: 'quality-rule',
          name: 'PipelineDataEntryQualityRule',
          component: '/pipeline/data-entry/quality-rule/index',
          meta: { title: 'menus.pipeline.dataEntryQualityRule', keepAlive: true }
        }
      ]
    },
    // 4.0. 移交接管申请
    {
      path: 'handover',
      name: 'PipelineHandover',
      component: '/pipeline/handover/index',
      meta: { title: 'menus.pipeline.handover', keepAlive: true }
    },
    // 5.0. 档案管理
    {
      path: 'archive',
      name: 'PipelineArchive',
      component: '',
      meta: { title: 'menus.pipeline.archive' },
      children: [
        {
          path: 'basic',
          name: 'PipelineArchiveBasic',
          component: '/pipeline/archive/basic/index',
          meta: { title: 'menus.pipeline.archiveBasic', keepAlive: true }
        },
        {
          path: 'system',
          name: 'PipelineArchiveSystem',
          component: '/pipeline/archive/system/index',
          meta: { title: 'menus.pipeline.archiveSystem', keepAlive: true }
        },
        {
          path: 'operation',
          name: 'PipelineArchiveOperation',
          component: '/pipeline/archive/operation/index',
          meta: { title: 'menus.pipeline.archiveOperation', keepAlive: true }
        }
      ]
    },
    // 6.0. 人员管理
    {
      path: 'personnel',
      name: 'PipelinePersonnel',
      component: '',
      meta: { title: 'menus.pipeline.personnel' },
      children: [
        {
          path: 'roster',
          name: 'PipelinePersonnelRoster',
          component: '/pipeline/personnel/roster/index',
          meta: { title: 'menus.pipeline.personnelRoster', keepAlive: true }
        },
        {
          path: 'attendance',
          name: 'PipelinePersonnelAttendance',
          component: '/pipeline/personnel/attendance/index',
          meta: { title: 'menus.pipeline.personnelAttendance', keepAlive: true }
        },
        {
          path: 'schedule',
          name: 'PipelinePersonnelSchedule',
          component: '/pipeline/personnel/schedule/index',
          meta: { title: 'menus.pipeline.personnelSchedule', keepAlive: true }
        }
      ]
    },
    // 7.0. 管网基础信息台账
    {
      path: 'basic-ledger',
      name: 'PipelineBasicLedger',
      component: '',
      meta: { title: 'menus.pipeline.basicLedger' },
      children: [
        {
          path: 'area',
          name: 'PipelineBasicLedgerArea',
          component: '/pipeline/basic-ledger/area/index',
          meta: { title: 'menus.pipeline.basicLedgerArea', keepAlive: true }
        },
        {
          path: 'road',
          name: 'PipelineBasicLedgerRoad',
          component: '/pipeline/basic-ledger/road/index',
          meta: { title: 'menus.pipeline.basicLedgerRoad', keepAlive: true }
        },
        {
          path: 'pipeline',
          name: 'PipelineBasicLedgerPipeline',
          component: '/pipeline/basic-ledger/pipeline/index',
          meta: { title: 'menus.pipeline.basicLedgerPipeline', keepAlive: true }
        },
        {
          path: 'point',
          name: 'PipelineBasicLedgerPoint',
          component: '/pipeline/basic-ledger/point/index',
          meta: { title: 'menus.pipeline.basicLedgerPoint', keepAlive: true }
        },
        {
          path: 'overflow',
          name: 'PipelineBasicLedgerOverflow',
          component: '/pipeline/basic-ledger/overflow/index',
          meta: { title: 'menus.pipeline.basicLedgerOverflow', keepAlive: true }
        },
        {
          path: 'pump-station',
          name: 'PipelineBasicLedgerPumpStation',
          component: '/pipeline/basic-ledger/pump-station/index',
          meta: { title: 'menus.pipeline.basicLedgerPumpStation', keepAlive: true }
        },
        {
          path: 'storage',
          name: 'PipelineBasicLedgerStorage',
          component: '/pipeline/basic-ledger/storage/index',
          meta: { title: 'menus.pipeline.basicLedgerStorage', keepAlive: true }
        }
      ]
    },
    // 8.0. 管理台账
    {
      path: 'manage-ledger',
      name: 'PipelineManageLedger',
      component: '',
      meta: { title: 'menus.pipeline.manageLedger' },
      children: [
        {
          path: 'plan',
          name: 'PipelineManageLedgerPlan',
          component: '/pipeline/manage-ledger/plan/index',
          meta: { title: 'menus.pipeline.manageLedgerPlan', keepAlive: true }
        },
        {
          path: 'ledger',
          name: 'PipelineManageLedgerLedger',
          component: '/pipeline/manage-ledger/ledger/index',
          meta: { title: 'menus.pipeline.manageLedgerLedger', keepAlive: true }
        },
        {
          path: 'protection',
          name: 'PipelineManageLedgerProtection',
          component: '/pipeline/manage-ledger/protection/index',
          meta: { title: 'menus.pipeline.manageLedgerProtection', keepAlive: true }
        }
      ]
    },
    // 9.0. 管网巡查
    {
      path: 'patrol',
      name: 'PipelinePatrol',
      component: '',
      meta: { title: 'menus.pipeline.patrol' },
      children: [
        {
          path: 'plan',
          name: 'PipelinePatrolPlan',
          component: '/pipeline/patrol/plan/index',
          meta: { title: 'menus.pipeline.patrolPlan', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelinePatrolOrder',
          component: '/pipeline/patrol/order/index',
          meta: { title: 'menus.pipeline.patrolOrder', keepAlive: true }
        }
      ]
    },
    // 10.0. 管网养护维修
    {
      path: 'maintenance',
      name: 'PipelineMaintenance',
      component: '',
      meta: { title: 'menus.pipeline.maintenance' },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineMaintenanceAnnualPlan',
          component: '/pipeline/maintenance/annual-plan/index',
          meta: { title: 'menus.pipeline.maintenanceAnnualPlan', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelineMaintenanceOrder',
          component: '/pipeline/maintenance/order/index',
          meta: { title: 'menus.pipeline.maintenanceOrder', keepAlive: true }
        },
        {
          path: 'repair-order',
          name: 'PipelineMaintenanceRepairOrder',
          component: '/pipeline/maintenance/repair-order/index',
          meta: { title: 'menus.pipeline.maintenanceRepairOrder', keepAlive: true }
        }
      ]
    },
    // 11.0. 管网检测
    {
      path: 'detection',
      name: 'PipelineDetection',
      component: '',
      meta: { title: 'menus.pipeline.detection' },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineDetectionAnnualPlan',
          component: '/pipeline/detection/annual-plan/index',
          meta: { title: 'menus.pipeline.detectionAnnualPlan', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelineDetectionOrder',
          component: '/pipeline/detection/order/index',
          meta: { title: 'menus.pipeline.detectionOrder', keepAlive: true }
        },
        {
          path: 'analysis',
          name: 'PipelineDetectionAnalysis',
          component: '/pipeline/detection/analysis/index',
          meta: { title: 'menus.pipeline.detectionAnalysis', keepAlive: true }
        }
      ]
    },
    // 12.0. 管网水质水量管理
    {
      path: 'water-quality',
      name: 'PipelineWaterQuality',
      component: '',
      meta: { title: 'menus.pipeline.waterQuality' },
      children: [
        {
          path: 'discharge',
          name: 'PipelineWaterQualityDischarge',
          component: '/pipeline/water-quality/discharge/index',
          meta: { title: 'menus.pipeline.waterQualityDischarge', keepAlive: true }
        },
        {
          path: 'sampling-plan',
          name: 'PipelineWaterQualitySamplingPlan',
          component: '/pipeline/water-quality/sampling-plan/index',
          meta: { title: 'menus.pipeline.waterQualitySamplingPlan', keepAlive: true }
        },
        {
          path: 'sampling-order',
          name: 'PipelineWaterQualitySamplingOrder',
          component: '/pipeline/water-quality/sampling-order/index',
          meta: { title: 'menus.pipeline.waterQualitySamplingOrder', keepAlive: true }
        },
        {
          path: 'traceability',
          name: 'PipelineWaterQualityTraceability',
          component: '/pipeline/water-quality/traceability/index',
          meta: { title: 'menus.pipeline.waterQualityTraceability', keepAlive: true }
        }
      ]
    },
    // 13.0. 泵站/调蓄池巡查
    {
      path: 'station-patrol',
      name: 'PipelineStationPatrol',
      component: '',
      meta: { title: 'menus.pipeline.stationPatrol' },
      children: [
        {
          path: 'plan',
          name: 'PipelineStationPatrolPlan',
          component: '/pipeline/station-patrol/plan/index',
          meta: { title: 'menus.pipeline.stationPatrolPlan', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelineStationPatrolOrder',
          component: '/pipeline/station-patrol/order/index',
          meta: { title: 'menus.pipeline.stationPatrolOrder', keepAlive: true }
        }
      ]
    },
    // 14.0. 泵站/调蓄池养护维修
    {
      path: 'station-maintenance',
      name: 'PipelineStationMaintenance',
      component: '',
      meta: { title: 'menus.pipeline.stationMaintenance' },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineStationMaintenanceAnnualPlan',
          component: '/pipeline/station-maintenance/annual-plan/index',
          meta: { title: 'menus.pipeline.stationMaintenanceAnnualPlan', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelineStationMaintenanceOrder',
          component: '/pipeline/station-maintenance/order/index',
          meta: { title: 'menus.pipeline.stationMaintenanceOrder', keepAlive: true }
        }
      ]
    },
    // 15.0. 大修重置
    {
      path: 'overhaul',
      name: 'PipelineOverhaul',
      component: '',
      meta: { title: 'menus.pipeline.overhaul' },
      children: [
        {
          path: 'annual-plan',
          name: 'PipelineOverhaulAnnualPlan',
          component: '/pipeline/overhaul/annual-plan/index',
          meta: { title: 'menus.pipeline.overhaulAnnualPlan', keepAlive: true }
        },
        {
          path: 'scheme',
          name: 'PipelineOverhaulScheme',
          component: '/pipeline/overhaul/scheme/index',
          meta: { title: 'menus.pipeline.overhaulScheme', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelineOverhaulOrder',
          component: '/pipeline/overhaul/order/index',
          meta: { title: 'menus.pipeline.overhaulOrder', keepAlive: true }
        }
      ]
    },
    // 16.0. 缺陷中心
    {
      path: 'defect',
      name: 'PipelineDefect',
      component: '',
      meta: { title: 'menus.pipeline.defect' },
      children: [
        {
          path: 'event',
          name: 'PipelineDefectEvent',
          component: '/pipeline/defect/event/index',
          meta: { title: 'menus.pipeline.defectEvent', keepAlive: true }
        },
        {
          path: 'manage',
          name: 'PipelineDefectManage',
          component: '/pipeline/defect/manage/index',
          meta: { title: 'menus.pipeline.defectManage', keepAlive: true }
        }
      ]
    },
    // 17.0. 应急管理
    {
      path: 'emergency',
      name: 'PipelineEmergency',
      component: '',
      meta: { title: 'menus.pipeline.emergency' },
      children: [
        {
          path: 'plan',
          name: 'PipelineEmergencyPlan',
          component: '/pipeline/emergency/plan/index',
          meta: { title: 'menus.pipeline.emergencyPlan', keepAlive: true }
        },
        {
          path: 'drill',
          name: 'PipelineEmergencyDrill',
          component: '/pipeline/emergency/drill/index',
          meta: { title: 'menus.pipeline.emergencyDrill', keepAlive: true }
        },
        {
          path: 'material',
          name: 'PipelineEmergencyMaterial',
          component: '/pipeline/emergency/material/index',
          meta: { title: 'menus.pipeline.emergencyMaterial', keepAlive: true }
        },
        {
          path: 'response',
          name: 'PipelineEmergencyResponse',
          component: '/pipeline/emergency/response/index',
          meta: { title: 'menus.pipeline.emergencyResponse', keepAlive: true }
        },
        {
          path: 'order',
          name: 'PipelineEmergencyOrder',
          component: '/pipeline/emergency/order/index',
          meta: { title: 'menus.pipeline.emergencyOrder', keepAlive: true }
        }
      ]
    },
    // 18.0. 公众事件管理
    {
      path: 'public-event',
      name: 'PipelinePublicEvent',
      component: '',
      meta: { title: 'menus.pipeline.publicEvent' },
      children: [
        {
          path: 'ledger',
          name: 'PipelinePublicEventLedger',
          component: '/pipeline/public-event/ledger/index',
          meta: { title: 'menus.pipeline.publicEventLedger', keepAlive: true }
        },
        {
          path: 'handle-order',
          name: 'PipelinePublicEventHandleOrder',
          component: '/pipeline/public-event/handle-order/index',
          meta: { title: 'menus.pipeline.publicEventHandleOrder', keepAlive: true }
        }
      ]
    },
    // 19.0. 管网监测
    {
      path: 'monitor',
      name: 'PipelineMonitor',
      component: '',
      meta: { title: 'menus.pipeline.monitor' },
      children: [
        {
          path: 'pump-station',
          name: 'PipelineMonitorPumpStation',
          component: '/pipeline/monitor/pump-station/index',
          meta: { title: 'menus.pipeline.monitorPumpStation', keepAlive: true }
        },
        {
          path: 'channel',
          name: 'PipelineMonitorChannel',
          component: '/pipeline/monitor/channel/index',
          meta: { title: 'menus.pipeline.monitorChannel', keepAlive: true }
        },
        {
          path: 'risk-point',
          name: 'PipelineMonitorRiskPoint',
          component: '/pipeline/monitor/risk-point/index',
          meta: { title: 'menus.pipeline.monitorRiskPoint', keepAlive: true }
        }
      ]
    },
    // 管网GIS
    {
      path: 'gis',
      name: 'PipelineGis',
      component: '/pipeline/gis/index',
      meta: { title: 'menus.pipeline.gis', keepAlive: true }
    }
  ]
}
