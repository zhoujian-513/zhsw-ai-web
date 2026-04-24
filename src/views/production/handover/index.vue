<template>
  <div class="page-container">
    <div class="page-header"><h2>交接班管理</h2></div>
    <ElRow :gutter="16">
      <ElCol :span="14">
        <ElCard shadow="never">
          <template #header>
            <div class="card-header">
              <span>交接班记录</span>
              <ElButton type="primary" size="small">新建交接班</ElButton>
            </div>
          </template>
          <ElTable :data="handoverList" stripe border>
            <ElTableColumn prop="date" label="日期" width="120" />
            <ElTableColumn prop="shift" label="班次" width="100" align="center" />
            <ElTableColumn prop="outgoing" label="交班人" width="100" />
            <ElTableColumn prop="incoming" label="接班人" width="100" />
            <ElTableColumn prop="handoverTime" label="交接时间" width="150" />
            <ElTableColumn prop="issues" label="遗留问题数" align="center" width="110">
              <template #default="{ row }">
                <ElTag :type="row.issues > 0 ? 'warning' : 'success'" size="small">{{ row.issues }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="status" label="状态" align="center" width="100">
              <template #default="{ row }">
                <ElTag :type="row.status === '已确认' ? 'success' : 'info'" size="small">{{ row.status }}</ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="100" align="center">
              <template #default><ElButton type="primary" link size="small">查看</ElButton></template>
            </ElTableColumn>
          </ElTable>
          <ElPagination class="mt-16" layout="total, prev, pager, next" :total="62" />
        </ElCard>
      </ElCol>
      <ElCol :span="10">
        <ElCard shadow="never">
          <template #header><span>本次交接班内容（待填写）</span></template>
          <ElForm :model="handoverForm" label-width="90px">
            <ElFormItem label="交班人"><ElInput v-model="handoverForm.outgoing" /></ElFormItem>
            <ElFormItem label="接班人"><ElInput v-model="handoverForm.incoming" /></ElFormItem>
            <ElFormItem label="设备运行">
              <ElInput v-model="handoverForm.equipStatus" type="textarea" :rows="3" placeholder="描述当前设备运行状态" />
            </ElFormItem>
            <ElFormItem label="遗留问题">
              <ElInput v-model="handoverForm.issues" type="textarea" :rows="3" placeholder="描述未处理的问题" />
            </ElFormItem>
            <ElFormItem label="注意事项">
              <ElInput v-model="handoverForm.notes" type="textarea" :rows="2" placeholder="其他注意事项" />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary">提交交接</ElButton>
              <ElButton>保存草稿</ElButton>
            </ElFormItem>
          </ElForm>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShiftHandover' })
const handoverForm = reactive({ outgoing: '', incoming: '', equipStatus: '', issues: '', notes: '' })
const handoverList = [
  { date: '2026-03-30', shift: '白班', outgoing: '陈志强', incoming: '刘海', handoverTime: '2026-03-30 20:05', issues: 2, status: '已确认' },
  { date: '2026-03-29', shift: '夜班', outgoing: '刘海', incoming: '张建国', handoverTime: '2026-03-30 08:03', issues: 0, status: '已确认' },
  { date: '2026-03-29', shift: '白班', outgoing: '张建国', incoming: '陈志强', handoverTime: '2026-03-29 20:10', issues: 1, status: '已确认' },
  { date: '2026-03-28', shift: '夜班', outgoing: '陈志强', incoming: '刘海', handoverTime: '2026-03-29 08:02', issues: 0, status: '已确认' },
]
</script>

<style scoped lang="scss">
.page-container { padding: 16px; }
.page-header { margin-bottom: 16px; h2 { margin: 0; font-size: 18px; font-weight: 600; } }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.mt-16 { margin-top: 16px; }
</style>
