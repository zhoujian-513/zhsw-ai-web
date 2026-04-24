<template>
  <div class="emergency-repair-page">
    <!-- 搜索栏 -->
    <ElCard shadow="never" class="filter-card">
      <ArtSearchBar
        :model="searchForm"
        :items="searchItems"
        @search="handleSearch"
        @reset="handleReset"
      />
    </ElCard>

    <!-- 数据表格 -->
    <ElCard shadow="never" class="table-card">
      <template #header>
        <div class="table-header">
          <span>应急抢修管理</span>
          <div class="operation-bar">
            <el-button type="primary" @click="handleInitialReport">
              <el-icon><Plus /></el-icon>事件初报
            </el-button>
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon>批量导出
            </el-button>
          </div>
        </div>
      </template>
      <ArtTable
        :data="tableData"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
        @row-click="handleRowClick"
      >
        <!-- 事件状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #operation="{ row }">
          <el-button
            v-if="row.status === 'in_progress'"
            type="primary"
            link
            size="small"
            @click.stop="handleFollowUp(row)"
          >
            续报
          </el-button>
          <el-button
            v-if="row.status === 'in_progress'"
            type="primary"
            link
            size="small"
            @click.stop="handleFinal(row)"
          >
            终报
          </el-button>
          <el-button
            type="primary"
            link
            size="small"
            @click.stop="handleDetail(row)"
          >
            详情
          </el-button>
        </template>
      </ArtTable>
    </ElCard>

    <!-- 初报弹窗 -->
    <InitialReportDialog
      v-model="initialDialogVisible"
      @success="handleSearch"
    />

    <!-- 续报弹窗 -->
    <FollowUpDialog
      v-model="followUpDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 终报弹窗 -->
    <FinalReportDialog
      v-model="finalDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 详情弹窗 -->
    <DetailDialog
      v-model="detailDialogVisible"
      :data="currentRow"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Download } from '@element-plus/icons-vue'
import { getEmergencyEventList, exportEmergencyEvents } from '@/api/emergency-repair'
import type { EmergencyEvent, EmergencyEventQueryParams, EmergencyEventStatus } from '@/types/emergency-repair'
import InitialReportDialog from './components/InitialReportDialog.vue'
import FollowUpDialog from './components/FollowUpDialog.vue'
import FinalReportDialog from './components/FinalReportDialog.vue'
import DetailDialog from './components/DetailDialog.vue'

// 搜索表单
const searchForm = reactive({
  stationId: undefined as number | undefined,
  eventType: '',
  status: '',
  occurrenceMonth: ''
})

// 搜索项配置
const searchItems = [
  {
    type: 'select',
    prop: 'stationId',
    label: '所属单位',
    placeholder: '请选择单位',
    options: [],
    clearable: true
  },
  {
    type: 'select',
    prop: 'eventType',
    label: '事件类型',
    placeholder: '请选择事件类型',
    options: [
      { label: '管网破裂', value: 'pipe_burst' },
      { label: '管网塌陷', value: 'pipe_collapse' },
      { label: '管网堵塞', value: 'pipe_blockage' },
      { label: '冒溢', value: 'overflow' },
      { label: '第三方施工破坏', value: 'third_party_damage' },
      { label: '设备故障', value: 'equipment_failure' },
      { label: '停电停水', value: 'power_water_outage' },
      { label: '生化系统崩溃', value: 'biochemical_collapse' },
      { label: '有毒有害物冲击', value: 'toxic_impact' },
      { label: '火灾爆炸', value: 'fire_explosion' },
      { label: '人员中毒', value: 'personnel_poisoning' }
    ],
    clearable: true
  },
  {
    type: 'select',
    prop: 'status',
    label: '事件状态',
    placeholder: '请选择事件状态',
    options: [
      { label: '进行中', value: 'in_progress' },
      { label: '已结束', value: 'ended' }
    ],
    clearable: true
  },
  {
    type: 'month',
    prop: 'occurrenceMonth',
    label: '发生月份',
    placeholder: '请选择月份',
    clearable: true
  }
]

// 表格数据
const tableData = ref<EmergencyEvent[]>([])
const loading = ref(false)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 表格列配置
const columns = [
  { prop: 'stationName', label: '所属单位', minWidth: 150 },
  { prop: 'eventTypeName', label: '事件类型', minWidth: 120 },
  { prop: 'occurrenceTime', label: '发生时间', minWidth: 160 },
  { prop: 'location', label: '地点/部位', minWidth: 150 },
  { prop: 'adverseEffect', label: '核心不良影响', minWidth: 150, showOverflowTooltip: true },
  { prop: 'preliminaryMeasures', label: '初步处置措施', minWidth: 150, showOverflowTooltip: true },
  { prop: 'status', label: '事件状态', minWidth: 100, useSlot: true },
  { prop: 'submitter', label: '提交人', minWidth: 100 },
  { prop: 'submitTime', label: '提交时间', minWidth: 160 },
  { prop: 'operation', label: '操作', minWidth: 200, fixed: 'right', useSlot: true }
]

// 弹窗控制
const initialDialogVisible = ref(false)
const followUpDialogVisible = ref(false)
const finalDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const currentRow = ref<EmergencyEvent | null>(null)

// 获取状态样式
const getStatusType = (status: EmergencyEventStatus) => {
  const typeMap: Record<EmergencyEventStatus, string> = {
    in_progress: 'warning',
    ended: 'success'
  }
  return typeMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status: EmergencyEventStatus) => {
  const textMap: Record<EmergencyEventStatus, string> = {
    in_progress: '进行中',
    ended: '已结束'
  }
  return textMap[status] || status
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params: EmergencyEventQueryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      stationId: searchForm.stationId,
      eventType: searchForm.eventType || undefined,
      status: searchForm.status || undefined,
      occurrenceMonth: searchForm.occurrenceMonth || undefined
    }
    const res = await getEmergencyEventList(params)
    tableData.value = res.data.list
    pagination.total = res.data.total
  } catch (error) {
    console.error('获取应急事件列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchForm.stationId = undefined
  searchForm.eventType = ''
  searchForm.status = ''
  searchForm.occurrenceMonth = ''
  pagination.currentPage = 1
  fetchData()
}

// 分页变化
const handlePageChange = (page: number) => {
  pagination.currentPage = page
  fetchData()
}

// 每页条数变化
const handlePageSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  fetchData()
}

// 行点击
const handleRowClick = (row: EmergencyEvent) => {
  handleDetail(row)
}

// 事件初报
const handleInitialReport = () => {
  currentRow.value = null
  initialDialogVisible.value = true
}

// 事件续报
const handleFollowUp = (row: EmergencyEvent) => {
  currentRow.value = row
  followUpDialogVisible.value = true
}

// 事件终报
const handleFinal = (row: EmergencyEvent) => {
  currentRow.value = row
  finalDialogVisible.value = true
}

// 详情
const handleDetail = (row: EmergencyEvent) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 导出
const handleExport = async () => {
  try {
    await ElMessageBox.confirm('确定要导出当前数据吗？', '提示', {
      type: 'warning'
    })
    const blob = await exportEmergencyEvents()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `应急抢修事件_${new Date().toLocaleDateString()}.xlsx`
    link.click()
    URL.revokeObjectURL(link.href)
    ElMessage.success('导出成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('导出失败:', error)
    }
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.emergency-repair-page {
  padding: 16px;

  .filter-card {
    margin-bottom: 16px;
  }

  .table-card {
    :deep(.el-card__header) {
      padding: 12px 20px;
      font-weight: 600;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .operation-bar {
        display: flex;
        gap: 10px;
      }
    }
  }
}
</style>
