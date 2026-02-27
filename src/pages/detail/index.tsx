import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [isPlayingAd, setIsPlayingAd] = useState(false)

  // 激励视频广告实例
  const rewardedVideoAd = useRef<any>(null)

  useLoad((options) => {
    const { id } = options
    if (id) {
      setContentId(parseInt(id))
    }
  })

  // 初始化激励视频广告
  useEffect(() => {
    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    if (isWeapp) {
      try {
        // 创建激励视频广告实例
        rewardedVideoAd.current = Taro.createRewardedVideoAd({
          adUnitId: 'n5yyapes8ozdabvmi0'
        })

        // 监听广告加载
        rewardedVideoAd.current.onLoad(() => {
          console.log('激励视频广告加载成功')
        })

        // 监听广告加载失败
        rewardedVideoAd.current.onError((err: any) => {
          console.error('激励视频广告加载失败:', err)
          setIsPlayingAd(false)
          Taro.showToast({
            title: '广告加载失败，请重试',
            icon: 'none'
          })
        })

        // 监听广告关闭
        rewardedVideoAd.current.onClose((res: any) => {
          console.log('激励视频广告关闭, isEnded:', res && res.isEnded)

          if (res && res.isEnded) {
            // 用户看完广告
            console.log('用户完整观看广告')
            handleUnlockSuccess()
          } else {
            // 用户中途退出
            console.log('用户中途退出广告')
            setIsPlayingAd(false)
            Taro.showToast({
              title: '请完整观看广告才能解锁',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } catch (error) {
        console.error('创建激励视频广告失败:', error)
      }
    }

    // 清理
    return () => {
      if (rewardedVideoAd.current) {
        rewardedVideoAd.current.offLoad()
        rewardedVideoAd.current.offError()
        rewardedVideoAd.current.offClose()
      }
    }
  }, [handleUnlockSuccess])

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

  const handleUnlockSuccess = useCallback(async () => {
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
    } finally {
      setIsPlayingAd(false)
    }
  }, [contentId, userId, loadContentDetail])

  useEffect(() => {
    if (contentId) {
      loadContentDetail()
    }
  }, [contentId, loadContentDetail])

  const handleShowAd = async () => {
    if (!contentId) return

    const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

    if (!isWeapp) {
      Taro.showToast({
        title: '广告功能仅在小程序中可用',
        icon: 'none'
      })
      return
    }

    if (!rewardedVideoAd.current) {
      Taro.showToast({
        title: '广告加载中，请稍后',
        icon: 'none'
      })
      return
    }

    try {
      setIsPlayingAd(true)
      setShowAdModal(false)

      // 显示激励视频广告
      await rewardedVideoAd.current.show()
      console.log('激励视频广告已显示')
    } catch (error) {
      console.error('显示激励视频广告失败:', error)
      setIsPlayingAd(false)
      Taro.showToast({
        title: '广告显示失败，请重试',
        icon: 'none'
      })
    }
  }

  const handleCloseModal = () => {
    if (isPlayingAd) {
      Taro.showToast({
        title: '请先看完广告',
        icon: 'none'
      })
      return
    }
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
                onClick={handleShowAd}
                disabled={isPlayingAd}
              >
                {isPlayingAd ? '广告播放中...' : '📺 观看广告解锁'}
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
            <Text className="block text-sm text-gray-500 text-center mb-4">
              需要完整观看 15 秒广告才能解锁内容，中间不能退出
            </Text>
            <View className="flex flex-col gap-3">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-3 font-medium"
                onClick={handleShowAd}
              >
                开始观看广告
              </Button>
              <Button
                className="w-full bg-gray-100 text-gray-600 rounded-lg py-3"
                onClick={handleCloseModal}
                disabled={isPlayingAd}
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
