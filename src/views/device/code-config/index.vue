<template>
  <div class="page-container">
    <div class="page-header">
      <h2>设备编码配置</h2>
    </div>
    <ElCard shadow="never">
      <template #header>
        <div class="card-header">
          <span>编码规则列表</span>
          <ElButton type="primary" size="small">新增规则</ElButton>
        </div>
      </template>
      <ElTable :data="codeRules" stripe border>
        <ElTableColumn prop="category" label="设备类别" />
        <ElTableColumn prop="prefix" label="编码前缀" />
        <ElTableColumn prop="rule" label="编码规则" />
        <ElTableColumn prop="example" label="示例" />
        <ElTableColumn prop="status" label="状态" align="center">
          <template #default="{ row }">
            <ElTag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="160" align="center">
          <template #default>
            <ElButton type="primary" link size="small">编辑</ElButton>
            <ElButton type="danger" link size="small">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DeviceCodeConfig' })
const codeRules = [
  { category: '水泵', prefix: 'SB', rule: 'SB-YYYYMM-XXX', example: 'SB-202601-001', status: '启用' },
  { category: '阀门', prefix: 'FM', rule: 'FM-YYYYMM-XXX', example: 'FM-202601-001', status: '启用' },
  { category: '流量计', prefix: 'LLJ', rule: 'LLJ-YYYYMM-XXX', example: 'LLJ-202601-001', status: '启用' },
  { category: '压力表', prefix: 'YLB', rule: 'YLB-YYYYMM-XXX', example: 'YLB-202601-001', status: '启用' },
  { category: '水质仪', prefix: 'SZY', rule: 'SZY-YYYYMM-XXX', example: 'SZY-202601-001', status: '禁用' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.card-header { display: flex; justify-content: space-between; align-items: center; }
</style>
