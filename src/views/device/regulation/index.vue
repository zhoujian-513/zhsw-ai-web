<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>设备规程</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="code" label="规程编号" width="150" />
        <ElTableColumn prop="name" label="规程名称" />
        <ElTableColumn prop="deviceType" label="设备类型" />
        <ElTableColumn prop="version" label="版本" width="80" />
        <ElTableColumn prop="status" label="状态" width="80" />
        <ElTableColumn prop="updatedAt" label="更新时间" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'DeviceRegulation' })
const tableData = [
  { code: 'REG2024001', name: '水泵操作规程', deviceType: '水泵', version: 'V2.0', status: '有效', updatedAt: '2024-01-10' },
  { code: 'REG2024002', name: '变频器维护规程', deviceType: '变频器', version: 'V1.5', status: '有效', updatedAt: '2024-02-15' },
  { code: 'REG2024003', name: '电机检修规程', deviceType: '电机', version: 'V3.0', status: '有效', updatedAt: '2024-03-01' },
]
</script>
