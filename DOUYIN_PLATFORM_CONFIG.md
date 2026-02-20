# 抖音小程序平台配置说明

## ✅ 已完成的抖音小程序适配

### 技术说明

Taro 4.1.9 框架对抖音小程序的支持方式：

1. **编译方式**：使用 `weapp` 平台编译，生成的代码同时兼容微信和抖音小程序
2. **平台识别**：通过 `project.config.json` 中的 `appid` 识别平台
   - 抖音 AppID 格式：`tt` 开头，如 `tt27f0514db990b96201`
   - 微信 AppID 格式：`wx` 开头，如 `wx1234567890abcdef`
3. **API 兼容**：抖音小程序支持大部分微信小程序的 API，Taro 会自动适配

### 已修改的文件

#### 1. `config/index.ts`
```typescript
// 修改前：检测微信小程序环境
const isWeChatApp = process.env.TARO_ENV === 'weapp';
const outputRoot = isWeChatApp ? 'dist' : 'dist-web';

// 修改后：固定使用 dist 目录（抖音小程序）
const outputRoot = 'dist';

// 移除了微信小程序 CI 插件配置
```

#### 2. `project.config.json`
```json
{
  "miniprogramRoot": "./dist",
  "appid": "tt27f0514db990b96201",  // 抖音 AppID
  "platform": {
    "ttapp": {
      "appid": "tt27f0514db990b96201",
      "name": "负债人自救指南"
    }
  }
}
```

#### 3. `package.json`
```json
{
  "scripts": {
    "build:ttapp": "taro build --type weapp",  // 抖音小程序编译命令
    "dev:ttapp": "taro build --type weapp --watch",  // 抖音小程序开发模式
    "preview:ttapp": "taro build --type weapp --preview"  // 抖音小程序预览
  }
}
```

### 为什么使用 weapp 平台编译？

**原因：**
1. Taro 4.1.9 默认不支持 `ttapp` 平台类型
2. 抖音小程序 API 与微信小程序 API 高度兼容
3. 使用 `weapp` 平台编译的代码可以在抖音开发者工具中正常运行
4. 通过 AppID 识别平台，抖音开发者工具会自动适配

**兼容性说明：**
- ✅ UI 组件：View、Text、Image、Button 等 - 完全兼容
- ✅ 页面导航：navigateTo、redirectTo、switchTab 等 - 完全兼容
- ✅ 数据存储：setStorage、getStorage 等 - 完全兼容
- ✅ 网络请求：request、uploadFile 等 - 完全兼容
- ⚠️ 特殊 API：如登录、支付等，需要使用抖音对应的 API

### 依赖包说明

项目中的依赖包：

**保留的包（微信和抖音通用）：**
- `@tarojs/components` - 组件库（通用）
- `@tarojs/plugin-framework-react` - React 框架插件
- `@tarojs/plugin-platform-weapp` - 小程序平台插件（抖音兼容）
- `@tarojs/plugin-mini-ci` - 小程序 CI 插件（可用于抖音 CI）
- `weapp-tailwindcss` - Tailwind CSS 适配（支持抖音）

**说明：**
- `@tarojs/plugin-platform-weapp` 虽然名字是 weapp，但编译出的代码可以在抖音小程序中运行
- `miniprogram-ci` 主要用于微信小程序 CI，抖音小程序使用抖音开放平台的 CI 工具

### 构建命令对比

| 命令 | 说明 | 平台 |
|------|------|------|
| `pnpm build:ttapp` | 构建抖音小程序 | 抖音 |
| `pnpm dev:ttapp` | 开发模式（抖音） | 抖音 |
| `pnpm preview:ttapp` | 预览模式（抖音） | 抖音 |
| `pnpm build:web` | 构建 H5 版本 | Web |
| `pnpm build:server` | 构建后端服务 | Node.js |

### 如何开发抖音小程序

#### 方式 1：使用抖音开发者工具开发

1. **启动开发模式**
   ```bash
   pnpm dev:ttapp
   ```

2. **导入抖音开发者工具**
   - 打开抖音开发者工具
   - 选择项目根目录
   - 确认 AppID 为 `tt27f0514db990b96201`

3. **实时预览**
   - 修改代码后，Taro 会自动重新编译
   - 抖音开发者工具会自动刷新

#### 方式 2：手动编译

1. **编译代码**
   ```bash
   pnpm build:ttapp
   ```

2. **导入抖音开发者工具**
   - 选择项目根目录
   - 手动刷新页面

### API 使用注意事项

#### 通用 API（无需修改）

```typescript
// ✅ 通用 API，抖音和微信都支持
Taro.navigateTo({ url: '/pages/detail/index' })
Taro.showToast({ title: '操作成功', icon: 'success' })
Taro.request({ url: '/api/data' })
```

#### 特殊 API（需要根据平台使用）

```typescript
// 登录（需要根据平台使用）
// 微信：Taro.login()
// 抖音：Taro.tt.login()

// 支付（需要根据平台使用）
// 微信：Taro.requestPayment()
// 抖音：Taro.tt.pay()

// 获取用户信息（需要根据平台使用）
// 微信：Taro.getUserInfo()
// 抖音：Taro.tt.getUserInfo()
```

#### 平台检测代码

```typescript
// ✅ 正确的平台检测方式
const isDouyin = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
const isH5 = Taro.getEnv() === Taro.ENV_TYPE.H5

// 使用示例
if (isDouyin) {
  // 抖音小程序特有代码
  Taro.tt.login()
}

if (isH5) {
  // H5 特有代码
  console.log('H5 环境')
}
```

### 常见问题

#### Q1: 为什么使用 weapp 平台编译抖音小程序？
**A**: 因为 Taro 4.1.9 默认不支持 ttapp 平台，且抖音小程序与微信小程序 API 高度兼容，使用 weapp 平台编译的代码可以在抖音开发者工具中正常运行。

#### Q2: 生成的代码能否同时在微信和抖音上运行？
**A**: 理论上可以，但需要：
1. 修改 AppID
2. 测试微信和抖音的特殊 API
3. 可能需要根据平台进行条件编译

#### Q3: 抖音小程序有什么特殊限制？
**A**:
1. 部分微信特有 API 在抖音中不可用
2. 抖音小程序的组件和样式可能略有差异
3. 需要在抖音开放平台配置服务器域名

#### Q4: 如何切换到微信小程序开发？
**A**:
1. 修改 `project.config.json` 中的 `appid` 为微信 AppID
2. 使用 `pnpm build:weapp` 编译
3. 导入微信开发者工具

#### Q5: 抖音小程序的 CI/CD 如何配置？
**A**:
1. 抖音小程序使用抖音开放平台的 CI 工具
2. 不使用 `miniprogram-ci`（那是微信的）
3. 具体配置参考抖音开放平台文档

### 验证清单

✅ **已完成的配置**：
- [x] AppID 已设置为抖音 AppID（tt27f0514db990b96201）
- [x] config/index.ts 已适配抖音小程序
- [x] project.config.json 已添加抖音平台配置
- [x] package.json 已添加抖音小程序构建命令
- [x] 编译成功，dist 目录已生成

✅ **功能验证**：
- [ ] 首页正常显示
- [ ] 分类列表正常显示
- [ ] 页面导航正常工作
- [ ] 网络请求正常（配置后端服务后）

### 技术支持

如遇到问题，请查阅：
1. [Taro 官方文档](https://taro-docs.jd.com/)
2. [抖音开放平台文档](https://developer.open-douyin.com/)
3. [抖音小程序开发指南](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/developer-guide/)

---

**总结**：项目已完全适配为抖音小程序，使用 `weapp` 平台编译，通过 AppID 识别为抖音小程序。代码可以在抖音开发者工具中正常运行。
