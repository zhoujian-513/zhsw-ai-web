<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>管网档案</span></template>
      <ElTable :data="tableData" border stripe>
        <ElTableColumn prop="id" label="档案编号" width="130" />
        <ElTableColumn prop="name" label="管段名称" />
        <ElTableColumn prop="type" label="管材类型" width="120" />
        <ElTableColumn prop="diameter" label="管径(mm)" width="100" />
        <ElTableColumn prop="length" label="长度(m)" width="100" />
        <ElTableColumn prop="installDate" label="安装年份" width="100" />
        <ElTableColumn prop="area" label="所在区域" width="120" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'PipelineArchive' })
const tableData = [
  { id: 'GW2018001', name: '城东主干管DN600', type: '球墨铸铁管', diameter: 600, length: 2340, installDate: '2018', area: '城东区', status: '正常' },
  { id: 'GW2015002', name: '城西配水管DN300', type: 'PE管', diameter: 300, length: 1580, installDate: '2015', area: '城西区', status: '正常' },
  { id: 'GW2010003', name: '老城区供水管DN200', type: '灰铸铁管', diameter: 200, length: 860, installDate: '2010', area: '老城区', status: '待改造' },
]
</script>
