# 详细操作指南

本指南提供详细的命令行操作步骤，帮助你完成依赖安装、项目编译和环境配置。

---

## 第一步：安装依赖 (pnpm install)

### 方式一：使用终端命令（推荐）

#### 1. 确认当前目录

```bash
# 进入项目根目录
cd /workspace/projects

# 确认当前目录
pwd

# 应该显示：/workspace/projects
```

#### 2. 安装项目依赖

```bash
# 安装项目依赖（包括前端和后端）
pnpm install

# 或者使用 npm（不推荐）
npm install
```

#### 3. 安装过程说明

安装过程会显示类似以下输出：

```
Packages: +XYZ
...
Progress: resolved XYZ, reused X, downloaded Y, added Z
...
Done in X.Xs
```

如果安装成功，会显示 "Done" 或 "Successfully installed"。

#### 4. 验证安装

```bash
# 检查 node_modules 是否存在
ls -la | grep node_modules

# 应该看到 node_modules 目录
```

### 方式二：分别安装前端和后端依赖

如果全局安装失败，可以分别安装：

```bash
# 安装项目根目录依赖
pnpm install

# 进入 server 目录
cd server

# 安装后端依赖
pnpm install

# 返回根目录
cd ..
```

### 常见问题

**问题 1：pnpm 命令不存在**

```bash
# 安装 pnpm
npm install -g pnpm

# 验证安装
pnpm --version
```

**问题 2：网络慢或失败**

```bash
# 使用国内镜像
pnpm config set registry https://registry.npmmirror.com

# 重新安装
pnpm install
```

**问题 3：权限错误**

```bash
# Linux/Mac
sudo pnpm install

# Windows（以管理员身份运行 PowerShell）
pnpm install
```

---

## 第二步：配置环境变量 (.env.local)

### 方式一：使用命令行创建（推荐）

#### 1. 确认当前目录

```bash
# 确认在项目根目录
pwd

# 应该显示：/workspace/projects
```

#### 2. 创建 .env.local 文件

```bash
# 创建 .env.local 文件
cat > .env.local << 'EOF'
# 开发环境配置
PROJECT_DOMAIN=http://localhost:3000

# 数据库配置（本地开发使用）
# DATABASE_URL=postgresql://user:password@localhost:5432/postgres

# AI 服务配置
# AI_API_KEY=your-ai-api-key
# AI_MODEL=doubao-seed-2-0-pro-260215

# 其他配置
NODE_ENV=development
EOF
```

#### 3. 验证文件创建

```bash
# 查看文件内容
cat .env.local

# 应该显示：
# PROJECT_DOMAIN=http://localhost:3000
# NODE_ENV=development
```

### 方式二：使用编辑器创建

#### 1. 创建文件

使用你喜欢的编辑器（VS Code、Vim、Nano 等）：

```bash
# 使用 VS Code
code .env.local

# 或使用 Vim
vim .env.local

# 或使用 Nano
nano .env.local
```

#### 2. 添加内容

在文件中添加以下内容：

```bash
# 开发环境配置
PROJECT_DOMAIN=http://localhost:3000

# 数据库配置（本地开发使用）
# DATABASE_URL=postgresql://user:password@localhost:5432/postgres

# AI 服务配置
# AI_API_KEY=your-ai-api-key
# AI_MODEL=doubao-seed-2-0-pro-260215

# 其他配置
NODE_ENV=development
```

#### 3. 保存文件

- **VS Code**：Ctrl+S 保存
- **Vim**：按 `Esc`，输入 `:wq`，按 `Enter`
- **Nano**：按 `Ctrl+O`，按 `Enter`，按 `Ctrl+X`

### 方式三：使用 echo 命令（简单快速）

```bash
# 创建文件
echo "PROJECT_DOMAIN=http://localhost:3000" > .env.local
echo "NODE_ENV=development" >> .env.local

# 验证文件
cat .env.local
```

### 环境变量说明

| 变量名 | 说明 | 开发环境值 | 生产环境值 |
|--------|------|------------|------------|
| PROJECT_DOMAIN | 后端服务域名 | http://localhost:3000 | https://xxx.douyincloud.com |
| DATABASE_URL | 数据库连接字符串 | （可选） | 必需 |
| SUPABASE_URL | Supabase 项目 URL | （可选） | 必需 |
| AI_API_KEY | AI 服务 API 密钥 | （可选） | 必需 |
| AI_MODEL | AI 模型名称 | doubao-seed-2-0-pro-260215 | 同左 |
| NODE_ENV | 运行环境 | development | production |

### 生产环境配置示例

当部署到抖音云时，需要配置完整的环境变量：

```bash
# .env.local（生产环境）
PROJECT_DOMAIN=https://your-service-id.douyincloud.com

# 数据库配置
DATABASE_URL=postgresql://user:password@db-host:5432/postgres
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

# 运行环境
NODE_ENV=production
PORT=3000
```

### 常见问题

**问题 1：文件已存在**

```bash
# 备份原文件
cp .env.local .env.local.backup

# 重新创建
cat > .env.local << 'EOF'
PROJECT_DOMAIN=http://localhost:3000
NODE_ENV=development
EOF
```

**问题 2：环境变量未生效**

```bash
# 确认文件在项目根目录
ls -la .env.local

# 确认文件名正确（以 . 开头）
# 不应该是 env.local 或 .env.local.txt
```

---

## 第三步：编译项目 (pnpm build:ttapp)

### 方式一：使用终端命令（推荐）

#### 1. 确认当前目录

```bash
# 确认在项目根目录
pwd

# 应该显示：/workspace/projects
```

#### 2. 编译抖音小程序

```bash
# 编译抖音小程序
pnpm build:ttapp

# 或者使用完整命令
pnpm exec taro build --type weapp
```

#### 3. 编译过程说明

编译过程会显示类似以下输出：

```
👽 Taro v4.1.9
[dotenv@17.2.3] injecting env (1) from .env.local -- tip: 📡 add observability to secrets: https://dotenvx.com/ops
ℹ tailwindcss-patcher 绑定 Tailwind CSS -> node_modules/.pnpm/@tailwindcss+postcss@4.1.18/node_modules/@tailwindcss/postcss (v4.1.18)
✔ 当前使用 Tailwind CSS 版本为: 4.1.18
vite v4.5.14 building for production...
transforming...
✓ 154 modules transformed.
rendering chunks...
computing gzip size...
dist/app.wxss                     0.03 kB
dist/pages/index/index.wxml       0.08 kB
dist/pages/detail/index.wxml      0.08 kB
dist/pages/category/index.wxml    0.08 kB
dist/pages/chat/index.wxml        0.08 kB
dist/pages/index/index.json       0.09 kB │ gzip:  0.11 kB
dist/pages/detail/index.json      0.09 kB │ gzip:  0.11 kB
dist/pages/category/index.json    0.09 kB │ gzip:  0.11 kB
dist/pages/chat/index.json        0.09 kB │ gzip:  0.11 kB
dist/comp.json                    0.11 kB │ gzip:  0.11 kB
dist/comp.wxml                    0.14 kB
dist/app.json                     0.30 kB │ gzip:  0.20 kB
dist/utils.wxs                    1.00 kB
dist/app-origin.wxss             16.27 kB
dist/base.wxml                   58.07 kB
dist/comp.js                      0.12 kB │ gzip:  0.11 kB
dist/common.js                    0.83 kB │ gzip:  0.45 kB
dist/app.js                       0.89 kB │ gzip:  0.58 kB
dist/pages/category/index.js      3.71 kB │ gzip:  1.43 kB
dist/pages/chat/index.js          3.73 kB │ gzip:  1.31 kB
dist/pages/index/index.js         5.12 kB │ gzip:  1.69 kB
dist/pages/detail/index.js        5.52 kB │ gzip:  1.56 kB
dist/babelHelpers.js              5.60 kB │ gzip:  2.04 kB
dist/taro.js                    224.02 kB │ gzip: 70.67 kB
✓ built in 6.44s
```

**关键信息**：
- `✓ built in 6.44s` - 编译成功
- `dist/` 目录下生成了编译后的文件

#### 4. 验证编译结果

```bash
# 查看 dist 目录
ls -la dist/

# 应该看到以下文件：
# app.js
# app.json
# app.wxss
# base.wxml
# comp.js
# comp.json
# comp.wxml
# common.js
# pages/ 目录
# utils.wxs
```

### 方式二：使用 watch 模式（开发时推荐）

```bash
# 启动监听模式，文件变化时自动编译
pnpm build:ttapp --watch

# 或者添加到 package.json 后使用
# "watch:ttapp": "taro build --type weapp --watch"
```

使用 watch 模式后，修改代码会自动重新编译。

### 方式三：同时编译所有平台

```bash
# 编译所有平台（Web、抖音小程序、后端）
pnpm build

# 这会同时执行：
# pnpm build:web
# pnpm build:ttapp
# pnpm build:server
```

### 编译输出说明

编译成功后，`dist` 目录结构如下：

```
dist/
├── app.js                    # 主入口文件
├── app.json                  # 小程序配置
├── app.wxss                  # 全局样式
├── base.wxml                 # 基础组件模板
├── comp.js                   # 组件代码
├── comp.json                 # 组件配置
├── comp.wxml                 # 组件模板
├── common.js                 # 公共代码
├── utils.wxs                 # 工具函数
└── pages/                    # 页面目录
    ├── index/                # 首页
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    ├── category/             # 分类页
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    ├── chat/                 # 聊天页
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    └── detail/               # 详情页
        ├── index.js
        ├── index.json
        ├── index.wxml
        └── index.wxss
```

### 常见问题

**问题 1：编译失败，提示环境变量未定义**

```bash
# 确认 .env.local 文件存在
ls -la .env.local

# 如果不存在，创建文件
echo "PROJECT_DOMAIN=http://localhost:3000" > .env.local
```

**问题 2：编译成功但抖音开发者工具报错**

```bash
# 清理缓存后重新编译
rm -rf dist
pnpm build:ttapp

# 或者在抖音开发者工具中：
# 点击"清缓存" > "清除全部缓存"
```

**问题 3：编译速度慢**

```bash
# 使用 pnpm 缓存加速
pnpm config set store-dir ~/.pnpm-store

# 或使用 npm
npm config set cache ~/.npm-cache
```

---

## 完整操作流程总结

### 第一次初始化项目

```bash
# 1. 进入项目根目录
cd /workspace/projects

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cat > .env.local << 'EOF'
PROJECT_DOMAIN=http://localhost:3000
NODE_ENV=development
EOF

# 4. 编译项目
pnpm build:ttapp

# 5. 验证编译结果
ls -la dist/
```

### 日常开发流程

```bash
# 1. 修改代码
# 编辑 src/pages/index/index.tsx

# 2. 重新编译
pnpm build:ttapp

# 3. 抖音开发者工具自动刷新
```

### 使用热更新（推荐）

```bash
# 启动开发环境（自动编译）
coze dev

# 修改代码后，dist 目录会自动更新
# 抖音开发者工具会自动刷新
```

---

## 验证步骤

### 1. 验证依赖安装

```bash
# 检查 node_modules 目录
ls -la node_modules/

# 检查 package.json 中的依赖是否已安装
ls -la node_modules/@tarojs/
```

### 2. 验证环境变量

```bash
# 查看环境变量文件
cat .env.local

# 应该显示：
# PROJECT_DOMAIN=http://localhost:3000
# NODE_ENV=development
```

### 3. 验证编译结果

```bash
# 检查 dist 目录
ls -la dist/

# 检查关键文件是否存在
ls -la dist/app.js
ls -la dist/app.json
ls -la dist/pages/index/index.js
```

### 4. 测试项目

```bash
# 启动后端服务
cd server
pnpm start:dev

# 在另一个终端中
cd /workspace/projects

# 使用抖音开发者工具打开 dist 目录
# 点击"预览"按钮查看效果
```

---

## 下一步

完成以上步骤后，参考以下文档：

1. **导入到抖音开发者工具**：`QUICKSTART.md`
2. **详细部署指南**：`DOUYIN_DEV_GUIDE.md`
3. **抖音云部署**：`DEPLOY_DOUCLOUD.md`

---

**祝你开发顺利！** 🚀
