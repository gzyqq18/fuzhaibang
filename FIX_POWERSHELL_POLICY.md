# 解决 PowerShell 脚本执行策略限制问题

## ❌ 错误信息

```
pnpm : 无法加载文件 D:\Program Files\nodejs\pnpm.ps1，因为在此系统上禁止运行脚本。
```

**原因**：Windows PowerShell 默认禁止运行脚本文件（.ps1），这是为了安全考虑。

**解决方案**：按照以下方法解决。

---

## ⚡ 快速解决方案

### 方案 1：使用 npm 代替 pnpm（推荐，最简单）

**原因**：pnpm 实际上是通过脚本包装的，可以直接使用 npm 代替。

**操作步骤**：

```powershell
# 1. 使用 npm 代替 pnpm
npm run build:ttapp

# 2. 或者直接使用 npx（如果配置了）
npx pnpm build:ttapp
```

**优势**：
- ✅ 不需要修改系统设置
- ✅ 立即可用
- ✅ 安全性更高

**注意事项**：
- 确保 `package.json` 中有对应的 npm scripts
- 检查是否配置了 `pnpm` 到 `npm` 的映射

---

### 方案 2：临时允许执行脚本（仅当前会话）

**适用场景**：只想在当前 PowerShell 窗口中运行 pnpm

```powershell
# 临时允许执行脚本（仅当前 PowerShell 窗口）
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 然后运行 pnpm
pnpm build:ttapp

# 关闭 PowerShell 窗口后，限制会恢复
```

**优势**：
- ✅ 不影响系统安全设置
- ✅ 仅当前会话有效
- ✅ 关闭窗口后自动恢复

**注意事项**：
- 每次打开新的 PowerShell 窗口都需要重新执行

---

### 方案 3：永久修改执行策略（不推荐）

**适用场景**：需要经常使用 pnpm，并且了解安全风险

```powershell
# 以管理员身份运行 PowerShell
# 右键点击 PowerShell > 以管理员身份运行

# 修改执行策略为 RemoteSigned
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

# 然后运行 pnpm
pnpm build:ttapp
```

**说明**：
- `RemoteSigned`：允许运行本地脚本，但来自网络的脚本需要签名
- 比 `Unrestricted` 更安全

**风险**：
- ⚠️ 降低系统安全性
- ⚠️ 可能被恶意脚本利用

**如何恢复**：
```powershell
# 恢复默认策略
Set-ExecutionPolicy -ExecutionPolicy Restricted
```

---

### 方案 4：使用 CMD 代替 PowerShell

**适用场景**：不想修改 PowerShell 设置

```cmd
# 打开 CMD（命令提示符）
# 按 Win + R，输入 cmd，按 Enter

# 在 CMD 中运行 pnpm
pnpm build:ttapp
```

**优势**：
- ✅ 不受 PowerShell 策略限制
- ✅ 不需要修改任何设置
- ✅ 简单直接

**注意事项**：
- CMD 的功能和 PowerShell 不同
- 某些高级命令可能不兼容

---

## 🎯 推荐方案对比

| 方案 | 难度 | 安全性 | 持久性 | 推荐度 |
|------|------|--------|--------|--------|
| 方案 1：使用 npm | ⭐ 最简单 | ⭐⭐⭐⭐ 最安全 | ⭐⭐⭐⭐ 永久 | ⭐⭐⭐⭐⭐ 强烈推荐 |
| 方案 2：临时允许 | ⭐⭐ 简单 | ⭐⭐⭐⭐ 安全 | ⭐ 仅当前会话 | ⭐⭐⭐⭐ 推荐 |
| 方案 3：永久修改 | ⭐⭐⭐ 中等 | ⭐⭐ 较低 | ⭐⭐⭐⭐ 永久 | ⭐⭐ 不推荐 |
| 方案 4：使用 CMD | ⭐ 最简单 | ⭐⭐⭐⭐ 安全 | ⭐⭐⭐⭐ 永久 | ⭐⭐⭐⭐ 推荐 |

---

## 📋 详细操作步骤

### 方法 1：使用 npm 代替 pnpm（详细步骤）

#### 步骤 1：检查 package.json 是否有对应的 npm scripts

```powershell
# 查看 package.json 文件
type package.json
```

**查找 "scripts" 部分**：
```json
{
  "scripts": {
    "build:ttapp": "taro build --type weapp",
    "build:web": "taro build --type h5",
    "dev": "concurrently \"pnpm dev:web\" \"pnpm dev:weapp\" \"pnpm dev:server\"",
    "dev:web": "taro build --type h5 --watch",
    "dev:weapp": "taro build --type weapp --watch",
    "dev:server": "cd server && pnpm start:dev",
    "build": "concurrently \"pnpm lint:build\" \"pnpm tsc\" \"pnpm build:web\" \"pnpm build:ttapp\" \"pnpm build:server\"",
    "build:ttapp": "taro build --type weapp"
  }
}
```

#### 步骤 2：使用 npm 运行脚本

```powershell
# 编译抖音小程序
npm run build:ttapp

# 或者使用 npx
npx pnpm build:ttapp
```

#### 步骤 3：验证编译结果

```powershell
# 查看 dist 目录
dir dist
```

**应该看到**：
```
app.js
app.json
app.wxss
pages/
...
```

---

### 方法 2：临时允许执行脚本（详细步骤）

#### 步骤 1：在 PowerShell 中执行临时策略

```powershell
# 临时允许执行脚本
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**你会看到提示**：
```
执行策略更改
执行策略可帮助防止您执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies 主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为"N"):
```

#### 步骤 2：输入 Y 并按 Enter

```
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为"N"):
```

输入 `Y`，然后按 Enter

#### 步骤 3：运行 pnpm

```powershell
pnpm build:ttapp
```

#### 步骤 4：关闭 PowerShell 窗口后，限制会自动恢复

**重要**：
- 这个设置仅在当前 PowerShell 窗口中有效
- 关闭窗口后，限制会自动恢复
- 每次打开新的 PowerShell 窗口都需要重新执行

---

### 方法 3：永久修改执行策略（详细步骤）

#### 步骤 1：以管理员身份运行 PowerShell

1. 在开始菜单中搜索 "PowerShell"
2. 右键点击 "Windows PowerShell"
3. 选择 "以管理员身份运行"
4. 点击"是"（如果弹出 UAC 提示）

#### 步骤 2：查看当前执行策略

```powershell
# 查看当前执行策略
Get-ExecutionPolicy

# 输出：Restricted（禁止运行脚本）
```

#### 步骤 3：修改执行策略为 RemoteSigned

```powershell
# 修改执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

**你会看到提示**：
```
执行策略更改
执行策略可帮助防止您执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies 主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为"N"):
```

#### 步骤 4：输入 Y 并按 Enter

```
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为"N"):
```

输入 `Y`，然后按 Enter

#### 步骤 5：验证修改

```powershell
# 查看新的执行策略
Get-ExecutionPolicy

# 输出：RemoteSigned
```

#### 步骤 6：运行 pnpm

```powershell
pnpm build:ttapp
```

#### 步骤 7：如何恢复默认策略

```powershell
# 恢复默认策略
Set-ExecutionPolicy -ExecutionPolicy Restricted
```

---

### 方法 4：使用 CMD 代替 PowerShell（详细步骤）

#### 步骤 1：打开 CMD

**方法 1**：
1. 按 `Win + R`
2. 输入 `cmd`
3. 按 Enter

**方法 2**：
1. 在开始菜单中搜索 "命令提示符" 或 "cmd"
2. 点击打开

#### 步骤 2：进入项目目录

```cmd
cd Desktop\projects
```

#### 步骤 3：运行 pnpm

```cmd
pnpm build:ttapp
```

#### 步骤 4：验证编译结果

```cmd
dir dist
```

---

## 🔍 执行策略说明

### Windows PowerShell 执行策略类型

| 策略 | 说明 | 安全性 |
|------|------|--------|
| `Restricted` | 禁止运行所有脚本文件 | ⭐⭐⭐⭐⭐ 最高 |
| `AllSigned` | 只能运行已签名的脚本 | ⭐⭐⭐⭐ 高 |
| `RemoteSigned` | 本地脚本可以运行，网络脚本需要签名 | ⭐⭐⭐ 中等 |
| `Unrestricted` | 允许运行所有脚本 | ⭐ 最低 |

**推荐**：
- ⭐⭐⭐⭐ `RemoteSigned` - 平衡安全性和便利性
- ❌ 不推荐 `Unrestricted` - 安全性太低

### 查看当前执行策略

```powershell
# 查看当前执行策略
Get-ExecutionPolicy

# 查看所有作用域的执行策略
Get-ExecutionPolicy -List
```

---

## 🎯 推荐使用场景

### 开发环境（推荐使用 npm）

```powershell
# 使用 npm 代替 pnpm
npm run build:ttapp
npm run dev
```

**优势**：
- ✅ 不需要修改系统设置
- ✅ 安全性高
- ✅ 简单直接

### 临时需要使用 pnpm（推荐临时允许）

```powershell
# 临时允许执行脚本
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 使用 pnpm
pnpm build:ttapp

# 关闭窗口后自动恢复
```

**优势**：
- ✅ 不影响系统安全
- ✅ 仅当前会话有效
- ✅ 自动恢复

### 生产环境（推荐使用 npm）

```powershell
# 使用 npm 代替 pnpm
npm run build:ttapp
```

**优势**：
- ✅ 安全性高
- ✅ 不受 PowerShell 策略影响
- ✅ 更稳定的执行环境

---

## 📋 常用命令对照表

| pnpm 命令 | npm 命令 | 说明 |
|-----------|----------|------|
| `pnpm install` | `npm install` | 安装依赖 |
| `pnpm build:ttapp` | `npm run build:ttapp` | 编译抖音小程序 |
| `pnpm build` | `npm run build` | 构建所有 |
| `pnpm dev` | `npm run dev` | 启动开发模式 |
| `pnpm start:dev` | `npm run start:dev` | 启动开发服务 |

---

## ✅ 验证成功

### 使用 npm 编译

```powershell
# 编译项目
npm run build:ttapp

# 查看输出
# 应该看到：✓ built in X.Xs

# 验证结果
dir dist

# 应该看到：
# app.js
# app.json
# pages/
# ...
```

### 使用临时策略编译

```powershell
# 临时允许执行脚本
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 编译项目
pnpm build:ttapp

# 查看输出
# 应该看到：✓ built in X.Xs

# 验证结果
dir dist
```

---

## 📖 相关文档

| 文档 | 用途 |
|------|------|
| 🔧 **FIX_POWERSHELL_POLICY.md** | 解决 PowerShell 脚本执行策略限制问题（当前文档） |
| 🔧 **FIX_PNPM_NOT_FOUND.md** | 修复 pnpm 未安装问题 |
| 📁 **FIX_EMPTY_DIST.md** | 修复 dist 为空的问题 |
| 🚀 **QUICKSTART.md** | 快速开始指南 |

---

## 🎯 总结

### 为什么会出现这个问题？

Windows PowerShell 默认禁止运行脚本文件（.ps1），这是为了安全考虑。

### 如何解决？

**推荐方案**：
1. **使用 npm 代替 pnpm**（最简单，最安全）
2. **临时允许执行脚本**（仅当前会话）

**不推荐方案**：
3. **永久修改执行策略**（降低安全性）

### 长期建议

- ✅ 优先使用 `npm run` 命令
- ✅ 避免直接使用 `pnpm` 命令
- ✅ 配置好 package.json 中的 scripts
- ✅ 使用 CMD 或集成终端

---

**现在选择一个解决方案，继续开发吧！** 💪🚀

**推荐：使用 npm 代替 pnpm，最简单最安全！** ✅
