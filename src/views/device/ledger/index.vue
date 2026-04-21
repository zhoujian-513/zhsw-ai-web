<template>
  <div class="page-container">
    <!-- 筛选卡片 -->
    <ElCard shadow="never" class="filter-card">
      <ElForm :model="filterForm">
        <div class="filter-form-content">
          <ElFormItem label="设备编码">
            <ElInput v-model="filterForm.code" placeholder="请输入" clearable style="width: 180px" />
          </ElFormItem>
          <ElFormItem label="设备名称">
            <ElInput v-model="filterForm.name" placeholder="请输入" clearable style="width: 180px" />
          </ElFormItem>
          <ElFormItem label="设备类别">
            <ElSelect v-model="filterForm.category" placeholder="请选择" clearable style="width: 140px">
              <ElOption label="水泵" value="水泵" />
              <ElOption label="阀门" value="阀门" />
              <ElOption label="流量计" value="流量计" />
              <ElOption label="变频器" value="变频器" />
              <ElOption label="压力表" value="压力表" />
              <ElOption label="电动机" value="电动机" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="运行状态">
            <ElSelect v-model="filterForm.status" placeholder="请选择" clearable style="width: 120px">
              <ElOption label="运行" value="运行" />
              <ElOption label="停机" value="停机" />
              <ElOption label="维修" value="维修" />
              <ElOption label="备用" value="备用" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label=" ">
            <div class="filter-buttons">
              <ElButton type="primary" @click="handleSearch">查询</ElButton>
              <ElButton @click="handleReset">重置</ElButton>
            </div>
          </ElFormItem>
        </div>
      </ElForm>
    </ElCard>

    <!-- 数据卡片 -->
    <ElCard shadow="never" class="data-card">
      <template #header>
        <div class="card-header">
          <span>设备列表（共 {{ total }} 条）</span>
          <div class="header-buttons">
            <ElButton type="primary" @click="handleAdd">
              <ElIcon><Plus /></ElIcon>
              新增设备
            </ElButton>
            <ElButton @click="handleExport">导出</ElButton>
          </div>
        </div>
      </template>
      <div class="table-container">
        <ElTable :data="pageList" height="100%">
          <ElTableColumn prop="code" label="设备编码" width="160" fixed="left" />
          <ElTableColumn prop="name" label="设备名称" min-width="120" />
          <ElTableColumn prop="category" label="设备类别" width="100" align="center" />
          <ElTableColumn prop="spec" label="规格型号" width="150" />
          <ElTableColumn prop="ratedPower" label="额定功率(kW)" width="130" align="center">
            <template #default="{ row }">
              <span>{{ row.ratedPower || '-' }}</span>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="location" label="安装位置" min-width="120" />
          <ElTableColumn prop="manufacturer" label="制造商" min-width="120" />
          <ElTableColumn prop="installDate" label="投用日期" width="110" align="center" />
          <ElTableColumn prop="maintainCycle" label="保养周期" width="100" align="center" />
          <ElTableColumn prop="nextMaintainDate" label="下次保养" width="110" align="center">
            <template #default="{ row }">
              <span :class="{ 'warn-date': isNearMaintain(row.nextMaintainDate) }">
                {{ row.nextMaintainDate }}
              </span>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="owner" label="负责人" width="90" align="center" />
          <ElTableColumn prop="status" label="运行状态" width="90" align="center" fixed="right">
            <template #default="{ row }">
              <ElTag :type="statusTagType(row.status)" size="small">{{ row.status }}</ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="160" align="center" fixed="right">
            <template #default="{ row }">
              <ElButton link type="primary" @click="handleView(row)">详情</ElButton>
              <ElButton link @click="handleEdit(row)">编辑</ElButton>
              <ElButton link type="danger" @click="handleDelete(row)">删除</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @change="handlePageChange"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

defineOptions({ name: 'DeviceLedger' })

const filterForm = reactive({ code: '', name: '', category: '', status: '' })
const currentPage = ref(1)
const pageSize = ref(20)

const allData = [
  { id: 1, code: 'SB-2021-001', name: '1号主泵', category: '水泵', spec: 'IS150-125-400', ratedPower: 75, location: '一泵站', manufacturer: '上海凯泉', installDate: '2021-03-15', maintainCycle: '季度', nextMaintainDate: '2026-04-01', owner: '张伟', status: '运行' },
  { id: 2, code: 'SB-2021-002', name: '2号主泵', category: '水泵', spec: 'IS150-125-400', ratedPower: 75, location: '一泵站', manufacturer: '上海凯泉', installDate: '2021-03-15', maintainCycle: '季度', nextMaintainDate: '2026-04-01', owner: '张伟', status: '运行' },
  { id: 3, code: 'SB-2021-003', name: '3号备用泵', category: '水泵', spec: 'IS150-125-400', ratedPower: 75, location: '一泵站', manufacturer: '上海凯泉', installDate: '2021-06-20', maintainCycle: '季度', nextMaintainDate: '2026-03-20', owner: '张伟', status: '停机' },
  { id: 4, code: 'FM-2021-001', name: '进水闸阀', category: '阀门', spec: 'Z941H-16C DN400', ratedPower: 0, location: '取水口', manufacturer: '大连大高', installDate: '2021-04-01', maintainCycle: '半年', nextMaintainDate: '2026-06-01', owner: '李明', status: '运行' },
  { id: 5, code: 'FM-2021-002', name: '出水蝶阀', category: '阀门', spec: 'D941X-10 DN500', ratedPower: 0, location: '出水管道', manufacturer: '大连大高', installDate: '2021-04-01', maintainCycle: '半年', nextMaintainDate: '2026-06-01', owner: '李明', status: '运行' },
  { id: 6, code: 'LLJ-2021-001', name: '主管流量计', category: '流量计', spec: 'LUGB-DN500', ratedPower: 0, location: '出水管', manufacturer: '横河电机', installDate: '2021-04-10', maintainCycle: '年度', nextMaintainDate: '2026-04-10', owner: '王芳', status: '运行' },
  { id: 7, code: 'LLJ-2021-002', name: '支管流量计', category: '流量计', spec: 'LUGB-DN300', ratedPower: 0, location: '支管1', manufacturer: '横河电机', installDate: '2021-04-10', maintainCycle: '年度', nextMaintainDate: '2026-04-10', owner: '王芳', status: '运行' },
  { id: 8, code: 'VFD-2021-001', name: '1号变频器', category: '变频器', spec: 'ACS880-75kW', ratedPower: 75, location: '一泵站配电室', manufacturer: 'ABB', installDate: '2021-03-20', maintainCycle: '年度', nextMaintainDate: '2026-03-20', owner: '陈强', status: '运行' },
  { id: 9, code: 'VFD-2021-002', name: '2号变频器', category: '变频器', spec: 'ACS880-75kW', ratedPower: 75, location: '一泵站配电室', manufacturer: 'ABB', installDate: '2021-03-20', maintainCycle: '年度', nextMaintainDate: '2026-03-20', owner: '陈强', status: '运行' },
  { id: 10, code: 'YLB-2021-001', name: '出口压力表', category: '压力表', spec: 'Y-150 0-1.6MPa', ratedPower: 0, location: '出水管', manufacturer: '上海仪表', installDate: '2021-04-15', maintainCycle: '半年', nextMaintainDate: '2026-04-15', owner: '王芳', status: '运行' },
  { id: 11, code: 'DJJ-2021-001', name: '1号电动机', category: '电动机', spec: 'Y2-315M-2 75kW', ratedPower: 75, location: '一泵站', manufacturer: '西门子', installDate: '2021-03-15', maintainCycle: '季度', nextMaintainDate: '2026-04-01', owner: '陈强', status: '运行' },
  { id: 12, code: 'DJJ-2021-002', name: '2号电动机', category: '电动机', spec: 'Y2-315M-2 75kW', ratedPower: 75, location: '一泵站', manufacturer: '西门子', installDate: '2021-03-15', maintainCycle: '季度', nextMaintainDate: '2026-04-01', owner: '陈强', status: '维修' },
  { id: 13, code: 'SB-2022-004', name: '4号加压泵', category: '水泵', spec: 'IS100-65-250', ratedPower: 30, location: '二泵站', manufacturer: '上海凯泉', installDate: '2022-01-10', maintainCycle: '季度', nextMaintainDate: '2026-04-10', owner: '张伟', status: '运行' },
  { id: 14, code: 'SB-2022-005', name: '5号加压泵', category: '水泵', spec: 'IS100-65-250', ratedPower: 30, location: '二泵站', manufacturer: '上海凯泉', installDate: '2022-01-10', maintainCycle: '季度', nextMaintainDate: '2026-04-10', owner: '张伟', status: '备用' },
  { id: 15, code: 'FM-2022-003', name: '排污蝶阀', category: '阀门', spec: 'D341X-10 DN200', ratedPower: 0, location: '排污管', manufacturer: '大连大高', installDate: '2022-03-01', maintainCycle: '半年', nextMaintainDate: '2026-09-01', owner: '李明', status: '运行' },
]

const filteredData = computed(() => {
  let data = [...allData]
  if (filterForm.code) data = data.filter(d => d.code.includes(filterForm.code))
  if (filterForm.name) data = data.filter(d => d.name.includes(filterForm.name))
  if (filterForm.category) data = data.filter(d => d.category === filterForm.category)
  if (filterForm.status) data = data.filter(d => d.status === filterForm.status)
  return data
})

const total = computed(() => filteredData.value.length)

const pageList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

function statusTagType(status: string): 'primary' | 'success' | 'info' | 'warning' | 'danger' {
  const map: Record<string, 'primary' | 'success' | 'info' | 'warning' | 'danger'> = { '运行': 'success', '停机': 'info', '维修': 'danger', '备用': 'warning' }
  return map[status] || 'info'
}

function isNearMaintain(date: string) {
  const diff = new Date(date).getTime() - Date.now()
  return diff >= 0 && diff < 30 * 24 * 60 * 60 * 1000
}

function handleSearch() {
  currentPage.value = 1
}

function handleReset() {
  filterForm.code = ''
  filterForm.name = ''
  filterForm.category = ''
  filterForm.status = ''
  currentPage.value = 1
}

function handlePageChange() {}

function handleAdd() {
  ElMessage.info('新增设备功能开发中')
}

function handleExport() {
  ElMessage.info('导出功能开发中')
}

function handleView(row: any) {
  ElMessage.info(`查看设备：${row.name}`)
}

function handleEdit(row: any) {
  ElMessage.info(`编辑设备：${row.name}`)
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除设备「${row.name}」？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}
</script>

<style scoped lang="scss">
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-card {
  flex-shrink: 0;
  border: none !important;
  box-shadow: none !important;
  border-radius: 12px;

  :deep(.el-card__body) {
    padding: 12px 20px;
  }

  .filter-form-content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .filter-buttons {
    display: flex;

    .el-button:not(:first-child) {
      margin-left: 12px;
    }
  }
}

.data-card {
  flex: 1;
  border: none !important;
  box-shadow: none !important;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.el-card__body) {
    padding: 0 20px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-buttons {
      display: flex;

      .el-button:not(:first-child) {
        margin-left: 12px;
      }
    }
  }

  .table-container {
    flex: 1;
    overflow: hidden;
  }

  .el-pagination {
    flex-shrink: 0;
    margin-top: 16px;
    justify-content: flex-end;
  }
}

.warn-date {
  color: var(--el-color-danger);
  font-weight: 500;
}
</style>
