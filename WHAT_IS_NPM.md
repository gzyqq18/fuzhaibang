# 什么是 NPM？新手入门指南

## 🎯 简单理解

### NPM 是什么？

**NPM** = **Node Package Manager**（Node 包管理器）

**一句话解释**：NPM 就像是一个"应用商店"，用来下载和安装 JavaScript 项目需要的各种工具包和库。

---

## 📦 生活中的比喻

### 🍎 就像手机的应用商店

想象一下你的手机：

**没有应用商店时**：
- 你需要到处找软件
- 手动下载安装包
- 管理起来很麻烦

**有应用商店后**：
- 打开应用商店
- 搜索需要的应用
- 一键安装
- 自动更新

**NPM 就是 JavaScript 项目的"应用商店"！**

---

## 🎮 具体例子

### 例子 1：做饭

- **项目** = 做一顿饭
- **npm** = 超市
- **包/库** = 食材（米、油、菜、调料）

**没有 npm 时**：
- 你需要自己种米、榨油、种菜...
- 非常麻烦

**有 npm 后**：
- 打开 npm（进超市）
- 选择需要的食材（下载包）
- 一键购买（安装）
- 开始做饭（开发项目）

### 例子 2：搭积木

- **项目** = 搭一个乐高城堡
- **npm** = 积木仓库
- **包/库** = 各种积木块

**没有 npm 时**：
- 你需要自己制造每个积木块
- 非常耗时

**有 npm 后**：
- 打开 npm（进仓库）
- 选择需要的积木块（下载包）
- 一键获取（安装）
- 开始搭建（开发项目）

---

## 💻 在编程中实际使用

### 什么是"包"（Package）？

**包**就是别人写好的代码，可以拿来直接使用。

**例子**：
- 想要在网页上显示日历？ → 下载 `moment.js` 包
- 想要处理日期？ → 下载 `date-fns` 包
- 想要做动画？ → 下载 `animate.css` 包

**好处**：
- ✅ 不用自己写代码
- ✅ 使用别人已经写好的、经过测试的代码
- ✅ 节省时间
- ✅ 提高质量

---

## 🚀 NPM 的作用

### 1. 下载和安装包

```powershell
# 安装一个包
npm install 包名

# 例子：安装 moment.js（处理日期的包）
npm install moment
```

### 2. 管理项目依赖

**项目依赖** = 项目运行需要的所有包

**npm 会自动管理**：
- 下载所有需要的包
- 确保版本兼容
- 处理包之间的依赖关系

### 3. 运行脚本命令

```powershell
# 运行项目中的脚本命令
npm run 脚本名

# 例子：编译项目
npm run build:ttapp

# 例子：启动开发模式
npm run dev
```

### 4. 更新包

```powershell
# 更新包到最新版本
npm update

# 更新特定包
npm update 包名
```

---

## 📚 package.json 文件

### 什么是 package.json？

**package.json** = 项目的"身份证"或"配置文件"

**作用**：
- 记录项目信息（名称、版本、描述等）
- 记录项目依赖（需要哪些包）
- 定义脚本命令（可以运行哪些命令）

### package.json 示例

```json
{
  "name": "coze-mini-program",
  "version": "1.0.0",
  "description": "负债人自救指南小程序",
  "dependencies": {
    "react": "^18.3.1",
    "@tarojs/taro": "^4.1.9"
  },
  "scripts": {
    "build:ttapp": "taro build --type weapp",
    "dev": "concurrently \"pnpm dev:web\" \"pnpm dev:weapp\""
  }
}
```

**解释**：
- `name`：项目名称
- `version`：项目版本
- `dependencies`：项目依赖的包
- `scripts`：可以运行的命令

---

## 🔧 常用 NPM 命令

### 安装依赖

```powershell
# 安装项目所有依赖
npm install

# 或简写
npm i
```

### 安装特定包

```powershell
# 安装一个包
npm install 包名

# 例子：安装 moment.js
npm install moment

# 安装并保存到 package.json
npm install --save 包名
```

### 运行脚本

```powershell
# 运行脚本
npm run 脚本名

# 例子：编译项目
npm run build:ttapp

# 例子：启动开发模式
npm run dev
```

### 查看已安装的包

```powershell
# 查看已安装的包列表
npm list

# 查看全局安装的包
npm list -g
```

### 更新包

```powershell
# 更新所有包
npm update

# 更新特定包
npm update 包名
```

### 卸载包

```powershell
# 卸载一个包
npm uninstall 包名
```

---

## 🆚 NPM 和 PNPM 的区别

### 相同点

- 都是包管理器
- 都可以下载和安装包
- 都可以运行脚本命令

### 不同点

| 特性 | NPM | PNPM |
|------|-----|------|
| 速度 | 较慢 | 快 |
| 磁盘空间 | 占用较多 | 节省 |
| 工作原理 | 每个项目复制一份 | 全局共享，使用链接 |
| 推荐度 | ⭐⭐⭐⭐⭐ 标准 | ⭐⭐⭐⭐ 更快更省 |

### 为什么有 PNPM？

**NPM 的问题**：
- 每个项目都复制一份包
- 浪费磁盘空间
- 安装速度慢

**PNPM 的改进**：
- 使用硬链接和符号链接
- 全局共享包，不重复
- 节省磁盘空间
- 安装速度快

---

## 🎯 如何使用 NPM？

### 第一次使用（安装项目依赖）

```powershell
# 1. 进入项目目录
cd Desktop\projects

# 2. 安装所有依赖
npm install

# 3. 等待安装完成
# （可能需要 1-5 分钟）

# 4. 验证安装
ls node_modules
```

### 日常开发（运行命令）

```powershell
# 编译项目
npm run build:ttapp

# 启动开发模式
npm run dev

# 安装新包
npm install 包名
```

---

## 🔍 如何查看 NPM 版本？

```powershell
# 查看 npm 版本
npm --version

# 例子输出：
# 9.6.7
```

### 如何安装 NPM？

NPM 通常随 Node.js 一起安装。

**安装 Node.js**：
1. 访问：https://nodejs.org/
2. 下载并安装 LTS 版本
3. npm 会自动安装

---

## 📦 node_modules 目录

### 什么是 node_modules？

**node_modules** = 存放所有下载的包的文件夹

**结构**：
```
项目/
├── node_modules/          # 存放所有下载的包
│   ├── react/            # React 包
│   ├── @tarojs/          # Taro 包
│   └── moment/           # Moment.js 包
├── src/                  # 源代码
├── package.json          # 配置文件
└── dist/                 # 编译输出
```

### 为什么不要手动修改 node_modules？

**原因**：
- ✅ 这些文件是由 npm 管理的
- ✅ 手动修改会导致问题
- ✅ 下次运行 `npm install` 会覆盖修改

**正确做法**：
- ✅ 通过 npm 命令安装包
- ✅ 修改 package.json 配置
- ✅ 不要手动修改 node_modules

---

## 🎯 实际使用示例

### 场景 1：克隆项目后

```powershell
# 1. 克隆项目（或下载项目）
git clone https://github.com/xxx/project.git

# 2. 进入项目目录
cd project

# 3. 安装依赖
npm install

# 4. 运行项目
npm run dev
```

### 场景 2：添加新功能

```powershell
# 1. 安装需要的包
npm install moment

# 2. 在代码中使用
import moment from 'moment'

# 3. 重新运行项目
npm run dev
```

### 场景 3：部署项目

```powershell
# 1. 安装依赖
npm install

# 2. 编译项目
npm run build:ttapp

# 3. 部署 dist 目录
```

---

## 🌐 NPM 镜像（加速下载）

### 什么是 NPM 镜像？

**NPM 镜像** = NPM 的"分店"

**默认源**：
- 官方源在国外
- 下载速度慢

**国内镜像**：
- 淘宝镜像（阿里云）
- 下载速度快

### 如何使用淘宝镜像？

```powershell
# 设置淘宝镜像
npm config set registry https://registry.npmmirror.com

# 验证
npm config get registry

# 输出：https://registry.npmmirror.com
```

### 临时使用镜像

```powershell
# 只在这次安装时使用镜像
npm install --registry=https://registry.npmmirror.com
```

---

## 🎓 总结

### NPM 是什么？

**NPM** = JavaScript 项目的"应用商店"

### NPM 的作用？

1. ✅ 下载和安装包
2. ✅ 管理项目依赖
3. ✅ 运行脚本命令
4. ✅ 更新包

### 常用命令？

```powershell
npm install        # 安装依赖
npm run 脚本名      # 运行脚本
npm update         # 更新包
npm uninstall 包名  # 卸载包
```

### 最佳实践？

- ✅ 使用 npm install 安装依赖
- ✅ 使用 npm run 运行脚本
- ✅ 不要手动修改 node_modules
- ✅ 使用国内镜像加速下载

---

## 📖 相关文档

| 文档 | 用途 |
|------|------|
| 💡 **WHAT_IS_NPM.md** | 什么是 NPM（当前文档） |
| 🚀 **QUICKSTART.md** | 快速开始指南 |
- 🎯 **NEWBIE_REFERENCE.md** | 新手快速参考 |
| 📖 **NEWBIE_INSTALL_GUIDE.md** | 新手详细教程 |

---

**现在你应该知道 NPM 是什么了！** 🎉

**简单来说：NPM 就是 JavaScript 项目的"应用商店"，用来下载和安装各种工具包和库！** 💡
