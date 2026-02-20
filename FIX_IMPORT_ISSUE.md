# 快速修复抖音开发者工具导入问题

## 问题

导入项目到抖音开发者工具时提示：**"文件系统错误：文件不存在或无权限访问"**

## 快速解决方案

### 方法 1：使用一键修复脚本（推荐）

```bash
# 确保在项目根目录
cd /workspace/projects

# 运行修复脚本
./fix-import-issue.sh
```

脚本会自动完成以下操作：
1. ✅ 清理旧的 dist 目录
2. ✅ 重新编译项目
3. ✅ 检查关键文件
4. ✅ 修改目录权限
5. ✅ 显示导入信息

### 方法 2：手动修复

```bash
# 确保在项目根目录
cd /workspace/projects

# 1. 清理旧的 dist 目录
rm -rf dist

# 2. 重新编译项目
pnpm build:ttapp

# 3. 修改权限
chmod -R 755 dist/

# 4. 验证编译结果
ls -la dist/
```

### 方法 3：使用 coze dev（开发模式）

```bash
# 启动开发环境（会自动编译）
coze dev
```

## 导入项目

修复完成后，在抖音开发者工具中：

1. 点击"导入项目"
2. 选择 `dist` 目录（完整路径：`/workspace/projects/dist`）
3. 填写项目信息：
   - 项目名称：负债人自救指南
   - AppID：`tt27f0514db990b96201`
4. 点击"导入"

## 验证修复

### 检查关键文件

```bash
# 查看目录内容
ls -la dist/

# 应该看到以下文件：
# app.js
# app.json
# pages/
# project.config.json
# taro.js
# ...
```

### 检查权限

```bash
# 查看目录权限
ls -ld dist/

# 应该显示：drwxr-xr-x (755)
```

## 常见问题

### 问题 1：脚本无法执行

```bash
# 添加执行权限
chmod +x fix-import-issue.sh

# 再次运行
./fix-import-issue.sh
```

### 问题 2：编译失败

```bash
# 检查依赖是否安装
pnpm install

# 重新编译
pnpm build:ttapp
```

### 问题 3：仍然无法导入

1. 检查抖音开发者工具版本，更新到最新版
2. 以管理员身份运行抖音开发者工具
3. 查看 `TROUBLESHOOTING.md` 详细排查指南

## 详细文档

- 📖 **故障排查指南**：`TROUBLESHOOTING.md` - 详细的问题排查和解决方案
- 📖 **快速开始指南**：`QUICKSTART.md` - 5 分钟快速部署
- 📖 **详细操作指南**：`STEP_BY_STEP_GUIDE.md` - 依赖安装、编译、环境配置

## 一键命令

```bash
# 快速修复并导入
cd /workspace/projects && ./fix-import-issue.sh
```

---

**祝你开发顺利！** 🚀
