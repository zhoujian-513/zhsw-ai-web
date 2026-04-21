<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header>
        <div class="card-header">
          <span>应急抢修管理</span>
          <ElButton type="primary" @click="handleInitialReport">事件初报</ElButton>
        </div>
      </template>

      <div class="search-bar">
        <ElForm :model="searchForm" inline>
          <ElFormItem label="所属单位">
            <ElSelect v-model="searchForm.belongingUnit" placeholder="请选择" clearable style="width: 180px">
              <ElOption
                v-for="item in unitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="事件类型">
            <ElSelect v-model="searchForm.eventType" placeholder="请选择" clearable style="width: 180px">
              <ElOption
                v-for="item in eventTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="事件状态">
            <ElSelect v-model="searchForm.status" placeholder="请选择" clearable style="width: 180px">
              <ElOption label="进行中" value="in_progress" />
              <ElOption label="已结束" value="ended" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="发生月份">
            <ElDatePicker
              v-model="searchForm.month"
              type="month"
              placeholder="请选择"
              value-format="YYYY-MM"
              style="width: 180px"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" @click="handleSearch">查询</ElButton>
            <ElButton @click="handleReset">重置</ElButton>
          </ElFormItem>
        </ElForm>
      </div>

      <div class="table-toolbar">
        <ElButton type="success" @click="handleExport">批量导出</ElButton>
        <ElButton type="warning" @click="handleImport">批量导入</ElButton>
      </div>

      <ElTable
        :data="tableData"
        border
        stripe
        v-loading="loading"
        @row-click="handleRowClick"
      >
        <ElTableColumn type="selection" width="55" />
        <ElTableColumn prop="id" label="编号" width="80" />
        <ElTableColumn prop="belongingUnit" label="所属单位" width="150" />
        <ElTableColumn prop="eventType" label="事件类型" width="150">
          <template #default="{ row }">
            {{ eventTypeMap[row.eventType] }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="submitTime" label="发生时间" width="180" />
        <ElTableColumn prop="location" label="地点/部位" min-width="200" show-overflow-tooltip />
        <ElTableColumn prop="adverseEffect" label="核心不良影响" min-width="200" show-overflow-tooltip />
        <ElTableColumn prop="preliminaryMeasures" label="初步处置措施" min-width="200" show-overflow-tooltip />
        <ElTableColumn prop="status" label="事件状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === 'in_progress' ? 'warning' : 'success'">
              {{ statusMap[row.status] }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="submitter" label="提交人" width="100" />
        <ElTableColumn prop="submitTime" label="提交时间" width="180" />
        <ElTableColumn label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <ElButton
              v-if="row.status === 'in_progress'"
              type="primary"
              size="small"
              @click.stop="handleContinuation(row)"
            >
              续报
            </ElButton>
            <ElButton
              v-if="row.status === 'in_progress'"
              type="success"
              size="small"
              @click.stop="handleFinal(row)"
            >
              终报
            </ElButton>
            <ElButton type="info" size="small" @click.stop="handleDetail(row)">详情</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="pagination-bar">
        <ElPagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </ElCard>

    <!-- 初报弹窗 -->
    <InitialReportDialog
      v-model:visible="initialDialogVisible"
      @success="handleSearch"
    />

    <!-- 续报弹窗 -->
    <ContinuationDialog
      v-model:visible="continuationDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 终报弹窗 -->
    <FinalReportDialog
      v-model:visible="finalDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 详情弹窗 -->
    <DetailDialog
      v-model:visible="detailDialogVisible"
      :data="currentRow"
    />

    <!-- 导入弹窗 -->
    <ImportDialog
      v-model:visible="importDialogVisible"
      @success="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { EmergencyRepairItem, EmergencyType, EmergencyStatus } from '@/types/emergency-repair'
import { getEmergencyRepairList, exportEmergencyRepair } from '@/api/emergency-repair'
import InitialReportDialog from './components/InitialReportDialog.vue'
import ContinuationDialog from './components/ContinuationDialog.vue'
import FinalReportDialog from './components/FinalReportDialog.vue'
import DetailDialog from './components/DetailDialog.vue'
import ImportDialog from './components/ImportDialog.vue'

defineOptions({ name: 'SafetyEmergencyRepair' })

// 搜索表单
const searchForm = reactive<{
  belongingUnit: string
  eventType: EmergencyType | ''
  status: EmergencyStatus | ''
  month: string
}>({
  belongingUnit: '',
  eventType: '',
  status: '',
  month: ''
})

// 所属单位选项
const unitOptions = [
  { label: '一期污水处理厂', value: '一期污水处理厂' },
  { label: '二期污水处理厂', value: '二期污水处理厂' },
  { label: '泵站', value: '泵站' }
]

// 事件类型选项
const eventTypeOptions = [
  { label: '管网破裂', value: 'pipe_burst' },
  { label: '管网塌陷', value: 'pipe_collapse' },
  { label: '管网堵塞', value: 'pipe_blockage' },
  { label: '冒溢', value: 'overflow' },
  { label: '第三方施工破坏', value: 'third_party_damage' },
  { label: '设备故障', value: 'equipment_failure' },
  { label: '停电停水', value: 'power_outage' },
  { label: '生化系统崩溃', value: 'biological_collapse' },
  { label: '有毒有害物冲击', value: 'toxic_shock' },
  { label: '火灾爆炸', value: 'fire_explosion' },
  { label: '人员中毒', value: 'personnel_poisoning' }
]

// 事件类型映射
const eventTypeMap: Record<string, string> = {
  pipe_burst: '管网破裂',
  pipe_collapse: '管网塌陷',
  pipe_blockage: '管网堵塞',
  overflow: '冒溢',
  third_party_damage: '第三方施工破坏',
  equipment_failure: '设备故障',
  power_outage: '停电停水',
  biological_collapse: '生化系统崩溃',
  toxic_shock: '有毒有害物冲击',
  fire_explosion: '火灾爆炸',
  personnel_poisoning: '人员中毒'
}

// 状态映射
const statusMap: Record<string, string> = {
  in_progress: '进行中',
  ended: '已结束'
}

// 表格数据
const tableData = ref<EmergencyRepairItem[]>([])
const loading = ref(false)

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

// 弹窗控制
const initialDialogVisible = ref(false)
const continuationDialogVisible = ref(false)
const finalDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const importDialogVisible = ref(false)
const currentRow = ref<EmergencyRepairItem | null>(null)

// 获取列表数据
const fetchList = async () => {
  loading.value = true
  try {
    const params: any = {
      page: pagination.page,
      pageSize: pagination.pageSize
    }
    if (searchForm.belongingUnit) params.belongingUnit = searchForm.belongingUnit
    if (searchForm.eventType) params.eventType = searchForm.eventType
    if (searchForm.status) params.status = searchForm.status
    if (searchForm.month) params.month = searchForm.month
    const res = await getEmergencyRepairList(params)
    if (res.code === 200) {
      tableData.value = res.data.list
      pagination.total = res.data.total
    }
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error('获取列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  fetchList()
}

// 重置
const handleReset = () => {
  searchForm.belongingUnit = ''
  searchForm.eventType = ''
  searchForm.status = ''
  searchForm.month = ''
  pagination.page = 1
  fetchList()
}

// 初报
const handleInitialReport = () => {
  initialDialogVisible.value = true
}

// 续报
const handleContinuation = (row: EmergencyRepairItem) => {
  currentRow.value = row
  continuationDialogVisible.value = true
}

// 终报
const handleFinal = (row: EmergencyRepairItem) => {
  currentRow.value = row
  finalDialogVisible.value = true
}

// 详情
const handleDetail = (row: EmergencyRepairItem) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 行点击
const handleRowClick = (row: EmergencyRepairItem) => {
  handleDetail(row)
}

// 导出
const handleExport = async () => {
  try {
    const params: any = {
      page: 1,
      pageSize: 10000
    }
    if (searchForm.belongingUnit) params.belongingUnit = searchForm.belongingUnit
    if (searchForm.eventType) params.eventType = searchForm.eventType
    if (searchForm.status) params.status = searchForm.status
    if (searchForm.month) params.month = searchForm.month
    const res = await exportEmergencyRepair(params)
    const blob = new Blob([res as unknown as BlobPart], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `应急抢修记录_${new Date().toLocaleDateString()}.xlsx`
    link.click()
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  }
}

// 导入
const handleImport = () => {
  importDialogVisible.value = true
}

// 分页大小变化
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  fetchList()
}

// 页码变化
const handleCurrentChange = (val: number) => {
  pagination.page = val
  fetchList()
}

onMounted(() => {
  fetchList()
})
</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.table-toolbar {
  margin-bottom: 16px;
}

.pagination-bar {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
