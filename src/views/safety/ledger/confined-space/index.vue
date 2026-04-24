<template>
  <div class="confined-space-page">
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
          <span>有限空间台账</span>
          <div class="operation-bar">
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>新增
            </el-button>
            <el-button type="primary" @click="handleImport">
              <el-icon><Upload /></el-icon>批量导入
            </el-button>
            <el-button
              type="primary"
              :disabled="selectedRows.length === 0"
              @click="handleBatchAudit"
            >
              <el-icon><CircleCheck /></el-icon>批量审核
            </el-button>
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon>批量导出
            </el-button>
          </div>
        </div>
      </template>
      <ArtTable
        ref="artTableRef"
        :data="tableData"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
      >
        <template #default>
          <ElTableColumn type="selection" width="55" />
        </template>
        <!-- 风险分析列 -->
        <template #riskAnalysis="{ row }">
          <el-tag
            v-for="risk in row.riskAnalysis"
            :key="risk"
            size="small"
            class="risk-tag"
          >
            {{ getRiskLabel(risk) }}
          </el-tag>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
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
            v-if="row.status === 'pending'"
            type="primary"
            link
            size="small"
            @click.stop="handleAudit(row)"
          >
            审核
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

    <!-- 审核弹窗 -->
    <AuditDialog
      v-model="auditDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 批量审核弹窗 -->
    <BatchAuditDialog
      v-model="batchAuditDialogVisible"
      :selected-count="selectedRows.length"
      @success="handleBatchAuditSuccess"
    />

    <!-- 导入弹窗 -->
    <ImportDialog
      v-model="importDialogVisible"
      @success="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ConfinedSpacePage' })

import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Upload, Download, CircleCheck } from '@element-plus/icons-vue'
import {
  getConfinedSpaceList,
  exportConfinedSpace,
  deleteConfinedSpace,
  getStationList,
  getStructureList
} from '@/api/confined-space'
import type { ConfinedSpace, ConfinedSpaceQueryParams } from '@/types/confined-space'
import { AuditStatus, RiskTypeLabels, AuditStatusLabels } from '@/types/confined-space'
import EditDialog from './components/EditDialog.vue'
import DetailDialog from './components/DetailDialog.vue'
import AuditDialog from './components/AuditDialog.vue'
import BatchAuditDialog from './components/BatchAuditDialog.vue'
import ImportDialog from './components/ImportDialog.vue'

// 搜索表单
const searchForm = reactive({
  stationId: undefined as number | undefined,
  code: undefined as number | undefined,
  structure: '',
  status: '',
  riskAnalysis: [] as string[],
  createMonth: ''
})

// 厂站选项
const stationOptions = ref<Array<{ label: string; value: number }>>([])
// 构筑物选项
const structureOptions = ref<Array<{ label: string; value: string }>>([])

// 搜索项配置
const searchItems = [
  {
    type: 'select',
    prop: 'stationId',
    label: '所属厂站',
    placeholder: '请选择厂站',
    options: stationOptions,
    clearable: true
  },
  {
    type: 'input',
    prop: 'code',
    label: '有限空间编号',
    placeholder: '请输入编号',
    clearable: true
  },
  {
    type: 'select',
    prop: 'structure',
    label: '所在部位（构筑物）',
    placeholder: '请选择构筑物',
    options: structureOptions,
    clearable: true
  },
  {
    type: 'select',
    prop: 'status',
    label: '状态',
    placeholder: '请选择状态',
    options: [
      { label: '待审核', value: AuditStatus.PENDING },
      { label: '已审核', value: AuditStatus.APPROVED }
    ],
    clearable: true
  },
  {
    type: 'select',
    prop: 'riskAnalysis',
    label: '主要风险分析',
    placeholder: '请选择风险类型',
    options: [
      { label: '缺氧', value: 'hypoxia' },
      { label: '臭气', value: 'odor' },
      { label: '中毒', value: 'poisoning' },
      { label: '窒息', value: 'asphyxiation' }
    ],
    multiple: true,
    clearable: true
  },
  {
    type: 'month',
    prop: 'createMonth',
    label: '填报月份',
    placeholder: '请选择月份',
    clearable: true,
    valueFormat: 'YYYY-MM'
  }
]

// 表格数据
const tableData = ref<ConfinedSpace[]>([])
const loading = ref(false)
// 选中的行
const selectedRows = ref<ConfinedSpace[]>([])
// ArtTable ref
const artTableRef = ref()

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 表格列配置
const columns = [
  { prop: 'stationName', label: '所属厂站', minWidth: 140 },
  { prop: 'code', label: '有限空间编号', minWidth: 120 },
  { prop: 'structure', label: '所在部位', minWidth: 120 },
  { prop: 'location', label: '具体位置', minWidth: 180, showOverflowTooltip: true },
  { prop: 'status', label: '状态', minWidth: 90, useSlot: true },
  { prop: 'riskAnalysis', label: '主要风险分析', minWidth: 160, useSlot: true },
  { prop: 'riskControlMeasures', label: '风险管控措施', minWidth: 200, showOverflowTooltip: true },
  { prop: 'responsiblePerson', label: '责任人', minWidth: 100 },
  { prop: 'createBy', label: '填报人', minWidth: 100 },
  { prop: 'createTime', label: '填报时间', minWidth: 160 },
  { prop: 'operation', label: '操作', minWidth: 240, fixed: 'right', useSlot: true }
]

// 弹窗控制
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const auditDialogVisible = ref(false)
const batchAuditDialogVisible = ref(false)
const importDialogVisible = ref(false)
const currentRow = ref<ConfinedSpace | null>(null)

// 获取风险标签
const getRiskLabel = (risk: string) => {
  return RiskTypeLabels[risk as keyof typeof RiskTypeLabels] || risk
}

// 获取状态类型
const getStatusType = (status: AuditStatus) => {
  const typeMap: Record<string, string> = {
    [AuditStatus.PENDING]: 'warning',
    [AuditStatus.APPROVED]: 'success'
  }
  return typeMap[status] || 'info'
}

// 获取状态标签
const getStatusLabel = (status: AuditStatus) => {
  return AuditStatusLabels[status] || status
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

// 获取构筑物列表
const fetchStructureList = async () => {
  try {
    const res = await getStructureList()
    structureOptions.value = res.data.map(item => ({
      label: item.name,
      value: item.name
    }))
  } catch (error) {
    console.error('获取构筑物列表失败:', error)
  }
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params: ConfinedSpaceQueryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      stationId: searchForm.stationId,
      code: searchForm.code,
      structure: searchForm.structure || undefined,
      status: searchForm.status as AuditStatus || undefined,
      riskAnalysis: searchForm.riskAnalysis as any || undefined,
      createMonth: searchForm.createMonth || undefined
    }
    const res = await getConfinedSpaceList(params)
    tableData.value = res.data.list
    pagination.total = res.data.total
  } catch (error) {
    console.error('获取有限空间台账列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  selectedRows.value = []
  fetchData()
}

// 重置
const handleReset = () => {
  searchForm.stationId = undefined
  searchForm.code = undefined
  searchForm.structure = ''
  searchForm.status = ''
  searchForm.riskAnalysis = []
  searchForm.createMonth = ''
  pagination.currentPage = 1
  selectedRows.value = []
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
const handleRowClick = (row: ConfinedSpace) => {
  handleDetail(row)
}

// 选择变化
const handleSelectionChange = (selection: ConfinedSpace[]) => {
  selectedRows.value = selection
}

// 新增
const handleAdd = () => {
  currentRow.value = null
  editDialogVisible.value = true
}

// 编辑
const handleEdit = (row: ConfinedSpace) => {
  currentRow.value = row
  editDialogVisible.value = true
}

// 详情
const handleDetail = (row: ConfinedSpace) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 审核
const handleAudit = (row: ConfinedSpace) => {
  currentRow.value = row
  auditDialogVisible.value = true
}

// 批量审核
const handleBatchAudit = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择要审核的记录')
    return
  }
  batchAuditDialogVisible.value = true
}

// 批量审核成功
const handleBatchAuditSuccess = () => {
  selectedRows.value = []
  handleSearch()
}

// 删除
const handleDelete = async (row: ConfinedSpace) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除编号为 "${row.code}" 的有限空间台账吗？`,
      '提示',
      { type: 'warning' }
    )
    await deleteConfinedSpace(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
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
    const blob = await exportConfinedSpace()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `有限空间台账_${new Date().toLocaleDateString()}.xlsx`
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
  console.log('ConfinedSpace page mounted')
  fetchStationList()
  fetchStructureList()
  fetchData()
})
</script>

<style scoped lang="scss">
.confined-space-page {
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

  .risk-tag {
    margin-right: 4px;
    margin-bottom: 2px;
  }
}
</style>
