<template>
  <el-dialog
    v-model="visible"
    title="批量导入防汛专项管理"
    width="600px"
    destroy-on-close
  >
    <div class="import-steps">
      <el-steps :active="currentStep" finish-status="success">
        <el-step title="下载模板" />
        <el-step title="填写数据" />
        <el-step title="上传文件" />
      </el-steps>
    </div>

    <!-- 步骤1：下载模板 -->
    <div v-if="currentStep === 0" class="step-content">
      <div class="tip-text">
        <p>1. 请下载导入模板，按照模板格式填写数据</p>
        <p>2. 模板中包含以下字段：项目名称、防汛工程名称、防汛工程类型、主要风险类型、关联水系、汛期时段等</p>
        <p>3. 请勿修改模板表头，否则可能导致导入失败</p>
      </div>
      <el-button type="primary" @click="handleDownloadTemplate">
        <el-icon><Download /></el-icon>下载导入模板
      </el-button>
    </div>

    <!-- 步骤2：填写数据 -->
    <div v-if="currentStep === 1" class="step-content">
      <div class="tip-text">
        <p>请按照以下要求填写数据：</p>
        <ul>
          <li>项目名称：必填，必须填写系统中已存在的项目名称</li>
          <li>防汛工程名称：必填，长度不超过100个字符</li>
          <li>防汛工程类型：必填，可选值：在建在运的水利工程、防汛排涝系统（管网、箱涵、泵站等）、其他防汛项目</li>
          <li>主要风险类型：必填，可选值：汛前有明确节点工期的在建项目、汛前有具体消缺任务的在运项目、临近河湖项目、地势低洼项目、受台风/大风影响大的项目、其他</li>
          <li>关联水系：填写关联的河湖名称</li>
          <li>汛期时段：格式为 YYYY-MM，如 2024-04 至 2024-10</li>
          <li>关键节点工期、主要影响、应对保障措施：详细描述相关信息</li>
          <li>施工单位/运维单位：填写负责单位名称</li>
          <li>历年涉险事件：填写2020年1月1日以来的涉险事件</li>
        </ul>
      </div>
      <el-button type="primary" @click="currentStep = 2">
        下一步<el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </div>

    <!-- 步骤3：上传文件 -->
    <div v-if="currentStep === 2" class="step-content">
      <el-upload
        ref="uploadRef"
        action="#"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
        :limit="1"
        accept=".xlsx,.xls"
        drag
      >
        <el-icon class="el-icon--upload"><Upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 Excel 文件（.xlsx/.xls），且不超过 10MB
          </div>
        </template>
      </el-upload>

      <!-- 导入结果 -->
      <div v-if="importResult" class="import-result">
        <el-divider />
        <h4>导入结果</h4>
        <el-result
          :icon="importResult.failCount === 0 ? 'success' : 'warning'"
          :title="importResult.failCount === 0 ? '导入成功' : '部分导入成功'"
          :sub-title="`成功：${importResult.successCount} 条，失败：${importResult.failCount} 条`"
        >
          <template v-if="importResult.failDetails && importResult.failDetails.length > 0">
            <div class="fail-details">
              <p>失败详情：</p>
              <el-scrollbar max-height="150px">
                <div
                  v-for="(item, index) in importResult.failDetails"
                  :key="index"
                  class="fail-item"
                >
                  第 {{ item.row }} 行：{{ item.message }}
                </div>
              </el-scrollbar>
            </div>
          </template>
        </el-result>
      </div>
    </div>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button
        v-if="currentStep === 2 && selectedFile"
        type="primary"
        :loading="uploadLoading"
        @click="handleUpload"
      >
        开始导入
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadInstance } from 'element-plus'
import { Download, ArrowRight, UploadFilled } from '@element-plus/icons-vue'
import { downloadImportTemplate, importFloodPrevention } from '@/api/flood-prevention'
import type { ImportResult } from '@/types/flood-prevention'

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

const currentStep = ref(0)
const uploadRef = ref<UploadInstance>()
const selectedFile = ref<File | null>(null)
const uploadLoading = ref(false)
const importResult = ref<ImportResult | null>(null)

// 下载模板
const handleDownloadTemplate = async () => {
  try {
    const blob = await downloadImportTemplate()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '防汛专项管理导入模板.xlsx'
    link.click()
    URL.revokeObjectURL(link.href)
    ElMessage.success('模板下载成功')
    currentStep.value = 1
  } catch (error) {
    console.error('下载模板失败:', error)
  }
}

// 文件变化
const handleFileChange = (file: UploadFile) => {
  selectedFile.value = file.raw || null
  importResult.value = null
}

// 文件移除
const handleFileRemove = () => {
  selectedFile.value = null
  importResult.value = null
}

// 上传导入
const handleUpload = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请选择要上传的文件')
    return
  }

  uploadLoading.value = true
  try {
    const res = await importFloodPrevention(selectedFile.value)
    importResult.value = res.data

    if (res.data.failCount === 0) {
      ElMessage.success('导入成功')
      setTimeout(() => {
        emit('success')
        handleClose()
      }, 1500)
    } else {
      ElMessage.warning(`导入完成，成功 ${res.data.successCount} 条，失败 ${res.data.failCount} 条`)
    }
  } catch (error) {
    console.error('导入失败:', error)
  } finally {
    uploadLoading.value = false
  }
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false
  currentStep.value = 0
  selectedFile.value = null
  importResult.value = null
  uploadRef.value?.clearFiles()
}
</script>

<style scoped lang="scss">
.import-steps {
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.step-content {
  text-align: center;
  padding: 20px 0;
}

.tip-text {
  text-align: left;
  margin-bottom: 20px;
  color: var(--el-text-color-regular);
  line-height: 1.8;

  p {
    margin: 8px 0;
  }

  ul {
    margin: 8px 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }
}

.import-result {
  margin-top: 16px;
  text-align: left;

  h4 {
    margin-bottom: 12px;
    color: var(--el-text-color-primary);
  }
}

.fail-details {
  margin-top: 12px;
  padding: 12px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;

  p {
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.fail-item {
  padding: 4px 0;
  color: var(--el-color-danger);
  font-size: 13px;
}
</style>
