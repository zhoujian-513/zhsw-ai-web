<template>
  <div class="page-container">
    <ElCard shadow="never" class="chat-card">
      <template #header><span>AI智能对话</span></template>
      <div class="chat-container">
        <div class="chat-messages">
          <div class="message assistant">
            <div class="avatar"><i class="iconfont-sys" v-html="'&#xe635;'"></i></div>
            <div class="bubble">您好！我是智慧水务AI助手，可以帮您分析水务运营数据、解答专业问题、生成报告等。请问有什么可以帮助您的？</div>
          </div>
          <div class="message user">
            <div class="bubble">最近供水漏损率偏高，有什么建议？</div>
            <div class="avatar">用</div>
          </div>
          <div class="message assistant">
            <div class="avatar"><i class="iconfont-sys" v-html="'&#xe635;'"></i></div>
            <div class="bubble">根据您的管网数据分析，城西供水区漏损率达9.98%，高于行业平均水平。建议：①对城西区管网进行夜间最小流量分析，定位漏损区段；②排查老旧管道，优先改造使用年限超15年的管段；③加密DMA分区计量，提高漏损定位精度。</div>
          </div>
        </div>
        <div class="chat-input">
          <ElInput v-model="inputText" placeholder="请输入问题，如：分析本月供水异常原因..." />
          <ElButton type="primary">发送</ElButton>
        </div>
      </div>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'AiAssistantChat' })
const inputText = ref('')
</script>
<style scoped lang="scss">
.chat-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;

  .message {
    display: flex;
    gap: 12px;
    align-items: flex-start;

    &.user {
      flex-direction: row-reverse;
      .bubble {
        background: var(--el-color-primary-light-8);
        border-radius: 12px 4px 12px 12px;
      }
    }

    &.assistant .bubble {
      background: #f5f7fa;
      border-radius: 4px 12px 12px 12px;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--el-color-primary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      flex-shrink: 0;
      .iconfont-sys { font-size: 18px; }
    }

    .bubble {
      max-width: 70%;
      padding: 10px 14px;
      font-size: 14px;
      line-height: 1.6;
      color: #303133;
    }
  }
}
.chat-input {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}
</style>
