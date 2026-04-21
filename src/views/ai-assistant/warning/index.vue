<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>预警看板</span></template>
      <div class="warning-stats">
        <div class="stat-item danger">
          <div class="stat-value">3</div>
          <div class="stat-label">紧急预警</div>
        </div>
        <div class="stat-item warning">
          <div class="stat-value">8</div>
          <div class="stat-label">一般预警</div>
        </div>
        <div class="stat-item info">
          <div class="stat-value">15</div>
          <div class="stat-label">提示信息</div>
        </div>
        <div class="stat-item success">
          <div class="stat-value">127</div>
          <div class="stat-label">正常设备</div>
        </div>
      </div>
      <ElTable :data="tableData" border stripe style="margin-top: 20px">
        <ElTableColumn prop="time" label="预警时间" width="160" />
        <ElTableColumn prop="level" label="预警级别" width="100" />
        <ElTableColumn prop="type" label="预警类型" width="120" />
        <ElTableColumn prop="source" label="预警来源" />
        <ElTableColumn prop="content" label="预警内容" />
        <ElTableColumn prop="suggestion" label="AI建议" />
        <ElTableColumn prop="status" label="处理状态" width="100" />
      </ElTable>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'AiAssistantWarning' })
const tableData = [
  { time: '2024-03-12 14:32', level: '紧急', type: '水质异常', source: '水质监测站-03', content: '浊度超标，当前值：5.2NTU，阈值：3NTU', suggestion: '建议立即检查过滤系统，增加反冲洗频次', status: '处理中' },
  { time: '2024-03-12 13:15', level: '紧急', type: '压力异常', source: '加压泵站-02', content: '出口压力骤降，当前值：0.18MPa，正常范围：0.28-0.35MPa', suggestion: '建议检查水泵运行状态及管道是否爆管', status: '处理中' },
  { time: '2024-03-12 11:20', level: '一般', type: '设备故障', source: '1号净水厂', content: '2号搅拌机电流过高，疑似机械故障', suggestion: '建议停机检查搅拌机叶片及轴承', status: '待处理' },
]
</script>
<style scoped lang="scss">
.warning-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;

  .stat-item {
    flex: 1;
    padding: 20px;
    border-radius: 8px;
    text-align: center;

    &.danger { background: #fef0f0; }
    &.warning { background: #fdf6ec; }
    &.info { background: #f0f9ff; }
    &.success { background: #f0f9eb; }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      line-height: 1;
    }
    &.danger .stat-value { color: #f56c6c; }
    &.warning .stat-value { color: #e6a23c; }
    &.info .stat-value { color: #409eff; }
    &.success .stat-value { color: #67c23a; }

    .stat-label {
      font-size: 13px;
      color: #606266;
      margin-top: 8px;
    }
  }
}
</style>
