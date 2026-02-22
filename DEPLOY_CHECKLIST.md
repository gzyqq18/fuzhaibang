# 🚀 部署快速检查清单

## 📋 部署前准备

### 后端准备

- [ ] 代码已提交到 Git 仓库
- [ ] 后端代码已编译：`cd server && npm run build`
- [ ] Dockerfile 已配置完成
- [ ] 健康检查接口正常：`http://localhost:3000/api/health`

### 前端准备

- [ ] 小程序代码已编译：`npm run build:ttapp`
- [ ] 广告 ID 已配置：`n5yyapes8ozdabvmi0`
- [ ] 小程序 AppID 已申请

### 配置准备

- [ ] Supabase 数据库已创建
- [ ] 数据库连接信息已准备好
- [ ] AI 服务 API Key 已获取
- [ ] 抖音云账号已开通
- [ ] 小程序账号已开通

---

## 🔧 后端部署（抖音云）

### 步骤 1：提交代码

```powershell
git init
git add .
git commit -m "准备部署到抖音云"
git remote add origin <你的仓库地址>
git push -u origin main
```

- [ ] 代码已推送到 Git 仓库

### 步骤 2：创建服务

1. 登录 https://cloud.douyin.com/
2. 点击「创建应用」
3. 选择「从代码仓库导入」
4. 选择你的 Git 仓库

- [ ] 抖音云服务已创建

### 步骤 3：配置构建参数

```
构建类型：Dockerfile
Dockerfile 路径：server/Dockerfile
构建上下文：server/
```

- [ ] 构建参数已配置

### 步骤 4：配置环境变量

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

- [ ] 数据库配置已填写
- [ ] AI 服务配置已填写
- [ ] 应用配置已填写

### 步骤 5：配置服务参数

```
服务名称：fuzhaibang-backend
CPU：2 核
内存：4GB
端口：3000
健康检查路径：/api/health
```

- [ ] 服务参数已配置

### 步骤 6：启动服务

- [ ] 点击「部署」
- [ ] 等待部署完成
- [ ] 服务状态显示「运行中」
- [ ] 健康检查显示「健康」

### 步骤 7：验证后端服务

```powershell
curl https://your-service-id.douyincloud.com/api/health
```

- [ ] 返回 200 状态码
- [ ] 返回 `{"status":"ok",...}`

---

## 📱 前端部署（抖音小程序）

### 步骤 1：更新配置

编辑 `.env.local`：
```env
PROJECT_DOMAIN=https://your-service-id.douyincloud.com
```

- [ ] `PROJECT_DOMAIN` 已更新为抖音云地址

### 步骤 2：重新编译

```powershell
npm run build:ttapp
```

- [ ] 编译成功

### 步骤 3：上传代码

1. 打开抖音开发者工具
2. 点击「上传」
3. 填写版本号：`1.0.0`
4. 点击「上传」

- [ ] 代码已上传

### 步骤 4：提交审核

1. 登录 https://developer.open-douyin.com/
2. 进入「版本管理」
3. 点击「提交审核」
4. 填写审核信息

- [ ] 已提交审核
- [ ] 等待审核通过（1-3 个工作日）

### 步骤 5：配置服务器域名

1. 进入「开发管理」>「服务器域名」
2. 添加以下域名：
   ```
   request 合法域名：https://your-service-id.douyincloud.com
   uploadFile 合法域名：https://your-service-id.douyincloud.com
   downloadFile 合法域名：https://your-service-id.douyincloud.com
   ```

- [ ] 服务器域名已配置

### 步骤 6：发布上线

1. 审核通过后，在「版本管理」中点击「发布」
2. 确认发布

- [ ] 小程序已发布上线

---

## 🔒 安全检查

- [ ] 所有域名使用 HTTPS
- [ ] 敏感信息已保护（不在代码中）
- [ ] 数据库 IP 白名单已配置
- [ ] 环境变量已正确配置

---

## 📊 部署后验证

### 后端验证

- [ ] 服务正常运行
- [ ] 健康检查通过
- [ ] 接口响应正常
- [ ] 日志无错误

### 前端验证

- [ ] 小程序可以打开
- [ ] 分类列表正常显示
- [ ] 可以点击内容查看
- [ ] 广告功能正常
- [ ] 解锁功能正常

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

## 📞 遇到问题？

### 后端问题

1. 查看抖音云控制台日志
2. 检查环境变量配置
3. 验证数据库连接

### 前端问题

1. 检查 `PROJECT_DOMAIN` 配置
2. 确认服务器域名已添加到白名单
3. 查看抖音开发者工具日志

### 获取帮助

- 抖音云官方文档
- 抖音开放平台文档
- 联系技术支持

---

**祝你部署顺利！** 🚀
