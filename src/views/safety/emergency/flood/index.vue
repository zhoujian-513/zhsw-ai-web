<template>
  <div class="flood-prevention-page">
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
          <span>防汛专项管理</span>
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
        <!-- 防汛工程数量列 -->
        <template #projectDetailCount="{ row }">
          <el-tag type="info" effect="light">
            {{ row.projectDetails?.length || 0 }} 个工程
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
import { getFloodPreventionList, deleteFloodPrevention, exportFloodPrevention, getProjectList } from '@/api/flood-prevention'
import type { FloodPrevention, FloodPreventionQueryParams } from '@/types/flood-prevention'
import EditDialog from './components/EditDialog.vue'
import DetailDialog from './components/DetailDialog.vue'
import ImportDialog from './components/ImportDialog.vue'

// 搜索表单
const searchForm = reactive({
  projectId: undefined as number | undefined,
  keyword: '',
  regionCompany: ''
})

// 项目列表（用于下拉选择）
const projectList = ref<Array<{ id: number; name: string }>>([])

// 搜索项配置
const searchItems = [
  {
    type: 'select',
    prop: 'projectId',
    label: '项目名称',
    placeholder: '请选择项目',
    options: projectList,
    clearable: true
  },
  {
    type: 'input',
    prop: 'keyword',
    label: '关键词',
    placeholder: '请输入项目名称或所在地',
    clearable: true
  },
  {
    type: 'select',
    prop: 'regionCompany',
    label: '所属区域公司',
    placeholder: '请选择所属区域公司',
    options: [
      { label: '深圳区域公司', value: '深圳区域公司' },
      { label: '广州区域公司', value: '广州区域公司' },
      { label: '东莞区域公司', value: '东莞区域公司' },
      { label: '佛山区域公司', value: '佛山区域公司' },
      { label: '中山区域公司', value: '中山区域公司' },
      { label: '珠海区域公司', value: '珠海区域公司' },
      { label: '惠州区域公司', value: '惠州区域公司' }
    ],
    clearable: true
  }
]

// 表格数据
const tableData = ref<FloodPrevention[]>([])
const loading = ref(false)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

// 表格列配置
const columns = [
  { prop: 'projectName', label: '项目名称', minWidth: 200 },
  { prop: 'location', label: '所在地', minWidth: 180 },
  { prop: 'regionCompany', label: '所属区域公司', minWidth: 140 },
  { prop: 'projectDetailCount', label: '防汛工程数量', minWidth: 120, useSlot: true },
  { prop: 'createBy', label: '创建人', minWidth: 100 },
  { prop: 'createTime', label: '创建时间', minWidth: 160 },
  { prop: 'updateTime', label: '更新时间', minWidth: 160 },
  { prop: 'operation', label: '操作', minWidth: 200, fixed: 'right', useSlot: true }
]

// 弹窗控制
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const importDialogVisible = ref(false)
const currentRow = ref<FloodPrevention | null>(null)

// 获取项目列表
const fetchProjectList = async () => {
  try {
    const res = await getProjectList()
    projectList.value = res.data.map(item => ({
      id: item.id,
      name: item.name
    }))
  } catch (error) {
    console.error('获取项目列表失败:', error)
  }
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params: FloodPreventionQueryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      projectId: searchForm.projectId,
      keyword: searchForm.keyword || undefined,
      regionCompany: searchForm.regionCompany || undefined
    }
    const res = await getFloodPreventionList(params)
    tableData.value = res.data.list
    pagination.total = res.data.total
  } catch (error) {
    console.error('获取防汛专项管理列表失败:', error)
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
  searchForm.projectId = undefined
  searchForm.keyword = ''
  searchForm.regionCompany = ''
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
const handleRowClick = (row: FloodPrevention) => {
  handleDetail(row)
}

// 新增
const handleAdd = () => {
  currentRow.value = null
  editDialogVisible.value = true
}

// 编辑
const handleEdit = (row: FloodPrevention) => {
  currentRow.value = row
  editDialogVisible.value = true
}

// 详情
const handleDetail = (row: FloodPrevention) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 删除
const handleDelete = async (row: FloodPrevention) => {
  try {
    await ElMessageBox.confirm('确定要删除该防汛专项管理记录吗？', '提示', {
      type: 'warning'
    })
    await deleteFloodPrevention(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
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
    const blob = await exportFloodPrevention()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `防汛专项管理_${new Date().toLocaleDateString()}.xlsx`
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
  fetchProjectList()
  fetchData()
})
</script>

<style scoped lang="scss">
.flood-prevention-page {
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
