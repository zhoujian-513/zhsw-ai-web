# 项目部署指南

## 方案一：Vercel 部署（推荐，最简单）

Vercel 是目前最流行的前端项目托管平台，无需配置 Actions，自动部署，国内访问速度也不错。

### 部署步骤

#### 1. 注册/登录 Vercel

1. 访问 https://vercel.com
2. 点击 **Sign Up**，选择 **Continue with GitHub**
3. 授权 Vercel 访问你的 GitHub 仓库

#### 2. 导入项目

1. 登录后点击 **Add New Project**
2. 在列表中找到并选择 `zhsw-ai-web` 仓库
3. 点击 **Import**

#### 3. 配置项目

Vercel 会自动识别项目配置，一般无需修改：
- **Framework Preset**: Vite
- **Build Command**: `npm run build:skip-type`
- **Output Directory**: `dist`

点击 **Deploy** 开始部署。

#### 4. 等待部署完成

- 部署过程约 1-2 分钟
- 完成后会显示 **Congratulations!** 
- 点击链接即可访问，例如：
  ```
  https://zhsw-ai-web.vercel.app
  ```

#### 5. 自动部署

之后每次推送代码到 GitHub，Vercel 会自动重新部署。

#### 6. 自定义域名（可选）

1. 在 Vercel 项目页面点击 **Settings** → **Domains**
2. 添加你的自定义域名
3. 按提示配置 DNS

---

## 方案二：GitHub Pages 部署

> ⚠️ 注意：由于 GitHub Actions 权限限制，此方案可能无法使用。如遇问题，请使用 Vercel 方案。

### 前置条件
1. 项目已推送到 GitHub 仓库
2. 仓库为 Public（私有仓库需要 GitHub Pro）
3. Actions 权限已开启

### 部署步骤

#### 1. 首次配置（只需一次）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "chore: 配置 GitHub Pages 部署"
   git push origin main
   ```

2. **在 GitHub 上启用 Pages**
   - 打开 GitHub 仓库页面
   - 点击 **Settings** → **Pages**
   - **Source** 选择 **GitHub Actions**

3. **运行部署**
   - 推送代码到 `main` 或 `master` 分支会自动触发部署
   - 或手动触发：进入仓库 → **Actions** → **Deploy to GitHub Pages** → **Run workflow**

#### 2. 访问链接

部署完成后，访问链接格式为：
```
https://你的用户名.github.io/仓库名/
```

例如：
```
https://zhoujian-513.github.io/zhsw-ai-web/
```

---

## 方案三：本地局域网共享（最快）

适合临时给同办公室同事演示，无需配置。

### 方法 1：使用 Vite 自带 host 模式

```bash
# 启动开发服务器并允许局域网访问
npm run dev -- --host
```

启动后，控制台会显示：
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/   ← 把这个地址发给同事
```

同事在**同一WiFi/局域网**内，直接访问 `http://192.168.x.x:5173/` 即可查看。

### 方法 2：打包后用本地服务器

```bash
# 构建并启动本地服务器
npm run deploy:local
```

然后分享显示的地址给同事。

---

## 方案四：部署到公司内网服务器

### 1. 构建项目

```bash
npm run build
```

构建完成后，`dist` 文件夹包含所有静态文件。

### 2. 部署方式

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/your-project/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 或使用简单 HTTP 服务器

```bash
# 在服务器上安装 serve
npm install -g serve

# 启动服务
serve -s dist -l 3000
```

---

## 方案五：Netlify 部署

1. 访问 https://netlify.com 注册/登录
2. 拖拽 `dist` 文件夹到部署区域
3. 获得 `.netlify.app` 域名

---

## 常见问题

### Q: Vercel 部署后访问速度慢？

A: Vercel 的默认域名在国内访问可能较慢。解决方案：
1. 绑定自定义域名（国内域名 + CDN）
2. 或使用 GitHub Pages/Netlify 作为备选

### Q: GitHub Pages 部署后页面空白？

A: 检查 `vite.config.ts` 中的 `base` 配置是否正确。已配置自动识别，如仍有问题，请检查：
- 仓库是否为 Public（Private 仓库需要 GitHub Pro）
- Actions 是否有权限（Settings → Actions → General → Workflow permissions 选择 Read and write permissions）

### Q: 如何更新已部署的网站？

A: 
- **Vercel**: 推送代码到 GitHub 自动重新部署
- **GitHub Pages**: 推送代码到 main 分支即可自动重新部署
- **其他方案**: 重新构建并替换 dist 文件夹内容

### Q: 部署后 API 请求失败？

A: GitHub Pages/Vercel 只支持静态页面，后端 API 需要：
1. 单独部署到支持后端的服务器
2. 或使用免费的 serverless 服务（如 Vercel Functions、Cloudflare Workers）
3. 或使用 mock 数据代替真实 API

---

## 快速命令参考

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run dev -- --host` | 开发模式 + 局域网访问 |
| `npm run build` | 构建生产版本（含类型检查）|
| `npm run build:skip-type` | 构建生产版本（跳过类型检查）|
| `npm run build:gh-pages` | 构建（GitHub Pages 模式）|
| `npm run serve` | 预览构建结果 |
| `npm run deploy:local` | 构建并启动本地服务器 |

---

## 方案对比

| 方案 | 难度 | 访问速度 | 自动部署 | 适合场景 |
|------|------|----------|----------|----------|
| **Vercel** | ⭐ 简单 | ⭐⭐⭐ 快 | ✅ | 推荐首选 |
| **GitHub Pages** | ⭐⭐ 中等 | ⭐⭐⭐ 快 | ✅ | 静态项目 |
| **局域网共享** | ⭐ 最简单 | ⭐⭐⭐⭐⭐ 极快 | ❌ | 临时演示 |
| **公司服务器** | ⭐⭐⭐ 复杂 | ⭐⭐⭐⭐⭐ 极快 | ❌ | 正式环境 |
| **Netlify** | ⭐ 简单 | ⭐⭐⭐ 快 | ✅ | 备选方案 |
