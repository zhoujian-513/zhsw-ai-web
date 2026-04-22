import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { ref, nextTick } from 'vue'
import NProgress from 'nprogress'
import { useSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
import { useMenuStore } from '@/store/modules/menu'
import { setWorktab } from '@/utils/navigation'
import { setPageTitle } from '../utils/utils'
import { registerDynamicRoutes } from '../utils/registerRoutes'
import { AppRouteRecord } from '@/types/router'
import { RoutesAlias } from '../routesAlias'
import { menuDataToRouter } from '../utils/menuToRouter'
import { asyncRoutes } from '../routes/asyncRoutes'
import { staticRoutes } from '../routes/staticRoutes'
import { loadingService } from '@/utils/ui'
import { useCommon } from '@/composables/useCommon'
import { useWorktabStore } from '@/store/modules/worktab'
import { fetchGetUserInfo } from '@/api/auth'
import { ApiStatus } from '@/utils/http/status'
import { HttpError, isHttpError } from '@/utils/http/error'

// 是否已注册动态路由
const isRouteRegistered = ref(false)

// 跟踪是否需要关闭 loading
const pendingLoading = ref(false)

/**
 * 从已注册的路由中构建菜单树
 * 用于 Mock 模式，从 router.getRoutes() 获取完整路径的路由
 */
function buildMenuTreeFromRoutes(router: Router): AppRouteRecord[] {
  const allRoutes = router.getRoutes()

  // 静态路由名称列表（不应出现在菜单中的路由）
  const staticRouteNames = ['Login', 'Exception403', 'Exception404', 'Exception500']

  // 过滤出顶层菜单路由（排除静态路由和根路径）
  const topLevelRoutes = allRoutes.filter(route => {
    // 排除静态路由
    if (route.name && staticRouteNames.includes(route.name as string)) {
      return false
    }
    // 排除根路径
    if (route.path === '/') {
      return false
    }
    // 只保留顶层路由（路径以 / 开头且没有父路由，或者是直接子路由）
    const pathSegments = route.path.split('/').filter(Boolean)
    return pathSegments.length === 1
  })

  // 构建路由树结构
  const menuTree: AppRouteRecord[] = []

  for (const route of topLevelRoutes) {
    const menuItem = buildMenuItemFromRoute(route, allRoutes)
    if (menuItem) {
      menuTree.push(menuItem)
    }
  }

  return menuTree
}

/**
 * 从路由记录构建菜单项
 */
function buildMenuItemFromRoute(route: any, allRoutes: any[]): AppRouteRecord | null {
  // 构建基本菜单项
  const menuItem: AppRouteRecord = {
    path: route.path,
    name: route.name,
    component: route.components?.default,
    meta: route.meta || {}
  }

  // 查找子路由
  const children = allRoutes.filter(r => {
    // 子路由的路径应该以父路径开头，且比父路径多一层
    if (!r.path.startsWith(route.path + '/')) {
      return false
    }
    const relativePath = r.path.substring(route.path.length + 1)
    // 只取直接子路由（不包含更深层的路由）
    return !relativePath.includes('/')
  })

  if (children.length > 0) {
    menuItem.children = children
      .map(child => buildMenuItemFromRoute(child, allRoutes))
      .filter(Boolean) as AppRouteRecord[]
  }

  return menuItem
}

/**
 * 设置路由全局前置守卫
 */
export function setupBeforeEachGuard(router: Router): void {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      try {
        await handleRouteGuard(to, from, next, router)
      } catch (error) {
        console.error('路由守卫处理失败:', error)
        // 401 错误已由 HTTP 拦截器处理（跳转登录），取消当前导航即可
        if (isUnauthorizedError(error)) {
          next(false)
          return
        }
        // 其他错误跳转 500 页面
        next({ name: 'Exception500' })
      }
    }
  )

  // 设置后置守卫以关闭 loading 和进度条
  setupAfterEachGuard(router)
}

/**
 * 设置路由全局后置守卫
 */
function setupAfterEachGuard(router: Router): void {
  router.afterEach(() => {
    // 关闭进度条
    const settingStore = useSettingStore()
    if (settingStore.showNprogress) {
      NProgress.done()
    }

    // 关闭 loading 效果
    if (pendingLoading.value) {
      nextTick(() => {
        loadingService.hideLoading()
        pendingLoading.value = false
      })
    }
  })
}

/**
 * 处理路由守卫逻辑
 */
async function handleRouteGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router
): Promise<void> {
  const settingStore = useSettingStore()
  const userStore = useUserStore()

  // 处理进度条
  if (settingStore.showNprogress) {
    NProgress.start()
  }

  // 处理登录状态
  if (!(await handleLoginStatus(to, userStore, next))) {
    return
  }

  // Mock 模式：禁用动态路由注册，使用静态路由
  // 所有路由已在 asyncRoutes 中静态配置，无需动态加载
  const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
  if (USE_MOCK && !isRouteRegistered.value) {
    // 标记路由已注册（跳过动态路由逻辑）
    isRouteRegistered.value = true

    // 设置菜单数据（从已注册的路由构建，确保路径完整）
    const menuStore = useMenuStore()
    const menuTree = buildMenuTreeFromRoutes(router)
    menuStore.setMenuList(menuTree)
  }

  // 处理动态路由注册（Mock 模式下跳过）
  if (!isRouteRegistered.value && userStore.isLogin && !USE_MOCK) {
    await handleDynamicRoutes(to, from, next, router)
    return
  }

  // 处理根路径跳转到首页
  if (userStore.isLogin && isRouteRegistered.value && handleRootPathRedirect(to, next)) {
    return
  }

  // 处理已知的匹配路由
  if (to.matched.length > 0) {
    setWorktab(to)
    setPageTitle(to)
    next()
    return
  }

  // 未匹配到路由，跳转到 404
  next({ name: 'Exception404' })
}

/**
 * 处理登录状态
 */
async function handleLoginStatus(
  to: RouteLocationNormalized,
  userStore: ReturnType<typeof useUserStore>,
  next: NavigationGuardNext
): Promise<boolean> {
  // 检查是否为静态路由（通过路由 name 判断）
  const isStaticRoute = isRouteInStaticRoutes(to.path)

  if (!userStore.isLogin && to.path !== RoutesAlias.Login && !isStaticRoute) {
    userStore.logOut()
    next({ name: 'Login' })
    return false
  }
  return true
}

/**
 * 检查路由是否为静态路由
 */
function isRouteInStaticRoutes(path: string): boolean {
  const checkRoute = (routes: any[], targetPath: string): boolean => {
    return routes.some((route) => {
      // 处理动态路由参数匹配
      const routePath = route.path
      const pattern = routePath.replace(/:[^/]+/g, '[^/]+').replace(/\*/g, '.*')
      const regex = new RegExp(`^${pattern}$`)

      if (regex.test(targetPath)) {
        return true
      }
      if (route.children && route.children.length > 0) {
        return checkRoute(route.children, targetPath)
      }
      return false
    })
  }

  return checkRoute(staticRoutes, path)
}

/**
 * 处理未授权错误
 */
function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof HttpError) {
    return error.code === ApiStatus.unauthorized
  }
  return false
}

/**
 * 处理根路径重定向
 */
function handleRootPathRedirect(to: RouteLocationNormalized, next: NavigationGuardNext): boolean {
  if (to.path === '/') {
    next({ path: useCommon().homePath.value })
    return true
  }
  return false
}

/**
 * 处理动态路由注册
 */
async function handleDynamicRoutes(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router
): Promise<void> {
  const menuStore = useMenuStore()
  const userStore = useUserStore()

  try {
    // 获取用户信息和菜单
    const userInfoRes = await fetchGetUserInfo()

    if (userInfoRes.code !== ApiStatus.success) {
      throw new HttpError(userInfoRes.message || '获取用户信息失败', userInfoRes.code)
    }

    const { menuList, userInfo } = userInfoRes.data

    if (!menuList || menuList.length === 0) {
      throw new HttpError('菜单列表为空', ApiStatus.error)
    }

    // 设置用户信息
    userStore.setUserInfo(userInfo)

    // 转换菜单数据为路由配置
    const asyncRoutesFromMenu = menuList.map((route: AppRouteRecord) => menuDataToRouter(route))

    // 注册动态路由
    registerDynamicRoutes(router, asyncRoutesFromMenu)

    // 设置菜单列表
    menuStore.setMenuList(menuList)

    // 标记路由已注册
    isRouteRegistered.value = true

    // 重新导航到目标路由
    next({ ...to, replace: true })
  } catch (error) {
    console.error('动态路由注册失败:', error)

    // 如果是 HTTP 错误，直接抛出由上层处理
    if (isHttpError(error)) {
      throw error
    }

    // 其他错误，清除登录状态并跳转到登录页
    userStore.logOut()
    next({ name: 'Login' })
  }
}

/**
 * 重置路由状态
 * 用于用户登出时重置路由注册状态
 */
export function resetRouterState(): void {
  isRouteRegistered.value = false
}
