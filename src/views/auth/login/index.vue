<template>
  <div class="login-page">
    <!-- 动态背景网格 -->
    <div class="bg-grid"></div>

    <!-- 流动粒子 -->
    <div class="particles">
      <span v-for="i in 20" :key="i" class="particle" :style="particleStyle(i)"></span>
    </div>

    <!-- 水波背景 -->
    <div class="water-waves">
      <svg viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="wave-group">
          <use href="#wave" x="48" y="0" class="wave wave-1" />
          <use href="#wave" x="48" y="3" class="wave wave-2" />
          <use href="#wave" x="48" y="5" class="wave wave-3" />
        </g>
      </svg>
    </div>

    <!-- 主卡片 -->
    <div class="login-card">
      <!-- 左侧信息面板 -->
      <div class="brand-panel">
        <div class="brand-top">
          <div class="brand-logo">
            <ArtLogo class="logo-img" />
          </div>
          <div class="brand-text">
            <h1 class="brand-name">{{ systemName }}</h1>
            <p class="brand-tagline">智慧水务综合管理平台</p>
          </div>
        </div>

        <!-- 科技数据展示 -->
        <div class="data-grid">
          <div class="data-item" v-for="item in dataItems" :key="item.label">
            <div class="data-value">{{ item.value }}</div>
            <div class="data-label">{{ item.label }}</div>
          </div>
        </div>

        <!-- 扫描线装饰 -->
        <div class="scan-line"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <!-- 圆弧装饰 -->
        <div class="arc-deco arc-1"></div>
        <div class="arc-deco arc-2"></div>
      </div>

      <!-- 右侧表单区 -->
      <div class="form-panel">
        <div class="form-header">
          <h2 class="form-title">{{ $t('login.title') }}</h2>
          <p class="form-subtitle">{{ $t('login.subTitle') }}</p>
        </div>

        <ElForm
          ref="formRef"
          :model="formData"
          :rules="rules"
          :key="formKey"
          @keyup.enter="handleSubmit"
          class="login-form"
        >
          <ElFormItem prop="username">
            <div class="input-wrap">
              <i class="iconfont-sys input-icon">&#xe60e;</i>
              <ElInput
                :placeholder="$t('login.placeholder.username')"
                v-model.trim="formData.username"
              />
            </div>
          </ElFormItem>
          <ElFormItem prop="password">
            <div class="input-wrap">
              <i class="iconfont-sys input-icon">&#xe679;</i>
              <ElInput
                :placeholder="$t('login.placeholder.password')"
                v-model.trim="formData.password"
                type="password"
                autocomplete="off"
                show-password
              />
            </div>
          </ElFormItem>

          <div class="form-options">
            <ElCheckbox v-model="formData.rememberPassword">{{
              $t('login.rememberPwd')
            }}</ElCheckbox>
          </div>

          <ElButton
            class="login-btn"
            type="primary"
            @click="handleSubmit"
            :loading="loading"
          >
            <span class="btn-text">{{ $t('login.btnText') }}</span>
          </ElButton>

          <p class="default-account">默认账号：admin / 123456</p>
        </ElForm>
      </div>
    </div>

    <p class="copyright">© 2026 智慧水务综合管理平台 All Rights Reserved</p>
  </div>
</template>

<script setup lang="ts">
  import AppConfig from '@/config'
  import { useUserStore } from '@/store/modules/user'
  import { useI18n } from 'vue-i18n'
  import { HttpError } from '@/utils/http/error'
  import { fetchLogin } from '@/api/auth'

  defineOptions({ name: 'LoginPage' })

  const router = useRouter()
  const userStore = useUserStore()
  const { t } = useI18n()
  const systemName = AppConfig.systemInfo.name

  const formRef = ref()
  const formKey = ref(0)
  const loading = ref(false)

  const formData = reactive({
    username: 'admin',
    password: '123456',
    rememberPassword: false
  })

  const rules = {
    username: [{ required: true, message: t('login.rules.username'), trigger: 'blur' }],
    password: [{ required: true, message: t('login.rules.password'), trigger: 'blur' }]
  }

  // 左侧科技数据
  const dataItems = [
    { value: '2,847', label: '接入设备' },
    { value: '156', label: '监测站点' },
    { value: '99.8%', label: '系统可用率' },
    { value: '4', label: '管辖公司' }
  ]

  // 粒子样式
  function particleStyle(i: number) {
    const size = 2 + (i % 4)
    const left = (i * 17 + 3) % 97
    const delay = (i * 0.37) % 8
    const duration = 6 + (i % 6)
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }
  }

  const handleSubmit = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
    } catch {
      return
    }

    loading.value = true
    try {
      const { code, data, message } = await fetchLogin({
        userName: formData.username,
        password: formData.password
      })

      if (code === 200) {
        const { token, refreshToken, user } = data
        if (!token) {
          throw new Error('Login failed - no token received')
        }
        if (!user) {
          throw new Error('Login failed - no user info received')
        }

        userStore.setToken(token, refreshToken)
        userStore.setUserInfo(user)
        userStore.setLoginStatus(true)

        showLoginSuccessNotice()
        router.push('/')
      } else {
        throw new Error(message || 'Login failed')
      }
    } catch (error) {
      if (error instanceof HttpError) {
        console.error('[Login] Login failed:', error)
      } else {
        console.error('[Login] Unexpected error:', error)
      }
    } finally {
      loading.value = false
    }
  }

  const showLoginSuccessNotice = () => {
    setTimeout(() => {
      ElNotification({
        title: t('login.success.title'),
        type: 'success',
        duration: 2500,
        zIndex: 10000,
        message: `${t('login.success.message')}, ${systemName}!`
      })
    }, 150)
  }
</script>

<style lang="scss" scoped>
  @use './index';
</style>
