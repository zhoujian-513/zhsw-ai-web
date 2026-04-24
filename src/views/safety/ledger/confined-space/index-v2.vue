<template>
  <div class="confined-space-page">
    <h2 style="color: red; margin-bottom: 20px;">V2 版本 - 有限空间台账</h2>
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
      />
    </ElCard>

    <!-- 编辑/新增弹窗 -->
    <EditDialog
      v-model="editDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ConfinedSpacePageV2' })

import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  getConfinedSpaceList,
  getStationList
} from '@/api/confined-space'
import type { ConfinedSpace, ConfinedSpaceQueryParams } from '@/types/confined-space'
import { AuditStatus } from '@/types/confined-space'
import EditDialog from './components/EditDialog.vue'

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

// 搜索项配置
const searchItems = [
  {
    type: 'select',
    prop: 'stationId',
    label: '所属厂站',
    placeholder: '请选择厂站',
    options: stationOptions,
    clearable: true
  }
]

// 表格数据
const tableData = ref<ConfinedSpace[]>([])
const loading = ref(false)

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
  { prop: 'responsiblePerson', label: '责任人', minWidth: 100 }
]

// 弹窗控制
const editDialogVisible = ref(false)
const currentRow = ref<ConfinedSpace | null>(null)

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

// 新增
const handleAdd = () => {
  currentRow.value = null
  editDialogVisible.value = true
}

onMounted(() => {
  console.log('ConfinedSpace V2 page mounted')
  fetchStationList()
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
}
</style>
