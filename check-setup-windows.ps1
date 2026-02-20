# Windows 环境检查脚本（PowerShell）

# 检查 Node.js
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 检查 Node.js" -ForegroundColor Yellow
Write-Host "=================================="

try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 已安装：$nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js 未安装" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先安装 Node.js：" -ForegroundColor Yellow
    Write-Host "1. 访问：https://nodejs.org/" -ForegroundColor White
    Write-Host "2. 下载并安装 LTS 版本" -ForegroundColor White
    Write-Host "3. 关闭并重新打开 PowerShell" -ForegroundColor White
    Write-Host "4. 再次运行此脚本" -ForegroundColor White
    pause
    exit
}

Write-Host ""

# 检查 npm
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 检查 npm" -ForegroundColor Yellow
Write-Host "=================================="

try {
    $npmVersion = npm --version
    Write-Host "✅ npm 已安装：$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm 未安装" -ForegroundColor Red
    Write-Host "npm 应该随 Node.js 一起安装，请重新安装 Node.js" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""

# 检查 pnpm
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 检查 pnpm" -ForegroundColor Yellow
Write-Host "=================================="

try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm 已安装：$pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm 未安装" -ForegroundColor Red
    Write-Host ""
    Write-Host "正在安装 pnpm..." -ForegroundColor Yellow
    npm install -g pnpm

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ pnpm 安装成功" -ForegroundColor Green
        Write-Host "⚠️  重要：请关闭并重新打开 PowerShell" -ForegroundColor Yellow
        pause
        exit
    } else {
        Write-Host "❌ pnpm 安装失败" -ForegroundColor Red
        Write-Host ""
        Write-Host "请查看详细教程：FIX_PNPM_NOT_FOUND.md" -ForegroundColor Yellow
        pause
        exit
    }
}

Write-Host ""

# 检查项目目录
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 检查项目目录" -ForegroundColor Yellow
Write-Host "=================================="

if (Test-Path "package.json") {
    Write-Host "✅ 正确：你在项目根目录" -ForegroundColor Green
} else {
    Write-Host "❌ 错误：你不在项目根目录" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先进入项目目录：" -ForegroundColor Yellow
    Write-Host 'cd Desktop\projects' -ForegroundColor White
    Write-Host 'cd "你的项目路径"' -ForegroundColor White
    pause
    exit
}

Write-Host ""

# 检查依赖
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 检查项目依赖" -ForegroundColor Yellow
Write-Host "=================================="

if (Test-Path "node_modules") {
    $count = (Get-ChildItem node_modules -Directory).Count
    if ($count -gt 10) {
        Write-Host "✅ 依赖已安装（约 $count 个包）" -ForegroundColor Green
    } else {
        Write-Host "⚠️  依赖不完整" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "正在安装依赖..." -ForegroundColor Yellow
        pnpm install

        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ 依赖安装成功" -ForegroundColor Green
        } else {
            Write-Host "❌ 依赖安装失败" -ForegroundColor Red
            pause
            exit
        }
    }
} else {
    Write-Host "❌ 依赖未安装" -ForegroundColor Red
    Write-Host ""
    Write-Host "正在安装依赖..." -ForegroundColor Yellow
    pnpm install

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ 依赖安装成功" -ForegroundColor Green
    } else {
        Write-Host "❌ 依赖安装失败" -ForegroundColor Red
        pause
        exit
    }
}

Write-Host ""

# 检查环境变量
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 检查环境变量" -ForegroundColor Yellow
Write-Host "=================================="

if (Test-Path ".env.local") {
    Write-Host "✅ .env.local 存在" -ForegroundColor Green
    Write-Host ""
    Write-Host "内容预览：" -ForegroundColor Yellow
    Get-Content .env.local -Head 5
} else {
    Write-Host "⚠️  .env.local 不存在" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "正在创建 .env.local..." -ForegroundColor Yellow
    @"
# 开发环境配置
PROJECT_DOMAIN=http://localhost:3000

# 其他配置
NODE_ENV=development
"@ | Out-File -FilePath .env.local -Encoding utf8
    Write-Host "✅ .env.local 创建成功" -ForegroundColor Green
}

Write-Host ""

# 总结
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✅ 检查完成！" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor White
Write-Host ""
Write-Host "环境状态：" -ForegroundColor Yellow
Write-Host "  Node.js：$nodeVersion" -ForegroundColor White
Write-Host "  npm：$npmVersion" -ForegroundColor White
Write-Host "  pnpm：$pnpmVersion" -ForegroundColor White
Write-Host "  项目依赖：已安装" -ForegroundColor Green
Write-Host "  环境变量：已配置" -ForegroundColor Green
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🚀 下一步操作：" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor White
Write-Host ""
Write-Host "1. 编译项目：" -ForegroundColor Yellow
Write-Host "   pnpm build:ttapp" -ForegroundColor White
Write-Host ""
Write-Host "2. 启动后端服务：" -ForegroundColor Yellow
Write-Host "   cd server" -ForegroundColor White
Write-Host "   pnpm start:dev" -ForegroundColor White
Write-Host ""
Write-Host "3. 导入到抖音开发者工具：" -ForegroundColor Yellow
Write-Host "   - 选择 dist 目录" -ForegroundColor White
Write-Host "   - AppID：tt27f0514db990b96201" -ForegroundColor White
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "📖 相关文档：" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor White
Write-Host "- 修复 pnpm 未安装：FIX_PNPM_NOT_FOUND.md" -ForegroundColor Cyan
Write-Host "- 安装 pnpm 详解：INSTALL_PNPM_WINDOWS.md" -ForegroundColor Cyan
Write-Host "- 新手快速参考：NEWBIE_REFERENCE.md" -ForegroundColor Cyan
Write-Host "- 新手详细教程：NEWBIE_INSTALL_GUIDE.md" -ForegroundColor Cyan
Write-Host "- 快速开始指南：QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "按任意键退出..." -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor White
pause
