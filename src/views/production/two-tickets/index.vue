<template>
  <div class="page-container">
    <div class="page-header"><h2>两票管理</h2><p class="subtitle">操作票 / 工作票 管理</p></div>
    <ElTabs v-model="activeTab" class="ticket-tabs">
      <ElTabPane label="操作票" name="operation">
        <ElCard shadow="never" class="filter-card">
          <ElForm :inline="true" :model="filterForm">
            <ElFormItem label="票据编号">
              <ElInput v-model="filterForm.no" placeholder="请输入" clearable style="width:160px" />
            </ElFormItem>
            <ElFormItem label="状态">
              <ElSelect v-model="filterForm.status" clearable style="width:120px">
                <ElOption label="待审批" value="pending" />
                <ElOption label="执行中" value="executing" />
                <ElOption label="已完成" value="done" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem><ElButton type="primary">查询</ElButton></ElFormItem>
          </ElForm>
        </ElCard>
        <ElCard shadow="never" class="mt-16">
          <template #header>
            <div class="card-header"><span>操作票列表</span><ElButton type="primary" size="small">新建操作票</ElButton></div>
          </template>
          <ElTable :data="operationTickets" stripe border>
            <ElTableColumn prop="no" label="票据编号" width="180" />
            <ElTableColumn prop="title" label="操作内容" show-overflow-tooltip />
            <ElTableColumn prop="operator" label="操作人" width="100" />
            <ElTableColumn prop="supervisor" label="监护人" width="100" />
            <ElTableColumn prop="planTime" label="计划执行时间" width="160" />
            <ElTableColumn prop="status" label="状态" align="center" width="100">
              <template #default="{ row }">
                <ElTag :type="row.status === '已完成' ? 'success' : row.status === '执行中' ? 'warning' : 'info'">{{ row.status }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="160" align="center">
              <template #default><ElButton type="primary" link size="small">详情</ElButton><ElButton type="primary" link size="small">审批</ElButton></template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElTabPane>
      <ElTabPane label="工作票" name="work">
        <ElCard shadow="never" class="mt-16">
          <template #header>
            <div class="card-header"><span>工作票列表</span><ElButton type="primary" size="small">新建工作票</ElButton></div>
          </template>
          <ElTable :data="workTickets" stripe border>
            <ElTableColumn prop="no" label="票据编号" width="180" />
            <ElTableColumn prop="title" label="工作内容" show-overflow-tooltip />
            <ElTableColumn prop="workLeader" label="工作负责人" width="120" />
            <ElTableColumn prop="startTime" label="开始时间" width="160" />
            <ElTableColumn prop="endTime" label="结束时间" width="160" />
            <ElTableColumn prop="status" label="状态" align="center" width="100">
              <template #default="{ row }">
                <ElTag :type="row.status === '已完成' ? 'success' : 'warning'">{{ row.status }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="160" align="center">
              <template #default><ElButton type="primary" link size="small">详情</ElButton><ElButton type="primary" link size="small">终结</ElButton></template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TwoTickets' })
const activeTab = ref('operation')
const filterForm = reactive({ no: '', status: '' })
const operationTickets = [
  { no: 'CZ-2026-0330-001', title: '1号主泵切换至备用泵操作', operator: '张工', supervisor: '李主任', planTime: '2026-03-30 14:00', status: '待审批' },
  { no: 'CZ-2026-0330-002', title: '加药系统加氯量调整操作', operator: '王工', supervisor: '陈主任', planTime: '2026-03-30 10:30', status: '已完成' },
]
const workTickets = [
  { no: 'GZ-2026-0330-001', title: '清水池液位传感器更换维修', workLeader: '赵工', startTime: '2026-03-30 09:00', endTime: '2026-03-30 12:00', status: '执行中' },
  { no: 'GZ-2026-0329-003', title: '配电室电气设备预防性试验', workLeader: '刘工', startTime: '2026-03-29 08:00', endTime: '2026-03-29 17:00', status: '已完成' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } .subtitle { margin: 4px 0 0; font-size: 13px; color: #909399; } }
.ticket-tabs { margin-top: 0; }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
