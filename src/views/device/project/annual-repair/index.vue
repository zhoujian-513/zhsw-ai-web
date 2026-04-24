<template>
  <div class="page-container">
    <div class="page-header"><h2>年度中小修</h2></div>
    <ElCard shadow="never" class="mt-0">
      <template #header>
        <div class="card-header">
          <span>年度中小修计划</span>
          <ElButton type="primary" size="small">新增计划</ElButton>
        </div>
      </template>
      <ElTable :data="repairList" stripe border>
        <ElTableColumn prop="planNo" label="计划编号" width="150" />
        <ElTableColumn prop="deviceName" label="设备名称" />
        <ElTableColumn prop="repairType" label="检修类型" width="100" />
        <ElTableColumn prop="planYear" label="计划年度" width="100" align="center" />
        <ElTableColumn prop="planDate" label="计划开始" width="120" />
        <ElTableColumn prop="duration" label="工期(天)" width="100" align="center" />
        <ElTableColumn prop="budget" label="预算(万元)" width="120" align="center" />
        <ElTableColumn prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '已完成' ? 'success' : row.status === '进行中' ? 'warning' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="120" align="center">
          <template #default>
            <ElButton type="primary" link size="small">详情</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceAnnualRepair' })
const repairList = [
  { planNo: 'XZ-2026-001', deviceName: '1号主泵', repairType: '小修', planYear: 2026, planDate: '2026-04-10', duration: 3, budget: 2.5, status: '待开始' },
  { planNo: 'ZX-2026-001', deviceName: '加压泵站', repairType: '中修', planYear: 2026, planDate: '2026-06-01', duration: 15, budget: 28, status: '待开始' },
  { planNo: 'XZ-2025-008', deviceName: '进水闸门', repairType: '小修', planYear: 2025, planDate: '2025-10-15', duration: 5, budget: 4.2, status: '已完成' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
