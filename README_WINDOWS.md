# Windows 用户快速修复指南

## 🚨 你遇到了 pnpm 未安装的问题

**错误信息**：
```
pnpm : 无法将"pnpm"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

**别担心！这是 Windows 新手最常见的问题，按照下面的步骤就能解决！**

---

## ⚡ 快速解决方案（3 分钟）

### 方案 1：一键修复（推荐）

```powershell
# 1. 下载环境检查脚本
# 文件：check-setup-windows.ps1

# 2. 右键点击文件 > "使用 PowerShell 运行"

# 3. 脚本会自动检查和修复所有问题
```

### 方案 2：手动安装（5 分钟）

```powershell
# 1. 检查 npm 是否已安装
npm --version

# 如果显示版本号，继续第 2 步
# 如果提示找不到命令，先安装 Node.js（见下方）

# 2. 安装 pnpm
npm install -g pnpm

# 3. 关闭所有 PowerShell 窗口
# （重要！必须关闭）

# 4. 重新打开 PowerShell

# 5. 验证安装
pnpm --version

# 6. 如果显示版本号，说明安装成功！
```

---

## 📦 如果 npm 也没有安装

### 第一步：下载 Node.js

1. 访问：https://nodejs.org/
2. 点击"下载"按钮
3. 下载 Windows 安装包（`.msi` 文件）

### 第二步：安装 Node.js

1. 双击下载的安装包
2. 点击"Next"（下一步）
3. 接受许可协议，点击"Next"
4. 使用默认路径，点击"Next"
5. 点击"Install"（安装）
6. 等待安装完成
7. 点击"Finish"（完成）

### 第三步：关闭并重新打开 PowerShell

**重要**：必须关闭所有 PowerShell 窗口，然后重新打开！

### 第四步：安装 pnpm

```powershell
# 1. 验证 npm 安装
npm --version

# 2. 安装 pnpm
npm install -g pnpm

# 3. 再次关闭并重新打开 PowerShell

# 4. 验证 pnpm
pnpm --version
```

---

## 🔧 常见问题

### Q: 安装完成后仍然提示找不到命令？

**A**: 关闭所有 PowerShell 窗口，重新打开。如果还不行，重启电脑。

### Q: 提示"权限不足"？

**A**: 以管理员身份运行 PowerShell：
1. 在开始菜单中搜索 "PowerShell"
2. 右键点击，选择"以管理员身份运行"

### Q: 安装速度很慢？

**A**: 使用淘宝镜像加速：
```powershell
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
```

### Q: 网络连接失败？

**A**: 检查网络连接，或使用手机热点。

---

## ✅ 验证安装成功

按照以下步骤验证：

```powershell
# 1. 检查 Node.js
node --version
# 应该显示：v20.x.x

# 2. 检查 npm
npm --version
# 应该显示：9.x.x

# 3. 检查 pnpm
pnpm --version
# 应该显示：9.x.x

# 4. 进入项目目录
cd Desktop\projects

# 5. 安装依赖
pnpm install

# 6. 如果显示 "Done in X.Xs"，说明成功了！
```

---

## 📖 相关文档

| 文档 | 用途 |
|------|------|
| 🔧 **FIX_PNPM_NOT_FOUND.md** | 快速修复指南（当前文档） |
| 📘 **INSTALL_PNPM_WINDOWS.md** | 详细安装教程 |
- 🔍 **check-setup-windows.ps1** | 一键环境检查脚本 |
| 🎯 **NEWBIE_REFERENCE.md** | 新手快速参考 |
| 📖 **NEWBIE_INSTALL_GUIDE.md** | 新手详细教程 |

---

## 🎯 下一步

安装成功后：

1. **进入项目目录**：
   ```powershell
   cd Desktop\projects
   ```

2. **安装依赖**：
   ```powershell
   pnpm install
   ```

3. **编译项目**：
   ```powershell
   pnpm build:ttapp
   ```

4. **导入到抖音开发者工具**：
   - 选择 `dist` 目录
   - AppID：`tt27f0514db990b96201`

---

## 💡 提示

- ⚠️ 安装完成后，必须关闭并重新打开 PowerShell
- ⚠️ 如果提示权限不足，以管理员身份运行
- ⚠️ 如果网络慢，使用淘宝镜像加速

---

**现在试试看！按照上面的步骤操作，你一定能成功！** 💪🚀
