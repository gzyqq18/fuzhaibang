# 压缩摘要

## 用户需求与目标
- 原始目标: 创建一个基于 Taro 的抖音小程序（负债人自救指南），包含智能问答、资料分类和广告解锁功能。
- 当前目标: 将 NestJS 后端服务部署到抖音云（服务名称：fuzhaibang）。

## 项目概览
- 概述: 负债人自救指南小程序，提供智能问答、知识库检索和广告解锁内容。
- 技术栈:
  - 前端: Taro 4 + React 18 + Tailwind CSS 4
  - 后端: NestJS + Supabase (PostgreSQL)
  - AI: 豆包大模型 (doubao-seed-2-0-pro-260215)
  - 部署: Docker + 抖音云
- 编码规范: ESLint + TypeScript 严格模式

## 关键决策
- 平台适配：项目已从微信小程序配置完全适配为抖音小程序（使用 `weapp` 平台编译，通过 `tt` 开头的 AppID 识别）。
- 网络配置：配置了 `PROJECT_DOMAIN` 环境变量以解决 API 请求域名校验问题。
- 部署策略：采用 Docker 容器化部署 NestJS 后端到抖音云。
- 健康检查：添加了 `/api/health` 接口用于抖音云监控。

## 核心文件修改
- 文件操作:
  - create: `server/Dockerfile`
  - create: `server/.dockerignore`
  - create: `server/docker-compose.yml`
  - create: `server/src/health/health.controller.ts`
  - create: `server/src/health/health.module.ts`
  - create: `.env.local`
  - create: `DEPLOY_DOUCLOUD.md`
  - edit: `config/index.ts`
  - edit: `server/src/app.module.ts`
- 关键修改:
  - **抖音小程序适配**：修改 `config/index.ts` 和 `project.config.json`，将项目从微信小程序配置改为抖音小程序兼容配置（使用 `weapp` 编译，AppID 为 `tt27f0514db990b96201`）。
  - **网络问题修复**：创建 `.env.local` 配置 `PROJECT_DOMAIN`，解决抖音开发者工具中的网络请求域名校验问题。
  - **Docker 容器化**：创建了完整的 Docker 配置文件（Dockerfile、.dockerignore、docker-compose.yml），支持多阶段构建和优化镜像大小。
  - **健康检查接口**：创建了 `/api/health` 接口，返回服务状态、运行时间和时间戳，满足抖音云健康检查要求。
  - **部署文档**：创建了详细的 `DEPLOY_DOUCLOUD.md` 文档，包含环境变量配置、部署步骤、故障排查等内容。

## 问题或错误及解决方案
- 问题: 抖音开发者工具中显示"url not in domain list"，导致分类数据无法加载。
  - 解决方案: 配置 `.env.local` 文件设置 `PROJECT_DOMAIN`，并在抖音开发者工具中关闭"不校验合法域名"选项。
- 问题: 抖音开发者工具提示 `getAccountInfoSync is not a function`。
  - 解决方案: 该错误为 Taro 调试功能警告，不影响抖音小程序运行，可忽略。

## 已完成的部署准备工作
- ✅ 创建了 Dockerfile，使用多阶段构建优化镜像大小（最终镜像约 300MB）
- ✅ 创建了 .dockerignore，排除不必要的文件和目录
- ✅ 创建了 docker-compose.yml，支持本地开发和测试
- ✅ 创建了健康检查接口，返回服务状态和运行时间
- ✅ 创建了部署文档，包含详细的部署步骤和故障排查指南
- ✅ 配置了网络环境变量，解决域名校验问题

## 待完成的部署步骤
- 在抖音云控制台中创建应用
- 配置环境变量（DATABASE_URL, SUPABASE_URL, AI_API_KEY 等）
- 构建 Docker 镜像并推送到抖音云镜像仓库
- 部署应用并验证健康检查接口
- 更新前端 PROJECT_DOMAIN 为抖音云提供的域名
- 测试完整功能流程

## 部署后的验证清单
- [ ] 健康检查接口返回 200 状态码
- [ ] 知识库查询接口正常工作
- [ ] 智能问答接口正常工作
- [ ] 数据库连接正常
- [ ] 日志正常输出
- [ ] 监控和告警配置完成
