<template>
  <ElDialog
    v-model="dialogVisible"
    title="事件详情"
    width="1000px"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div v-if="data" class="detail-content">
      <!-- 操作按钮区 -->
      <div class="action-bar">
        <ElButton type="primary" @click="activeTab = 'detail'">详情</ElButton>
        <ElButton type="info" @click="activeTab = 'logs'">日志</ElButton>
      </div>

      <!-- 详情内容 -->
      <div v-show="activeTab === 'detail'">
        <div class="detail-section">
          <div class="section-title">基本信息</div>
          <ElDescriptions :column="2" border>
            <ElDescriptionsItem label="所属单位">{{ data.belongingUnit }}</ElDescriptionsItem>
            <ElDescriptionsItem label="事件类型">{{ eventTypeMap[data.eventType] }}</ElDescriptionsItem>
            <ElDescriptionsItem label="提交人">{{ data.submitter }}</ElDescriptionsItem>
            <ElDescriptionsItem label="提交时间">{{ data.submitTime }}</ElDescriptionsItem>
          </ElDescriptions>
        </div>

        <div class="detail-section">
          <div class="section-title">初报信息</div>
          <ElDescriptions :column="1" border>
            <ElDescriptionsItem label="地点/部位">{{ data.location }}</ElDescriptionsItem>
            <ElDescriptionsItem label="核心不良影响">{{ data.adverseEffect || '-' }}</ElDescriptionsItem>
            <ElDescriptionsItem label="初步处置措施">{{ data.preliminaryMeasures || '-' }}</ElDescriptionsItem>
          </ElDescriptions>
          <div v-if="data.initialPhotos && data.initialPhotos.length > 0" class="photo-section">
            <div class="photo-label">初报图片：</div>
            <div class="photo-list">
              <ElImage
                v-for="(photo, index) in data.initialPhotos"
                :key="index"
                :src="photo"
                :preview-src-list="data.initialPhotos"
                :initial-index="index"
                fit="cover"
                class="photo-item"
              />
            </div>
          </div>
        </div>

        <div v-if="data.continuationRecords && data.continuationRecords.length > 0" class="detail-section">
          <div class="section-title">续报记录</div>
          <div
            v-for="(record, index) in data.continuationRecords"
            :key="record.id"
            class="continuation-record"
          >
            <div class="record-header">
              <span class="record-index">续报 {{ index + 1 }}</span>
              <ElTag :type="record.repairProgress === 'completed' ? 'success' : 'warning'">
                {{ record.repairProgress === 'completed' ? '处置完成' : '持续处置中' }}
              </ElTag>
            </div>
            <ElDescriptions :column="2" border>
              <ElDescriptionsItem label="续报人">{{ record.reporter }}</ElDescriptionsItem>
              <ElDescriptionsItem label="续报时间">{{ record.reportTime }}</ElDescriptionsItem>
              <ElDescriptionsItem label="处置过程描述" :span="2">{{ record.processDescription }}</ElDescriptionsItem>
            </ElDescriptions>
            <div v-if="record.processPhotos && record.processPhotos.length > 0" class="photo-section">
              <div class="photo-label">处置过程照片：</div>
              <div class="photo-list">
                <ElImage
                  v-for="(photo, pIndex) in record.processPhotos"
                  :key="pIndex"
                  :src="photo"
                  :preview-src-list="record.processPhotos"
                  :initial-index="pIndex"
                  fit="cover"
                  class="photo-item"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="data.status === 'ended' && data.rootCauseType" class="detail-section">
          <div class="section-title">终报信息</div>
          <ElDescriptions :column="2" border>
            <ElDescriptionsItem label="根本原因分析">
              {{ rootCauseTypeMap[data.rootCauseType] }} - {{ rootCauseOptionMap[data.rootCauseOption || ''] }}
            </ElDescriptionsItem>
            <ElDescriptionsItem label="终报人">{{ data.finalReporter || '-' }}</ElDescriptionsItem>
            <ElDescriptionsItem label="终报时间">{{ data.finalReportTime || '-' }}</ElDescriptionsItem>
            <ElDescriptionsItem label="最终处置措施" :span="2">{{ data.finalMeasures || '-' }}</ElDescriptionsItem>
          </ElDescriptions>
          <div v-if="data.finalAttachments && data.finalAttachments.length > 0" class="photo-section">
            <div class="photo-label">终报附件：</div>
            <div class="attachment-list">
              <div
                v-for="(file, index) in data.finalAttachments"
                :key="index"
                class="attachment-item"
              >
                <ElIcon><Document /></ElIcon>
                <span>{{ file }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 日志内容 -->
      <div v-show="activeTab === 'logs'" class="logs-section">
        <div class="detail-section">
          <div class="section-title">操作日志</div>
          <ElTable :data="operationLogs" border stripe>
            <ElTableColumn type="index" label="序号" width="60" />
            <ElTableColumn label="操作类型" width="120">
              <template #default="{ row }: { row: OperationLog }">
                <ElTag :type="getOperationTypeTag(row.operationType) as any">
                  {{ operationTypeMap[row.operationType] }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="operator" label="操作人" width="120" />
            <ElTableColumn prop="operationTime" label="操作时间" width="180" />
            <ElTableColumn prop="operationContent" label="操作内容" min-width="200" show-overflow-tooltip />
          </ElTable>
        </div>

        <div v-if="modificationLogs.length > 0" class="detail-section">
          <div class="section-title">修改日志</div>
          <ElTimeline>
            <ElTimelineItem
              v-for="log in modificationLogs"
              :key="log.id"
              :timestamp="log.modifyTime"
              placement="top"
            >
              <ElCard>
                <div class="log-content">
                  <div class="log-field">修改字段：{{ log.fieldName }}</div>
                  <div class="log-change">
                    <div class="log-old">原值：{{ log.oldValue || '-' }}</div>
                    <div class="log-new">新值：{{ log.newValue || '-' }}</div>
                  </div>
                  <div class="log-modifier">修改人：{{ log.modifier }}</div>
                </div>
              </ElCard>
            </ElTimelineItem>
          </ElTimeline>
        </div>
      </div>
    </div>

    <template #footer>
      <ElButton @click="dialogVisible = false">关闭</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Document } from '@element-plus/icons-vue'
import type { EmergencyRepairItem, OperationLog, ModificationLog, OperationType } from '@/types/emergency-repair'

const props = defineProps<{
  visible: boolean
  data: EmergencyRepairItem | null
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const activeTab = ref<'detail' | 'logs'>('detail')

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

// 根本原因类型映射
const rootCauseTypeMap: Record<string, string> = {
  technical: '技术原因',
  management: '管理原因',
  natural_external: '自然/外部原因'
}

// 根本原因选项映射
const rootCauseOptionMap: Record<string, string> = {
  pipe_aging_corrosion: '管道老化腐蚀',
  equipment_selection_improper: '设备选型不当',
  maintenance_inadequate: '维护不到位',
  inspection_negligence: '巡检疏漏',
  emergency_plan_incomplete: '应急预案不完善',
  third_party_supervision_missing: '第三方施工监管缺失',
  extreme_weather: '极端天气',
  force_majeure: '不可抗力',
  malicious_damage: '恶意破坏'
}

// 操作类型映射
const operationTypeMap: Record<OperationType, string> = {
  initial: '初报',
  continuation: '续报',
  final: '终报'
}

// 获取操作类型标签样式
const getOperationTypeTag = (type: OperationType) => {
  const tagMap: Record<OperationType, string> = {
    initial: 'primary',
    continuation: 'warning',
    final: 'success'
  }
  return tagMap[type]
}

// 操作日志
const operationLogs = computed<OperationLog[]>(() => {
  if (!props.data?.operationLogs) return []
  return [...props.data.operationLogs].sort((a, b) => 
    new Date(b.operationTime).getTime() - new Date(a.operationTime).getTime()
  )
})

// 修改日志
const modificationLogs = computed<ModificationLog[]>(() => {
  if (!props.data?.modificationLogs) return []
  return [...props.data.modificationLogs].sort((a, b) => 
    new Date(b.modifyTime).getTime() - new Date(a.modifyTime).getTime()
  )
})
</script>

<style scoped lang="scss">
.detail-content {
  max-height: 600px;
  overflow-y: auto;
}

.action-bar {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.detail-section {
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

.photo-section {
  margin-top: 16px;

  .photo-label {
    font-size: 14px;
    color: #606266;
    margin-bottom: 8px;
  }

  .photo-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .photo-item {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.continuation-record {
  margin-bottom: 16px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 4px;

  .record-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .record-index {
      font-weight: bold;
      color: #303133;
    }
  }
}

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .attachment-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: #f5f7fa;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;
  }
}

.logs-section {
  .log-content {
    .log-field {
      font-weight: bold;
      margin-bottom: 8px;
    }

    .log-change {
      margin-bottom: 8px;

      .log-old {
        color: #f56c6c;
        text-decoration: line-through;
      }

      .log-new {
        color: #67c23a;
      }
    }

    .log-modifier {
      color: #909399;
      font-size: 12px;
    }
  }
}
</style>
