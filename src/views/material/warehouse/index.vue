<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>仓库管理</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="仓库编号" width="100" />
        <ElTableColumn prop="name" label="仓库名称" />
        <ElTableColumn prop="type" label="仓库类型" />
        <ElTableColumn prop="location" label="位置" />
        <ElTableColumn prop="manager" label="负责人" />
        <ElTableColumn prop="capacity" label="库存容量" />
        <ElTableColumn label="操作" width="150">
          <template #default><ElButton type="primary" size="small">详情</ElButton></template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'MaterialWarehouse' })
const tableData = [
  { id: 'CK001', name: '主材料库', type: '综合仓库', location: '水厂东区', manager: '赵仓管', capacity: '5000件' },
  { id: 'CK002', name: '备件库', type: '备件仓库', location: '水厂西区', manager: '钱仓管', capacity: '2000件' },
  { id: 'CK003', name: '危化品库', type: '危化品仓库', location: '加药间旁', manager: '孙仓管', capacity: '500件' },
]
</script>
