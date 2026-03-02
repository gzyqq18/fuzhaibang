import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { Network } from '@/network'
import type { FC } from 'react'

interface MatchedContent {
  id: number
  title: string
  preview: string
  category: string
  relevance: number
}

const ChatPage: FC = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [matchedContents, setMatchedContents] = useState<MatchedContent[]>([])
  const [loading, setLoading] = useState(false)

  useLoad((options) => {
    const { q } = options
    if (q) {
      setQuestion(decodeURIComponent(q))
      handleSearch(decodeURIComponent(q))
    }
  })

  const handleSearch = async (query: string) => {
    setLoading(true)
    try {
      console.log('开始搜索，问题:', query)
      const res = await Network.request({
        url: '/api/chat/search',
        method: 'POST',
        data: { question: query }
      })
      console.log('完整响应:', res)
      console.log('响应状态码:', res.statusCode)
      console.log('响应数据:', res.data)

      // 检查响应数据结构
      if (!res.data) {
        console.error('响应数据为空')
        Taro.showToast({
          title: '服务器响应异常',
          icon: 'none'
        })
        return
      }

      // 检查业务数据
      const businessData = res.data.data
      console.log('业务数据:', businessData)

      if (!businessData) {
        console.error('业务数据为空')
        setAnswer('抱歉，暂时无法获取答案，请稍后重试。')
        setMatchedContents([])
        return
      }

      // 提取 answer 和 matchedContents
      const answerText = businessData.answer || ''
      const contents = businessData.matchedContents || []

      console.log('答案:', answerText)
      console.log('匹配内容:', contents)

      setAnswer(answerText)
      setMatchedContents(contents)
    } catch (error) {
      console.error('搜索失败:', error)
      console.error('错误详情:', {
        message: error.message,
        stack: error.stack
      })
      setAnswer('抱歉，网络异常，请检查网络连接后重试。')
      setMatchedContents([])
      Taro.showToast({
        title: '搜索失败，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleContentClick = (id: number) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  const handleGoHome = () => {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  return (
    <View className="min-h-screen bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-100 flex items-center">
        <View className="w-8 h-8 flex items-center justify-center" onClick={handleGoHome}>
          <Text className="block text-xl text-gray-700">←</Text>
        </View>
        <Text className="block text-base font-semibold ml-2">回答</Text>
      </View>

      <ScrollView className="h-screen" scrollY>
        <View className="p-4">
          <View className="mb-6">
            <Text className="block text-sm text-gray-500 mb-2">您的问题</Text>
            <View className="bg-blue-50 rounded-xl p-4">
              <Text className="block text-base text-gray-900">{question}</Text>
            </View>
          </View>

          {loading ? (
            <View className="flex items-center justify-center py-8">
              <Text className="block text-sm text-gray-500">正在搜索解决方案...</Text>
            </View>
          ) : answer ? (
            <View className="mb-6">
              <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Text className="block text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {answer}
                </Text>
              </View>
            </View>
          ) : null}

          {matchedContents.length > 0 && (
            <View className="mb-6">
              <Text className="block text-sm font-medium text-gray-700 mb-3">
                相关解决方案
              </Text>
              <View className="space-y-3">
                {matchedContents.map((item) => (
                  <View
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50"
                    onClick={() => handleContentClick(item.id)}
                  >
                    <View className="flex justify-between items-start mb-2">
                      <Text className="block text-base font-semibold flex-1">
                        {item.title}
                      </Text>
                      <View className="bg-green-50 px-2 py-1 rounded ml-2">
                        <Text className="block text-xs text-green-600">
                          匹配度 {item.relevance}%
                        </Text>
                      </View>
                    </View>
                    <Text className="block text-sm text-gray-600 leading-relaxed">
                      {item.preview}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default ChatPage
