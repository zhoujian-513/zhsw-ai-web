# 阿里云 OSS 静态网站部署指南

## 方案优势

- ✅ **国内访问速度最快** - 阿里云 CDN 节点遍布全国
- ✅ **成本低廉** - 按量付费，静态网站费用极低
- ✅ **稳定可靠** - 阿里云 OSS 服务稳定性高
- ✅ **简单易用** - 提供一键部署脚本

---

## 部署方式一：使用部署脚本（推荐）

### 前置条件

1. **安装阿里云 CLI**
   - 下载地址：https://help.aliyun.com/document_detail/121541.html
   - 安装后重启终端

2. **配置阿里云密钥**
   ```bash
   aliyun configure
   ```
   需要输入：
   - AccessKey ID
   - AccessKey Secret
   - 默认区域（如 cn-hangzhou）

   **获取方式**：
   1. 登录阿里云控制台 https://www.aliyun.com
   2. 右上角头像 → AccessKey 管理
   3. 创建 AccessKey，复制 ID 和 Secret

### 执行部署

```powershell
# 在 PowerShell 中运行
.\scripts\deploy-aliyun.ps1
```

按提示输入：
- Bucket 名称（如：zhsw-ai-web）
- Endpoint（如：oss-cn-hangzhou.aliyuncs.com）

脚本会自动：
1. 构建项目
2. 创建 Bucket（如果不存在）
3. 上传文件到 OSS
4. 显示访问链接

---

## 部署方式二：手动部署

### 1. 创建 OSS Bucket

1. 登录阿里云控制台 → 对象存储 OSS
2. 点击 **创建 Bucket**
3. 配置：
   - **Bucket 名称**：自定义（如 zhsw-ai-web）
   - **地域**：选择离你最近的（如华东1杭州）
   - **存储类型**：标准存储
   - **读写权限**：公共读
4. 点击 **确定**

### 2. 开启静态网站托管

1. 进入 Bucket → **基础设置**
2. 找到 **静态页面**
3. 点击 **设置**，配置：
   - **默认首页**：index.html
   - **默认 404 页**：index.html
4. 保存

### 3. 上传文件

#### 方式 A：使用 OSS 浏览器工具
1. 下载 OSS 浏览器：https://gosspublic.alicdn.com/oss-browser/1.16.0/oss-browser-win32-x64.zip
2. 登录后，找到你的 Bucket
3. 将 `dist` 文件夹内容拖拽上传

#### 方式 B：使用阿里云 CLI
```bash
# 构建项目
npm run build:skip-type

# 上传文件
aliyun oss cp dist/ oss://你的bucket名称/ --recursive
```

### 4. 访问网站

部署完成后，访问链接格式：
```
http://你的bucket名称.oss-你的地域.aliyuncs.com
```

例如：
```
http://zhsw-ai-web.oss-cn-hangzhou.aliyuncs.com
```

---

## 部署方式三：绑定自定义域名（可选）

### 1. 添加自定义域名

1. 进入 Bucket → **传输管理** → **域名管理**
2. 点击 **绑定域名**
3. 输入你的域名（如：web.yourdomain.com）
4. 按提示配置 DNS 解析

### 2. 配置 HTTPS（可选）

1. 在域名管理中，点击 **证书托管**
2. 上传或选择 SSL 证书
3. 开启 HTTPS 访问

---

## 常用 Endpoint 列表

| 地域 | Endpoint |
|------|----------|
| 华东1（杭州）| oss-cn-hangzhou.aliyuncs.com |
| 华东2（上海）| oss-cn-shanghai.aliyuncs.com |
| 华北1（青岛）| oss-cn-qingdao.aliyuncs.com |
| 华北2（北京）| oss-cn-beijing.aliyuncs.com |
| 华北3（张家口）| oss-cn-zhangjiakou.aliyuncs.com |
| 华南1（深圳）| oss-cn-shenzhen.aliyuncs.com |
| 西南1（成都）| oss-cn-chengdu.aliyuncs.com |

---

## 费用说明

阿里云 OSS 静态网站托管费用包括：

1. **存储费用**：约 0.12 元/GB/月
2. **流量费用**：约 0.50 元/GB（外网流出）
3. **请求费用**：约 0.01 元/万次

**估算**：一个小型网站（<100MB），每月费用通常在 **1-5 元** 以内。

---

## 常见问题

### Q: 访问时提示 403 Forbidden？

A: Bucket 权限设置为 **公共读**：
```bash
aliyun oss acl oss://bucket名称 public-read
```

### Q: 如何更新网站？

A: 重新上传 `dist` 文件夹内容即可。建议先清空 Bucket 再上传。

### Q: 如何启用 CDN 加速？

A: 
1. 进入 Bucket → **传输管理** → **CDN 加速**
2. 点击 **添加域名**
3. 配置 CDN 域名和源站信息
4. 在 DNS 中添加 CNAME 记录

### Q: 如何配置缓存？

A: 在 OSS 控制台 → **数据处理** → **缓存配置** 中设置：
- HTML 文件：不缓存或短时间缓存
- JS/CSS/图片：长时间缓存（如 30 天）

---

## 快速命令参考

| 命令 | 说明 |
|------|------|
| `npm run build:skip-type` | 构建项目 |
| `.\scripts\deploy-aliyun.ps1` | 一键部署到阿里云 |
| `aliyun oss ls` | 列出所有 Bucket |
| `aliyun oss mb oss://bucket名` | 创建 Bucket |
| `aliyun oss cp local/ oss://bucket/ --recursive` | 上传文件夹 |
| `aliyun oss rm oss://bucket/ --recursive` | 清空 Bucket |

---

## 方案对比

| 方案 | 国内速度 | 成本 | 难度 | 适用场景 |
|------|----------|------|------|----------|
| **阿里云 OSS** | ⭐⭐⭐⭐⭐ 极快 | ⭐ 极低 | ⭐⭐ 简单 | 国内用户首选 |
| **Vercel** | ⭐⭐⭐ 一般 | 免费 | ⭐ 最简单 | 海外用户 |
| **GitHub Pages** | ⭐⭐⭐ 一般 | 免费 | ⭐⭐ 中等 | 静态项目 |
| **Cloudflare** | ⭐⭐⭐⭐ 较快 | 免费 | ⭐⭐ 简单 | 全球用户 |
