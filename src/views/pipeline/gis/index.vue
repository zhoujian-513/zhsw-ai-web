<template>
  <div class="page-container">
    <ElCard shadow="never">
      <template #header><span>管网GIS地图</span></template>
      <div class="map-placeholder">
        <div class="map-tip">
          <i class="iconfont-sys" v-html="'&#xe630;'"></i>
          <p>管网GIS地图区域</p>
          <p style="font-size: 13px; color: #909399">接入GIS地图后，此处展示管网空间分布、压力热力图、水质分布等信息</p>
        </div>
        <div class="map-stats">
          <ElDescriptions :column="4" border>
            <ElDescriptionsItem label="供水管道总长度">586.3 km</ElDescriptionsItem>
            <ElDescriptionsItem label="排水管道总长度">412.7 km</ElDescriptionsItem>
            <ElDescriptionsItem label="检修阀门数量">2,340 个</ElDescriptionsItem>
            <ElDescriptionsItem label="消火栓数量">1,820 个</ElDescriptionsItem>
          </ElDescriptions>
        </div>
      </div>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'PipelineGis' })
</script>
<style scoped lang="scss">
.map-placeholder {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .map-tip {
    height: 300px;
    background: #f5f7fa;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #606266;
    gap: 8px;

    .iconfont-sys {
      font-size: 48px;
      color: #c0c4cc;
    }

    p {
      margin: 0;
    }
  }
}
</style>
