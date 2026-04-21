<template>
  <ElDialog
    v-model="dialogVisible"
    title="分享页面链接"
    width="700px"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div class="link-share-content">
      <!-- 当前页面 -->
      <div class="share-section">
        <div class="section-title">当前页面</div>
        <div class="current-page">
          <div class="page-info">
            <span class="page-name">{{ currentPageInfo.name }}</span>
            <span class="page-desc">{{ currentPageInfo.description }}</span>
          </div>
          <div class="link-box">
            <ElInput
              v-model="currentPageLink"
              readonly
              class="link-input"
            >
              <template #append>
                <ElButton @click="copyCurrentLink">
                  <ElIcon><CopyDocument /></ElIcon>
                  复制
                </ElButton>
              </template>
            </ElInput>
          </div>
        </div>
      </div>

      <!-- 二维码分享 -->
      <div class="share-section">
        <div class="section-title">二维码分享</div>
        <div class="qrcode-section">
          <div class="qrcode-image">
            <img :src="qrCodeUrl" alt="二维码" />
          </div>
          <div class="qrcode-tips">
            <p>使用手机扫描二维码访问</p>
            <ElButton type="primary" @click="downloadQRCode">
              <ElIcon><Download /></ElIcon>
              下载二维码
            </ElButton>
          </div>
        </div>
      </div>

      <!-- 其他页面 -->
      <div class="share-section">
        <div class="section-title">其他页面</div>
        <ElInput
          v-model="searchKeyword"
          placeholder="搜索页面..."
          clearable
          class="search-input"
        >
          <template #prefix>
            <ElIcon><Search /></ElIcon>
          </template>
        </ElInput>
        <div class="page-list">
          <div
            v-for="page in filteredPages"
            :key="page.path"
            class="page-item"
            @click="selectPage(page)"
          >
            <div class="page-item-info">
              <span class="page-item-name">{{ page.name }}</span>
              <span class="page-item-desc">{{ page.description }}</span>
            </div>
            <ElButton type="primary" link @click.stop="copyPageLink(page)">
              <ElIcon><CopyDocument /></ElIcon>
            </ElButton>
          </div>
        </div>
      </div>

      <!-- 分享方式 -->
      <div class="share-section">
        <div class="section-title">分享方式</div>
        <div class="share-methods">
          <ElButton @click="shareByEmail">
            <ElIcon><Message /></ElIcon>
            邮件分享
          </ElButton>
          <ElButton @click="openInNewWindow">
            <ElIcon><FullScreen /></ElIcon>
            新窗口打开
          </ElButton>
        </div>
      </div>
    </div>

    <template #footer>
      <ElButton @click="dialogVisible = false">关闭</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  CopyDocument,
  Download,
  Search,
  Message,
  FullScreen
} from '@element-plus/icons-vue'
import {
  generateShareLink,
  generateQRCode,
  copyLinkToClipboard,
  generateEmailShareLink,
  shareablePages,
  getPageInfo,
  searchShareablePages
} from '@/utils/link-share'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const route = useRoute()
const searchKeyword = ref('')

// 当前页面信息
const currentPageInfo = computed(() => {
  return getPageInfo(route.path)
})

// 当前页面链接
const currentPageLink = computed(() => {
  return window.location.href
})

// 二维码URL
const qrCodeUrl = computed(() => {
  return generateQRCode(currentPageLink.value)
})

// 过滤后的页面列表
const filteredPages = computed(() => {
  return searchShareablePages(searchKeyword.value).filter(
    page => page.path !== route.path
  )
})

// 复制当前页面链接
const copyCurrentLink = async () => {
  await copyLinkToClipboard(currentPageLink.value)
}

// 复制指定页面链接
const copyPageLink = async (page: typeof shareablePages[0]) => {
  const link = generateShareLink(page.path)
  await copyLinkToClipboard(link)
}

// 选择页面
const selectPage = (page: typeof shareablePages[0]) => {
  const link = generateShareLink(page.path)
  copyLinkToClipboard(link)
}

// 下载二维码
const downloadQRCode = () => {
  const link = document.createElement('a')
  link.href = qrCodeUrl.value
  link.download = `qrcode-${currentPageInfo.value.name}.png`
  link.click()
  ElMessage.success('二维码下载成功')
}

// 邮件分享
const shareByEmail = () => {
  const emailLink = generateEmailShareLink(
    currentPageLink.value,
    currentPageInfo.value.name,
    currentPageInfo.value.description
  )
  window.open(emailLink)
}

// 新窗口打开
const openInNewWindow = () => {
  window.open(currentPageLink.value, '_blank')
}
</script>

<style scoped lang="scss">
.link-share-content {
  max-height: 500px;
  overflow-y: auto;
}

.share-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 3px solid #409eff;
}

.current-page {
  .page-info {
    margin-bottom: 12px;

    .page-name {
      font-size: 16px;
      font-weight: bold;
      color: #303133;
      margin-right: 12px;
    }

    .page-desc {
      font-size: 13px;
      color: #909399;
    }
  }

  .link-box {
    .link-input {
      :deep(.el-input__wrapper) {
        background-color: #f5f7fa;
      }
    }
  }
}

.qrcode-section {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;

  .qrcode-image {
    width: 150px;
    height: 150px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .qrcode-tips {
    flex: 1;

    p {
      color: #606266;
      margin-bottom: 16px;
    }
  }
}

.search-input {
  margin-bottom: 12px;
}

.page-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;

  .page-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f7fa;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #ebeef5;
    }

    .page-item-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .page-item-name {
        font-size: 14px;
        color: #303133;
      }

      .page-item-desc {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}

.share-methods {
  display: flex;
  gap: 12px;
}
</style>
