<template>
  <el-dialog
    v-model="visible"
    title="事件续报"
    width="900px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      class="report-form"
    >
      <!-- 基本信息区 -->
      <div class="form-section">
        <div class="section-title">基本信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属单位" prop="stationId">
              <el-select v-model="formData.stationId" placeholder="请选择单位" style="width: 100%">
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
            <el-form-item label="事件类型" prop="eventType">
              <el-select v-model="formData.eventType" placeholder="请选择事件类型" style="width: 100%">
                <el-option
                  v-for="item in EVENT_TYPE_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交人">
              <el-input v-model="currentUser" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交时间">
              <el-input v-model="currentTime" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 初报信息区 -->
      <div class="form-section">
        <div class="section-title">初报信息</div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="地点/部位" prop="location">
              <el-input v-model="formData.location" placeholder="请输入地点/部位" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="核心不良影响">
              <el-input
                v-model="formData.adverseEffect"
                type="textarea"
                :rows="3"
                placeholder="请输入核心不良影响（非必填）"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="初步处置措施">
              <el-input
                v-model="formData.preliminaryMeasures"
                type="textarea"
                :rows="3"
                placeholder="请输入初步处置措施（非必填）"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 抢修处置进展选择 -->
      <div class="form-section">
        <div class="section-title">抢修处置进展</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="抢修处置进展" prop="repairProgress">
              <el-select 
                v-model="formData.repairProgress" 
                placeholder="请选择抢修处置进展" 
                style="width: 100%"
                @change="handleRepairProgressChange"
              >
                <el-option
                  v-for="item in REPAIR_PROGRESS_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 持续处置中 - 显示续报信息区 -->
      <div v-if="formData.repairProgress === 'ongoing'" class="form-section">
        <div class="section-title">续报信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="续报人">
              <el-input v-model="currentUser" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="续报时间">
              <el-input v-model="currentTime" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处置过程描述" prop="processDescription">
              <el-input
                v-model="formData.processDescription"
                type="textarea"
                :rows="4"
                placeholder="请输入处置过程描述"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处置过程照片">
              <el-upload
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                :on-remove="handleFileRemove"
                :file-list="fileList"
                list-type="picture-card"
                multiple
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 处置完成 - 显示终报信息区 -->
      <div v-if="formData.repairProgress === 'completed'" class="form-section">
        <div class="section-title">终报信息</div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="根本原因分析" prop="rootCause">
              <el-cascader
                v-model="rootCauseValue"
                :options="ROOT_CAUSE_CASCADER_OPTIONS"
                :props="{ value: 'value', label: 'label', children: 'children' }"
                placeholder="请选择根本原因"
                style="width: 100%"
                @change="handleRootCauseChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最终处置措施" prop="finalMeasures">
              <el-input
                v-model="formData.finalMeasures"
                type="textarea"
                :rows="4"
                placeholder="请输入最终处置措施"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件上传">
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
                    支持上传图片、PDF、Word等格式文件
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终报人">
              <el-input v-model="currentUser" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终报时间">
              <el-input v-model="currentTime" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'
import { addFollowUpReport, addFinalReport, getStationList } from '@/api/emergency-repair'
import { 
  EVENT_TYPE_OPTIONS, 
  REPAIR_PROGRESS_OPTIONS, 
  ROOT_CAUSE_CASCADER_OPTIONS,
  RepairProgress 
} from '@/types/emergency-repair'
import type { 
  EmergencyEvent, 
  FollowUpReportFormData, 
  FinalReportFormData,
  RootCauseType, 
  RootCauseSubType 
} from '@/types/emergency-repair'

const props = defineProps<{
  modelValue: boolean
  data: EmergencyEvent | null
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
const fileList = ref<UploadFile[]>([])
const stationOptions = ref<Array<{ id: number; name: string }>>([])
const rootCauseValue = ref<string[]>([])

// 当前用户和时间
const currentUser = ref('当前用户')
const currentTime = ref(new Date().toLocaleString())

// 表单数据（包含续报和终报字段）
const formData = reactive<FollowUpReportFormData & Partial<FinalReportFormData>>({
  eventId: 0,
  stationId: undefined as unknown as number,
  eventType: undefined as unknown as string,
  location: '',
  adverseEffect: '',
  preliminaryMeasures: '',
  initialImages: [],
  repairProgress: undefined as unknown as string,
  processDescription: '',
  processImages: [],
  rootCauseType: undefined as RootCauseType,
  rootCauseSubType: undefined as RootCauseSubType,
  finalMeasures: '',
  attachments: []
})

// 表单校验规则
const formRules: FormRules = {
  stationId: [{ required: true, message: '请选择所属单位', trigger: 'change' }],
  eventType: [{ required: true, message: '请选择事件类型', trigger: 'change' }],
  location: [{ required: true, message: '请输入地点/部位', trigger: 'blur' }],
  repairProgress: [{ required: true, message: '请选择抢修处置进展', trigger: 'change' }],
  processDescription: [{ required: true, message: '请输入处置过程描述', trigger: 'blur' }],
  finalMeasures: [{ required: true, message: '请输入最终处置措施', trigger: 'blur' }]
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

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.eventId = val.id
    formData.stationId = val.stationId
    formData.eventType = val.eventType
    formData.location = val.location
    formData.adverseEffect = val.adverseEffect || ''
    formData.preliminaryMeasures = val.preliminaryMeasures || ''
    formData.initialImages = val.initialImages || []
  }
}, { immediate: true })

// 处理抢修处置进展变化
const handleRepairProgressChange = (value: string) => {
  // 清空相关字段
  if (value === RepairProgress.ONGOING) {
    formData.processDescription = ''
    formData.processImages = []
    formData.rootCauseType = undefined
    formData.rootCauseSubType = undefined
    formData.finalMeasures = ''
    formData.attachments = []
    rootCauseValue.value = []
  } else if (value === RepairProgress.COMPLETED) {
    formData.processDescription = ''
    formData.processImages = []
    formData.rootCauseType = undefined
    formData.rootCauseSubType = undefined
    formData.finalMeasures = ''
    formData.attachments = []
    rootCauseValue.value = []
  }
  fileList.value = []
}

// 处理根本原因变化
const handleRootCauseChange = (value: string[]) => {
  if (value && value.length === 2) {
    formData.rootCauseType = value[0] as RootCauseType
    formData.rootCauseSubType = value[1] as RootCauseSubType
  }
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

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true
    try {
      const uploadedUrls = fileList.value.map(file => file.name)
      
      if (formData.repairProgress === RepairProgress.ONGOING) {
        // 持续处置中 - 调用续报接口
        formData.processImages = uploadedUrls
        await addFollowUpReport(formData as FollowUpReportFormData)
        ElMessage.success('事件续报成功')
      } else if (formData.repairProgress === RepairProgress.COMPLETED) {
        // 处置完成 - 校验并调用终报接口
        if (!formData.rootCauseType || !formData.rootCauseSubType) {
          ElMessage.warning('请选择根本原因分析')
          submitLoading.value = false
          return
        }
        
        formData.attachments = uploadedUrls
        await addFinalReport(formData as FinalReportFormData)
        ElMessage.success('事件终报成功')
      }
      
      visible.value = false
      emit('success')
    } catch (error) {
      console.error('提交失败:', error)
      ElMessage.error('提交失败')
    } finally {
      submitLoading.value = false
    }
  })
}

onMounted(() => {
  fetchStationList()
})
</script>

<style scoped lang="scss">
.form-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
}

.report-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
