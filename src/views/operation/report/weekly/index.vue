<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>周报管理</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="week" label="周次" width="130" />
        <ElTableColumn prop="dateRange" label="日期范围" width="180" />
        <ElTableColumn prop="totalSupply" label="总供水量(m³)" width="140" />
        <ElTableColumn prop="totalSell" label="总售水量(m³)" width="140" />
        <ElTableColumn prop="lossRate" label="漏损率" width="100" />
        <ElTableColumn prop="alarmCount" label="报警次数" width="100" />
        <ElTableColumn prop="author" label="填报人" width="100" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OperationReportWeekly' })
const tableData = [
  { week: '2024年第11周', dateRange: '2024-03-11 ~ 2024-03-17', totalSupply: '87640', totalSell: '81250', lossRate: '7.3%', alarmCount: 5, author: '运营主管', status: '已审核' },
  { week: '2024年第10周', dateRange: '2024-03-04 ~ 2024-03-10', totalSupply: '86230', totalSell: '80100', lossRate: '7.1%', alarmCount: 3, author: '运营主管', status: '已审核' },
]
</script>
