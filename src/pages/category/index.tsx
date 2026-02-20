import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect, useCallback } from 'react'
import { Network } from '@/network'
import type { FC } from 'react'

interface ContentItem {
  id: number
  title: string
  preview: string
  category: string
  is_free: boolean
}

const CategoryPage: FC = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [contents, setContents] = useState<ContentItem[]>([])

  useLoad((options) => {
    const { id } = options
    if (id) {
      setCategoryId(parseInt(id))
    }
  })

  const loadContents = useCallback(async () => {
    if (!categoryId) return

    try {
      // Fallback：分类名称映射
      const categoryNames: Record<number, string> = {
        1: '债务管理',
        2: '心理疏导',
        3: '法律知识',
        4: '资源导航'
      }
      setCategoryName(categoryNames[categoryId] || '未知分类')

      const catRes = await Network.request({
        url: `/api/knowledge/categories`
      })
      const categories = catRes.data.data || []
      const category = categories.find((c: any) => c.id === categoryId)
      if (category) {
        setCategoryName(category.name)
      }

      const res = await Network.request({
        url: `/api/knowledge/categories/${categoryId}/contents`
      })
      console.log('内容列表:', res.data.data)

      const transformedContents = (res.data.data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        preview: item.preview,
        category: categoryName,
        is_free: item.is_free
      }))

      setContents(transformedContents)
    } catch (error) {
      console.error('加载内容失败:', error)
      // 显示友好的提示
      setContents([])
      Taro.showToast({
        title: '需要配置后端服务才能查看内容',
        icon: 'none',
        duration: 3000
      })
    }
  }, [categoryId, categoryName])

  useEffect(() => {
    if (categoryId) {
      loadContents()
    }
  }, [categoryId, loadContents])

  const handleContentClick = (id: number) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  const handleGoBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 返回按钮和分类标题 */}
      <View className="bg-white px-4 py-4 border-b border-gray-100 flex items-center">
        <View className="w-8 h-8 flex items-center justify-center" onClick={handleGoBack}>
          <Text className="block text-xl text-gray-700">←</Text>
        </View>
        <Text className="block text-base font-semibold ml-2">{categoryName}</Text>
      </View>

      <ScrollView className="h-screen" scrollY>

        {/* 内容列表 */}
        <View className="p-4 space-y-3">
          {contents.length > 0 ? (
            contents.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50"
                onClick={() => handleContentClick(item.id)}
              >
                {/* 标题和标签 */}
                <View className="flex justify-between items-start mb-2">
                  <Text className="block text-base font-semibold flex-1">{item.title}</Text>
                  {item.is_free && (
                    <View className="bg-green-50 px-2 py-1 rounded ml-2">
                      <Text className="block text-xs text-green-600">免费</Text>
                    </View>
                  )}
                </View>

                {/* 预览内容 */}
                <Text className="block text-sm text-gray-600 leading-relaxed mb-2">
                  {item.preview}
                </Text>

                {/* 分类标签 */}
                <View>
                  <View className="bg-blue-50 px-2 py-1 rounded inline-block">
                    <Text className="block text-xs text-blue-600">{item.category}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="flex flex-col items-center justify-center py-12">
              <Text className="block text-4xl mb-4">📭</Text>
              <Text className="block text-sm text-gray-600 text-center mb-2">
                暂无内容或需要配置后端服务
              </Text>
              <Text className="block text-xs text-gray-400 text-center">
                请查看网络配置指南了解详情
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default CategoryPage
