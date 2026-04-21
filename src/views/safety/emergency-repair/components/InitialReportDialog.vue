<template>
  <ElDialog
    v-model="dialogVisible"
    title="事件初报"
    width="800px"
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
            <ElFormItem label="所属单位" prop="belongingUnit">
              <ElSelect v-model="formData.belongingUnit" placeholder="请选择" style="width: 100%">
                <ElOption
                  v-for="item in unitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="事件类型" prop="eventType">
              <ElSelect v-model="formData.eventType" placeholder="请选择" style="width: 100%">
                <ElOption
                  v-for="item in eventTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="提交人">
              <ElInput v-model="submitter" disabled />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="提交时间">
              <ElInput v-model="submitTime" disabled />
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
            :on-change="handlePhotoChange"
            :on-remove="handlePhotoRemove"
          >
            <ElIcon><Plus /></ElIcon>
          </ElUpload>
        </ElFormItem>
      </div>
    </ElForm>

    <template #footer>
      <ElButton @click="dialogVisible = false">取消</ElButton>
      <ElButton type="primary" :loading="submitting" @click="handleSubmit">提交</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { EmergencyType } from '@/types/emergency-repair'
import { initialReport } from '@/api/emergency-repair'

const props = defineProps<{
  visible: boolean
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

// 提交人信息（从用户信息获取）
const submitter = ref('当前用户')
const submitTime = ref(new Date().toLocaleString('zh-CN'))

// 表单数据
const formData = reactive({
  belongingUnit: '',
  eventType: '' as EmergencyType,
  location: '',
  adverseEffect: '',
  preliminaryMeasures: '',
  photos: [] as string[]
})

// 表单校验规则
const formRules = {
  belongingUnit: [{ required: true, message: '请选择所属单位', trigger: 'change' }],
  eventType: [{ required: true, message: '请选择事件类型', trigger: 'change' }],
  location: [{ required: true, message: '请输入地点/部位', trigger: 'blur' }]
}

// 所属单位选项
const unitOptions = [
  { label: '一期污水处理厂', value: '一期污水处理厂' },
  { label: '二期污水处理厂', value: '二期污水处理厂' },
  { label: '泵站', value: '泵站' }
]

// 事件类型选项
const eventTypeOptions = [
  { label: '管网破裂', value: 'pipe_burst' },
  { label: '管网塌陷', value: 'pipe_collapse' },
  { label: '管网堵塞', value: 'pipe_blockage' },
  { label: '冒溢', value: 'overflow' },
  { label: '第三方施工破坏', value: 'third_party_damage' },
  { label: '设备故障', value: 'equipment_failure' },
  { label: '停电停水', value: 'power_outage' },
  { label: '生化系统崩溃', value: 'biological_collapse' },
  { label: '有毒有害物冲击', value: 'toxic_shock' },
  { label: '火灾爆炸', value: 'fire_explosion' },
  { label: '人员中毒', value: 'personnel_poisoning' }
]

// 图片上传
const handlePhotoChange = (file: UploadFile) => {
  // 实际项目中这里需要上传文件到服务器
  formData.photos.push(file.name)
}

const handlePhotoRemove = (file: UploadFile) => {
  const index = formData.photos.indexOf(file.name)
  if (index > -1) {
    formData.photos.splice(index, 1)
  }
}

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        const res = await initialReport({
          belongingUnit: formData.belongingUnit,
          eventType: formData.eventType,
          location: formData.location,
          adverseEffect: formData.adverseEffect,
          preliminaryMeasures: formData.preliminaryMeasures,
          photos: formData.photos,
          submitter: submitter.value
        })
        if (res.code === 200) {
          ElMessage.success('初报成功')
          dialogVisible.value = false
          emit('success')
          // 重置表单
          formData.belongingUnit = ''
          formData.eventType = '' as EmergencyType
          formData.location = ''
          formData.adverseEffect = ''
          formData.preliminaryMeasures = ''
          formData.photos = []
        }
      } catch (error) {
        console.error('初报失败:', error)
        ElMessage.error('初报失败')
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
