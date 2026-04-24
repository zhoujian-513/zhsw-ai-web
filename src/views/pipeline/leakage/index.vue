<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>漏损分析</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="area" label="区域" width="120" />
        <ElTableColumn prop="supplyVolume" label="供水量(m³)" width="140" />
        <ElTableColumn prop="sellVolume" label="售水量(m³)" width="140" />
        <ElTableColumn prop="lossVolume" label="漏损量(m³)" width="140" />
        <ElTableColumn prop="lossRate" label="漏损率" width="100" />
        <ElTableColumn prop="level" label="漏损等级" width="100" />
        <ElTableColumn prop="updateTime" label="统计时间" width="160" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'PipelineLeakage' })
const tableData = [
  { area: '城东供水区', supplyVolume: '45230', sellVolume: '42010', lossVolume: '3220', lossRate: '7.12%', level: '正常', updateTime: '2024-03-12 08:00' },
  { area: '城西供水区', supplyVolume: '38760', sellVolume: '34890', lossVolume: '3870', lossRate: '9.98%', level: '偏高', updateTime: '2024-03-12 08:00' },
  { area: '城南供水区', supplyVolume: '52180', sellVolume: '49100', lossVolume: '3080', lossRate: '5.90%', level: '正常', updateTime: '2024-03-12 08:00' },
  { area: '城北供水区', supplyVolume: '41620', sellVolume: '38200', lossVolume: '3420', lossRate: '8.22%', level: '偏高', updateTime: '2024-03-12 08:00' },
]
</script>
