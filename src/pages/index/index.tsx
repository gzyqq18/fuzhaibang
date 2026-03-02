import { View, Text, ScrollView, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Network } from '@/network'
import type { FC } from 'react'

interface Category {
  id: number
  name: string
  icon: string
  sort_order: number
}

interface HotQuestion {
  id: number
  question: string
}

const IndexPage: FC = () => {
  const [searchText, setSearchText] = useState('')
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: '债务管理', icon: '💰', sort_order: 1 },
    { id: 2, name: '心理疏导', icon: '🧠', sort_order: 2 },
    { id: 3, name: '法律知识', icon: '⚖️', sort_order: 3 },
    { id: 4, name: '资源导航', icon: '📋', sort_order: 4 }
  ])
  const [quickTags] = useState([
    '信用卡逾期',
    '网贷处理',
    '催收应对',
    '法律援助'
  ])
  const [hotQuestions] = useState<HotQuestion[]>([
    { id: 1, question: '逾期后如何协商？' },
    { id: 2, question: '催收电话怎么办？' },
    { id: 3, question: '免费法律援助哪里找？' },
    { id: 4, question: '债务重组的条件是什么？' }
  ])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      console.log('开始加载分类列表...')
      const res = await Network.request({
        url: '/api/knowledge/categories'
      })
      console.log('分类接口响应:', res)
      console.log('分类数据:', res.data.data)

      const categoriesData = res.data.data || []
      console.log('处理后的分类数量:', categoriesData.length)

      if (categoriesData.length > 0) {
        setCategories(categoriesData)
      } else {
        console.log('分类数据为空，使用默认分类')
      }
    } catch (error) {
      console.error('加载分类失败:', error)
      console.log('使用默认分类数据')
      // 保持默认分类数据，不重新设置
    }
  }

  const handleSearch = () => {
    if (!searchText.trim()) {
      Taro.showToast({
        title: '请输入问题',
        icon: 'none'
      })
      return
    }

    // 跳转到问答结果页
    Taro.navigateTo({
      url: `/pages/chat/index?q=${encodeURIComponent(searchText)}`
    })
  }

  const handleQuickTagClick = (tag: string) => {
    setSearchText(tag)
    // 自动搜索
    Taro.navigateTo({
      url: `/pages/chat/index?q=${encodeURIComponent(tag)}`
    })
  }

  const handleCategoryClick = (category: Category) => {
    Taro.navigateTo({
      url: `/pages/category/index?id=${category.id}`
    })
  }

  const handleHotQuestionClick = (question: string) => {
    setSearchText(question)
    Taro.navigateTo({
      url: `/pages/chat/index?q=${encodeURIComponent(question)}`
    })
  }

  return (
    <View className="min-h-screen bg-gray-50">
      <ScrollView className="h-screen" scrollY>
        {/* 标题栏 */}
        <View className="bg-white px-4 py-4 border-b border-gray-100">
          <Text className="block text-lg font-bold text-gray-900">📚 负债人自救指南</Text>
        </View>

        <View className="p-4">
          {/* 智能问答入口 */}
          <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <Text className="block text-base font-semibold mb-3">智能问答</Text>
            <View className="bg-gray-50 rounded-xl px-4 py-3 mb-3">
              <Input
                className="w-full bg-transparent text-base"
                placeholder="您遇到了什么问题？"
                placeholderClass="text-gray-400"
                value={searchText}
                onInput={(e) => setSearchText(e.detail.value)}
              />
            </View>
            <View className="w-full">
              <Button
                className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium"
                onClick={handleSearch}
              >
                提问
              </Button>
            </View>
          </View>

          {/* 快捷问题标签 */}
          <View className="mb-6">
            <Text className="block text-base font-semibold mb-3">快捷问题</Text>
            <View className="flex flex-wrap gap-2">
              {quickTags.map((tag, index) => (
                <View
                  key={index}
                  className="bg-blue-50 px-3 py-1.5 rounded-lg active:bg-blue-100"
                  onClick={() => handleQuickTagClick(tag)}
                >
                  <Text className="block text-xs text-blue-600">{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 精选资料分类 */}
          <View className="mb-6">
            <Text className="block text-base font-semibold mb-3">📂 精选资料分类</Text>
            <View className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <View
                  key={category.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50"
                  onClick={() => handleCategoryClick(category)}
                >
                  <Text className="block text-3xl mb-2">{category.icon}</Text>
                  <Text className="block text-base font-semibold">{category.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 热门问题 */}
          <View className="mb-6">
            <Text className="block text-base font-semibold mb-3">🔥 热门问题</Text>
            <View className="bg-white rounded-xl shadow-sm border border-gray-100">
              {hotQuestions.map((item, index) => (
                <View
                  key={item.id}
                  className={`p-4 active:bg-gray-50 ${
                    index !== hotQuestions.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                  onClick={() => handleHotQuestionClick(item.question)}
                >
                  <View className="flex items-center">
                    <Text className="block text-sm text-gray-700 flex-1">{item.question}</Text>
                    <Text className="block text-gray-400 text-xs">→</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default IndexPage
