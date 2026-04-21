# GitHub 仓库配置指南

## 方式一：HTTPS 方式（推荐）

### 1. 添加远程仓库
```bash
git remote add origin https://github.com/your-github-username/zhsw-ai-web.git
```

### 2. 推送代码到 GitHub
```bash
git push -u origin main
```

### 3. 输入用户名和密码
- 用户名：您的 GitHub 用户名
- 密码：使用 Personal Access Token（不是登录密码）

**如何创建 Personal Access Token：**
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择有效期和权限（至少勾选 `repo`）
4. 生成后复制 token 作为密码使用

---

## 方式二：SSH 方式（推荐长期使用）

### 1. 生成 SSH 密钥（如果没有）
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

### 2. 添加密钥到 SSH Agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. 复制公钥到 GitHub
```bash
cat ~/.ssh/id_ed25519.pub
```
复制输出内容，添加到 https://github.com/settings/keys

### 4. 添加远程仓库
```bash
git remote add origin git@github.com:your-github-username/zhsw-ai-web.git
```

### 5. 推送代码
```bash
git push -u origin main
```

---

## 配置 GitHub Pages（通过链接访问）

### 方法一：使用 GitHub Actions 自动部署

1. 在仓库中创建 `.github/workflows/deploy.yml` 文件
2. 内容如下：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. 在仓库设置中启用 GitHub Pages：
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"

4. 推送代码后会自动部署

### 方法二：使用 gh-pages 分支

1. 安装 gh-pages 工具
```bash
npm install --save-dev gh-pages
```

2. 修改 `vite.config.ts`，添加 base 配置：
```typescript
export default defineConfig({
  base: '/zhsw-ai-web/',  // 仓库名称
  // ... 其他配置
})
```

3. 修改 `package.json`，添加部署脚本：
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. 部署
```bash
npm run deploy
```

---

## 访问链接

部署成功后，访问地址为：
```
https://your-github-username.github.io/zhsw-ai-web/
```

---

## 快速命令汇总

```bash
# 1. 添加远程仓库（HTTPS）
git remote add origin https://github.com/your-github-username/zhsw-ai-web.git

# 2. 推送代码
git push -u origin main

# 3. 后续更新代码
git add .
git commit -m "更新说明"
git push

# 4. 拉取最新代码
git pull
```

---

## 常见问题

### Q1: 推送时提示 "Permission denied"
A: 检查是否正确配置了 Personal Access Token 或 SSH 密钥

### Q2: 提示 "fatal: unable to access"
A: 检查网络连接，或尝试使用代理/VPN

### Q3: GitHub Pages 404
A: 确保仓库是 Public，且已正确配置 GitHub Pages 源

### Q4: 静态资源加载失败
A: 检查 vite.config.ts 中的 base 配置是否与仓库名一致
