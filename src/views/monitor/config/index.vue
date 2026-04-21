<template>
  <div class="page-container">
    <div class="page-header"><h2>监测对象基础配置</h2></div>
    <ElCard shadow="never" class="filter-card">
      <ElForm :inline="true" :model="filterForm">
        <ElFormItem label="监测类型">
          <ElSelect v-model="filterForm.type" placeholder="请选择" clearable style="width:140px">
            <ElOption label="水质监测" value="water_quality" />
            <ElOption label="水压监测" value="pressure" />
            <ElOption label="流量监测" value="flow" />
            <ElOption label="液位监测" value="level" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="站点名称">
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
          <span>监测对象列表</span>
          <ElButton type="primary" size="small">新增监测对象</ElButton>
        </div>
      </template>
      <ElTable :data="monitorObjects" stripe border>
        <ElTableColumn prop="code" label="对象编码" width="150" />
        <ElTableColumn prop="name" label="监测对象名称" />
        <ElTableColumn prop="type" label="监测类型" width="120" />
        <ElTableColumn prop="location" label="安装位置" />
        <ElTableColumn prop="frequency" label="采集频率" width="120" align="center" />
        <ElTableColumn prop="threshold" label="报警阈值" width="150" />
        <ElTableColumn prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">编辑</ElButton>
            <ElButton type="danger" link size="small">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MonitorConfig' })
const filterForm = reactive({ type: '', name: '' })
const monitorObjects = [
  { code: 'SZ-001', name: '出厂水水质监测点', type: '水质监测', location: '出水总管', frequency: '每5分钟', threshold: '浊度>1NTU', status: '启用' },
  { code: 'SZ-002', name: '管网末梢水质点', type: '水质监测', location: '北区末梢', frequency: '每15分钟', threshold: '余氯<0.05', status: '启用' },
  { code: 'YL-001', name: '出厂压力监测', type: '水压监测', location: '出水总管', frequency: '每分钟', threshold: '压力<0.2MPa', status: '启用' },
  { code: 'LL-001', name: '主管流量监测', type: '流量监测', location: '出水主管', frequency: '每分钟', threshold: '流量<500m³/h', status: '启用' },
  { code: 'YW-001', name: '清水池液位监测', type: '液位监测', location: '清水池', frequency: '每分钟', threshold: '液位<1.5m', status: '启用' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.filter-card { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
