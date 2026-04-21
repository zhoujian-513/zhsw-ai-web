<template>
  <div class="page-container">
    <ElCard>
      <template #header>
        <div class="card-header">
          <span>成本管理</span>
        </div>
      </template>
      <div class="content">
        <ElEmpty description="成本管理功能开发中..." />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'PlanningCost' })
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
