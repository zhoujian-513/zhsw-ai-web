<template>
  <div class="page-container">
    <div class="page-header"><h2>大修重置及技改</h2></div>
    <ElCard shadow="never">
      <template #header>
        <div class="card-header">
          <span>大修重置及技改项目</span>
          <ElButton type="primary" size="small">新增项目</ElButton>
        </div>
      </template>
      <ElTable :data="overhaulList" stripe border>
        <ElTableColumn prop="projectNo" label="项目编号" width="150" />
        <ElTableColumn prop="projectName" label="项目名称" />
        <ElTableColumn prop="type" label="项目类型" width="120" />
        <ElTableColumn prop="startDate" label="开始日期" width="120" />
        <ElTableColumn prop="endDate" label="结束日期" width="120" />
        <ElTableColumn prop="budget" label="预算(万元)" width="120" align="center" />
        <ElTableColumn prop="actual" label="实际(万元)" width="120" align="center" />
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
defineOptions({ name: 'DeviceOverhaul' })
const overhaulList = [
  { projectNo: 'DX-2026-001', projectName: '一泵站主泵大修', type: '大修', startDate: '2026-05-01', endDate: '2026-07-31', budget: 120, actual: null, status: '待开始' },
  { projectNo: 'TG-2026-001', projectName: '自动化控制系统技改', type: '技改', startDate: '2026-04-01', endDate: '2026-09-30', budget: 280, actual: null, status: '进行中' },
  { projectNo: 'CZ-2025-001', projectName: '老旧水泵重置更新', type: '重置', startDate: '2025-03-01', endDate: '2025-08-30', budget: 95, actual: 92, status: '已完成' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
