import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Tenant {
  id: string
  name: string
  shortName: string
  type: 'group' | 'subsidiary'
  region?: string
  contactPerson?: string
  contactPhone?: string
  status: 1 | 0
}

export const useTenantStore = defineStore(
  'tenantStore',
  () => {
    const currentTenantId = ref<string>('group')
    const tenantList = ref<Tenant[]>([])

    const isGroupView = computed(() => currentTenantId.value === 'group')

    const currentTenant = computed(() =>
      tenantList.value.find((t) => t.id === currentTenantId.value) ?? null
    )

    function setTenantList(list: Tenant[]) {
      tenantList.value = list
    }

    function switchTenant(id: string) {
      currentTenantId.value = id
    }

    return {
      currentTenantId,
      tenantList,
      isGroupView,
      currentTenant,
      setTenantList,
      switchTenant
    }
  },
  {
    persist: {
      key: 'tenantStore',
      storage: localStorage,
      pick: ['currentTenantId']
    }
  }
)
