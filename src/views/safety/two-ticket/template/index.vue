<template>
  <div class="page-container">
    <ArtTable :data="tableData" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([])
const columns = ref([
  { prop: 'name', label: '名称' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' }
])
</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}
</style>
