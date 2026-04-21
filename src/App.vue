<template>
  <ElConfigProvider size="default" :locale="locales[language]" :z-index="3000">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
  import { useUserStore } from './store/modules/user'
  import { useTenantStore } from './store/modules/tenant'
  import zh from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/es/locale/lang/en'
  import { systemUpgrade } from './utils/sys'

  import { setThemeTransitionClass } from './utils/theme/animation'
  import { checkStorageCompatibility } from './utils/storage'

  const userStore = useUserStore()
  const { language } = storeToRefs(userStore)

  const tenantStore = useTenantStore()
  tenantStore.setTenantList([
    { id: 'group', name: '智慧水务集团', shortName: '集团', type: 'group', status: 1 },
    { id: 't001', name: '北部水厂', shortName: '北部水厂', type: 'subsidiary', region: '北部', status: 1 },
    { id: 't002', name: '南部水厂', shortName: '南部水厂', type: 'subsidiary', region: '南部', status: 1 },
    { id: 't003', name: '东部水厂', shortName: '东部水厂', type: 'subsidiary', region: '东部', status: 1 },
  ])

  const locales = {
    zh: zh,
    en: en
  }

  onBeforeMount(() => {
    setThemeTransitionClass(true)
  })

  onMounted(() => {
    // 检查存储兼容性
    checkStorageCompatibility()
    // 提升暗黑主题下页面刷新视觉体验
    setThemeTransitionClass(false)
    // 系统升级
    systemUpgrade()
  })
</script>
