<template>
  <div class="page-container">
    <ElCard>
      <template #header>
        <div class="card-header">
          <span>设备事故查询</span>
        </div>
      </template>
      <div class="content">
        <ElEmpty description="设备事故查询功能开发中..." />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceDefectAccident' })
</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}

.card-header {
  font-size: 16px;
  font-weight: bold;
}

.content {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
