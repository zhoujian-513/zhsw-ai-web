<template>
  <div class="page-container">
    <ElCard>
      <template #header>
        <div class="card-header">
          <span>质量报表</span>
        </div>
      </template>
      <div class="content">
        <ElEmpty description="质量报表功能开发中..." />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ReportQuality' })
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
