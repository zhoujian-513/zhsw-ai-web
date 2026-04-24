# Web 组件构建规则 (Web Artifacts Builder)

> 来源: Anthropic Skills - web-artifacts-builder
> 用途: 创建复杂的 React/Vue 组件和页面

## 触发条件

当用户需要以下帮助时激活:
- 创建交互式 React 组件
- 构建数据可视化页面
- 开发原型或演示页面
- 创建复杂的 UI 组件
- 构建单页应用 (SPA)

## 技术栈

### 核心栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui
- **图标**: Lucide React

### 可选扩展
- 动画: Framer Motion
- 图表: Recharts / D3
- 状态管理: Zustand / Jotai
- 表单: React Hook Form

## 工作流程

### 步骤 1: 项目初始化

```bash
# 使用提供的脚本初始化
./init-artifact.sh <project-name>
```

**项目结构**:
```
my-artifact/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### 步骤 2: 开发组件

**开发原则**:
1. **组件化** - 每个组件单一职责
2. **类型安全** - 使用 TypeScript 严格模式
3. **可访问性** - 遵循 ARIA 规范
4. **响应式** - 适配各种屏幕尺寸

**组件模板**:
```tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  className?: string;
  // 其他 props
}

export function MyComponent({ className }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* 组件内容 */}
    </div>
  );
}
```

### 步骤 3: 打包输出

```bash
# 打包成单个 HTML 文件
./bundle-artifact.sh
```

**输出**:
- `dist/index.html` - 包含所有资源的单个 HTML 文件
- 可直接在浏览器中打开
- 可上传到 Claude.ai Artifacts

## 设计原则

### 避免 "AI Slop"

**不要这样做**:
- ❌ 所有内容居中
- ❌ 紫色渐变背景
- ❌ 统一的圆角
- ❌ 只使用 Inter 字体
- ❌ 过度使用阴影

**应该这样做**:
- ✅ 考虑内容层次和视觉流动
- ✅ 使用有意义的色彩对比
- ✅ 选择适合内容的字体
- ✅ 创造独特的视觉风格
- ✅ 注重细节和质感

### 设计检查清单

- [ ] 布局是否适合内容？
- [ ] 色彩是否有意义？
- [ ] 字体是否易读且有个性？
- [ ] 间距是否舒适？
- [ ] 交互是否流畅？
- [ ] 是否考虑了边缘情况？

## 示例

### 示例 1: 数据仪表盘

```
用户: "创建一个销售数据仪表盘"

AI: "我来帮你创建一个销售数据仪表盘。

首先确认需求:
1. 需要展示哪些指标？（销售额、订单量、转化率等）
2. 数据来源？（静态数据还是 API）
3. 需要哪些图表类型？（折线图、柱状图、饼图）
4. 目标设备？（桌面、平板、手机）

[确认后开始开发]

我将创建:
- 顶部指标卡片
- 销售趋势折线图
- 产品类别饼图
- 最近订单表格
- 响应式布局"
```

### 示例 2: 交互式表单

```
用户: "创建一个多步骤注册表单"

AI: "我来帮你创建一个多步骤注册表单。

需求确认:
1. 需要哪些步骤？（基本信息、公司信息、偏好设置）
2. 验证规则？（邮箱、密码强度、必填项）
3. 是否需要文件上传？
4. 提交后的行为？

[确认后开始开发]

我将创建:
- 步骤指示器
- 表单验证
- 进度保存
- 动画过渡
- 成功/错误状态"
```

## 最佳实践

### 性能优化
- 使用 React.memo 避免不必要的重渲染
- 图片使用适当的格式和尺寸
- 代码分割和懒加载
- 使用 will-change 优化动画

### 可访问性
- 所有交互元素可键盘访问
- 图片添加 alt 文本
- 颜色对比度符合 WCAG 标准
- 使用语义化 HTML

### 代码质量
- 使用 ESLint 和 Prettier
- 编写单元测试
- 添加 JSDoc 注释
- 遵循组件命名规范

## 常用组件模式

### 布局组件
```tsx
// 卡片布局
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>

// 网格布局
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 内容 */}
</div>
```

### 数据展示
```tsx
// 表格
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>列名</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>数据</TableCell>
    </TableRow>
  </TableBody>
</Table>

// 图表
<Recharts.LineChart data={data}>
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
</Recharts.LineChart>
```

## 相关规则

- `frontend-design` - 前端设计规范
- `theme-factory` - 主题和视觉风格
