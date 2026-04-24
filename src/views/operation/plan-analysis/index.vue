<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>计划完成分析</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="indicator" label="指标名称" />
        <ElTableColumn prop="unit" label="单位" width="80" />
        <ElTableColumn prop="yearPlan" label="年度计划" width="120" />
        <ElTableColumn prop="yearActual" label="年度实际" width="120" />
        <ElTableColumn prop="completionRate" label="完成率" width="100" />
        <ElTableColumn prop="monthPlan" label="本月计划" width="120" />
        <ElTableColumn prop="monthActual" label="本月实际" width="120" />
        <ElTableColumn prop="monthRate" label="本月完成率" width="120" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OperationPlanAnalysis' })
const tableData = [
  { indicator: '供水量', unit: '万m³', yearPlan: '460', yearActual: '113.4', completionRate: '24.7%', monthPlan: '38', monthActual: '38.4', monthRate: '101.1%' },
  { indicator: '售水量', unit: '万m³', yearPlan: '430', yearActual: '105.5', completionRate: '24.5%', monthPlan: '35', monthActual: '35.6', monthRate: '101.7%' },
  { indicator: '营业收入', unit: '万元', yearPlan: '2600', yearActual: '633.0', completionRate: '24.3%', monthPlan: '215', monthActual: '213.6', monthRate: '99.3%' },
  { indicator: '漏损率', unit: '%', yearPlan: '≤7.0', yearActual: '6.97', completionRate: '达标', monthPlan: '≤7.0', monthActual: '7.3', monthRate: '未达标' },
]
</script>
