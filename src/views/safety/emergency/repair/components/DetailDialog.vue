<template>
  <el-dialog
    v-model="visible"
    title="事件详情"
    width="1000px"
    destroy-on-close
  >
    <!-- 基本信息区 -->
    <div class="detail-section">
      <div class="section-title">基本信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="所属单位">{{ data?.stationName }}</el-descriptions-item>
        <el-descriptions-item label="事件类型">{{ data?.eventTypeName }}</el-descriptions-item>
        <el-descriptions-item label="提交人">{{ data?.submitter }}</el-descriptions-item>
        <el-descriptions-item label="提交时间">{{ data?.submitTime }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 初报信息区 -->
    <div class="detail-section">
      <div class="section-title">初报信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="发生时间">{{ data?.occurrenceTime }}</el-descriptions-item>
        <el-descriptions-item label="地点/部位">{{ data?.location }}</el-descriptions-item>
        <el-descriptions-item label="核心不良影响" :span="2">{{ data?.adverseEffect || '-' }}</el-descriptions-item>
        <el-descriptions-item label="初步处置措施" :span="2">{{ data?.preliminaryMeasures || '-' }}</el-descriptions-item>
      </el-descriptions>
      <div v-if="data?.initialImages && data.initialImages.length > 0" class="image-list">
        <div class="image-label">初报图片：</div>
        <div class="images">
          <el-image
            v-for="(img, index) in data.initialImages"
            :key="index"
            :src="img"
            :preview-src-list="data.initialImages"
            fit="cover"
            class="preview-image"
          />
        </div>
      </div>
    </div>

    <!-- 续报信息区 -->
    <div v-if="data?.followUpReports && data.followUpReports.length > 0" class="detail-section">
      <div class="section-title section-title-with-action">
        <span>续报信息</span>
        <el-button type="primary" link size="small" @click="showLogs = true">
          查看日志
        </el-button>
      </div>
      <div
        v-for="(report, index) in data.followUpReports"
        :key="report.id"
        class="follow-up-item"
      >
        <div class="follow-up-header">
          <span class="follow-up-title">续报记录 {{ index + 1 }}</span>
          <span class="follow-up-time">{{ report.reportTime }}</span>
        </div>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="抢修处置进展">{{ report.repairProgressName }}</el-descriptions-item>
          <el-descriptions-item label="续报人">{{ report.reporter }}</el-descriptions-item>
          <el-descriptions-item label="处置过程描述" :span="2">{{ report.processDescription }}</el-descriptions-item>
        </el-descriptions>
        <div v-if="report.processImages && report.processImages.length > 0" class="image-list">
          <div class="image-label">处置过程照片：</div>
          <div class="images">
            <el-image
              v-for="(img, imgIndex) in report.processImages"
              :key="imgIndex"
              :src="img"
              :preview-src-list="report.processImages"
              fit="cover"
              class="preview-image"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 终报信息区 -->
    <div v-if="data?.finalReport" class="detail-section">
      <div class="section-title">终报信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="根本原因类型">{{ data.finalReport.rootCauseTypeName }}</el-descriptions-item>
        <el-descriptions-item label="根本原因">{{ data.finalReport.rootCauseSubTypeName }}</el-descriptions-item>
        <el-descriptions-item label="终报人">{{ data.finalReport.finalReporter }}</el-descriptions-item>
        <el-descriptions-item label="终报时间">{{ data.finalReport.finalReportTime }}</el-descriptions-item>
        <el-descriptions-item label="最终处置措施" :span="2">{{ data.finalReport.finalMeasures }}</el-descriptions-item>
      </el-descriptions>
      <div v-if="data.finalReport.attachments && data.finalReport.attachments.length > 0" class="attachment-list">
        <div class="attachment-label">附件：</div>
        <div class="attachments">
          <el-link
            v-for="(file, index) in data.finalReport.attachments"
            :key="index"
            type="primary"
            :underline="false"
            @click="handleDownload(file)"
          >
            附件{{ index + 1 }}
          </el-link>
        </div>
      </div>
    </div>

    <!-- 操作日志弹窗 -->
    <el-dialog
      v-model="showLogs"
      title="操作日志"
      width="700px"
      destroy-on-close
      append-to-body
    >
      <el-timeline>
        <el-timeline-item
          v-for="(log, index) in operationLogs"
          :key="index"
          :type="getLogType(log.operationType)"
          :timestamp="log.operationTime"
        >
          <div class="log-content">
            <span class="log-type">{{ log.operationTypeName }}</span>
            <span class="log-operator">操作人：{{ log.operator }}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getOperationLogs } from '@/api/emergency-repair'
import type { EmergencyEvent, OperationLog } from '@/types/emergency-repair'

const props = defineProps<{
  modelValue: boolean
  data: EmergencyEvent | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const showLogs = ref(false)
const operationLogs = ref<OperationLog[]>([])

// 监听弹窗显示，获取日志
watch(() => props.modelValue, async (val) => {
  if (val && props.data?.id) {
    try {
      const res = await getOperationLogs(props.data.id)
      operationLogs.value = res.data
    } catch (error) {
      console.error('获取操作日志失败:', error)
    }
  }
})

// 获取日志类型样式
const getLogType = (type: string) => {
  const typeMap: Record<string, string> = {
    initial: 'primary',
    follow_up: 'warning',
    final: 'success'
  }
  return typeMap[type] || 'info'
}

// 下载附件
const handleDownload = (url: string) => {
  ElMessage.info(`下载附件: ${url}`)
}
</script>

<style scoped lang="scss">
.detail-section {
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

  .section-title-with-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.image-list {
  margin-top: 16px;

  .image-label {
    font-size: 14px;
    color: var(--el-text-color-regular);
    margin-bottom: 8px;
  }

  .images {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .preview-image {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.attachment-list {
  margin-top: 16px;

  .attachment-label {
    font-size: 14px;
    color: var(--el-text-color-regular);
    margin-bottom: 8px;
  }

  .attachments {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}

.follow-up-item {
  margin-bottom: 20px;
  padding: 16px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  .follow-up-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .follow-up-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .follow-up-time {
      font-size: 13px;
      color: var(--el-text-color-secondary);
    }
  }
}

.log-content {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .log-type {
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .log-operator {
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }
}
</style>
