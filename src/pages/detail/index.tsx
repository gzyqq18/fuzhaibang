import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect, useCallback } from 'react'
import { Network } from '@/network'
import type { FC } from 'react'

interface ContentDetail {
  id: number
  title: string
  preview: string
  content: string
  category: string
  is_free: boolean
  unlocked: boolean
}

const DetailPage: FC = () => {
  const [contentId, setContentId] = useState<number | null>(null)
  const [content, setContent] = useState<ContentDetail | null>(null)
  const [showAdModal, setShowAdModal] = useState(false)
  const [userId] = useState('test_user_001')

  useLoad((options) => {
    const { id } = options
    if (id) {
      setContentId(parseInt(id))
    }
  })

  const loadContentDetail = useCallback(async () => {
    if (!contentId) return

    try {
      const res = await Network.request({
        url: `/api/knowledge/contents/${contentId}`,
        data: { userId }
      })
      console.log('内容详情:', res.data.data)
      setContent(res.data.data)
    } catch (error) {
      console.error('加载内容失败:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  }, [contentId, userId])

  useEffect(() => {
    if (contentId) {
      loadContentDetail()
    }
  }, [contentId, loadContentDetail])

  const handleUnlock = async () => {
    if (!contentId) return

    try {
      const res = await Network.request({
        url: '/api/knowledge/unlock',
        method: 'POST',
        data: { userId, contentId }
      })

      if (res.data.code === 200) {
        Taro.showToast({
          title: '解锁成功',
          icon: 'success'
        })
        loadContentDetail()
      }
    } catch (error) {
      console.error('解锁失败:', error)
      Taro.showToast({
        title: '解锁失败',
        icon: 'none'
      })
    }

    setShowAdModal(false)
  }

  const handleCloseModal = () => {
    setShowAdModal(false)
  }

  const handleGoBack = () => {
    Taro.navigateBack()
  }

  if (!content) {
    return (
      <View className="flex items-center justify-center min-h-screen bg-gray-50">
        <Text className="block text-sm text-gray-500">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-4">
      {/* 返回按钮和标题 */}
      <View className="bg-white px-4 py-4 border-b border-gray-100 flex items-center">
        <View className="w-8 h-8 flex items-center justify-center" onClick={handleGoBack}>
          <Text className="block text-xl text-gray-700">←</Text>
        </View>
        <Text className="block text-base font-semibold ml-2">内容详情</Text>
      </View>

      <View className="bg-white rounded-xl m-4 p-4 shadow-sm border border-gray-100">
        <View className="mb-3">
          <View className="bg-blue-50 px-3 py-1 rounded-full inline-block">
            <Text className="block text-xs text-blue-600">{content.category}</Text>
          </View>
          {content.is_free && (
            <View className="bg-green-50 px-3 py-1 rounded-full inline-block ml-2">
              <Text className="block text-xs text-green-600">免费</Text>
            </View>
          )}
        </View>

        <Text className="block text-lg font-semibold mb-4">{content.title}</Text>

        {(!content.is_free && !content.unlocked) ? (
          <>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">⚠️ 内容预览</Text>
              <View className="bg-gray-50 rounded-lg p-3">
                <Text className="block text-sm text-gray-600 leading-relaxed">
                  {content.preview}...
                </Text>
              </View>
            </View>

            <View className="flex flex-col items-center justify-center bg-orange-50 rounded-lg py-6 mb-4">
              <Text className="block text-3xl mb-2">🔒</Text>
              <Text className="block text-sm text-orange-600 font-medium mb-1">此内容需解锁</Text>
            </View>

            <View className="w-full">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium"
                onClick={() => setShowAdModal(true)}
              >
                📺 观看广告解锁
              </Button>
            </View>
          </>
        ) : (
          <>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">✓ 完整内容</Text>
              <View className="bg-gray-50 rounded-lg p-4">
                <Text className="block text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {content.content}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      {showAdModal && (
        <View className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <View className="flex justify-center mb-4">
              <Text className="block text-4xl">📺</Text>
            </View>
            <Text className="block text-lg font-semibold text-center mb-2">
              观看广告解锁完整内容
            </Text>
            <View className="flex flex-col gap-3">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium"
                onClick={handleUnlock}
              >
                观看广告解锁
              </Button>
              <Button
                className="w-full bg-gray-100 text-gray-600 rounded-lg py-3"
                onClick={handleCloseModal}
              >
                取消
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default DetailPage
