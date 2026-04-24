import type { AppRouteRecord } from '@/types/router'

export const aiAssistantRoutes: AppRouteRecord = {
  path: '/ai-assistant',
  name: 'AiAssistant',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.aiAssistant.title',
    icon: '&#xe8d3;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'chat',
      name: 'AiAssistantChat',
      component: () => import('@/views/ai-assistant/chat/index.vue'),
      meta: { title: 'menus.aiAssistant.chat', keepAlive: true }
    },
    {
      path: 'warning',
      name: 'AiAssistantWarning',
      component: () => import('@/views/ai-assistant/warning/index.vue'),
      meta: { title: 'menus.aiAssistant.warning', keepAlive: true }
    },
    {
      path: 'report',
      name: 'AiAssistantReport',
      component: () => import('@/views/ai-assistant/report/index.vue'),
      meta: { title: 'menus.aiAssistant.report', keepAlive: true }
    }
  ]
}
