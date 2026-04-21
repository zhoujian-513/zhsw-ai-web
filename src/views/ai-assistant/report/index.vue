<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>数据分析报告</span></template>
      <div class="report-toolbar">
        <ElSelect v-model="reportType" style="width: 160px" placeholder="报告类型">
          <ElOption label="供水运营分析" value="supply" />
          <ElOption label="水质合规分析" value="quality" />
          <ElOption label="设备健康分析" value="device" />
          <ElOption label="漏损专项分析" value="leakage" />
        </ElSelect>
        <ElSelect v-model="reportPeriod" style="width: 140px" placeholder="报告周期">
          <ElOption label="日报" value="daily" />
          <ElOption label="周报" value="weekly" />
          <ElOption label="月报" value="monthly" />
        </ElSelect>
        <ElButton type="primary">生成报告</ElButton>
      </div>
      <ElTable :data="tableData" border stripe style="margin-top: 20px">
        <ElTableColumn prop="id" label="报告编号" width="140" />
        <ElTableColumn prop="name" label="报告名称" />
        <ElTableColumn prop="type" label="报告类型" width="130" />
        <ElTableColumn prop="period" label="统计周期" width="180" />
        <ElTableColumn prop="generateTime" label="生成时间" width="160" />
        <ElTableColumn prop="status" label="状态" width="100" />
        <ElTableColumn label="操作" width="120">
          <template #default>
            <ElButton link type="primary">查看</ElButton>
            <ElButton link>下载</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'AiAssistantReport' })
const reportType = ref('supply')
const reportPeriod = ref('monthly')
const tableData = [
  { id: 'RPT2024030001', name: '2024年3月供水运营分析报告', type: '供水运营分析', period: '2024-03-01 ~ 2024-03-12', generateTime: '2024-03-12 08:30', status: '已完成' },
  { id: 'RPT2024030002', name: '2024年第10周漏损专项分析报告', type: '漏损专项分析', period: '2024-03-04 ~ 2024-03-10', generateTime: '2024-03-11 09:00', status: '已完成' },
  { id: 'RPT2024020001', name: '2024年2月水质合规分析报告', type: '水质合规分析', period: '2024-02-01 ~ 2024-02-29', generateTime: '2024-03-01 08:00', status: '已完成' },
]
</script>
<style scoped lang="scss">
.report-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
