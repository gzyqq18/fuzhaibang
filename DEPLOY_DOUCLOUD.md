# 抖音云部署指南

## 概述
本指南介绍如何将 NestJS 后端服务部署到抖音云（服务名称：fuzhaibang）。

## 前置要求
- 抖音云账号已开通
- 项目代码已完成 Docker 化
- Supabase 数据库已创建
- 环境变量已准备

## 部署步骤

### 1. 环境变量配置

在抖音云控制台中配置以下环境变量：

```bash
# 数据库配置（Supabase）
DATABASE_URL=postgresql://user:password@host:5432/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# AI 服务配置
AI_API_KEY=your-ai-api-key
AI_MODEL=doubao-seed-2-0-pro-260215

# OSS 配置（如需）
OSS_ACCESS_KEY=your-oss-access-key
OSS_SECRET_KEY=your-oss-secret-key
OSS_BUCKET=your-bucket-name
OSS_REGION=your-region

# 应用配置
NODE_ENV=production
PORT=3000
```

### 2. Docker 配置

项目已包含以下 Docker 配置文件：

- **Dockerfile**: 定义镜像构建过程
- **.dockerignore**: 排除不需要打包的文件
- **docker-compose.yml**: 本地开发测试配置

### 3. 构建与部署

#### 方式一：通过抖音云控制台部署

1. 登录抖音云控制台
2. 进入服务管理页面
3. 选择「fuzhaibang」服务
4. 点击「创建应用」
5. 选择「从代码仓库导入」或「上传 Docker 镜像」
6. 配置环境变量
7. 点击「部署」

#### 方式二：通过 CLI 部署

```bash
# 1. 构建镜像
docker build -t fuzhaibang-backend:latest .

# 2. 登录抖音云镜像仓库
docker login <douyin-cloud-registry>

# 3. 推送镜像
docker tag fuzhaibang-backend:latest <douyin-cloud-registry>/fuzhaibang-backend:latest
docker push <douyin-cloud-registry>/fuzhaibang-backend:latest

# 4. 在抖音云控制台配置服务使用新镜像
```

### 4. 健康检查验证

部署完成后，通过健康检查接口验证服务状态：

```bash
# 检查服务健康状态
curl https://<your-service-url>/api/health

# 预期响应
{
  "status": "ok",
  "timestamp": "2025-01-09T12:00:00.000Z",
  "uptime": 123.456
}
```

### 5. 日志查看

在抖音云控制台中可以查看实时日志：

```bash
# 或通过 CLI 查看日志
douyin logs fuzhaibang --tail 100 --follow
```

## 网络配置

### 服务端口

- 后端服务端口：3000
- 健康检查端口：3000

### API 域名

部署完成后，抖音云会提供以下访问地址：

```
https://<service-id>.douyincloud.com
```

前端需要更新 `PROJECT_DOMAIN` 环境变量为抖音云提供的域名。

## 数据库配置

### Supabase 连接

确保 Supabase 数据库已配置允许抖音云 IP 访问：

1. 登录 Supabase 控制台
2. 进入 Project Settings > Database
3. 在 Connection Pooling 中配置连接字符串
4. 在 Database Authentication 中添加抖音云 IP 到白名单

### 数据库迁移

```bash
# 进入 server 目录
cd server

# 运行迁移
pnpm migration:run

# 如需回滚
pnpm migration:revert
```

## 监控与告警

### 健康检查

抖音云会定期调用 `/api/health` 接口进行健康检查：

- 检查频率：每 30 秒
- 失败阈值：连续 3 次失败
- 恢复阈值：连续 2 次成功

### 日志级别

生产环境日志级别设置为 `error` 和 `warn`：

```typescript
// src/main.ts
app.useLogger(new Logger('Production', { level: 'error' }));
```

### 告警配置

在抖音云控制台配置以下告警规则：

- CPU 使用率 > 80%
- 内存使用率 > 90%
- 接口响应时间 > 5000ms
- 错误率 > 5%

## 性能优化

### 容器资源

建议配置：

- CPU：2 核
- 内存：4GB
- 磁盘：20GB

### 环境变量优化

```bash
# 启用生产模式优化
NODE_ENV=production

# 启用日志压缩
LOG_COMPRESSION=true

# 启用响应缓存
CACHE_ENABLED=true
```

### 数据库连接池

```typescript
// TypeORM 配置
{
  type: 'postgres',
  extra: {
    max: 20,        // 最大连接数
    min: 5,         // 最小连接数
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
}
```

## 故障排查

### 常见问题

#### 1. 服务启动失败

**症状**：容器无法启动或立即退出

**排查**：
```bash
# 查看容器日志
docker logs <container-id>

# 检查环境变量是否正确配置
printenv | grep DATABASE_URL
```

**解决**：
- 确认所有环境变量已正确配置
- 检查数据库连接字符串格式
- 验证数据库是否可访问

#### 2. 健康检查失败

**症状**：健康检查接口返回非 200 状态码

**排查**：
```bash
# 手动调用健康检查接口
curl https://<service-url>/api/health
```

**解决**：
- 确认服务正在运行
- 检查端口是否正确监听
- 验证防火墙规则

#### 3. 数据库连接超时

**症状**：应用日志显示数据库连接超时

**排查**：
```bash
# 测试数据库连接
psql $DATABASE_URL -c "SELECT 1"
```

**解决**：
- 检查数据库白名单配置
- 增加连接超时时间
- 优化数据库连接池配置

#### 4. 内存不足

**症状**：容器因 OOM 被终止

**解决**：
- 增加容器内存配额
- 优化代码内存使用
- 启用内存泄漏监控

### 日志分析

```bash
# 查看错误日志
grep "ERROR" /var/log/app.log

# 查看特定时间段的日志
sed -n '/2025-01-09T12:00:00/,/2025-01-09T13:00:00/p' /var/log/app.log

# 统计错误数量
grep -c "ERROR" /var/log/app.log
```

## 安全配置

### API 密钥管理

- ✅ 使用抖音云密钥管理服务存储敏感信息
- ❌ 禁止在代码中硬编码密钥
- ❌ 禁止在日志中输出敏感信息

### 网络安全

- 仅开放必要的端口（3000）
- 配置 HTTPS/TLS 加密
- 启用 CORS 限制

### 数据安全

- 启用数据库加密
- 定期备份数据
- 实施访问控制策略

## 回滚策略

### 快速回滚

如果部署后发现问题，可以快速回滚到上一个版本：

```bash
# 1. 查看历史版本
douyin versions list fuzhaibang

# 2. 回滚到指定版本
douyin rollback fuzhaibang <version-id>
```

### 数据库回滚

```bash
# 回滚最后一个迁移
pnpm migration:revert

# 查看迁移状态
pnpm migration:show
```

## 附录

### 环境变量清单

| 变量名 | 必需 | 说明 | 示例 |
|-------|------|------|------|
| DATABASE_URL | ✅ | 数据库连接字符串 | postgresql://... |
| SUPABASE_URL | ✅ | Supabase 项目 URL | https://xxx.supabase.co |
| SUPABASE_ANON_KEY | ✅ | Supabase 公开密钥 | eyJhbGciOiJIUzI1NiIsInR5cCI6... |
| SUPABASE_SERVICE_KEY | ✅ | Supabase 服务密钥 | eyJhbGciOiJIUzI1NiIsInR5cCI6... |
| AI_API_KEY | ✅ | AI 服务 API 密钥 | your-ai-api-key |
| AI_MODEL | ✅ | AI 模型名称 | doubao-seed-2-0-pro-260215 |
| OSS_ACCESS_KEY | ❌ | OSS 访问密钥 | your-access-key |
| OSS_SECRET_KEY | ❌ | OSS 秘密密钥 | your-secret-key |
| OSS_BUCKET | ❌ | OSS 存储桶名称 | your-bucket |
| OSS_REGION | ❌ | OSS 区域 | cn-hangzhou |
| NODE_ENV | ✅ | 运行环境 | production |
| PORT | ✅ | 服务端口 | 3000 |

### 端口清单

| 端口 | 用途 | 说明 |
|------|------|------|
| 3000 | HTTP 服务 | NestJS 后端服务 |

### 依赖服务

| 服务 | 用途 | 连接方式 |
|------|------|----------|
| Supabase | 数据库 | PostgreSQL 连接字符串 |
| 豆包 AI | AI 服务 | HTTP API |
| OSS | 对象存储 | SDK 连接 |

## 联系支持

如有部署问题，请联系：

- 技术支持：[技术支持邮箱]
- 文档：[文档链接]
- 工单系统：[工单系统链接]
