# 快速开始指南

## 5 分钟快速部署抖音小程序

### 第一步：下载抖音开发者工具

1. 访问 https://developer.open-douyin.com/
2. 下载"抖音开发者工具"
3. 安装并登录抖音账号

### 第二步：编译项目

```bash
# 确保在项目根目录
cd /workspace/projects

# 安装依赖（首次运行）
pnpm install

# 编译抖音小程序
pnpm build:ttapp
```

编译成功后，会在 `dist` 目录生成代码。

### 第三步：导入项目到抖音开发者工具

1. 打开抖音开发者工具
2. 点击"导入项目"
3. 填写以下信息：
   - **项目名称**：负债人自救指南
   - **目录**：选择 `dist` 目录（不是根目录）
   - **AppID**：`tt27f0514db990b96201`
4. 点击"导入"

### 第四步：关闭域名校验（仅开发环境）

在抖音开发者工具中：

1. 点击右上角"详情"
2. 找到"本地设置"
3. ✅ 勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"

### 第五步：启动后端服务

打开新终端：

```bash
# 进入 server 目录
cd /workspace/projects/server

# 启动后端服务
pnpm start:dev
```

后端服务会在 `http://localhost:3000` 启动。

### 第六步：预览小程序

在抖音开发者工具中：

1. 点击"预览"按钮
2. 使用抖音 APP 扫描二维码
3. 在手机上查看小程序效果

---

## 常见问题速查

### ❌ 导入项目时提示"文件系统错误"？

**快速修复**：
```bash
# 使用一键修复脚本
./fix-import-issue.sh

# 或手动修复
rm -rf dist
pnpm build:ttapp
chmod -R 755 dist/
```

**详细排查**：查看 `TROUBLESHOOTING.md` 故障排查指南

### ❌ 白屏怎么办？

```bash
# 重新编译前端
pnpm build:ttapp
```

### ❌ 显示"url not in domain list"？

确认是否关闭了域名校验（见第四步）。

### ❌ API 请求失败？

确认后端服务是否启动：

```bash
# 检查后端服务
curl http://localhost:3000/api/health

# 应该返回：
# {"status":"ok","timestamp":"...","uptime":...}
```

---

## 完整开发流程

### 使用热更新（推荐）

```bash
# 启动开发环境（前端 + 后端）
coze dev
```

优势：
- 修改代码自动编译
- 抖音开发者工具自动刷新
- 无需手动重启服务

### 手动编译流程

如果热更新不可用：

```bash
# 终端 1：启动后端
cd server
pnpm start:dev

# 终端 2：监听前端文件变化
pnpm build:ttapp --watch

# 修改代码后，dist 目录会自动更新
# 抖音开发者工具会自动刷新
```

---

## 修改代码后的操作

### 修改前端代码

```bash
# 1. 修改代码
# 编辑 src/pages/index/index.tsx

# 2. 如果使用 coze dev
# 等待自动编译完成（约 2-5 秒）

# 3. 如果手动编译
pnpm build:ttapp

# 4. 抖音开发者工具自动刷新
# 查看效果
```

### 修改后端代码

```bash
# 1. 修改代码
# 编辑 server/src/knowledge/knowledge.controller.ts

# 2. 如果使用 coze dev
# 后端服务自动重启（约 5-10 秒）

# 3. 如果手动启动
# 后端服务会自动重启（使用 pnpm start:dev）

# 4. 测试接口
curl http://localhost:3000/api/health
```

---

## 调试技巧

### 查看前端日志

在抖音开发者工具中：

1. 点击"调试"按钮
2. 查看控制台日志

### 查看后端日志

```bash
# 查看实时日志
tail -f /tmp/coze-logs/dev.log

# 查看最近 50 行日志
tail -50 /tmp/coze-logs/dev.log
```

### 测试 API 接口

```bash
# 测试健康检查
curl http://localhost:3000/api/health

# 测试知识库查询
curl -X POST http://localhost:3000/api/knowledge/query \
  -H "Content-Type: application/json" \
  -d '{"query":"债务咨询"}'

# 测试智能问答
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"我该怎么办？"}'
```

---

## 上传和发布

### 上传代码到抖音开放平台

在抖音开发者工具中：

1. 点击"上传"按钮
2. 填写版本号（如：1.0.0）
3. 填写项目备注
4. 点击"上传"

### 提交审核

1. 访问 https://developer.open-douyin.com/
2. 进入"控制台" > "应用管理" > "版本管理"
3. 找到上传的版本，点击"提交审核"
4. 填写审核信息，点击"提交"

### 发布上线

审核通过后，在"版本管理"页面点击"发布"。

---

## 进阶配置

### 配置合法域名（生产环境）

1. 访问 https://developer.open-douyin.com/
2. 进入"控制台" > "应用管理" > "开发管理"
3. 配置服务器域名：
   - **request 合法域名**：`https://<your-backend-domain>.com`
   - **uploadFile 合法域名**：`https://<your-backend-domain>.com`
   - **downloadFile 合法域名**：`https://<your-backend-domain>.com`

4. 在抖音开发者工具中，取消勾选"不校验合法域名"

### 部署后端到抖音云

参考 `DEPLOY_DOUCLOUD.md` 文档。

---

## 需要帮助？

- 📖 详细部署指南：`DOUYIN_DEV_GUIDE.md`
- 📖 抖音云部署指南：`DEPLOY_DOUCLOUD.md`
- 📖 项目摘要：`SUMMARY.md`
- 📖 完整 README：`README.md`

---

**开始开发吧！** 🚀
