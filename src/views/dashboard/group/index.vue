<template>
  <div class="dashboard-group">
    <div class="page-header">
      <h2>集团看板</h2>
      <p class="subtitle">汇总所有租户的核心运营数据</p>
    </div>

    <!-- 租户选择提示 -->
    <ElAlert
      v-if="isGroupView"
      title="当前为集团视角，展示所有租户汇总数据"
      type="info"
      show-icon
      :closable="false"
      class="mb-16"
    />

    <!-- 核心指标 -->
    <ElRow :gutter="16" class="stat-row">
      <ElCol :span="6" v-for="item in statCards" :key="item.label">
        <ElCard shadow="never" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" :style="{ background: item.color }">
              <i class="iconfont-sys" v-html="item.icon" />
            </div>
            <div class="stat-info">
              <p class="stat-value">{{ item.value }}</p>
              <p class="stat-label">{{ item.label }}</p>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <!-- 租户数据汇总表 -->
    <ElCard shadow="never" class="mt-16">
      <template #header>
        <span>各租户运营概况</span>
      </template>
      <ElTable :data="tenantSummary" stripe border>
        <ElTableColumn prop="name" label="租户名称" width="160" />
        <ElTableColumn prop="deviceCount" label="设备总数" align="center" />
        <ElTableColumn prop="onlineRate" label="设备在线率" align="center">
          <template #default="{ row }">
            <ElProgress :percentage="row.onlineRate" :stroke-width="8" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="alarmCount" label="今日告警" align="center">
          <template #default="{ row }">
            <ElTag :type="row.alarmCount > 5 ? 'danger' : 'success'">{{ row.alarmCount }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="waterSupply" label="日供水量(吨)" align="center" />
        <ElTableColumn prop="status" label="状态" align="center">
          <template #default="{ row }">
            <ElTag :type="row.status === '正常' ? 'success' : 'warning'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useTenantStore } from '@/store/modules/tenant'
import { storeToRefs } from 'pinia'

defineOptions({ name: 'DashboardGroup' })

const tenantStore = useTenantStore()
const { isGroupView } = storeToRefs(tenantStore)

const statCards = [
  { label: '设备总数', value: '12,486', icon: '&#xe6a0;', color: '#409eff22' },
  { label: '今日告警', value: '23', icon: '&#xe6b5;', color: '#f56c6c22' },
  { label: '日供水量(吨)', value: '458,320', icon: '&#xe8a1;', color: '#67c23a22' },
  { label: '管网覆盖(km)', value: '3,264', icon: '&#xe7a8;', color: '#e6a23c22' },
]

const tenantSummary = [
  { name: '广州水务公司', deviceCount: 3842, onlineRate: 96, alarmCount: 8, waterSupply: 152400, status: '正常' },
  { name: '深圳水务公司', deviceCount: 4120, onlineRate: 98, alarmCount: 3, waterSupply: 168900, status: '正常' },
  { name: '东莞水务公司', deviceCount: 2654, onlineRate: 94, alarmCount: 7, waterSupply: 89600, status: '正常' },
  { name: '佛山水务公司', deviceCount: 1870, onlineRate: 91, alarmCount: 5, waterSupply: 47420, status: '预警' },
]
</script>

<style scoped lang="scss">
.dashboard-group {
  padding: 16px;
  .page-header {
    margin-bottom: 16px;
    h2 { margin: 0 0 4px; font-size: 18px; font-weight: 600; }
    .subtitle { margin: 0; color: var(--art-gray-600); font-size: 13px; }
  }
  .mb-16 { margin-bottom: 16px; }
  .mt-16 { margin-top: 16px; }
  .stat-row { margin-bottom: 0; }
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .stat-value { font-size: 22px; font-weight: 700; margin: 0 0 2px; }
    .stat-label { font-size: 12px; color: var(--art-gray-600); margin: 0; }
  }
}
</style>
