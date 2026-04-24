<template>
  <el-dialog
    v-model="visible"
    title="项目详情"
    width="1000px"
    destroy-on-close
  >
    <!-- 基本信息 -->
    <div class="detail-section">
      <div class="section-title">基本信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="项目名称">{{ data?.name }}</el-descriptions-item>
        <el-descriptions-item label="项目简称">{{ data?.shortName }}</el-descriptions-item>
        <el-descriptions-item label="项目模式">{{ data?.modeName }}</el-descriptions-item>
        <el-descriptions-item label="项目类型">{{ data?.typeName }}</el-descriptions-item>
        <el-descriptions-item label="项目责任单位">{{ data?.responsibleUnit }}</el-descriptions-item>
        <el-descriptions-item label="股比">{{ data?.shareRatio }}%</el-descriptions-item>
        <el-descriptions-item label="项目状态">
          <el-tag :type="data?.status === 'operating' ? 'success' : 'info'">
            {{ data?.statusName }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="项目地址">{{ data?.province }}{{ data?.city }}{{ data?.district }}{{ data?.address }}</el-descriptions-item>
        <el-descriptions-item label="服务用户">{{ data?.serviceUser }}</el-descriptions-item>
        <el-descriptions-item label="开工时间">{{ data?.startDate }}</el-descriptions-item>
        <el-descriptions-item label="计划投产时间">{{ data?.plannedProductionDate }}</el-descriptions-item>
        <el-descriptions-item label="投产时间">{{ data?.productionDate }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ data?.contactPerson }}</el-descriptions-item>
        <el-descriptions-item label="联系人电话">{{ data?.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="相关方">{{ data?.relatedParty || '-' }}</el-descriptions-item>
        <el-descriptions-item label="并网容量">{{ data?.gridConnectionCapacity }} MW</el-descriptions-item>
        <el-descriptions-item label="并网时间">{{ data?.gridConnectionDate }}</el-descriptions-item>
        <el-descriptions-item label="运维主体">{{ data?.operationSubject || '-' }}</el-descriptions-item>
        <el-descriptions-item label="场站编码">{{ data?.stationCode }}</el-descriptions-item>
        <el-descriptions-item label="创建人员">{{ data?.creator }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ data?.createTime }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 项目规模 -->
    <div class="detail-section">
      <div class="section-title">项目规模</div>
      <div class="sub-section">
        <div class="sub-title">发电业务/{{ data?.powerBusinessType }}</div>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="总规模-直流侧功率">{{ data?.dcPower }} MWp</el-descriptions-item>
          <el-descriptions-item label="交流侧功率">{{ data?.acPower }} MW</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <!-- 设备信息 -->
    <div class="detail-section">
      <div class="section-title">设备信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="逆变器总数">{{ data?.inverterCount }} 台</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 财务信息 -->
    <div class="detail-section">
      <div class="section-title">财务信息</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="是否转为国有资产">
          <el-tag :type="data?.isStateOwned ? 'success' : 'info'">
            {{ data?.isStateOwned ? '已转' : '未转' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 项目目标 -->
    <div class="detail-section">
      <div class="section-title">项目目标</div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="拟投资额">{{ data?.plannedInvestment }} 万元</el-descriptions-item>
        <el-descriptions-item label="EPC合同金额">{{ data?.epcContractAmount }} 万元</el-descriptions-item>
      </el-descriptions>
      <div v-if="data?.annualTargets && data.annualTargets.length > 0" class="sub-section">
        <div class="sub-title">年度目标</div>
        <el-table :data="data.annualTargets" border size="small">
          <el-table-column prop="year" label="年份" width="120" />
          <el-table-column prop="annualInvestment" label="年报投资额(万元)" min-width="150" />
          <el-table-column prop="annualInvestmentImage" label="年报拟投资形象" min-width="200" />
        </el-table>
      </div>
    </div>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectInfo } from '@/types/project-info'

const props = defineProps<{
  modelValue: boolean
  data: ProjectInfo | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style scoped lang="scss">
.detail-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid var(--el-color-primary);
  }

  .sub-section {
    margin-top: 16px;
    padding: 16px;
    background-color: var(--el-fill-color-light);
    border-radius: 4px;

    .sub-title {
      margin-bottom: 12px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
