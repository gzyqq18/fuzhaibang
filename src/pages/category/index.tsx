import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import type { FC } from 'react'

interface ContentItem {
  id: number
  title: string
  preview: string
  category: string
  is_free: boolean
}

// 内置内容数据
const builtInContents: Record<number, ContentItem[]> = {
  1: [ // 债务管理
    {
      id: 1,
      title: '债务重组流程指南',
      preview: '债务重组是指债务人无法按时偿还债务时，通过与债权人协商，重新安排债务的还款计划。债务重组可以帮助债务人减轻还款压力，避免破产...',
      category: '债务管理',
      is_free: false
    },
    {
      id: 2,
      title: '如何与催收人员沟通',
      preview: '面对催收人员的电话或上门催收，保持冷静和理性非常重要。合理的沟通可以帮助你更好地处理债务问题，避免不必要的冲突和误会...',
      category: '债务管理',
      is_free: false
    },
    {
      id: 3,
      title: '信用卡逾期处理指南',
      preview: '信用卡逾期后会产生高额的罚息和滞纳金，严重影响个人信用记录。及时处理逾期问题非常重要...',
      category: '债务管理',
      is_free: true
    }
  ],
  2: [ // 心理疏导
    {
      id: 4,
      title: '负债后的心理调适',
      preview: '负债后产生焦虑、抑郁、自责等负面情绪是正常的。学会调适心态，积极面对困难，是走出债务困境的第一步...',
      category: '心理疏导',
      is_free: false
    },
    {
      id: 5,
      title: '如何与家人沟通债务问题',
      preview: '债务问题不仅影响个人，也会影响家庭关系。与家人诚实沟通，寻求理解和支持，对于解决债务问题非常重要...',
      category: '心理疏导',
      is_free: false
    },
    {
      id: 6,
      title: '负债后的压力管理',
      preview: '负债后面临巨大的经济和心理压力。学会管理压力，保持良好的心理状态，对于解决问题和保持健康都非常重要...',
      category: '心理疏导',
      is_free: true
    }
  ],
  3: [ // 法律知识
    {
      id: 7,
      title: '债务纠纷的法律途径',
      preview: '当债务纠纷无法通过协商解决时，可以考虑通过法律途径解决。了解相关的法律知识和程序，可以帮助你更好地保护自己的权益...',
      category: '法律知识',
      is_free: false
    },
    {
      id: 8,
      title: '个人破产制度的了解',
      preview: '个人破产制度是帮助诚实但不幸的债务人重新开始的法律制度。了解个人破产制度，可以帮助你在必要时寻求法律保护...',
      category: '法律知识',
      is_free: false
    },
    {
      id: 9,
      title: '债务纠纷中的证据保存',
      preview: '在债务纠纷中，证据是保护自己权益的重要武器。了解需要保存哪些证据，以及如何保存证据，可以帮助你在必要时维护自己的权益...',
      category: '法律知识',
      is_free: true
    }
  ]
}

// 分类名称映射
const categoryNames: Record<number, string> = {
  1: '债务管理',
  2: '心理疏导',
  3: '法律知识',
  4: '资源导航'
}

const CategoryPage: FC = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [contents, setContents] = useState<ContentItem[]>([])

  useLoad((options) => {
    const { id } = options
    if (id) {
      const idNum = parseInt(id)
      setCategoryId(idNum)
      setCategoryName(categoryNames[idNum] || '未知分类')
      setContents(builtInContents[idNum] || [])
    }
  })

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
                暂无内容
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default CategoryPage
