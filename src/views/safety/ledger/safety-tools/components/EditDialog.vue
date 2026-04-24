<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑安全工器具' : '新增安全工器具'"
    width="900px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="130px"
      class="edit-form"
    >
      <!-- 基础信息区 -->
      <div class="form-section">
        <div class="section-title">基础信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属单位" prop="stationId">
              <el-select
                v-model="formData.stationId"
                placeholder="请选择所属单位"
                style="width: 100%"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in stationOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号" prop="model">
              <el-input v-model="formData.model" placeholder="请输入规格型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="quantity">
              <el-input-number v-model="formData.quantity" :min="1" :precision="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用地点" prop="usageLocation">
              <el-input v-model="formData.usageLocation" placeholder="请输入使用地点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用部门" prop="department">
              <el-input v-model="formData.department" placeholder="请输入使用部门" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="manager">
              <el-input v-model="formData.manager" placeholder="请输入负责人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人手机号" prop="managerPhone">
              <el-input v-model="formData.managerPhone" placeholder="请输入负责人手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检验周期" prop="inspectionCycle">
              <el-input-number
                v-model="formData.inspectionCycle"
                :min="0.5"
                :max="10"
                :step="0.5"
                :precision="1"
                style="width: 100%"
              >
                <template #suffix>年</template>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件">
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
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="3"
                placeholder="请输入备注信息"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 校验记录区（仅编辑时显示） -->
      <div v-if="isEdit" class="form-section">
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
              label="校验日期"
              width="120"
              sortable="custom"
              :sort-orders="['ascending', 'descending']"
            />
            <el-table-column prop="inspectionOrg" label="检验单位" min-width="150" />
            <el-table-column prop="remark" label="备注信息" min-width="200" show-overflow-tooltip />
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
            <el-form-item label="校验日期" prop="inspectionDate">
              <el-date-picker
                v-model="recordFormData.inspectionDate"
                type="date"
                placeholder="请选择校验日期"
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
            <el-form-item label="备注信息" prop="remark">
              <el-input
                v-model="recordFormData.remark"
                type="textarea"
                :rows="4"
                placeholder="请输入备注信息"
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
                :on-change="handleRecordFileChange"
                :on-remove="handleRecordFileRemove"
                :file-list="recordFileList"
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
import { createSafetyTool, updateSafetyTool, getInspectionRecordList, addInspectionRecord, getStationList } from '@/api/safety-tools'
import type { SafetyTool, SafetyToolFormData, InspectionRecord, InspectionRecordFormData } from '@/types/safety-tools'

const props = defineProps<{
  modelValue: boolean
  data: SafetyTool | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.data)

const formRef = ref<FormInstance>()
const submitLoading = ref(false)

// 厂站选项
const stationOptions = ref<Array<{ id: number; name: string }>>([])

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
const formData = reactive<SafetyToolFormData & {
  lastInspectionDate?: string
  nextInspectionDate?: string
  verificationStatus?: string
}>({
  id: undefined,
  stationId: undefined as unknown as number,
  name: '',
  model: '',
  quantity: 1,
  usageLocation: '',
  department: '',
  manager: '',
  managerPhone: '',
  attachments: [],
  remark: '',
  inspectionCycle: 1,
  lastInspectionDate: '',
  nextInspectionDate: '',
  verificationStatus: ''
})

// 表单校验规则
const formRules: FormRules = {
  stationId: [{ required: true, message: '请选择所属单位', trigger: 'change' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  model: [{ required: true, message: '请输入规格型号', trigger: 'blur' }],
  quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  usageLocation: [{ required: true, message: '请输入使用地点', trigger: 'blur' }],
  department: [{ required: true, message: '请输入使用部门', trigger: 'blur' }],
  manager: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  managerPhone: [
    { required: true, message: '请输入负责人手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  inspectionCycle: [{ required: true, message: '请输入检验周期', trigger: 'blur' }]
}

// 文件列表
const fileList = ref<UploadFile[]>([])

// 新增校验记录弹窗
const addRecordDialogVisible = ref(false)
const recordFormRef = ref<FormInstance>()
const recordSubmitLoading = ref(false)
const recordFileList = ref<UploadFile[]>([])

// 校验记录表单数据
const recordFormData = reactive<InspectionRecordFormData>({
  toolId: 0,
  inspectionDate: '',
  inspectionOrg: '',
  remark: '',
  attachments: []
})

// 校验记录表单校验规则
const recordFormRules: FormRules = {
  inspectionDate: [{ required: true, message: '请选择校验日期', trigger: 'change' }],
  inspectionOrg: [{ required: true, message: '请输入检验单位', trigger: 'blur' }]
}

// 获取厂站列表
const fetchStationList = async () => {
  try {
    const res = await getStationList()
    stationOptions.value = res.data
  } catch (error) {
    console.error('获取厂站列表失败:', error)
  }
}

// 获取校验记录
const fetchInspectionRecords = async (toolId: number) => {
  try {
    const res = await getInspectionRecordList(toolId)
    inspectionRecords.value = res.data
  } catch (error) {
    console.error('获取校验记录失败:', error)
  }
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
    expired: '已超期'
  }
  return textMap[status || ''] || status
}

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.id = val.id
    formData.stationId = val.stationId
    formData.name = val.name
    formData.model = val.model
    formData.quantity = val.quantity
    formData.usageLocation = val.usageLocation
    formData.department = val.department
    formData.manager = val.manager
    formData.managerPhone = val.managerPhone
    formData.attachments = val.attachments || []
    formData.remark = val.remark
    formData.inspectionCycle = val.inspectionCycle
    formData.lastInspectionDate = val.lastInspectionDate
    formData.nextInspectionDate = val.nextInspectionDate
    formData.verificationStatus = val.verificationStatus

    // 获取校验记录
    fetchInspectionRecords(val.id)
  } else {
    // 重置表单
    formData.id = undefined
    formData.stationId = undefined as unknown as number
    formData.name = ''
    formData.model = ''
    formData.quantity = 1
    formData.usageLocation = ''
    formData.department = ''
    formData.manager = ''
    formData.managerPhone = ''
    formData.attachments = []
    formData.remark = ''
    formData.inspectionCycle = 1
    formData.lastInspectionDate = ''
    formData.nextInspectionDate = ''
    formData.verificationStatus = ''
    fileList.value = []
  }
}, { immediate: true })

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val) {
    fetchStationList()
  }
})

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true
    try {
      // 上传文件并获取URL（这里简化处理，实际应该调用上传接口）
      const uploadedUrls = fileList.value.map(file => file.name)
      formData.attachments = uploadedUrls

      if (isEdit.value) {
        await updateSafetyTool(formData)
        ElMessage.success('更新成功')
      } else {
        await createSafetyTool(formData)
        ElMessage.success('新增成功')
      }
      visible.value = false
      emit('success')
    } catch (error) {
      console.error(isEdit.value ? '更新失败:' : '新增失败:', error)
    } finally {
      submitLoading.value = false
    }
  })
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

// 新增校验记录
const handleAddRecord = () => {
  recordFormData.toolId = formData.id || 0
  recordFormData.inspectionDate = ''
  recordFormData.inspectionOrg = ''
  recordFormData.remark = ''
  recordFormData.attachments = []
  recordFileList.value = []
  addRecordDialogVisible.value = true
}

// 校验记录文件变化
const handleRecordFileChange = (file: UploadFile) => {
  recordFileList.value.push(file)
}

// 校验记录文件移除
const handleRecordFileRemove = (file: UploadFile) => {
  const index = recordFileList.value.indexOf(file)
  if (index !== -1) {
    recordFileList.value.splice(index, 1)
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
      const uploadedUrls = recordFileList.value.map(file => file.name)
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
