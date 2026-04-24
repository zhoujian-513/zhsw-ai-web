<template>
  <el-dialog
    v-model="visible"
    title="审核有限空间台账"
    width="600px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div class="audit-info">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="所属厂站">{{ data?.stationName }}</el-descriptions-item>
        <el-descriptions-item label="有限空间编号">{{ data?.code }}</el-descriptions-item>
        <el-descriptions-item label="所在部位">{{ data?.structure }}</el-descriptions-item>
        <el-descriptions-item label="责任人">{{ data?.responsiblePerson }}</el-descriptions-item>
        <el-descriptions-item label="具体位置" :span="2">{{ data?.location }}</el-descriptions-item>
        <el-descriptions-item label="主要风险分析">
          <el-tag
            v-for="risk in data?.riskAnalysis"
            :key="risk"
            size="small"
            class="risk-tag"
          >
            {{ getRiskLabel(risk) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="填报人">{{ data?.createBy }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      class="audit-form"
    >
      <el-form-item label="审核结果" prop="approved">
        <el-radio-group v-model="formData.approved">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见" prop="comment">
        <el-input
          v-model="formData.comment"
          type="textarea"
          :rows="4"
          placeholder="请输入审核意见"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { auditConfinedSpace } from '@/api/confined-space'
import type { ConfinedSpace, AuditFormData } from '@/types/confined-space'
import { RiskTypeLabels } from '@/types/confined-space'

const props = defineProps<{
  modelValue: boolean
  data: ConfinedSpace | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref<FormInstance>()
const submitLoading = ref(false)

// 表单数据
const formData = reactive<AuditFormData>({
  id: 0,
  approved: true,
  comment: ''
})

// 表单校验规则
const formRules: FormRules = {
  approved: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
  comment: [{ required: true, message: '请输入审核意见', trigger: 'blur' }]
}

// 获取风险标签
const getRiskLabel = (risk: string) => {
  return RiskTypeLabels[risk as keyof typeof RiskTypeLabels] || risk
}

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.id = val.id
    formData.approved = true
    formData.comment = ''
  }
}, { immediate: true })

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true
    try {
      await auditConfinedSpace(formData)
      ElMessage.success('审核成功')
      visible.value = false
      emit('success')
    } catch (error) {
      console.error('审核失败:', error)
    } finally {
      submitLoading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.audit-info {
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.audit-form {
  padding: 0 10px;
}

.risk-tag {
  margin-right: 4px;
  margin-bottom: 2px;
}
</style>
