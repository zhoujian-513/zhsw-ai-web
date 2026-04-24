<template>
  <div class="page-container">
    <div class="page-header"><h2>数据分析管理</h2></div>
    <ElRow :gutter="16">
      <ElCol :span="12">
        <ElCard shadow="never">
          <template #header><span>水质趋势分析（近7天）</span></template>
          <ElTable :data="waterQualityTrend" stripe size="small" border>
            <ElTableColumn prop="date" label="日期" />
            <ElTableColumn prop="turbidity" label="浊度(NTU)" align="center" />
            <ElTableColumn prop="chlorine" label="余氯(mg/L)" align="center" />
            <ElTableColumn prop="ph" label="pH值" align="center" />
            <ElTableColumn prop="status" label="达标" align="center" width="80">
              <template #default="{ row }">
                <ElTag :type="row.status === '达标' ? 'success' : 'danger'" size="small">{{ row.status }}</ElTag>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard shadow="never">
          <template #header><span>供水量趋势分析（近7天）</span></template>
          <ElTable :data="supplyTrend" stripe size="small" border>
            <ElTableColumn prop="date" label="日期" />
            <ElTableColumn prop="supply" label="供水量(m³)" align="center" />
            <ElTableColumn prop="pressure" label="平均压力(MPa)" align="center" />
            <ElTableColumn prop="peakFlow" label="峰值流量(m³/h)" align="center" />
          </ElTable>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElCard shadow="never" class="mt-16">
      <template #header><span>月度报警统计</span></template>
      <ElTable :data="alarmMonthly" stripe border>
        <ElTableColumn prop="month" label="月份" width="100" />
        <ElTableColumn prop="total" label="总报警数" align="center" />
        <ElTableColumn prop="critical" label="紧急" align="center">
          <template #default="{ row }"><span style="color:#f56c6c;font-weight:600">{{ row.critical }}</span></template>
        </ElTableColumn>
        <ElTableColumn prop="important" label="重要" align="center">
          <template #default="{ row }"><span style="color:#e6a23c;font-weight:600">{{ row.important }}</span></template>
        </ElTableColumn>
        <ElTableColumn prop="normal" label="一般" align="center" />
        <ElTableColumn prop="resolved" label="已处理率" align="center">
          <template #default="{ row }">
            <ElProgress :percentage="row.resolved" :stroke-width="6" />
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MonitorAnalysis' })
const waterQualityTrend = [
  { date: '2026-03-24', turbidity: '0.28', chlorine: '0.18', ph: '7.2', status: '达标' },
  { date: '2026-03-25', turbidity: '0.31', chlorine: '0.16', ph: '7.3', status: '达标' },
  { date: '2026-03-26', turbidity: '0.45', chlorine: '0.12', ph: '7.1', status: '达标' },
  { date: '2026-03-27', turbidity: '0.62', chlorine: '0.08', ph: '7.0', status: '不达标' },
  { date: '2026-03-28', turbidity: '0.35', chlorine: '0.15', ph: '7.2', status: '达标' },
  { date: '2026-03-29', turbidity: '0.29', chlorine: '0.17', ph: '7.3', status: '达标' },
  { date: '2026-03-30', turbidity: '0.32', chlorine: '0.18', ph: '7.2', status: '达标' },
]
const supplyTrend = [
  { date: '2026-03-24', supply: '28640', pressure: '0.36', peakFlow: '1580' },
  { date: '2026-03-25', supply: '29120', pressure: '0.37', peakFlow: '1620' },
  { date: '2026-03-26', supply: '27890', pressure: '0.35', peakFlow: '1540' },
  { date: '2026-03-27', supply: '28300', pressure: '0.36', peakFlow: '1560' },
  { date: '2026-03-28', supply: '30150', pressure: '0.38', peakFlow: '1680' },
  { date: '2026-03-29', supply: '29800', pressure: '0.37', peakFlow: '1650' },
  { date: '2026-03-30', supply: '28900', pressure: '0.37', peakFlow: '1600' },
]
const alarmMonthly = [
  { month: '2026-01', total: 38, critical: 5, important: 12, normal: 21, resolved: 95 },
  { month: '2026-02', total: 29, critical: 3, important: 10, normal: 16, resolved: 100 },
  { month: '2026-03', total: 12, critical: 2, important: 4, normal: 6, resolved: 58 },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.mt-16 { margin-top: 16px; }
</style>
