<template>
  <div class="page-container">
    <div class="page-header"><h2>维护规程管理</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="设备类别">
          <ElSelect v-model="filterForm.category" placeholder="请选择" clearable style="width:140px">
            <ElOption label="水泵" value="水泵" />
            <ElOption label="阀门" value="阀门" />
            <ElOption label="流量计" value="流量计" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="规程名称">
          <ElInput v-model="filterForm.name" placeholder="请输入" clearable style="width:160px" />
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
          <span>维护规程列表</span>
          <ElButton type="primary" size="small">新增规程</ElButton>
        </div>
      </template>
      <ElTable :data="procedureList" stripe border>
        <ElTableColumn prop="code" label="规程编号" width="150" />
        <ElTableColumn prop="name" label="规程名称" />
        <ElTableColumn prop="category" label="适用设备类别" width="140" />
        <ElTableColumn prop="version" label="版本" width="80" align="center" />
        <ElTableColumn prop="updateDate" label="更新日期" width="120" />
        <ElTableColumn prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '有效' ? 'success' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="180" align="center">
          <template #default>
            <ElButton type="primary" link size="small">查看</ElButton>
            <ElButton type="primary" link size="small">编辑</ElButton>
            <ElButton type="danger" link size="small">废止</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceProcedure' })
const filterForm = reactive({ category: '', name: '' })
const procedureList = [
  { code: 'GC-SB-001', name: '离心泵运行维护规程', category: '水泵', version: 'V3.0', updateDate: '2025-06-01', status: '有效' },
  { code: 'GC-SB-002', name: '潜水泵维护保养规程', category: '水泵', version: 'V2.1', updateDate: '2025-03-15', status: '有效' },
  { code: 'GC-FM-001', name: '蝶阀操作维护规程', category: '阀门', version: 'V2.0', updateDate: '2024-12-01', status: '有效' },
  { code: 'GC-LLJ-001', name: '电磁流量计维护规程', category: '流量计', version: 'V1.5', updateDate: '2024-09-10', status: '有效' },
  { code: 'GC-SB-001-OLD', name: '离心泵运行维护规程（旧版）', category: '水泵', version: 'V2.0', updateDate: '2023-01-01', status: '已废止' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
