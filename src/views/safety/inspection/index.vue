<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>安全巡检</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="巡检单号" width="120" />
        <ElTableColumn prop="route" label="巡检路线" />
        <ElTableColumn prop="inspector" label="巡检人" />
        <ElTableColumn prop="date" label="巡检日期" />
        <ElTableColumn prop="status" label="状态" />
        <ElTableColumn label="操作" width="150">
          <template #default><ElButton type="primary" size="small">查看</ElButton></template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'SafetyInspection' })
const tableData = [
  { id: 'XJ2024030001', route: '泵站巡检路线A', inspector: '张三', date: '2024-03-01', status: '已完成' },
  { id: 'XJ2024030002', route: '管网巡检路线B', inspector: '李四', date: '2024-03-02', status: '进行中' },
  { id: 'XJ2024030003', route: '水厂巡检路线C', inspector: '王五', date: '2024-03-03', status: '待开始' },
]
</script>
