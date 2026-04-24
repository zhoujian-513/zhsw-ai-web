<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>项目管理</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="项目编号" width="130" />
        <ElTableColumn prop="name" label="项目名称" />
        <ElTableColumn prop="type" label="项目类型" width="100" />
        <ElTableColumn prop="budget" label="预算金额" width="120" />
        <ElTableColumn prop="startDate" label="开始日期" width="120" />
        <ElTableColumn prop="endDate" label="结束日期" width="120" />
        <ElTableColumn prop="status" label="项目状态" width="100" />
        <ElTableColumn prop="manager" label="项目负责人" width="120" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'OperationProject' })
const tableData = [
  { id: 'XM2024001', name: '城区供水管网改造工程', type: '改造工程', budget: '320万元', startDate: '2024-01-15', endDate: '2024-06-30', status: '进行中', manager: '张工' },
  { id: 'XM2024002', name: '污水处理厂扩容项目', type: '新建工程', budget: '1200万元', startDate: '2024-03-01', endDate: '2024-12-31', status: '进行中', manager: '李工' },
  { id: 'XM2024003', name: '加压泵站设备更新', type: '设备购置', budget: '85万元', startDate: '2024-02-01', endDate: '2024-04-30', status: '已完工', manager: '王工' },
]
</script>
