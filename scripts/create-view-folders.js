/**
 * 批量创建视图文件夹和基础页面文件
 * 根据路由配置自动创建对应的目录结构
 */

const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../src/views');

// 基础页面模板
const pageTemplate = `<template>
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
`;

// 需要创建的目录结构
const viewFolders = [
  // 设备中心
  'device/base-config/property-field',
  'device/base-config/business-type',
  'device/base-config/function-type',
  'device/base-config/process-section',
  'device/base-config/category',
  'device/base-config/region-code',
  'device/base-config/area-section',
  'device/regulation/group-template',
  'device/regulation/factory-policy',
  'device/ledger/logic-device',
  'device/ledger/comprehensive-query',
  'device/analysis/one-map',
  'device/analysis/intact-rate',
  'device/analysis/operation-analysis',
  'device/analysis/defect-analysis',
  'device/analysis/online-rate',
  'device/analysis/remote-rate',
  'device/evaluation/status-evaluation',
  'device/evaluation/start-stop',
  'device/evaluation/classification',
  'device/evaluation/instrument-check',
  'device/defect/statistics-report',
  'device/defect/facility-defect',
  'device/defect/pipeline-defect',
  'device/defect/accident',
  'device/project/maintenance',
  'device/project/annual-repair',
  'device/project/overhaul',
  'device/project/supplier',
  'device/asset/report',
  'device/asset/card',
  'device/asset/daily',
  'device/asset/inventory',
  'device/asset/scrap',

  // 监测中心
  'monitor/video/realtime',
  'monitor/video/ai-analysis',
  'monitor/display/daily-water',
  'monitor/display/instant-water',
  'monitor/display/instrument-online',
  'monitor/alarm/station-warning',
  'monitor/alarm/pipeline-warning',
  'monitor/instrument',
  'monitor/operation-params',
  'monitor/abnormal-loop/station-loop',
  'monitor/abnormal-loop/pipeline-loop',
  'monitor/third-party/test-plan',
  'monitor/third-party/process-standard',
  'monitor/third-party/test-result',
  'monitor/data-analysis/inout-analysis',
  'monitor/data-analysis/alarm-analysis',
  'monitor/base-config/data-access',
  'monitor/base-config/data-process',

  // 生产管理
  'production/duty/schedule',
  'production/duty/log',
  'production/duty/statistics',
  'production/duty/sludge',
  'production/duty/water-quality',
  'production/lab/base-info',
  'production/lab/record',
  'production/lab/template',
  'production/lab/daily',
  'production/lab/custom-report',
  'production/report/daily',
  'production/report/custom-query',
  'production/report/submit',
  'production/report/audit',
  'production/inspection/two-hour-report',
  'production/inspection/plan',
  'production/inspection/work-order',
  'production/inspection/comprehensive-order',
  'production/inspection/process-control',
  'production/inspection/statistics',
  'production/supervision',
  'production/quality-evaluation',
  'production/operation-evaluation',
  'production/chemical/inspection',
  'production/chemical/usage',
  'production/chemical/analysis',
  'production/energy-saving',

  // 安全管理
  'safety/qualification/certificate',
  'safety/qualification/staff-certificate',
  'safety/qualification/visitor',
  'safety/organization/structure',
  'safety/organization/responsibility',
  'safety/system/national',
  'safety/system/company',
  'safety/training/plan',
  'safety/training/topic',
  'safety/training/material',
  'safety/training/question-bank',
  'safety/training/paper',
  'safety/training/manage',
  'safety/training/my-training',
  'safety/training/my-practice',
  'safety/training/exam-manage',
  'safety/training/my-exam',
  'safety/training/effect-evaluation',
  'safety/training/training-analysis',
  'safety/hazard/report',
  'safety/hazard/rectification',
  'safety/hazard/statistics',
  'safety/risk/control',
  'safety/risk/source',
  'safety/risk/statistics',
  'safety/operation-plan/plan-manage',
  'safety/operation-plan/screen-patrol',
  'safety/operation-plan/question',
  'safety/two-ticket/qualification',
  'safety/two-ticket/work-ticket',
  'safety/two-ticket/operation-ticket',
  'safety/two-ticket/template',
  'safety/two-ticket/review',
  'safety/two-ticket/statistics',
  'safety/emergency/plan',
  'safety/emergency/drill',
  'safety/emergency/flood',
  'safety/emergency/weather',
  'safety/emergency/repair',
  'safety/emergency/incident',
  'safety/ledger/confined-space',
  'safety/ledger/special-equipment',
  'safety/ledger/safety-tools',
  'safety/ledger/small-tools',

  // 管网监测
  'pipeline/drainage-map',
  'pipeline/cockpit',
  'pipeline/data-entry/rtk',
  'pipeline/data-entry/upload',
  'pipeline/data-entry/quality-rule',
  'pipeline/handover',
  'pipeline/archive/basic',
  'pipeline/archive/system',
  'pipeline/archive/operation',
  'pipeline/personnel/roster',
  'pipeline/personnel/attendance',
  'pipeline/personnel/schedule',
  'pipeline/basic-ledger/area',
  'pipeline/basic-ledger/road',
  'pipeline/basic-ledger/pipeline',
  'pipeline/basic-ledger/point',
  'pipeline/basic-ledger/overflow',
  'pipeline/basic-ledger/pump-station',
  'pipeline/basic-ledger/storage',
  'pipeline/manage-ledger/plan',
  'pipeline/manage-ledger/ledger',
  'pipeline/manage-ledger/protection',
  'pipeline/patrol/plan',
  'pipeline/patrol/order',
  'pipeline/maintenance/annual-plan',
  'pipeline/maintenance/order',
  'pipeline/maintenance/repair-order',
  'pipeline/detection/annual-plan',
  'pipeline/detection/order',
  'pipeline/detection/analysis',
  'pipeline/water-quality/discharge',
  'pipeline/water-quality/sampling-plan',
  'pipeline/water-quality/sampling-order',
  'pipeline/water-quality/traceability',
  'pipeline/station-patrol/plan',
  'pipeline/station-patrol/order',
  'pipeline/station-maintenance/annual-plan',
  'pipeline/station-maintenance/order',
  'pipeline/overhaul/annual-plan',
  'pipeline/overhaul/scheme',
  'pipeline/overhaul/order',
  'pipeline/defect/event',
  'pipeline/defect/manage',
  'pipeline/emergency/plan',
  'pipeline/emergency/drill',
  'pipeline/emergency/material',
  'pipeline/emergency/response',
  'pipeline/emergency/order',
  'pipeline/public-event/ledger',
  'pipeline/public-event/handle-order',
  'pipeline/monitor/pump-station',
  'pipeline/monitor/channel',
  'pipeline/monitor/risk-point',

  // 经营管理
  'operation/project-base/project-info',
  'operation/project-base/sub-project',
  'operation/project-base/business-info',
  'operation/asset-base/asset-info',
  'operation/asset-base/asset-business',
  'operation/commissioning/plan',
  'operation/commissioning/trial',
  'operation/commissioning/commercial',
  'operation/commissioning/change',
  'operation/commissioning/shutdown',
  'operation/commissioning/asset-manage',
  'operation/performance/template',
  'operation/performance/report',
  'operation/performance/analysis',
  'operation/performance/approval',
  'operation/performance/payment',
  'operation/performance/risk',
  'operation/production-plan/auto-calculate',
  'operation/production-plan/report',
  'operation/production-plan/shutdown-report',
  'operation/purchase-plan',
  'operation/budget',
  'operation/cost/collection',
  'operation/cost/analysis',
  'operation/operation-fee/inout',
  'operation/operation-fee/fund',
  'operation/finance-model',
  'operation/income-cost',
  'operation/benchmark',

  // 物资管理
  'material/warehouse/base',
  'material/warehouse/info',
  'material/supply/contract',
  'material/supply/delivery',
  'material/receipt/inspection',
  'material/receipt/inbound',
  'material/receipt/inventory-summary',
  'material/receipt/inventory-detail',
  'material/picking/shelving',
  'material/picking/pick',
  'material/picking/issue',
  'material/picking/return',
  'material/storage',
  'material/spare-parts',
  'material/report',
  'material/waste',
  'material/code-receive'
];

// 创建目录和文件
function createFolderAndFile(folderPath) {
  const fullPath = path.join(basePath, folderPath);
  
  // 创建目录
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ 创建目录: ${folderPath}`);
  } else {
    console.log(`⏭️  目录已存在: ${folderPath}`);
  }
  
  // 创建 index.vue 文件
  const filePath = path.join(fullPath, 'index.vue');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, pageTemplate);
    console.log(`   📝 创建文件: ${folderPath}/index.vue`);
  } else {
    console.log(`   ⏭️  文件已存在: ${folderPath}/index.vue`);
  }
}

// 执行创建
console.log('🚀 开始创建视图文件夹和页面文件...\n');

viewFolders.forEach(folder => {
  createFolderAndFile(folder);
});

console.log('\n✨ 创建完成！');
console.log(`📊 共创建 ${viewFolders.length} 个页面`);
