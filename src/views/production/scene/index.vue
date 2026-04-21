<template>
  <div class="page-container">
    <div class="page-header"><h2>运维场景管理</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="场景名称">
          <ElInput v-model="filterForm.name" placeholder="请输入" clearable style="width:200px" />
        </ElFormItem>
        <ElFormItem label="场景类型">
          <ElSelect v-model="filterForm.type" placeholder="请选择" clearable style="width:140px">
            <ElOption label="应急场景" value="emergency" />
            <ElOption label="日常运维" value="daily" />
            <ElOption label="季节性场景" value="seasonal" />
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
          <span>运维场景列表</span>
          <ElButton type="primary" size="small">新建场景</ElButton>
        </div>
      </template>
      <ElTable :data="sceneList" stripe border>
        <ElTableColumn prop="code" label="场景编码" width="150" />
        <ElTableColumn prop="name" label="场景名称" />
        <ElTableColumn prop="type" label="场景类型" width="120" />
        <ElTableColumn prop="triggerCondition" label="触发条件" show-overflow-tooltip />
        <ElTableColumn prop="steps" label="处置步骤数" align="center" width="120" />
        <ElTableColumn prop="status" label="启用状态" align="center" width="100">
          <template #default="{ row }">
            <ElSwitch v-model="row.enabled" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">查看</ElButton>
            <ElButton type="primary" link size="small">编辑</ElButton>
            <ElButton type="danger" link size="small">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'OperationScene' })
const filterForm = reactive({ name: '', type: '' })
const sceneList = [
  { code: 'SC-001', name: '清水池低液位应急', type: '应急场景', triggerCondition: '清水池液位低于1.5m', steps: 5, enabled: true },
  { code: 'SC-002', name: '主泵故障切换', type: '应急场景', triggerCondition: '主泵运行电流异常或停机', steps: 8, enabled: true },
  { code: 'SC-003', name: '余氯超标处置', type: '日常运维', triggerCondition: '余氯>0.5mg/L', steps: 4, enabled: true },
  { code: 'SC-004', name: '春季藻类防控', type: '季节性场景', triggerCondition: '每年3-5月自动激活', steps: 6, enabled: true },
  { code: 'SC-005', name: '夏季高峰供水保障', type: '季节性场景', triggerCondition: '每年6-9月自动激活', steps: 7, enabled: true },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
