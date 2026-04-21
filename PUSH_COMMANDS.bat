@echo off
chcp 65001 >nul
echo ==========================================
echo    水管家2.0系统 - GitHub 推送脚本
echo ==========================================
echo.

REM 请修改以下变量为您的 GitHub 用户名和仓库名
set GITHUB_USERNAME=your-github-username
set REPO_NAME=zhsw-ai-web

echo 正在配置远程仓库...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo 正在推送代码到 GitHub...
git push -u origin master

echo.
echo ==========================================
if %errorlevel% == 0 (
    echo    推送成功！
    echo    访问地址: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
) else (
    echo    推送失败，请检查：
    echo    1. 是否已修改 GITHUB_USERNAME 变量
    echo    2. GitHub 仓库是否已创建
    echo    3. 网络连接是否正常
)
echo ==========================================
pause
