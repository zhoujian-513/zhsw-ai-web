<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>监测对象配置</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="对象编号" width="130" />
        <ElTableColumn prop="name" label="对象名称" />
        <ElTableColumn prop="type" label="类型" width="100" />
        <ElTableColumn prop="location" label="安装位置" />
        <ElTableColumn prop="protocol" label="通讯协议" width="120" />
        <ElTableColumn prop="status" label="状态" width="80" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'MonitorObjectConfig' })
const tableData = [
  { id: 'SENSOR001', name: '1号泵房液位计', type: '液位', location: '1号泵房', protocol: 'Modbus RTU', status: '在线' },
  { id: 'SENSOR002', name: '出水口流量计', type: '流量', location: '出水管道', protocol: 'Modbus TCP', status: '在线' },
  { id: 'SENSOR003', name: '进水压力表', type: '压力', location: '进水管', protocol: 'Modbus RTU', status: '离线' },
]
</script>
