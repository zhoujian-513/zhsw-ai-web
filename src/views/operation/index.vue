<template>
  <div class="operation-page">
    <div class="placeholder-content">
      <p class="page-title">经营管理</p>
      <p class="page-desc">页面开发中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'Operation' })
</script>

<style lang="scss" scoped>
  .operation-page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 140px);
    overflow: hidden;
    padding: 0;

    .placeholder-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #909399;

      .page-title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 12px;
      }

      .page-desc {
        font-size: 14px;
      }
    }
  }
</style>
