<template>
  <div class="safety-page">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'Safety' })
</script>

<style lang="scss" scoped>
  .safety-page {
    height: 100%;
  }
</style>
