<template>
  <ElDialog
    v-model="dialogVisible"
    :title="isFinalMode ? '事件终报' : '事件续报'"
    width="1000px"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <ElForm
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
    >
      <div class="form-section">
        <div class="section-title">基本信息</div>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="所属单位">
              <ElInput v-model="formData.belongingUnit" disabled />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="事件类型">
              <ElInput :value="eventTypeMap[formData.eventType]" disabled />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="提交人">
              <ElInput v-model="formData.submitter" disabled />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="提交时间">
              <ElInput v-model="formData.submitTime" disabled />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </div>

      <div class="form-section">
        <div class="section-title">初报信息</div>
        <ElFormItem label="地点/部位" prop="location">
          <ElInput v-model="formData.location" placeholder="请输入地点/部位" />
        </ElFormItem>
        <ElFormItem label="核心不良影响">
          <ElInput
            v-model="formData.adverseEffect"
            type="textarea"
            :rows="3"
            placeholder="请输入核心不良影响"
          />
        </ElFormItem>
        <ElFormItem label="初步处置措施">
          <ElInput
            v-model="formData.preliminaryMeasures"
            type="textarea"
            :rows="3"
            placeholder="请输入初步处置措施"
          />
        </ElFormItem>
        <ElFormItem label="上传图片">
          <ElUpload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="initialPhotoList"
            :on-change="handleInitialPhotoChange"
            :on-remove="handleInitialPhotoRemove"
          >
            <ElIcon><Plus /></ElIcon>
          </ElUpload>
        </ElFormItem>
      </div>

      <!-- 续报信息区 -->
      <div v-if="!isFinalMode" class="form-section">
        <div class="section-title">续报信息</div>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="抢修处置进展" prop="repairProgress">
              <ElSelect 
                v-model="formData.repairProgress" 
                placeholder="请选择" 
                style="width: 100%"
                @change="handleRepairProgressChange"
              >
                <ElOption label="持续处置中" value="ongoing" />
                <ElOption label="处置完成" value="completed" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="续报人">
              <ElInput v-model="reporter" disabled />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem label="处置过程描述" prop="processDescription">
          <ElInput
            v-model="formData.processDescription"
            type="textarea"
            :rows="3"
            placeholder="请输入处置过程描述"
          />
        </ElFormItem>
        <ElFormItem label="处置过程照片">
          <ElUpload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleProcessPhotoChange"
            :on-remove="handleProcessPhotoRemove"
          >
            <ElIcon><Plus /></ElIcon>
          </ElUpload>
        </ElFormItem>
      </div>

      <!-- 处置完成时显示终报信息区 -->
      <div v-if="isFinalMode" class="form-section">
        <div class="section-title">终报信息</div>
        <ElAlert
          title="您选择了「处置完成」，请填写终报信息完成事件闭环"
          type="warning"
          :closable="false"
          style="margin-bottom: 16px"
        />
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="抢修处置进展">
              <ElInput value="处置完成" disabled />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="终报人">
              <ElInput v-model="reporter" disabled />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem label="处置过程描述" prop="processDescription">
          <ElInput
            v-model="formData.processDescription"
            type="textarea"
            :rows="3"
            placeholder="请输入处置过程描述"
          />
        </ElFormItem>
        <ElFormItem label="处置过程照片">
          <ElUpload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleProcessPhotoChange"
            :on-remove="handleProcessPhotoRemove"
          >
            <ElIcon><Plus /></ElIcon>
          </ElUpload>
        </ElFormItem>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="根本原因分析" prop="rootCauseType">
              <ElCascader
                v-model="rootCause"
                :options="rootCauseOptions"
                :props="{ expandTrigger: 'hover' }"
                placeholder="请选择"
                style="width: 100%"
                @change="handleRootCauseChange as any"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem label="最终处置措施" prop="finalMeasures">
          <ElInput
            v-model="formData.finalMeasures"
            type="textarea"
            :rows="3"
            placeholder="请输入最终处置措施"
          />
        </ElFormItem>
        <ElFormItem label="附件上传">
          <ElUpload
            action="#"
            :auto-upload="false"
            :on-change="handleAttachmentChange"
            :on-remove="handleAttachmentRemove"
          >
            <ElButton type="primary">选择文件</ElButton>
          </ElUpload>
        </ElFormItem>
      </div>
    </ElForm>

    <template #footer>
      <ElButton @click="dialogVisible = false">取消</ElButton>
      <ElButton type="primary" :loading="submitting" @click="handleSubmit">
        {{ isFinalMode ? '提交终报' : '提交续报' }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { EmergencyRepairItem, RepairProgress, RootCauseType, RootCauseOption } from '@/types/emergency-repair'
import { continuationReport, continuationToFinal } from '@/api/emergency-repair'

const props = defineProps<{
  visible: boolean
  data: EmergencyRepairItem | null
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  success: []
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const formRef = ref<FormInstance>()
const submitting = ref(false)
const isFinalMode = ref(false)

// 续报人信息
const reporter = ref('当前用户')

// 初报图片列表
const initialPhotoList = ref<UploadFile[]>([])

// 级联选择值
const rootCause = ref<string[]>([])

// 事件类型映射
const eventTypeMap: Record<string, string> = {
  pipe_burst: '管网破裂',
  pipe_collapse: '管网塌陷',
  pipe_blockage: '管网堵塞',
  overflow: '冒溢',
  third_party_damage: '第三方施工破坏',
  equipment_failure: '设备故障',
  power_outage: '停电停水',
  biological_collapse: '生化系统崩溃',
  toxic_shock: '有毒有害物冲击',
  fire_explosion: '火灾爆炸',
  personnel_poisoning: '人员中毒'
}

// 根本原因分析选项
const rootCauseOptions = [
  {
    value: 'technical',
    label: '技术原因',
    children: [
      { value: 'pipe_aging_corrosion', label: '管道老化腐蚀' },
      { value: 'equipment_selection_improper', label: '设备选型不当' },
      { value: 'maintenance_inadequate', label: '维护不到位' }
    ]
  },
  {
    value: 'management',
    label: '管理原因',
    children: [
      { value: 'inspection_negligence', label: '巡检疏漏' },
      { value: 'emergency_plan_incomplete', label: '应急预案不完善' },
      { value: 'third_party_supervision_missing', label: '第三方施工监管缺失' }
    ]
  },
  {
    value: 'natural_external',
    label: '自然/外部原因',
    children: [
      { value: 'extreme_weather', label: '极端天气' },
      { value: 'force_majeure', label: '不可抗力' },
      { value: 'malicious_damage', label: '恶意破坏' }
    ]
  }
]

// 表单数据
const formData = reactive({
  emergencyId: 0,
  belongingUnit: '',
  eventType: '' as any,
  submitter: '',
  submitTime: '',
  location: '',
  adverseEffect: '',
  preliminaryMeasures: '',
  initialPhotos: [] as string[],
  repairProgress: '' as RepairProgress,
  processDescription: '',
  processPhotos: [] as string[],
  rootCauseType: '' as RootCauseType,
  rootCauseOption: '' as RootCauseOption,
  finalMeasures: '',
  attachments: [] as string[]
})

// 表单校验规则
const formRules = computed(() => {
  const baseRules: any = {
    location: [{ required: true, message: '请输入地点/部位', trigger: 'blur' }],
    processDescription: [{ required: true, message: '请输入处置过程描述', trigger: 'blur' }]
  }
  
  if (isFinalMode.value) {
    baseRules.rootCauseType = [{ required: true, message: '请选择根本原因分析', trigger: 'change' }]
    baseRules.finalMeasures = [{ required: true, message: '请输入最终处置措施', trigger: 'blur' }]
  } else {
    baseRules.repairProgress = [{ required: true, message: '请选择抢修处置进展', trigger: 'change' }]
  }
  
  return baseRules
})

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.emergencyId = val.id
    formData.belongingUnit = val.belongingUnit
    formData.eventType = val.eventType
    formData.submitter = val.submitter
    formData.submitTime = val.submitTime
    formData.location = val.location
    formData.adverseEffect = val.adverseEffect || ''
    formData.preliminaryMeasures = val.preliminaryMeasures || ''
    formData.initialPhotos = [...val.initialPhotos]
    formData.repairProgress = '' as RepairProgress
    formData.processDescription = ''
    formData.processPhotos = []
    formData.rootCauseType = '' as RootCauseType
    formData.rootCauseOption = '' as RootCauseOption
    formData.finalMeasures = ''
    formData.attachments = []
    rootCause.value = []
    isFinalMode.value = false

    // 初始化图片列表
    initialPhotoList.value = val.initialPhotos.map((url, index) => ({
      name: `photo_${index}`,
      url
    })) as UploadFile[]
  }
}, { immediate: true })

// 抢修处置进展变化处理
const handleRepairProgressChange = (val: RepairProgress) => {
  if (val === 'completed') {
    isFinalMode.value = true
  } else {
    isFinalMode.value = false
  }
}

// 根本原因变化处理
const handleRootCauseChange = (val: string[]) => {
  if (val && val.length === 2) {
    formData.rootCauseType = val[0] as RootCauseType
    formData.rootCauseOption = val[1] as RootCauseOption
  }
}

// 初报图片上传
const handleInitialPhotoChange = (file: UploadFile) => {
  formData.initialPhotos.push(file.name)
}

const handleInitialPhotoRemove = (file: UploadFile) => {
  const index = formData.initialPhotos.indexOf(file.name)
  if (index > -1) {
    formData.initialPhotos.splice(index, 1)
  }
}

// 处置过程图片上传
const handleProcessPhotoChange = (file: UploadFile) => {
  formData.processPhotos.push(file.name)
}

const handleProcessPhotoRemove = (file: UploadFile) => {
  const index = formData.processPhotos.indexOf(file.name)
  if (index > -1) {
    formData.processPhotos.splice(index, 1)
  }
}

// 附件上传
const handleAttachmentChange = (file: UploadFile) => {
  formData.attachments.push(file.name)
}

const handleAttachmentRemove = (file: UploadFile) => {
  const index = formData.attachments.indexOf(file.name)
  if (index > -1) {
    formData.attachments.splice(index, 1)
  }
}

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        if (isFinalMode.value) {
          // 续报转终报
          const res = await continuationToFinal({
            emergencyId: formData.emergencyId,
            location: formData.location,
            adverseEffect: formData.adverseEffect,
            preliminaryMeasures: formData.preliminaryMeasures,
            initialPhotos: formData.initialPhotos,
            processDescription: formData.processDescription,
            processPhotos: formData.processPhotos,
            rootCauseType: formData.rootCauseType,
            rootCauseOption: formData.rootCauseOption,
            finalMeasures: formData.finalMeasures,
            attachments: formData.attachments,
            reporter: reporter.value
          })
          if (res.code === 200) {
            ElMessage.success('终报成功')
            dialogVisible.value = false
            emit('success')
          }
        } else {
          // 普通续报
          const res = await continuationReport({
            emergencyId: formData.emergencyId,
            location: formData.location,
            adverseEffect: formData.adverseEffect,
            preliminaryMeasures: formData.preliminaryMeasures,
            initialPhotos: formData.initialPhotos,
            repairProgress: formData.repairProgress,
            processDescription: formData.processDescription,
            processPhotos: formData.processPhotos,
            reporter: reporter.value
          })
          if (res.code === 200) {
            ElMessage.success('续报成功')
            dialogVisible.value = false
            emit('success')
          }
        }
      } catch (error) {
        console.error(isFinalMode.value ? '终报失败:' : '续报失败:', error)
        ElMessage.error(isFinalMode.value ? '终报失败' : '续报失败')
      } finally {
        submitting.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.form-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}
</style>
