<template>
  <el-dialog
    v-model="visible"
    title="防汛专项管理详情"
    width="1000px"
    destroy-on-close
  >
    <!-- 基础信息区 -->
    <div class="detail-section">
      <div class="section-title">基础信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="项目名称">{{ data?.projectName }}</el-descriptions-item>
        <el-descriptions-item label="所在地">{{ data?.location }}</el-descriptions-item>
        <el-descriptions-item label="所属区域公司">{{ data?.regionCompany }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ data?.createBy }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ data?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ data?.updateTime }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 防汛工程明细区 -->
    <div class="detail-section">
      <div class="section-title">防汛工程明细</div>

      <!-- 工程明细卡片列表 -->
      <div
        v-for="(detail, index) in data?.projectDetails"
        :key="detail.id"
        class="project-detail-card"
      >
        <div class="detail-header">
          <span class="detail-title">工程 {{ index + 1 }}: {{ detail.projectName }}</span>
          <div class="detail-tags">
            <el-tag type="primary" effect="light" size="small">
              {{ getFloodProjectTypeText(detail.projectType) }}
            </el-tag>
            <el-tag type="warning" effect="light" size="small" style="margin-left: 8px;">
              {{ getRiskTypeText(detail.riskType) }}
            </el-tag>
          </div>
        </div>

        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="关联水系">{{ detail.relatedWaterSystem || '-' }}</el-descriptions-item>
          <el-descriptions-item label="汛期时段">
            {{ detail.floodSeasonStart }} 至 {{ detail.floodSeasonEnd }}
          </el-descriptions-item>
          <el-descriptions-item label="施工单位/运维单位" :span="2">
            {{ detail.constructionUnit || '-' }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="detail-content">
          <div class="content-item">
            <div class="content-label">关键节点工期：</div>
            <div class="content-value">{{ detail.keyNodeSchedule || '-' }}</div>
          </div>
          <div class="content-item">
            <div class="content-label">主要影响：</div>
            <div class="content-value">{{ detail.mainImpact || '-' }}</div>
          </div>
          <div class="content-item">
            <div class="content-label">应对保障措施：</div>
            <div class="content-value">{{ detail.safeguardMeasures || '-' }}</div>
          </div>
          <div class="content-item">
            <div class="content-label">历年涉险事件（2020年1月1日以来）：</div>
            <div class="content-value">{{ detail.historicalIncidents || '-' }}</div>
          </div>
          <div class="content-item" v-if="detail.remark">
            <div class="content-label">备注：</div>
            <div class="content-value">{{ detail.remark }}</div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty v-if="!data?.projectDetails?.length" description="暂无防汛工程明细" />
    </div>

    <!-- 历史修改记录 -->
    <div class="detail-section">
      <div class="section-title">历史修改记录</div>
      <el-timeline>
        <el-timeline-item
          v-for="(record, index) in historyRecords"
          :key="index"
          :timestamp="record.time"
          :type="record.type"
        >
          {{ record.content }}
        </el-timeline-item>
      </el-timeline>
    </div>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { FloodPrevention } from '@/types/flood-prevention'
import { getFloodProjectTypeText, getRiskTypeText } from '@/types/flood-prevention'

const props = defineProps<{
  modelValue: boolean
  data: FloodPrevention | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 历史记录（模拟数据）
const historyRecords = ref([
  { time: '2024-03-20 14:20:00', content: '修改了防汛工程明细信息', type: 'primary' },
  { time: '2024-03-15 11:30:00', content: '新增防汛工程：泵站设备安装', type: 'success' },
  { time: '2024-02-01 09:00:00', content: '创建防汛专项管理记录', type: 'info' }
])

// 监听弹窗显示，根据实际数据生成历史记录
watch(() => props.modelValue, (val) => {
  if (val && props.data) {
    // 根据实际数据生成历史记录
    const records = []
    if (props.data.updateTime !== props.data.createTime) {
      records.push({
        time: props.data.updateTime,
        content: '修改了防汛专项管理信息',
        type: 'primary'
      })
    }
    records.push({
      time: props.data.createTime,
      content: '创建防汛专项管理记录',
      type: 'info'
    })
    historyRecords.value = records
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

.project-detail-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: var(--el-fill-color-lighter);

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px dashed var(--el-border-color);

    .detail-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .detail-tags {
      display: flex;
    }
  }

  .detail-content {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--el-border-color-lighter);

    .content-item {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .content-label {
        font-weight: 600;
        color: var(--el-text-color-regular);
        margin-bottom: 4px;
      }

      .content-value {
        color: var(--el-text-color-primary);
        line-height: 1.6;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
