# 新手入门：安装依赖完整教程（手把手版）

## 前置准备

### 你需要什么
1. 一台电脑（Windows、Mac 或 Linux 都可以）
2. 一个终端或命令行工具
3. 互联网连接

### 什么是终端/命令行？

**Windows 用户**：
- **推荐**：PowerShell 或 Windows Terminal
- 如何打开：
  1. 按 `Win + R` 键
  2. 输入 `powershell`
  3. 按 Enter 键

**Mac 用户**：
- **推荐**：Terminal（终端）
- 如何打开：
  1. 按 `Cmd + Space` 键
  2. 输入 `terminal`
  3. 按 Enter 键

**Linux 用户**：
- **推荐**：Terminal（终端）
- 如何打开：按 `Ctrl + Alt + T`

---

## 第一步：打开终端

### Windows 用户

**方法 1：使用 PowerShell（推荐）**

1. 按键盘上的 `Windows 键` + `R`
2. 在弹出的窗口中输入：`powershell`
3. 点击"确定"或按 `Enter` 键
4. 会打开一个蓝色或黑色的窗口，这就是终端

**方法 2：使用 Windows Terminal（如果已安装）**

1. 在开始菜单中搜索 "Windows Terminal"
2. 点击打开

### Mac 用户

1. 按 `Cmd` + `Space` 键
2. 在弹出的搜索框中输入：`terminal` 或"终端"
3. 点击第一个结果或按 `Enter` 键
4. 会打开一个白色或黑色的窗口，这就是终端

### Linux 用户

1. 按 `Ctrl` + `Alt` + `T` 键
2. 会直接打开终端窗口

---

## 第二步：进入项目目录

### 1. 确认当前目录

在终端中输入以下命令（每输入完一行后按 Enter 键）：

```bash
pwd
```

**你会看到类似这样的输出**：
```
C:\Users\你的用户名          # Windows
或
/Users/你的用户名              # Mac
或
/home/你的用户名              # Linux
```

### 2. 进入项目目录

如果你的项目在桌面上：

```bash
# Windows
cd Desktop\projects

# Mac/Linux
cd ~/Desktop/projects
```

如果你的项目在其他位置，请使用以下命令：

```bash
# Windows 示例
cd "C:\Users\你的用户名\Documents\projects"

# Mac/Linux 示例
cd ~/Documents/projects
```

### 3. 确认是否进入了正确的目录

输入以下命令：

```bash
ls      # Mac/Linux
dir     # Windows
```

**你应该能看到以下文件/文件夹**：
- `package.json`
- `src/`
- `server/`
- `config/`
- `dist/`（可能不存在，这是正常的）

**如果你看到这些文件，说明你已经进入了正确的目录！✅**

---

## 第三步：安装依赖

### 什么是依赖？

简单来说，依赖就是项目运行所需的各种工具包和库。就像做饭需要买食材一样，项目运行也需要安装这些"食材"。

### 检查是否已安装 pnpm

在终端中输入：

```bash
pnpm --version
```

**情况 A：显示版本号（例如：9.x.x）**
```
9.15.4
```
✅ 说明你已经安装了 pnpm，可以直接跳到"第四步"

**情况 B：显示"找不到命令"或"不是内部或外部命令"**
```
'pnpm' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```
❌ 说明你还没有安装 pnpm，需要先安装

### 安装 pnpm

**方法 1：使用 npm 安装（推荐）**

如果你已经安装了 npm，输入：

```bash
npm install -g pnpm
```

你会看到类似这样的输出：
```
npm WARN deprecated ...
...
added 1 package in 10s
```

等待安装完成，然后再次检查：

```bash
pnpm --version
```

如果显示版本号，说明安装成功了！

**方法 2：使用官方安装脚本**

如果方法 1 不行，尝试这个方法：

```bash
# Windows PowerShell
iwr https://get.pnpm.io/install.ps1 -useb | iex

# Mac/Linux
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 安装 npm（如果需要）

如果你连 npm 也没有安装：

**Windows 用户**：
1. 访问：https://nodejs.org/
2. 下载 LTS 版本（长期支持版）
3. 双击安装包，一路"下一步"
4. 安装完成后重新打开终端

**Mac/Linux 用户**：
```bash
# 使用 Homebrew（推荐）
brew install node
```

---

## 第四步：执行安装依赖命令

现在，你已经进入了正确的项目目录，并且安装了 pnpm。

### 1. 输入安装命令

在终端中输入：

```bash
pnpm install
```

### 2. 按 Enter 键

按下键盘上的 `Enter` 键开始安装。

### 3. 等待安装完成

你会看到类似这样的输出：

```
Packages: +123
Downloading... 0/123
Downloading... 45/123
Downloading... 90/123
Downloading... 123/123

Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /path/to/store
  Virtual store is at:             node_modules/.pnpm

.Progress: resolved 123, reused 45, downloaded 78, added 123, done

Done in 15.4s
```

**安装过程可能需要 1-5 分钟，请耐心等待** ⏱️

### 4. 确认安装成功

如果最后显示 `Done in X.Xs` 或 `Successfully installed`，说明安装成功了！✅

---

## 第五步：验证安装

安装完成后，让我们验证一下是否真的安装成功了。

### 1. 检查 node_modules 目录

在终端中输入：

```bash
ls node_modules        # Mac/Linux
dir node_modules       # Windows
```

**你应该看到很多文件夹的名字**，例如：
- `@tarojs/`
- `@tailwindcss/`
- `react/`
- `typescript/`
- 等等...

如果你看到了很多文件夹，说明依赖安装成功了！✅

### 2. 检查 package.json

在终端中输入：

```bash
cat package.json      # Mac/Linux
type package.json     # Windows
```

你会看到类似这样的内容：

```json
{
  "name": "coze-mini-program",
  "version": "1.0.0",
  "dependencies": {
    "@tarojs/taro": "^4.1.9",
    "react": "^18.3.1",
    ...
  }
}
```

---

## 常见问题及解决方案

### 问题 1：提示"找不到 pnpm 命令"

**原因**：pnpm 没有安装或没有添加到系统路径

**解决方案**：
1. 重新安装 pnpm：`npm install -g pnpm`
2. 关闭终端，重新打开
3. 再次尝试：`pnpm install`

### 问题 2：安装速度很慢

**原因**：默认的 npm 源在国外，访问速度慢

**解决方案**：使用国内镜像

```bash
# 设置淘宝镜像
pnpm config set registry https://registry.npmmirror.com

# 重新安装
pnpm install
```

### 问题 3：提示"权限不足"（Mac/Linux）

**原因**：当前用户没有写入权限

**解决方案**：
```bash
# 使用 sudo 安装
sudo pnpm install

# 输入你的密码（密码不会显示，正常输入后按 Enter）
```

### 问题 4：提示"网络错误"

**原因**：网络连接问题

**解决方案**：
1. 检查网络连接
2. 尝试使用国内镜像（见问题 2）
3. 使用代理（如果有）

### 问题 5：安装过程中出现很多 WARN

**原因**：这些通常是警告，不是错误

**解决方案**：
- WARN 通常可以忽略
- 只要最后显示 `Done` 就说明安装成功了

### 问题 6：安装失败，显示 EACCES 错误

**原因**：权限问题

**解决方案**：

**Mac/Linux**：
```bash
# 修改 node_modules 权限
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.pnpm-store

# 重新安装
pnpm install
```

**Windows**：
- 以管理员身份运行 PowerShell
- 右键点击 PowerShell > "以管理员身份运行"
- 重新执行 `pnpm install`

---

## 完整的操作流程总结

### 第一次安装依赖（完整版）

```bash
# 1. 打开终端
# 按 Win+R，输入 powershell

# 2. 进入项目目录
cd Desktop\projects      # Windows
cd ~/Desktop/projects   # Mac/Linux

# 3. 检查 pnpm 是否安装
pnpm --version

# 4. 如果没有安装，先安装 pnpm
npm install -g pnpm

# 5. 安装依赖
pnpm install

# 6. 等待安装完成（可能需要 1-5 分钟）

# 7. 验证安装
ls node_modules
```

---

## 下一步：编译项目

依赖安装完成后，下一步是编译项目。

### 编译项目命令

```bash
pnpm build:ttapp
```

**详细的编译教程**，请查看：
- 📝 `STEP_BY_STEP_GUIDE.md` - 详细操作指南
- 🚀 `QUICKSTART.md` - 快速开始指南

---

## 快速参考卡

### 常用命令速查

| 操作 | 命令 | 说明 |
|------|------|------|
| 查看当前目录 | `pwd` | 显示你所在的目录 |
| 列出文件 | `ls`（Mac/Linux）/ `dir`（Windows） | 显示目录中的文件 |
| 进入目录 | `cd 目录名` | 进入指定目录 |
| 返回上一级 | `cd ..` | 返回上一级目录 |
| 检查 pnpm 版本 | `pnpm --version` | 查看 pnpm 是否安装 |
| 安装 pnpm | `npm install -g pnpm` | 全局安装 pnpm |
| 安装依赖 | `pnpm install` | 安装项目依赖 |
| 编译项目 | `pnpm build:ttapp` | 编译抖音小程序 |

### 一键安装（如果遇到问题）

```bash
# 设置国内镜像（加速）
pnpm config set registry https://registry.npmmirror.com

# 安装依赖
pnpm install

# 如果还不行，清理缓存后重试
pnpm store prune
pnpm install
```

---

## 需要帮助？

### 如果遇到问题

1. **查看错误信息**：仔细阅读终端中的错误提示
2. **复制错误信息**：将完整的错误信息复制下来
3. **查找解决方案**：查看本文档的"常见问题"部分

### 联系支持

如果以上方法都无法解决，请提供以下信息：
- 你的操作系统（Windows/Mac/Linux）
- 完整的错误信息
- 你执行的命令

---

## 视频教程（推荐）

如果你更喜欢看视频教程，可以搜索：
- "如何使用命令行"
- "如何安装 Node.js"
- "如何使用 pnpm"
- "Taro 小程序开发入门"

---

## 恭喜你！🎉

如果你按照上面的步骤操作，现在你已经成功安装了项目依赖！

**下一步**：
1. 阅读 `QUICKSTART.md` - 快速开始指南
2. 编译项目：`pnpm build:ttapp`
3. 导入到抖音开发者工具

---

**祝你在编程之路上越走越远！** 💪🚀
