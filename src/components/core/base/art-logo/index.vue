<!-- 系统logo -->
<template>
  <div class="art-logo">
    <ZhswLogo :size="size" />
  </div>
</template>

<script setup lang="ts">
  import ZhswLogo from './ZhswLogo.vue'

  defineOptions({ name: 'ArtLogo' })

  interface Props {
    /** logo 大小 */
    size?: number | string
  }

  withDefaults(defineProps<Props>(), {
    size: 36
  })
</script>

<style lang="scss" scoped>
  .art-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
