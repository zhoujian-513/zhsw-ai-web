<template>
  <div class="page-container">
    <div class="page-header">
      <h2>工艺可视化</h2>
      <div class="header-actions">
        <ElSelect v-model="selectedProcess" style="width:180px" size="small">
          <ElOption label="供水工艺流程" value="supply" />
          <ElOption label="加药工艺流程" value="chemical" />
          <ElOption label="排泥工艺流程" value="mud" />
        </ElSelect>
        <ElTag type="success" class="ml-8">运行正常</ElTag>
      </div>
    </div>
    <!-- 工艺流程图 -->
    <ElCard shadow="never" class="process-card">
      <div class="process-flow">
        <!-- 原水 -->
        <div class="process-node source">
          <div class="node-icon">💧</div>
          <div class="node-name">原水取水</div>
          <div class="node-value">流量: 1680 m³/h</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 加药混凝 -->
        <div class="process-node">
          <div class="node-icon">⚗️</div>
          <div class="node-name">加药混凝</div>
          <div class="node-value">加药量: 4.5 mg/L</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 沉淀 -->
        <div class="process-node">
          <div class="node-icon">🏊</div>
          <div class="node-name">沉淀池</div>
          <div class="node-value">浊度: 2.8 NTU</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 过滤 -->
        <div class="process-node">
          <div class="node-icon">🔵</div>
          <div class="node-name">过滤池</div>
          <div class="node-value">浊度: 0.45 NTU</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 消毒 -->
        <div class="process-node">
          <div class="node-icon">🧪</div>
          <div class="node-name">消毒加氯</div>
          <div class="node-value">余氯: 0.18 mg/L</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 清水池 -->
        <div class="process-node alarm">
          <div class="node-icon">🏗️</div>
          <div class="node-name">清水池</div>
          <div class="node-value">液位: 1.35 m</div>
          <ElTag type="danger" size="small">低液位</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 泵站 -->
        <div class="process-node">
          <div class="node-icon">⚙️</div>
          <div class="node-name">送水泵站</div>
          <div class="node-value">压力: 0.38 MPa</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
        <div class="process-arrow">→</div>
        <!-- 管网 -->
        <div class="process-node">
          <div class="node-icon">🌊</div>
          <div class="node-name">供水管网</div>
          <div class="node-value">末梢压力: 0.24MPa</div>
          <ElTag type="success" size="small">正常</ElTag>
        </div>
      </div>
    </ElCard>
    <!-- 实时关键参数 -->
    <ElRow :gutter="16" class="mt-16">
      <ElCol :span="6" v-for="param in keyParams" :key="param.name">
        <ElCard shadow="never" class="param-card">
          <div class="param-value" :style="{ color: param.alarm ? '#f56c6c' : '#409eff' }">{{ param.value }}</div>
          <div class="param-unit">{{ param.unit }}</div>
          <div class="param-name">{{ param.name }}</div>
          <div class="param-range">正常范围: {{ param.range }}</div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ProcessVisualization' })
const selectedProcess = ref('supply')
const keyParams = [
  { name: '出厂水浊度', value: '0.32', unit: 'NTU', range: '≤1 NTU', alarm: false },
  { name: '出厂余氯', value: '0.18', unit: 'mg/L', range: '0.05~0.5', alarm: false },
  { name: '清水池液位', value: '1.35', unit: 'm', range: '1.5~4.5 m', alarm: true },
  { name: '出厂压力', value: '0.38', unit: 'MPa', range: '0.28~0.45', alarm: false },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
  h2 { margin: 0; font-size: 18px; font-weight: 600; }
}
.header-actions { display: flex; align-items: center; gap: 8px; }
.ml-8 { margin-left: 8px; }
.process-card { overflow-x: auto; }
.process-flow { display: flex; align-items: center; padding: 24px 16px; min-width: 900px; gap: 8px; }
.process-node {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 16px 12px; background: #f5f7fa; border-radius: 8px;
  border: 2px solid #e4e7ed; min-width: 110px; text-align: center;
  &.alarm { border-color: #f56c6c; background: #fef0f0; }
  &.source { border-color: #409eff; background: #ecf5ff; }
}
.node-icon { font-size: 24px; }
.node-name { font-size: 13px; font-weight: 600; color: #303133; }
.node-value { font-size: 11px; color: #606266; }
.process-arrow { font-size: 20px; color: #909399; flex-shrink: 0; }
.mt-16 { margin-top: 16px; }
.param-card { text-align: center; }
.param-value { font-size: 32px; font-weight: 700; }
.param-unit { font-size: 12px; color: #909399; margin-top: -4px; }
.param-name { font-size: 14px; font-weight: 600; margin-top: 8px; }
.param-range { font-size: 11px; color: #909399; margin-top: 4px; }
</style>
