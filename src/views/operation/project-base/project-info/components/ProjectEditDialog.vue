<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑项目' : '新增项目'"
    width="1000px"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="140px"
      class="project-form"
    >
      <!-- 基本信息 -->
      <div class="form-section">
        <div class="section-title">基本信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目简称" prop="shortName">
              <el-input v-model="formData.shortName" placeholder="请输入项目简称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目模式" prop="mode">
              <el-select v-model="formData.mode" placeholder="请选择项目模式" style="width: 100%">
                <el-option
                  v-for="item in PROJECT_MODE_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择项目类型" style="width: 100%">
                <el-option
                  v-for="item in PROJECT_TYPE_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目责任单位" prop="responsibleUnitId">
              <el-select v-model="formData.responsibleUnitId" placeholder="请选择项目责任单位" style="width: 100%">
                <el-option
                  v-for="item in unitOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="股比" prop="shareRatio">
              <el-input-number v-model="formData.shareRatio" :min="0" :max="100" :precision="2" style="width: 100%">
                <template #suffix>%</template>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择项目状态" style="width: 100%">
                <el-option
                  v-for="item in PROJECT_STATUS_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目地址" prop="address">
              <div class="address-select">
                <el-select v-model="formData.province" placeholder="省" style="width: 80px">
                  <el-option label="河北省" value="河北省" />
                  <el-option label="天津市" value="天津市" />
                  <el-option label="北京市" value="北京市" />
                </el-select>
                <el-select v-model="formData.city" placeholder="市" style="width: 80px">
                  <el-option label="衡水市" value="衡水市" />
                  <el-option label="张家口市" value="张家口市" />
                  <el-option label="天津市" value="天津市" />
                </el-select>
                <el-select v-model="formData.district" placeholder="区" style="width: 80px">
                  <el-option label="桃城区" value="桃城区" />
                  <el-option label="桥西区" value="桥西区" />
                </el-select>
                <el-input v-model="formData.address" placeholder="详细地址" style="flex: 1" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务用户" prop="serviceUser">
              <el-input v-model="formData.serviceUser" placeholder="请输入服务用户">
                <template #append>
                  <el-button>新增用户</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开工时间" prop="startDate">
              <el-date-picker
                v-model="formData.startDate"
                type="date"
                placeholder="请选择开工时间"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划投产时间" prop="plannedProductionDate">
              <el-date-picker
                v-model="formData.plannedProductionDate"
                type="date"
                placeholder="请选择计划投产时间"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投产时间" prop="productionDate">
              <el-date-picker
                v-model="formData.productionDate"
                type="date"
                placeholder="请选择投产时间"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactPerson">
              <el-input v-model="formData.contactPerson" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contactPhone">
              <el-input v-model="formData.contactPhone" placeholder="请输入联系人电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="相关方" prop="relatedParty">
              <el-input v-model="formData.relatedParty" placeholder="请输入相关方" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="并网容量" prop="gridConnectionCapacity">
              <el-input-number v-model="formData.gridConnectionCapacity" :min="0" :precision="2" style="width: 100%">
                <template #suffix>MW</template>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="并网时间" prop="gridConnectionDate">
              <el-date-picker
                v-model="formData.gridConnectionDate"
                type="date"
                placeholder="请选择并网时间"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运维主体" prop="operationSubject">
              <el-input v-model="formData.operationSubject" placeholder="请输入运维主体" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场站编码" prop="stationCode">
              <el-input v-model="formData.stationCode" placeholder="请输入场站编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人员">
              <el-input v-model="currentUser" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-input v-model="currentTime" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 项目规模 -->
      <div class="form-section">
        <div class="section-title">项目规模</div>
        <div class="sub-section">
          <div class="sub-title">
            <el-radio v-model="formData.powerBusinessType" label="分布式光伏">发电业务/分布式光伏</el-radio>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="总规模-直流侧功率" prop="dcPower">
                <el-input-number v-model="formData.dcPower" :min="0" :precision="4" style="width: 100%">
                  <template #suffix>MWp</template>
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交流侧功率" prop="acPower">
                <el-input-number v-model="formData.acPower" :min="0" :precision="3" style="width: 100%">
                  <template #suffix>MW</template>
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 设备信息 -->
      <div class="form-section">
        <div class="section-title">设备信息</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="逆变器总数" prop="inverterCount">
              <el-input-number v-model="formData.inverterCount" :min="0" style="width: 100%">
                <template #suffix>台</template>
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 财务信息 -->
      <div class="form-section">
        <div class="section-title">财务信息</div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="是否转为国有资产" prop="isStateOwned">
              <el-radio-group v-model="formData.isStateOwned">
                <el-radio :label="true">已转</el-radio>
                <el-radio :label="false">未转</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 项目目标 -->
      <div class="form-section">
        <div class="section-title">项目目标</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="拟投资额" prop="plannedInvestment">
              <el-input-number v-model="formData.plannedInvestment" :min="0" :precision="4" style="width: 100%">
                <template #suffix>万元</template>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EPC合同金额" prop="epcContractAmount">
              <el-input-number v-model="formData.epcContractAmount" :min="0" :precision="4" style="width: 100%">
                <template #suffix>万元</template>
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="sub-section">
          <div class="sub-title">年度目标</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="年份" prop="annualYear">
                <el-date-picker
                  v-model="annualYear"
                  type="year"
                  placeholder="选择年份"
                  value-format="YYYY"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年报投资额" prop="annualInvestment">
                <el-input-number v-model="annualInvestment" :min="0" :precision="4" style="width: 100%">
                  <template #suffix>万元</template>
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年报拟投资形象" prop="annualInvestmentImage">
                <el-input v-model="annualInvestmentImage" placeholder="请输入年报拟投资形象" />
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
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  addProjectInfo,
  updateProjectInfo,
  getResponsibleUnitList
} from '@/api/project-info'
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_MODE_OPTIONS,
  PROJECT_TYPE_OPTIONS
} from '@/types/project-info'
import type { ProjectInfo, ProjectInfoFormData } from '@/types/project-info'

const props = defineProps<{
  modelValue: boolean
  data: ProjectInfo | null
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
const unitOptions = ref<Array<{ id: number; name: string }>>([])

// 当前用户和时间
const currentUser = ref('当前用户')
const currentTime = ref(new Date().toLocaleString())

// 年度目标临时数据
const annualYear = ref('2026')
const annualInvestment = ref(111)
const annualInvestmentImage = ref('111111111111')

// 是否编辑模式
const isEdit = computed(() => !!props.data)

// 表单数据
const formData = reactive<ProjectInfoFormData>({
  id: undefined,
  name: '',
  shortName: '',
  mode: 'single_business',
  type: 'distributed_pv',
  responsibleUnitId: undefined as unknown as number,
  shareRatio: 50,
  status: 'operating',
  province: '',
  city: '',
  district: '',
  address: '',
  serviceUser: '',
  startDate: '',
  plannedProductionDate: '',
  productionDate: '',
  contactPerson: '',
  contactPhone: '',
  relatedParty: '',
  gridConnectionCapacity: 0,
  gridConnectionDate: '',
  operationSubject: '',
  stationCode: '',
  powerBusinessType: '分布式光伏',
  dcPower: 0,
  acPower: 0,
  inverterCount: 0,
  isStateOwned: false,
  plannedInvestment: 0,
  epcContractAmount: 0,
  annualTargets: []
})

// 表单校验规则
const formRules: FormRules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  shortName: [{ required: true, message: '请输入项目简称', trigger: 'blur' }],
  mode: [{ required: true, message: '请选择项目模式', trigger: 'change' }],
  type: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
  responsibleUnitId: [{ required: true, message: '请选择项目责任单位', trigger: 'change' }],
  shareRatio: [{ required: true, message: '请输入股比', trigger: 'blur' }],
  status: [{ required: true, message: '请选择项目状态', trigger: 'change' }],
  address: [{ required: true, message: '请输入项目地址', trigger: 'blur' }],
  serviceUser: [{ required: true, message: '请输入服务用户', trigger: 'blur' }],
  startDate: [{ required: true, message: '请选择开工时间', trigger: 'change' }],
  plannedProductionDate: [{ required: true, message: '请选择计划投产时间', trigger: 'change' }],
  contactPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  contactPhone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }],
  dcPower: [{ required: true, message: '请输入直流侧功率', trigger: 'blur' }],
  acPower: [{ required: true, message: '请输入交流侧功率', trigger: 'blur' }],
  plannedInvestment: [{ required: true, message: '请输入拟投资额', trigger: 'blur' }],
  epcContractAmount: [{ required: true, message: '请输入EPC合同金额', trigger: 'blur' }]
}

// 获取责任单位列表
const fetchUnitList = async () => {
  try {
    const res = await getResponsibleUnitList()
    unitOptions.value = res.data
  } catch (error) {
    console.error('获取责任单位列表失败:', error)
  }
}

// 监听数据变化
watch(() => props.data, (val) => {
  if (val) {
    formData.id = val.id
    formData.name = val.name
    formData.shortName = val.shortName
    formData.mode = val.mode
    formData.type = val.type
    formData.responsibleUnitId = val.responsibleUnitId
    formData.shareRatio = val.shareRatio
    formData.status = val.status
    formData.province = val.province
    formData.city = val.city
    formData.district = val.district
    formData.address = val.address
    formData.serviceUser = val.serviceUser
    formData.startDate = val.startDate
    formData.plannedProductionDate = val.plannedProductionDate
    formData.productionDate = val.productionDate
    formData.contactPerson = val.contactPerson
    formData.contactPhone = val.contactPhone
    formData.relatedParty = val.relatedParty
    formData.gridConnectionCapacity = val.gridConnectionCapacity
    formData.gridConnectionDate = val.gridConnectionDate
    formData.operationSubject = val.operationSubject
    formData.stationCode = val.stationCode
    formData.powerBusinessType = val.powerBusinessType
    formData.dcPower = val.dcPower
    formData.acPower = val.acPower
    formData.inverterCount = val.inverterCount
    formData.isStateOwned = val.isStateOwned
    formData.plannedInvestment = val.plannedInvestment
    formData.epcContractAmount = val.epcContractAmount
    formData.annualTargets = val.annualTargets || []
    
    // 回填年度目标
    if (val.annualTargets && val.annualTargets.length > 0) {
      const target = val.annualTargets[0]
      annualYear.value = String(target.year)
      annualInvestment.value = target.annualInvestment
      annualInvestmentImage.value = target.annualInvestmentImage
    }
  } else {
    // 重置表单
    formData.id = undefined
    formData.name = ''
    formData.shortName = ''
    formData.mode = 'single_business'
    formData.type = 'distributed_pv'
    formData.responsibleUnitId = undefined as unknown as number
    formData.shareRatio = 50
    formData.status = 'operating'
    formData.province = ''
    formData.city = ''
    formData.district = ''
    formData.address = ''
    formData.serviceUser = ''
    formData.startDate = ''
    formData.plannedProductionDate = ''
    formData.productionDate = ''
    formData.contactPerson = ''
    formData.contactPhone = ''
    formData.relatedParty = ''
    formData.gridConnectionCapacity = 0
    formData.gridConnectionDate = ''
    formData.operationSubject = ''
    formData.stationCode = ''
    formData.powerBusinessType = '分布式光伏'
    formData.dcPower = 0
    formData.acPower = 0
    formData.inverterCount = 0
    formData.isStateOwned = false
    formData.plannedInvestment = 0
    formData.epcContractAmount = 0
    formData.annualTargets = []
    annualYear.value = '2026'
    annualInvestment.value = 111
    annualInvestmentImage.value = '111111111111'
  }
}, { immediate: true })

// 提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true
    try {
      // 构建年度目标
      formData.annualTargets = [{
        year: Number(annualYear.value),
        annualInvestment: annualInvestment.value,
        annualInvestmentImage: annualInvestmentImage.value
      }]

      if (isEdit.value) {
        await updateProjectInfo(formData)
        ElMessage.success('更新成功')
      } else {
        await addProjectInfo(formData)
        ElMessage.success('新增成功')
      }
      visible.value = false
      emit('success')
    } catch (error) {
      console.error('提交失败:', error)
      ElMessage.error(isEdit.value ? '更新失败' : '新增失败')
    } finally {
      submitLoading.value = false
    }
  })
}

onMounted(() => {
  fetchUnitList()
})
</script>

<style scoped lang="scss">
.form-section {
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
    }
  }
}

.project-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}

.address-select {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
