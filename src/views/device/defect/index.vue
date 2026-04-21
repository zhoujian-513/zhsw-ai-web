<template>
  <div class="page-container">
    <div class="page-header"><h2>设备缺陷</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="缺陷等级">
          <ElSelect v-model="filterForm.level" placeholder="请选择" clearable style="width:120px">
            <ElOption label="严重" value="严重" />
            <ElOption label="重要" value="重要" />
            <ElOption label="一般" value="一般" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="处理状态">
          <ElSelect v-model="filterForm.status" placeholder="请选择" clearable style="width:120px">
            <ElOption label="待处理" value="待处理" />
            <ElOption label="处理中" value="处理中" />
            <ElOption label="已消缺" value="已消缺" />
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
          <span>缺陷记录</span>
          <ElButton type="primary" size="small">登记缺陷</ElButton>
        </div>
      </template>
      <ElTable :data="defectList" stripe border>
        <ElTableColumn prop="defectNo" label="缺陷编号" width="150" />
        <ElTableColumn prop="deviceName" label="设备名称" />
        <ElTableColumn prop="description" label="缺陷描述" show-overflow-tooltip />
        <ElTableColumn prop="level" label="缺陷等级" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.level === '严重' ? 'danger' : row.level === '重要' ? 'warning' : 'info'">{{ row.level }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="reportDate" label="发现日期" width="120" />
        <ElTableColumn prop="status" label="处理状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '已消缺' ? 'success' : row.status === '处理中' ? 'warning' : 'danger'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">详情</ElButton>
            <ElButton type="success" link size="small">消缺</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceDefect' })
const filterForm = reactive({ level: '', status: '' })
const defectList = [
  { defectNo: 'QX-2026-001', deviceName: '1号主泵', description: '运行中有异常噪音，轴承疑似磨损', level: '重要', reportDate: '2026-03-20', status: '处理中' },
  { defectNo: 'QX-2026-002', deviceName: '进水闸阀', description: '阀体有轻微渗漏', level: '一般', reportDate: '2026-03-22', status: '待处理' },
  { defectNo: 'QX-2026-003', deviceName: '主管流量计', description: '显示数据跳变，怀疑信号线松动', level: '重要', reportDate: '2026-03-25', status: '待处理' },
  { defectNo: 'QX-2026-004', deviceName: '2号主泵', description: '密封环老化，少量滴漏', level: '一般', reportDate: '2026-03-18', status: '已消缺' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
