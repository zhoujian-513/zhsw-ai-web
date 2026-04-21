# GitHub Pages 部署配置指南

## ✅ 代码已推送成功

**仓库地址**: https://github.com/zhoujian-513/zhsw-ai-web

## 🚀 启用 GitHub Pages 步骤

### 步骤 1：进入仓库设置
1. 访问 https://github.com/zhoujian-513/zhsw-ai-web
2. 点击顶部菜单 **Settings**（设置）

### 步骤 2：配置 Pages
1. 左侧菜单选择 **Pages**
2. **Source** 选择 `GitHub Actions`
3. 系统会自动检测 `.github/workflows/deploy.yml` 文件

### 步骤 3：触发部署
1. 进入仓库的 **Actions** 标签页
2. 点击 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow** 手动触发

### 步骤 4：访问网站
部署完成后，访问地址：
```
https://zhoujian-513.github.io/zhsw-ai-web/
```

## 🔗 分享链接

部署成功后，您可以将以下链接分享给同事：

| 页面 | 链接 |
|------|------|
| 首页 | https://zhoujian-513.github.io/zhsw-ai-web/ |
| 应急抢修管理 | https://zhoujian-513.github.io/zhsw-ai-web/safety/emergency-repair |
| 设备台账 | https://zhoujian-513.github.io/zhsw-ai-web/device/ledger |
| 运维工单 | https://zhoujian-513.github.io/zhsw-ai-web/production/work-order |

## 📋 快速检查清单

- [x] 代码已推送到 GitHub
- [ ] 在 GitHub 上启用 Pages（Settings → Pages → GitHub Actions）
- [ ] 等待 Actions 部署完成（约 2-3 分钟）
- [ ] 访问链接验证

## 🔄 后续更新

代码更新后，推送到 GitHub 会自动触发重新部署：

```bash
git add .
git commit -m "更新内容"
git push
```

## ❗ 常见问题

### Q1: 访问 404
- 检查仓库是否为 Public（公开）
- 确认 GitHub Actions 已成功运行
- 等待 2-3 分钟后刷新

### Q2: 页面空白
- 检查浏览器控制台是否有错误
- 确认 vite.config.ts 中的 base 配置正确

### Q3: 如何设置为私有仓库但公开访问 Pages
- GitHub Pro 用户可以使用私有仓库 + 公开 Pages
- 免费用户需要将仓库设为 Public
