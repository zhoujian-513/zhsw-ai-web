<template>
  <div class="page-container">
    <div class="page-header"><h2>设备展示分析</h2></div>

    <!-- 统计卡片 -->
    <ElRow :gutter="16" class="stat-row">
      <ElCol :span="6" v-for="item in statCards" :key="item.label">
        <ElCard shadow="never" class="stat-card">
          <div class="stat-content">
            <p class="stat-value" :style="{ color: item.color }">{{ item.value }}</p>
            <p class="stat-label">{{ item.label }}</p>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <ElRow :gutter="16" class="mt-16">
      <!-- 设备类别分布 -->
      <ElCol :span="12">
        <ElCard shadow="never">
          <template #header><span>设备类别分布</span></template>
          <div class="chart-placeholder">
            <ElTable :data="categoryDist" size="small" border>
              <ElTableColumn prop="category" label="设备类别" />
              <ElTableColumn prop="count" label="数量" align="center" />
              <ElTableColumn prop="ratio" label="占比" align="center">
                <template #default="{ row }">
                  <ElProgress :percentage="row.ratio" :stroke-width="6" />
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </ElCard>
      </ElCol>
      <!-- 运行状态分布 -->
      <ElCol :span="12">
        <ElCard shadow="never">
          <template #header><span>运行状态分布</span></template>
          <div class="chart-placeholder">
            <ElTable :data="statusDist" size="small" border>
              <ElTableColumn prop="status" label="运行状态" />
              <ElTableColumn prop="count" label="数量" align="center" />
              <ElTableColumn prop="ratio" label="占比" align="center">
                <template #default="{ row }">
                  <ElProgress :percentage="row.ratio" :stroke-width="6" :color="row.color" />
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <!-- 设备年龄分析 -->
    <ElCard shadow="never" class="mt-16">
      <template #header><span>设备使用年限分析</span></template>
      <ElTable :data="ageAnalysis" stripe border>
        <ElTableColumn prop="range" label="年限区间" />
        <ElTableColumn prop="count" label="设备数量" align="center" />
        <ElTableColumn prop="ratio" label="占比" align="center">
          <template #default="{ row }">
            <ElProgress :percentage="row.ratio" :stroke-width="8" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="suggestion" label="维护建议" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceAnalysis' })

const statCards = [
  { label: '设备总数', value: '486', color: '#409eff' },
  { label: '正常运行', value: '432', color: '#67c23a' },
  { label: '停机/维修', value: '54', color: '#f56c6c' },
  { label: '平均机龄(年)', value: '6.2', color: '#e6a23c' },
]

const categoryDist = [
  { category: '水泵', count: 124, ratio: 26 },
  { category: '阀门', count: 186, ratio: 38 },
  { category: '流量计', count: 98, ratio: 20 },
  { category: '仪表', count: 78, ratio: 16 },
]

const statusDist = [
  { status: '正常运行', count: 432, ratio: 89, color: '#67c23a' },
  { status: '计划停机', count: 28, ratio: 6, color: '#409eff' },
  { status: '故障停机', count: 14, ratio: 3, color: '#f56c6c' },
  { status: '维修中', count: 12, ratio: 2, color: '#e6a23c' },
]

const ageAnalysis = [
  { range: '0-3年', count: 96, ratio: 20, suggestion: '正常运行，按计划维保' },
  { range: '3-8年', count: 243, ratio: 50, suggestion: '加强定期检查，预防性维护' },
  { range: '8-15年', count: 122, ratio: 25, suggestion: '重点关注，制定更换计划' },
  { range: '15年以上', count: 25, ratio: 5, suggestion: '建议优先列入大修或重置计划' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.stat-card {
  .stat-content { text-align: center; padding: 8px 0; }
  .stat-value { font-size: 28px; font-weight: 700; margin: 0 0 4px; }
  .stat-label { font-size: 12px; color: var(--art-gray-600); margin: 0; }
}
.mt-16 { margin-top: 16px; }
</style>
