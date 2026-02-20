# 新手快速参考卡片

## 🚀 5 分钟快速上手（复制粘贴即可）

### 第一步：打开终端

**Windows**：
- 按 `Win + R`，输入 `powershell`，按 Enter

**Mac/Linux**：
- 按 `Cmd + Space`，输入 `terminal`，按 Enter

### 第二步：进入项目目录

```bash
# 如果项目在桌面
cd Desktop\projects     # Windows
cd ~/Desktop/projects  # Mac/Linux

# 如果在其他位置，使用完整路径
cd "你的项目路径"
```

### 第三步：检查 pnpm

```bash
pnpm --version
```

**如果显示版本号**：✅ 跳到第五步

**如果提示找不到命令**：❌ 继续第四步

### 第四步：安装 pnpm

```bash
npm install -g pnpm
```

等待安装完成，然后再次检查：
```bash
pnpm --version
```

### 第五步：安装依赖

```bash
pnpm install
```

**等待 1-5 分钟**，直到看到 `Done in X.Xs`

### 第六步：验证安装

```bash
ls node_modules    # Mac/Linux
dir node_modules   # Windows
```

**看到很多文件夹**：✅ 安装成功！

---

## 📦 完整的一键命令

### 如果你的项目在桌面

```bash
cd Desktop\projects && pnpm install
```

### 如果需要先安装 pnpm

```bash
npm install -g pnpm && cd Desktop\projects && pnpm install
```

---

## 🐛 常见问题快速修复

### ❌ 找不到 pnpm 命令（Windows 用户）

**错误信息**：
```
pnpm : 无法将"pnpm"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

**解决方案**：
```powershell
# 方法 1：使用 npm 安装
npm install -g pnpm

# 方法 2：查看详细教程
# 参考：FIX_PNPM_NOT_FOUND.md
```

### ❌ 找不到 pnpm 命令（Mac/Linux 用户）

```bash
npm install -g pnpm
```

### ❌ 安装速度慢

```bash
pnpm config set registry https://registry.npmmirror.com
pnpm install
```

### ❌ 权限不足（Mac/Linux）

```bash
sudo pnpm install
```

### ❌ 网络错误

```bash
pnpm store prune
pnpm install
```

---

## 📝 下一步

安装完依赖后：

1. **编译项目**：
   ```bash
   pnpm build:ttapp
   ```

2. **导入到抖音开发者工具**：
   - 打开抖音开发者工具
   - 选择 `dist` 目录
   - AppID：`tt27f0514db990b96201`

3. **详细教程**：
   - 📖 新手完整教程：`NEWBIE_INSTALL_GUIDE.md`
   - 🚀 快速开始指南：`QUICKSTART.md`

---

## 🎯 常用命令速查

| 命令 | 作用 |
|------|------|
| `pwd` | 查看当前目录 |
| `ls` / `dir` | 查看文件列表 |
| `cd 目录名` | 进入目录 |
| `cd ..` | 返回上一级 |
| `pnpm --version` | 检查 pnpm 版本 |
| `pnpm install` | 安装依赖 |
| `pnpm build:ttapp` | 编译项目 |

---

## ✅ 检查清单

在继续之前，确保：

- [ ] 已打开终端
- [ ] 已进入项目目录（能看到 `package.json`）
- [ ] pnpm 已安装（`pnpm --version` 显示版本号）
- [ ] 依赖已安装（`node_modules` 文件夹存在且有很多文件）
- [ ] 编译成功（`pnpm build:ttapp` 显示 `built in X.Xs`）

---

## 🔗 相关文档

| 文档 | 适合人群 |
|------|----------|
| 🎯 **NEWBIE_REFERENCE.md**（当前） | 新手快速查阅 |
| 📖 **NEWBIE_INSTALL_GUIDE.md** | 新手详细教程 |
| 🚀 **QUICKSTART.md** | 快速开始 |
| 📝 **STEP_BY_STEP_GUIDE.md** | 详细操作步骤 |

---

**开始安装吧！** 💪
