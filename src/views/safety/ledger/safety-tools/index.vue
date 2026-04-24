<template>
  <div class="safety-tools-page">
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
          <span>安全工器具台账</span>
          <div class="operation-bar">
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>新增
            </el-button>
            <el-button type="primary" @click="handleImport">
              <el-icon><Upload /></el-icon>批量导入
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
        <!-- 校验状态列 -->
        <template #verificationStatus="{ row }">
          <el-tag
            :type="getVerificationStatusType(row.verificationStatus)"
            :effect="row.verificationStatus === 'expired' ? 'dark' : 'light'"
          >
            {{ getVerificationStatusText(row.verificationStatus) }}
          </el-tag>
        </template>

        <!-- 附件列 -->
        <template #attachments="{ row }">
          <el-link
            v-if="row.attachments && row.attachments.length > 0"
            type="primary"
            :underline="false"
            @click.stop="handleViewAttachments(row)"
          >
            查看附件({{ row.attachments.length }})
          </el-link>
          <span v-else>-</span>
        </template>

        <!-- 操作列 -->
        <template #operation="{ row }">
          <el-button
            type="primary"
            link
            size="small"
            @click.stop="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            link
            size="small"
            @click.stop="handleDetail(row)"
          >
            详情
          </el-button>
          <el-button
            type="primary"
            link
            size="small"
            @click.stop="handleInspectionRecord(row)"
          >
            校验记录
          </el-button>
          <el-button
            type="danger"
            link
            size="small"
            @click.stop="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </ArtTable>
    </ElCard>

    <!-- 编辑/新增弹窗 -->
    <EditDialog
      v-model="editDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 详情弹窗 -->
    <DetailDialog
      v-model="detailDialogVisible"
      :data="currentRow"
    />

    <!-- 校验记录弹窗 -->
    <InspectionRecordDialog
      v-model="inspectionDialogVisible"
      :tool-id="currentRow?.id"
      :tool-name="currentRow?.name"
      @success="handleSearch"
    />

    <!-- 导入弹窗 -->
    <ImportDialog
      v-model="importDialogVisible"
      @success="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Upload, Download } from '@element-plus/icons-vue'
import { getSafetyToolList, exportSafetyTools, deleteSafetyTool, getStationList } from '@/api/safety-tools'
import type { SafetyTool, SafetyToolQueryParams } from '@/types/safety-tools'
import EditDialog from './components/EditDialog.vue'
import DetailDialog from './components/DetailDialog.vue'
import InspectionRecordDialog from './components/InspectionRecordDialog.vue'
import ImportDialog from './components/ImportDialog.vue'

// 搜索表单
const searchForm = reactive({
  stationId: undefined as number | undefined,
  keyword: '',
  verificationStatus: ''
})

// 厂站选项
const stationOptions = ref<Array<{ label: string; value: number }>>([])

// 搜索项配置
const searchItems = ref([
  {
    type: 'select',
    prop: 'stationId',
    label: '所属单位',
    placeholder: '请选择所属单位',
    options: stationOptions,
    clearable: true
  },
  {
    type: 'input',
    prop: 'keyword',
    label: '名称/规格型号',
    placeholder: '请输入名称或规格型号',
    clearable: true
  },
  {
    type: 'select',
    prop: 'verificationStatus',
    label: '校验状态',
    placeholder: '请选择校验状态',
    options: [
      { label: '正常', value: 'normal' },
      { label: '预警', value: 'warning' },
      { label: '已超期', value: 'expired' }
    ],
    clearable: true
  }
])

// 表格数据
const tableData = ref<SafetyTool[]>([])
const loading = ref(false)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 表格列配置
const columns = [
  { prop: 'stationName', label: '所属单位', minWidth: 140 },
  { prop: 'name', label: '名称', minWidth: 120 },
  { prop: 'model', label: '规格型号', minWidth: 140 },
  { prop: 'quantity', label: '数量', minWidth: 80 },
  { prop: 'usageLocation', label: '使用地点', minWidth: 120 },
  { prop: 'department', label: '使用部门', minWidth: 120 },
  { prop: 'manager', label: '负责人', minWidth: 100 },
  { prop: 'managerPhone', label: '负责人手机号', minWidth: 130 },
  { prop: 'inspectionCycle', label: '检验周期(年)', minWidth: 110 },
  { prop: 'lastInspectionDate', label: '最近一次校验日期', minWidth: 150 },
  { prop: 'nextInspectionDate', label: '下次检验日期', minWidth: 130 },
  { prop: 'verificationStatus', label: '校验状态', minWidth: 100, useSlot: true },
  { prop: 'attachments', label: '附件', minWidth: 100, useSlot: true },
  { prop: 'operation', label: '操作', minWidth: 240, fixed: 'right', useSlot: true }
]

// 弹窗控制
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const inspectionDialogVisible = ref(false)
const importDialogVisible = ref(false)
const currentRow = ref<SafetyTool | null>(null)

// 获取校验状态样式
const getVerificationStatusType = (status: string) => {
  const typeMap: Record<string, string> = {
    normal: 'success',
    warning: 'warning',
    expired: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取校验状态文本
const getVerificationStatusText = (status: string) => {
  const textMap: Record<string, string> = {
    normal: '正常',
    warning: '预警',
    expired: '已超期'
  }
  return textMap[status] || status
}

// 获取厂站列表
const fetchStationList = async () => {
  try {
    const res = await getStationList()
    stationOptions.value = res.data.map(item => ({
      label: item.name,
      value: item.id
    }))
  } catch (error) {
    console.error('获取厂站列表失败:', error)
  }
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params: SafetyToolQueryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      stationId: searchForm.stationId,
      keyword: searchForm.keyword || undefined,
      verificationStatus: searchForm.verificationStatus || undefined
    }
    const res = await getSafetyToolList(params)
    tableData.value = res.data.list
    pagination.total = res.data.total
  } catch (error) {
    console.error('获取安全工器具列表失败:', error)
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
  searchForm.keyword = ''
  searchForm.verificationStatus = ''
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
const handleRowClick = (row: SafetyTool) => {
  handleDetail(row)
}

// 新增
const handleAdd = () => {
  currentRow.value = null
  editDialogVisible.value = true
}

// 编辑
const handleEdit = (row: SafetyTool) => {
  currentRow.value = row
  editDialogVisible.value = true
}

// 详情
const handleDetail = (row: SafetyTool) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 校验记录
const handleInspectionRecord = (row: SafetyTool) => {
  currentRow.value = row
  inspectionDialogVisible.value = true
}

// 删除
const handleDelete = async (row: SafetyTool) => {
  try {
    await ElMessageBox.confirm(`确定要删除「${row.name}」吗？`, '提示', {
      type: 'warning'
    })
    await deleteSafetyTool(row.id)
    ElMessage.success('删除成功')
    handleSearch()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

// 查看附件
const handleViewAttachments = (row: SafetyTool) => {
  ElMessage.info(`查看附件: ${row.attachments?.join(', ')}`)
}

// 导入
const handleImport = () => {
  importDialogVisible.value = true
}

// 导出
const handleExport = async () => {
  try {
    await ElMessageBox.confirm('确定要导出当前数据吗？', '提示', {
      type: 'warning'
    })
    const blob = await exportSafetyTools()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `安全工器具台账_${new Date().toLocaleDateString()}.xlsx`
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
  fetchStationList()
  fetchData()
})
</script>

<style scoped lang="scss">
.safety-tools-page {
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
