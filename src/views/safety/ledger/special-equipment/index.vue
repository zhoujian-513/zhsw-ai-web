<template>
  <div class="special-equipment-page">
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
          <span>特种设备台账</span>
          <div class="operation-bar">
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

        <!-- 使用状态列 -->
        <template #usageStatus="{ row }">
          <el-tag :type="row.usageStatus === 'in_use' ? 'success' : 'info'">
            {{ row.usageStatus === 'in_use' ? '在用' : '停用' }}
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
            type="primary"
            link
            size="small"
            @click.stop="handleInspectionRecord(row)"
          >
            校验记录
          </el-button>
        </template>
      </ArtTable>
    </ElCard>

    <!-- 编辑弹窗 -->
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
      :equipment-id="currentRow?.id"
      :equipment-name="currentRow?.name"
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
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Upload, Download } from '@element-plus/icons-vue'
import { getSpecialEquipmentList, exportSpecialEquipment } from '@/api/special-equipment'
import type { SpecialEquipment, SpecialEquipmentQueryParams } from '@/types/special-equipment'
import EditDialog from './components/EditDialog.vue'
import DetailDialog from './components/DetailDialog.vue'
import InspectionRecordDialog from './components/InspectionRecordDialog.vue'
import ImportDialog from './components/ImportDialog.vue'

const router = useRouter()

// 搜索表单
const searchForm = reactive({
  stationId: undefined as number | undefined,
  keyword: '',
  verificationStatus: '',
  usageStatus: ''
})

// 搜索项配置
const searchItems = [
  {
    type: 'select',
    prop: 'stationId',
    label: '所属厂站',
    placeholder: '请选择厂站',
    options: [], // 从API获取
    clearable: true
  },
  {
    type: 'input',
    prop: 'keyword',
    label: '设备名称/编码',
    placeholder: '请输入设备名称或编码',
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
      { label: '已过期', value: 'expired' }
    ],
    clearable: true
  },
  {
    type: 'select',
    prop: 'usageStatus',
    label: '使用状态',
    placeholder: '请选择使用状态',
    options: [
      { label: '在用', value: 'in_use' },
      { label: '停用', value: 'stopped' }
    ],
    clearable: true
  }
]

// 表格数据
const tableData = ref<SpecialEquipment[]>([])
const loading = ref(false)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 表格列配置
const columns = [
  { prop: 'stationName', label: '所属厂站', minWidth: 120 },
  { prop: 'name', label: '设备名称', minWidth: 150 },
  { prop: 'code', label: '设备编码', minWidth: 120 },
  { prop: 'type', label: '设备类型', minWidth: 120 },
  { prop: 'processSection', label: '所属工艺段', minWidth: 120 },
  { prop: 'structure', label: '所属构筑物', minWidth: 120 },
  { prop: 'model', label: '型号规格', minWidth: 120 },
  { prop: 'registrationCode', label: '设备注册代码', minWidth: 150 },
  { prop: 'certificateNo', label: '使用证编号', minWidth: 150 },
  { prop: 'productionDate', label: '生产日期', minWidth: 120 },
  { prop: 'lastInspectionDate', label: '最近一次校验日期', minWidth: 150 },
  { prop: 'nextInspectionDate', label: '下次校验日期', minWidth: 150 },
  { prop: 'verificationStatus', label: '校验状态', minWidth: 100, useSlot: true },
  { prop: 'safetyManager', label: '安全管理责任人', minWidth: 130 },
  { prop: 'operation', label: '操作', minWidth: 200, fixed: 'right', useSlot: true }
]

// 弹窗控制
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const inspectionDialogVisible = ref(false)
const importDialogVisible = ref(false)
const currentRow = ref<SpecialEquipment | null>(null)

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
    expired: '已过期'
  }
  return textMap[status] || status
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params: SpecialEquipmentQueryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      stationId: searchForm.stationId,
      keyword: searchForm.keyword || undefined,
      verificationStatus: searchForm.verificationStatus || undefined,
      usageStatus: searchForm.usageStatus || undefined
    }
    const res = await getSpecialEquipmentList(params)
    tableData.value = res.data.list
    pagination.total = res.data.total
  } catch (error) {
    console.error('获取特种设备列表失败:', error)
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
  searchForm.usageStatus = ''
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
const handleRowClick = (row: SpecialEquipment) => {
  handleDetail(row)
}

// 编辑
const handleEdit = (row: SpecialEquipment) => {
  currentRow.value = row
  editDialogVisible.value = true
}

// 详情
const handleDetail = (row: SpecialEquipment) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 校验记录
const handleInspectionRecord = (row: SpecialEquipment) => {
  currentRow.value = row
  inspectionDialogVisible.value = true
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
    const blob = await exportSpecialEquipment()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `特种设备台账_${new Date().toLocaleDateString()}.xlsx`
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
.special-equipment-page {
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
