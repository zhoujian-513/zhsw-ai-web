# 主题工厂规则 (Theme Factory)

> 来源: Anthropic Skills - theme-factory  
> 用途: 创建和应用视觉主题

## 触发条件

当用户需要以下帮助时激活：
- 创建新的视觉主题
- 为项目选择配色方案
- 设计品牌视觉系统
- 改进现有界面的视觉风格

## 可用主题

### 1. 科技创新 (Tech Innovation)
**风格**: 现代、专业、科技感
**用途**: SaaS、开发工具、科技产品

```yaml
primary: "#3b82f6"      # 明亮蓝
secondary: "#8b5cf6"    # 紫罗兰
accent: "#06b6d4"       # 青色
background: "#0f172a"   # 深蓝黑
text: "#f8fafc"         # 近白
font_heading: "Inter"
font_body: "Inter"
```

### 2. 日落大道 (Sunset Boulevard)
**风格**: 温暖、活力、创意
**用途**: 创意机构、生活方式、娱乐

```yaml
primary: "#f97316"      # 橙色
secondary: "#ec4899"    # 粉色
accent: "#fbbf24"       # 琥珀
background: "#fff7ed"   # 暖白
text: "#431407"         # 深棕
font_heading: "Outfit"
font_body: "Outfit"
```

### 3. 深海 (Ocean Depths)
**风格**: 深邃、神秘、宁静
**用途**: 冥想、健康、海洋相关

```yaml
primary: "#0ea5e9"      # 天蓝
secondary: "#6366f1"    # 靛蓝
accent: "#14b8a6"       #  teal
background: "#020617"   # 深海蓝
text: "#e0f2fe"         # 浅蓝白
font_heading: "Space Grotesk"
font_body: "Space Grotesk"
```

### 4. 现代极简 (Modern Minimalist)
**风格**: 简洁、优雅、专业
**用途**: 企业、金融、咨询

```yaml
primary: "#18181b"      # 近黑
secondary: "#71717a"    # 中灰
accent: "#dc2626"       # 红（点缀）
background: "#fafafa"   # 近白
text: "#09090b"         # 黑
font_heading: "Sora"
font_body: "Sora"
```

### 5. 午夜银河 (Midnight Galaxy)
**风格**: 神秘、梦幻、宇宙
**用途**: 游戏、科幻、艺术

```yaml
primary: "#a855f7"      # 紫色
secondary: "#3b82f6"    # 蓝色
accent: "#22d3ee"       # 青色
background: "#0f0a1e"   # 深紫黑
text: "#e9d5ff"         # 浅紫
font_heading: "Plus Jakarta Sans"
font_body: "Plus Jakarta Sans"
```

### 6. 黄金时刻 (Golden Hour)
**风格**: 温暖、奢华、精致
**用途**: 奢侈品、酒店、高端服务

```yaml
primary: "#d97706"      # 琥珀
secondary: "#92400e"    # 棕色
accent: "#fbbf24"       # 金黄
background: "#fffbeb"   # 暖白
text: "#451a03"         # 深棕
font_heading: "Newsreader"
font_body: "Newsreader"
```

### 7. 森林冠层 (Forest Canopy)
**风格**: 自然、清新、有机
**用途**: 环保、健康、户外

```yaml
primary: "#16a34a"      # 绿色
secondary: "#15803d"    # 深绿
accent: "#84cc16"       # 青柠
background: "#f0fdf4"   # 浅绿白
text: "#14532d"         # 深绿
font_heading: "Outfit"
font_body: "Outfit"
```

### 8. 沙漠玫瑰 (Desert Rose)
**风格**: 温暖、大地、手工艺
**用途**: 手工艺、家居、文化

```yaml
primary: "#c2410c"      # 赭石
secondary: "#9a3412"    # 深赭
accent: "#fb923c"       # 橙
background: "#fff7ed"   # 暖白
text: "#431407"         # 深棕
font_heading: "Caveat"
font_body: "Newsreader"
```

### 9. 植物园 (Botanical Garden)
**风格**: 生机、多彩、自然
**用途**: 园艺、食品、生活方式

```yaml
primary: "#059669"      # 翠绿
secondary: "#0891b2"    # 青色
accent: "#f59e0b"       # 琥珀
background: "#f0fdf4"   # 浅绿
text: "#064e3b"         # 深绿
font_heading: "Plus Jakarta Sans"
font_body: "Outfit"
```

### 10. 北极霜 (Arctic Frost)
**风格**: 冷峻、现代、科技
**用途**: 科技、医疗、冬季主题

```yaml
primary: "#0ea5e9"      # 天蓝
secondary: "#64748b"    # 灰蓝
accent: "#38bdf8"       # 浅蓝
background: "#f8fafc"   # 冷白
text: "#0f172a"         # 深蓝黑
font_heading: "Space Grotesk"
font_body: "Space Grotesk"
```

## 主题应用流程

### 1. 分析项目需求
- 项目类型和目标受众
- 品牌调性和情感诉求
- 技术约束（如需要深色模式）

### 2. 选择或定制主题
- 从预设主题中选择最接近的
- 或混合多个主题的元素
- 确保可访问性（对比度）

### 3. 生成设计令牌
```css
:root {
  /* 颜色 */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;
  
  /* 字体 */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* 间距 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

### 4. 创建示例页面
展示主题在实际组件中的应用：
- 按钮和表单
- 卡片和列表
- 导航和页脚

### 5. 文档化
记录主题的使用规范和注意事项。

## 主题定制指南

### 修改主色
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### 修改字体
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-heading: 'Your Font', sans-serif;
  --font-body: 'Your Font', sans-serif;
}
```

## 示例

### 示例 1: 为 SaaS 产品选择主题

```
用户: "我在做一个项目管理 SaaS，应该用什么主题？"

AI: "对于项目管理 SaaS，我推荐以下选择：

**首选: 科技创新 (Tech Innovation)**
- 专业、现代的蓝色调
- 适合 B2B 产品
- 传达信任和效率

**备选: 现代极简 (Modern Minimalist)**
- 简洁、专注的设计
- 减少视觉干扰
- 突出内容本身

**建议定制**:
- 主色保持蓝色系
- 添加绿色表示成功/完成
- 添加红色表示紧急/逾期

需要我为你生成完整的设计系统吗？"
```

### 示例 2: 创建自定义主题

```
用户: "我想要一个适合咖啡店的主题"

AI: "我来为你创建一个咖啡店主题，基于沙漠玫瑰并调整：

**咖啡店主题**:
- 主色: 深咖啡棕 (#4a3426)
- 辅助色: 奶泡白 (#f5f5dc)
- 强调色: 焦糖 (#c68e4e)
- 背景: 暖白 (#faf8f5)
- 字体: Playfair Display (标题) + Lato (正文)

这个主题传达：
- 温暖和舒适
- 手工和品质
- 经典和优雅

需要生成完整的 CSS 变量和示例组件吗？"
```

## 相关规则

- `frontend-design` - 前端设计规范
- `web-artifacts-builder` - Web 组件构建
