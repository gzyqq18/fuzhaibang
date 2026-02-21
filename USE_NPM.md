# Windows 用户：使用 npm 代替 pnpm

## 🎯 推荐做法

为了避免 PowerShell 脚本执行策略的问题，**建议使用 npm 代替 pnpm**。

## 📋 常用命令对照表

| pnpm 命令 | npm 命令 | 说明 |
|-----------|----------|------|
| `pnpm install` | `npm install` | 安装依赖 |
| `pnpm build:ttapp` | `npm run build:ttapp` | 编译抖音小程序 |
| `pnpm build` | `npm run build` | 构建所有 |
| `pnpm dev` | `npm run dev` | 启动开发模式 |
| `pnpm start:dev` | `npm run start:dev` | 启动开发服务 |

## 🚀 快速开始

### 安装依赖

```powershell
npm install
```

### 编译项目

```powershell
npm run build:ttapp
```

### 启动开发模式

```powershell
npm run dev
```

## ✅ 优势

- ✅ 不需要修改系统设置
- ✅ 不受 PowerShell 策略限制
- ✅ 安全性更高
- ✅ 更简单的使用方式

## 📝 注意事项

- 确保 `package.json` 中有对应的 scripts
- 如果某个命令不工作，检查 package.json 配置
- 大多数情况下，`npm run` 可以替代 `pnpm` 命令

## 🔍 查看 package.json

```powershell
# 查看 package.json 中的 scripts
type package.json
```

查找 `scripts` 部分，确认有对应的命令。

---

**推荐：使用 npm 代替 pnpm，更简单更安全！** ✅
