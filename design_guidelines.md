# 负债人自救指南 - 设计指南

## 品牌定位

**应用类型**：金融/法律知识服务平台
**设计风格**：专业、可靠、简洁、温暖
**目标用户**：负债人群（需要情感支持和实用解决方案）
**核心价值**：提供专业、可信赖的债务解决方案

---

## 配色方案

### 主色板（专业可信）

- **主色（Primary）**：`bg-blue-600` / `text-blue-600` - 稳重、专业
  - 使用场景：主要按钮、导航栏、重要操作
- **辅助色（Secondary）**：`bg-blue-50` / `text-blue-500` - 轻量背景
  - 使用场景：卡片背景、标签、次要强调

### 语义色

- **成功色**：`bg-green-500` / `text-green-600` - 解锁成功、免费资源
  - 使用场景：解锁成功提示、免费标签
- **警告色**：`bg-orange-500` / `text-orange-600` - 注意事项
  - 使用场景：重要提示、风险提醒
- **错误色**：`bg-red-500` / `text-red-600` - 错误状态
  - 使用场景：错误提示、失败状态

### 中性色

- **文本主色**：`text-gray-900` - 标题、正文
- **文本次色**：`text-gray-600` - 说明文字、次要信息
- **文本禁用**：`text-gray-400` - 禁用状态
- **背景色**：`bg-gray-50` - 页面背景
- **分割线**：`border-gray-200` - 卡片边框、分割线

---

## 字体规范

### 字号层级

- **H1（页面标题）**：`text-2xl font-bold` - 24px
- **H2（卡片标题）**：`text-lg font-semibold` - 18px
- **H3（小标题）**：`text-base font-semibold` - 16px
- **Body（正文）**：`text-sm text-gray-700` - 14px
- **Caption（辅助文字）**：`text-xs text-gray-500` - 12px

**注意**：所有 Text 组件在 H5 端必须添加 `block` 类名确保换行。

---

## 间距系统

### 页面边距

- **标准页面边距**：`p-4`（16px）
- **紧凑页面边距**：`px-4 py-3`（水平 16px，垂直 12px）

### 组件间距

- **卡片间距**：`gap-3`（12px）
- **列表项间距**：`gap-4`（16px）
- **内边距**：`p-4`（16px）

---

## 组件规范

### 按钮（Button）

#### 主按钮（Primary Button）
```tsx
<View className="w-full">
  <Button className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium">
    主要操作
  </Button>
</View>
```

#### 次按钮（Secondary Button）
```tsx
<View className="w-full">
  <Button className="w-full bg-blue-50 text-blue-600 rounded-lg py-3 font-medium">
    次要操作
  </Button>
</View>
```

#### 广告解锁按钮（特殊样式）
```tsx
<View className="w-full">
  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2">
    <Text className="block">📺</Text>
    <Text className="block">观看广告解锁</Text>
  </Button>
</View>
```

### 卡片（Card）

#### 标准卡片
```tsx
<View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
  <Text className="block text-lg font-semibold mb-2">卡片标题</Text>
  <Text className="block text-sm text-gray-600">卡片内容</Text>
</View>
```

#### 可点击卡片
```tsx
<View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50">
  <Text className="block text-lg font-semibold mb-2">卡片标题</Text>
  <Text className="block text-sm text-gray-600">卡片内容</Text>
</View>
```

### 输入框（Input）

**⚠️ 重要**：Input 组件必须用 View 包裹，样式放在 View 上（H5 兼容）

```tsx
<View className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
  <Input
    className="w-full bg-transparent text-base"
    placeholder="请输入内容"
    placeholderClass="text-gray-400"
  />
</View>
```

### 标签（Tag）

#### 普通标签
```tsx
<View className="bg-blue-50 px-3 py-1 rounded-full">
  <Text className="block text-xs text-blue-600">标签文字</Text>
</View>
```

#### 免费标签
```tsx
<View className="bg-green-50 px-3 py-1 rounded-full">
  <Text className="block text-xs text-green-600">免费</Text>
</View>
```

### 空状态（Empty State）

```tsx
<View className="flex flex-col items-center justify-center py-12">
  <Text className="block text-4xl mb-4">📭</Text>
  <Text className="block text-sm text-gray-500 text-center">
    暂无内容{'\n'}请稍后重试
  </Text>
</View>
```

### 加载状态（Loading）

```tsx
<View className="flex items-center justify-center py-8">
  <Text className="block text-sm text-gray-500">加载中...</Text>
</View>
```

---

## 导航结构

### 页面架构

**页面列表**：
1. `pages/index/index` - 首页（问答入口、快捷标签、分类导航）
2. `pages/detail/index` - 详情页（内容预览、广告解锁）
3. `pages/category/index` - 分类页（资料列表）
4. `pages/chat/index` - 问答结果页（AI 回答展示）

**路由配置**（src/app.config.ts）：
```typescript
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/category/index',
    'pages/chat/index'
  ],
  window: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '负债人自救指南',
    navigationBarTextStyle: 'black'
  }
})
```

### 页面跳转规范

- **普通页面跳转**：`Taro.navigateTo({ url: '/pages/detail/index?id=1' })`
- **返回上一页**：`Taro.navigateBack()`
- **TabBar 切换**（如需要）：`Taro.switchTab({ url: '/pages/index/index' })`

---

## 特殊功能组件

### 快捷问题标签

```tsx
<View className="flex flex-wrap gap-2 mt-4">
  {['信用卡逾期', '网贷处理', '催收应对', '法律援助'].map((tag) => (
    <View
      key={tag}
      className="bg-blue-50 px-3 py-1.5 rounded-lg active:bg-blue-100"
      onClick={() => handleTagClick(tag)}
    >
      <Text className="block text-xs text-blue-600">{tag}</Text>
    </View>
  ))}
</View>
```

### 分类导航卡片

```tsx
<View className="grid grid-cols-2 gap-3 mt-6">
  {categories.map((cat) => (
    <View
      key={cat.id}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50"
      onClick={() => handleCategoryClick(cat)}
    >
      <Text className="block text-3xl mb-2">{cat.icon}</Text>
      <Text className="block text-base font-semibold">{cat.name}</Text>
      <Text className="block text-xs text-gray-500 mt-1">{cat.count} 篇资料</Text>
    </View>
  ))}
</View>
```

### 内容预览卡片（未解锁）

```tsx
<View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
  <Text className="block text-lg font-semibold mb-2">{title}</Text>
  <View className="bg-gray-50 rounded-lg p-3 mb-4">
    <Text className="block text-sm text-gray-600 leading-relaxed">
      {preview}...
    </Text>
  </View>
  <View className="flex items-center justify-center bg-orange-50 rounded-lg py-3">
    <Text className="block text-sm text-orange-600">🔒 完整内容需解锁</Text>
  </View>
</View>
```

### 广告解锁弹窗

```tsx
<View className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
  <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
    <View className="flex justify-center mb-4">
      <Text className="block text-4xl">📺</Text>
    </View>
    <Text className="block text-lg font-semibold text-center mb-2">
      观看广告解锁完整内容
    </Text>
    <Text className="block text-sm text-gray-500 text-center mb-6">
      观看完整视频广告（5-30秒）即可免费获取完整方案
    </Text>
    <View className="flex flex-col gap-3">
      <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium">
        观看广告解锁
      </Button>
      <Button className="w-full bg-gray-100 text-gray-600 rounded-lg py-3">
        取消
      </Button>
    </View>
  </View>
</View>
```

---

## 小程序约束

### 包体积限制
- 主包大小限制：2MB
- 整个小程序所有分包大小限制：20MB
- 单个分包大小限制：2MB

### 优化策略
- 使用 Supabase 云存储存储大量内容
- 图片使用 CDN 加速
- 按需加载页面和资源

### 图片策略
- 使用对象存储服务（Supabase Storage）
- 图片格式：WebP 优先，次选 JPEG
- 图片压缩：小于 100KB

### 性能优化
- 使用 Taro 自带分包加载
- 合理使用 `useState` 和 `useEffect`
- 避免频繁的 API 调用
- 使用缓存机制

---

## 跨端兼容性（重要）

### H5/小程序通用规范

1. **Text 组件换行**
   - 所有垂直排列的 Text 必须添加 `block` 类名
   - 示例：`<Text className="block text-lg">标题</Text>`

2. **Input 组件样式**
   - 必须用 View 包裹，样式放在 View 上
   - 示例：
   ```tsx
   <View className="bg-gray-50 rounded-xl px-4 py-3">
     <Input className="w-full bg-transparent" placeholder="输入内容" />
   </View>
   ```

3. **Fixed + Flex 布局**
   - 必须使用 inline style
   - 示例：
   ```tsx
   <View style={{ position: 'fixed', bottom: 50, display: 'flex', flexDirection: 'row' }}>
     <View><Button>按钮</Button></View>
   </View>
   ```

4. **平台检测**
   - 使用 `const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP`
   - 抖音小程序使用 `tt.createRewardedVideoAd`

---

## 抖音小程序特有功能

### 激励视频广告

```typescript
// 初始化激励视频广告
const rewardedVideoAd = tt.createRewardedVideoAd({
  adUnitId: 'your_ad_unit_id'
});

// 监听广告关闭事件
rewardedVideoAd.onClose((res) => {
  if (res.isEnded) {
    // 用户观看完成，解锁内容
    unlockContent(contentId);
  } else {
    tt.showToast({
      title: '请观看完整视频以解锁',
      icon: 'none'
    });
  }
});
```

### 合规要求

- ✅ 必须有"看广告"字样，禁止隐藏或弱化广告提示
- ✅ 用户主动点击才能创建广告请求
- ✅ 60秒内最多调起5次激励广告
- ❌ 严禁自动播放或强制观看
- ❌ 未经用户允许不能自动播放
