import type { AppRouteRecord } from '@/types/router'

export const safetyRoutes: AppRouteRecord = {
  path: '/safety',
  name: 'Safety',
  component: () => import('@/views/index/index.vue'),
  meta: {
    title: 'menus.safety.title',
    icon: '&#xe628;',
    isFirstLevel: true
  },
  children: [
    {
      path: 'confined-space',
      name: 'SafetyConfinedSpace',
      component: () => import('@/views/safety/confined-space/index.vue'),
      meta: { title: 'menus.safety.confinedSpace', keepAlive: true }
    },
    {
      path: 'special-equipment',
      name: 'SafetySpecialEquipment',
      component: () => import('@/views/safety/special-equipment/index.vue'),
      meta: { title: 'menus.safety.specialEquipment', keepAlive: true }
    },
    {
      path: 'hazard',
      name: 'SafetyHazard',
      component: () => import('@/views/safety/hazard/index.vue'),
      meta: { title: 'menus.safety.hazard', keepAlive: true }
    },
    {
      path: 'inspection',
      name: 'SafetyInspection',
      component: () => import('@/views/safety/inspection/index.vue'),
      meta: { title: 'menus.safety.inspection', keepAlive: true }
    },
    {
      path: 'emergency',
      name: 'SafetyEmergency',
      component: () => import('@/views/safety/emergency/index.vue'),
      meta: { title: 'menus.safety.emergency', keepAlive: true }
    },
    {
      path: 'accident',
      name: 'SafetyAccident',
      component: () => import('@/views/safety/accident/index.vue'),
      meta: { title: 'menus.safety.accident', keepAlive: true }
    },
    {
      path: 'emergency-repair',
      name: 'SafetyEmergencyRepair',
      component: () => import('@/views/safety/emergency-repair/index.vue'),
      meta: { title: 'menus.safety.emergencyRepair', keepAlive: true }
    }
  ]
}
