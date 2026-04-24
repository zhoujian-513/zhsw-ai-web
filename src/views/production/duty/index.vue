<template>
  <div class="page-container">
    <div class="page-header"><h2>值班管理</h2></div>
    <ElRow :gutter="16">
      <ElCol :span="16">
        <ElCard shadow="never">
          <template #header>
            <div class="card-header">
              <span>本月值班计划</span>
              <div>
                <ElButton size="small">上月</ElButton>
                <ElButton size="small">2026年03月</ElButton>
                <ElButton size="small">下月</ElButton>
                <ElButton type="primary" size="small">排班</ElButton>
              </div>
            </div>
          </template>
          <ElTable :data="dutySchedule" stripe border size="small">
            <ElTableColumn prop="week" label="周次" width="80" align="center" />
            <ElTableColumn prop="date" label="日期" width="120" />
            <ElTableColumn prop="shift" label="班次" width="100" align="center">
              <template #default="{ row }">
                <ElTag :type="row.shift === '白班' ? 'primary' : 'info'" size="small">{{ row.shift }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="leader" label="值班长" width="100" />
            <ElTableColumn prop="members" label="值班人员" show-overflow-tooltip />
            <ElTableColumn prop="status" label="状态" align="center" width="100">
              <template #default="{ row }">
                <ElTag :type="row.status === '已完成' ? 'success' : row.status === '值班中' ? 'warning' : 'info'" size="small">{{ row.status }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="100" align="center">
              <template #default><ElButton type="primary" link size="small">详情</ElButton></template>
            </ElTableColumn>
          </ElTable>
          <ElPagination class="mt-16" layout="total, prev, pager, next" :total="31" :page-size="10" />
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <ElCard shadow="never" class="mb-16">
          <template #header><span>今日值班信息</span></template>
          <ElDescriptions :column="1" border size="small">
            <ElDescriptionsItem label="当前班次">白班（08:00-20:00）</ElDescriptionsItem>
            <ElDescriptionsItem label="值班长">陈志强</ElDescriptionsItem>
            <ElDescriptionsItem label="值班人员">李明、张伟、王芳</ElDescriptionsItem>
            <ElDescriptionsItem label="值班开始">2026-03-30 08:00</ElDescriptionsItem>
            <ElDescriptionsItem label="交班时间">2026-03-30 20:00</ElDescriptionsItem>
          </ElDescriptions>
        </ElCard>
        <ElCard shadow="never">
          <template #header><span>值班统计（本月）</span></template>
          <div class="stat-grid">
            <div class="stat-item"><span class="stat-num">31</span><span class="stat-label">总班次</span></div>
            <div class="stat-item"><span class="stat-num">8</span><span class="stat-label">参与人数</span></div>
            <div class="stat-item"><span class="stat-num">3</span><span class="stat-label">异常事件</span></div>
            <div class="stat-item"><span class="stat-num">0</span><span class="stat-label">空岗次数</span></div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DutyManagement' })
const dutySchedule = [
  { week: '第五周', date: '2026-03-30', shift: '白班', leader: '陈志强', members: '李明、张伟、王芳', status: '值班中' },
  { week: '第五周', date: '2026-03-30', shift: '夜班', leader: '刘海', members: '周杰、吴磊', status: '待值班' },
  { week: '第五周', date: '2026-03-29', shift: '白班', leader: '张建国', members: '赵敏、钱进、孙亮', status: '已完成' },
  { week: '第五周', date: '2026-03-29', shift: '夜班', leader: '陈志强', members: '李明、张伟', status: '已完成' },
  { week: '第四周', date: '2026-03-28', shift: '白班', leader: '刘海', members: '周杰、吴磊、王芳', status: '已完成' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mb-16 { margin-bottom: 16px; }
.mt-16 { margin-top: 16px; }
.stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 8px 0; }
.stat-item { text-align: center; }
.stat-num { display: block; font-size: 28px; font-weight: 700; color: #409eff; }
.stat-label { font-size: 12px; color: #909399; }
</style>
