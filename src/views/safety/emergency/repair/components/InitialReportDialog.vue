<template>
  <el-dialog
    v-model="visible"
    title="事件初报"
    width="800px"
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
          <el-col :span="24">
            <el-form-item label="上传图片">
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
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { addInitialReport, getStationList } from '@/api/emergency-repair'
import { EVENT_TYPE_OPTIONS } from '@/types/emergency-repair'
import type { InitialReportFormData } from '@/types/emergency-repair'

const props = defineProps<{
  modelValue: boolean
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

// 当前用户和时间
const currentUser = ref('当前用户')
const currentTime = ref(new Date().toLocaleString())

// 表单数据
const formData = reactive<InitialReportFormData>({
  stationId: undefined as unknown as number,
  eventType: undefined as unknown as string,
  location: '',
  adverseEffect: '',
  preliminaryMeasures: '',
  initialImages: []
})

// 表单校验规则
const formRules: FormRules = {
  stationId: [{ required: true, message: '请选择所属单位', trigger: 'change' }],
  eventType: [{ required: true, message: '请选择事件类型', trigger: 'change' }],
  location: [{ required: true, message: '请输入地点/部位', trigger: 'blur' }]
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
      // 上传文件并获取URL（这里简化处理）
      const uploadedUrls = fileList.value.map(file => file.name)
      formData.initialImages = uploadedUrls

      await addInitialReport(formData)
      ElMessage.success('事件初报成功')
      visible.value = false
      emit('success')
      // 重置表单
      formData.stationId = undefined as unknown as number
      formData.eventType = undefined as unknown as string
      formData.location = ''
      formData.adverseEffect = ''
      formData.preliminaryMeasures = ''
      formData.initialImages = []
      fileList.value = []
    } catch (error) {
      console.error('初报失败:', error)
      ElMessage.error('事件初报失败')
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
