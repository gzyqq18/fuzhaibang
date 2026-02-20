#!/bin/bash

# 新手检查脚本 - 验证环境是否配置正确
# 使用方法：./check-setup.sh

echo "=================================="
echo "🔍 环境检查工具"
echo "=================================="
echo ""

# 检查 1：当前目录
echo "📁 检查 1：当前目录"
echo "----------------------------------"
CURRENT_DIR=$(pwd)
echo "当前目录：$CURRENT_DIR"

# 检查是否在项目根目录
if [ -f "package.json" ]; then
    echo "✅ 正确：你在项目根目录"
else
    echo "❌ 错误：你不在项目根目录"
    echo ""
    echo "请先进入项目目录："
    echo "  cd Desktop\\projects       # Windows"
    echo "  cd ~/Desktop/projects     # Mac/Linux"
    exit 1
fi
echo ""

# 检查 2：Node.js
echo "📦 检查 2：Node.js"
echo "----------------------------------"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js 已安装：$NODE_VERSION"
else
    echo "❌ Node.js 未安装"
    echo ""
    echo "请先安装 Node.js："
    echo "  访问：https://nodejs.org/"
    echo "  下载并安装 LTS 版本"
    exit 1
fi
echo ""

# 检查 3：npm
echo "📦 检查 3：npm"
echo "----------------------------------"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm 已安装：$NPM_VERSION"
else
    echo "❌ npm 未安装"
    echo "npm 应该随 Node.js 一起安装"
    exit 1
fi
echo ""

# 检查 4：pnpm
echo "📦 检查 4：pnpm"
echo "----------------------------------"
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm --version)
    echo "✅ pnpm 已安装：$PNPM_VERSION"
else
    echo "❌ pnpm 未安装"
    echo ""
    echo "正在安装 pnpm..."
    npm install -g pnpm
    if [ $? -eq 0 ]; then
        echo "✅ pnpm 安装成功"
        PNPM_VERSION=$(pnpm --version)
        echo "版本：$PNPM_VERSION"
    else
        echo "❌ pnpm 安装失败"
        exit 1
    fi
fi
echo ""

# 检查 5：依赖是否已安装
echo "📦 检查 5：项目依赖"
echo "----------------------------------"
if [ -d "node_modules" ]; then
    NODE_MODULES_COUNT=$(ls node_modules | wc -l)
    if [ $NODE_MODULES_COUNT -gt 10 ]; then
        echo "✅ 依赖已安装（约 $NODE_MODULES_COUNT 个包）"
    else
        echo "⚠️  依赖不完整"
        echo ""
        echo "正在安装依赖..."
        pnpm install
        if [ $? -eq 0 ]; then
            echo "✅ 依赖安装成功"
        else
            echo "❌ 依赖安装失败"
            exit 1
        fi
    fi
else
    echo "❌ 依赖未安装"
    echo ""
    echo "正在安装依赖..."
    pnpm install
    if [ $? -eq 0 ]; then
        echo "✅ 依赖安装成功"
    else
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi
echo ""

# 检查 6：关键文件
echo "📄 检查 6：关键文件"
echo "----------------------------------"
MISSING_FILES=0

if [ -f "package.json" ]; then
    echo "✅ package.json"
else
    echo "❌ package.json 缺失"
    MISSING_FILES=$((MISSING_FILES + 1))
fi

if [ -f "project.config.json" ]; then
    echo "✅ project.config.json"
else
    echo "⚠️  project.config.json 缺失（不影响开发）"
fi

if [ -d "src" ]; then
    echo "✅ src/ 目录"
else
    echo "❌ src/ 目录缺失"
    MISSING_FILES=$((MISSING_FILES + 1))
fi

if [ -d "server" ]; then
    echo "✅ server/ 目录"
else
    echo "❌ server/ 目录缺失"
    MISSING_FILES=$((MISSING_FILES + 1))
fi

if [ $MISSING_FILES -gt 0 ]; then
    echo ""
    echo "❌ 有 $MISSING_FILES 个关键文件/目录缺失"
    exit 1
fi
echo ""

# 检查 7：环境变量
echo "⚙️  检查 7：环境变量"
echo "----------------------------------"
if [ -f ".env.local" ]; then
    echo "✅ .env.local 存在"
    echo ""
    echo "内容预览："
    head -5 .env.local
else
    echo "⚠️  .env.local 不存在"
    echo ""
    echo "正在创建 .env.local..."
    cat > .env.local << 'EOF'
# 开发环境配置
PROJECT_DOMAIN=http://localhost:3000

# 其他配置
NODE_ENV=development
EOF
    echo "✅ .env.local 创建成功"
fi
echo ""

# 总结
echo "=================================="
echo "✅ 检查完成！"
echo "=================================="
echo ""
echo "环境状态："
echo "  Node.js：$NODE_VERSION"
echo "  npm：$NPM_VERSION"
echo "  pnpm：$PNPM_VERSION"
echo "  项目依赖：已安装"
echo "  环境变量：已配置"
echo ""
echo "=================================="
echo "🚀 下一步操作："
echo "=================================="
echo ""
echo "1. 编译项目："
echo "   pnpm build:ttapp"
echo ""
echo "2. 启动后端服务："
echo "   cd server && pnpm start:dev"
echo ""
echo "3. 导入到抖音开发者工具："
echo "   - 选择 dist 目录"
echo "   - AppID：tt27f0514db990b96201"
echo ""
echo "=================================="
echo "📖 相关文档："
echo "=================================="
echo "- 新手快速参考：NEWBIE_REFERENCE.md"
echo "- 新手详细教程：NEWBIE_INSTALL_GUIDE.md"
echo "- 快速开始指南：QUICKSTART.md"
echo ""
