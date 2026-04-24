<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>采购申请</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="申请单号" width="130" />
        <ElTableColumn prop="name" label="物资名称" />
        <ElTableColumn prop="quantity" label="申请数量" />
        <ElTableColumn prop="applicant" label="申请人" />
        <ElTableColumn prop="date" label="申请日期" />
        <ElTableColumn prop="status" label="审批状态" />
        <ElTableColumn label="操作" width="150">
          <template #default><ElButton type="primary" size="small">审批</ElButton></template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'MaterialPurchase' })
const tableData = [
  { id: 'CG2024030001', name: '水泵密封件', quantity: '20套', applicant: '张工', date: '2024-03-01', status: '审批中' },
  { id: 'CG2024030002', name: '氯气检测仪', quantity: '2台', applicant: '李工', date: '2024-03-05', status: '已批准' },
  { id: 'CG2024030003', name: 'DN300球阀', quantity: '5个', applicant: '王工', date: '2024-03-08', status: '待提交' },
]
</script>
