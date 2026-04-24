<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>库存台账</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="code" label="物资编码" width="120" />
        <ElTableColumn prop="name" label="物资名称" />
        <ElTableColumn prop="spec" label="规格型号" />
        <ElTableColumn prop="unit" label="单位" width="80" />
        <ElTableColumn prop="quantity" label="库存数量" />
        <ElTableColumn prop="warehouse" label="所在仓库" />
        <ElTableColumn prop="safetyStock" label="安全库存" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'MaterialInventory' })
const tableData = [
  { code: 'WZ001', name: '水泵叶轮', spec: 'DN200', unit: '件', quantity: 15, warehouse: '备件库', safetyStock: 5 },
  { code: 'WZ002', name: '蝶阀', spec: 'DN300 PN16', unit: '个', quantity: 8, warehouse: '主材料库', safetyStock: 3 },
  { code: 'WZ003', name: '聚合氯化铝', spec: '工业级', unit: '吨', quantity: 12, warehouse: '药剂库', safetyStock: 5 },
]
</script>
