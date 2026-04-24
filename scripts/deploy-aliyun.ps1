# 阿里云 OSS 静态网站部署脚本
# 使用方法: .\scripts\deploy-aliyun.ps1

param(
    [string]$BucketName = "",
    [string]$Endpoint = "",
    [switch]$CreateBucket = $false
)

Write-Host "🚀 阿里云 OSS 静态网站部署工具" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 检查阿里云 CLI 是否安装
function Test-AliyunCLI {
    try {
        $version = aliyun --version 2>$null
        if ($version) {
            Write-Host "✅ 阿里云 CLI 已安装" -ForegroundColor Green
            return $true
        }
    } catch {
        return $false
    }
    return $false
}

# 安装阿里云 CLI
function Install-AliyunCLI {
    Write-Host "📦 正在安装阿里云 CLI..." -ForegroundColor Yellow
    Write-Host "请访问以下链接下载并安装:" -ForegroundColor Cyan
    Write-Host "https://help.aliyun.com/document_detail/121541.html" -ForegroundColor White
    Write-Host ""
    Write-Host "安装完成后，运行以下命令配置密钥:" -ForegroundColor Yellow
    Write-Host "  aliyun configure" -ForegroundColor White
    Write-Host ""
    return $false
}

# 检查是否配置阿里云密钥
function Test-AliyunConfig {
    try {
        $config = aliyun oss ls 2>&1
        if ($config -match "Error" -or $config -match "失败") {
            return $false
        }
        return $true
    } catch {
        return $false
    }
}

# 主逻辑
Write-Host "🔍 检查阿里云 CLI..." -ForegroundColor Yellow

if (-not (Test-AliyunCLI)) {
    Write-Host "⚠️ 阿里云 CLI 未安装" -ForegroundColor Yellow
    Install-AliyunCLI
    exit 1
}

if (-not (Test-AliyunConfig)) {
    Write-Host "⚠️ 阿里云 CLI 未配置" -ForegroundColor Yellow
    Write-Host "请运行以下命令配置 AccessKey:" -ForegroundColor Cyan
    Write-Host "  aliyun configure" -ForegroundColor White
    Write-Host ""
    Write-Host "配置信息获取方式:" -ForegroundColor Yellow
    Write-Host "  1. 登录阿里云控制台 https://www.aliyun.com" -ForegroundColor White
    Write-Host "  2. 右上角头像 → AccessKey 管理" -ForegroundColor White
    Write-Host "  3. 创建 AccessKey，复制 ID 和 Secret" -ForegroundColor White
    exit 1
}

Write-Host "✅ 阿里云 CLI 已配置" -ForegroundColor Green

# 构建项目
Write-Host ""
Write-Host "🔨 正在构建项目..." -ForegroundColor Yellow
npm run build:skip-type
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 构建完成" -ForegroundColor Green

# 如果没有提供 Bucket 名称，提示输入
if (-not $BucketName) {
    Write-Host ""
    $BucketName = Read-Host "请输入 OSS Bucket 名称（例如：my-project-web）"
}

if (-not $Endpoint) {
    Write-Host ""
    Write-Host "常用 Endpoint:" -ForegroundColor Cyan
    Write-Host "  华东1（杭州）: oss-cn-hangzhou.aliyuncs.com" -ForegroundColor White
    Write-Host "  华东2（上海）: oss-cn-shanghai.aliyuncs.com" -ForegroundColor White
    Write-Host "  华北1（青岛）: oss-cn-qingdao.aliyuncs.com" -ForegroundColor White
    Write-Host "  华北2（北京）: oss-cn-beijing.aliyuncs.com" -ForegroundColor White
    Write-Host "  华南1（深圳）: oss-cn-shenzhen.aliyuncs.com" -ForegroundColor White
    $Endpoint = Read-Host "请输入 OSS Endpoint"
}

# 检查 Bucket 是否存在
Write-Host ""
Write-Host "🔍 检查 Bucket..." -ForegroundColor Yellow
$bucketExists = aliyun oss ls oss://$BucketName 2>&1

if ($bucketExists -match "Error" -or $bucketExists -match "不存在") {
    if ($CreateBucket) {
        Write-Host "📦 创建 Bucket: $BucketName" -ForegroundColor Yellow
        aliyun oss mb oss://$BucketName --endpoint $Endpoint
    } else {
        Write-Host "⚠️ Bucket '$BucketName' 不存在" -ForegroundColor Yellow
        $create = Read-Host "是否创建新 Bucket? (y/n)"
        if ($create -eq 'y' -or $create -eq 'Y') {
            Write-Host "📦 创建 Bucket: $BucketName" -ForegroundColor Yellow
            aliyun oss mb oss://$BucketName --endpoint $Endpoint
        } else {
            Write-Host "❌ 取消操作" -ForegroundColor Red
            exit 1
        }
    }
}

# 上传文件到 OSS
Write-Host ""
Write-Host "📤 上传文件到 OSS..." -ForegroundColor Yellow
Write-Host "这可能需要几分钟..." -ForegroundColor Gray

aliyun oss cp dist/ oss://$BucketName/ --recursive --endpoint $Endpoint

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 部署成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "==================" -ForegroundColor Green
    Write-Host "🌐 访问链接:" -ForegroundColor Green
    Write-Host "  http://$BucketName.$Endpoint" -ForegroundColor White
    Write-Host "==================" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️ 注意: 默认是私有 Bucket，需要配置为公共读才能访问" -ForegroundColor Yellow
    Write-Host "  配置命令: aliyun oss acl oss://$BucketName public-read --endpoint $Endpoint" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 提示: 建议开启静态网站托管功能" -ForegroundColor Cyan
    Write-Host "  阿里云控制台 → OSS → Bucket → 基础设置 → 静态页面" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ 部署失败" -ForegroundColor Red
    Write-Host "请检查:" -ForegroundColor Yellow
    Write-Host "  1. Bucket 名称是否正确" -ForegroundColor White
    Write-Host "  2. Endpoint 是否正确" -ForegroundColor White
    Write-Host "  3. 是否有上传权限" -ForegroundColor White
}
