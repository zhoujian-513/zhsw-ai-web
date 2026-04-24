import type { AppRouteRecord } from '@/types/router'

export const monitorRoutes: AppRouteRecord = {
  path: '/monitor',
  name: 'Monitor',
  component: '',
  meta: {
    title: 'menus.monitor.title',
    icon: '&#xe638;',
    isFirstLevel: true
  },
  children: [
    // 1.0. 视频监控
    {
      path: 'video',
      name: 'MonitorVideo',
      component: '',
      meta: { title: 'menus.monitor.video' },
      children: [
        {
          path: 'realtime',
          name: 'MonitorVideoRealtime',
          component: '/monitor/video/realtime/index',
          meta: { title: 'menus.monitor.videoRealtime', keepAlive: true }
        },
        {
          path: 'ai-analysis',
          name: 'MonitorVideoAiAnalysis',
          component: '/monitor/video/ai-analysis/index',
          meta: { title: 'menus.monitor.videoAiAnalysis', keepAlive: true }
        }
      ]
    },
    // 2.0. 综合展示
    {
      path: 'display',
      name: 'MonitorDisplay',
      component: '',
      meta: { title: 'menus.monitor.display' },
      children: [
        {
          path: 'daily-water',
          name: 'MonitorDailyWater',
          component: '/monitor/display/daily-water/index',
          meta: { title: 'menus.monitor.dailyWater', keepAlive: true }
        },
        {
          path: 'instant-water',
          name: 'MonitorInstantWater',
          component: '/monitor/display/instant-water/index',
          meta: { title: 'menus.monitor.instantWater', keepAlive: true }
        },
        {
          path: 'instrument-online',
          name: 'MonitorInstrumentOnline',
          component: '/monitor/display/instrument-online/index',
          meta: { title: 'menus.monitor.instrumentOnline', keepAlive: true }
        }
      ]
    },
    // 3.0. 预警管理
    {
      path: 'alarm',
      name: 'MonitorAlarm',
      component: '',
      meta: { title: 'menus.monitor.alarm' },
      children: [
        {
          path: 'station-warning',
          name: 'MonitorStationWarning',
          component: '/monitor/alarm/station-warning/index',
          meta: { title: 'menus.monitor.stationWarning', keepAlive: true }
        },
        {
          path: 'pipeline-warning',
          name: 'MonitorPipelineWarning',
          component: '/monitor/alarm/pipeline-warning/index',
          meta: { title: 'menus.monitor.pipelineWarning', keepAlive: true }
        }
      ]
    },
    // 4.0. 仪表监测管理
    {
      path: 'instrument',
      name: 'MonitorInstrument',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.monitor.instrument', keepAlive: true, isFirstLevel: true },
      children: [
        {
          path: '',
          name: 'MonitorInstrumentPage',
          component: () => import('@/views/monitor/instrument/index.vue'),
          meta: { title: 'menus.monitor.instrument', keepAlive: true, isHide: true }
        }
      ]
    },
    // 5.0. 设备运行参数管理
    {
      path: 'operation-params',
      name: 'MonitorOperationParams',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.monitor.operationParams', keepAlive: true, isFirstLevel: true },
      children: [
        {
          path: '',
          name: 'MonitorOperationParamsPage',
          component: () => import('@/views/monitor/operation-params/index.vue'),
          meta: { title: 'menus.monitor.operationParams', keepAlive: true, isHide: true }
        }
      ]
    },
    // 6.0. 水质异常闭环管理
    {
      path: 'abnormal-loop',
      name: 'MonitorAbnormalLoop',
      component: '',
      meta: { title: 'menus.monitor.abnormalLoop' },
      children: [
        {
          path: 'station-loop',
          name: 'MonitorStationLoop',
          component: '/monitor/abnormal-loop/station-loop/index',
          meta: { title: 'menus.monitor.stationLoop', keepAlive: true }
        },
        {
          path: 'pipeline-loop',
          name: 'MonitorPipelineLoop',
          component: '/monitor/abnormal-loop/pipeline-loop/index',
          meta: { title: 'menus.monitor.pipelineLoop', keepAlive: true }
        }
      ]
    },
    // 7.0. 第三方检测管理
    {
      path: 'third-party',
      name: 'MonitorThirdParty',
      component: '',
      meta: { title: 'menus.monitor.thirdParty' },
      children: [
        {
          path: 'test-plan',
          name: 'MonitorTestPlan',
          component: '/monitor/third-party/test-plan/index',
          meta: { title: 'menus.monitor.testPlan', keepAlive: true }
        },
        {
          path: 'process-standard',
          name: 'MonitorProcessStandard',
          component: '/monitor/third-party/process-standard/index',
          meta: { title: 'menus.monitor.processStandard', keepAlive: true }
        },
        {
          path: 'test-result',
          name: 'MonitorTestResult',
          component: '/monitor/third-party/test-result/index',
          meta: { title: 'menus.monitor.testResult', keepAlive: true }
        }
      ]
    },
    // 8.0. 监测数据分析
    {
      path: 'data-analysis',
      name: 'MonitorDataAnalysis',
      component: '',
      meta: { title: 'menus.monitor.dataAnalysis' },
      children: [
        {
          path: 'inout-analysis',
          name: 'MonitorInoutAnalysis',
          component: '/monitor/data-analysis/inout-analysis/index',
          meta: { title: 'menus.monitor.inoutAnalysis', keepAlive: true }
        },
        {
          path: 'alarm-analysis',
          name: 'MonitorAlarmAnalysis',
          component: '/monitor/data-analysis/alarm-analysis/index',
          meta: { title: 'menus.monitor.alarmAnalysis', keepAlive: true }
        }
      ]
    },
    // 9.0. 基础配置
    {
      path: 'base-config',
      name: 'MonitorBaseConfig',
      component: '',
      meta: { title: 'menus.monitor.baseConfig' },
      children: [
        {
          path: 'data-access',
          name: 'MonitorDataAccess',
          component: '/monitor/base-config/data-access/index',
          meta: { title: 'menus.monitor.dataAccess', keepAlive: true }
        },
        {
          path: 'data-process',
          name: 'MonitorDataProcess',
          component: '/monitor/base-config/data-process/index',
          meta: { title: 'menus.monitor.dataProcess', keepAlive: true }
        }
      ]
    },
    // 监测一张图
    {
      path: 'map',
      name: 'MonitorMap',
      component: () => import('@/views/index/index.vue'),
      meta: { title: 'menus.monitor.map', keepAlive: true, isFirstLevel: true },
      children: [
        {
          path: '',
          name: 'MonitorMapPage',
          component: () => import('@/views/monitor/map/index.vue'),
          meta: { title: 'menus.monitor.map', keepAlive: true, isHide: true }
        }
      ]
    }
  ]
}
