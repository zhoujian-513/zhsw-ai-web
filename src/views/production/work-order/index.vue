<template>
  <div class="page-container">
    <div class="page-header"><h2>运维工单管理</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="工单类型">
          <ElSelect v-model="filterForm.type" placeholder="请选择" clearable style="width:140px">
            <ElOption label="故障维修" value="fault" />
            <ElOption label="预防性维护" value="preventive" />
            <ElOption label="巡检工单" value="patrol" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="工单状态">
          <ElSelect v-model="filterForm.status" placeholder="请选择" clearable style="width:120px">
            <ElOption label="待处理" value="pending" />
            <ElOption label="处理中" value="processing" />
            <ElOption label="已完成" value="done" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="工单编号">
          <ElInput v-model="filterForm.no" placeholder="请输入" clearable style="width:160px" />
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
          <span>工单列表</span>
          <ElButton type="primary" size="small">新建工单</ElButton>
        </div>
      </template>
      <ElTable :data="workOrderList" stripe border>
        <ElTableColumn prop="no" label="工单编号" width="180" />
        <ElTableColumn prop="type" label="工单类型" width="120" />
        <ElTableColumn prop="title" label="工单标题" show-overflow-tooltip />
        <ElTableColumn prop="priority" label="优先级" align="center" width="90">
          <template #default="{ row }">
            <ElTag :type="row.priority === '紧急' ? 'danger' : row.priority === '高' ? 'warning' : 'info'">{{ row.priority }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="assignee" label="负责人" width="100" />
        <ElTableColumn prop="createTime" label="创建时间" width="160" />
        <ElTableColumn prop="deadline" label="计划完成" width="120" />
        <ElTableColumn prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '已完成' ? 'success' : row.status === '处理中' ? 'warning' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">详情</ElButton>
            <ElButton type="primary" link size="small">处理</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination class="mt-16" layout="total, prev, pager, next" :total="96" />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'WorkOrder' })
const filterForm = reactive({ type: '', status: '', no: '' })
const workOrderList = [
  { no: 'WO-2026-0330-001', type: '故障维修', title: '1号主泵运行电流异常', priority: '紧急', assignee: '张工', createTime: '2026-03-30 10:00', deadline: '2026-03-30', status: '处理中' },
  { no: 'WO-2026-0330-002', type: '预防性维护', title: '清水池液位传感器校准', priority: '高', assignee: '李工', createTime: '2026-03-30 09:30', deadline: '2026-03-31', status: '待处理' },
  { no: 'WO-2026-0329-005', type: '巡检工单', title: '管网北区定期巡检', priority: '普通', assignee: '王工', createTime: '2026-03-29 08:00', deadline: '2026-03-29', status: '已完成' },
  { no: 'WO-2026-0329-004', type: '故障维修', title: '加药泵计量不准确', priority: '高', assignee: '赵工', createTime: '2026-03-29 14:00', deadline: '2026-03-30', status: '处理中' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
