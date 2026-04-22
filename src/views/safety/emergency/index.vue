<template>
  <div class="emergency-page">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'SafetyEmergency' })
</script>

<style lang="scss" scoped>
  .emergency-page {
    height: 100%;
  }
</style>
