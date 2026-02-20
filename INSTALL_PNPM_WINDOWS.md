# Windows 安装 pnpm 详细指南

## 错误信息

```
pnpm : 无法将"pnpm"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

**原因**：你的电脑上还没有安装 pnpm

**解决方案**：按照以下步骤安装 pnpm

---

## 方法 1：使用 npm 安装（推荐）

### 第一步：检查 npm 是否已安装

在 PowerShell 中输入：

```powershell
npm --version
```

**情况 A：显示版本号（例如：9.x.x）**
```
9.6.7
```
✅ 说明 npm 已安装，可以直接跳到"第二步：安装 pnpm"

**情况 B：提示找不到命令**
```
npm : 无法将"npm"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```
❌ 说明 npm 也没有安装，需要先安装 Node.js

### 第二步：安装 pnpm（如果 npm 已安装）

在 PowerShell 中输入：

```powershell
npm install -g pnpm
```

按 Enter 键，等待安装完成。

**预期输出**：
```
npm WARN deprecated ...
...
added 1 package in 10s
```

### 第三步：验证 pnpm 安装

在 PowerShell 中输入：

```powershell
pnpm --version
```

**成功显示**：
```
9.15.4
```
✅ 说明 pnpm 安装成功！

**仍然提示找不到命令**：尝试"方法 2"

---

## 方法 2：先安装 Node.js（如果 npm 也没有）

### 第一步：下载 Node.js

1. 访问 Node.js 官方网站：https://nodejs.org/
2. 点击"下载"按钮（推荐下载 LTS 版本，长期支持版）
3. 下载 Windows 安装包（例如：`node-v20.x.x-x64.msi`）

### 第二步：安装 Node.js

1. 双击下载的安装包（`.msi` 文件）
2. 点击"Next"（下一步）
3. 接受许可协议，点击"Next"
4. 选择安装路径（建议使用默认路径），点击"Next"
5. 点击"Next"（所有默认选项）
6. 点击"Install"（安装）
7. 等待安装完成
8. 点击"Finish"（完成）

### 第三步：关闭并重新打开 PowerShell

**重要**：安装完成后，必须关闭所有 PowerShell 窗口，然后重新打开，否则新安装的工具无法被识别。

### 第四步：验证 npm 安装

在新的 PowerShell 窗口中输入：

```powershell
npm --version
```

应该显示版本号（例如：`9.6.7`）

### 第五步：安装 pnpm

在 PowerShell 中输入：

```powershell
npm install -g pnpm
```

等待安装完成。

### 第六步：验证 pnpm 安装

在 PowerShell 中输入：

```powershell
pnpm --version
```

应该显示版本号（例如：`9.15.4`）

---

## 方法 3：使用官方安装脚本（如果上述方法都不行）

### 第一步：使用 PowerShell 脚本安装

在 PowerShell 中输入：

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

按 Enter 键，等待安装完成。

### 第二步：关闭并重新打开 PowerShell

**重要**：必须关闭并重新打开 PowerShell

### 第三步：验证 pnpm 安装

在新的 PowerShell 窗口中输入：

```powershell
pnpm --version
```

---

## 常见问题及解决方案

### 问题 1：安装完成后仍然提示找不到命令

**原因**：PowerShell 没有刷新环境变量

**解决方案**：

1. **关闭所有 PowerShell 窗口**
2. **重新打开 PowerShell**
3. **再次尝试**：`pnpm --version`

如果还是不行，尝试重启电脑。

### 问题 2：提示"权限不足"

**原因**：当前用户没有管理员权限

**解决方案**：

1. **以管理员身份运行 PowerShell**：
   - 在开始菜单中搜索 "PowerShell"
   - 右键点击 "Windows PowerShell"
   - 选择 "以管理员身份运行"
   - 点击"是"（如果弹出 UAC 提示）

2. **在管理员 PowerShell 中执行**：
   ```powershell
   npm install -g pnpm
   ```

### 问题 3：npm 安装速度很慢

**原因**：默认的 npm 源在国外，访问速度慢

**解决方案**：使用淘宝镜像

```powershell
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
```

### 问题 4：网络连接问题

**原因**：无法访问 npm 仓库

**解决方案**：

1. 检查网络连接
2. 尝试使用手机热点
3. 使用代理（如果有）

### 问题 5：提示"无法连接到服务器"

**原因**：npm 服务器连接失败

**解决方案**：

```powershell
# 清除 npm 缓存
npm cache clean --force

# 重新安装
npm install -g pnpm
```

---

## 完整的操作流程（从零开始）

### 如果你的电脑上什么都没有：

```powershell
# 1. 下载并安装 Node.js
# 访问：https://nodejs.org/
# 下载并安装 LTS 版本

# 2. 关闭并重新打开 PowerShell

# 3. 验证 npm 安装
npm --version

# 4. 安装 pnpm
npm install -g pnpm

# 5. 验证 pnpm 安装
pnpm --version

# 6. 进入项目目录
cd Desktop\projects

# 7. 安装依赖
pnpm install
```

### 如果已经有 npm：

```powershell
# 1. 安装 pnpm
npm install -g pnpm

# 2. 关闭并重新打开 PowerShell

# 3. 验证 pnpm 安装
pnpm --version

# 4. 进入项目目录
cd Desktop\projects

# 5. 安装依赖
pnpm install
```

---

## 验证安装成功

安装完成后，按照以下步骤验证：

### 步骤 1：检查 pnpm 版本

```powershell
pnpm --version
```

**应该显示**：
```
9.15.4
```

### 步骤 2：检查 npm 版本

```powershell
npm --version
```

**应该显示**：
```
9.6.7
```

### 步骤 3：检查 Node.js 版本

```powershell
node --version
```

**应该显示**：
```
v20.x.x
```

### 步骤 4：测试安装依赖

```powershell
# 进入项目目录
cd Desktop\projects

# 安装依赖
pnpm install
```

**成功显示**：
```
Done in X.Xs
```

---

## 快速参考卡片

### 一键安装命令

```powershell
# 如果 npm 已安装
npm install -g pnpm

# 使用淘宝镜像加速
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
```

### 常用命令

| 命令 | 作用 |
|------|------|
| `npm --version` | 检查 npm 版本 |
| `pnpm --version` | 检查 pnpm 版本 |
| `node --version` | 检查 Node.js 版本 |
| `npm install -g pnpm` | 安装 pnpm |
| `pnpm install` | 安装项目依赖 |

---

## 需要帮助？

### 如果按照以上步骤仍然无法安装

1. **查看错误信息**：仔细阅读 PowerShell 中的错误提示
2. **复制错误信息**：将完整的错误信息复制下来
3. **尝试其他方法**：
   - 方法 1：使用 npm 安装
   - 方法 2：先安装 Node.js
   - 方法 3：使用官方脚本

### 联系支持

如果以上方法都无法解决，请提供以下信息：
- 你的 Windows 版本（设置 > 系统 > 关于）
- 完整的错误信息
- 你执行的命令

---

## 推荐的安装顺序

1. ✅ 安装 Node.js（包含 npm）
2. ✅ 关闭并重新打开 PowerShell
3. ✅ 验证 npm 安装：`npm --version`
4. ✅ 安装 pnpm：`npm install -g pnpm`
5. ✅ 关闭并重新打开 PowerShell
6. ✅ 验证 pnpm 安装：`pnpm --version`
7. ✅ 进入项目目录
8. ✅ 安装依赖：`pnpm install`

---

## 🎉 恭喜你！

如果你按照上面的步骤操作，现在你应该已经成功安装了 pnpm！

**下一步**：
1. 进入项目目录：`cd Desktop\projects`
2. 安装依赖：`pnpm install`
3. 阅读 `QUICKSTART.md` 快速开始指南

---

**祝你安装顺利！** 💪🚀
