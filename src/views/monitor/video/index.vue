<template>
  <div class="page-container">
    <div class="page-header"><h2>视频监控管理</h2></div>
    <ElRow :gutter="16">
      <ElCol :span="16">
        <ElCard shadow="never">
          <template #header>
            <div class="card-header">
              <span>实时视频</span>
              <ElTag type="success">直播中</ElTag>
            </div>
          </template>
          <div class="video-grid">
            <div v-for="cam in activeCameras" :key="cam.id" class="video-item">
              <div class="video-placeholder">
                <i class="iconfont-sys" style="font-size:32px;color:#909399">&#xe65c;</i>
                <p>{{ cam.name }}</p>
                <ElTag size="small" :type="cam.online ? 'success' : 'danger'">{{ cam.online ? '在线' : '离线' }}</ElTag>
              </div>
            </div>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <ElCard shadow="never">
          <template #header><span>摄像头列表</span></template>
          <ElTable :data="cameraList" size="small" @row-click="selectCamera">
            <ElTableColumn prop="name" label="摄像头名称" />
            <ElTableColumn prop="location" label="位置" />
            <ElTableColumn prop="online" label="状态" align="center" width="70">
              <template #default="{ row }">
                <ElBadge :type="row.online ? 'success' : 'danger'" is-dot />
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
        <ElCard shadow="never" class="mt-16">
          <template #header><span>统计</span></template>
          <div class="camera-stats">
            <div class="stat-item"><span class="num">12</span><span class="label">摄像头总数</span></div>
            <div class="stat-item"><span class="num success">10</span><span class="label">在线</span></div>
            <div class="stat-item"><span class="num danger">2</span><span class="label">离线</span></div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'VideoMonitor' })
const activeCameras = [
  { id: 1, name: '一泵站入口', online: true },
  { id: 2, name: '清水池区域', online: true },
  { id: 3, name: '加药间', online: true },
  { id: 4, name: '配电室', online: false },
]
const cameraList = [
  { name: '一泵站入口', location: '一泵站', online: true },
  { name: '清水池区域', location: '清水池', online: true },
  { name: '加药间', location: '加药间', online: true },
  { name: '配电室', location: '配电室', online: false },
  { name: '取水口', location: '取水口', online: true },
  { name: '沉淀池', location: '沉淀区', online: true },
]
function selectCamera(_row: any) {}
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.video-item .video-placeholder {
  background: #f5f7fa; border-radius: 6px; height: 160px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  p { margin: 0; font-size: 13px; color: #606266; }
}
.mt-16 { margin-top: 16px; }
.camera-stats { display: flex; justify-content: space-around; padding: 12px 0; }
.stat-item { text-align: center; }
.num { display: block; font-size: 24px; font-weight: 700; color: #409eff; }
.num.success { color: #67c23a; }
.num.danger { color: #f56c6c; }
.label { font-size: 12px; color: #909399; }
</style>
