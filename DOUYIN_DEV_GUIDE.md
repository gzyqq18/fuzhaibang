# 抖音开发者工具部署指南

本指南介绍如何使用抖音开发者工具部署"负债人自救指南"小程序。

## 前置要求

1. **下载抖音开发者工具**
   - 访问：https://developer.open-douyin.com/
   - 下载"抖音开发者工具"（支持 Windows、macOS）

2. **获取抖音小程序 AppID**
   - 访问：https://developer.open-douyin.com/
   - 登录后进入"控制台"
   - 点击"创建应用" > "小程序"
   - 填写应用信息，获取 AppID（格式：`ttxxxxxxxxxxxx`）
   - 当前项目已使用的 AppID：`tt27f0514db990b96201`

## 本地开发环境配置

### 1. 安装依赖

```bash
# 进入项目目录
cd /workspace/projects

# 安装依赖
pnpm install
```

### 2. 编译项目

```bash
# 编译抖音小程序
pnpm build:ttapp

# 或者使用 npm
npm run build:ttapp
```

编译成功后，会在 `dist` 目录生成抖音小程序代码。

### 3. 配置环境变量

确保项目根目录有 `.env.local` 文件：

```bash
# .env.local
PROJECT_DOMAIN=http://localhost:3000
```

## 抖音开发者工具部署步骤

### Step 1：导入项目

1. 打开抖音开发者工具
2. 点击"导入项目"
3. 填写项目信息：
   - **项目名称**：负债人自救指南
   - **目录**：选择项目的 `dist` 目录（不是根目录）
   - **AppID**：`tt27f0514db990b96201`
4. 点击"导入"

**注意**：抖音开发者工具需要导入编译后的 `dist` 目录，而不是源代码目录。

### Step 2：配置开发环境

#### 2.1 关闭域名校验（仅开发环境）

在抖音开发者工具中：

1. 点击右上角"详情"
2. 找到"本地设置"
3. 勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"

**⚠️ 重要**：发布到正式环境前，需要取消此勾选并配置合法域名。

#### 2.2 配置服务器域名

在抖音开放平台配置合法域名：

1. 访问：https://developer.open-douyin.com/
2. 进入"控制台" > "应用管理" > "开发管理"
3. 配置服务器域名：
   - **request 合法域名**：`https://<your-backend-domain>.com`
   - **uploadFile 合法域名**：`https://<your-backend-domain>.com`
   - **downloadFile 合法域名**：`https://<your-backend-domain>.com`

### Step 3：启动后端服务

```bash
# 进入 server 目录
cd server

# 启动后端服务（开发模式）
pnpm start:dev

# 或者使用 npm
npm run start:dev
```

后端服务会在 `http://localhost:3000` 启动。

### Step 4：预览和调试

#### 4.1 实时预览

在抖音开发者工具中：

1. 点击"预览"按钮
2. 使用抖音 APP 扫描二维码
3. 在手机上查看小程序效果

#### 4.2 调试工具

在抖音开发者工具中：

1. 点击"调试"按钮
2. 打开控制台查看日志
3. 查看 Network 面板检查网络请求
4. 使用 Elements 面板检查元素样式

#### 4.3 常见调试技巧

**查看网络请求**：
```javascript
// 在代码中添加日志
console.log('请求 URL:', url)
console.log('请求参数:', data)
console.log('响应结果:', response)
```

**检查环境变量**：
```javascript
// 在 app.tsx 中添加
console.log('PROJECT_DOMAIN:', process.env.PROJECT_DOMAIN)
```

## 上传和发布

### Step 5：上传代码

在抖音开发者工具中：

1. 点击右上角"上传"按钮
2. 填写版本号（如：1.0.0）
3. 填写项目备注（如：首次上传）
4. 点击"上传"

### Step 6：提交审核

1. 访问：https://developer.open-douyin.com/
2. 进入"控制台" > "应用管理" > "版本管理"
3. 找到刚才上传的版本
4. 点击"提交审核"
5. 填写审核信息：
   - **版本号**：1.0.0
   - **更新说明**：负债人自救指南小程序上线
   - **功能描述**：提供智能问答、知识库检索等功能
6. 点击"提交"

### Step 7：发布上线

审核通过后：

1. 在"版本管理"页面点击"发布"
2. 填写发布说明
3. 点击"确定发布"

## 热更新开发流程

### 使用 coze dev（推荐）

项目支持热更新，修改代码会自动重新编译：

```bash
# 启动开发环境（前端 + 后端）
coze dev

# 或者在项目根目录
pnpm dev
```

优势：
- 前端修改会自动编译到 `dist` 目录
- 后端修改会自动重启服务
- 抖音开发者工具会自动刷新

### 手动编译

如果 `coze dev` 不可用，使用手动编译：

```bash
# 终端 1：启动后端
cd server
pnpm start:dev

# 终端 2：编译前端（监听模式）
pnpm build:ttapp --watch

# 或者在 package.json 中添加 watch 脚本
# "watch:ttapp": "taro build --type weapp --watch"
```

## 常见问题排查

### 1. 白屏问题

**症状**：小程序打开后显示空白页面

**排查**：
- 检查控制台是否有错误信息
- 确认 `dist` 目录下有 `app.js` 文件
- 检查 Network 面板，确认 API 请求是否成功

**解决**：
```bash
# 重新编译前端
pnpm build:ttapp

# 清除缓存后重启抖音开发者工具
```

### 2. 网络请求失败

**症状**：显示"url not in domain list"

**排查**：
- 检查是否关闭了域名校验
- 检查 `.env.local` 文件是否配置了 `PROJECT_DOMAIN`
- 检查后端服务是否启动

**解决**：
```bash
# 方案 1：关闭域名校验（开发环境）
# 在抖音开发者工具 > 详情 > 本地设置 > 不校验合法域名

# 方案 2：配置合法域名（生产环境）
# 在抖音开放平台配置服务器域名

# 方案 3：检查环境变量
echo $PROJECT_DOMAIN
```

### 3. 后端接口调用失败

**症状**：前端请求返回 404 或 500 错误

**排查**：
```bash
# 检查后端服务是否启动
curl http://localhost:3000/api/health

# 检查后端日志
tail -f /tmp/coze-logs/dev.log
```

**解决**：
```bash
# 重启后端服务
cd server
pnpm start:dev

# 检查数据库连接
# 确认 DATABASE_URL 环境变量已配置
```

### 4. 样式显示异常

**症状**：H5 端显示正常，小程序端样式错乱

**原因**：跨端兼容性问题

**检查点**：
- Text 组件是否添加了 `block` 类
- Input 组件是否用 View 包裹
- Fixed + Flex 布局是否使用了 inline style

**解决**：
```tsx
// ✅ 正确：Text 添加 block 类
<Text className="block text-lg">标题</Text>

// ✅ 正确：Input 用 View 包裹
<View className="bg-gray-50 rounded-lg p-3">
  <Input className="w-full" placeholder="请输入" />
</View>

// ✅ 正确：Fixed + Flex 使用 inline style
<View style={{ position: 'fixed', display: 'flex', bottom: 0 }}>
  <Button>按钮</Button>
</View>
```

### 5. getAccountInfoSync 错误

**症状**：控制台显示 `getAccountInfoSync is not a function`

**原因**：Taro 调试功能警告，不影响抖音小程序运行

**解决**：忽略此警告，不影响正常使用

## 生产环境部署

### 1. 更新环境变量

将 `.env.local` 中的 `PROJECT_DOMAIN` 更新为抖音云提供的域名：

```bash
# .env.local
PROJECT_DOMAIN=https://<your-service-id>.douyincloud.com
```

### 2. 重新编译

```bash
# 重新编译前端
pnpm build:ttapp

# 重新编译后端
cd server
pnpm build
```

### 3. 上传到抖音云

按照 `DEPLOY_DOUCLOUD.md` 文档部署后端到抖音云。

### 4. 更新小程序代码

```bash
# 重新编译前端（使用生产环境变量）
pnpm build:ttapp

# 在抖音开发者工具中上传新版本
```

### 5. 提交审核和发布

参考上面的"上传和发布"章节。

## 开发最佳实践

### 1. 代码修改流程

```bash
# 1. 修改代码
# 编辑 src/pages/index/index.tsx

# 2. 自动编译（coze dev 已启动）
# 等待自动编译完成

# 3. 抖音开发者工具自动刷新
# 查看效果

# 4. 调试问题
# 使用控制台查看日志
```

### 2. 版本管理

```bash
# 提交代码
git add .
git commit -m "feat: 新增功能"
git push

# 创建版本标签
git tag v1.0.0
git push origin v1.0.0
```

### 3. 测试清单

发布前确保完成以下测试：

- [ ] 功能测试：所有功能正常工作
- [ ] 兼容性测试：在不同机型上测试
- [ ] 网络测试：弱网和正常网络下测试
- [ ] 异常测试：网络错误、接口超时等场景
- [ ] 性能测试：启动速度、页面加载速度
- [ ] 安全测试：敏感信息是否泄露

## 相关文档

- 📄 抖音开放平台文档：https://developer.open-douyin.com/docs
- 📄 抖音云部署指南：`DEPLOY_DOUCLOUD.md`
- 📄 项目摘要：`SUMMARY.md`
- 📄 开发规范：`README.md`

## 技术支持

如遇到问题，可以：

1. 查看抖音开发者工具控制台日志
2. 查看抖音开放平台文档
3. 在项目 Issues 中提问
4. 联系技术支持团队

---

**最后更新**：2025-01-09
**版本**：1.0.0
