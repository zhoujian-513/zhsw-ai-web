<template>
  <div class="page-container">
    <div class="page-header"><h2>维护保养</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="计划状态">
          <ElSelect v-model="filterForm.status" placeholder="请选择" clearable style="width:120px">
            <ElOption label="待执行" value="待执行" />
            <ElOption label="执行中" value="执行中" />
            <ElOption label="已完成" value="已完成" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary">查询</ElButton>
          <ElButton>重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
    <ElCard shadow="never" class="mt-16">
      <template #header>
        <div class="card-header">
          <span>维护保养计划</span>
          <ElButton type="primary" size="small">新增计划</ElButton>
        </div>
      </template>
      <ElTable :data="maintenanceList" stripe border>
        <ElTableColumn prop="planNo" label="计划编号" width="150" />
        <ElTableColumn prop="deviceName" label="设备名称" />
        <ElTableColumn prop="type" label="保养类型" width="120" />
        <ElTableColumn prop="planDate" label="计划日期" width="120" />
        <ElTableColumn prop="executor" label="执行人" width="100" />
        <ElTableColumn prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '已完成' ? 'success' : row.status === '执行中' ? 'warning' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">详情</ElButton>
            <ElButton type="success" link size="small">执行</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceMaintenance' })
const filterForm = reactive({ status: '' })
const maintenanceList = [
  { planNo: 'WH-2026-001', deviceName: '1号主泵', type: '月度保养', planDate: '2026-03-31', executor: '张工', status: '待执行' },
  { planNo: 'WH-2026-002', deviceName: '2号主泵', type: '月度保养', planDate: '2026-03-31', executor: '李工', status: '待执行' },
  { planNo: 'WH-2026-003', deviceName: '进水闸阀', type: '季度保养', planDate: '2026-03-20', executor: '王工', status: '已完成' },
  { planNo: 'WH-2026-004', deviceName: '主管流量计', type: '年度保养', planDate: '2026-03-25', executor: '赵工', status: '执行中' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
