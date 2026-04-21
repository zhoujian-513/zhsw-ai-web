<template>
  <ElDialog
    v-model="dialogVisible"
    title="批量导入"
    width="500px"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div class="import-content">
      <div class="import-step">
        <div class="step-title">1. 下载导入模板</div>
        <div class="step-desc">请先下载导入模板，按照模板格式填写数据</div>
        <ElButton type="primary" @click="handleDownloadTemplate">
          <ElIcon><Download /></ElIcon>
          下载模板
        </ElButton>
      </div>

      <div class="import-step">
        <div class="step-title">2. 上传数据文件</div>
        <div class="step-desc">支持 .xlsx, .xls 格式文件，单次最多导入 1000 条数据</div>
        <ElUpload
          ref="uploadRef"
          action="#"
          :auto-upload="false"
          :limit="1"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          accept=".xlsx,.xls"
        >
          <ElButton type="primary">
            <ElIcon><Upload /></ElIcon>
            选择文件
          </ElButton>
        </ElUpload>
      </div>

      <div v-if="importResult" class="import-result">
        <ElAlert
          :title="importResult.success ? '导入成功' : '导入失败'"
          :type="importResult.success ? 'success' : 'error'"
          :description="importResult.message"
          show-icon
        />
      </div>
    </div>

    <template #footer>
      <ElButton @click="dialogVisible = false">取消</ElButton>
      <ElButton type="primary" :loading="importing" :disabled="!selectedFile" @click="handleImport">
        开始导入
      </ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadInstance } from 'element-plus'
import { Download, Upload } from '@element-plus/icons-vue'
import { importEmergencyRepair } from '@/api/emergency-repair'

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

const uploadRef = ref<UploadInstance>()
const selectedFile = ref<File | null>(null)
const importing = ref(false)
const importResult = ref<{ success: boolean; message: string } | null>(null)

// 下载模板
const handleDownloadTemplate = () => {
  // 创建模板数据
  const templateData = [
    {
      所属单位: '一期污水处理厂',
      事件类型: '管网破裂',
      地点部位: '厂区主干道DN800输水管道',
      核心不良影响: '导致厂区部分区域停水',
      初步处置措施: '立即关闭相关阀门',
      提交人: '张三',
      提交时间: '2024-03-15 09:30:00'
    }
  ]

  // 这里简化处理，实际项目中需要生成真实的 Excel 文件
  const csvContent = convertToCSV(templateData)
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '应急抢修导入模板.csv'
  link.click()

  ElMessage.success('模板下载成功')
}

// 转换为 CSV
const convertToCSV = (data: any[]) => {
  if (data.length === 0) return ''
  const headers = Object.keys(data[0])
  const rows = data.map((row) => headers.map((header) => row[header]).join(','))
  return [headers.join(','), ...rows].join('\n')
}

// 文件选择
const handleFileChange = (file: UploadFile) => {
  selectedFile.value = file.raw || null
  importResult.value = null
}

// 文件移除
const handleFileRemove = () => {
  selectedFile.value = null
  importResult.value = null
}

// 导入
const handleImport = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请选择文件')
    return
  }

  importing.value = true
  try {
    const res = await importEmergencyRepair(selectedFile.value)
    if (res.code === 200) {
      importResult.value = {
        success: true,
        message: `成功导入 ${(res.data as any)?.successCount || 0} 条数据`
      }
      ElMessage.success('导入成功')
      emit('success')
      setTimeout(() => {
        dialogVisible.value = false
      }, 1500)
    } else {
      importResult.value = {
        success: false,
        message: res.message || '导入失败'
      }
    }
  } catch (error) {
    console.error('导入失败:', error)
    importResult.value = {
      success: false,
      message: '导入失败，请检查文件格式'
    }
    ElMessage.error('导入失败')
  } finally {
    importing.value = false
  }
}
</script>

<style scoped lang="scss">
.import-content {
  padding: 20px 0;
}

.import-step {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  .step-title {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 8px;
  }

  .step-desc {
    font-size: 14px;
    color: #606266;
    margin-bottom: 12px;
  }
}

.import-result {
  margin-top: 16px;
}
</style>
