# Trae 项目规则配置

> 基于 Anthropic Skills 和 Geek Skills 转换的 Trae 兼容规则

## 规则说明

此目录包含从 Skills 转换而来的项目规则，用于指导 AI 助手在 Trae IDE 中执行特定任务。

## 使用方法

在对话中引用规则名称或描述，AI 助手将按照规则执行。

## 可用规则

### 📋 文档与协作

#### 1. 文档协作 (doc-coauthoring)
**触发条件**: 需要协作编写、审查或改进文档时

**工作流程**:
1. **上下文收集** - 询问文档目的、受众、长度、风格
2. **细化与结构** - 逐节构建：头脑风暴 → 筛选 → 起草 → 迭代
3. **读者测试** - 验证文档清晰度和可理解性

**适用场景**:
- 技术规范文档
- 决策文档 / RFC
- 项目提案
- README 和教程

---

### 🎨 设计与前端

#### 2. 前端设计 (frontend-design)
**触发条件**: 前端 UI/UX 设计任务

**核心原则**:
- 反陈词滥调规则
- 设计系统声明
- OKLCH 色彩理论
- 精选字体和颜色搭配

---

#### 3. 主题工厂 (theme-factory)
**触发条件**: 需要创建或应用视觉主题时

**可用主题**:
- tech-innovation - 科技创新
- sunset-boulevard - 日落大道
- ocean-depths - 深海
- modern-minimalist - 现代极简
- midnight-galaxy - 午夜银河
- golden-hour - 黄金时刻
- forest-canopy - 森林冠层
- desert-rose - 沙漠玫瑰
- botanical-garden - 植物园
- arctic-frost - 北极霜

---

#### 4. Web 组件构建 (web-artifacts-builder)
**触发条件**: 需要创建复杂的 React/Vue 组件或页面时

**技术栈**:
- React 18 + TypeScript
- Vite + Tailwind CSS
- shadcn/ui 组件库

**工作流程**:
1. 初始化项目
2. 开发组件
3. 打包成单个 HTML

**设计原则**:
- 避免 "AI slop"
- 追求独特、有创意的设计

---

### 💼 产品与架构

#### 5. 产品经理 (product-manager)
**触发条件**: PRD创作、产品咨询、留存分析、竞品研究

**工作模式**:
- **文档评审** - 三级优先级评审（🔴🟡🟢）
- **PRD创作** - 五步流程（拆解→研究→撰写→打磨→自检）
- **产品咨询** - 诊断→分析→策略→排序

**适用场景**:
- 创作/评审 PRD/MRD/BRD
- 诊断留存/转化/增长问题
- 竞品分析和市场研究
- 功能优先级排序

---

#### 6. 解决方案架构师 (solution-architect)
**触发条件**: 架构设计、技术选型、架构评审、性能优化

**核心能力**:
- 架构设计 - 从需求到架构的完整流程
- 技术选型 - 多维度评估决策
- 架构评审 - 全面质量评估
- 架构优化 - 性能、可扩展性、可靠性

**2025年趋势**:
- AI优化架构
- 事件驱动
- 微服务演进
- 零信任安全
- 边缘计算

---

### 🛠️ 开发工具

#### 7. Skill 创建 (skill-creator)
**触发条件**: 需要创建新的 Skill 时

**工具链**:
- 快速验证
- 打包
- 评估
- 报告生成

---

## 规则格式

每个规则文件包含:
- **名称**: 规则的标识
- **描述**: 何时使用该规则
- **触发条件**: 自动或手动触发条件
- **工作流程**: 具体的执行步骤
- **示例**: 使用示例

---

## 如何添加新规则

1. 在 `.trae/rules/` 目录下创建 `.md` 文件
2. 遵循以下格式:

```markdown
# 规则名称

**触发条件**: 何时使用此规则

**工作流程**:
1. 步骤一
2. 步骤二
3. 步骤三

**示例**:
- 示例 1
- 示例 2
```

3. 在 `project_rules.md` 中注册新规则

---

## 规则来源

| 规则 | 来源 |
|------|------|
| doc-coauthoring | Anthropic Skills |
| frontend-design | Anthropic Skills |
| theme-factory | Anthropic Skills |
| web-artifacts-builder | Anthropic Skills |
| product-manager | Geek Skills |
| solution-architect | Geek Skills |

---

## 更多 Skills

已下载的 Skills 仓库:
- `d:\AI学习资料\测试学习用\skills\` - Anthropic 官方 Skills
- `d:\AI学习资料\测试学习用\ClaudeSkills\` - Geek Skills 中文社区

包含的 Skills:
- 深度研究 (deep-research)
- AI 销售冠军 (ai-sales-champion)
- 解决方案架构师 (solution-architect)
- 产品经理 (product-manager)
- 微信公众号文章写作 (wechat-article-writer)
- PPT 设计师 (ppt-designer)
- 安全审计 (security-audit)
- 高考专家 (gaokao-expert)
- 大学备考 (university-exam-prep)
- 等等...

需要添加更多规则时，告诉我！
