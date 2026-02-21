# Windows 快速修复：pnpm 未安装

## ❌ 错误信息

```
pnpm : 无法将"pnpm"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

## ✅ 快速解决方案

### 方案 1：使用 npm 安装（推荐）

```powershell
# 1. 检查 npm 是否已安装
npm --version

# 2. 如果显示版本号，安装 pnpm
npm install -g pnpm

# 3. 关闭并重新打开 PowerShell（重要！）

# 4. 验证安装
pnpm --version
```

### 方案 2：先安装 Node.js（如果 npm 也没有）

```powershell
# 1. 下载 Node.js
# 访问：https://nodejs.org/
# 下载并安装 LTS 版本

# 2. 关闭并重新打开 PowerShell

# 3. 验证 npm
npm --version

# 4. 安装 pnpm
npm install -g pnpm

# 5. 再次关闭并重新打开 PowerShell

# 6. 验证 pnpm
pnpm --version
```

### 方案 3：使用官方脚本

```powershell
# 1. 运行安装脚本
iwr https://get.pnpm.io/install.ps1 -useb | iex

# 2. 关闭并重新打开 PowerShell

# 3. 验证安装
pnpm --version
```

---

## 🚨 重要提示

### ⚠️ 必须关闭并重新打开 PowerShell

安装完成后，**必须关闭所有 PowerShell 窗口，然后重新打开**，否则新安装的工具无法被识别！

### ⚠️ 以管理员身份运行（如果提示权限不足）

1. 在开始菜单中搜索 "PowerShell"
2. 右键点击 "Windows PowerShell"
3. 选择 "以管理员身份运行"
4. 点击"是"

---

## 🔧 常见问题

### Q: 安装完成后仍然提示找不到命令？

**A**: 关闭所有 PowerShell 窗口，重新打开。如果还不行，重启电脑。

### Q: 提示"权限不足"？

**A**: 以管理员身份运行 PowerShell。

### Q: 安装速度很慢？

**A**: 使用淘宝镜像加速：

```powershell
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
```

### Q: 网络连接失败？

**A**: 检查网络连接，或使用手机热点。

---

## 📋 完整操作流程

```powershell
# 1. 检查 npm
npm --version

# 2. 安装 pnpm
npm install -g pnpm

# 3. 关闭并重新打开 PowerShell

# 4. 验证 pnpm
pnpm --version

# 5. 进入项目目录
cd Desktop\projects

# 6. 安装依赖
pnpm install
```

---

## ✅ 验证清单

在继续之前，确保：

- [ ] 已关闭并重新打开 PowerShell
- [ ] `npm --version` 显示版本号
- [ ] `pnpm --version` 显示版本号
- [ ] 已进入项目目录
- [ ] `pnpm install` 成功执行

---

## 📖 详细教程

- 📘 **INSTALL_PNPM_WINDOWS.md** - Windows 安装 pnpm 详细指南
- 🎯 **NEWBIE_REFERENCE.md** - 新手快速参考
- 📖 **NEWBIE_INSTALL_GUIDE.md** - 新手详细教程

---

**现在试试看！** 💪

---

## 🔧 额外问题：PowerShell 脚本执行限制

### Q: 提示"无法加载文件 pnpm.ps1，因为在此系统上禁止运行脚本"？

**A**: 这是 Windows PowerShell 的安全策略限制。

**解决方案 1：使用 npm 代替 pnpm（推荐）**
```powershell
npm run build:ttapp
```

**解决方案 2：临时允许执行脚本**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
pnpm build:ttapp
```

**详细教程**：查看 **FIX_POWERSHELL_POLICY.md**
