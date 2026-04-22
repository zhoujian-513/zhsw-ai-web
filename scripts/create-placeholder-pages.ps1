# 创建占位页面脚本
# 根据路由配置生成所有需要的 .vue 文件

$vueTemplate = @'
<template>
  <div class="page-container">
    <div class="placeholder-content">
      <p class="page-title">{{ title }}</p>
      <p class="page-desc">页面开发中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title || '页面')
</script>

<style lang="scss" scoped>
.page-container {
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
'@

# 设备中心三级页面
$devicePages = @(
    'device/base-config/attribute-field.vue',
    'device/base-config/business-type.vue',
    'device/base-config/function-type.vue',
    'device/base-config/process-section.vue',
    'device/base-config/category-management.vue',
    'device/base-config/area-code.vue',
    'device/base-config/section-config.vue',
    'device/regulation/template.vue',
    'device/regulation/factory-policy.vue',
    'device/ledger/entry.vue',
    'device/ledger/query.vue',
    'device/analysis/dashboard.vue',
    'device/analysis/integrity-rate.vue',
    'device/analysis/operation-analysis.vue',
    'device/analysis/defect-analysis.vue',
    'device/analysis/online-rate.vue',
    'device/analysis/remote-rate.vue',
    'device/evaluation/status-analysis.vue',
    'device/evaluation/start-stop.vue',
    'device/evaluation/classification.vue',
    'device/evaluation/instrument-calibration.vue',
    'device/defect/report.vue',
    'device/defect/facility-management.vue',
    'device/defect/pipeline-management.vue',
    'device/defect/accident.vue',
    'device/project/maintenance.vue',
    'device/project/annual-repair.vue',
    'device/project/major-repair.vue',
    'device/project/supplier.vue',
    'device/asset/report.vue',
    'device/asset/card.vue',
    'device/asset/daily-maintenance.vue',
    'device/asset/inventory.vue',
    'device/asset/scrap.vue'
)

# 监测中心三级页面
$monitorPages = @(
    'monitor/video/realtime.vue',
    'monitor/video/ai-analysis.vue',
    'monitor/display/daily-water.vue',
    'monitor/display/instant-water.vue',
    'monitor/display/instrument-online.vue',
    'monitor/warning/station-warning.vue',
    'monitor/warning/pipeline-warning.vue',
    'monitor/instrument/management.vue',
    'monitor/operation-params/params.vue',
    'monitor/abnormal-closed-loop/station-closed-loop.vue',
    'monitor/abnormal-closed-loop/pipeline-closed-loop.vue',
    'monitor/third-party/plan.vue',
    'monitor/third-party/standardization.vue',
    'monitor/third-party/result.vue',
    'monitor/data-analysis/in-out-analysis.vue',
    'monitor/data-analysis/warning-analysis.vue',
    'monitor/base-config/data-access.vue',
    'monitor/base-config/data-process.vue'
)

# 生产管理三级页面
$productionPages = @(
    'production/duty/scheduling.vue',
    'production/duty/log.vue',
    'production/duty/daily-statistics.vue',
    'production/duty/sludge-statistics.vue',
    'production/duty/water-daily.vue',
    'production/laboratory/base-info.vue',
    'production/laboratory/record.vue',
    'production/laboratory/template.vue',
    'production/laboratory/daily-report.vue',
    'production/laboratory/custom-report.vue',
    'production/report/daily.vue',
    'production/report/custom-query.vue',
    'production/report/submission.vue',
    'production/report/audit-statistics.vue',
    'production/inspection/two-hour-report.vue',
    'production/inspection/plan.vue',
    'production/inspection/workorder.vue',
    'production/inspection/comprehensive-workorder.vue',
    'production/inspection/process-control.vue',
    'production/inspection/statistics.vue',
    'production/supervision/issue-tracking.vue',
    'production/quality-rating/evaluation.vue',
    'production/assessment/evaluation.vue',
    'production/chemical/inspection.vue',
    'production/chemical/usage.vue',
    'production/chemical/analysis.vue',
    'production/energy-saving/dashboard.vue'
)

# 安全管理三级页面
$safetyPages = @(
    'safety/qualification/management.vue',
    'safety/qualification/certificate.vue',
    'safety/qualification/temporary-personnel.vue',
    'safety/organization/system.vue',
    'safety/organization/responsibility.vue',
    'safety/regulation/national-library.vue',
    'safety/regulation/company-level.vue',
    'safety/training/plan.vue',
    'safety/training/topic.vue',
    'safety/training/material.vue',
    'safety/training/question-bank.vue',
    'safety/training/paper.vue',
    'safety/training/management.vue',
    'safety/training/my-training.vue',
    'safety/training/my-practice.vue',
    'safety/training/exam-management.vue',
    'safety/training/my-exam.vue',
    'safety/training/evaluation.vue',
    'safety/training/analysis.vue',
    'safety/hazard/report.vue',
    'safety/hazard/rectification.vue',
    'safety/hazard/statistics.vue',
    'safety/risk/control.vue',
    'safety/risk/hazard-source.vue',
    'safety/risk/statistics.vue',
    'safety/operation-plan/management.vue',
    'safety/operation-plan/patrol-screen.vue',
    'safety/operation-plan/question-personnel.vue',
    'safety/two-tickets/qualification.vue',
    'safety/two-tickets/work-ticket.vue',
    'safety/two-tickets/operation-ticket.vue',
    'safety/two-tickets/template.vue',
    'safety/two-tickets/review.vue',
    'safety/two-tickets/statistics.vue',
    'safety/emergency/plan.vue',
    'safety/emergency/drill.vue',
    'safety/emergency/flood-control.vue',
    'safety/emergency/extreme-weather.vue',
    'safety/emergency/emergency-repair.vue',
    'safety/emergency/incident-report.vue',
    'safety/ledger/confined-space.vue',
    'safety/ledger/special-equipment.vue',
    'safety/ledger/safety-tools.vue',
    'safety/ledger/small-tools.vue'
)

# 管网监测三级页面
$pipelinePages = @(
    'pipeline/data-entry/rtk.vue',
    'pipeline/data-entry/upload.vue',
    'pipeline/data-entry/quality-rule.vue',
    'pipeline/archive/basic-info.vue',
    'pipeline/archive/regulation-standard.vue',
    'pipeline/archive/operation.vue',
    'pipeline/personnel/roster.vue',
    'pipeline/personnel/attendance.vue',
    'pipeline/personnel/scheduling.vue',
    'pipeline/basic-ledger/area.vue',
    'pipeline/basic-ledger/road.vue',
    'pipeline/basic-ledger/pipeline-info.vue',
    'pipeline/basic-ledger/point-info.vue',
    'pipeline/basic-ledger/overflow-point.vue',
    'pipeline/basic-ledger/pump-station.vue',
    'pipeline/basic-ledger/storage-pool.vue',
    'pipeline/management-ledger/operation-plan.vue',
    'pipeline/management-ledger/operation.vue',
    'pipeline/management-ledger/protection.vue',
    'pipeline/inspection/plan.vue',
    'pipeline/inspection/workorder.vue',
    'pipeline/maintenance/annual-plan.vue',
    'pipeline/maintenance/workorder.vue',
    'pipeline/maintenance/repair-workorder.vue',
    'pipeline/detection/annual-plan.vue',
    'pipeline/detection/workorder.vue',
    'pipeline/detection/analysis.vue',
    'pipeline/water-quality/discharge-unit.vue',
    'pipeline/water-quality/annual-sampling-plan.vue',
    'pipeline/water-quality/sampling-workorder.vue',
    'pipeline/water-quality/traceability-workorder.vue',
    'pipeline/pump-inspection/plan.vue',
    'pipeline/pump-inspection/workorder.vue',
    'pipeline/pump-maintenance/annual-plan.vue',
    'pipeline/pump-maintenance/workorder.vue',
    'pipeline/overhaul/annual-plan.vue',
    'pipeline/overhaul/scheme.vue',
    'pipeline/overhaul/workorder.vue',
    'pipeline/defect/event.vue',
    'pipeline/defect/management.vue',
    'pipeline/emergency/plan.vue',
    'pipeline/emergency/drill.vue',
    'pipeline/emergency/material.vue',
    'pipeline/emergency/response.vue',
    'pipeline/emergency/workorder.vue',
    'pipeline/public-event/ledger.vue',
    'pipeline/public-event/workorder.vue',
    'pipeline/monitor/pump-station.vue',
    'pipeline/monitor/pipeline.vue',
    'pipeline/monitor/risk-point.vue'
)

# 经营管理三级页面
$operationPages = @(
    'operation/project-base/project-info.vue',
    'operation/project-base/sub-project-info.vue',
    'operation/project-base/business-info.vue',
    'operation/asset-base/asset-info.vue',
    'operation/asset-base/asset-business-relation.vue',
    'operation/commissioning/plan.vue',
    'operation/commissioning/trial-application.vue',
    'operation/commissioning/commercial-application.vue',
    'operation/commissioning/change-application.vue',
    'operation/commissioning/shutdown-application.vue',
    'operation/commissioning/asset-management.vue',
    'operation/gov-assessment/template.vue',
    'operation/gov-assessment/report.vue',
    'operation/gov-assessment/analysis.vue',
    'operation/gov-assessment/approval.vue',
    'operation/gov-assessment/payment.vue',
    'operation/gov-assessment/risk.vue',
    'operation/production-plan-tracking/auto-calculation.vue',
    'operation/production-plan-tracking/report-management.vue',
    'operation/production-plan-tracking/shutdown-report.vue',
    'operation/procurement-tracking/tracking.vue',
    'operation/budget-tracking/tracking.vue',
    'operation/cost-management/data-collection.vue',
    'operation/cost-management/analysis.vue',
    'operation/operation-fee/income-expense.vue',
    'operation/operation-fee/fund-security.vue'
)

# 物资管理三级页面
$materialPages = @(
    'material/warehouse/reserve-base.vue',
    'material/warehouse/info.vue',
    'material/supply/contract.vue',
    'material/supply/delivery-notice.vue',
    'material/receipt-storage/inspection.vue',
    'material/receipt-storage/inbound.vue',
    'material/receipt-storage/inventory-summary.vue',
    'material/receipt-storage/inventory-detail.vue',
    'material/picking/shelving.vue',
    'material/picking/request.vue',
    'material/picking/issue.vue',
    'material/picking/return.vue'
)

# 合并所有页面
$allPages = $devicePages + $monitorPages + $productionPages + $safetyPages + $pipelinePages + $operationPages + $materialPages

$basePath = "src/views"
$createdCount = 0

foreach ($page in $allPages) {
    $fullPath = Join-Path $basePath $page
    $dir = Split-Path $fullPath -Parent

    # 确保目录存在
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    # 创建文件
    if (!(Test-Path $fullPath)) {
        Set-Content -Path $fullPath -Value $vueTemplate -Encoding UTF8
        $createdCount++
        Write-Host "Created: $fullPath" -ForegroundColor Green
    } else {
        Write-Host "Skipped (exists): $fullPath" -ForegroundColor Yellow
    }
}

Write-Host "`nTotal files created: $createdCount" -ForegroundColor Cyan
