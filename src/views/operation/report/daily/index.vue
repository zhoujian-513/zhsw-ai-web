<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>日报管理</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="date" label="日期" width="130" />
        <ElTableColumn prop="waterSupply" label="供水量(m³)" width="130" />
        <ElTableColumn prop="waterSell" label="售水量(m³)" width="130" />
        <ElTableColumn prop="pressure" label="管网压力(MPa)" width="150" />
        <ElTableColumn prop="quality" label="水质合格率" width="120" />
        <ElTableColumn prop="author" label="填报人" width="100" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OperationReportDaily' })
const tableData = [
  { date: '2024-03-12', waterSupply: '12580', waterSell: '11820', pressure: '0.32', quality: '100%', author: '值班员甲', status: '已审核' },
  { date: '2024-03-11', waterSupply: '12340', waterSell: '11650', pressure: '0.31', quality: '100%', author: '值班员乙', status: '已审核' },
  { date: '2024-03-10', waterSupply: '12760', waterSell: '11980', pressure: '0.33', quality: '100%', author: '值班员甲', status: '已审核' },
]
</script>
