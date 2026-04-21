# 智慧水务平台实现计划

日期：2026-03-30

## 实现顺序（按优先级）

### 阶段一：基础骨架（租户机制 + 路由 + 导航）

**Step 1: 租户 Pinia Store**
- 文件：`src/store/modules/tenant.ts`
- 内容：当前租户ID、租户列表、是否集团视角、切换租户方法
- Mock 租户数据：集团总览、广州水务、深圳水务、东莞水务

**Step 2: 顶栏租户选择器组件**
- 文件：`src/components/TenantSelector/index.vue`
- 样式：下拉选择框，显示在顶部 Header 右侧区域
- 集成到 Header 组件

**Step 3: i18n 翻译键**
- 更新 `src/locales/langs/zh.json` 和 `en.json`
- 添加所有菜单的翻译键

**Step 4: 路由模块文件（9个）**
```
src/router/modules/
  dashboard.ts          # 驾驶舱
  device.ts             # 设备管理
  monitor.ts            # 监测管理
  production.ts         # 生产管理
  safety.ts             # 安全管理
  material.ts           # 物资管理
  operation.ts          # 经营管理
  pipeline.ts           # 管网管理
  ai-assistant.ts       # AI智能助手
```

**Step 5: 注册路由**
- 更新 `src/router/modules/index.ts`

---

### 阶段二：Mock 数据 + API

**Step 6: Mock 文件**
```
src/mock/
  tenant.ts             # 租户列表
  device.ts             # 设备管理
  monitor.ts            # 监测管理
  production.ts         # 生产管理
  safety.ts             # 安全管理
  material.ts           # 物资管理
  operation.ts          # 经营管理
  pipeline.ts           # 管网管理
  ai-assistant.ts       # AI助手
  dashboard.ts          # 驾驶舱
```

**Step 7: API 文件**
```
src/api/
  tenant.ts
  device.ts
  monitor.ts
  production.ts
  safety.ts
  material.ts
  operation.ts
  pipeline.ts
  ai-assistant.ts
  dashboard.ts
```

---

### 阶段三：页面视图（按模块优先级）

页面列表（共 47 个页面）：

```
src/views/
  dashboard/
    group/index.vue          # 集团看板
    compare/index.vue        # 租户对比
  device/
    code-config/index.vue    # 设备编码配置
    ledger/index.vue         # 设备台账
    defect/index.vue         # 设备缺陷
    assessment/index.vue     # 设备评估
    project/
      maintenance/index.vue  # 维护保养
      annual-repair/index.vue# 年度中小修
      overhaul/index.vue     # 大修重置及技改
    regulations/index.vue    # 维护规程管理
    analysis/index.vue       # 设备展示分析
  monitor/
    object-config/index.vue  # 监测对象基础配置
    data-manage/index.vue    # 监测数据管理
    video/index.vue          # 视频监控管理
    alarm/index.vue          # 报警管理
    data-analysis/index.vue  # 数据分析管理
    map/index.vue            # 监测一张图
  production/
    work-order/index.vue     # 运维工单管理
    scene/index.vue          # 运维场景管理
    two-tickets/index.vue    # 两票管理
    duty/index.vue           # 值班管理
    handover/index.vue       # 交接班管理
    process-visual/index.vue # 工艺可视化
  safety/
    hazard/index.vue         # 隐患排查
    inspection/index.vue     # 安全巡检
    emergency/index.vue      # 应急预案
    accident/index.vue       # 事故记录
  material/
    warehouse/index.vue      # 仓库管理
    purchase/index.vue       # 采购申请
    inventory/index.vue      # 库存台账
    inout/index.vue          # 出入库记录
  operation/
    project/index.vue        # 经营项目管理
    report/
      daily/index.vue        # 日报
      weekly/index.vue       # 周报
      monthly/index.vue      # 月报
    plan-analysis/index.vue  # 计划执行分析
    annual-plan/index.vue    # 年度计划管理
  pipeline/
    gis/index.vue            # 管网GIS
    loss/index.vue           # 漏损分析
    patrol/index.vue         # 管网巡检
    archive/index.vue        # 管网档案
  ai-assistant/
    chat/index.vue           # 智能对话
    warning/index.vue        # 预警看板
    report/index.vue         # 数据分析报告
```

---

## 各页面设计规范

### 列表类页面（台账、记录、管理）
- 顶部：搜索筛选条（ElForm inline）
- 中间：数据表格（ElTable）
- 右上角：新增按钮
- 操作列：查看/编辑/删除
- 底部：分页（ElPagination）

### 配置类页面（编码配置、对象配置）
- 树形结构 + 表单
- 参考 organization/department 实现

### 可视化页面（分析、看板、GIS）
- ECharts 图表（折线图、柱状图、饼图）
- 统计卡片（数字滚动）
- 地图类使用现有 china-map 组件

### AI助手页面
- chat：仿 template/chat 页面，增加水务知识问答
- warning：卡片列表 + 图表
- report：富文本展示 + 图表

---

## 租户数据隔离设计

所有 Mock 数据根据 tenantId 过滤：
```typescript
// Mock 拦截器中统一处理
const tenantId = config.headers['X-Tenant-Id'] || 'group'
const data = allData.filter(d =>
  tenantId === 'group' ? true : d.tenantId === tenantId
)
```

集团视角（group）返回所有租户汇聚数据，子公司视角只返回本租户数据。

---

## 实施顺序建议

1. 阶段一（骨架）→ 可以看到完整导航
2. 驾驶舱（集团看板 + 租户对比）→ 验证租户切换
3. 设备管理（7个子页面）
4. 监测管理（6个子页面）
5. 生产管理（6个子页面）
6. 安全管理（4个子页面）
7. 物资管理（4个子页面）
8. 经营管理（6个子页面）
9. 管网管理（4个子页面）
10. AI智能助手（3个子页面）
