import type { AppRouteRecord } from '@/types/router'

export const deviceRoutes: AppRouteRecord = {
  path: '/device',
  name: 'Device',
  component: '',
  meta: {
    title: 'menus.device.title',
    icon: '&#xe8b5;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 设备基础配置
    {
      path: 'base-config',
      name: 'DeviceBaseConfig',
      component: '',
      meta: { title: 'menus.device.baseConfig' },
      children: [
        {
          path: 'property-field',
          name: 'DevicePropertyField',
          component: '/device/base-config/property-field/index',
          meta: { title: 'menus.device.propertyField', keepAlive: true }
        },
        {
          path: 'business-type',
          name: 'DeviceBusinessType',
          component: '/device/base-config/business-type/index',
          meta: { title: 'menus.device.businessType', keepAlive: true }
        },
        {
          path: 'function-type',
          name: 'DeviceFunctionType',
          component: '/device/base-config/function-type/index',
          meta: { title: 'menus.device.functionType', keepAlive: true }
        },
        {
          path: 'process-section',
          name: 'DeviceProcessSection',
          component: '/device/base-config/process-section/index',
          meta: { title: 'menus.device.processSection', keepAlive: true }
        },
        {
          path: 'category',
          name: 'DeviceCategory',
          component: '/device/base-config/category/index',
          meta: { title: 'menus.device.category', keepAlive: true }
        },
        {
          path: 'region-code',
          name: 'DeviceRegionCode',
          component: '/device/base-config/region-code/index',
          meta: { title: 'menus.device.regionCode', keepAlive: true }
        },
        {
          path: 'area-section',
          name: 'DeviceAreaSection',
          component: '/device/base-config/area-section/index',
          meta: { title: 'menus.device.areaSection', keepAlive: true }
        }
      ]
    },
    // 2.0. 设备设施规程管理
    {
      path: 'regulation',
      name: 'DeviceRegulation',
      component: '',
      meta: { title: 'menus.device.regulation' },
      children: [
        {
          path: 'group-template',
          name: 'DeviceGroupTemplate',
          component: '/device/regulation/group-template/index',
          meta: { title: 'menus.device.groupTemplate', keepAlive: true }
        },
        {
          path: 'factory-policy',
          name: 'DeviceFactoryPolicy',
          component: '/device/regulation/factory-policy/index',
          meta: { title: 'menus.device.factoryPolicy', keepAlive: true }
        }
      ]
    },
    // 3.0. 台账管理
    {
      path: 'ledger',
      name: 'DeviceLedger',
      component: '',
      meta: { title: 'menus.device.ledger' },
      children: [
        {
          path: 'logic-device',
          name: 'DeviceLogicDevice',
          component: '/device/ledger/logic-device/index',
          meta: { title: 'menus.device.logicDevice', keepAlive: true }
        },
        {
          path: 'comprehensive-query',
          name: 'DeviceComprehensiveQuery',
          component: '/device/ledger/comprehensive-query/index',
          meta: { title: 'menus.device.comprehensiveQuery', keepAlive: true }
        }
      ]
    },
    // 4.0. 设备展示分析
    {
      path: 'analysis',
      name: 'DeviceAnalysis',
      component: '',
      meta: { title: 'menus.device.analysis' },
      children: [
        {
          path: 'one-map',
          name: 'DeviceOneMap',
          component: '/device/analysis/one-map/index',
          meta: { title: 'menus.device.oneMap', keepAlive: true }
        },
        {
          path: 'intact-rate',
          name: 'DeviceIntactRate',
          component: '/device/analysis/intact-rate/index',
          meta: { title: 'menus.device.intactRate', keepAlive: true }
        },
        {
          path: 'operation-analysis',
          name: 'DeviceOperationAnalysis',
          component: '/device/analysis/operation-analysis/index',
          meta: { title: 'menus.device.operationAnalysis', keepAlive: true }
        },
        {
          path: 'defect-analysis',
          name: 'DeviceDefectAnalysis',
          component: '/device/analysis/defect-analysis/index',
          meta: { title: 'menus.device.defectAnalysis', keepAlive: true }
        },
        {
          path: 'online-rate',
          name: 'DeviceOnlineRate',
          component: '/device/analysis/online-rate/index',
          meta: { title: 'menus.device.onlineRate', keepAlive: true }
        },
        {
          path: 'remote-rate',
          name: 'DeviceRemoteRate',
          component: '/device/analysis/remote-rate/index',
          meta: { title: 'menus.device.remoteRate', keepAlive: true }
        }
      ]
    },
    // 5.0. 设备评估管理
    {
      path: 'evaluation',
      name: 'DeviceEvaluation',
      component: '',
      meta: { title: 'menus.device.evaluation' },
      children: [
        {
          path: 'status-evaluation',
          name: 'DeviceStatusEvaluation',
          component: '/device/evaluation/status-evaluation/index',
          meta: { title: 'menus.device.statusEvaluation', keepAlive: true }
        },
        {
          path: 'start-stop',
          name: 'DeviceStartStop',
          component: '/device/evaluation/start-stop/index',
          meta: { title: 'menus.device.startStop', keepAlive: true }
        },
        {
          path: 'classification',
          name: 'DeviceClassification',
          component: '/device/evaluation/classification/index',
          meta: { title: 'menus.device.classification', keepAlive: true }
        },
        {
          path: 'instrument-check',
          name: 'DeviceInstrumentCheck',
          component: '/device/evaluation/instrument-check/index',
          meta: { title: 'menus.device.instrumentCheck', keepAlive: true }
        }
      ]
    },
    // 6.0. 缺陷管理
    {
      path: 'defect',
      name: 'DeviceDefect',
      component: '',
      meta: { title: 'menus.device.defect' },
      children: [
        {
          path: 'statistics-report',
          name: 'DeviceDefectStatistics',
          component: '/device/defect/statistics-report/index',
          meta: { title: 'menus.device.defectStatistics', keepAlive: true }
        },
        {
          path: 'facility-defect',
          name: 'DeviceFacilityDefect',
          component: '/device/defect/facility-defect/index',
          meta: { title: 'menus.device.facilityDefect', keepAlive: true }
        },
        {
          path: 'pipeline-defect',
          name: 'DevicePipelineDefect',
          component: '/device/defect/pipeline-defect/index',
          meta: { title: 'menus.device.pipelineDefect', keepAlive: true }
        },
        {
          path: 'accident',
          name: 'DeviceAccident',
          component: '/device/defect/accident/index',
          meta: { title: 'menus.device.accident', keepAlive: true }
        }
      ]
    },
    // 7.0. 设备项目管理
    {
      path: 'project',
      name: 'DeviceProject',
      component: '',
      meta: { title: 'menus.device.project' },
      children: [
        {
          path: 'maintenance',
          name: 'DeviceProjectMaintenance',
          component: '/device/project/maintenance/index',
          meta: { title: 'menus.device.maintenance', keepAlive: true }
        },
        {
          path: 'annual-repair',
          name: 'DeviceProjectAnnualRepair',
          component: '/device/project/annual-repair/index',
          meta: { title: 'menus.device.annualRepair', keepAlive: true }
        },
        {
          path: 'overhaul',
          name: 'DeviceProjectOverhaul',
          component: '/device/project/overhaul/index',
          meta: { title: 'menus.device.overhaul', keepAlive: true }
        },
        {
          path: 'supplier',
          name: 'DeviceSupplier',
          component: '/device/project/supplier/index',
          meta: { title: 'menus.device.supplier', keepAlive: true }
        }
      ]
    },
    // 8.0. 实物资产管理
    {
      path: 'asset',
      name: 'DeviceAsset',
      component: '',
      meta: { title: 'menus.device.asset' },
      children: [
        {
          path: 'report',
          name: 'DeviceAssetReport',
          component: '/device/asset/report/index',
          meta: { title: 'menus.device.assetReport', keepAlive: true }
        },
        {
          path: 'card',
          name: 'DeviceAssetCard',
          component: '/device/asset/card/index',
          meta: { title: 'menus.device.assetCard', keepAlive: true }
        },
        {
          path: 'daily',
          name: 'DeviceAssetDaily',
          component: '/device/asset/daily/index',
          meta: { title: 'menus.device.assetDaily', keepAlive: true }
        },
        {
          path: 'inventory',
          name: 'DeviceAssetInventory',
          component: '/device/asset/inventory/index',
          meta: { title: 'menus.device.assetInventory', keepAlive: true }
        },
        {
          path: 'scrap',
          name: 'DeviceAssetScrap',
          component: '/device/asset/scrap/index',
          meta: { title: 'menus.device.assetScrap', keepAlive: true }
        }
      ]
    }
  ]
}
