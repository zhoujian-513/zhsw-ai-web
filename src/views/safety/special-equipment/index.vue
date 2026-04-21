<template>
  <div class="page-container">
    <!-- 筛选卡片 -->
    <ElCard shadow="never" class="filter-card">
      <ElForm :model="filterForm" inline>
        <ElFormItem label="所属厂站">
          <ElSelect v-model="filterForm.factory" placeholder="请选择" clearable style="width: 180px">
            <ElOption label="城东污水处理厂" value="城东污水处理厂" />
            <ElOption label="城西污水处理厂" value="城西污水处理厂" />
            <ElOption label="中心水厂" value="中心水厂" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="设备名称/编码">
          <ElInput v-model="filterForm.keyword" placeholder="请输入" clearable style="width: 200px" />
        </ElFormItem>
        <ElFormItem label="校验状态">
          <ElSelect v-model="filterForm.inspectionStatus" placeholder="请选择" clearable style="width: 120px">
            <ElOption label="正常" value="正常" />
            <ElOption label="预警" value="预警" />
            <ElOption label="已过期" value="已过期" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="使用状态">
          <ElSelect v-model="filterForm.usageStatus" placeholder="请选择" clearable style="width: 120px">
            <ElOption label="在用" value="在用" />
            <ElOption label="停用" value="停用" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSearch">查询</ElButton>
          <ElButton @click="handleReset">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <!-- 数据卡片 -->
    <ElCard shadow="never" class="data-card">
      <template #header>
        <div class="card-header">
          <span>特种设备列表（共 {{ total }} 条）</span>
          <div class="header-buttons">
            <ElButton type="primary" @click="handleAdd">
              <ElIcon><Plus /></ElIcon>
              新增设备
            </ElButton>
            <ElButton @click="handleBatchImport">批量导入</ElButton>
            <ElButton @click="handleExport">导出</ElButton>
          </div>
        </div>
      </template>

      <div class="table-container">
        <ElTable :data="pageList" height="100%" border stripe>
          <ElTableColumn prop="factory" label="所属厂站" width="150" />
          <ElTableColumn prop="name" label="设备名称" min-width="150" fixed="left" />
          <ElTableColumn prop="code" label="设备编码" width="120" />
          <ElTableColumn prop="category" label="设备类型" width="120" />
          <ElTableColumn prop="processSegment" label="所属工艺段" width="120" />
          <ElTableColumn prop="facility" label="所属构筑物" width="120" />
          <ElTableColumn prop="model" label="型号规格" width="120" />
          <ElTableColumn prop="registrationCode" label="设备注册代码" width="150" />
          <ElTableColumn prop="certificateNumber" label="使用证编号" width="150" />
          <ElTableColumn prop="productionDate" label="生产日期" width="120" />
          <ElTableColumn prop="lastInspectionDate" label="最近一次校验日期" width="140" align="center" />
          <ElTableColumn prop="nextInspectionDate" label="下次校验日期" width="120" align="center" />
          <ElTableColumn prop="inspectionStatus" label="校验状态" width="100" align="center">
            <template #default="{ row }">
              <ElTag :type="getInspectionStatusTag(row.inspectionStatus)" size="small">
                {{ row.inspectionStatus }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="usageStatus" label="使用状态" width="100" align="center">
            <template #default="{ row }">
              <ElTag :type="row.usageStatus === '在用' ? 'success' : 'info'" size="small">
                {{ row.usageStatus }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="safetyPerson" label="安全管理责任人" width="130" />
          <ElTableColumn label="操作" width="220" align="center" fixed="right">
            <template #default="{ row }">
              <ElButton link type="primary" @click="handleDetail(row)">详情</ElButton>
              <ElButton link type="primary" @click="handleEdit(row)">编辑</ElButton>
              <ElButton link type="primary" @click="handleInspectionRecords(row)">校验记录</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>

      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @change="handlePageChange"
      />
    </ElCard>

    <!-- 新增设备对话框 -->
    <ElDialog v-model="addDialogVisible" title="新增特种设备" width="800px">
      <div class="dialog-content">
        <div class="search-bar" style="margin-bottom: 16px;">
          <ElInput v-model="equipmentSearch" placeholder="搜索设备名称/编码" style="width: 300px">
            <template #append>
              <ElButton :icon="Search" />
            </template>
          </ElInput>
        </div>
        <ElTable
          ref="equipmentTableRef"
          :data="availableEquipment"
          border
          height="400px"
          @selection-change="handleSelectionChange"
        >
          <ElTableColumn type="selection" width="55" />
          <ElTableColumn prop="name" label="设备名称" />
          <ElTableColumn prop="code" label="设备编码" />
          <ElTableColumn prop="category" label="设备分类" />
          <ElTableColumn prop="model" label="型号规格" />
        </ElTable>
      </div>
      <template #footer>
        <ElButton @click="addDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="confirmAdd">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 编辑对话框 -->
    <ElDialog v-model="editDialogVisible" :title="'编辑 - ' + currentItem.name" width="800px">
      <ElForm :model="editForm" label-width="120px" :rules="rules" ref="editFormRef">
        <div class="form-section">
          <div class="section-title">基础信息</div>
          <ElRow :gutter="20">
            <ElCol :span="12">
              <ElFormItem label="所属厂站">
                <ElInput v-model="currentItem.factory" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="设备名称">
                <ElInput v-model="currentItem.name" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="设备编码">
                <ElInput v-model="currentItem.code" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="设备类型">
                <ElInput v-model="currentItem.category" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="所属工艺段">
                <ElInput v-model="currentItem.processSegment" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="所属构筑物">
                <ElInput v-model="currentItem.facility" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="型号规格">
                <ElInput v-model="currentItem.model" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="制造单位">
                <ElInput v-model="currentItem.manufacturer" disabled />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div class="form-section">
          <div class="section-title">特种设备信息</div>
          <ElRow :gutter="20">
            <ElCol :span="12">
              <ElFormItem label="设备注册代码" prop="registrationCode">
                <ElInput v-model="editForm.registrationCode" placeholder="请输入" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="使用证编号" prop="certificateNumber">
                <ElInput v-model="editForm.certificateNumber" placeholder="请输入" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="吨数（t）" prop="tonnage">
                <ElInputNumber v-model="editForm.tonnage" :precision="2" :step="0.1" style="width: 100%" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="设计使用年限" prop="designLife">
                <ElInputNumber v-model="editForm.designLife" :min="1" style="width: 100%" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="使用状态" prop="usageStatus">
                <ElSelect v-model="editForm.usageStatus" placeholder="请选择" style="width: 100%">
                  <ElOption label="在用" value="在用" />
                  <ElOption label="停用" value="停用" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="使用地点" prop="location">
                <ElInput v-model="editForm.location" placeholder="请输入" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="检验周期（年）" prop="inspectionCycle">
                <ElInputNumber v-model="editForm.inspectionCycle" :min="1" style="width: 100%" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem label="管理责任人" prop="safetyPerson">
                <ElInput v-model="editForm.safetyPerson" placeholder="请输入" />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div class="form-section">
          <div class="section-title">
            <span>校验记录概览</span>
          </div>
          <ElRow :gutter="20">
            <ElCol :span="8">
              <ElFormItem label="最近校验日期">
                <ElInput :value="editForm.lastInspectionDate" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="下次校验日期">
                <ElInput :value="computedNextDate" disabled />
              </ElFormItem>
            </ElCol>
            <ElCol :span="8">
              <ElFormItem label="校验状态">
                <ElTag :type="getInspectionStatusTag(computedStatus)">{{ computedStatus }}</ElTag>
              </ElFormItem>
            </ElCol>
          </ElRow>
          
          <div class="sub-section" style="margin-top: 16px;">
            <div class="sub-section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 14px; font-weight: bold; color: #606266;">校验记录列表</span>
              <ElButton type="primary" size="small" plain @click="handleAddRecord">新增校验记录</ElButton>
            </div>
            <ElTable :data="inspectionRecords" border stripe size="small">
              <ElTableColumn prop="date" label="检验日期" width="120" />
              <ElTableColumn prop="unit" label="检验单位" min-width="120" />
              <ElTableColumn prop="remarks" label="检验记录" show-overflow-tooltip />
              <ElTableColumn prop="attachment" label="校验附件" width="100" align="center">
                <template #default="{ row }">
                  <ElButton v-if="row.attachment" link type="primary" size="small">查看</ElButton>
                  <span v-else>-</span>
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </div>
      </ElForm>
      <template #footer>
        <ElButton @click="editDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveDetail">保存</ElButton>
      </template>
    </ElDialog>

    <!-- 详情对话框 -->
    <ElDialog v-model="detailDialogVisible" :title="'详情 - ' + currentItem.name" width="800px">
      <ElDescriptions border :column="2">
        <ElDescriptionsItem label="所属厂站">{{ currentItem.factory }}</ElDescriptionsItem>
        <ElDescriptionsItem label="设备名称">{{ currentItem.name }}</ElDescriptionsItem>
        <ElDescriptionsItem label="设备编码">{{ currentItem.code }}</ElDescriptionsItem>
        <ElDescriptionsItem label="设备类型">{{ currentItem.category }}</ElDescriptionsItem>
        <ElDescriptionsItem label="所属工艺段">{{ currentItem.processSegment }}</ElDescriptionsItem>
        <ElDescriptionsItem label="所属构筑物">{{ currentItem.facility }}</ElDescriptionsItem>
        <ElDescriptionsItem label="型号规格">{{ currentItem.model }}</ElDescriptionsItem>
        <ElDescriptionsItem label="制造单位">{{ currentItem.manufacturer }}</ElDescriptionsItem>
        
        <ElDescriptionsItem label="设备注册代码">{{ currentItem.registrationCode }}</ElDescriptionsItem>
        <ElDescriptionsItem label="使用证编号">{{ currentItem.certificateNumber }}</ElDescriptionsItem>
        <ElDescriptionsItem label="吨数（t）">{{ currentItem.tonnage }}</ElDescriptionsItem>
        <ElDescriptionsItem label="设计使用年限">{{ currentItem.designLife }}</ElDescriptionsItem>
        <ElDescriptionsItem label="使用状态">{{ currentItem.usageStatus }}</ElDescriptionsItem>
        <ElDescriptionsItem label="使用地点">{{ currentItem.location || '-' }}</ElDescriptionsItem>
        <ElDescriptionsItem label="检验周期（年）">{{ currentItem.inspectionCycle }}</ElDescriptionsItem>
        <ElDescriptionsItem label="管理责任人">{{ currentItem.safetyPerson }}</ElDescriptionsItem>
        
        <ElDescriptionsItem label="最近校验日期">{{ currentItem.lastInspectionDate }}</ElDescriptionsItem>
        <ElDescriptionsItem label="下次校验日期">{{ currentItem.nextInspectionDate }}</ElDescriptionsItem>
        <ElDescriptionsItem label="校验状态">
          <ElTag :type="getInspectionStatusTag(currentItem.inspectionStatus)">{{ currentItem.inspectionStatus }}</ElTag>
        </ElDescriptionsItem>
      </ElDescriptions>

      <div class="detail-records" style="margin-top: 24px;">
        <div class="section-title" style="margin-bottom: 12px; font-weight: bold; border-left: 4px solid #409eff; padding-left: 8px;">校验记录列表</div>
        <ElTable :data="inspectionRecords" border stripe size="small">
          <ElTableColumn prop="date" label="检验日期" width="120" />
          <ElTableColumn prop="unit" label="检验单位" min-width="120" />
          <ElTableColumn prop="remarks" label="检验记录" show-overflow-tooltip />
          <ElTableColumn prop="attachment" label="校验附件" width="100" align="center">
            <template #default="{ row }">
              <ElButton v-if="row.attachment" link type="primary" size="small">查看</ElButton>
              <span v-else>-</span>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <template #footer>
        <ElButton @click="detailDialogVisible = false">关闭</ElButton>
      </template>
    </ElDialog>

    <!-- 检验记录对话框 -->
    <ElDialog v-model="recordDialogVisible" :title="'检验记录 - ' + currentItem.name" width="800px">
      <div class="record-header" style="margin-bottom: 16px; display: flex; justify-content: flex-end;">
        <ElButton type="primary" size="small" @click="handleAddRecord">新增校验记录</ElButton>
      </div>
      <ElTable :data="inspectionRecords" border stripe>
        <ElTableColumn prop="date" label="校验日期" width="120" />
        <ElTableColumn prop="unit" label="检验单位" min-width="150" />
                <ElTableColumn prop="attachment" label="校验附件">
          <template #default="{ row }">
            <ElButton v-if="row.attachment" link type="primary">查看附件</ElButton>
            <span v-else>-</span>
          </template>
        </ElTableColumn>
                <ElTableColumn prop="remarks" label="检验记录" show-overflow-tooltip />
      </ElTable>
    </ElDialog>

    <!-- 新增校验记录对话框 -->
    <ElDialog v-model="addRecordDialogVisible" title="新增校验记录" width="500px">
      <ElForm :model="recordForm" label-width="100px" :rules="recordRules" ref="recordFormRef">
        <ElFormItem label="校验日期" prop="date">
          <ElDatePicker v-model="recordForm.date" type="date" placeholder="请选择" style="width: 100%" />
        </ElFormItem>
        <ElFormItem label="检验单位" prop="unit">
          <ElInput v-model="recordForm.unit" placeholder="请输入" />
        </ElFormItem>
                <ElFormItem label="校验附件">
          <ElUpload action="#" :auto-upload="false" :limit="1">
            <ElButton type="primary" size="small">选择文件</ElButton>
          </ElUpload>
        </ElFormItem>
        <ElFormItem label="检验记录">
          <ElInput v-model="recordForm.remarks" type="textarea" :rows="3" placeholder="请输入检验记录" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="addRecordDialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="confirmAddRecord">确定</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'

defineOptions({ name: 'SafetySpecialEquipment' })

// 筛选表单
const filterForm = reactive({
  factory: '城东污水处理厂',
  keyword: '',
  inspectionStatus: '',
  usageStatus: ''
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(2)

// 台账数据 (Mock)
const ledgerData = ref([
  {
    id: 1,
    factory: '城东污水处理厂',
    name: '1#桥式起重机',
    code: 'TZ-SB-001',
    category: '起重机械',
    processSegment: '脱水车间',
    facility: '1#脱水间',
    model: 'QD-5t',
    registrationCode: 'QZ-123456789',
    usageStatus: '在用',
    lastInspectionDate: '2023-05-15',
    inspectionCycle: 1,
    nextInspectionDate: '2024-05-15',
    inspectionStatus: '正常',
    certificateNumber: 'SZ-001',
    tonnage: 5,
    manufacturer: '河南矿山',
    designLife: 15,
    productionDate: '2021-03-01',
    inspectionUnit: '省特检院',
    safetyPerson: '张三',
    safetyPhone: '13800138000'
  },
  {
    id: 2,
    factory: '城东污水处理厂',
    name: '储气罐',
    code: 'TZ-SB-002',
    category: '压力容器',
    processSegment: '鼓风机房',
    facility: '1#鼓风机',
    model: 'V-1.0/1.0',
    registrationCode: 'RQ-987654321',
    usageStatus: '在用',
    lastInspectionDate: '2025-04-15',
    inspectionCycle: 1,
    nextInspectionDate: '2026-04-15',
    inspectionStatus: '预警',
    certificateNumber: 'SZ-002',
    tonnage: 0,
    manufacturer: '四川锅炉',
    designLife: 10,
    productionDate: '2022-06-01',
    inspectionUnit: '市特检所',
    safetyPerson: '李四',
    safetyPhone: '13911112222'
  }
])

const pageList = computed(() => {
  return ledgerData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})

// 新增设备相关
const addDialogVisible = ref(false)
const equipmentSearch = ref('')
const selectedEquipment = ref([])
const availableEquipment = [
  { id: 101, name: '2#桥式起重机', code: 'EQ-001', category: '起重机械', model: 'QD-5t' },
  { id: 102, name: '氯气气瓶', code: 'EQ-002', category: '压力容器', model: 'CL2-50kg' },
  { id: 103, name: '厂内叉车', code: 'EQ-003', category: '场内专用机动车辆', model: 'CPCD30' }
]

// 编辑详情相关
const editDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const currentItem = ref<any>({})

const handleDetail = (row: any) => {
  currentItem.value = row
  detailDialogVisible.value = true
}

const computedNextDate = computed(() => {
  if (!editForm.lastInspectionDate) return '-'
  return dayjs(editForm.lastInspectionDate).add(editForm.inspectionCycle, 'year').format('YYYY-MM-DD')
})

const computedStatus = computed(() => {
  if (!editForm.lastInspectionDate) return '-'
  const next = dayjs(computedNextDate.value)
  const today = dayjs()
  const diff = next.diff(today, 'day')
  if (diff < 0) return '已过期'
  if (diff <= 7) return '预警'
  return '正常'
})
const editForm = reactive({
  registrationCode: '',
  certificateNumber: '',
  tonnage: 0,
  manufacturer: '',
  designLife: 10,
  usageStatus: '在用',
  location: '',
  productionDate: '',
  inspectionCycle: 1,
  lastInspectionDate: '',
  inspectionUnit: '',
  safetyPerson: '',
  safetyPhone: ''
})

const rules = {
  registrationCode: [{ required: true, message: '请输入注册代码', trigger: 'blur' }],
  usageStatus: [{ required: true, message: '请选择使用状态', trigger: 'change' }],
  inspectionCycle: [{ required: true, message: '请输入检验周期', trigger: 'blur' }],
  lastInspectionDate: [{ required: true, message: '请选择最近校验日期', trigger: 'change' }]
}

// 检验记录相关
const recordDialogVisible = ref(false)
const inspectionRecords = ref([
  { date: '2023-05-15', unit: '省特检院', attachment: 'cert.pdf', remarks: '检验合格' },
  { date: '2022-05-10', unit: '省特检院', attachment: 'cert_old.pdf', remarks: '良好' }
])

// 新增检验记录
const addRecordDialogVisible = ref(false)
const recordForm = reactive({
  date: '',
  unit: '',
  remarks: ''
})
const recordRules = {
  date: [{ required: true, message: '请选择日期', trigger: 'change' }],
  unit: [{ required: true, message: '请输入检验单位', trigger: 'blur' }]
}

// 方法
const handleSearch = () => {
  ElMessage.success('查询成功')
}

const handleReset = () => {
  filterForm.factory = ''
  filterForm.keyword = ''
  filterForm.inspectionStatus = ''
  filterForm.usageStatus = ''
}

const handlePageChange = () => {}

const handleAdd = () => {
  addDialogVisible.value = true
}

const handleSelectionChange = (val: any) => {
  selectedEquipment.value = val
}

const confirmAdd = () => {
  if (selectedEquipment.value.length === 0) {
    ElMessage.warning('请选择设备')
    return
  }
  ElMessage.success(`成功添加 ${selectedEquipment.value.length} 台设备到台账`)
  addDialogVisible.value = false
}

const handleBatchImport = () => {
  ElMessage.info('请先选择所属单位，然后下载模板进行导入')
}

const handleExport = () => {
  ElMessage.success('正在导出特种设备台账...')
}

const handleEdit = (row: any) => {
  currentItem.value = row
  Object.assign(editForm, {
    registrationCode: row.registrationCode,
    certificateNumber: row.certificateNumber,
    tonnage: row.tonnage,
    manufacturer: row.manufacturer,
    designLife: row.designLife,
    usageStatus: row.usageStatus,
    productionDate: row.productionDate,
    inspectionCycle: row.inspectionCycle,
    lastInspectionDate: row.lastInspectionDate,
    inspectionUnit: row.inspectionUnit,
    safetyPerson: row.safetyPerson,
    safetyPhone: row.safetyPhone
  })
  editDialogVisible.value = true
}

const saveDetail = () => {
  // 这里应该计算下次检验日期和校验状态
  const lastDate = dayjs(editForm.lastInspectionDate)
  const nextDate = lastDate.add(editForm.inspectionCycle, 'year').format('YYYY-MM-DD')
  
  // 更新 Mock 数据
  Object.assign(currentItem.value, editForm, { nextInspectionDate: nextDate })
  
  // 简单模拟校验状态计算
  const today = dayjs()
  const next = dayjs(nextDate)
  const diffDays = next.diff(today, 'day')
  if (diffDays < 0) {
    currentItem.value.inspectionStatus = '已过期'
  } else if (diffDays <= 7) {
    currentItem.value.inspectionStatus = '预警'
  } else {
    currentItem.value.inspectionStatus = '正常'
  }

  ElMessage.success('详情保存成功')
  editDialogVisible.value = false
}

const handleInspectionRecords = (row: any) => {
  currentItem.value = row
  recordDialogVisible.value = true
}

const handleAddRecord = () => {
  recordForm.date = ''
  recordForm.unit = ''
  recordForm.remarks = ''
  addRecordDialogVisible.value = true
}

const confirmAddRecord = () => {
  const newRecord = {
    date: dayjs(recordForm.date).format('YYYY-MM-DD'),
    unit: recordForm.unit,
    attachment: '',
    remarks: recordForm.remarks
  }
  inspectionRecords.value.unshift(newRecord)
  
  // 如果在编辑模式下，自动更新最近校验日期
  if (editDialogVisible.value) {
    editForm.lastInspectionDate = newRecord.date
  }

  ElMessage.success('校验记录添加成功')
  addRecordDialogVisible.value = false
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定从特种设备台账中移除「${row.name}」？`, '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('移除成功')
  })
}

const getInspectionStatusTag = (status: string) => {
  if (status === '正常') return 'success'
  if (status === '预警') return 'warning'
  if (status === '已超期') return 'danger'
  return 'info'
}
</script>

<style scoped lang="scss">
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.filter-card {
  border: none !important;
  border-radius: 8px;
  :deep(.el-card__body) {
    padding: 16px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}

.data-card {
  flex: 1;
  border: none !important;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  :deep(.el-card__header) {
    padding: 12px 16px;
  }

  :deep(.el-card__body) {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .header-buttons {
    .el-button {
      margin-left: 12px;
    }
  }

  .table-container {
    flex: 1;
    overflow: hidden;
  }

  .el-pagination {
    margin-top: 16px;
    justify-content: flex-end;
  }
}

.dialog-content {
  .search-bar {
    display: flex;
    gap: 12px;
  }
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}
</style>
