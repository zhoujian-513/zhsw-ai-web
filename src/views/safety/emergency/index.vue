<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>应急预案</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="预案编号" width="120" />
        <ElTableColumn prop="name" label="预案名称" />
        <ElTableColumn prop="type" label="预案类型" />
        <ElTableColumn prop="level" label="响应级别" />
        <ElTableColumn prop="updateDate" label="更新日期" />
        <ElTableColumn label="操作" width="150">
          <template #default><ElButton type="primary" size="small">查看</ElButton></template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'SafetyEmergency' })
const tableData = [
  { id: 'YA001', name: '供水突发事件应急预案', type: '综合预案', level: 'Ⅱ级', updateDate: '2024-01-15' },
  { id: 'YA002', name: '水质污染应急预案', type: '专项预案', level: 'Ⅰ级', updateDate: '2024-02-10' },
  { id: 'YA003', name: '设备故障应急预案', type: '现场处置方案', level: 'Ⅲ级', updateDate: '2024-03-01' },
]
</script>
