<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>月报管理</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="month" label="月份" width="120" />
        <ElTableColumn prop="totalSupply" label="总供水量(万m³)" width="150" />
        <ElTableColumn prop="totalSell" label="总售水量(万m³)" width="150" />
        <ElTableColumn prop="revenue" label="营业收入(万元)" width="150" />
        <ElTableColumn prop="lossRate" label="漏损率" width="100" />
        <ElTableColumn prop="qualityRate" label="水质合格率" width="120" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OperationReportMonthly' })
const tableData = [
  { month: '2024年03月', totalSupply: '38.4', totalSell: '35.6', revenue: '213.6', lossRate: '7.3%', qualityRate: '100%', status: '进行中' },
  { month: '2024年02月', totalSupply: '35.2', totalSell: '32.8', revenue: '196.8', lossRate: '6.8%', qualityRate: '100%', status: '已审核' },
  { month: '2024年01月', totalSupply: '39.8', totalSell: '37.1', revenue: '222.6', lossRate: '6.8%', qualityRate: '100%', status: '已审核' },
]
</script>
