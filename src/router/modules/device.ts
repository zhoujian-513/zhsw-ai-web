import { AppRouteRecord } from '@/types/router'

/**
 * 设备中心路由模块
 * 对应平台功能清单 - 1. 设备中心
 */
export const deviceRoutes: AppRouteRecord = {
  path: '/device',
  name: 'Device',
  component: () => import('@/views/device/index.vue'),
  meta: {
    title: '设备中心',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 1.0. 设备基础配置
    {
      path: 'base-config',
      name: 'DeviceBaseConfig',
      component: () => import('@/views/device/base-config/index.vue'),
      meta: {
        title: '设备基础配置',
        keepAlive: true
      },
      children: [
        {
          path: 'attribute-field',
          name: 'DeviceAttributeField',
          component: () => import('@/views/device/base-config/attribute-field.vue'),
          meta: { title: '属性字段管理' }
        },
        {
          path: 'business-type',
          name: 'DeviceBusinessType',
          component: () => import('@/views/device/base-config/business-type.vue'),
          meta: { title: '业态分类配置' }
        },
        {
          path: 'function-type',
          name: 'DeviceFunctionType',
          component: () => import('@/views/device/base-config/function-type.vue'),
          meta: { title: '功能分类配置' }
        },
        {
          path: 'process-section',
          name: 'DeviceProcessSection',
          component: () => import('@/views/device/base-config/process-section.vue'),
          meta: { title: '工艺段配置' }
        },
        {
          path: 'category-management',
          name: 'DeviceCategoryManagement',
          component: () => import('@/views/device/base-config/category-management.vue'),
          meta: { title: '设施/设备/部件类别管理' }
        },
        {
          path: 'area-code',
          name: 'DeviceAreaCode',
          component: () => import('@/views/device/base-config/area-code.vue'),
          meta: { title: '地区代码配置' }
        },
        {
          path: 'section-config',
          name: 'DeviceSectionConfig',
          component: () => import('@/views/device/base-config/section-config.vue'),
          meta: { title: '片区/区段配置' }
        }
      ]
    },
    // 8.0. 设备设施规程管理
    {
      path: 'regulation',
      name: 'DeviceRegulation',
      component: () => import('@/views/device/regulation/index.vue'),
      meta: {
        title: '设备设施规程管理',
        keepAlive: true
      },
      children: [
        {
          path: 'template',
          name: 'DeviceRegulationTemplate',
          component: () => import('@/views/device/regulation/template.vue'),
          meta: { title: '环保集团规程模板' }
        },
        {
          path: 'factory-policy',
          name: 'DeviceFactoryPolicy',
          component: () => import('@/views/device/regulation/factory-policy.vue'),
          meta: { title: '一厂一策规程' }
        }
      ]
    },
    // 10.0. 台账管理
    {
      path: 'ledger',
      name: 'DeviceLedger',
      component: () => import('@/views/device/ledger/index.vue'),
      meta: {
        title: '台账管理',
        keepAlive: true
      },
      children: [
        {
          path: 'entry',
          name: 'DeviceLedgerEntry',
          component: () => import('@/views/device/ledger/entry.vue'),
          meta: { title: '逻辑设备台账录入及展示' }
        },
        {
          path: 'query',
          name: 'DeviceLedgerQuery',
          component: () => import('@/views/device/ledger/query.vue'),
          meta: { title: '综合查询' }
        }
      ]
    },
    // 12.0. 设备展示分析
    {
      path: 'analysis',
      name: 'DeviceAnalysis',
      component: () => import('@/views/device/analysis/index.vue'),
      meta: {
        title: '设备展示分析',
        keepAlive: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'DeviceDashboard',
          component: () => import('@/views/device/analysis/dashboard.vue'),
          meta: { title: '设备一张图' }
        },
        {
          path: 'integrity-rate',
          name: 'DeviceIntegrityRate',
          component: () => import('@/views/device/analysis/integrity-rate.vue'),
          meta: { title: '设备完好率' }
        },
        {
          path: 'operation-analysis',
          name: 'DeviceOperationAnalysis',
          component: () => import('@/views/device/analysis/operation-analysis.vue'),
          meta: { title: '设备运行情况分析' }
        },
        {
          path: 'defect-analysis',
          name: 'DeviceDefectAnalysis',
          component: () => import('@/views/device/analysis/defect-analysis.vue'),
          meta: { title: '设备缺陷分析' }
        },
        {
          path: 'online-rate',
          name: 'DeviceOnlineRate',
          component: () => import('@/views/device/analysis/online-rate.vue'),
          meta: { title: '设备在线率' }
        },
        {
          path: 'remote-rate',
          name: 'DeviceRemoteRate',
          component: () => import('@/views/device/analysis/remote-rate.vue'),
          meta: { title: '设备远控率' }
        }
      ]
    },
    // 18.0. 设备评估管理
    {
      path: 'evaluation',
      name: 'DeviceEvaluation',
      component: () => import('@/views/device/evaluation/index.vue'),
      meta: {
        title: '设备评估管理',
        keepAlive: true
      },
      children: [
        {
          path: 'status-analysis',
          name: 'DeviceStatusAnalysis',
          component: () => import('@/views/device/evaluation/status-analysis.vue'),
          meta: { title: '设备状态评估分析' }
        },
        {
          path: 'start-stop',
          name: 'DeviceStartStop',
          component: () => import('@/views/device/evaluation/start-stop.vue'),
          meta: { title: '启停用管理' }
        },
        {
          path: 'classification',
          name: 'DeviceClassification',
          component: () => import('@/views/device/evaluation/classification.vue'),
          meta: { title: '设备分级分类' }
        },
        {
          path: 'instrument-calibration',
          name: 'DeviceInstrumentCalibration',
          component: () => import('@/views/device/evaluation/instrument-calibration.vue'),
          meta: { title: '设备仪表校验管理' }
        }
      ]
    },
    // 22.0. 缺陷管理
    {
      path: 'defect',
      name: 'DeviceDefect',
      component: () => import('@/views/device/defect/index.vue'),
      meta: {
        title: '缺陷管理',
        keepAlive: true
      },
      children: [
        {
          path: 'report',
          name: 'DeviceDefectReport',
          component: () => import('@/views/device/defect/report.vue'),
          meta: { title: '缺陷统计报表' }
        },
        {
          path: 'facility-management',
          name: 'DeviceDefectFacilityManagement',
          component: () => import('@/views/device/defect/facility-management.vue'),
          meta: { title: '设备设施缺陷管理' }
        },
        {
          path: 'pipeline-management',
          name: 'DeviceDefectPipelineManagement',
          component: () => import('@/views/device/defect/pipeline-management.vue'),
          meta: { title: '管线缺陷管理' }
        },
        {
          path: 'accident',
          name: 'DeviceDefectAccident',
          component: () => import('@/views/device/defect/accident.vue'),
          meta: { title: '设备事故管理' }
        }
      ]
    },
    // 26.0. 设备项目管理
    {
      path: 'project',
      name: 'DeviceProject',
      component: () => import('@/views/device/project/index.vue'),
      meta: {
        title: '设备项目管理',
        keepAlive: true
      },
      children: [
        {
          path: 'maintenance',
          name: 'DeviceProjectMaintenance',
          component: () => import('@/views/device/project/maintenance.vue'),
          meta: { title: '维护保养管理' }
        },
        {
          path: 'annual-repair',
          name: 'DeviceProjectAnnualRepair',
          component: () => import('@/views/device/project/annual-repair.vue'),
          meta: { title: '年度中小修管理' }
        },
        {
          path: 'major-repair',
          name: 'DeviceProjectMajorRepair',
          component: () => import('@/views/device/project/major-repair.vue'),
          meta: { title: '大修、重置及技改管理' }
        },
        {
          path: 'supplier',
          name: 'DeviceProjectSupplier',
          component: () => import('@/views/device/project/supplier.vue'),
          meta: { title: '检维修供应商管理' }
        }
      ]
    },
    // 30.0. 实物资产管理
    {
      path: 'asset',
      name: 'DeviceAsset',
      component: () => import('@/views/device/asset/index.vue'),
      meta: {
        title: '实物资产管理',
        keepAlive: true
      },
      children: [
        {
          path: 'report',
          name: 'DeviceAssetReport',
          component: () => import('@/views/device/asset/report.vue'),
          meta: { title: '实物资产报表功能' }
        },
        {
          path: 'card',
          name: 'DeviceAssetCard',
          component: () => import('@/views/device/asset/card.vue'),
          meta: { title: '实物资产建卡建档' }
        },
        {
          path: 'daily-maintenance',
          name: 'DeviceAssetDailyMaintenance',
          component: () => import('@/views/device/asset/daily-maintenance.vue'),
          meta: { title: '实物资产日常维护' }
        },
        {
          path: 'inventory',
          name: 'DeviceAssetInventory',
          component: () => import('@/views/device/asset/inventory.vue'),
          meta: { title: '实物资产清查管理' }
        },
        {
          path: 'scrap',
          name: 'DeviceAssetScrap',
          component: () => import('@/views/device/asset/scrap.vue'),
          meta: { title: '实物资产报废管理' }
        }
      ]
    }
  ]
}
