<template>
  <div class="dashboard-group">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="header-main">
        <div class="header-title">
          <h1>集团运营看板</h1>
          <p class="subtitle">实时汇聚各租户核心运营数据</p>
        </div>
        <div class="header-meta">
          <span class="update-time">更新于 {{ currentTime }}</span>
          <ElTag type="info" effect="plain" class="view-tag">
            <i class="iconfont-sys">&#xe6a0;</i>
            集团视角
          </ElTag>
        </div>
      </div>
    </header>

    <!-- 核心指标卡片 -->
    <section class="metrics-section">
      <div class="metrics-grid">
        <div
          v-for="(item, index) in statCards"
          :key="item.label"
          class="metric-card"
          :class="[`metric-card-${index + 1}`]"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="metric-icon">
            <i class="iconfont-sys" v-html="item.icon" />
          </div>
          <div class="metric-content">
            <div class="metric-value">{{ item.value }}</div>
            <div class="metric-label">{{ item.label }}</div>
            <div v-if="item.trend" class="metric-trend" :class="item.trendType">
              <i class="iconfont-sys">{{ item.trendType === 'up' ? '&#xe7b1;' : '&#xe7b2;' }}</i>
              {{ item.trend }}
            </div>
          </div>
          <div class="metric-chart">
            <div class="sparkline" :style="getSparklineStyle(item.sparklineData)"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧：图表区 -->
      <div class="charts-section">
        <!-- 供水量趋势 -->
        <div class="chart-card">
          <div class="card-header">
            <h3>供水量趋势</h3>
            <div class="header-actions">
              <ElRadioGroup v-model="waterTimeRange" size="small">
                <ElRadioButton label="week">本周</ElRadioButton>
                <ElRadioButton label="month">本月</ElRadioButton>
                <ElRadioButton label="year">全年</ElRadioButton>
              </ElRadioGroup>
            </div>
          </div>
          <div ref="waterChartRef" class="chart-container"></div>
        </div>

        <!-- 设备状态分布 -->
        <div class="chart-row">
          <div class="chart-card half">
            <div class="card-header">
              <h3>设备状态分布</h3>
            </div>
            <div ref="deviceChartRef" class="chart-container"></div>
          </div>
          <div class="chart-card half">
            <div class="card-header">
              <h3>告警类型占比</h3>
            </div>
            <div ref="alarmChartRef" class="chart-container"></div>
          </div>
        </div>
      </div>

      <!-- 右侧：租户列表 -->
      <aside class="sidebar-section">
        <div class="sidebar-card">
          <div class="card-header">
            <h3>各租户运营概况</h3>
            <ElButton type="primary" link size="small">
              查看全部
              <i class="iconfont-sys">&#xe7a8;</i>
            </ElButton>
          </div>
          <div class="tenant-list">
            <div
              v-for="(tenant, index) in tenantSummary"
              :key="tenant.name"
              class="tenant-item"
              :class="{ 'has-warning': tenant.alarmCount > 5 || tenant.status === '预警' }"
            >
              <div class="tenant-header">
                <div class="tenant-info">
                  <span class="tenant-rank">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="tenant-name">{{ tenant.name }}</span>
                </div>
                <ElTag :type="tenant.status === '正常' ? 'success' : 'warning'" size="small">
                  {{ tenant.status }}
                </ElTag>
              </div>
              <div class="tenant-stats">
                <div class="stat-item">
                  <span class="stat-num">{{ tenant.deviceCount.toLocaleString() }}</span>
                  <span class="stat-label">设备</span>
                </div>
                <div class="stat-item">
                  <div class="progress-wrap">
                    <ElProgress
                      :percentage="tenant.onlineRate"
                      :stroke-width="6"
                      :show-text="false"
                      :color="tenant.onlineRate > 95 ? '#10b981' : tenant.onlineRate > 90 ? '#f59e0b' : '#ef4444'"
                    />
                    <span class="progress-text">{{ tenant.onlineRate }}%</span>
                  </div>
                  <span class="stat-label">在线率</span>
                </div>
                <div class="stat-item">
                  <span class="stat-num" :class="{ 'text-danger': tenant.alarmCount > 5 }">
                    {{ tenant.alarmCount }}
                  </span>
                  <span class="stat-label">告警</span>
                </div>
                <div class="stat-item">
                  <span class="stat-num">{{ (tenant.waterSupply / 1000).toFixed(1) }}k</span>
                  <span class="stat-label">日供水(吨)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 快速操作 -->
        <div class="sidebar-card actions-card">
          <div class="card-header">
            <h3>快速操作</h3>
          </div>
          <div class="quick-actions">
            <button v-for="action in quickActions" :key="action.label" class="action-btn">
              <i class="iconfont-sys" v-html="action.icon"></i>
              <span>{{ action.label }}</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTenantStore } from '@/store/modules/tenant'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'

defineOptions({ name: 'DashboardGroup' })

const tenantStore = useTenantStore()
const { isGroupView } = storeToRefs(tenantStore)

// 当前时间
const currentTime = ref('')
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
updateTime()
const timeInterval = setInterval(updateTime, 60000)

onUnmounted(() => {
  clearInterval(timeInterval)
})

// 核心指标数据
const statCards = [
  {
    label: '设备总数',
    value: '12,486',
    icon: '&#xe6a0;',
    trend: '+3.2%',
    trendType: 'up',
    sparklineData: [30, 45, 35, 50, 48, 60, 55, 70, 65, 80, 75, 90]
  },
  {
    label: '今日告警',
    value: '23',
    icon: '&#xe6b5;',
    trend: '-12%',
    trendType: 'down',
    sparklineData: [80, 70, 60, 75, 65, 55, 45, 50, 40, 35, 30, 25]
  },
  {
    label: '日供水量',
    value: '458,320',
    unit: '吨',
    icon: '&#xe8a1;',
    trend: '+5.8%',
    trendType: 'up',
    sparklineData: [40, 50, 45, 60, 55, 70, 65, 80, 75, 85, 80, 95]
  },
  {
    label: '管网覆盖',
    value: '3,264',
    unit: 'km',
    icon: '&#xe7a8;',
    trend: '+1.5%',
    trendType: 'up',
    sparklineData: [50, 52, 55, 53, 58, 60, 62, 65, 68, 70, 72, 75]
  }
]

// 生成 sparkline 背景
const getSparklineStyle = (data: number[]) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((v - min) / range) * 80 - 10
    return `${x}% ${y}%`
  }).join(', ')

  return {
    background: `linear-gradient(135deg, var(--w-primary-100) 0%, var(--w-primary-50) 100%)`,
    clipPath: `polygon(0% 100%, ${points}, 100% 100%)`
  }
}

// 租户数据
const tenantSummary = [
  { name: '广州水务公司', deviceCount: 3842, onlineRate: 96, alarmCount: 8, waterSupply: 152400, status: '正常' },
  { name: '深圳水务公司', deviceCount: 4120, onlineRate: 98, alarmCount: 3, waterSupply: 168900, status: '正常' },
  { name: '东莞水务公司', deviceCount: 2654, onlineRate: 94, alarmCount: 7, waterSupply: 89600, status: '正常' },
  { name: '佛山水务公司', deviceCount: 1870, onlineRate: 91, alarmCount: 5, waterSupply: 47420, status: '预警' },
]

// 快速操作
const quickActions = [
  { label: '导出报表', icon: '&#xe7b3;' },
  { label: '设备管理', icon: '&#xe6a0;' },
  { label: '告警中心', icon: '&#xe6b5;' },
  { label: '系统设置', icon: '&#xe6b8;' }
]

// 图表相关
const waterTimeRange = ref('week')
const waterChartRef = ref<HTMLElement>()
const deviceChartRef = ref<HTMLElement>()
const alarmChartRef = ref<HTMLElement>()

let waterChart: echarts.ECharts | null = null
let deviceChart: echarts.ECharts | null = null
let alarmChart: echarts.ECharts | null = null

// 初始化图表
onMounted(() => {
  initWaterChart()
  initDeviceChart()
  initAlarmChart()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  waterChart?.dispose()
  deviceChart?.dispose()
  alarmChart?.dispose()
})

const handleResize = () => {
  waterChart?.resize()
  deviceChart?.resize()
  alarmChart?.resize()
}

// 供水量趋势图
const initWaterChart = () => {
  if (!waterChartRef.value) return

  waterChart = echarts.init(waterChartRef.value)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#374151' },
      formatter: (params: any) => {
        const data = params[0]
        return `<div style="font-weight:600">${data.name}</div>
                <div style="color:#6b7280">供水量: <span style="color:#0ea5e9;font-weight:600">${data.value.toLocaleString()}</span> 吨</div>`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#6b7280' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280', formatter: (v: number) => `${(v / 1000).toFixed(0)}k` },
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [{
      name: '供水量',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: '#0ea5e9',
        width: 3
      },
      itemStyle: {
        color: '#0ea5e9',
        borderWidth: 2,
        borderColor: '#fff'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(14, 165, 233, 0.3)' },
          { offset: 1, color: 'rgba(14, 165, 233, 0.05)' }
        ])
      },
      data: [420000, 445000, 438000, 462000, 458000, 412000, 389000]
    }]
  }
  waterChart.setOption(option)
}

// 设备状态分布图
const initDeviceChart = () => {
  if (!deviceChartRef.value) return

  deviceChart = echarts.init(deviceChartRef.value)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#374151' }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { color: '#6b7280', fontSize: 12 }
    },
    series: [{
      name: '设备状态',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 11985, name: '在线', itemStyle: { color: '#10b981' } },
        { value: 312, name: '离线', itemStyle: { color: '#f59e0b' } },
        { value: 189, name: '故障', itemStyle: { color: '#ef4444' } }
      ]
    }]
  }
  deviceChart.setOption(option)
}

// 告警类型占比图
const initAlarmChart = () => {
  if (!alarmChartRef.value) return

  alarmChart = echarts.init(alarmChartRef.value)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#374151' }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { color: '#6b7280', fontSize: 12 }
    },
    series: [{
      name: '告警类型',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      data: [
        { value: 8, name: '压力异常', itemStyle: { color: '#f59e0b' } },
        { value: 6, name: '流量超限', itemStyle: { color: '#ef4444' } },
        { value: 5, name: '设备离线', itemStyle: { color: '#6b7280' } },
        { value: 4, name: '水质异常', itemStyle: { color: '#8b5cf6' } }
      ]
    }]
  }
  alarmChart.setOption(option)
}
</script>

<style scoped lang="scss">
// 设计令牌
:root {
  --w-primary-50: #f0f9ff;
  --w-primary-100: #e0f2fe;
  --w-primary-500: #0ea5e9;
  --w-primary-600: #0284c7;
  --w-primary-700: #0369a1;
  --w-primary-800: #075985;
  --w-primary-900: #0c4a6e;

  --w-gray-50: #f9fafb;
  --w-gray-100: #f3f4f6;
  --w-gray-200: #e5e7eb;
  --w-gray-300: #d1d5db;
  --w-gray-400: #9ca3af;
  --w-gray-500: #6b7280;
  --w-gray-600: #4b5563;
  --w-gray-700: #374151;
  --w-gray-800: #1f2937;
  --w-gray-900: #111827;

  --w-success: #10b981;
  --w-warning: #f59e0b;
  --w-danger: #ef4444;

  --w-radius-sm: 6px;
  --w-radius-md: 8px;
  --w-radius-lg: 12px;
  --w-radius-xl: 16px;

  --w-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --w-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
  --w-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

.dashboard-group {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

// 页面头部
.page-header {
  margin-bottom: 24px;

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .header-title {
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: var(--w-gray-900);
      margin: 0 0 6px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 14px;
      color: var(--w-gray-500);
      margin: 0;
    }
  }

  .header-meta {
    display: flex;
    align-items: center;
    gap: 12px;

    .update-time {
      font-size: 13px;
      color: var(--w-gray-400);
    }

    .view-tag {
      :deep(.el-tag__content) {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      i {
        font-size: 14px;
      }
    }
  }
}

// 核心指标区
.metrics-section {
  margin-bottom: 24px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.metric-card {
  background: white;
  border-radius: var(--w-radius-lg);
  padding: 20px;
  box-shadow: var(--w-shadow-sm);
  border: 1px solid var(--w-gray-100);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  overflow: hidden;
  animation: cardSlideIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);

  @keyframes cardSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--w-primary-500);
  }

  &-1::before { background: #0ea5e9; }
  &-2::before { background: #f59e0b; }
  &-3::before { background: #10b981; }
  &-4::before { background: #8b5cf6; }
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--w-radius-md);
  background: var(--w-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 24px;
    color: var(--w-gray-600);
  }
}

.metric-content {
  flex: 1;
  min-width: 0;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--w-gray-900);
  line-height: 1.2;
  margin-bottom: 4px;
  font-family: 'JetBrains Mono', monospace;
}

.metric-label {
  font-size: 13px;
  color: var(--w-gray-500);
  margin-bottom: 8px;
}

.metric-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;

  i {
    font-size: 10px;
  }

  &.up {
    color: var(--w-success);
    background: rgba(16, 185, 129, 0.1);
  }

  &.down {
    color: var(--w-danger);
    background: rgba(239, 68, 68, 0.1);
  }
}

.metric-chart {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 80px;
  height: 40px;
  opacity: 0.3;

  .sparkline {
    width: 100%;
    height: 100%;
  }
}

// 主内容区
.main-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
}

// 图表区
.charts-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-card {
  background: white;
  border-radius: var(--w-radius-lg);
  padding: 20px;
  box-shadow: var(--w-shadow-sm);
  border: 1px solid var(--w-gray-100);

  &.half {
    flex: 1;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--w-gray-800);
      margin: 0;
    }
  }

  .chart-container {
    height: 280px;
  }
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

// 侧边栏
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-card {
  background: white;
  border-radius: var(--w-radius-lg);
  padding: 20px;
  box-shadow: var(--w-shadow-sm);
  border: 1px solid var(--w-gray-100);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--w-gray-800);
      margin: 0;
    }
  }
}

// 租户列表
.tenant-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tenant-item {
  padding: 16px;
  border-radius: var(--w-radius-md);
  background: var(--w-gray-50);
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    border-color: var(--w-gray-200);
    box-shadow: var(--w-shadow-sm);
  }

  &.has-warning {
    background: rgba(245, 158, 11, 0.05);
    border-color: rgba(245, 158, 11, 0.2);

    &:hover {
      background: rgba(245, 158, 11, 0.08);
    }
  }
}

.tenant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tenant-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tenant-rank {
  font-size: 12px;
  font-weight: 600;
  color: var(--w-gray-400);
  font-family: 'JetBrains Mono', monospace;
}

.tenant-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--w-gray-800);
}

.tenant-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .stat-num {
    font-size: 14px;
    font-weight: 600;
    color: var(--w-gray-700);
    margin-bottom: 2px;
    font-family: 'JetBrains Mono', monospace;

    &.text-danger {
      color: var(--w-danger);
    }
  }

  .stat-label {
    font-size: 11px;
    color: var(--w-gray-400);
  }
}

.progress-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;

  :deep(.el-progress) {
    flex: 1;
  }

  .progress-text {
    font-size: 11px;
    color: var(--w-gray-500);
    font-family: 'JetBrains Mono', monospace;
  }
}

// 快速操作
.actions-card {
  .quick-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 12px;
    border: 1px solid var(--w-gray-200);
    border-radius: var(--w-radius-md);
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--w-primary-500);
      background: var(--w-primary-50);

      i {
        color: var(--w-primary-600);
      }
    }

    i {
      font-size: 24px;
      color: var(--w-gray-500);
      transition: color 0.2s ease;
    }

    span {
      font-size: 13px;
      color: var(--w-gray-600);
    }
  }
}

// 响应式
@media (max-width: 1280px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .sidebar-section {
    flex-direction: row;

    .sidebar-card {
      flex: 1;
    }
  }
}

@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .chart-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-group {
    padding: 16px;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .header-main {
    flex-direction: column;
    gap: 12px;
  }

  .sidebar-section {
    flex-direction: column;
  }
}
</style>
