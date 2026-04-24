<template>
  <div class="project-info-page">
    <!-- 搜索栏 -->
    <ElCard shadow="never" class="filter-card">
      <div class="search-bar">
        <el-select
          v-model="searchForm.responsibleUnitId"
          placeholder="项目责任单位"
          clearable
          style="width: 180px"
        >
          <el-option
            v-for="item in unitOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-input
          v-model="searchForm.name"
          placeholder="项目名称"
          clearable
          style="width: 180px"
        />
        <el-select
          v-model="searchForm.status"
          placeholder="项目状态"
          clearable
          style="width: 150px"
        >
          <el-option
            v-for="item in PROJECT_STATUS_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button @click="handleReset">清空</el-button>
        <el-button type="primary" @click="handleSearch">展开</el-button>
      </div>
    </ElCard>

    <!-- 操作栏 -->
    <div class="operation-bar">
      <el-checkbox v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
      <div class="operation-buttons">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>新增
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>批量删除
        </el-button>
      </div>
    </div>

    <!-- 项目列表 -->
    <div v-if="tableData.length === 0" class="empty-state">
      <el-empty description="暂无数据" />
    </div>
    <div v-else class="project-list">
      <div
        v-for="item in tableData"
        :key="item.id"
        class="project-card"
        :class="{ 'is-selected': selectedIds.includes(item.id) }"
        @click="handleCardClick(item)"
      >
        <div class="card-header">
          <div class="header-left">
            <el-checkbox
              v-model="selectedIds"
              :label="item.id"
              @click.stop
            />
            <span class="project-name">{{ item.name }}</span>
            <el-tag type="success" size="small" class="status-tag">{{ item.statusName }}</el-tag>
          </div>
          <div class="header-right">
            <el-tag v-if="item.isSubmitted" type="info" size="small" class="submit-tag">已提交</el-tag>
            <el-tag v-else type="warning" size="small" class="submit-tag">未提交</el-tag>
            <el-button type="primary" link size="small" @click.stop="handleView(item)">
              查看
            </el-button>
            <el-button type="primary" link size="small" @click.stop="handleEdit(item)">
              编辑
            </el-button>
          </div>
        </div>
        <div class="card-body">
          <div class="info-row">
            <div class="info-item">
              <span class="label">项目类型、规模：</span>
              <span class="value">发电业务/{{ item.powerBusinessType }}(直流侧功率:{{ item.dcPower }}MWp 交流侧功率:{{ item.acPower }}MW)</span>
            </div>
            <div class="info-item">
              <span class="label">项目责任单位：</span>
              <span class="value">{{ item.responsibleUnit }}</span>
            </div>
            <div class="info-item">
              <span class="label">联系人：</span>
              <span class="value">{{ item.contactPerson }}</span>
            </div>
            <div class="info-item">
              <span class="label">联系人电话：</span>
              <span class="value">{{ item.contactPhone }}</span>
            </div>
          </div>
          <div class="info-row">
            <div class="info-item">
              <span class="label">项目地点：</span>
              <span class="value">{{ item.address }}</span>
            </div>
            <div class="info-item">
              <span class="label">开工时间：</span>
              <span class="value">{{ item.startDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">投产时间：</span>
              <span class="value">{{ item.productionDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑弹窗 -->
    <ProjectEditDialog
      v-model="editDialogVisible"
      :data="currentRow"
      @success="handleSearch"
    />

    <!-- 详情弹窗 -->
    <ProjectDetailDialog
      v-model="detailDialogVisible"
      :data="currentRow"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import {
  getProjectInfoList,
  deleteProjectInfo,
  getResponsibleUnitList
} from '@/api/project-info'
import { PROJECT_STATUS_OPTIONS } from '@/types/project-info'
import type { ProjectInfo, ProjectInfoQueryParams } from '@/types/project-info'
import ProjectEditDialog from './components/ProjectEditDialog.vue'
import ProjectDetailDialog from './components/ProjectDetailDialog.vue'

// 搜索表单
const searchForm = reactive({
  responsibleUnitId: undefined as number | undefined,
  name: '',
  status: ''
})

// 责任单位选项
const unitOptions = ref<Array<{ id: number; name: string }>>([])

// 表格数据
const tableData = ref<ProjectInfo[]>([])
const loading = ref(false)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 50,
  total: 0
})

// 选择相关
const selectAll = ref(false)
const selectedIds = ref<number[]>([])

// 弹窗控制
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const currentRow = ref<ProjectInfo | null>(null)

// 获取责任单位列表
const fetchUnitList = async () => {
  try {
    const res = await getResponsibleUnitList()
    unitOptions.value = res.data
  } catch (error) {
    console.error('获取责任单位列表失败:', error)
  }
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params: ProjectInfoQueryParams = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      responsibleUnitId: searchForm.responsibleUnitId,
      name: searchForm.name || undefined,
      status: searchForm.status || undefined
    }
    const res = await getProjectInfoList(params)
    tableData.value = res.data.list || []
    pagination.total = res.data.total || 0
  } catch (error) {
    console.error('获取项目列表失败:', error)
    ElMessage.error('获取项目列表失败')
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
  searchForm.responsibleUnitId = undefined
  searchForm.name = ''
  searchForm.status = ''
  pagination.currentPage = 1
  fetchData()
}

// 分页变化
const handleCurrentChange = (page: number) => {
  pagination.currentPage = page
  fetchData()
}

// 每页条数变化
const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  fetchData()
}

// 全选
const handleSelectAll = (val: boolean) => {
  if (val) {
    selectedIds.value = tableData.value.map(item => item.id)
  } else {
    selectedIds.value = []
  }
}

// 卡片点击
const handleCardClick = (row: ProjectInfo) => {
  const index = selectedIds.value.indexOf(row.id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(row.id)
  }
}

// 新增
const handleAdd = () => {
  currentRow.value = null
  editDialogVisible.value = true
}

// 编辑
const handleEdit = (row: ProjectInfo) => {
  currentRow.value = row
  editDialogVisible.value = true
}

// 查看
const handleView = (row: ProjectInfo) => {
  currentRow.value = row
  detailDialogVisible.value = true
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的项目')
    return
  }
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedIds.value.length} 个项目吗？`,
      '提示',
      { type: 'warning' }
    )
    for (const id of selectedIds.value) {
      await deleteProjectInfo(id)
    }
    ElMessage.success('删除成功')
    selectedIds.value = []
    fetchData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

onMounted(() => {
  fetchUnitList()
  fetchData()
})
</script>

<style scoped lang="scss">
.project-info-page {
  padding: 16px;

  .filter-card {
    margin-bottom: 16px;

    .search-bar {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  .operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 8px;

    .operation-buttons {
      display: flex;
      gap: 10px;
    }
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .project-card {
      background: #fff;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      &.is-selected {
        border-color: #409eff;
        background-color: #f5f7fa;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e4e7ed;

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;

          .project-name {
            font-size: 16px;
            font-weight: 600;
            color: #1890ff;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }

          .status-tag {
            margin-left: 8px;
          }
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;

          .submit-tag {
            margin-right: 8px;
          }
        }
      }

      .card-body {
        .info-row {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }

          .info-item {
            display: flex;
            align-items: center;

            .label {
              color: #909399;
              font-size: 13px;
            }

            .value {
              color: #606266;
              font-size: 13px;
            }
          }
        }
      }
    }
  }

  .pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .empty-state {
    padding: 60px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
  }
}
</style>
