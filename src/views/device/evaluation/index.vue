<template>
  <div class="page-container">
    <div class="page-header"><h2>设备评估</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="评估年度">
          <ElSelect v-model="filterForm.year" style="width:120px">
            <ElOption label="2026年" value="2026" />
            <ElOption label="2025年" value="2025" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="评估结果">
          <ElSelect v-model="filterForm.result" placeholder="请选择" clearable style="width:120px">
            <ElOption label="良好" value="良好" />
            <ElOption label="合格" value="合格" />
            <ElOption label="待改善" value="待改善" />
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
          <span>设备评估记录</span>
          <ElButton type="primary" size="small">新增评估</ElButton>
        </div>
      </template>
      <ElTable :data="evaluationList" stripe border>
        <ElTableColumn prop="deviceName" label="设备名称" />
        <ElTableColumn prop="category" label="类别" width="100" />
        <ElTableColumn prop="evalDate" label="评估日期" width="120" />
        <ElTableColumn prop="age" label="已运行年限" align="center" width="120" />
        <ElTableColumn prop="score" label="综合评分" align="center" width="120">
          <template #default="{ row }">
            <ElProgress :percentage="row.score" :stroke-width="8" :color="row.score >= 80 ? '#67c23a' : row.score >= 60 ? '#e6a23c' : '#f56c6c'" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="result" label="评估结果" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.result === '良好' ? 'success' : row.result === '合格' ? 'warning' : 'danger'">{{ row.result }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="suggestion" label="整改建议" show-overflow-tooltip />
        <ElTableColumn label="操作" width="120" align="center">
          <template #default>
            <ElButton type="primary" link size="small">查看报告</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceEvaluation' })
const filterForm = reactive({ year: '2026', result: '' })
const evaluationList = [
  { deviceName: '1号主泵', category: '水泵', evalDate: '2026-01-15', age: 5, score: 78, result: '合格', suggestion: '建议更换轴承' },
  { deviceName: '2号主泵', category: '水泵', evalDate: '2026-01-15', age: 5, score: 85, result: '良好', suggestion: '正常维护' },
  { deviceName: '进水闸阀', category: '阀门', evalDate: '2026-02-10', age: 5, score: 62, result: '待改善', suggestion: '建议更换密封件' },
  { deviceName: '主管流量计', category: '流量计', evalDate: '2026-02-10', age: 5, score: 88, result: '良好', suggestion: '正常维护' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
