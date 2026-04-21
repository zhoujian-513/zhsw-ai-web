# 项目部署指南

## 一、生成外部访问链接

### 1. 构建生产环境包

```bash
# 安装依赖
npm install

# 构建生产环境
npm run build
```

构建完成后，会在 `dist` 目录生成静态文件。

### 2. 部署方式

#### 方式一：部署到 Nginx 服务器

1. **安装 Nginx**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx

   # CentOS/RHEL
   sudo yum install nginx
   ```

2. **配置 Nginx**
   
   创建配置文件 `/etc/nginx/conf.d/zhsw-ai-web.conf`：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;  # 替换为您的域名或IP

       # 前端静态文件
       location / {
           root /var/www/zhsw-ai-web/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # API 代理
       location /admin/ {
           proxy_pass http://your-backend-server:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

3. **部署文件**
   ```bash
   # 创建目录
   sudo mkdir -p /var/www/zhsw-ai-web

   # 复制构建文件
   sudo cp -r dist /var/www/zhsw-ai-web/

   # 设置权限
   sudo chown -R www-data:www-data /var/www/zhsw-ai-web
   ```

4. **重启 Nginx**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **访问链接**
   
   部署完成后，其他同事可通过以下链接访问：
   ```
   http://your-domain.com
   ```

#### 方式二：使用 Docker 部署

1. **创建 Dockerfile**
   ```dockerfile
   FROM nginx:alpine

   # 复制构建文件
   COPY dist /usr/share/nginx/html

   # 复制 Nginx 配置
   COPY nginx.conf /etc/nginx/conf.d/default.conf

   EXPOSE 80

   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **创建 nginx.conf**
   ```nginx
   server {
       listen 80;
       server_name localhost;

       location / {
           root /usr/share/nginx/html;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **构建并运行**
   ```bash
   # 构建镜像
   docker build -t zhsw-ai-web .

   # 运行容器
   docker run -d -p 80:80 --name zhsw-ai-web zhsw-ai-web
   ```

#### 方式三：使用 Vercel/Netlify（快速部署）

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署**
   ```bash
   vercel --prod
   ```

3. **获得链接**
   
   部署完成后会获得类似 `https://zhsw-ai-web.vercel.app` 的链接

### 3. 配置环境变量

在部署前，根据实际情况修改 `.env.production`：

```env
# 生产环境 API 地址
VITE_API_URL = http://your-api-server.com

# 是否使用 Mock 数据（生产环境设为 false）
VITE_USE_MOCK = false
```

## 二、页面链接分享功能

### 功能说明

项目已内置页面链接分享功能，点击顶部栏的分享按钮（🔗图标）可以：

1. **复制当前页面链接** - 快速复制当前页面URL
2. **生成二维码** - 手机扫码访问
3. **查看所有页面** - 浏览并复制其他页面链接
4. **邮件分享** - 通过邮件发送链接
5. **新窗口打开** - 在新标签页打开当前页面

### 可分享的页面列表

| 页面名称 | 路径 | 说明 |
|---------|------|------|
| 应急抢修管理 | /safety/emergency-repair | 应急事件初报、续报、终报管理 |
| 有限空间台账 | /safety/confined-space | 有限空间作业管理台账 |
| 特种设备台账 | /safety/special-equipment | 特种设备管理台账 |
| 隐患排查 | /safety/hazard | 安全隐患排查记录 |
| 安全巡检 | /safety/inspection | 安全巡检管理 |
| 应急预案 | /safety/emergency | 应急预案管理 |
| 事故记录 | /safety/accident | 安全事故记录 |
| 设备台账 | /device/ledger | 设备台账管理 |
| 运维工单 | /production/workOrder | 运维工单管理 |
| 集团看板 | /dashboard/group | 集团数据看板 |

### 添加新页面到分享列表

编辑 `src/utils/link-share.ts`，在 `shareablePages` 数组中添加：

```typescript
{
  name: '页面名称',
  path: '/module/page-path',
  icon: '&#xe628;',
  description: '页面描述'
}
```

## 三、常见问题

### 1. 刷新页面 404

确保 Nginx 配置中有：
```nginx
try_files $uri $uri/ /index.html;
```

### 2. API 请求失败

检查 `.env.production` 中的 `VITE_API_URL` 是否正确配置了后端地址。

### 3. 跨域问题

确保后端服务器已配置 CORS，允许前端域名访问。

### 4. 静态资源加载失败

检查 `vite.config.ts` 中的 `base` 配置：
```typescript
export default defineConfig({
  base: '/',  // 如果部署到子目录，改为 '/subdir/'
  // ...
})
```

## 四、更新部署

当代码更新后，重新部署：

```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建
npm run build

# 3. 复制到服务器
sudo cp -r dist/* /var/www/zhsw-ai-web/dist/

# 4. 如果使用 Docker
docker build -t zhsw-ai-web .
docker stop zhsw-ai-web
docker rm zhsw-ai-web
docker run -d -p 80:80 --name zhsw-ai-web zhsw-ai-web
```
