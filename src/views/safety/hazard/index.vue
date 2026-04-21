<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>隐患排查</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="编号" width="80" />
        <ElTableColumn prop="location" label="隐患地点" />
        <ElTableColumn prop="level" label="危险等级" />
        <ElTableColumn prop="status" label="状态" />
        <ElTableColumn prop="discoverer" label="发现人" />
        <ElTableColumn prop="date" label="发现日期" />
        <ElTableColumn label="操作" width="150">
          <template #default><ElButton type="primary" size="small">处理</ElButton></template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'SafetyHazard' })
const tableData = [
  { id: 'AQ001', location: '1号泵站阀门间', level: '较大', status: '待处理', discoverer: '张工', date: '2024-03-01' },
  { id: 'AQ002', location: '净水车间加药间', level: '一般', status: '处理中', discoverer: '李工', date: '2024-03-05' },
  { id: 'AQ003', location: '2号清水池', level: '重大', status: '已关闭', discoverer: '王工', date: '2024-03-10' },
]
</script>
