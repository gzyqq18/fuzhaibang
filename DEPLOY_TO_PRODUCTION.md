# 抖音云部署完整指南 - 上线步骤

## 🎯 部署概述

本文档将指导你完成整个项目的部署上线流程：
- 后端部署到抖音云
- 前端部署到抖音小程序平台
- 配置生产环境域名和参数

---

## 📋 部署前检查清单

### ✅ 后端准备

- [ ] Dockerfile 已配置完成
- [ ] .dockerignore 已配置完成
- [ ] 健康检查接口 `/api/health` 已实现
- [ ] 后端代码已编译完成（`pnpm build:server`）
- [ ] 数据库已创建并配置好连接信息
- [ ] AI 服务 API Key 已获取

### ✅ 前端准备

- [ ] 小程序代码已编译完成（`pnpm build:ttapp`）
- [ ] 广告 ID 已配置：`n5yyapes8ozdabvmi0`
- [ ] 小程序 AppID 已申请
- [ ] 小程序基本信息已填写

### ✅ 配置准备

- [ ] Supabase 数据库连接信息
- [ ] AI 服务 API Key
- [ ] 抖音云账号已开通
- [ ] 小程序账号已开通

---

## 🔧 后端部署到抖音云

### 步骤 1：准备后端代码

```powershell
# 1. 进入 server 目录
cd D:\AI\douyinDemo\projects\server

# 2. 安装依赖
npm.cmd install

# 3. 编译后端代码
npm.cmd run build

# 4. 验证编译产物
dir dist
```

**预期输出**：
```
dist/app.controller.js
dist/app.controller.js.map
dist/app.module.js
dist/main.js
...
```

---

### 步骤 2：准备 Docker 镜像

#### 方式 A：使用抖音云构建（推荐新手）

**优势**：
- ✅ 无需本地构建 Docker 镜像
- ✅ 抖音云自动构建
- ✅ 配置简单

**步骤**：

1. **提交代码到 Git 仓库**
   ```powershell
   # 初始化 Git（如果还没有）
   git init
   git add .
   git commit -m "准备部署到抖音云"
   
   # 推送到 GitHub/GitLab
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```

2. **登录抖音云控制台**
   - 访问：https://cloud.douyin.com/
   - 登录你的账号

3. **创建新服务**
   - 点击「创建应用」
   - 选择「从代码仓库导入」
   - 选择你的 Git 仓库
   - 选择分支：`main`
   - 设置服务名称：`fuzhaibang-backend`

4. **配置构建参数**
   ```yaml
   构建类型：Dockerfile
   Dockerfile 路径：server/Dockerfile
   构建上下文：server/
   ```

5. **配置环境变量**（见下方详细说明）

6. **点击「开始构建」**

---

#### 方式 B：本地构建 Docker 镜像

**前提条件**：
- 已安装 Docker Desktop
- 熟悉 Docker 命令

**步骤**：

1. **构建 Docker 镜像**
   ```powershell
   cd D:\AI\douyinDemo\projects\server
   docker build -t fuzhaibang-backend:latest .
   ```

2. **登录抖音云镜像仓库**
   ```powershell
   docker login <douyin-cloud-registry>
   ```

3. **标记镜像**
   ```powershell
   docker tag fuzhaibang-backend:latest <douyin-cloud-registry>/fuzhaibang-backend:latest
   ```

4. **推送镜像**
   ```powershell
   docker push <douyin-cloud-registry>/fuzhaibang-backend:latest
   ```

5. **在抖音云控制台配置服务使用新镜像**

---

### 步骤 3：配置环境变量

在抖音云控制台中，进入你的服务配置页面，添加以下环境变量：

```bash
# ========== 数据库配置 ==========
DATABASE_URL=postgresql://user:password@host:5432/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# ========== AI 服务配置 ==========
AI_API_KEY=your-ai-api-key
AI_MODEL=doubao-seed-2-0-pro-260215

# ========== OSS 配置（如需） ==========
OSS_ACCESS_KEY=your-oss-access-key
OSS_SECRET_KEY=your-oss-secret-key
OSS_BUCKET=your-bucket-name
OSS_REGION=your-region

# ========== 应用配置 ==========
NODE_ENV=production
PORT=3000
```

**重要提示**：
- 📝 请替换上述占位符为实际值
- 🔒 不要泄露敏感信息
- ✅ 确保 Supabase 允许抖音云 IP 访问

---

### 步骤 4：配置服务参数

在抖音云控制台中配置以下参数：

```yaml
服务名称：fuzhaibang-backend
实例数量：1
CPU：2 核
内存：4GB
端口：3000
健康检查：
  路径：/api/health
  端口：3000
  检查间隔：30秒
  超时：3秒
  失败阈值：3次
```

---

### 步骤 5：启动服务

1. 点击「部署」按钮
2. 等待部署完成（约 2-5 分钟）
3. 查看部署日志确认启动成功

**成功标志**：
- ✅ 服务状态显示「运行中」
- ✅ 健康检查显示「健康」
- ✅ 日志显示 `Nest application successfully started`

---

### 步骤 6：验证后端服务

部署完成后，获取抖音云提供的访问地址，测试服务：

```powershell
# 替换为抖音云提供的实际地址
curl https://your-service-id.douyincloud.com/api/health
```

**预期响应**：
```json
{
  "status": "ok",
  "timestamp": "2025-02-21T12:00:00.000Z",
  "uptime": 123.456
}
```

**如果返回 200，说明后端部署成功！** ✅

---

## 📱 前端部署到抖音小程序

### 步骤 1：准备前端代码

```powershell
# 1. 进入项目根目录
cd D:\AI\douyinDemo\projects

# 2. 安装依赖（如果还没有）
npm.cmd install --legacy-peer-deps

# 3. 编译小程序
npm.cmd run build:ttapp
```

**预期输出**：
```
✓ built in 5.85s
```

---

### 步骤 2：更新生产环境配置

编辑 `.env.local` 文件，更新 `PROJECT_DOMAIN` 为抖音云提供的地址：

```env
# 开发环境
# PROJECT_DOMAIN=https://64dacf48-a65a-4f6c-9fb4-f05851730eb1.dev.coze.site

# 生产环境
PROJECT_DOMAIN=https://your-service-id.douyincloud.com
```

**重新编译**：
```powershell
npm.cmd run build:ttapp
```

---

### 步骤 3：上传代码到抖音开放平台

1. **登录抖音开放平台**
   - 访问：https://developer.open-douyin.com/
   - 登录你的账号

2. **进入小程序管理**
   - 点击「应用管理」
   - 选择你的小程序

3. **上传代码**

   在抖音开发者工具中：
   - 点击「上传」按钮
   - 填写版本号：`1.0.0`
   - 填写项目备注：`首次上线`
   - 点击「上传」

4. **提交审核**

   - 在抖音开放平台中
   - 进入「版本管理」
   - 找到刚才上传的版本
   - 点击「提交审核」
   - 填写审核信息：
     - 版本说明：首次上线
     - 功能描述：负债人自救指南小程序
   - 点击「提交」

5. **等待审核**

   - 审核时间：1-3 个工作日
   - 审核结果会通过邮件通知

---

### 步骤 4：配置服务器域名（必须）

在审核通过后，必须配置服务器域名才能正式发布：

1. **进入「开发管理」**
   - 在抖音开放平台中
   - 点击「开发管理」

2. **配置服务器域名**
   - 找到「服务器域名」配置项
   - 添加以下域名：
     ```
     request 合法域名：https://your-service-id.douyincloud.com
     uploadFile 合法域名：https://your-service-id.douyincloud.com
     downloadFile 合法域名：https://your-service-id.douyincloud.com
     ```

3. **保存配置**

---

### 步骤 5：发布上线

审核通过并配置好域名后：

1. **进入「版本管理」**
   - 在抖音开放平台中
   - 找到已审核通过的版本
   - 点击「发布」

2. **确认发布**
   - 确认版本信息
   - 点击「确认发布」

3. **发布成功**
   - 小程序正式上线
   - 用户可以搜索并使用

---

## 🔒 安全配置

### 1. 域名 HTTPS

确保所有域名都使用 HTTPS：

```env
PROJECT_DOMAIN=https://your-service-id.douyincloud.com
```

**不要使用 HTTP**：
```env
# ❌ 错误
PROJECT_DOMAIN=http://your-service-id.douyincloud.com
```

---

### 2. 敏感信息保护

**不要提交到 Git 仓库**：
- ✅ 使用 `.env.local` 存储敏感信息
- ✅ 在抖音云控制台配置环境变量
- ❌ 不要在代码中硬编码 API Key

**`.gitignore` 配置**：
```
.env.local
.env.production
*.key
```

---

### 3. 数据库访问控制

在 Supabase 中配置 IP 白名单：

1. 登录 Supabase 控制台
2. 进入「Settings」>「Database」
3. 找到「Connection Pooling」
4. 添加抖音云的 IP 地址到白名单

---

## 📊 监控与日志

### 查看服务日志

在抖音云控制台中：

1. 进入你的服务详情
2. 点击「日志」
3. 选择「实时日志」或「历史日志」
4. 查看日志输出

**关键日志**：
```
[Nest] 1234 - [System] Starting Nest application...
[Nest] 1234 - [System] Nest application successfully started
```

---

### 监控服务状态

在抖音云控制台中查看：

- **CPU 使用率**：应 < 80%
- **内存使用率**：应 < 90%
- **接口响应时间**：应 < 1000ms
- **健康检查状态**：应显示「健康」

---

## 🚨 故障排查

### 问题 1：服务启动失败

**症状**：
- 服务状态显示「异常」
- 健康检查失败

**解决方案**：
1. 查看服务日志
2. 检查环境变量配置
3. 确认端口配置正确
4. 验证数据库连接

---

### 问题 2：接口调用失败

**症状**：
- 前端无法访问后端
- 返回 500 错误

**解决方案**：
1. 检查 `PROJECT_DOMAIN` 配置
2. 确认后端服务正常运行
3. 验证域名是否已添加到白名单
4. 检查网络连接

---

### 问题 3：数据库连接失败

**症状**：
- 日志显示数据库连接错误
- API 返回 500 错误

**解决方案**：
1. 验证 `DATABASE_URL` 配置
2. 确认 Supabase 允许抖音云 IP 访问
3. 检查数据库服务是否正常运行

---

### 问题 4：小程序审核被拒

**常见原因**：
- 未配置服务器域名
- 功能描述不完整
- 缺少必要的服务协议

**解决方案**：
1. 完善小程序基本信息
2. 配置服务器域名
3. 补充服务协议和隐私政策
4. 重新提交审核

---

## ✅ 部署检查清单

### 后端部署

- [ ] 代码已提交到 Git 仓库
- [ ] 抖音云服务已创建
- [ ] 环境变量已配置
- [ ] 服务参数已配置
- [ ] 服务已启动
- [ ] 健康检查通过
- [ ] 接口测试通过

### 前端部署

- [ ] 小程序代码已编译
- [ ] `PROJECT_DOMAIN` 已更新为生产环境地址
- [ ] 代码已上传到抖音开放平台
- [ ] 审核已通过
- [ ] 服务器域名已配置
- [ ] 小程序已发布上线

### 安全配置

- [ ] 域名使用 HTTPS
- [ ] 敏感信息已保护
- [ ] 数据库 IP 白名单已配置
- [ ] 环境变量已正确配置

---

## 🎉 部署完成

恭喜！你的小程序已经成功部署上线了！

### 下一步

1. **监控服务状态**
   - 定期查看服务日志
   - 监控性能指标
   - 设置告警规则

2. **收集用户反馈**
   - 关注用户评价
   - 收集功能需求
   - 优化用户体验

3. **持续优化**
   - 根据数据优化功能
   - 修复发现的问题
   - 发布新版本

---

## 📞 需要帮助？

如果在部署过程中遇到问题：

1. 查看日志信息
2. 检查配置是否正确
3. 参考抖音云官方文档
4. 联系抖音云技术支持

---

**祝你部署顺利！** 🚀

**小程序上线成功后，记得分享一下！** 🎉
