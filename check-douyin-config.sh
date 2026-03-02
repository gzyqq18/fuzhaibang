#!/bin/bash

# 抖音云配置检查脚本

echo "========================================"
echo "  抖音云配置检查工具"
echo "========================================"
echo ""

# 检查 .env.local 文件
if [ ! -f ".env.local" ]; then
    echo "❌ 错误：.env.local 文件不存在"
    echo ""
    echo "请运行以下命令创建配置文件："
    echo "  cp .env.example .env.local"
    echo ""
    echo "然后编辑 .env.local 文件，设置正确的 PROJECT_DOMAIN"
    exit 1
fi

echo "✅ 找到 .env.local 文件"
echo ""

# 读取 PROJECT_DOMAIN
PROJECT_DOMAIN=$(grep "^PROJECT_DOMAIN=" .env.local | cut -d'=' -f2)

if [ -z "$PROJECT_DOMAIN" ]; then
    echo "❌ 错误：PROJECT_DOMAIN 未配置"
    echo ""
    echo "请在 .env.local 文件中设置 PROJECT_DOMAIN，例如："
    echo "  PROJECT_DOMAIN=https://app-1234567890.douyincloud.com"
    exit 1
fi

echo "当前配置的 PROJECT_DOMAIN: $PROJECT_DOMAIN"
echo ""

# 检查是否是 Coze 开发环境域名
if [[ "$PROJECT_DOMAIN" == *"dev.coze.site"* ]]; then
    echo "⚠️  警告：检测到 Coze 开发环境域名"
    echo "   如果您正在部署到抖音云，请修改为抖音云应用的公网域名"
    echo ""
    echo "详细配置步骤请参考：DOUYIN_CLOUD_SETUP.md"
    echo ""
fi

# 检查是否是 localhost
if [[ "$PROJECT_DOMAIN" == *"localhost"* ]]; then
    echo "⚠️  警告：检测到 localhost 域名"
    echo "   localhost 域名仅适用于本地开发环境"
    echo "   生产环境必须使用抖音云公网域名"
    echo ""
fi

# 测试网络连接
echo "正在测试网络连接..."
echo ""

if command -v curl &> /dev/null; then
    # 使用 curl 测试
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROJECT_DOMAIN/api/health" 2>/dev/null)

    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ 后端服务连接成功（HTTP 200）"
        echo ""
    elif [ "$HTTP_CODE" = "000" ]; then
        echo "❌ 无法连接到后端服务"
        echo "   请检查："
        echo "   1. 域名是否正确"
        echo "   2. 后端服务是否正常运行"
        echo "   3. 网络连接是否正常"
        echo ""
        exit 1
    else
        echo "⚠️  后端服务返回异常状态码：$HTTP_CODE"
        echo "   请检查后端服务是否正常启动"
        echo ""
        exit 1
    fi
elif command -v wget &> /dev/null; then
    # 使用 wget 测试
    if wget -q --spider "$PROJECT_DOMAIN/api/health" 2>/dev/null; then
        echo "✅ 后端服务连接成功"
        echo ""
    else
        echo "❌ 无法连接到后端服务"
        echo "   请检查域名和网络连接"
        echo ""
        exit 1
    fi
else
    echo "⚠️  警告：未找到 curl 或 wget 工具，无法测试网络连接"
    echo "   请手动访问以下 URL 验证服务是否正常："
    echo "   $PROJECT_DOMAIN/api/health"
    echo ""
fi

# 检查小程序配置
echo "检查小程序配置..."
echo ""

if [ -f "project.config.json" ]; then
    URL_CHECK=$(grep -A 5 '"setting"' project.config.json | grep '"urlCheck"' | cut -d':' -f2 | tr -d ' ,"')

    if [ "$URL_CHECK" = "true" ]; then
        echo "✅ 小程序已启用域名检查（urlCheck = true）"
        echo "   确保已在小程序后台配置服务器域名白名单"
        echo ""
    else
        echo "⚠️  小程序已禁用域名检查（urlCheck = false）"
        echo "   这仅适用于开发环境，发布前请启用域名检查"
        echo ""
    fi
else
    echo "⚠️  未找到 project.config.json 文件"
    echo ""
fi

echo "========================================"
echo "  检查完成"
echo "========================================"
echo ""
echo "如果所有检查都通过，您可以："
echo "1. 编译小程序：pnpm build:weapp"
echo "2. 在抖音开发者工具中打开 dist 目录"
echo "3. 上传并发布小程序"
echo ""
echo "如果遇到问题，请查看："
echo "- DOUYIN_CLOUD_SETUP.md（详细配置指南）"
echo "- 抖音云控制台（查看服务状态和日志）"
echo ""
