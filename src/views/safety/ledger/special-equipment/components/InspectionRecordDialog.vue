<template>
  <el-dialog
    v-model="visible"
    title="校验记录"
    width="1000px"
    destroy-on-close
  >
    <!-- 基础信息区 -->
    <div class="form-section">
      <div class="section-title">基础信息</div>
      <el-descriptions :column="2" border size="small">
        <el-descriptions-item label="所属厂站">{{ equipmentInfo.stationName }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ equipmentInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="设备编码">{{ equipmentInfo.code }}</el-descriptions-item>
        <el-descriptions-item label="设备类型">{{ equipmentInfo.type }}</el-descriptions-item>
        <el-descriptions-item label="所属工艺段">{{ equipmentInfo.processSection }}</el-descriptions-item>
        <el-descriptions-item label="所属构筑物">{{ equipmentInfo.structure }}</el-descriptions-item>
        <el-descriptions-item label="型号规格">{{ equipmentInfo.model }}</el-descriptions-item>
        <el-descriptions-item label="制造单位">{{ equipmentInfo.manufacturer }}</el-descriptions-item>
        <el-descriptions-item label="生产日期">{{ equipmentInfo.productionDate }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 特种设备信息区 -->
    <div class="form-section">
      <div class="section-title">特种设备信息</div>
      <el-descriptions :column="2" border size="small">
        <el-descriptions-item label="设备注册代码">{{ equipmentInfo.registrationCode }}</el-descriptions-item>
        <el-descriptions-item label="使用证编号">{{ equipmentInfo.certificateNo }}</el-descriptions-item>
        <el-descriptions-item label="吨数">{{ equipmentInfo.tonnage || '-' }}</el-descriptions-item>
        <el-descriptions-item label="设计使用年限">{{ equipmentInfo.designLife }} 年</el-descriptions-item>
        <el-descriptions-item label="使用状态">
          <el-tag :type="equipmentInfo.usageStatus === 'in_use' ? 'success' : 'info'">
            {{ equipmentInfo.usageStatus === 'in_use' ? '在用' : '停用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="使用地点">{{ equipmentInfo.usageLocation }}</el-descriptions-item>
        <el-descriptions-item label="检验周期">{{ equipmentInfo.inspectionCycle }} 月</el-descriptions-item>
        <el-descriptions-item label="安全管理责任人">{{ equipmentInfo.safetyManager }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 校验记录区 -->
    <div class="form-section">
      <div class="section-title section-title-with-action">
        <span>校验记录</span>
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>新增校验记录
        </el-button>
      </div>
      <el-descriptions :column="2" border size="small">
        <el-descriptions-item label="最近一次校验日期">{{ equipmentInfo.lastInspectionDate }}</el-descriptions-item>
        <el-descriptions-item label="下次校验日期">{{ equipmentInfo.nextInspectionDate }}</el-descriptions-item>
        <el-descriptions-item label="校验状态">
          <el-tag
            :type="getVerificationStatusType(equipmentInfo.verificationStatus)"
            :effect="equipmentInfo.verificationStatus === 'expired' ? 'dark' : 'light'"
          >
            {{ getVerificationStatusText(equipmentInfo.verificationStatus) }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 校验记录列表 -->
      <div class="inspection-record-list">
        <div class="list-header">
          <span class="list-title">历史校验记录</span>
        </div>
        <el-table
          :data="sortedRecordList"
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

    <!-- 新增校验记录弹窗 -->
    <el-dialog
      v-model="addDialogVisible"
      title="新增校验记录"
      width="700px"
      destroy-on-close
      append-to-body
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="检验日期" prop="inspectionDate">
              <el-date-picker
                v-model="formData.inspectionDate"
                type="date"
                placeholder="请选择检验日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检验单位" prop="inspectionOrg">
              <el-input v-model="formData.inspectionOrg" placeholder="请输入检验单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="检验记录" prop="inspectionResult">
              <el-input
                v-model="formData.inspectionResult"
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
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'
import { getInspectionRecordList, addInspectionRecord, getSpecialEquipmentDetail } from '@/api/special-equipment'
import type { InspectionRecord, InspectionRecordFormData } from '@/types/special-equipment'

const props = defineProps<{
  modelValue: boolean
  equipmentId?: number
  equipmentName?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 设备信息
const equipmentInfo = reactive({
  stationName: '',
  name: '',
  code: '',
  type: '',
  processSection: '',
  structure: '',
  model: '',
  manufacturer: '',
  productionDate: '',
  registrationCode: '',
  certificateNo: '',
  tonnage: '',
  designLife: 0,
  usageStatus: '',
  usageLocation: '',
  inspectionCycle: 12,
  safetyManager: '',
  lastInspectionDate: '',
  nextInspectionDate: '',
  verificationStatus: ''
})

// 校验记录列表
const recordList = ref<InspectionRecord[]>([])
const loading = ref(false)

// 排序状态
const sortProp = ref('inspectionDate')
const sortOrder = ref<'ascending' | 'descending'>('descending')

// 计算排序后的记录
const sortedRecordList = computed(() => {
  const records = [...recordList.value]
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

// 新增弹窗控制
const addDialogVisible = ref(false)
const formRef = ref<FormInstance>()
const submitLoading = ref(false)
const fileList = ref<UploadFile[]>([])

// 表单数据
const formData = reactive<InspectionRecordFormData>({
  equipmentId: 0,
  inspectionDate: '',
  inspectionOrg: '',
  inspectionResult: '',
  attachments: []
})

// 表单校验规则
const formRules: FormRules = {
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

// 获取设备详情和校验记录
const fetchData = async () => {
  if (!props.equipmentId) return

  loading.value = true
  try {
    // 获取设备详情
    const detailRes = await getSpecialEquipmentDetail(props.equipmentId)
    const detail = detailRes.data

    // 基础信息
    equipmentInfo.stationName = detail.stationName
    equipmentInfo.name = detail.name
    equipmentInfo.code = detail.code
    equipmentInfo.type = detail.type
    equipmentInfo.processSection = detail.processSection
    equipmentInfo.structure = detail.structure
    equipmentInfo.model = detail.model
    equipmentInfo.manufacturer = detail.manufacturer
    equipmentInfo.productionDate = detail.productionDate

    // 特种设备信息
    equipmentInfo.registrationCode = detail.registrationCode
    equipmentInfo.certificateNo = detail.certificateNo
    equipmentInfo.tonnage = detail.tonnage
    equipmentInfo.designLife = detail.designLife
    equipmentInfo.usageStatus = detail.usageStatus
    equipmentInfo.usageLocation = detail.usageLocation
    equipmentInfo.inspectionCycle = detail.inspectionCycle
    equipmentInfo.safetyManager = detail.safetyManager

    // 校验记录
    equipmentInfo.lastInspectionDate = detail.lastInspectionDate
    equipmentInfo.nextInspectionDate = detail.nextInspectionDate
    equipmentInfo.verificationStatus = detail.verificationStatus

    // 获取校验记录
    const recordsRes = await getInspectionRecordList(props.equipmentId)
    recordList.value = recordsRes.data
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val && props.equipmentId) {
    fetchData()
  }
})

// 新增
const handleAdd = () => {
  formData.equipmentId = props.equipmentId || 0
  formData.inspectionDate = ''
  formData.inspectionOrg = ''
  formData.inspectionResult = ''
  formData.attachments = []
  fileList.value = []
  addDialogVisible.value = true
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
      // 上传文件并获取URL（这里简化处理，实际应该调用上传接口）
      const uploadedUrls = fileList.value.map(file => file.name)
      formData.attachments = uploadedUrls

      await addInspectionRecord(formData)
      ElMessage.success('新增校验记录成功')
      addDialogVisible.value = false
      fetchData() // 刷新列表
      emit('success') // 通知父组件刷新主列表
    } catch (error) {
      console.error('新增失败:', error)
      ElMessage.error('新增校验记录失败')
    } finally {
      submitLoading.value = false
    }
  })
}

// 下载附件
const handleDownload = (url: string) => {
  // 实际下载逻辑
  ElMessage.info(`下载附件: ${url}`)
}
</script>

<style scoped lang="scss">
.form-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid var(--el-color-primary);
  }

  .section-title-with-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0;
  }
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
  }

  .file-link {
    margin-right: 8px;
  }
}

:deep(.el-descriptions) {
  background-color: var(--el-fill-color-light);
}
</style>
