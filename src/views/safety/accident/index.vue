<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>事故记录</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="事故编号" width="120" />
        <ElTableColumn prop="name" label="事故名称" />
        <ElTableColumn prop="type" label="事故类型" />
        <ElTableColumn prop="level" label="事故等级" />
        <ElTableColumn prop="date" label="发生日期" />
        <ElTableColumn prop="status" label="处理状态" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'SafetyAccident' })
const tableData = [
  { id: 'SG2024001', name: '1号泵站水泵故障', type: '设备事故', level: '一般', date: '2024-02-15', status: '已结案' },
  { id: 'SG2024002', name: '输水管道爆管', type: '管网事故', level: '较大', date: '2024-03-01', status: '处理中' },
]
</script>
