<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>管网巡检</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="巡检单号" width="130" />
        <ElTableColumn prop="route" label="巡检路线" />
        <ElTableColumn prop="patroller" label="巡检人员" width="100" />
        <ElTableColumn prop="planDate" label="计划日期" width="120" />
        <ElTableColumn prop="actualDate" label="实际日期" width="120" />
        <ElTableColumn prop="findCount" label="发现问题" width="100" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'PipelinePatrol' })
const tableData = [
  { id: 'JX2024030001', route: '城东主干管线（A段）', patroller: '巡检员甲', planDate: '2024-03-12', actualDate: '2024-03-12', findCount: 0, status: '已完成' },
  { id: 'JX2024030002', route: '城西配水管线（B段）', patroller: '巡检员乙', planDate: '2024-03-12', actualDate: '2024-03-12', findCount: 1, status: '待处理' },
  { id: 'JX2024030003', route: '城南主干管线（C段）', patroller: '巡检员丙', planDate: '2024-03-13', actualDate: '', findCount: 0, status: '未开始' },
]
</script>
