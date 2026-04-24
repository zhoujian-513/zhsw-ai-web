<template>
  <el-dialog
    v-model="visible"
    title="编辑特种设备"
    width="1000px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="140px"
      class="edit-form"
    >
      <!-- 基础信息区 -->
      <div class="form-section">
        <div class="section-title">基础信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属厂站">
              <el-input v-model="formData.stationName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称">
              <el-input v-model="formData.name" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编码">
              <el-input v-model="formData.code" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型">
              <el-input v-model="formData.type" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属工艺段">
              <el-input v-model="formData.processSection" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属构筑物">
              <el-input v-model="formData.structure" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号规格">
              <el-input v-model="formData.model" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制造单位">
              <el-input v-model="formData.manufacturer" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产日期">
              <el-input v-model="formData.productionDate" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 特种设备信息区 -->
      <div class="form-section">
        <div class="section-title">特种设备信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备注册代码" prop="registrationCode">
              <el-input v-model="formData.registrationCode" placeholder="请输入设备注册代码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用证编号" prop="certificateNo">
              <el-input v-model="formData.certificateNo" placeholder="请输入使用证编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="吨数">
              <el-input-number v-model="formData.tonnage" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设计使用年限" prop="designLife">
              <el-input-number v-model="formData.designLife" :min="1" :max="100" style="width: 100%">
                <template #suffix>年</template>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用状态" prop="usageStatus">
              <el-radio-group v-model="formData.usageStatus">
                <el-radio label="in_use">在用</el-radio>
                <el-radio label="stopped">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用地点" prop="usageLocation">
              <el-input v-model="formData.usageLocation" placeholder="请输入使用地点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检验周期" prop="inspectionCycle">
              <el-input-number v-model="formData.inspectionCycle" :min="1" :max="120" style="width: 100%">
                <template #suffix>月</template>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全管理责任人" prop="safetyManager">
              <el-input v-model="formData.safetyManager" placeholder="请输入安全管理责任人" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 校验记录区 -->
      <div class="form-section">
        <div class="section-title section-title-with-action">
          <span>校验记录</span>
          <el-button type="primary" size="small" @click="handleAddRecord">
            <el-icon><Plus /></el-icon>新增校验记录
          </el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="最近一次校验日期">
              <el-input v-model="formData.lastInspectionDate" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下次校验日期">
              <el-input v-model="formData.nextInspectionDate" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="校验状态">
              <el-tag :type="getVerificationStatusType(formData.verificationStatus)">
                {{ getVerificationStatusText(formData.verificationStatus) }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 历史校验记录列表 -->
        <div class="inspection-record-list">
          <div class="list-header">
            <span class="list-title">历史校验记录</span>
          </div>
          <el-table
            :data="sortedInspectionRecords"
            border
            size="small"
            @sort-change="handleSortChange"
          >
            <el-table-column
              prop="inspectionDate"
              label="检验日期"
              width="120"
              sortable="custom"
              :sort-orders="['ascending', 'descending']"
            />
            <el-table-column prop="inspectionOrg" label="检验单位" min-width="150" />
            <el-table-column prop="inspectionResult" label="检验记录" min-width="200" show-overflow-tooltip />
            <el-table-column label="校验附件" width="120">
              <template #default="{ row }">
                <el-link
                  v-for="(file, index) in row.attachments"
                  :key="index"
                  type="primary"
                  :underline="false"
                  class="file-link"
                  @click="handleDownload(file)"
                >
                  附件{{ index + 1 }}
                </el-link>
                <span v-if="!row.attachments || row.attachments.length === 0">-</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
    </template>

    <!-- 新增校验记录弹窗 -->
    <el-dialog
      v-model="addRecordDialogVisible"
      title="新增校验记录"
      width="700px"
      destroy-on-close
      append-to-body
    >
      <el-form
        ref="recordFormRef"
        :model="recordFormData"
        :rules="recordFormRules"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="检验日期" prop="inspectionDate">
              <el-date-picker
                v-model="recordFormData.inspectionDate"
                type="date"
                placeholder="请选择检验日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检验单位" prop="inspectionOrg">
              <el-input v-model="recordFormData.inspectionOrg" placeholder="请输入检验单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="检验记录" prop="inspectionResult">
              <el-input
                v-model="recordFormData.inspectionResult"
                type="textarea"
                :rows="4"
                placeholder="请输入检验记录"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="校验附件">
              <el-upload
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                :on-remove="handleFileRemove"
                :file-list="fileList"
                multiple
              >
                <el-button type="primary">
                  <el-icon><Upload /></el-icon>选择文件
                </el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    支持上传图片、PDF、Word等格式文件，单个文件不超过10MB
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="addRecordDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="recordSubmitLoading" @click="handleSubmitRecord">确定</el-button>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'
import { updateSpecialEquipment, getInspectionRecordList, addInspectionRecord } from '@/api/special-equipment'
import type { SpecialEquipment, SpecialEquipmentFormData, InspectionRecord, InspectionRecordFormData } from '@/types/special-equipment'

const props = defineProps<{
  modelValue: boolean
  data: SpecialEquipment | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref<FormInstance>()
const submitLoading = ref(false)

// 校验记录列表
const inspectionRecords = ref<InspectionRecord[]>([])

// 排序状态
const sortProp = ref('inspectionDate')
const sortOrder = ref<'ascending' | 'descending'>('descending')

// 计算排序后的记录
const sortedInspectionRecords = computed(() => {
  const records = [...inspectionRecords.value]
  if (sortProp.value === 'inspectionDate') {
    records.sort((a, b) => {
      const dateA = new Date(a.inspectionDate).getTime()
      const dateB = new Date(b.inspectionDate).getTime()
      return sortOrder.value === 'ascending' ? dateA - dateB : dateB - dateA
    })
  }
  return records
})

// 处理排序变化
const handleSortChange = ({ prop, order }: { prop: string; order: 'ascending' | 'descending' | null }) => {
  if (prop) {
    sortProp.value = prop
    sortOrder.value = order || 'descending'
  }
}

// 表单数据
const formData = reactive<SpecialEquipmentFormData & { 
  stationName?: string
  name?: string
  code?: string
  type?: string
  processSection?: string
  structure?: string
  model?: string
  manufacturer?: string
  productionDate?: string
  lastInspectionDate?: string
  nextInspectionDate?: string
  verificationStatus?: string
}>({
  id: undefined,
  registrationCode: '',
  certificateNo: '',
  tonnage: undefined,
  designLife: 10,
  usageStatus: 'in_use',
  usageLocation: '',
  inspectionCycle: 12,
  safetyManager: ''
})

// 表单校验规则
const formRules: FormRules = {
  registrationCode: [{ required: true, message: '请输入设备注册代码', trigger: 'blur' }],
  certificateNo: [{ required: true, message: '请输入使用证编号', trigger: 'blur' }],
  designLife: [{ required: true, message: '请输入设计使用年限', trigger: 'blur' }],
  usageStatus: [{ required: true, message: '请选择使用状态', trigger: 'change' }],
  usageLocation: [{ required: true, message: '请输入使用地点', trigger: 'blur' }],
  inspectionCycle: [{ required: true, message: '请输入检验周期', trigger: 'blur' }],
  safetyManager: [{ required: true, message: '请输入安全管理责任人', trigger: 'blur' }]
}

// 新增校验记录弹窗
const addRecordDialogVisible = ref(false)
const recordFormRef = ref<FormInstance>()
const recordSubmitLoading = ref(false)
const fileList = ref<UploadFile[]>([])

// 校验记录表单数据
const recordFormData = reactive<InspectionRecordFormData>({
  equipmentId: 0,
  inspectionDate: '',
  inspectionOrg: '',
  inspectionResult: '',
  attachments: []
})

// 校验记录表单校验规则
const recordFormRules: FormRules = {
  inspectionDate: [{ required: true, message: '请选择检验日期', trigger: 'change' }],
  inspectionOrg: [{ required: true, message: '请输入检验单位', trigger: 'blur' }],
  inspectionResult: [{ required: true, message: '请输入检验记录', trigger: 'blur' }]
}

// 获取校验状态样式
const getVerificationStatusType = (status?: string) => {
  const typeMap: Record<string, string> = {
    normal: 'success',
    warning: 'warning',
    expired: 'danger'
  }
  return typeMap[status || ''] || 'info'
}

// 获取校验状态文本
const getVerificationStatusText = (status?: string) => {
  const textMap: Record<string, string> = {
    normal: '正常',
    warning: '预警',
    expired: '已过期'
  }
  return textMap[status || ''] || status
}

// 获取校验记录
const fetchInspectionRecords = async (equipmentId: number) => {
  try {
    const res = await getInspectionRecordList(equipmentId)
    inspectionRecords.value = res.data
  } catch (error) {
    console.error('获取校验记录失败:', error)
  }
}

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.id = val.id
    formData.stationName = val.stationName
    formData.name = val.name
    formData.code = val.code
    formData.type = val.type
    formData.processSection = val.processSection
    formData.structure = val.structure
    formData.model = val.model
    formData.manufacturer = val.manufacturer
    formData.productionDate = val.productionDate
    formData.registrationCode = val.registrationCode
    formData.certificateNo = val.certificateNo
    formData.tonnage = val.tonnage
    formData.designLife = val.designLife
    formData.usageStatus = val.usageStatus
    formData.usageLocation = val.usageLocation
    formData.inspectionCycle = val.inspectionCycle
    formData.safetyManager = val.safetyManager
    formData.lastInspectionDate = val.lastInspectionDate
    formData.nextInspectionDate = val.nextInspectionDate
    formData.verificationStatus = val.verificationStatus
    
    // 获取校验记录
    fetchInspectionRecords(val.id)
  }
}, { immediate: true })

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    submitLoading.value = true
    try {
      const submitData: SpecialEquipmentFormData = {
        id: formData.id,
        registrationCode: formData.registrationCode,
        certificateNo: formData.certificateNo,
        tonnage: formData.tonnage,
        designLife: formData.designLife,
        usageStatus: formData.usageStatus,
        usageLocation: formData.usageLocation,
        inspectionCycle: formData.inspectionCycle,
        safetyManager: formData.safetyManager
      }
      await updateSpecialEquipment(submitData)
      ElMessage.success('更新成功')
      visible.value = false
      emit('success')
    } catch (error) {
      console.error('更新失败:', error)
    } finally {
      submitLoading.value = false
    }
  })
}

// 新增校验记录
const handleAddRecord = () => {
  recordFormData.equipmentId = formData.id || 0
  recordFormData.inspectionDate = ''
  recordFormData.inspectionOrg = ''
  recordFormData.inspectionResult = ''
  recordFormData.attachments = []
  fileList.value = []
  addRecordDialogVisible.value = true
}

// 文件变化
const handleFileChange = (file: UploadFile) => {
  fileList.value.push(file)
}

// 文件移除
const handleFileRemove = (file: UploadFile) => {
  const index = fileList.value.indexOf(file)
  if (index !== -1) {
    fileList.value.splice(index, 1)
  }
}

// 提交校验记录
const handleSubmitRecord = async () => {
  if (!recordFormRef.value) return

  await recordFormRef.value.validate(async (valid) => {
    if (!valid) return

    recordSubmitLoading.value = true
    try {
      // 上传文件并获取URL（这里简化处理，实际应该调用上传接口）
      const uploadedUrls = fileList.value.map(file => file.name)
      recordFormData.attachments = uploadedUrls

      await addInspectionRecord(recordFormData)
      ElMessage.success('新增校验记录成功')
      addRecordDialogVisible.value = false
      // 刷新列表
      if (formData.id) {
        fetchInspectionRecords(formData.id)
      }
      emit('success')
    } catch (error) {
      console.error('新增失败:', error)
      ElMessage.error('新增校验记录失败')
    } finally {
      recordSubmitLoading.value = false
    }
  })
}

// 下载附件
const handleDownload = (url: string) => {
  ElMessage.info(`下载附件: ${url}`)
}
</script>

<style scoped lang="scss">
.form-section {
  margin-bottom: 24px;
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  
  .section-title-with-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.edit-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}

.inspection-record-list {
  margin-top: 16px;
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    .list-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }
    
    .list-actions {
      display: flex;
      gap: 10px;
    }
  }
  
  .file-link {
    margin-right: 8px;
  }
}
</style>
