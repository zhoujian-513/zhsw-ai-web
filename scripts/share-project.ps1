# 项目分享脚本 - 使用 ngrok 创建外部访问链接
# 使用方法: 在 PowerShell 中运行 .\scripts\share-project.ps1

param(
    [string]$Port = "5173",
    [switch]$BuildFirst = $false
)

Write-Host "🚀 项目分享工具" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host ""

# 检查 ngrok 是否安装
function Test-NgrokInstalled {
    try {
        $ngrokVersion = ngrok --version 2>$null
        if ($ngrokVersion) {
            Write-Host "✅ ngrok 已安装: $ngrokVersion" -ForegroundColor Green
            return $true
        }
    } catch {
        return $false
    }
    return $false
}

# 安装 ngrok
function Install-Ngrok {
    Write-Host "📦 正在安装 ngrok..." -ForegroundColor Yellow
    
    # 使用 npm 安装 ngrok
    try {
        npm install -g ngrok
        Write-Host "✅ ngrok 安装完成" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ ngrok 安装失败" -ForegroundColor Red
        Write-Host "请手动安装 ngrok:" -ForegroundColor Yellow
        Write-Host "  1. 访问 https://ngrok.com/download" -ForegroundColor White
        Write-Host "  2. 下载 Windows 版本并安装" -ForegroundColor White
        Write-Host "  3. 注册账号并获取 Authtoken" -ForegroundColor White
        Write-Host "  4. 运行: ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor White
        return $false
    }
}

# 检查 ngrok 配置
function Test-NgrokConfigured {
    $configPath = "$env:USERPROFILE\.ngrok2\ngrok.yml"
    $configPath2 = "$env:APPDATA\ngrok\ngrok.yml"
    
    if (Test-Path $configPath) {
        $content = Get-Content $configPath -Raw
        if ($content -match "authtoken") {
            return $true
        }
    }
    
    if (Test-Path $configPath2) {
        $content = Get-Content $configPath2 -Raw
        if ($content -match "authtoken") {
            return $true
        }
    }
    
    return $false
}

# 主逻辑
Write-Host "🔍 检查 ngrok 安装状态..." -ForegroundColor Yellow

if (-not (Test-NgrokInstalled)) {
    Write-Host "⚠️ ngrok 未安装" -ForegroundColor Yellow
    $install = Read-Host "是否现在安装 ngrok? (y/n)"
    if ($install -eq 'y' -or $install -eq 'Y') {
        if (-not (Install-Ngrok)) {
            exit 1
        }
    } else {
        Write-Host "❌ 取消操作" -ForegroundColor Red
        exit 1
    }
}

# 检查配置
if (-not (Test-NgrokConfigured)) {
    Write-Host "⚠️ ngrok 未配置 Authtoken" -ForegroundColor Yellow
    Write-Host "请按以下步骤配置:" -ForegroundColor Cyan
    Write-Host "  1. 访问 https://dashboard.ngrok.com/signup 注册账号" -ForegroundColor White
    Write-Host "  2. 获取你的 Authtoken" -ForegroundColor White
    Write-Host "  3. 运行: ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor White
    Write-Host ""
    $token = Read-Host "输入你的 ngrok Authtoken (或直接按回车跳过)"
    if ($token) {
        ngrok config add-authtoken $token
        Write-Host "✅ Authtoken 配置完成" -ForegroundColor Green
    } else {
        Write-Host "❌ 未提供 Authtoken，无法继续" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ ngrok 已配置" -ForegroundColor Green
}

# 如果需要先构建
if ($BuildFirst) {
    Write-Host ""
    Write-Host "🔨 正在构建项目..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 构建失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 构建完成" -ForegroundColor Green
    
    # 使用 serve 启动生产环境
    Write-Host ""
    Write-Host "🌐 启动生产服务器..." -ForegroundColor Yellow
    $port = 3000
    Start-Process powershell -ArgumentList "-Command", "npx serve -s dist -l $port" -WindowStyle Hidden
    $Port = $port
    Start-Sleep -Seconds 3
} else {
    # 检查开发服务器是否运行
    Write-Host ""
    Write-Host "🔍 检查开发服务器..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port" -Method Head -TimeoutSec 2 -ErrorAction SilentlyContinue
        Write-Host "✅ 开发服务器已在端口 $Port 运行" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ 开发服务器未运行，正在启动..." -ForegroundColor Yellow
        Start-Process powershell -ArgumentList "-Command", "npm run dev" -WindowStyle Hidden
        Write-Host "⏳ 等待服务器启动..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}

# 启动 ngrok
Write-Host ""
Write-Host "🌍 启动 ngrok 内网穿透..." -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host ""
Write-Host "正在创建外部访问链接，请稍候..." -ForegroundColor Yellow
Write-Host ""

# 启动 ngrok 并捕获输出
$ngrokProcess = Start-Process -FilePath "ngrok" -ArgumentList "http", $Port, "--log=stdout" -RedirectStandardOutput "ngrok.log" -WindowStyle Hidden -PassThru

# 等待 ngrok 启动并获取 URL
Start-Sleep -Seconds 3

$maxAttempts = 10
$attempt = 0
$url = $null

while ($attempt -lt $maxAttempts -and -not $url) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4040/api/tunnels" -TimeoutSec 5 -ErrorAction SilentlyContinue
        $tunnels = $response.Content | ConvertFrom-Json
        if ($tunnels.tunnels -and $tunnels.tunnels.Count -gt 0) {
            $url = $tunnels.tunnels[0].public_url
        }
    } catch {
        Start-Sleep -Seconds 2
    }
    $attempt++
}

if ($url) {
    Write-Host "✅ 外部访问链接已创建！" -ForegroundColor Green
    Write-Host ""
    Write-Host "==================" -ForegroundColor Green
    Write-Host "🌐 分享链接: $url" -ForegroundColor Green
    Write-Host "==================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 链接已复制到剪贴板" -ForegroundColor Cyan
    Set-Clipboard -Value $url
    Write-Host ""
    Write-Host "⚠️ 提示:" -ForegroundColor Yellow
    Write-Host "  • 此链接有效期为 ngrok 会话期间" -ForegroundColor White
    Write-Host "  • 关闭此窗口将停止共享" -ForegroundColor White
    Write-Host "  • 免费版 ngrok 链接会随机变化" -ForegroundColor White
    Write-Host ""
    Write-Host "按任意键停止共享..." -ForegroundColor Cyan
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # 清理
    Stop-Process -Id $ngrokProcess.Id -Force -ErrorAction SilentlyContinue
    Remove-Item "ngrok.log" -ErrorAction SilentlyContinue
    Write-Host ""
    Write-Host "👋 共享已停止" -ForegroundColor Yellow
} else {
    Write-Host "❌ 无法获取 ngrok 链接" -ForegroundColor Red
    Write-Host "请检查 ngrok.log 文件了解详情" -ForegroundColor Yellow
    Stop-Process -Id $ngrokProcess.Id -Force -ErrorAction SilentlyContinue
}
