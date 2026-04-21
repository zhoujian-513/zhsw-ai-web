<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>出入库记录</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="单据编号" width="130" />
        <ElTableColumn prop="type" label="类型" width="80" />
        <ElTableColumn prop="name" label="物资名称" />
        <ElTableColumn prop="quantity" label="数量" />
        <ElTableColumn prop="operator" label="经办人" />
        <ElTableColumn prop="date" label="日期" />
        <ElTableColumn prop="remark" label="备注" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'MaterialInOut' })
const tableData = [
  { id: 'RK2024030001', type: '入库', name: '水泵密封件', quantity: '20套', operator: '赵仓管', date: '2024-03-10', remark: '采购入库' },
  { id: 'CK2024030001', type: '出库', name: 'DN300球阀', quantity: '2个', operator: '赵仓管', date: '2024-03-11', remark: '维修领用' },
  { id: 'RK2024030002', type: '入库', name: '聚合氯化铝', quantity: '5吨', operator: '钱仓管', date: '2024-03-12', remark: '采购入库' },
]
</script>
