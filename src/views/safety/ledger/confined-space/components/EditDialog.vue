<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑有限空间台账' : '新增有限空间台账'"
    width="900px"
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
            <el-form-item label="所属厂站" prop="stationId">
              <el-select
                v-model="formData.stationId"
                placeholder="请选择厂站"
                style="width: 100%"
                :disabled="isEdit"
                @change="handleStationChange"
              >
                <el-option
                  v-for="item in stationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有限空间编号" prop="code">
              <el-input-number
                v-model="formData.code"
                :min="1"
                :precision="0"
                style="width: 100%"
                placeholder="请输入编号"
                :disabled="isEdit"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="isEdit">
          <el-col :span="12">
            <el-form-item label="填报人">
              <el-input :model-value="props.data?.createBy" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填报时间">
              <el-input :model-value="props.data?.createTime" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 详情信息区 -->
      <div class="form-section">
        <div class="section-title">详情信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所在部位（构筑物）" prop="structure">
              <el-select
                v-model="formData.structure"
                placeholder="请选择构筑物"
                style="width: 100%"
                filterable
              >
                <el-option
                  v-for="item in structureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任人" prop="responsiblePerson">
              <el-input v-model="formData.responsiblePerson" placeholder="请输入责任人" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="具体位置" prop="location">
              <el-input
                v-model="formData.location"
                type="textarea"
                :rows="2"
                placeholder="请输入具体位置"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="主要风险分析" prop="riskAnalysis">
              <el-checkbox-group v-model="formData.riskAnalysis">
                <el-checkbox
                  v-for="(label, value) in RiskTypeLabels"
                  :key="value"
                  :label="value"
                >
                  {{ label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="风险管控措施" prop="riskControlMeasures">
              <el-input
                v-model="formData.riskControlMeasures"
                type="textarea"
                :rows="4"
                placeholder="请输入风险管控措施"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="2"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="上传照片">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-change="handlePhotoChange"
                :on-remove="handlePhotoRemove"
                :file-list="photoFileList"
                :limit="9"
              >
                <el-icon><Plus /></el-icon>
                <template #tip>
                  <div class="el-upload__tip">
                    支持上传图片格式文件（jpg/png/gif），单个文件不超过5MB，最多上传9张
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 审核记录区 -->
      <div v-if="isEdit && auditRecords.length > 0" class="form-section">
        <div class="section-title">审核记录</div>
        <el-table :data="auditRecords" border size="small" @sort-change="handleSortChange">
          <el-table-column
            prop="auditTime"
            label="审核时间"
            width="160"
            sortable="custom"
            :sort-orders="['ascending', 'descending']"
          />
          <el-table-column prop="auditBy" label="审核人" width="100" />
          <el-table-column label="审核结果" width="100">
            <template #default="{ row }">
              <el-tag :type="row.approved ? 'success' : 'danger'">
                {{ row.approved ? '通过' : '不通过' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="审核意见" min-width="200" show-overflow-tooltip />
        </el-table>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  createConfinedSpace,
  updateConfinedSpace,
  getStationList,
  getStructureList,
  getAuditRecordList
} from '@/api/confined-space'
import type { ConfinedSpace, ConfinedSpaceFormData, AuditRecord } from '@/types/confined-space'
import { RiskTypeLabels } from '@/types/confined-space'

const props = defineProps<{
  modelValue: boolean
  data: ConfinedSpace | null
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
const stationOptions = ref<Array<{ label: string; value: number }>>([])

// 构筑物选项
const structureOptions = ref<Array<{ label: string; value: number }>>([])

// 照片文件列表
const photoFileList = ref<UploadFile[]>([])

// 审核记录列表
const auditRecords = ref<AuditRecord[]>([])

// 排序状态
const sortProp = ref('auditTime')
const sortOrder = ref<'ascending' | 'descending'>('descending')

// 表单数据
const formData = reactive<ConfinedSpaceFormData>({
  stationId: 0,
  code: 0,
  structure: '',
  location: '',
  riskAnalysis: [],
  riskControlMeasures: '',
  responsiblePerson: '',
  remark: '',
  photos: []
})

// 表单校验规则
const formRules: FormRules = {
  stationId: [{ required: true, message: '请选择所属厂站', trigger: 'change' }],
  code: [{ required: true, message: '请输入有限空间编号', trigger: 'blur' }],
  structure: [{ required: true, message: '请选择所在部位', trigger: 'change' }],
  location: [{ required: true, message: '请输入具体位置', trigger: 'blur' }],
  riskAnalysis: [{ required: true, message: '请选择主要风险分析', trigger: 'change', type: 'array' }],
  riskControlMeasures: [{ required: true, message: '请输入风险管控措施', trigger: 'blur' }],
  responsiblePerson: [{ required: true, message: '请输入责任人', trigger: 'blur' }]
}

// 获取厂站列表
const fetchStationList = async () => {
  try {
    const res = await getStationList()
    stationOptions.value = res.data.map(item => ({
      label: item.name,
      value: item.id
    }))
  } catch (error) {
    console.error('获取厂站列表失败:', error)
  }
}

// 获取构筑物列表
const fetchStructureList = async (stationId?: number) => {
  try {
    const res = await getStructureList(stationId)
    structureOptions.value = res.data.map(item => ({
      label: item.name,
      value: item.id
    }))
  } catch (error) {
    console.error('获取构筑物列表失败:', error)
  }
}

// 获取审核记录列表
const fetchAuditRecords = async (spaceId: number) => {
  try {
    const res = await getAuditRecordList(spaceId)
    auditRecords.value = res.data
    // 默认按时间降序排序
    sortAuditRecords()
  } catch (error) {
    console.error('获取审核记录失败:', error)
  }
}

// 排序审核记录
const sortAuditRecords = () => {
  auditRecords.value.sort((a, b) => {
    const timeA = new Date(a.auditTime).getTime()
    const timeB = new Date(b.auditTime).getTime()
    return sortOrder.value === 'ascending' ? timeA - timeB : timeB - timeA
  })
}

// 处理排序变化
const handleSortChange = ({ prop, order }: { prop: string; order: 'ascending' | 'descending' | null }) => {
  if (prop === 'auditTime' && order) {
    sortOrder.value = order
    sortAuditRecords()
  }
}

// 厂站变化处理
const handleStationChange = (stationId: number) => {
  formData.structure = ''
  fetchStructureList(stationId)
}

// 照片变化处理
const handlePhotoChange = (file: UploadFile) => {
  photoFileList.value.push(file)
}

// 照片移除处理
const handlePhotoRemove = (file: UploadFile) => {
  const index = photoFileList.value.indexOf(file)
  if (index !== -1) {
    photoFileList.value.splice(index, 1)
  }
}

// 监听数据变化
watch(() => props.data, async (val) => {
  if (val) {
    // 编辑模式
    formData.id = val.id
    formData.stationId = val.stationId
    formData.code = val.code
    formData.structure = val.structure
    formData.location = val.location
    formData.riskAnalysis = [...val.riskAnalysis]
    formData.riskControlMeasures = val.riskControlMeasures
    formData.responsiblePerson = val.responsiblePerson
    formData.remark = val.remark || ''
    formData.photos = val.photos || []

    // 初始化照片列表
    photoFileList.value = (val.photos || []).map((url, index) => ({
      name: `photo_${index}.jpg`,
      url,
      uid: Date.now() + index
    })) as UploadFile[]

    // 获取构筑物列表
    await fetchStructureList(val.stationId)
    // 获取审核记录
    await fetchAuditRecords(val.id)
  } else {
    // 新增模式
    formData.id = undefined
    formData.stationId = 0
    formData.code = 0
    formData.structure = ''
    formData.location = ''
    formData.riskAnalysis = []
    formData.riskControlMeasures = ''
    formData.responsiblePerson = ''
    formData.remark = ''
    formData.photos = []
    photoFileList.value = []
    auditRecords.value = []
  }
}, { immediate: true })

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val) {
    fetchStationList()
    if (props.data) {
      fetchStructureList(props.data.stationId)
    } else {
      fetchStructureList()
    }
  }
})

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true
    try {
      // 上传照片并获取URL（这里简化处理，实际应该调用上传接口）
      const uploadedUrls = photoFileList.value.map(file => file.url || file.name)
      formData.photos = uploadedUrls

      if (isEdit.value) {
        await updateConfinedSpace(formData)
        ElMessage.success('更新成功')
      } else {
        await createConfinedSpace(formData)
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
</script>

<style scoped lang="scss">
.edit-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}

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
}
</style>
