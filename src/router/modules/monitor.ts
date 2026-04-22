import { AppRouteRecord } from '@/types/router'

/**
 * 监测中心路由模块
 * 对应平台功能清单 - 35. 监测中心
 */
export const monitorRoutes: AppRouteRecord = {
  path: '/monitor',
  name: 'Monitor',
  component: () => import('@/views/monitor/index.vue'),
  meta: {
    title: '监测中心',
    icon: '&#xe81a;',
    keepAlive: true
  },
  children: [
    // 35.0. 视频监控
    {
      path: 'video',
      name: 'MonitorVideo',
      component: () => import('@/views/monitor/video/index.vue'),
      meta: {
        title: '视频监控',
        keepAlive: true
      },
      children: [
        {
          path: 'realtime',
          name: 'MonitorVideoRealtime',
          component: () => import('@/views/monitor/video/realtime.vue'),
          meta: { title: '实时（历史）视频' }
        },
        {
          path: 'ai-analysis',
          name: 'MonitorVideoAiAnalysis',
          component: () => import('@/views/monitor/video/ai-analysis.vue'),
          meta: { title: 'AI分析' }
        }
      ]
    },
    // 37.0. 综合展示
    {
      path: 'display',
      name: 'MonitorDisplay',
      component: () => import('@/views/monitor/display/index.vue'),
      meta: {
        title: '综合展示',
        keepAlive: true
      },
      children: [
        {
          path: 'daily-water',
          name: 'MonitorDisplayDailyWater',
          component: () => import('@/views/monitor/display/daily-water.vue'),
          meta: { title: '水质日均值' }
        },
        {
          path: 'instant-water',
          name: 'MonitorDisplayInstantWater',
          component: () => import('@/views/monitor/display/instant-water.vue'),
          meta: { title: '水质瞬时值' }
        },
        {
          path: 'instrument-online',
          name: 'MonitorDisplayInstrumentOnline',
          component: () => import('@/views/monitor/display/instrument-online.vue'),
          meta: { title: '在线仪表在线率' }
        }
      ]
    },
    // 40.0. 预警管理
    {
      path: 'warning',
      name: 'MonitorWarning',
      component: () => import('@/views/monitor/warning/index.vue'),
      meta: {
        title: '预警管理',
        keepAlive: true
      },
      children: [
        {
          path: 'station-warning',
          name: 'MonitorWarningStation',
          component: () => import('@/views/monitor/warning/station-warning.vue'),
          meta: { title: '厂站水质水量预警管理' }
        },
        {
          path: 'pipeline-warning',
          name: 'MonitorWarningPipeline',
          component: () => import('@/views/monitor/warning/pipeline-warning.vue'),
          meta: { title: '管网来水预警' }
        }
      ]
    },
    // 42.0. 仪表监测管理
    {
      path: 'instrument',
      name: 'MonitorInstrument',
      component: () => import('@/views/monitor/instrument/index.vue'),
      meta: {
        title: '仪表监测管理',
        keepAlive: true
      },
      children: [
        {
          path: 'management',
          name: 'MonitorInstrumentManagement',
          component: () => import('@/views/monitor/instrument/management.vue'),
          meta: { title: '所有仪表的管理' }
        }
      ]
    },
    // 43.0. 设备运行参数管理
    {
      path: 'operation-params',
      name: 'MonitorOperationParams',
      component: () => import('@/views/monitor/operation-params/index.vue'),
      meta: {
        title: '设备运行参数管理',
        keepAlive: true
      },
      children: [
        {
          path: 'params',
          name: 'MonitorOperationParamsParams',
          component: () => import('@/views/monitor/operation-params/params.vue'),
          meta: { title: '机器设备的运行参数' }
        }
      ]
    },
    // 44.0. 水质异常闭环管理
    {
      path: 'abnormal-closed-loop',
      name: 'MonitorAbnormalClosedLoop',
      component: () => import('@/views/monitor/abnormal-closed-loop/index.vue'),
      meta: {
        title: '水质异常闭环管理',
        keepAlive: true
      },
      children: [
        {
          path: 'station-closed-loop',
          name: 'MonitorAbnormalClosedLoopStation',
          component: () => import('@/views/monitor/abnormal-closed-loop/station-closed-loop.vue'),
          meta: { title: '厂站水质水量预警闭环管理' }
        },
        {
          path: 'pipeline-closed-loop',
          name: 'MonitorAbnormalClosedLoopPipeline',
          component: () => import('@/views/monitor/abnormal-closed-loop/pipeline-closed-loop.vue'),
          meta: { title: '管网来水预警闭环' }
        }
      ]
    },
    // 46.0. 第三方检测管理
    {
      path: 'third-party',
      name: 'MonitorThirdParty',
      component: () => import('@/views/monitor/third-party/index.vue'),
      meta: {
        title: '第三方检测管理',
        keepAlive: true
      },
      children: [
        {
          path: 'plan',
          name: 'MonitorThirdPartyPlan',
          component: () => import('@/views/monitor/third-party/plan.vue'),
          meta: { title: '检测计划' }
        },
        {
          path: 'standardization',
          name: 'MonitorThirdPartyStandardization',
          component: () => import('@/views/monitor/third-party/standardization.vue'),
          meta: { title: '过程标准化管理' }
        },
        {
          path: 'result',
          name: 'MonitorThirdPartyResult',
          component: () => import('@/views/monitor/third-party/result.vue'),
          meta: { title: '检测结果' }
        }
      ]
    },
    // 49.0. 监测数据分析
    {
      path: 'data-analysis',
      name: 'MonitorDataAnalysis',
      component: () => import('@/views/monitor/data-analysis/index.vue'),
      meta: {
        title: '监测数据分析',
        keepAlive: true
      },
      children: [
        {
          path: 'in-out-analysis',
          name: 'MonitorDataAnalysisInOut',
          component: () => import('@/views/monitor/data-analysis/in-out-analysis.vue'),
          meta: { title: '进出水数据分析' }
        },
        {
          path: 'warning-analysis',
          name: 'MonitorDataAnalysisWarning',
          component: () => import('@/views/monitor/data-analysis/warning-analysis.vue'),
          meta: { title: '预警数据分析' }
        }
      ]
    },
    // 51.0. 基础配置
    {
      path: 'base-config',
      name: 'MonitorBaseConfig',
      component: () => import('@/views/monitor/base-config/index.vue'),
      meta: {
        title: '基础配置',
        keepAlive: true
      },
      children: [
        {
          path: 'data-access',
          name: 'MonitorBaseConfigDataAccess',
          component: () => import('@/views/monitor/base-config/data-access.vue'),
          meta: { title: '数据接入（监测点管理）' }
        },
        {
          path: 'data-process',
          name: 'MonitorBaseConfigDataProcess',
          component: () => import('@/views/monitor/base-config/data-process.vue'),
          meta: { title: '数据处理' }
        }
      ]
    }
  ]
}
