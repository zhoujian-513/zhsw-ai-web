<template>
  <div class="page-container">
    <!-- 筛选卡片 -->
    <ElCard shadow="never" class="filter-card">
      <ElForm :model="filterForm">
        <div class="filter-form-content">
          <ElFormItem label="所属单位">
            <ElSelect v-model="filterForm.belongingUnit" placeholder="请选择" clearable style="width: 200px">
              <ElOption v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="编号">
            <ElInput v-model="filterForm.confinedSpaceNumber" placeholder="请输入" clearable style="width: 180px" />
          </ElFormItem>
          <ElFormItem label="状态">
            <ElSelect v-model="filterForm.status" placeholder="请选择" clearable style="width: 120px">
              <ElOption label="未审核" value="0" />
              <ElOption label="已审核" value="1" />
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
          <span>有限空间列表（共 {{ total }} 条）</span>
          <div class="header-buttons">
            <ElButton type="primary" @click="handleAdd">
              <ElIcon><Plus /></ElIcon>
              新增
            </ElButton>
            <ElButton @click="handleExport">导出</ElButton>
          </div>
        </div>
      </template>
      <div class="table-container">
        <ElTable :data="tableData" height="100%" v-loading="loading">
          <ElTableColumn prop="confinedSpaceNumber" label="有限空间编号" width="120" fixed="left" />
          <ElTableColumn prop="belongingUnit" label="所属单位" min-width="150" show-overflow-tooltip />
          <ElTableColumn prop="locationStructure" label="所在部位" width="150" show-overflow-tooltip />
          <ElTableColumn prop="specificLocation" label="具体位置" min-width="150" show-overflow-tooltip />
          <ElTableColumn prop="mainRiskAnalysis" label="主要风险" width="180">
            <template #default="{ row }">
              <div class="risk-tags">
                <ElTag v-for="risk in row.mainRiskAnalysis" :key="risk" size="small" type="danger" effect="plain" class="risk-tag">
                  {{ risk }}
                </ElTag>
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="responsiblePerson" label="责任人" width="100" align="center" />
          <ElTableColumn prop="filler" label="填报人" width="100" align="center" />
          <ElTableColumn prop="fillingTime" label="填报时间" width="160" align="center" />
          <ElTableColumn prop="status" label="状态" width="100" align="center">
            <template #default="{ row }">
              <ElTag :type="statusTagType(row.status)" size="small">{{ statusText(row.status) }}</ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="220" align="center" fixed="right">
            <template #default="{ row }">
              <ElButton link type="primary" @click="handleView(row)">详情</ElButton>
              <ElButton v-if="row.status === 0" link type="warning" @click="handleAudit(row)">审核</ElButton>
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
        @change="loadData"
      />
    </ElCard>

    <!-- 新增 / 编辑弹窗 -->
    <ElDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="680px"
      destroy-on-close
      @close="resetForm"
    >
      <ElForm
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="110px"
        label-position="right"
      >
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="所属单位" prop="belongingUnit">
              <ElSelect v-model="form.belongingUnit" placeholder="请选择" style="width: 100%">
                <ElOption v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="空间编号" prop="confinedSpaceNumber">
              <ElInput v-model="form.confinedSpaceNumber" placeholder="请输入" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="所在部位" prop="locationStructure">
              <ElSelect v-model="form.locationStructure" placeholder="请选择" style="width: 100%">
                <ElOption v-for="item in structureOptions" :key="item.value" :label="item.label" :value="item.value" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="责任人" prop="responsiblePerson">
              <ElInput v-model="form.responsiblePerson" placeholder="请输入" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="24">
            <ElFormItem label="具体位置" prop="specificLocation">
              <ElInput v-model="form.specificLocation" placeholder="请输入" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="24">
            <ElFormItem label="主要风险" prop="mainRiskAnalysis">
              <ElCheckboxGroup v-model="form.mainRiskAnalysis">
                <ElCheckbox v-for="item in riskOptions" :key="item.value" :label="item.value">
                  {{ item.label }}
                </ElCheckbox>
              </ElCheckboxGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="24">
            <ElFormItem label="管控措施" prop="riskControlMeasures">
              <ElInput v-model="form.riskControlMeasures" type="textarea" :rows="3" placeholder="请输入" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="24">
            <ElFormItem label="备注">
              <ElInput v-model="form.remark" type="textarea" :rows="2" placeholder="请输入" />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" :loading="submitLoading" @click="handleSubmit">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 审核弹窗 -->
    <ElDialog v-model="auditVisible" title="有限空间台账审核" width="500px" destroy-on-close>
      <ElForm :model="auditForm" label-width="80px">
        <ElFormItem label="审核结果">
          <ElRadioGroup v-model="auditForm.pass">
            <ElRadio :label="true">通过</ElRadio>
            <ElRadio :label="false">不通过</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="审核意见">
          <ElInput v-model="auditForm.auditOpinion" type="textarea" :rows="3" placeholder="请输入审核意见" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="auditVisible = false">取消</ElButton>
        <ElButton type="primary" :loading="auditLoading" @click="submitAudit">提交</ElButton>
      </template>
    </ElDialog>

    <!-- 详情弹窗 -->
    <ElDialog v-model="detailVisible" title="有限空间详情" width="750px" destroy-on-close>
      <ElDescriptions :column="2" border>
        <ElDescriptionsItem label="所属单位">{{ detailData.belongingUnit }}</ElDescriptionsItem>
        <ElDescriptionsItem label="有限空间编号">{{ detailData.confinedSpaceNumber }}</ElDescriptionsItem>
        <ElDescriptionsItem label="所在部位">{{ detailData.locationStructure }}</ElDescriptionsItem>
        <ElDescriptionsItem label="责任人">{{ detailData.responsiblePerson }}</ElDescriptionsItem>
        <ElDescriptionsItem label="具体位置" :span="2">{{ detailData.specificLocation }}</ElDescriptionsItem>
        <ElDescriptionsItem label="主要风险" :span="2">
          <div class="risk-tags">
            <ElTag v-for="risk in detailData.mainRiskAnalysis" :key="risk" size="small" type="danger" class="risk-tag">
              {{ risk }}
            </ElTag>
          </div>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="风险管控措施" :span="2">{{ detailData.riskControlMeasures }}</ElDescriptionsItem>
        <ElDescriptionsItem label="填报人">{{ detailData.filler }}</ElDescriptionsItem>
        <ElDescriptionsItem label="填报时间">{{ detailData.fillingTime }}</ElDescriptionsItem>
        <ElDescriptionsItem label="审核人">{{ detailData.auditor || '-' }}</ElDescriptionsItem>
        <ElDescriptionsItem label="审核时间">{{ detailData.auditTime || '-' }}</ElDescriptionsItem>
        <ElDescriptionsItem label="审核意见" :span="2">{{ detailData.auditOpinion || '-' }}</ElDescriptionsItem>
        <ElDescriptionsItem label="状态">
          <ElTag :type="statusTagType(detailData.status || 0)" size="small">{{ statusText(detailData.status || 0) }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="备注" :span="2">{{ detailData.remark || '-' }}</ElDescriptionsItem>
      </ElDescriptions>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { ConfinedSpaceItem } from '@/types/confined-space'
import {
  getConfinedSpaceList,
  addConfinedSpace,
  updateConfinedSpace,
  deleteConfinedSpace
} from '@/api/confined-space'
import { getDepartmentList } from '@/api/organization'

defineOptions({ name: 'SafetyConfinedSpace' })

// ==================== 选项数据 ====================
const deptOptions = ref<{ label: string; value: string }[]>([])
const structureOptions = [
  { label: '泵站湿井', value: '泵站湿井' },
  { label: '格栅间地下室', value: '格栅间地下室' },
  { label: '初沉池排泥管道', value: '初沉池排泥管道' },
  { label: '曝气池检修通道', value: '曝气池检修通道' }
]
const riskOptions = [
  { label: '缺氧', value: '缺氧' },
  { label: '臭气', value: '臭气' },
  { label: '中毒', value: '中毒' },
  { label: '窒息', value: '窒息' }
]

async function loadDeptOptions() {
  try {
    const res = await getDepartmentList()
    deptOptions.value = res.data.map((item: any) => ({
      label: item.name,
      value: item.name
    }))
  } catch (error) {
    console.error('加载部门列表失败', error)
  }
}

// ==================== 筛选 ====================
const filterForm = reactive({
  belongingUnit: '',
  confinedSpaceNumber: '',
  status: '' as any
})

// ==================== 表格 ====================
const loading = ref(false)
const tableData = ref<ConfinedSpaceItem[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)

async function loadData() {
  loading.value = true
  try {
    const res = await getConfinedSpaceList({
      ...filterForm,
      page: currentPage.value,
      pageSize: pageSize.value
    })
    tableData.value = res.data.list
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  currentPage.value = 1
  loadData()
}

function handleReset() {
  filterForm.belongingUnit = ''
  filterForm.confinedSpaceNumber = ''
  filterForm.status = ''
  currentPage.value = 1
  loadData()
}

// ==================== Tag 样式 ====================
function statusTagType(status: number): 'primary' | 'success' | 'info' | 'warning' | 'danger' {
  return status === 1 ? 'success' : 'info'
}

function statusText(status: number): string {
  return status === 1 ? '已审核' : '未审核'
}

// ==================== 新增 / 编辑 ====================
const dialogVisible = ref(false)
const dialogTitle = ref('新增有限空间')
const submitLoading = ref(false)
const formRef = ref<FormInstance>()
const isEdit = ref(false)

const defaultForm = (): Partial<ConfinedSpaceItem> => ({
  belongingUnit: '',
  confinedSpaceNumber: '',
  locationStructure: '',
  specificLocation: '',
  mainRiskAnalysis: [],
  riskControlMeasures: '',
  responsiblePerson: '',
  status: 0,
  remark: ''
})

const form = reactive<Partial<ConfinedSpaceItem>>(defaultForm())

const formRules: FormRules = {
  belongingUnit: [{ required: true, message: '请选择所属单位', trigger: 'change' }],
  confinedSpaceNumber: [{ required: true, message: '请输入有限空间编号', trigger: 'blur' }],
  locationStructure: [{ required: true, message: '请选择所在部位', trigger: 'change' }],
  specificLocation: [{ required: true, message: '请输入具体位置', trigger: 'blur' }],
  mainRiskAnalysis: [{ required: true, type: 'array', min: 1, message: '请至少选择一个主要风险', trigger: 'change' }],
  responsiblePerson: [{ required: true, message: '请输入责任人', trigger: 'blur' }]
}

function handleAdd() {
  isEdit.value = false
  dialogTitle.value = '新增有限空间'
  Object.assign(form, defaultForm())
  dialogVisible.value = true
}

function handleEdit(row: ConfinedSpaceItem) {
  isEdit.value = true
  dialogTitle.value = '编辑有限空间'
  Object.assign(form, { ...row })
  dialogVisible.value = true
}

function resetForm() {
  formRef.value?.resetFields()
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate()
  submitLoading.value = true
  try {
    const data = { ...form }
    if (!isEdit.value) {
      data.filler = '当前用户' // 实际开发中从 store 获取
      data.fillingTime = new Date().toLocaleString('zh-CN')
    }
    if (isEdit.value) {
      await updateConfinedSpace(data)
      ElMessage.success('编辑成功')
    } else {
      await addConfinedSpace(data)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    loadData()
  } finally {
    submitLoading.value = false
  }
}

// ==================== 审核 ====================
const auditVisible = ref(false)
const auditForm = reactive({
  id: 0,
  auditOpinion: '',
  pass: true
})
const auditLoading = ref(false)

function handleAudit(row: ConfinedSpaceItem) {
  auditForm.id = row.id
  auditForm.auditOpinion = ''
  auditForm.pass = true
  auditVisible.value = true
}

async function submitAudit() {
  auditLoading.value = true
  try {
    const status = auditForm.pass ? 1 : 0
    await updateConfinedSpace({
      id: auditForm.id,
      status,
      auditOpinion: auditForm.auditOpinion,
      auditor: '审核员', // 实际开发中从 store 获取
      auditTime: new Date().toLocaleString('zh-CN')
    })
    ElMessage.success('审核操作成功')
    auditVisible.value = false
    loadData()
  } finally {
    auditLoading.value = false
  }
}

// ==================== 详情 ====================
const detailVisible = ref(false)
const detailData = reactive<Partial<ConfinedSpaceItem>>({})

function handleView(row: ConfinedSpaceItem) {
  Object.assign(detailData, row)
  detailVisible.value = true
}

// ==================== 删除 ====================
function handleDelete(row: ConfinedSpaceItem) {
  ElMessageBox.confirm(`确定删除编号为「${row.confinedSpaceNumber}」的记录？删除后不可恢复。`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteConfinedSpace(row.id)
    ElMessage.success('删除成功')
    loadData()
  })
}

// ==================== 导出 ====================
function handleExport() {
  ElMessage.info('导出功能开发中')
}

// ==================== 初始化 ====================
onMounted(() => {
  loadDeptOptions()
  loadData()
})
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

.risk-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.risk-tag {
  margin-bottom: 2px;
}

.warn-date {
  color: var(--el-color-danger);
  font-weight: 500;
}
</style>
