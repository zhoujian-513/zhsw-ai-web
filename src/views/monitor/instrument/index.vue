<template>
  <div class="instrument-monitor-page">
    <!-- 左侧边栏切换按钮 -->
    <div :class="['sidebar-toggle', { collapsed: !isSidebarVisible }]" @click="toggleSidebar">
      <el-icon v-if="isSidebarVisible"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </div>

    <!-- 左侧边栏 -->
    <div v-show="isSidebarVisible" class="left-sidebar">
      <!-- 标签页 -->
      <div class="sidebar-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </div>
      </div>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <el-cascader
          v-model="filterForm.business"
          :options="businessOptions"
          :props="{ expandTrigger: 'hover', value: 'value', label: 'label', children: 'children' }"
          placeholder="选择业务/功能"
          class="filter-select"
          clearable
        />
        <el-select v-model="filterForm.deviceType" placeholder="选择设备类型" class="filter-select">
          <el-option label="全部类型" value="" />
          <el-option label="流量计" value="flowmeter" />
          <el-option label="水质仪" value="waterQuality" />
        </el-select>
        <el-input
          v-model="filterForm.search"
          placeholder="按设备名称搜索"
          class="filter-search"
          :prefix-icon="Search"
        />
      </div>

      <!-- 树操作按钮 -->
      <div class="tree-actions">
        <el-radio-group v-model="treeExpandState" size="small" @change="handleTreeExpandChange">
          <el-radio-button label="expand">全部展开</el-radio-button>
          <el-radio-button label="collapse">全部折叠</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 树形菜单 -->
      <div class="tree-section">
        <el-tree
          ref="treeRef"
          :data="filteredTreeData"
          :props="treeProps"
          node-key="id"
          default-expand-all
          highlight-current
          show-checkbox
          :check-strictly="false"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span class="tree-node" @mouseenter="data.isHover = true" @mouseleave="data.isHover = false">
              <el-icon v-if="data.type === 'company'"><OfficeBuilding /></el-icon>
              <el-icon v-else-if="data.type === 'project'"><Folder /></el-icon>
              <el-icon v-else-if="data.type === 'station'"><HomeFilled /></el-icon>
              <el-icon v-else-if="data.type === 'device'"><Odometer /></el-icon>
              <span class="node-label">{{ node.label }}</span>
              <!-- 全部状态下：未收藏设备hover显示收藏图标 -->
              <el-icon
                v-if="data.type === 'device' && activeTab === 'all' && data.isHover && !data.isFavorite"
                class="favorite-action-icon"
                @click.stop="toggleFavorite(data)"
              >
                <Star />
              </el-icon>
              <!-- 全部状态下：已收藏设备hover显示取消收藏图标 -->
              <el-icon
                v-if="data.type === 'device' && activeTab === 'all' && data.isHover && data.isFavorite"
                class="unfavorite-action-icon"
                @click.stop="toggleFavorite(data)"
              >
                <StarFilled />
              </el-icon>
              <!-- 已收藏列表状态下：hover显示取消收藏图标 -->
              <el-icon
                v-if="data.type === 'device' && activeTab === 'favorite' && data.isHover"
                class="unfavorite-action-icon"
                @click.stop="toggleFavorite(data)"
              >
                <StarFilled />
              </el-icon>
            </span>
          </template>
        </el-tree>
      </div>

    </div>

    <!-- 右侧主内容区 -->
    <div class="main-content">
      <!-- 面包屑/标题 -->
      <div class="content-header">
        <h3 class="page-title">{{ selectedDeviceNames }}</h3>
      </div>

      <!-- 指标选择区域 -->
      <el-card shadow="never" class="indicator-card">
        <template #header>
          <div class="card-header">
            <span class="header-title">指标选择</span>
            <el-icon class="collapse-icon"><ArrowDown /></el-icon>
          </div>
        </template>
        <div class="indicator-content">
          <div class="indicator-group">
            <div class="group-title">指标类型1</div>
            <el-checkbox-group v-model="selectedIndicators.type1">
              <el-checkbox
                v-for="item in dynamicIndicators.type1"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="indicator-group">
            <div class="group-title">指标类型2</div>
            <el-checkbox-group v-model="selectedIndicators.type2">
              <el-checkbox
                v-for="item in dynamicIndicators.type2"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-card>

      <!-- 数据查看区域 -->
      <el-card shadow="never" class="data-view-card">
        <template #header>
          <div class="card-header">
            <span class="header-title">数据查看</span>
          </div>
        </template>

        <!-- 查询条件 -->
        <div class="query-section">
          <div class="query-row">
            <span class="query-label">统计时间</span>
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              class="time-picker"
            />
            <span class="query-label">间隔</span>
            <el-select v-model="interval" class="interval-select">
              <el-option label="采集间隔" value="collection" />
              <el-option label="1min" value="1min" />
              <el-option label="5min" value="5min" />
              <el-option label="10min" value="10min" />
              <el-option label="15min" value="15min" />
              <el-option label="30min" value="30min" />
              <el-option label="1小时" value="1hour" />
              <el-option label="日" value="day" />
            </el-select>
            <el-button type="primary" class="action-btn" @click="exportToExcel">导出</el-button>
            <el-button class="action-btn">更多</el-button>
            <div class="chart-type-toggle">
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button label="multiple">多图</el-radio-button>
                <el-radio-button label="single">单图</el-radio-button>
              </el-radio-group>
              <el-icon class="refresh-icon" @click="refreshCharts"><Refresh /></el-icon>
              <el-icon class="fullscreen-icon" @click="toggleFullscreen"><FullScreen /></el-icon>
              <el-icon class="download-icon" @click="downloadCharts"><Download /></el-icon>
            </div>
          </div>
          <div class="query-row legend-row">
            <el-checkbox v-model="legend.monitor" class="legend-checkbox">
              <span class="legend-dot" style="background-color: #67c23a;"></span>
              监测值
            </el-checkbox>
            <el-checkbox v-model="legend.cleaned" class="legend-checkbox">
              <span class="legend-dot" style="background-color: #409eff;"></span>
              清洗后值
            </el-checkbox>
            <el-checkbox v-model="legend.alarm" class="legend-checkbox">
              <span class="legend-dot" style="background-color: #f56c6c;"></span>
              告警阈值
            </el-checkbox>
          </div>
        </div>

        <!-- 图表区域 -->
        <div ref="chartContainerRef" class="charts-container">
          <template v-if="selectedDevices.length > 0 && allSelectedIndicators.length > 0">
            <!-- 多图模式 -->
            <template v-if="chartType === 'multiple'">
              <div
                v-for="(chart, index) in multipleChartsData"
                :key="index"
                class="chart-wrapper"
              >
                <div class="chart-title">{{ chart.title }}</div>
                <div class="chart-label">{{ chart.yAxisName }}</div>
                <ArtLineChart
                  :data="chart.series"
                  :x-axis-data="timeLabels"
                  height="280px"
                  :show-area-color="false"
                  :show-tooltip="true"
                  :show-split-line="true"
                />
              </div>
            </template>

            <!-- 单图模式 -->
            <template v-else>
              <div class="chart-wrapper single-chart">
                <div class="chart-title">综合监测数据</div>
                <ArtLineChart
                  :data="singleChartData.series"
                  :x-axis-data="timeLabels"
                  height="400px"
                  :show-area-color="false"
                  :show-tooltip="true"
                  :show-split-line="true"
                  :y-axis="singleChartData.yAxes"
                />
              </div>
            </template>
          </template>

          <!-- 未选择设备提示 -->
          <div v-else class="no-device-tip">
            <el-empty description="请选择设备和指标查看图表数据" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  Search,
  OfficeBuilding,
  Folder,
  HomeFilled,
  Odometer,
  Star,
  StarFilled,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Refresh,
  FullScreen,
  Download,
  ZoomIn,
  Fold,
  Expand
} from '@element-plus/icons-vue'
import ArtLineChart from '@/components/core/charts/art-line-chart/index.vue'

defineOptions({ name: 'InstrumentMonitor' })

// 标签页
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'favorite', label: '已收藏' }
]
const activeTab = ref('all')

// 左侧边栏显示状态
const isSidebarVisible = ref(true)

// 切换侧边栏显示/隐藏
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

// 树引用
const treeRef = ref()

// 树展开状态（expand/collapse）
const treeExpandState = ref('expand')

// 处理树展开状态变化
const handleTreeExpandChange = (value: string) => {
  if (value === 'expand') {
    expandAllNodes()
  } else {
    collapseAllNodes()
  }
}

// 全部展开
const expandAllNodes = () => {
  const tree = treeRef.value
  if (tree && tree.store) {
    // 使用 el-tree 的 store 展开所有节点
    const expandAll = (nodes: any[]) => {
      nodes.forEach((node: any) => {
        const treeNode = tree.store.nodesMap[node.id]
        if (treeNode) {
          treeNode.expand()
        }
        if (node.children?.length) {
          expandAll(node.children)
        }
      })
    }
    expandAll(filteredTreeData.value)
  }
}

// 全部折叠
const collapseAllNodes = () => {
  const tree = treeRef.value
  if (tree && tree.store) {
    // 使用 el-tree 的 store 折叠所有节点
    const collapseAll = (nodes: any[]) => {
      nodes.forEach((node: any) => {
        const treeNode = tree.store.nodesMap[node.id]
        if (treeNode) {
          treeNode.collapse()
        }
        if (node.children?.length) {
          collapseAll(node.children)
        }
      })
    }
    collapseAll(filteredTreeData.value)
  }
}

// 选中的设备节点
const selectedDevices = ref<any[]>([])

// 过滤已收藏的设备树
const filteredTreeData = computed(() => {
  if (activeTab.value !== 'favorite') {
    return treeData
  }
  
  // 递归过滤只保留已收藏的设备
  const filterFavorite = (nodes: any[]): any[] => {
    return nodes.map(node => {
      const newNode = { ...node }
      if (node.children?.length) {
        newNode.children = filterFavorite(node.children)
      }
      return newNode
    }).filter(node => {
      if (node.type === 'device') {
        return node.isFavorite
      }
      // 保留有子节点的父节点
      return node.children?.length > 0
    })
  }
  
  return filterFavorite(treeData)
})

// 处理树节点选中变化
const handleCheckChange = (data: any, checked: boolean) => {
  const checkedNodes = treeRef.value?.getCheckedNodes() || []
  // 只保留设备类型的节点
  selectedDevices.value = checkedNodes.filter((node: any) => node.type === 'device')
}

// 切换收藏状态
const toggleFavorite = (data: any) => {
  data.isFavorite = !data.isFavorite
  // 这里可以添加API调用来保存收藏状态
}

// 根据选中设备动态生成指标选项
const dynamicIndicators = computed(() => {
  if (selectedDevices.value.length === 0) {
    return {
      type1: [{ label: '指标1', value: 'indicator1' }],
      type2: [{ label: '指标3', value: 'indicator3' }]
    }
  }
  
  // 根据设备类型返回不同的指标
  const hasFlowmeter = selectedDevices.value.some((d: any) => d.label?.includes('流量计'))
  const hasWaterQuality = selectedDevices.value.some((d: any) => d.label?.includes('水质'))
  
  const type1 = []
  const type2 = []
  
  if (hasFlowmeter) {
    type1.push({ label: '瞬时流量', value: 'instantFlow' })
    type1.push({ label: '累计流量', value: 'totalFlow' })
    type2.push({ label: '流速', value: 'flowVelocity' })
  }
  
  if (hasWaterQuality) {
    type1.push({ label: 'PH值', value: 'ph' })
    type1.push({ label: '浊度', value: 'turbidity' })
    type2.push({ label: '溶解氧', value: 'do' })
    type2.push({ label: 'COD', value: 'cod' })
  }
  
  // 默认指标
  if (type1.length === 0) {
    type1.push({ label: '指标1', value: 'indicator1' })
    type1.push({ label: '指标2', value: 'indicator2' })
  }
  if (type2.length === 0) {
    type2.push({ label: '指标3', value: 'indicator3' })
    type2.push({ label: '指标4', value: 'indicator4' })
  }
  
  return { type1, type2 }
})

// 选中设备名称显示
const selectedDeviceNames = computed(() => {
  if (selectedDevices.value.length === 0) {
    return '请选择设备'
  }
  return selectedDevices.value.map((d: any) => d.label).join('，')
})

// 筛选表单
const filterForm = reactive({
  business: [],
  deviceType: '',
  search: ''
})

// 业务/功能级联选项
const businessOptions = [
  {
    value: 'waterSupply',
    label: '给水',
    children: [
      { value: 'intake', label: '取水口' },
      { value: 'urbanWaterPlant', label: '城镇供水厂' },
      { value: 'townWaterPlant', label: '乡镇供水厂' },
      { value: 'industrialWaterPlant', label: '工业供水厂' }
    ]
  },
  {
    value: 'drainage',
    label: '排水',
    children: [
      { value: 'industrialWaterPurification', label: '工业水质净化厂' },
      { value: 'urbanWaterPurification', label: '城镇水质净化厂' },
      { value: 'smallTownWaterPurification', label: '小城镇水质净化厂' },
      { value: 'ruralSewageTreatment', label: '农村污水处理设施' },
      { value: 'reclaimedWaterPlant', label: '中水厂' }
    ]
  },
  {
    value: 'pipeline',
    label: '管网',
    children: [
      { value: 'sewage', label: '污水' },
      { value: 'rainwater', label: '雨水' },
      { value: 'combined', label: '合流' },
      { value: 'sludge', label: '污泥' },
      { value: 'otherDrainage', label: '其他排水' },
      { value: 'waterSupplyNetwork', label: '供水管网' },
      { value: 'waterIntake', label: '取水' }
    ]
  }
]

// 树形数据
const treeData = [
  {
    id: 1,
    label: '环保集团',
    type: 'company',
    children: [
      {
        id: 11,
        label: '长三角水管家公司（长三角分公司）',
        type: 'company',
        children: [
          {
            id: 111,
            label: '吴江项目公司',
            type: 'project',
            children: [
              {
                id: 1111,
                label: '城南净水厂',
                type: 'station',
                children: [
                  {
                    id: 11111,
                    label: '1#进水流量计',
                    type: 'device',
                    isFavorite: true
                  },
                  {
                    id: 11112,
                    label: '2#进水流量计',
                    type: 'device'
                  },
                  {
                    id: 11113,
                    label: '出水流量计',
                    type: 'device'
                  }
                ]
              },
              {
                id: 1112,
                label: '城北净水厂',
                type: 'station',
                children: [
                  {
                    id: 11121,
                    label: '进水流量计',
                    type: 'device'
                  },
                  {
                    id: 11122,
                    label: '出水流量计',
                    type: 'device'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 12,
        label: '上游水管家公司（上游区域公司）',
        type: 'company',
        children: []
      },
      {
        id: 13,
        label: '湖北水管家公司（湖北区域公司）',
        type: 'company',
        children: []
      },
      {
        id: 14,
        label: '九江水管家公司（江西区域公司）',
        type: 'company',
        children: []
      },
      {
        id: 15,
        label: '安徽水管家公司（安徽区域公司）',
        type: 'company',
        children: []
      }
    ]
  }
]

const treeProps = {
  children: 'children',
  label: 'label'
}

const handleNodeClick = (data: any) => {
  console.log('Node clicked:', data)
}

// 指标选择
const selectedIndicators = reactive({
  type1: [],
  type2: []
})

// 时间范围
// 获取当前日期时间格式化字符串
const getCurrentDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 获取当天开始时间
const getTodayStart = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day} 00:00:00`
}

// 时间范围 - 默认为当天00:00:00到当前时刻
const timeRange = ref([getTodayStart(), getCurrentDateTime()])
const interval = ref('collection')
const chartType = ref('multiple')

// 图例
const legend = reactive({
  monitor: true,
  cleaned: false,
  alarm: false
})

// 计算时间间隔（毫秒）
const getIntervalMs = () => {
  switch (interval.value) {
    case '1min': return 60 * 1000
    case '5min': return 5 * 60 * 1000
    case '10min': return 10 * 60 * 1000
    case '15min': return 15 * 60 * 1000
    case '30min': return 30 * 60 * 1000
    case '1hour': return 60 * 60 * 1000
    case 'day': return 24 * 60 * 60 * 1000
    default: return 60 * 60 * 1000 // 默认1小时
  }
}

// 生成模拟时间标签
const timeLabels = computed(() => {
  const labels: string[] = []
  if (!timeRange.value || timeRange.value.length < 2) return labels
  
  const start = new Date(timeRange.value[0])
  const end = new Date(timeRange.value[1])
  const intervalMs = getIntervalMs()
  
  for (let time = start.getTime(); time <= end.getTime(); time += intervalMs) {
    const date = new Date(time)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    labels.push(`${month}-${day} ${hour}:${minute}`)
  }
  return labels
})

// 指标名称映射
const indicatorNameMap: Record<string, string> = {
  'indicator1': '指标1',
  'indicator2': '指标2',
  'indicator3': '指标3',
  'indicator4': '指标4',
  'instantFlow': '瞬时流量',
  'totalFlow': '累计流量',
  'flowVelocity': '流速',
  'ph': 'PH值',
  'turbidity': '浊度',
  'do': '溶解氧',
  'cod': 'COD'
}

// 获取所有选中的指标
const allSelectedIndicators = computed(() => {
  return [...selectedIndicators.type1, ...selectedIndicators.type2]
})

// 生成单个曲线的数据
const generateCurveData = (deviceId: number, indicator: string, dataType: 'monitor' | 'cleaned' | 'alarm') => {
  const labels = timeLabels.value
  if (labels.length === 0) return []
  
  const data: number[] = []
  let baseValue = 200
  
  // 根据指标类型设置基础值
  if (indicator.includes('Flow') || indicator.includes('流量')) {
    baseValue = 200
  } else if (indicator.includes('ph') || indicator === 'ph') {
    baseValue = 7
  } else if (indicator.includes('turbidity') || indicator === '浊度') {
    baseValue = 5
  } else {
    baseValue = 50
  }
  
  // 根据数据类型调整
  if (dataType === 'cleaned') {
    baseValue *= 0.95 // 清洗后值略低
  } else if (dataType === 'alarm') {
    baseValue *= 1.2 // 告警阈值较高
  }
  
  for (let i = 0; i < labels.length; i++) {
    const variation = Math.sin(i / 3) * 20 + Math.random() * 10
    let value = baseValue + variation
    
    // 不同数据类型有不同的波动范围
    if (dataType === 'monitor') {
      value += Math.random() * 10
    } else if (dataType === 'cleaned') {
      value += Math.random() * 5
    }
    
    data.push(Math.round(value * 10) / 10)
  }
  return data
}

// 多图模式：每个设备每个指标一个图表
const multipleChartsData = computed(() => {
  const charts: any[] = []
  const devices = selectedDevices.value
  const indicators = allSelectedIndicators.value
  
  devices.forEach(device => {
    indicators.forEach(indicator => {
      const series: any[] = []
      
      // 监测值（默认显示）
      if (legend.monitor) {
        series.push({
          name: '监测值',
          data: generateCurveData(device.id, indicator, 'monitor'),
          color: '#67c23a'
        })
      }
      
      // 清洗后值
      if (legend.cleaned) {
        series.push({
          name: '清洗后值',
          data: generateCurveData(device.id, indicator, 'cleaned'),
          color: '#409eff'
        })
      }
      
      // 告警阈值
      if (legend.alarm) {
        series.push({
          name: '告警阈值',
          data: generateCurveData(device.id, indicator, 'alarm'),
          color: '#f56c6c'
        })
      }
      
      if (series.length > 0) {
        charts.push({
          title: `${device.label} - ${indicatorNameMap[indicator] || indicator}`,
          series,
          yAxisName: getYAxisName(indicator)
        })
      }
    })
  })
  
  return charts
})

// 单图模式：所有设备所有指标在一个图表中，多纵坐标
const singleChartData = computed(() => {
  const devices = selectedDevices.value
  const indicators = allSelectedIndicators.value
  
  const series: any[] = []
  const yAxes: any[] = []
  let yAxisIndex = 0
  
  // 为每个指标创建一个纵坐标
  const indicatorYAxisMap: Record<string, number> = {}
  
  indicators.forEach(indicator => {
    if (!(indicator in indicatorYAxisMap)) {
      indicatorYAxisMap[indicator] = yAxisIndex
      yAxes.push({
        type: 'value',
        name: indicatorNameMap[indicator] || indicator,
        position: yAxisIndex === 0 ? 'left' : 'right',
        offset: yAxisIndex > 1 ? (yAxisIndex - 1) * 60 : 0,
        axisLine: { show: true },
        axisLabel: { show: true }
      })
      yAxisIndex++
    }
  })
  
  devices.forEach((device, deviceIndex) => {
    indicators.forEach(indicator => {
      const baseColor = getDeviceColor(deviceIndex)
      
      // 监测值
      if (legend.monitor) {
        series.push({
          name: `${device.label} - ${indicatorNameMap[indicator] || indicator} - 监测值`,
          data: generateCurveData(device.id, indicator, 'monitor'),
          color: baseColor,
          yAxisIndex: indicatorYAxisMap[indicator]
        })
      }
      
      // 清洗后值
      if (legend.cleaned) {
        series.push({
          name: `${device.label} - ${indicatorNameMap[indicator] || indicator} - 清洗后值`,
          data: generateCurveData(device.id, indicator, 'cleaned'),
          color: adjustColor(baseColor, -20),
          yAxisIndex: indicatorYAxisMap[indicator]
        })
      }
      
      // 告警阈值
      if (legend.alarm) {
        series.push({
          name: `${device.label} - ${indicatorNameMap[indicator] || indicator} - 告警阈值`,
          data: generateCurveData(device.id, indicator, 'alarm'),
          color: adjustColor(baseColor, -40),
          yAxisIndex: indicatorYAxisMap[indicator]
        })
      }
    })
  })
  
  return { series, yAxes }
})

// 获取Y轴名称
const getYAxisName = (indicator: string) => {
  if (indicator.includes('Flow') || indicator.includes('流量')) {
    return 'm³/h'
  } else if (indicator.includes('ph') || indicator === 'ph') {
    return 'pH'
  } else if (indicator.includes('turbidity') || indicator === '浊度') {
    return 'NTU'
  }
  return ''
}

// 获取设备颜色
const getDeviceColor = (index: number) => {
  const colors = ['#67c23a', '#409eff', '#e6a23c', '#f56c6c', '#909399', '#b37feb']
  return colors[index % colors.length]
}

// 调整颜色亮度
const adjustColor = (color: string, amount: number) => {
  // 简单的颜色调整，实际项目中可能需要更复杂的算法
  return color
}

// 旧的图表数据（保留兼容）
const flowChartData = computed(() => {
  const data: number[] = []
  const labels = timeLabels.value
  if (labels.length === 0) return data
  
  let baseValue = 200
  for (let i = 0; i < labels.length; i++) {
    const variation = Math.sin(i / 3) * 50 + Math.random() * 30
    baseValue = 200 + variation
    data.push(Math.round(baseValue))
  }
  return data
})

const totalFlowChartData = computed(() => {
  const data: number[] = []
  const labels = timeLabels.value
  if (labels.length === 0) return data
  
  let baseValue = 7441000
  for (let i = 0; i < labels.length; i++) {
    baseValue += Math.random() * 500 + 200
    data.push(Math.round(baseValue))
  }
  return data
})

// 图表引用
const chartContainerRef = ref()

// 刷新图表
const refreshCharts = () => {
  // 触发重新计算图表数据
  console.log('刷新图表')
}

// 全屏切换
const toggleFullscreen = () => {
  const elem = chartContainerRef.value
  if (!elem) return
  
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

// 下载图表
const downloadCharts = () => {
  // 实现图表下载功能
  console.log('下载图表')
  // 可以使用 html2canvas 或 echarts 的 getDataURL 方法
}

// 导出Excel
const exportToExcel = async () => {
  if (selectedDevices.value.length === 0 || allSelectedIndicators.value.length === 0) {
    ElMessage.warning('请先选择设备和指标')
    return
  }

  try {
    // 动态导入 xlsx
    const XLSX = await import('xlsx')

    // 准备表头
    const headers = ['时间']
    const devices = selectedDevices.value
    const indicators = allSelectedIndicators.value

    // 为每个设备和指标组合创建列
    devices.forEach(device => {
      indicators.forEach(indicator => {
        const indicatorName = indicatorNameMap[indicator] || indicator
        if (legend.monitor) {
          headers.push(`${device.label}-${indicatorName}-监测值`)
        }
        if (legend.cleaned) {
          headers.push(`${device.label}-${indicatorName}-清洗后值`)
        }
        if (legend.alarm) {
          headers.push(`${device.label}-${indicatorName}-告警阈值`)
        }
      })
    })

    // 准备数据行
    const rows: any[] = []
    const labels = timeLabels.value

    labels.forEach((time, timeIndex) => {
      const row: any[] = [time]
      devices.forEach(device => {
        indicators.forEach(indicator => {
          if (legend.monitor) {
            const data = generateCurveData(device.id, indicator, 'monitor')
            row.push(data[timeIndex] || 0)
          }
          if (legend.cleaned) {
            const data = generateCurveData(device.id, indicator, 'cleaned')
            row.push(data[timeIndex] || 0)
          }
          if (legend.alarm) {
            const data = generateCurveData(device.id, indicator, 'alarm')
            row.push(data[timeIndex] || 0)
          }
        })
      })
      rows.push(row)
    })

    // 创建工作簿
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])

    // 设置列宽
    const colWidths = headers.map(() => ({ wch: 20 }))
    ws['!cols'] = colWidths

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, '监测数据')

    // 生成文件名
    const now = new Date()
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
    const fileName = `仪表监测数据_${dateStr}.xlsx`

    // 下载文件
    XLSX.writeFile(wb, fileName)

    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败，请重试')
  }
}
</script>

<style scoped lang="scss">
.instrument-monitor-page {
  display: flex;
  height: 100%;
  background-color: #f5f7fa;
  position: relative;

  .sidebar-toggle {
    position: absolute;
    left: 280px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 60px;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-left: none;
    border-radius: 0 4px 4px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: left 0.3s;

    &:hover {
      background-color: #f5f7fa;
    }

    .el-icon {
      font-size: 14px;
      color: #606266;
    }
  }

  .sidebar-toggle.collapsed {
    left: 0;
  }

  .left-sidebar {
    width: 280px;
    background-color: #fff;
    border-right: 1px solid #e4e7ed;
    display: flex;
    flex-direction: column;

    .sidebar-tabs {
      display: flex;
      border-bottom: 1px solid #e4e7ed;

      .tab-item {
        flex: 1;
        padding: 12px 0;
        text-align: center;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: #409eff;
        }

        &.active {
          color: #409eff;
          border-bottom: 2px solid #409eff;
          margin-bottom: -1px;
        }
      }
    }

    .filter-section {
      padding: 12px;
      border-bottom: 1px solid #e4e7ed;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .filter-select {
        width: 100%;
      }

      .filter-search {
        width: 100%;
      }
    }

    .tree-section {
      flex: 1;
      overflow-y: auto;
      padding: 8px;

      .tree-node {
        display: flex;
        align-items: center;
        gap: 4px;

        .el-icon {
          font-size: 14px;
          color: #909399;
        }

        .node-label {
          flex: 1;
          font-size: 13px;
        }

        .favorite-icon {
          color: #f7ba2a;
          font-size: 12px;
        }

        .favorite-action-icon {
          color: #c0c4cc;
          font-size: 12px;
          cursor: pointer;

          &:hover {
            color: #f7ba2a;
          }
        }

        .unfavorite-action-icon {
          color: #f7ba2a;
          font-size: 12px;
          cursor: pointer;

          &:hover {
            color: #c0c4cc;
          }
        }
      }

      :deep(.el-tree-node__content) {
        height: 32px;
      }
    }

    .tree-actions {
      display: flex;
      justify-content: center;
      padding: 8px 12px;
      border-bottom: 1px solid #e4e7ed;

      .el-radio-group {
        .el-radio-button__inner {
          font-size: 12px;
          padding: 6px 12px;
        }
      }
    }
  }

  .main-content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;

    .content-header {
      margin-bottom: 16px;

      .page-title {
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        margin: 0;
      }
    }

    .indicator-card {
      margin-bottom: 16px;

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-title {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
          display: flex;
          align-items: center;
          gap: 8px;

          &::before {
            content: '';
            width: 3px;
            height: 14px;
            background-color: #409eff;
            border-radius: 2px;
          }
        }

        .collapse-icon {
          color: #909399;
          cursor: pointer;
        }
      }

      .indicator-content {
        padding: 8px 0;

        .indicator-group {
          margin-bottom: 16px;

          &:last-child {
            margin-bottom: 0;
          }

          .group-title {
            font-size: 13px;
            font-weight: 500;
            color: #606266;
            margin-bottom: 8px;
            padding-left: 8px;
            border-left: 2px solid #dcdfe6;
          }

          .el-checkbox-group {
            padding-left: 10px;
          }
        }
      }
    }

    .data-view-card {
      .card-header {
        display: flex;
        align-items: center;

        .header-title {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
          display: flex;
          align-items: center;
          gap: 8px;

          &::before {
            content: '';
            width: 3px;
            height: 14px;
            background-color: #409eff;
            border-radius: 2px;
          }
        }
      }

      .query-section {
        padding: 16px;
        background-color: #fafafa;
        border-radius: 4px;
        margin-bottom: 16px;

        .query-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;

          &.legend-row {
            margin-top: 12px;
            padding-left: 60px;
          }

          .query-label {
            font-size: 13px;
            color: #606266;
            white-space: nowrap;
          }

          .time-picker {
            width: 340px;
          }

          .interval-select {
            width: 120px;
          }

          .action-btn {
            margin-left: 4px;
          }

          .chart-type-toggle {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 12px;

            .refresh-icon,
            .fullscreen-icon,
            .download-icon {
              font-size: 16px;
              color: #909399;
              cursor: pointer;

              &:hover {
                color: #409eff;
              }
            }
          }

          .legend-checkbox {
            margin-right: 20px;

            .legend-dot {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              margin-right: 4px;
            }
          }
        }
      }

      .charts-container {
        min-height: 600px;
        width: 100%;

        .chart-wrapper {
          position: relative;
          margin-bottom: 24px;
          min-height: 300px;
          width: 100%;
          background-color: #fff;
          border-radius: 4px;
          padding: 16px;
          border: 1px solid #e4e7ed;
          display: flex;
          flex-direction: column;

          &:last-child {
            margin-bottom: 0;
          }

          &.single-chart {
            min-height: 400px;
          }

          .chart-title {
            font-size: 14px;
            font-weight: 600;
            color: #303133;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e4e7ed;
            flex-shrink: 0;
          }

          .art-line-chart {
            width: 100% !important;
            flex: 1;
            min-height: 0;
          }

          .chart-label {
            position: absolute;
            left: 16px;
            top: 50px;
            font-size: 12px;
            color: #909399;
            z-index: 1;
          }
        }
      }

      // 全屏模式样式
      &:fullscreen {
        background-color: #fff;
        padding: 20px;
        overflow-y: auto;

        .charts-container {
          min-height: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;

          .chart-wrapper {
            flex: 1;
            min-height: 0;
            margin-bottom: 20px;

            &:last-child {
              margin-bottom: 0;
            }

            .art-line-chart {
              height: 100% !important;
            }
          }
        }
      }

      .no-device-tip {
        padding: 40px 0;
      }

      .chart-legend-bar {
        display: flex;
        justify-content: center;
        gap: 32px;
        padding-top: 16px;
        border-top: 1px solid #e4e7ed;
        margin-top: 16px;

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;

          .legend-line {
            width: 20px;
            height: 2px;
          }

          .legend-text {
            font-size: 12px;
            color: #606266;
          }
        }
      }
    }
  }
}
</style>
