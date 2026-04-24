<template>
  <el-dialog
    v-model="visible"
    title="批量审核有限空间台账"
    width="600px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div class="batch-audit-info">
      <el-alert
        :title="`已选择 ${selectedCount} 条待审核记录`"
        type="info"
        :closable="false"
        show-icon
      />
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
          <el-radio :label="true">审核通过</el-radio>
          <el-radio :label="false">审核不通过</el-radio>
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
import { batchAuditConfinedSpace } from '@/api/confined-space'
import type { BatchAuditFormData } from '@/types/confined-space'

const props = defineProps<{
  modelValue: boolean
  selectedCount: number
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
const formData = reactive<BatchAuditFormData>({
  ids: [],
  approved: true,
  comment: ''
})

// 表单校验规则
const formRules: FormRules = {
  approved: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
  comment: [{ required: true, message: '请输入审核意见', trigger: 'blur' }]
}

// 监听弹窗显示
watch(() => props.modelValue, (val) => {
  if (val) {
    formData.approved = true
    formData.comment = ''
  }
})

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true
    try {
      await batchAuditConfinedSpace(formData)
      ElMessage.success('批量审核成功')
      visible.value = false
      emit('success')
    } catch (error) {
      console.error('批量审核失败:', error)
    } finally {
      submitLoading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.batch-audit-info {
  margin-bottom: 24px;
}

.audit-form {
  padding: 0 10px;
}
</style>
