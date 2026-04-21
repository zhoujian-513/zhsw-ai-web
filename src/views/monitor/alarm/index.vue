<template>
  <div class="page-container">
    <div class="page-header"><h2>报警管理</h2></div>
    <!-- 统计卡片 -->
    <ElRow :gutter="16" class="mb-16">
      <ElCol :span="6" v-for="item in alarmStats" :key="item.label">
        <ElCard shadow="never" class="stat-card">
          <p class="stat-num" :style="{color: item.color}">{{ item.value }}</p>
          <p class="stat-label">{{ item.label }}</p>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElCard shadow="never">
      <template #header>
        <div class="card-header">
          <ElTabs v-model="activeTab">
            <ElTabPane label="未处理" name="pending" />
            <ElTabPane label="处理中" name="processing" />
            <ElTabPane label="已处理" name="resolved" />
            <ElTabPane label="全部" name="all" />
          </ElTabs>
          <ElButton type="primary" size="small">批量处理</ElButton>
        </div>
      </template>
      <ElTable :data="alarmList" stripe border>
        <ElTableColumn type="selection" width="50" />
        <ElTableColumn prop="alarmNo" label="报警编号" width="150" />
        <ElTableColumn prop="source" label="报警来源" />
        <ElTableColumn prop="content" label="报警内容" show-overflow-tooltip />
        <ElTableColumn prop="level" label="报警级别" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.level === '紧急' ? 'danger' : row.level === '重要' ? 'warning' : 'info'">{{ row.level }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="time" label="报警时间" width="180" />
        <ElTableColumn prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <ElTag :type="row.status === '已处理' ? 'success' : row.status === '处理中' ? 'warning' : 'danger'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">处理</ElButton>
            <ElButton type="primary" link size="small">详情</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AlarmManage' })
const activeTab = ref('pending')
const alarmStats = [
  { label: '今日报警', value: 12, color: '#409eff' },
  { label: '未处理', value: 5, color: '#f56c6c' },
  { label: '处理中', value: 3, color: '#e6a23c' },
  { label: '已处理', value: 4, color: '#67c23a' },
]
const alarmList = [
  { alarmNo: 'ALM-2026-0330-001', source: '清水池液位监测', content: '清水池液位低于预警值1.5m，当前1.35m', level: '紧急', time: '2026-03-30 13:55:00', status: '未处理' },
  { alarmNo: 'ALM-2026-0330-002', source: '管网末梢水质点', content: '余氯偏低，当前0.04mg/L，低于0.05mg/L', level: '重要', time: '2026-03-30 13:50:00', status: '处理中' },
  { alarmNo: 'ALM-2026-0330-003', source: '1号主泵', content: '运行电流异常，超过额定值10%', level: '重要', time: '2026-03-30 12:30:00', status: '未处理' },
  { alarmNo: 'ALM-2026-0330-004', source: '出厂压力监测', content: '压力波动频繁，1小时内波动超过0.05MPa', level: '一般', time: '2026-03-30 11:20:00', status: '已处理' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.mb-16 { margin-bottom: 16px; }
.stat-card { text-align: center; padding: 4px 0; }
.stat-num { font-size: 28px; font-weight: 700; margin: 0 0 4px; }
.stat-label { font-size: 12px; color: #909399; margin: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
