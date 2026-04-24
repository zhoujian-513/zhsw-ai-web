<template>
  <el-dialog
    v-model="visible"
    title="特种设备详情"
    width="1000px"
    destroy-on-close
  >
    <!-- 基础信息区 -->
    <div class="detail-section">
      <div class="section-title">基础信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="所属厂站">{{ data?.stationName }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ data?.name }}</el-descriptions-item>
        <el-descriptions-item label="设备编码">{{ data?.code }}</el-descriptions-item>
        <el-descriptions-item label="设备类型">{{ data?.type }}</el-descriptions-item>
        <el-descriptions-item label="所属工艺段">{{ data?.processSection }}</el-descriptions-item>
        <el-descriptions-item label="所属构筑物">{{ data?.structure }}</el-descriptions-item>
        <el-descriptions-item label="型号规格">{{ data?.model }}</el-descriptions-item>
        <el-descriptions-item label="制造单位">{{ data?.manufacturer }}</el-descriptions-item>
        <el-descriptions-item label="生产日期">{{ data?.productionDate }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 特种设备信息区 -->
    <div class="detail-section">
      <div class="section-title">特种设备信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="设备注册代码">{{ data?.registrationCode }}</el-descriptions-item>
        <el-descriptions-item label="使用证编号">{{ data?.certificateNo }}</el-descriptions-item>
        <el-descriptions-item label="吨数">{{ data?.tonnage || '-' }}</el-descriptions-item>
        <el-descriptions-item label="设计使用年限">{{ data?.designLife }} 年</el-descriptions-item>
        <el-descriptions-item label="使用状态">
          <el-tag :type="data?.usageStatus === 'in_use' ? 'success' : 'info'">
            {{ data?.usageStatus === 'in_use' ? '在用' : '停用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="使用地点">{{ data?.usageLocation }}</el-descriptions-item>
        <el-descriptions-item label="检验周期">{{ data?.inspectionCycle }} 月</el-descriptions-item>
        <el-descriptions-item label="安全管理责任人">{{ data?.safetyManager }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 校验记录区 -->
    <div class="detail-section">
      <div class="section-title">校验记录</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="最近一次校验日期">{{ data?.lastInspectionDate }}</el-descriptions-item>
        <el-descriptions-item label="下次校验日期">{{ data?.nextInspectionDate }}</el-descriptions-item>
        <el-descriptions-item label="校验状态">
          <el-tag
            :type="getVerificationStatusType(data?.verificationStatus)"
            :effect="data?.verificationStatus === 'expired' ? 'dark' : 'light'"
          >
            {{ getVerificationStatusText(data?.verificationStatus) }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 历史校验记录列表 -->
      <div class="inspection-record-list">
        <div class="list-header">
          <span class="list-title">历史校验记录</span>
        </div>
        <el-table :data="inspectionRecords" border size="small">
          <el-table-column prop="inspectionDate" label="检验日期" width="120" />
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
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getInspectionRecordList } from '@/api/special-equipment'
import type { SpecialEquipment, InspectionRecord } from '@/types/special-equipment'

const props = defineProps<{
  modelValue: boolean
  data: SpecialEquipment | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 校验记录列表
const inspectionRecords = ref<InspectionRecord[]>([])

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

// 获取校验记录
const fetchInspectionRecords = async (equipmentId: number) => {
  try {
    const res = await getInspectionRecordList(equipmentId)
    inspectionRecords.value = res.data
  } catch (error) {
    console.error('获取校验记录失败:', error)
  }
}

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val && props.data?.id) {
    fetchInspectionRecords(props.data.id)
  }
})

// 历史记录（模拟数据）
const historyRecords = ref([
  { time: '2024-01-15 10:30:00', content: '修改了使用状态：在用 → 停用', type: 'primary' },
  { time: '2024-01-10 14:20:00', content: '修改了安全管理责任人：张三 → 李四', type: 'primary' },
  { time: '2024-01-05 09:15:00', content: '新增校验记录，下次校验日期更新为 2024-07-05', type: 'success' },
  { time: '2023-12-20 16:45:00', content: '创建设备台账', type: 'info' }
])

// 下载附件
const handleDownload = (url: string) => {
  ElMessage.info(`下载附件: ${url}`)
}
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
</style>
