<template>
  <div class="workbench-page">
    <!-- 欢迎区 -->
    <section class="welcome-section">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1>{{ greeting }}，{{ userName }}</h1>
          <p class="welcome-subtitle">今天是 {{ currentDate }}，{{ workStatus }}</p>
        </div>
        <div class="welcome-stats">
          <div class="stat-badge">
            <i class="iconfont-sys">&#xe6b5;</i>
            <span class="badge-value">{{ pendingTasks }}</span>
            <span class="badge-label">待处理</span>
          </div>
          <div class="stat-badge warning" v-if="urgentTasks > 0">
            <i class="iconfont-sys">&#xe6b6;</i>
            <span class="badge-value">{{ urgentTasks }}</span>
            <span class="badge-label">紧急</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 快捷入口 -->
    <section class="quick-access">
      <h2 class="section-title">快捷入口</h2>
      <div class="access-grid">
        <button
          v-for="item in quickAccessItems"
          :key="item.name"
          class="access-card"
          @click="navigateTo(item.path)"
        >
          <div class="access-icon" :style="{ background: item.color + '15', color: item.color }">
            <i class="iconfont-sys" v-html="item.icon"></i>
          </div>
          <span class="access-name">{{ item.name }}</span>
          <span class="access-desc">{{ item.desc }}</span>
        </button>
      </div>
    </section>

    <!-- 主内容区 -->
    <div class="main-grid">
      <!-- 左侧：待办事项 -->
      <section class="content-section todo-section">
        <div class="section-header">
          <h2 class="section-title">待办事项</h2>
          <ElTabs v-model="todoTab" class="section-tabs">
            <ElTabPane label="全部" name="all"></ElTabPane>
            <ElTabPane label="紧急" name="urgent"></ElTabPane>
            <ElTabPane label="待审批" name="pending"></ElTabPane>
          </ElTabs>
        </div>
        <div class="todo-list">
          <div
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="todo-item"
            :class="[`priority-${todo.priority}`]"
          >
            <div class="todo-checkbox">
              <ElCheckbox v-model="todo.completed" @change="handleTodoComplete(todo)"></ElCheckbox>
            </div>
            <div class="todo-content">
              <div class="todo-title" :class="{ completed: todo.completed }">{{ todo.title }}</div>
              <div class="todo-meta">
                <ElTag :type="getPriorityType(todo.priority)" size="small">
                  {{ getPriorityLabel(todo.priority) }}
                </ElTag>
                <span class="todo-time">
                  <i class="iconfont-sys">&#xe7b0;</i>
                  {{ todo.deadline }}
                </span>
                <span class="todo-source">{{ todo.source }}</span>
              </div>
            </div>
            <div class="todo-action">
              <ElButton type="primary" link size="small" @click="handleTodoAction(todo)">
                处理
              </ElButton>
            </div>
          </div>
        </div>
        <div class="section-footer">
          <ElButton type="primary" link>
            查看全部待办
            <i class="iconfont-sys">&#xe7a8;</i>
          </ElButton>
        </div>
      </section>

      <!-- 右侧：通知和动态 -->
      <aside class="sidebar">
        <!-- 系统通知 -->
        <section class="content-section notice-section">
          <div class="section-header">
            <h2 class="section-title">
              系统通知
              <span v-if="unreadCount > 0" class="notice-badge">{{ unreadCount }}</span>
            </h2>
            <ElButton type="primary" link size="small" @click="markAllRead">
              全部已读
            </ElButton>
          </div>
          <div class="notice-list">
            <div
              v-for="notice in notices"
              :key="notice.id"
              class="notice-item"
              :class="{ unread: !notice.read }"
              @click="readNotice(notice)"
            >
              <div class="notice-icon" :class="notice.type">
                <i class="iconfont-sys" v-html="getNoticeIcon(notice.type)"></i>
              </div>
              <div class="notice-content">
                <div class="notice-title">{{ notice.title }}</div>
                <div class="notice-desc">{{ notice.content }}</div>
                <div class="notice-time">{{ notice.time }}</div>
              </div>
              <div v-if="!notice.read" class="notice-dot"></div>
            </div>
          </div>
        </section>

        <!-- 最近动态 -->
        <section class="content-section activity-section">
          <div class="section-header">
            <h2 class="section-title">最近动态</h2>
          </div>
          <div class="activity-list">
            <div v-for="activity in activities" :key="activity.id" class="activity-item">
              <div class="activity-avatar">
                {{ activity.user.charAt(0) }}
              </div>
              <div class="activity-content">
                <div class="activity-text">
                  <span class="activity-user">{{ activity.user }}</span>
                  {{ activity.action }}
                  <span class="activity-target">{{ activity.target }}</span>
                </div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 数据概览 -->
        <section class="content-section overview-section">
          <div class="section-header">
            <h2 class="section-title">今日概览</h2>
          </div>
          <div class="overview-grid">
            <div class="overview-item">
              <div class="overview-value">{{ todayStats.deviceOnline }}</div>
              <div class="overview-label">设备在线</div>
              <div class="overview-trend up">+2.3%</div>
            </div>
            <div class="overview-item">
              <div class="overview-value">{{ todayStats.alarmCount }}</div>
              <div class="overview-label">今日告警</div>
              <div class="overview-trend down">-12%</div>
            </div>
            <div class="overview-item">
              <div class="overview-value">{{ todayStats.workOrder }}</div>
              <div class="overview-label">工单处理</div>
              <div class="overview-trend up">+5</div>
            </div>
            <div class="overview-item">
              <div class="overview-value">{{ todayStats.inspection }}</div>
              <div class="overview-label">巡检完成</div>
              <div class="overview-trend up">100%</div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'

defineOptions({ name: 'WorkbenchPage' })

const router = useRouter()
const userStore = useUserStore()

// 用户信息
const userName = computed(() => userStore.getUserInfo?.userName || '管理员')

// 问候语
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 6) return '晚上好'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  return '晚上好'
})

// 当前日期
const currentDate = ref('')
const updateDate = () => {
  const now = new Date()
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  currentDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`
}
updateDate()

// 工作状态
const workStatus = computed(() => {
  const hour = new Date().getHours()
  if (hour < 9) return '新的一天即将开始'
  if (hour < 12) return '工作进行中，保持专注'
  if (hour < 14) return '午休时间，适当休息'
  if (hour < 18) return '下午继续加油'
  return '今天的工作即将结束'
})

// 快捷入口
const quickAccessItems = [
  { name: '设备监控', desc: '实时查看设备状态', icon: '&#xe6a0;', color: '#0ea5e9', path: '/monitor/data' },
  { name: '告警中心', desc: '处理异常告警', icon: '&#xe6b5;', color: '#ef4444', path: '/monitor/alarm' },
  { name: '工单管理', desc: '查看和处理工单', icon: '&#xe7b4;', color: '#f59e0b', path: '/operation/workorder' },
  { name: '巡检记录', desc: '巡检任务管理', icon: '&#xe7a8;', color: '#10b981', path: '/pipeline/patrol' },
  { name: '数据报表', desc: '查看统计报表', icon: '&#xe7b3;', color: '#8b5cf6', path: '/device/analysis' },
  { name: '系统设置', desc: '配置系统参数', icon: '&#xe6b8;', color: '#6b7280', path: '/permission/menu' },
]

const navigateTo = (path: string) => {
  router.push(path)
}

// 待办事项
const todoTab = ref('all')
const todos = ref([
  { id: 1, title: '广州水务压力传感器异常告警待处理', priority: 'urgent', deadline: '2小时后', source: '告警中心', completed: false },
  { id: 2, title: '深圳水务月度巡检报告待审批', priority: 'high', deadline: '今天 18:00', source: '巡检系统', completed: false },
  { id: 3, title: '东莞水务设备维护工单待分配', priority: 'normal', deadline: '明天 10:00', source: '工单系统', completed: false },
  { id: 4, title: '佛山水务水质检测报告审核', priority: 'high', deadline: '明天 14:00', source: '监测系统', completed: false },
  { id: 5, title: '集团月度运营数据汇总', priority: 'normal', deadline: '周五 17:00', source: '报表系统', completed: false },
])

const filteredTodos = computed(() => {
  if (todoTab.value === 'all') return todos.value.filter(t => !t.completed)
  if (todoTab.value === 'urgent') return todos.value.filter(t => t.priority === 'urgent' && !t.completed)
  if (todoTab.value === 'pending') return todos.value.filter(t => t.priority === 'high' && !t.completed)
  return todos.value
})

const pendingTasks = computed(() => todos.value.filter(t => !t.completed).length)
const urgentTasks = computed(() => todos.value.filter(t => t.priority === 'urgent' && !t.completed).length)

const getPriorityType = (priority: string): 'danger' | 'warning' | 'info' | 'success' => {
  const map: Record<string, 'danger' | 'warning' | 'info' | 'success'> = { urgent: 'danger', high: 'warning', normal: 'info' }
  return map[priority] || 'info'
}

const getPriorityLabel = (priority: string) => {
  const map: Record<string, string> = { urgent: '紧急', high: '高', normal: '普通' }
  return map[priority] || '普通'
}

const handleTodoComplete = (todo: any) => {
  // 处理完成逻辑
  console.log('完成待办:', todo.title)
}

const handleTodoAction = (todo: any) => {
  // 处理待办逻辑
  console.log('处理待办:', todo.title)
}

// 通知
const notices = ref([
  { id: 1, type: 'alarm', title: '设备告警', content: '广州水务泵站压力超过阈值', time: '10分钟前', read: false },
  { id: 2, type: 'system', title: '系统通知', content: '系统将于今晚22:00进行维护', time: '30分钟前', read: false },
  { id: 3, type: 'task', title: '任务提醒', content: '您有一个待审批的巡检报告', time: '1小时前', read: true },
  { id: 4, type: 'message', title: '消息通知', content: '深圳水务管理员发来协作邀请', time: '2小时前', read: true },
])

const unreadCount = computed(() => notices.value.filter(n => !n.read).length)

const getNoticeIcon = (type: string) => {
  const map: Record<string, string> = {
    alarm: '&#xe6b5;',
    system: '&#xe6b8;',
    task: '&#xe7b4;',
    message: '&#xe60e;'
  }
  return map[type] || '&#xe60e;'
}

const readNotice = (notice: any) => {
  notice.read = true
}

const markAllRead = () => {
  notices.value.forEach(n => n.read = true)
}

// 最近动态
const activities = ref([
  { id: 1, user: '张三', action: '处理了', target: '广州水务设备告警', time: '5分钟前' },
  { id: 2, user: '李四', action: '提交了', target: '深圳水务巡检报告', time: '15分钟前' },
  { id: 3, user: '王五', action: '审批了', target: '东莞水务维护申请', time: '30分钟前' },
  { id: 4, user: '赵六', action: '创建了', target: '佛山水质检测任务', time: '1小时前' },
])

// 今日概览
const todayStats = ref({
  deviceOnline: '98.5%',
  alarmCount: 3,
  workOrder: 12,
  inspection: '8/8'
})
</script>

<style scoped lang="scss">
// 设计令牌
:root {
  --w-primary-50: #f0f9ff;
  --w-primary-100: #e0f2fe;
  --w-primary-500: #0ea5e9;
  --w-primary-600: #0284c7;
  --w-primary-700: #0369a1;

  --w-gray-50: #f9fafb;
  --w-gray-100: #f3f4f6;
  --w-gray-200: #e5e7eb;
  --w-gray-300: #d1d5db;
  --w-gray-400: #9ca3af;
  --w-gray-500: #6b7280;
  --w-gray-600: #4b5563;
  --w-gray-700: #374151;
  --w-gray-800: #1f2937;
  --w-gray-900: #111827;

  --w-success: #10b981;
  --w-warning: #f59e0b;
  --w-danger: #ef4444;

  --w-radius-sm: 6px;
  --w-radius-md: 8px;
  --w-radius-lg: 12px;
  --w-radius-xl: 16px;

  --w-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --w-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
  --w-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

.workbench-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

// 欢迎区
.welcome-section {
  margin-bottom: 24px;

  .welcome-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, var(--w-primary-600) 0%, var(--w-primary-500) 100%);
    border-radius: var(--w-radius-lg);
    padding: 24px 32px;
    color: white;
  }

  .welcome-text {
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px;
    }

    .welcome-subtitle {
      font-size: 14px;
      opacity: 0.9;
      margin: 0;
    }
  }

  .welcome-stats {
    display: flex;
    gap: 16px;
  }

  .stat-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.15);
    padding: 10px 16px;
    border-radius: var(--w-radius-md);
    backdrop-filter: blur(10px);

    i {
      font-size: 18px;
    }

    .badge-value {
      font-size: 20px;
      font-weight: 700;
    }

    .badge-label {
      font-size: 12px;
      opacity: 0.8;
    }

    &.warning {
      background: rgba(239, 68, 68, 0.3);
    }
  }
}

// 快捷入口
.quick-access {
  margin-bottom: 24px;

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--w-gray-800);
    margin: 0 0 16px;
  }

  .access-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }

  .access-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 16px;
    background: white;
    border: 1px solid var(--w-gray-200);
    border-radius: var(--w-radius-lg);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--w-primary-500);
      box-shadow: var(--w-shadow-md);
      transform: translateY(-2px);
    }

    .access-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--w-radius-md);
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 24px;
      }
    }

    .access-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--w-gray-800);
    }

    .access-desc {
      font-size: 12px;
      color: var(--w-gray-400);
    }
  }
}

// 主内容区
.main-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
}

// 内容区块
.content-section {
  background: white;
  border-radius: var(--w-radius-lg);
  padding: 20px;
  box-shadow: var(--w-shadow-sm);
  border: 1px solid var(--w-gray-100);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--w-gray-800);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .notice-badge {
      background: var(--w-danger);
      color: white;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
      font-weight: 500;
    }
  }

  .section-tabs {
    :deep(.el-tabs__header) {
      margin: 0;
    }

    :deep(.el-tabs__nav-wrap::after) {
      display: none;
    }

    :deep(.el-tabs__item) {
      font-size: 13px;
      padding: 0 12px;
    }
  }
}

.section-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--w-gray-100);
  text-align: center;
}

// 待办事项
.todo-section {
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .todo-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border-radius: var(--w-radius-md);
    background: var(--w-gray-50);
    border-left: 3px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      background: white;
      box-shadow: var(--w-shadow-sm);
    }

    &.priority-urgent { border-left-color: var(--w-danger); }
    &.priority-high { border-left-color: var(--w-warning); }
    &.priority-normal { border-left-color: var(--w-primary-500); }
  }

  .todo-checkbox {
    padding-top: 2px;
  }

  .todo-content {
    flex: 1;
    min-width: 0;
  }

  .todo-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--w-gray-800);
    margin-bottom: 8px;
    line-height: 1.5;

    &.completed {
      text-decoration: line-through;
      color: var(--w-gray-400);
    }
  }

  .todo-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .todo-time {
      font-size: 12px;
      color: var(--w-gray-500);
      display: flex;
      align-items: center;
      gap: 4px;

      i {
        font-size: 12px;
      }
    }

    .todo-source {
      font-size: 12px;
      color: var(--w-gray-400);
    }
  }

  .todo-action {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .todo-item:hover .todo-action {
    opacity: 1;
  }
}

// 侧边栏
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 通知
.notice-section {
  .notice-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .notice-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    border-radius: var(--w-radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background: var(--w-gray-50);
    }

    &.unread {
      background: var(--w-primary-50);

      &:hover {
        background: var(--w-primary-100);
      }
    }
  }

  .notice-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--w-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 16px;
    }

    &.alarm { background: rgba(239, 68, 68, 0.1); color: var(--w-danger); }
    &.system { background: rgba(14, 165, 233, 0.1); color: var(--w-primary-500); }
    &.task { background: rgba(245, 158, 11, 0.1); color: var(--w-warning); }
    &.message { background: rgba(16, 185, 129, 0.1); color: var(--w-success); }
  }

  .notice-content {
    flex: 1;
    min-width: 0;
  }

  .notice-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--w-gray-800);
    margin-bottom: 4px;
  }

  .notice-desc {
    font-size: 12px;
    color: var(--w-gray-500);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notice-time {
    font-size: 11px;
    color: var(--w-gray-400);
  }

  .notice-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--w-danger);
    flex-shrink: 0;
    margin-top: 4px;
  }
}

// 动态
.activity-section {
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .activity-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .activity-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--w-primary-500);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    flex-shrink: 0;
  }

  .activity-content {
    flex: 1;
  }

  .activity-text {
    font-size: 13px;
    color: var(--w-gray-700);
    line-height: 1.5;
    margin-bottom: 4px;

    .activity-user {
      font-weight: 500;
      color: var(--w-gray-900);
    }

    .activity-target {
      color: var(--w-primary-600);
    }
  }

  .activity-time {
    font-size: 11px;
    color: var(--w-gray-400);
  }
}

// 概览
.overview-section {
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .overview-item {
    text-align: center;
    padding: 16px;
    border-radius: var(--w-radius-md);
    background: var(--w-gray-50);

    .overview-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--w-gray-900);
      margin-bottom: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .overview-label {
      font-size: 12px;
      color: var(--w-gray-500);
      margin-bottom: 4px;
    }

    .overview-trend {
      font-size: 11px;
      font-weight: 500;

      &.up { color: var(--w-success); }
      &.down { color: var(--w-danger); }
    }
  }
}

// 响应式
@media (max-width: 1280px) {
  .quick-access .access-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .main-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .workbench-page {
    padding: 16px;
  }

  .welcome-section .welcome-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .quick-access .access-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sidebar {
    grid-template-columns: 1fr;
  }
}
</style>
