#!/bin/bash

# 快速修复脚本 - 解决抖音开发者工具导入问题
# 使用方法：./fix-import-issue.sh

set -e

echo "=================================="
echo "抖音开发者工具导入问题快速修复"
echo "=================================="
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请先进入项目根目录"
    echo "   使用命令：cd /workspace/projects"
    exit 1
fi

echo "✅ 当前目录：$(pwd)"
echo ""

# 步骤 1：清理旧的 dist 目录
echo "📁 步骤 1：清理旧的 dist 目录..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "   ✅ 已删除旧的 dist 目录"
else
    echo "   ℹ️  dist 目录不存在，跳过删除"
fi
echo ""

# 步骤 2：重新编译项目
echo "🔨 步骤 2：重新编译项目..."
pnpm build:ttapp
if [ $? -eq 0 ]; then
    echo "   ✅ 编译成功"
else
    echo "   ❌ 编译失败"
    exit 1
fi
echo ""

# 步骤 3：检查 dist 目录
echo "📂 步骤 3：检查 dist 目录..."
if [ -d "dist" ]; then
    echo "   ✅ dist 目录已创建"

    # 检查关键文件
    if [ -f "dist/app.js" ] && [ -f "dist/app.json" ] && [ -f "dist/project.config.json" ]; then
        echo "   ✅ 关键文件完整"
    else
        echo "   ❌ 关键文件缺失"
        exit 1
    fi
else
    echo "   ❌ dist 目录未创建"
    exit 1
fi
echo ""

# 步骤 4：修改权限
echo "🔒 步骤 4：修改目录权限..."
chmod -R 755 dist/
echo "   ✅ 权限已设置为 755"
echo ""

# 步骤 5：显示导入信息
echo "=================================="
echo "✅ 修复完成！"
echo "=================================="
echo ""
echo "请在抖音开发者工具中导入项目："
echo ""
echo "📁 导入目录：$(pwd)/dist"
echo "🆔 AppID：tt27f0514db990b96201"
echo "📝 项目名称：负债人自救指南"
echo ""
echo "=================================="
echo "文件列表："
echo "=================================="
ls -lh dist/ | head -20
echo ""
echo "=================================="
echo "📖 详细文档："
echo "=================================="
echo "- 故障排查指南：TROUBLESHOOTING.md"
echo "- 快速开始指南：QUICKSTART.md"
echo "- 详细操作指南：STEP_BY_STEP_GUIDE.md"
echo ""
