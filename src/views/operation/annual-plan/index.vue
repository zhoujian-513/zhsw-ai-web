<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>年度计划</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="year" label="年份" width="100" />
        <ElTableColumn prop="indicator" label="指标名称" />
        <ElTableColumn prop="unit" label="单位" width="80" />
        <ElTableColumn prop="target" label="目标值" width="120" />
        <ElTableColumn prop="basis" label="制定依据" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OperationAnnualPlan' })
const tableData = [
  { year: '2024', indicator: '供水量', unit: '万m³', target: '460', basis: '同比增长5%', status: '执行中' },
  { year: '2024', indicator: '售水量', unit: '万m³', target: '430', basis: '同比增长5%', status: '执行中' },
  { year: '2024', indicator: '营业收入', unit: '万元', target: '2600', basis: '同比增长8%', status: '执行中' },
  { year: '2024', indicator: '漏损率', unit: '%', target: '≤7.0', basis: '国家标准要求', status: '执行中' },
  { year: '2024', indicator: '水质合格率', unit: '%', target: '100', basis: '国家标准要求', status: '执行中' },
]
</script>
