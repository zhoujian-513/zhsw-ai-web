<template>
  <div class="page-container">
    <div class="page-header"><h2>监测数据管理</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="监测对象">
          <ElSelect v-model="filterForm.object" placeholder="请选择" clearable style="width:180px">
            <ElOption label="出厂水水质监测点" value="SZ-001" />
            <ElOption label="出厂压力监测" value="YL-001" />
            <ElOption label="主管流量监测" value="LL-001" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="时间范围">
          <ElDatePicker v-model="filterForm.dateRange" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" style="width:240px" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary">查询</ElButton>
          <ElButton>导出</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
    <ElCard shadow="never" class="mt-16">
      <template #header><span>监测数据记录</span></template>
      <ElTable :data="dataList" stripe border>
        <ElTableColumn prop="time" label="采集时间" width="180" />
        <ElTableColumn prop="objectName" label="监测对象" />
        <ElTableColumn prop="type" label="监测类型" width="120" />
        <ElTableColumn prop="value" label="监测值" align="center" width="120" />
        <ElTableColumn prop="unit" label="单位" align="center" width="80" />
        <ElTableColumn prop="isAlarm" label="是否报警" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.isAlarm ? 'danger' : 'success'">{{ row.isAlarm ? '报警' : '正常' }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="remark" label="备注" show-overflow-tooltip />
      </ElTable>
      <ElPagination class="mt-16" layout="total, prev, pager, next" :total="total" />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MonitorData' })
const filterForm = reactive({ object: '', dateRange: [] })
const total = 3680
const dataList = [
  { time: '2026-03-30 14:05:00', objectName: '出厂水水质监测点', type: '水质监测', value: '0.32', unit: 'NTU', isAlarm: false, remark: '' },
  { time: '2026-03-30 14:05:00', objectName: '出厂压力监测', type: '水压监测', value: '0.38', unit: 'MPa', isAlarm: false, remark: '' },
  { time: '2026-03-30 14:05:00', objectName: '主管流量监测', type: '流量监测', value: '1280', unit: 'm³/h', isAlarm: false, remark: '' },
  { time: '2026-03-30 13:55:00', objectName: '清水池液位监测', type: '液位监测', value: '1.35', unit: 'm', isAlarm: true, remark: '液位低于预警值' },
  { time: '2026-03-30 13:50:00', objectName: '管网末梢水质点', type: '水质监测', value: '0.04', unit: 'mg/L', isAlarm: true, remark: '余氯偏低' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.mt-16 { margin-top: 16px; }
</style>
