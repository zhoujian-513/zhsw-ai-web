<template>
  <el-dialog
    v-model="visible"
    title="有限空间台账详情"
    width="900px"
    destroy-on-close
  >
    <!-- 基本信息 -->
    <div class="detail-section">
      <div class="section-title">基础信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="所属厂站">{{ data?.stationName }}</el-descriptions-item>
        <el-descriptions-item label="有限空间编号">{{ data?.code }}</el-descriptions-item>
        <el-descriptions-item label="所在部位（构筑物）">{{ data?.structure }}</el-descriptions-item>
        <el-descriptions-item label="责任人">{{ data?.responsiblePerson }}</el-descriptions-item>
        <el-descriptions-item label="填报人">{{ data?.createBy }}</el-descriptions-item>
        <el-descriptions-item label="填报时间">{{ data?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="具体位置" :span="2">{{ data?.location }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 风险信息 -->
    <div class="detail-section">
      <div class="section-title">风险信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="主要风险分析">
          <el-tag
            v-for="risk in data?.riskAnalysis"
            :key="risk"
            size="small"
            class="risk-tag"
          >
            {{ getRiskLabel(risk) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(data?.status)">
            {{ getStatusLabel(data?.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="风险管控措施" :span="2">
          <div class="risk-control-content">{{ data?.riskControlMeasures }}</div>
        </el-descriptions-item>
        <el-descriptions-item v-if="data?.remark" label="备注" :span="2">
          {{ data?.remark }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 照片展示 -->
      <div v-if="data?.photos && data.photos.length > 0" class="photos-section">
        <div class="photos-title">现场照片</div>
        <div class="photos-list">
          <el-image
            v-for="(photo, index) in data.photos"
            :key="index"
            :src="photo"
            :preview-src-list="data.photos"
            :initial-index="index"
            fit="cover"
            class="photo-item"
          />
        </div>
      </div>
    </div>

    <!-- 审核信息 -->
    <div v-if="data?.status === 'approved'" class="detail-section">
      <div class="section-title">审核信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="审核人">{{ data?.auditBy || '-' }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{ data?.auditTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="2">
          {{ data?.auditComment || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 审核记录 -->
    <div v-if="auditRecords.length > 0" class="detail-section">
      <div class="section-title">审核记录</div>
      <el-table :data="auditRecords" border size="small">
        <el-table-column prop="auditTime" label="审核时间" width="160" />
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

    <!-- 历史修改记录 -->
    <div v-if="historyRecords.length > 0" class="detail-section">
      <div class="section-title">历史修改记录</div>
      <el-timeline>
        <el-timeline-item
          v-for="(record, index) in historyRecords"
          :key="index"
          :timestamp="record.operationTime"
          :type="getHistoryType(record.operationType)"
        >
          <div class="history-content">
            <span class="history-operator">{{ record.operator }}</span>
            <span class="history-action">{{ getHistoryAction(record.operationType) }}</span>
            <p v-if="record.content" class="history-detail">{{ record.content }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getAuditRecordList, getHistoryRecordList } from '@/api/confined-space'
import type { ConfinedSpace, AuditRecord, HistoryRecord } from '@/types/confined-space'
import { RiskTypeLabels, AuditStatusLabels, AuditStatus } from '@/types/confined-space'

const props = defineProps<{
  modelValue: boolean
  data: ConfinedSpace | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 审核记录列表
const auditRecords = ref<AuditRecord[]>([])
// 历史记录列表
const historyRecords = ref<HistoryRecord[]>([])

// 获取风险标签
const getRiskLabel = (risk: string) => {
  return RiskTypeLabels[risk as keyof typeof RiskTypeLabels] || risk
}

// 获取状态类型
const getStatusType = (status?: AuditStatus) => {
  const typeMap: Record<string, string> = {
    [AuditStatus.PENDING]: 'warning',
    [AuditStatus.APPROVED]: 'success'
  }
  return typeMap[status || ''] || 'info'
}

// 获取状态标签
const getStatusLabel = (status?: AuditStatus) => {
  return AuditStatusLabels[status as keyof typeof AuditStatusLabels] || status || '-'
}

// 获取历史记录类型样式
const getHistoryType = (type: string) => {
  const typeMap: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
    create: 'success',
    update: 'primary',
    audit: 'warning',
    delete: 'danger'
  }
  return typeMap[type] || 'info'
}

// 获取历史记录操作文本
const getHistoryAction = (type: string) => {
  const actionMap: Record<string, string> = {
    create: '创建',
    update: '修改',
    audit: '审核',
    delete: '删除'
  }
  return actionMap[type] || type
}

// 获取审核记录
const fetchAuditRecords = async (spaceId: number) => {
  try {
    const res = await getAuditRecordList(spaceId)
    auditRecords.value = res.data
  } catch (error) {
    console.error('获取审核记录失败:', error)
  }
}

// 获取历史记录
const fetchHistoryRecords = async (spaceId: number) => {
  try {
    const res = await getHistoryRecordList(spaceId)
    historyRecords.value = res.data
  } catch (error) {
    console.error('获取历史记录失败:', error)
  }
}

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val && props.data?.id) {
    fetchAuditRecords(props.data.id)
    fetchHistoryRecords(props.data.id)
  }
})
</script>

<style scoped lang="scss">
.detail-section {
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

.risk-tag {
  margin-right: 4px;
  margin-bottom: 2px;
}

.risk-control-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.photos-section {
  margin-top: 16px;

  .photos-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 12px;
  }

  .photos-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .photo-item {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.history-content {
  .history-operator {
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .history-action {
    margin-left: 8px;
    color: var(--el-text-color-regular);
  }

  .history-detail {
    margin-top: 4px;
    color: var(--el-text-color-secondary);
    font-size: 13px;
  }
}
</style>
