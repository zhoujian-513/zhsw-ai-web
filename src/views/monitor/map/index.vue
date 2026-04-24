<template>
  <div class="page-container full-page">
    <div class="map-header">
      <h2>监测一张图</h2>
      <div class="map-legend">
        <span class="legend-item"><i class="dot normal"></i>正常</span>
        <span class="legend-item"><i class="dot warning"></i>预警</span>
        <span class="legend-item"><i class="dot alarm"></i>报警</span>
        <span class="legend-item"><i class="dot offline"></i>离线</span>
      </div>
    </div>
    <ElRow :gutter="12" style="height: calc(100vh - 160px)">
      <!-- 地图区域 -->
      <ElCol :span="18" style="height:100%">
        <ElCard shadow="never" style="height:100%">
          <div class="map-placeholder">
            <div class="map-tip">GIS 地图区域（接入真实地图后展示管网和监测点分布）</div>
            <!-- 模拟监测点标记 -->
            <div v-for="point in monitorPoints" :key="point.id"
              class="map-marker" :class="point.status"
              :style="{ left: point.x + '%', top: point.y + '%' }"
              @mouseenter="selectedPoint = point" @mouseleave="selectedPoint = null">
              <span class="marker-dot"></span>
              <span class="marker-label">{{ point.name }}</span>
            </div>
            <!-- 悬浮信息框 -->
            <div v-if="selectedPoint" class="info-popup"
              :style="{ left: selectedPoint.x + 2 + '%', top: selectedPoint.y + '%' }">
              <p><b>{{ selectedPoint.name }}</b></p>
              <p>类型：{{ selectedPoint.type }}</p>
              <p>状态：{{ selectedPoint.statusText }}</p>
              <p>最新值：{{ selectedPoint.value }}</p>
            </div>
          </div>
        </ElCard>
      </ElCol>
      <!-- 右侧面板 -->
      <ElCol :span="6" style="height:100%;overflow-y:auto">
        <ElCard shadow="never" class="mb-12">
          <template #header><span>监测点统计</span></template>
          <div class="point-stats">
            <div class="stat-row"><span>正常</span><ElTag type="success">{{ stats.normal }}</ElTag></div>
            <div class="stat-row"><span>预警</span><ElTag type="warning">{{ stats.warning }}</ElTag></div>
            <div class="stat-row"><span>报警</span><ElTag type="danger">{{ stats.alarm }}</ElTag></div>
            <div class="stat-row"><span>离线</span><ElTag type="info">{{ stats.offline }}</ElTag></div>
          </div>
        </ElCard>
        <ElCard shadow="never">
          <template #header><span>最新报警</span></template>
          <div v-for="a in recentAlarms" :key="a.id" class="alarm-item">
            <ElTag size="small" :type="a.level === '紧急' ? 'danger' : 'warning'">{{ a.level }}</ElTag>
            <span class="alarm-text">{{ a.content }}</span>
            <span class="alarm-time">{{ a.time }}</span>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MonitorMap' })
const selectedPoint = ref<any>(null)
const stats = { normal: 18, warning: 3, alarm: 2, offline: 1 }
const monitorPoints = [
  { id: 1, name: '出厂水质', type: '水质', status: 'normal', statusText: '正常', value: '浊度0.32NTU', x: 45, y: 30 },
  { id: 2, name: '出厂压力', type: '水压', status: 'normal', statusText: '正常', value: '0.38MPa', x: 50, y: 35 },
  { id: 3, name: '清水池液位', type: '液位', status: 'alarm', statusText: '报警', value: '1.35m(低)', x: 40, y: 45 },
  { id: 4, name: '末梢水质', type: '水质', status: 'alarm', statusText: '报警', value: '余氯0.04mg/L', x: 70, y: 25 },
  { id: 5, name: '北区压力', type: '水压', status: 'warning', statusText: '预警', value: '0.22MPa(偏低)', x: 65, y: 55 },
  { id: 6, name: '南区流量', type: '流量', status: 'normal', statusText: '正常', value: '680m³/h', x: 35, y: 65 },
]
const recentAlarms = [
  { id: 1, level: '紧急', content: '清水池液位低报警', time: '14:05' },
  { id: 2, level: '重要', content: '末梢余氯偏低', time: '13:50' },
  { id: 3, level: '重要', content: '北区压力偏低预警', time: '12:30' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.map-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
  h2 { margin: 0; font-size: 18px; font-weight: 600; }
}
.map-legend { display: flex; gap: 16px; font-size: 13px; }
.legend-item { display: flex; align-items: center; gap: 4px; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; }
.dot.normal { background: #67c23a; }
.dot.warning { background: #e6a23c; }
.dot.alarm { background: #f56c6c; }
.dot.offline { background: #909399; }
.map-placeholder {
  position: relative; height: 100%; min-height: 500px;
  background: linear-gradient(135deg, #e8f4f8 0%, #d1e8f0 100%);
  border-radius: 6px; overflow: hidden;
}
.map-tip { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); color: #909399; font-size: 14px; }
.map-marker { position: absolute; cursor: pointer; }
.marker-dot {
  display: block; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff;
  .normal & { background: #67c23a; }
  .warning & { background: #e6a23c; }
  .alarm & { background: #f56c6c; animation: pulse 1s infinite; }
  .offline & { background: #909399; }
}
.marker-label { font-size: 11px; color: #303133; white-space: nowrap; margin-left: 4px; }
.info-popup {
  position: absolute; background: #fff; border: 1px solid #dcdfe6; border-radius: 4px;
  padding: 8px 12px; font-size: 12px; z-index: 10; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  p { margin: 2px 0; }
}
.point-stats { display: flex; flex-direction: column; gap: 8px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; }
.mb-12 { margin-bottom: 12px; }
.alarm-item { padding: 6px 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  &:last-child { border-bottom: none; }
}
.alarm-text { flex: 1; font-size: 12px; }
.alarm-time { font-size: 11px; color: #909399; }
@keyframes pulse {
  0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
}
</style>
