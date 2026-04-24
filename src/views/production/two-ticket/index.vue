<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>两票管理</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="票号" width="150" />
        <ElTableColumn prop="type" label="票类型" width="100" />
        <ElTableColumn prop="title" label="工作内容" />
        <ElTableColumn prop="applicant" label="申请人" width="100" />
        <ElTableColumn prop="status" label="状态" width="80" />
        <ElTableColumn prop="date" label="申请日期" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'ProductionTwoTicket' })
const tableData = [
  { id: 'GZP2024030001', type: '工作票', title: '1号水泵电机更换', applicant: '张工', status: '已审批', date: '2024-03-10' },
  { id: 'CZP2024030001', type: '操作票', title: '10kV开关倒闸操作', applicant: '李电工', status: '执行中', date: '2024-03-11' },
  { id: 'GZP2024030002', type: '工作票', title: '变频器日常维护', applicant: '王维修', status: '待审批', date: '2024-03-12' },
]
</script>
