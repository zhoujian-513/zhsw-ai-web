<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑防汛专项管理' : '新增防汛专项管理'"
    width="1100px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="140px"
      class="edit-form"
    >
      <!-- 基础信息区 -->
      <div class="form-section">
        <div class="section-title">基础信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectId">
              <el-select
                v-model="formData.projectId"
                placeholder="请选择项目"
                style="width: 100%"
                :disabled="isEdit"
                @change="handleProjectChange"
              >
                <el-option
                  v-for="item in projectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地">
              <el-input v-model="selectedProject.location" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属区域公司">
              <el-input v-model="selectedProject.regionCompany" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 防汛工程明细区 -->
      <div class="form-section">
        <div class="section-title section-title-with-action">
          <span>防汛工程明细</span>
          <el-button type="primary" size="small" @click="handleAddProjectDetail">
            <el-icon><Plus /></el-icon>新增工程
          </el-button>
        </div>

        <!-- 防汛工程明细列表 -->
        <div class="project-detail-list">
          <el-table
            :data="formData.projectDetails"
            border
            size="small"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column label="防汛工程名称" min-width="150">
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`projectDetails.${$index}.projectName`"
                  :rules="{ required: true, message: '请输入工程名称', trigger: 'blur' }"
                  class="table-form-item"
                >
                  <el-input v-model="row.projectName" placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="防汛工程类型" min-width="180">
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`projectDetails.${$index}.projectType`"
                  :rules="{ required: true, message: '请选择类型', trigger: 'change' }"
                  class="table-form-item"
                >
                  <el-select v-model="row.projectType" placeholder="请选择" style="width: 100%">
                    <el-option
                      v-for="item in floodProjectTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="主要风险类型" min-width="180">
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`projectDetails.${$index}.riskType`"
                  :rules="{ required: true, message: '请选择风险类型', trigger: 'change' }"
                  class="table-form-item"
                >
                  <el-select v-model="row.riskType" placeholder="请选择" style="width: 100%">
                    <el-option
                      v-for="item in riskTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="关联水系" min-width="120">
              <template #default="{ row }">
                <el-input v-model="row.relatedWaterSystem" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column label="汛期时段" min-width="200">
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`projectDetails.${$index}.floodSeason`"
                  :rules="{ required: true, message: '请选择汛期时段', trigger: 'change', validator: validateFloodSeason }"
                  class="table-form-item"
                >
                  <el-date-picker
                    v-model="row.floodSeason"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    value-format="YYYY-MM"
                    style="width: 100%"
                    @change="(val) => handleFloodSeasonChange(val, $index)"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
              <template #default="{ $index }">
                <el-button
                  type="danger"
                  link
                  size="small"
                  @click="handleRemoveProjectDetail($index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 空状态 -->
          <el-empty v-if="formData.projectDetails.length === 0" description="暂无防汛工程明细，请点击上方按钮添加" />
        </div>

        <!-- 展开的明细编辑（点击行展开） -->
        <div
          v-for="(detail, index) in formData.projectDetails"
          :key="index"
          class="detail-edit-card"
        >
          <div class="detail-edit-header">
            <span class="detail-title">工程明细 #{{ index + 1 }}: {{ detail.projectName || '未命名工程' }}</span>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleRemoveProjectDetail(index)"
            >
              删除
            </el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="关键节点工期">
                <el-input
                  v-model="detail.keyNodeSchedule"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入关键节点工期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主要影响">
                <el-input
                  v-model="detail.mainImpact"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入主要影响"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应对保障措施">
                <el-input
                  v-model="detail.safeguardMeasures"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入应对保障措施"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="历年涉险事件">
                <el-input
                  v-model="detail.historicalIncidents"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入2020年1月1日以来的涉险事件"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="施工单位/运维单位">
                <el-input v-model="detail.constructionUnit" placeholder="请输入施工单位/运维单位" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="detail.remark" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { createFloodPrevention, updateFloodPrevention, getProjectList } from '@/api/flood-prevention'
import type {
  FloodPrevention,
  FloodPreventionFormData,
  FloodProjectDetailFormData,
  ProjectInfo
} from '@/types/flood-prevention'
import { floodProjectTypeOptions, riskTypeOptions } from '@/types/flood-prevention'

const props = defineProps<{
  modelValue: boolean
  data: FloodPrevention | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.data)

const formRef = ref<FormInstance>()
const submitLoading = ref(false)

// 项目列表
const projectList = ref<ProjectInfo[]>([])

// 选中的项目信息
const selectedProject = reactive({
  location: '',
  regionCompany: ''
})

// 表单数据
const formData = reactive<FloodPreventionFormData & {
  id?: number
}>({
  id: undefined,
  projectId: undefined as unknown as number,
  projectDetails: []
})

// 表单校验规则
const formRules: FormRules = {
  projectId: [{ required: true, message: '请选择项目', trigger: 'change' }]
}

// 汛期时段校验
const validateFloodSeason = (_rule: any, value: any, callback: any) => {
  if (!value || !Array.isArray(value) || value.length !== 2) {
    callback(new Error('请选择汛期时段'))
  } else {
    callback()
  }
}

// 获取项目列表
const fetchProjectList = async () => {
  try {
    const res = await getProjectList()
    projectList.value = res.data
  } catch (error) {
    console.error('获取项目列表失败:', error)
  }
}

// 项目选择变化
const handleProjectChange = (projectId: number) => {
  const project = projectList.value.find(p => p.id === projectId)
  if (project) {
    selectedProject.location = project.location
    selectedProject.regionCompany = project.regionCompany
  }
}

// 汛期时段变化
const handleFloodSeasonChange = (val: string[] | null, index: number) => {
  if (val && val.length === 2) {
    formData.projectDetails[index].floodSeasonStart = val[0]
    formData.projectDetails[index].floodSeasonEnd = val[1]
  }
}

// 新增防汛工程明细
const handleAddProjectDetail = () => {
  const newDetail: FloodProjectDetailFormData & { floodSeason?: string[] } = {
    projectName: '',
    projectType: 'hydraulic' as const,
    riskType: 'node_deadline' as const,
    relatedWaterSystem: '',
    floodSeasonStart: '',
    floodSeasonEnd: '',
    floodSeason: [],
    keyNodeSchedule: '',
    mainImpact: '',
    safeguardMeasures: '',
    constructionUnit: '',
    historicalIncidents: '',
    remark: ''
  }
  formData.projectDetails.push(newDetail)
}

// 删除防汛工程明细
const handleRemoveProjectDetail = (index: number) => {
  formData.projectDetails.splice(index, 1)
}

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.id = val.id
    formData.projectId = val.projectId
    selectedProject.location = val.location
    selectedProject.regionCompany = val.regionCompany

    // 转换明细数据
    formData.projectDetails = val.projectDetails.map(detail => ({
      id: detail.id,
      projectName: detail.projectName,
      projectType: detail.projectType,
      riskType: detail.riskType,
      relatedWaterSystem: detail.relatedWaterSystem,
      floodSeasonStart: detail.floodSeasonStart,
      floodSeasonEnd: detail.floodSeasonEnd,
      floodSeason: [detail.floodSeasonStart, detail.floodSeasonEnd],
      keyNodeSchedule: detail.keyNodeSchedule,
      mainImpact: detail.mainImpact,
      safeguardMeasures: detail.safeguardMeasures,
      constructionUnit: detail.constructionUnit,
      historicalIncidents: detail.historicalIncidents,
      remark: detail.remark
    }))
  } else {
    formData.id = undefined
    formData.projectId = undefined as unknown as number
    formData.projectDetails = []
    selectedProject.location = ''
    selectedProject.regionCompany = ''
  }
}, { immediate: true })

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val) {
    fetchProjectList()
  }
})

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    if (formData.projectDetails.length === 0) {
      ElMessage.warning('请至少添加一个防汛工程明细')
      return
    }

    submitLoading.value = true
    try {
      // 转换提交数据
      const submitData: FloodPreventionFormData = {
        id: formData.id,
        projectId: formData.projectId,
        projectDetails: formData.projectDetails.map(detail => ({
          id: detail.id,
          projectName: detail.projectName,
          projectType: detail.projectType,
          riskType: detail.riskType,
          relatedWaterSystem: detail.relatedWaterSystem,
          floodSeasonStart: detail.floodSeasonStart,
          floodSeasonEnd: detail.floodSeasonEnd,
          keyNodeSchedule: detail.keyNodeSchedule,
          mainImpact: detail.mainImpact,
          safeguardMeasures: detail.safeguardMeasures,
          constructionUnit: detail.constructionUnit,
          historicalIncidents: detail.historicalIncidents,
          remark: detail.remark
        }))
      }

      if (isEdit.value) {
        await updateFloodPrevention(submitData)
        ElMessage.success('更新成功')
      } else {
        await createFloodPrevention(submitData)
        ElMessage.success('创建成功')
      }
      visible.value = false
      emit('success')
    } catch (error) {
      console.error(isEdit.value ? '更新失败:' : '创建失败:', error)
      ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
    } finally {
      submitLoading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.form-section {
  margin-bottom: 24px;

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .section-title-with-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.edit-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}

.project-detail-list {
  margin-bottom: 16px;

  .table-form-item {
    margin-bottom: 0;

    :deep(.el-form-item__content) {
      line-height: 32px;
    }
  }
}

.detail-edit-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: var(--el-fill-color-lighter);

  .detail-edit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px dashed var(--el-border-color);

    .detail-title {
      font-weight: 600;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
