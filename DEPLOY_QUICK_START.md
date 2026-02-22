# 🚀 5 分钟部署抖音云快速开始

## 📋 部署前检查

### ✅ 必备条件

- [ ] 抖音云账号已开通（https://cloud.douyin.com/）
- [ ] 小程序账号已开通（https://developer.open-douyin.com/）
- [ ] Supabase 数据库已创建
- [ ] AI 服务 API Key 已获取
- [ ] 代码已推送到 Git 仓库

---

## 🔧 后端部署（抖音云）

### 步骤 1：提交代码

```powershell
cd D:\AI\douyinDemo\projects
git init
git add .
git commit -m "准备部署到抖音云"
git remote add origin <你的仓库地址>
git push -u origin main
```

---

### 步骤 2：创建抖音云服务

1. **登录抖音云控制台**
   - 访问：https://cloud.douyin.com/
   - 登录你的账号

2. **创建新服务**
   - 点击「创建应用」
   - 选择「从代码仓库导入」
   - 选择你的 Git 仓库
   - 选择分支：`main`

3. **配置构建参数**
   ```
   构建类型：Dockerfile
   Dockerfile 路径：server/Dockerfile
   构建上下文：server/
   ```

4. **配置环境变量**
   ```bash
   DATABASE_URL=postgresql://user:password@host:5432/postgres
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_KEY=your-service-key
   AI_API_KEY=your-ai-api-key
   AI_MODEL=doubao-seed-2-0-pro-260215
   NODE_ENV=production
   PORT=3000
   ```

5. **配置服务参数**
   ```
   服务名称：fuzhaibang-backend
   CPU：2 核
   内存：4GB
   端口：3000
   健康检查路径：/api/health
   ```

6. **启动服务**
   - 点击「部署」
   - 等待部署完成（约 2-5 分钟）
   - 确认服务状态显示「运行中」

---

### 步骤 3：验证后端服务

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

## 📱 前端部署（抖音小程序）

### 步骤 1：更新配置

编辑 `.env.local` 文件：

```env
# 生产环境
PROJECT_DOMAIN=https://your-service-id.douyincloud.com
```

---

### 步骤 2：重新编译

```powershell
cd D:\AI\douyinDemo\projects
npm.cmd run build:ttapp
```

---

### 步骤 3：上传代码

在抖音开发者工具中：

1. 点击「上传」按钮
2. 填写版本号：`1.0.0`
3. 填写项目备注：`首次上线`
4. 点击「上传」

---

### 步骤 4：提交审核

1. 登录 https://developer.open-douyin.com/
2. 进入「应用管理」>「版本管理」
3. 找到刚才上传的版本
4. 点击「提交审核」
5. 填写审核信息：
   - 版本说明：首次上线
   - 功能描述：负债人自救指南小程序
6. 点击「提交」

**审核时间：1-3 个工作日** ⏱️

---

### 步骤 5：配置服务器域名（必须）

审核通过后，必须配置服务器域名：

1. 进入「开发管理」>「服务器域名」
2. 添加以下域名：
   ```
   request 合法域名：https://your-service-id.douyincloud.com
   uploadFile 合法域名：https://your-service-id.douyincloud.com
   downloadFile 合法域名：https://your-service-id.douyincloud.com
   ```

---

### 步骤 6：发布上线

1. 审核通过后，在「版本管理」中点击「发布」
2. 确认发布
3. **小程序正式上线！** 🎉

---

## ✅ 部署检查清单

### 后端部署

- [ ] 代码已推送到 Git 仓库
- [ ] 抖音云服务已创建
- [ ] 环境变量已配置
- [ ] 服务已启动
- [ ] 健康检查通过
- [ ] 接口测试通过

### 前端部署

- [ ] `PROJECT_DOMAIN` 已更新
- [ ] 小程序代码已编译
- [ ] 代码已上传
- [ ] 审核已通过
- [ ] 服务器域名已配置
- [ ] 小程序已发布

---

## 📊 部署后验证

### 测试后端服务

```powershell
# 测试健康检查
curl https://your-service-id.douyincloud.com/api/health

# 测试分类接口
curl https://your-service-id.douyincloud.com/api/knowledge/categories
```

### 测试前端小程序

1. 在抖音中搜索你的小程序
2. 打开小程序
3. 测试各项功能：
   - [ ] 分类列表显示
   - [ ] 内容查看
   - [ ] 广告解锁
   - [ ] 智能问答

---

## 🔒 安全提醒

### ⚠️ 重要提示

- ✅ 确保所有域名使用 HTTPS
- ✅ 不要在代码中硬编码敏感信息
- ✅ 在抖音云控制台配置环境变量
- ✅ 配置数据库 IP 白名单

---

## 🆘 遇到问题？

### 后端问题

1. 查看抖音云控制台日志
2. 检查环境变量配置
3. 验证数据库连接

### 前端问题

1. 检查 `PROJECT_DOMAIN` 配置
2. 确认服务器域名已添加到白名单
3. 查看抖音开发者工具日志

### 获取帮助

- 📚 详细文档：[DEPLOY_TO_PRODUCTION.md](DEPLOY_TO_PRODUCTION.md)
- ✅ 检查清单：[DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)
- ☁️ 抖音云文档：https://cloud.douyin.com/docs
- 📱 抖音开放平台：https://developer.open-douyin.com/

---

## 🎉 部署完成！

恭喜！你的小程序已经成功部署上线了！

### 下一步

1. **监控服务状态**
   - 查看抖音云控制台
   - 监控性能指标

2. **测试所有功能**
   - 测试分类列表
   - 测试内容查看
   - 测试广告解锁
   - 测试智能问答

3. **收集用户反馈**
   - 关注用户评价
   - 收集功能需求

---

**祝你部署顺利！** 🚀

**有任何问题随时查阅详细文档！** 📚
