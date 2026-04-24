<template>
  <div class="dashboard-compare">
    <div class="page-header">
      <h2>租户对比</h2>
      <p class="subtitle">多租户核心指标横向对比分析</p>
    </div>

    <!-- 对比维度选择 -->
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true">
        <ElFormItem label="对比维度">
          <ElSelect v-model="dimension" style="width: 160px">
            <ElOption label="设备在线率" value="onlineRate" />
            <ElOption label="日供水量" value="waterSupply" />
            <ElOption label="告警次数" value="alarmCount" />
            <ElOption label="管网覆盖" value="pipelineKm" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="时间范围">
          <ElSelect v-model="timeRange" style="width: 120px">
            <ElOption label="近7天" value="7d" />
            <ElOption label="近30天" value="30d" />
            <ElOption label="近90天" value="90d" />
          </ElSelect>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <!-- 对比表格 -->
    <ElCard shadow="never" class="mt-16">
      <template #header><span>指标对比详情</span></template>
      <ElTable :data="compareData" stripe border>
        <ElTableColumn prop="name" label="租户" width="160" />
        <ElTableColumn prop="deviceCount" label="设备总数" align="center" />
        <ElTableColumn prop="onlineRate" label="在线率(%)" align="center" />
        <ElTableColumn prop="alarmCount" label="告警次数" align="center" />
        <ElTableColumn prop="waterSupply" label="日供水量(吨)" align="center" />
        <ElTableColumn prop="pipelineKm" label="管网(km)" align="center" />
        <ElTableColumn label="综合评分" align="center">
          <template #default="{ row }">
            <ElRate :model-value="row.score" disabled />
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DashboardCompare' })

const dimension = ref('onlineRate')
const timeRange = ref('7d')

const compareData = [
  { name: 'A项目公司', deviceCount: 3842, onlineRate: 96.2, alarmCount: 45, waterSupply: 152400, pipelineKm: 986, score: 5 },
  { name: 'B项目公司', deviceCount: 4120, onlineRate: 98.1, alarmCount: 21, waterSupply: 168900, pipelineKm: 1124, score: 5 },
  { name: 'C项目公司', deviceCount: 2654, onlineRate: 94.3, alarmCount: 63, waterSupply: 89600, pipelineKm: 742, score: 4 },
  { name: 'D项目公司', deviceCount: 1870, onlineRate: 91.5, alarmCount: 87, waterSupply: 47420, pipelineKm: 412, score: 3 },
]
</script>

<style scoped lang="scss">
.dashboard-compare {
  padding: 16px;
  .page-header {
    margin-bottom: 16px;
    h2 { margin: 0 0 4px; font-size: 18px; font-weight: 600; }
    .subtitle { margin: 0; color: var(--art-gray-600); font-size: 13px; }
  }
  .filter-card { margin-bottom: 0; }
  .mt-16 { margin-top: 16px; }
}
</style>
